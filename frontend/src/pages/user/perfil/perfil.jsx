import "./perfil.css";
import { useState, useEffect } from "react";
import NavbarUser from "../../../assets/components/navbarUser";
import { Pencil, ChevronLeft, ChevronRight, Trash } from "react-bootstrap-icons";
import { logout, getUsersByCpf, updateUser, getReservasByCpf } from "../../../services/Api_service";

function Perfil() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const cpf = localStorage.getItem('cpf')
  const [tel, setTel] = useState('')
  const [reservas, setReservas] = useState([]) // Estado para armazenar as reservas
  const [currentReservaIndex, setCurrentReservaIndex] = useState(0) // Índice da reserva atual no carrossel
  const [showEditModal, setShowEditModal] = useState(false);

  // Função para calcular o número de noites
  function calcularNoites(dataInicio, dataFinal) {
    const inicio = new Date(dataInicio);
    const final = new Date(dataFinal);
    const diferenca = final - inicio;
    return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
  }

  // Função para formatar data
  function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  // Função para calcular o total a pagar
  function calcularTotal(preco, noites) {
    return (preco * noites).toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  }

  // Função para navegar para a próxima reserva
  const nextReserva = () => {
    setCurrentReservaIndex((prevIndex) => 
      prevIndex === reservas.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Função para navegar para a reserva anterior
  const prevReserva = () => {
    setCurrentReservaIndex((prevIndex) => 
      prevIndex === 0 ? reservas.length - 1 : prevIndex - 1
    );
  };


  async function pegarReservas() {
    try {
      const reservasData = await getReservasByCpf(cpf);
      setReservas(reservasData);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    }
  }

  async function deslogar() {
    logout()
    window.location.href = '/login'
  }

  useEffect(() => {
    preencher();
    pegarReservas(); // Chamar a função para buscar as reservas
  }, []);

  async function preencher() {
    try {
      const data = await getUsersByCpf(cpf);
      setNome(data.nome);
      setEmail(data.email);
      setTel(data.telefone);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = () => setShowEditModal(true);

  async function editar() {
    await updateUser(cpf, nome, email, tel).then(data => console.log(data)).catch(error => console.log(error))
  }

  return (
    <div className="div-mae-peril">
      <NavbarUser />
      <div className="container-perfil">
        <div className="right-perfil">
          <h1 className="infoText-perfil">Suas Informações</h1>
          <div className="container-imgIcone">
            <img
              className="img-perfil-icone" 
              src="/src/assets/img/perfil.png"
            />
          </div>
          <div className="info-perfil">
            <form className="text-perfil">
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">Nome:</h1>
                <input type="text" placeholder={nome} className="textNome-perfil" maxLength={100} onChange={(e) => setNome(e.target.value)} />
                <Pencil className="pencilIcon-perfil"/>
              </div>
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">Email:</h1>
                <input type="email" placeholder={email} className="textEmail-perfil" maxLength={100} onChange={(e) => setEmail(e.target.value)} />
                <Pencil className="pencilIcon-perfil"/>
              </div>
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">CPF:</h1>
                <h2 className="textCpf-perfil"> {cpf}</h2>
              </div>
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">Numero De Telefone:</h1>
                <input type="tel" placeholder={tel} className="textTel-perfil" maxLength={100} onChange={(e) => setTel(e.target.value)}  />
                <Pencil className="pencilIcon-perfil"/>
              </div>
            </form>
          </div>
        </div>

        <div className="linha-perfil">
          <div className="linhaMeio-perfil"></div>
        </div>

        <div className="left-perfil">
          <h1 className="reservados-perfil">Quartos Reservados</h1>
          
          {reservas.length > 0 ? (
            <div className="carousel-container">
              {/* Botões de navegação */}
              {reservas.length > 1 && (
                <>
                  <button 
                    className="carousel-btn carousel-btn-prev" 
                    onClick={prevReserva}
                    aria-label="Reserva anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="carousel-btn carousel-btn-next" 
                    onClick={nextReserva}
                    aria-label="Próxima reserva"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Reserva atual */}
              {(() => {
                const reserva = reservas[currentReservaIndex];
                const noites = calcularNoites(reserva.data_inicio, reserva.data_final);
                const total = calcularTotal(reserva.quarto.preco, noites);
                
                return (
                  <div className="reserva-card">
                    
                    <div className="text-perfilFinal">
                      <div className="finalText-perfil">
                        <h1 className="finalStyle-perfil">Quarto:</h1>
                        <h2 className="finalInfo-perfil">{reserva.quarto.nome}</h2>
                      </div>
                      <div className="finalText-perfil">
                        <h1 className="finalStyle-perfil">Período:</h1>
                        <h2 className="finalInfo-perfil">
                          {formatarData(reserva.data_inicio)} - {formatarData(reserva.data_final)}
                        </h2>
                      </div>
                      <div className="finalText-perfil">
                        <h1 className="finalStyle-perfil">Noites:</h1>
                        <h2 className="finalInfo-perfil">{noites} noite{noites > 1 ? 's' : ''}</h2>
                      </div>
                      <div className="finalText-perfil">
                        <h1 className="finalStyle-perfil">Total:</h1>
                        <h2 className="finalInfo-perfil">{total}</h2>
                      </div>
                      <h2 className="finalInfo-perfil">caso queira cancelar entre em contato</h2>
                    </div>
                    
                  </div>
                );
              })()}

              {/* Indicadores de páginas */}
              {reservas.length > 1 && (
                <div className="carousel-indicators">
                  {reservas.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentReservaIndex ? 'active' : ''}`}
                      onClick={() => setCurrentReservaIndex(index)}
                      aria-label={`Ir para reserva ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Contador de reservas */}
              {reservas.length > 1 && (
                <div className="carousel-counter">
                  {currentReservaIndex + 1} de {reservas.length}
                </div>
              )}
            </div>
          ) : (
            <div className="sem-reservas">
              <div className="domo_perfil_img">
                <img
                  className="domo_perfil" 
                  src="/src/assets/img/domo_perfil.png"
                  width="100%"
                  style={{ opacity: 0.3 }}
                />
              </div>
              <div className="text-perfilFinal">
                <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                  Você não possui reservas no momento.
                </p>
              </div>
            </div>
          )}

          <div className="sairConta-perfil">
            <h1 className="conta-perfil">Deseja sair da sua conta?</h1>
            <div className="botoes-perfil-alinhar">
              <button onClick={() => handleShowEdit()} className="sair-perfil"> Editar </button>
              <button onClick={() => deslogar()} className="sair-perfil"> Sair </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`modal-container ${showEditModal ? 'show' : ''}`}>
        <div className="modal-content modal-edit slide-up">
          <div className="modal-header">
            <h2>⚠️⚠️Confirmação⚠️⚠️</h2>
            <button className="close-button" onClick={handleCloseEdit}>×</button>
          </div>
          <div className="modal-body">
            <p><strong>Tem certeza que deseja editar esse perfil? </strong> <br /> (essa alteração não pode ser desfeita)</p>
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={handleCloseEdit}>Cancelar</button>
            <button className="confirm-button edit" onClick={() => {editar(); handleCloseEdit()}}>Sim, Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;