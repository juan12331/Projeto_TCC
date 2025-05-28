import "./perfil_adm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useEffect, useState } from "react";
import { getUser, getUsersByCpf, deleteUser, updateUser, getReservasByCpf, deleteReserva } from "../../../services/Api_service";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Trash } from "react-bootstrap-icons";

function PerfilAdm() {
  const navigate = useNavigate();
  const { cpf } = useParams();

  const [nome, setNome] = useState(''); 
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [reservas, setReservas] = useState([]); // Estado para armazenar as reservas
  const [currentReservaIndex, setCurrentReservaIndex] = useState(0); // Índice da reserva atual no carrossel

  const [showModal, setShowModal] = useState(false);      // Modal de exclusão
  const [showEditModal, setShowEditModal] = useState(false); // Modal de edição
  const [showDeleteReservaModal, setShowDeleteReservaModal] = useState(false); // Modal de exclusão de reserva
  const [reservaToDelete, setReservaToDelete] = useState(null); // ID da reserva a ser excluída

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

  // Função para buscar reservas
  async function pegarReservas() {
    try {
      const reservasData = await getReservasByCpf(cpf);
      setReservas(reservasData);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    }
  }

  // Função para excluir reserva com confirmação
  function solicitarExclusaoReserva(idReserva) {
    setReservaToDelete(idReserva);
    setShowDeleteReservaModal(true);
  }

  async function confirmarExclusaoReserva() {
    if (reservaToDelete) {
      try {
        await deleteReserva(reservaToDelete);
        // Atualizar a lista de reservas após exclusão
        await pegarReservas();
        // Ajustar o índice atual se necessário
        if (currentReservaIndex >= reservas.length - 1 && reservas.length > 1) {
          setCurrentReservaIndex(0);
        }
        setShowDeleteReservaModal(false);
        setReservaToDelete(null);
        window.alert("Reserva excluída com sucesso!");
      } catch (error) {
        console.error('Erro ao excluir reserva:', error);
        window.alert("Erro ao excluir reserva. Tente novamente.");
      }
    }
  }

  function cancelarExclusaoReserva() {
    setShowDeleteReservaModal(false);
    setReservaToDelete(null);
  }

  useEffect(() => {
    verificacao();
    preencher();
    pegarReservas(); // Chamar a função para buscar as reservas
  }, []);

  async function verificacao() {
    try {
      await getUser();
    } catch (error) {
      if (error.status === 403 || error.status === 401) {
        window.alert('Acesso não autorizado');
        window.location.href = "/login";
      }
    }
  }

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

  async function deletarusuario() {
    await deleteUser(cpf);
    window.location.href = '/usuarios';
  }

  async function editarUsuario(cpf, nome, email, telefone) {
    console.log(cpf, nome, email, telefone);
    await updateUser(cpf, nome, email, undefined, undefined, telefone);
    setShowEditModal(false);
    window.alert("Perfil atualizado com sucesso!");
  }

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = () => setShowEditModal(true);

  return (
    <div className="div-mae-perilAdm">
      <NavbarAdm />
      <div className="container-perfilAdm">
        <div className="back-containerAdm">
          <button onClick={() => navigate("/usuarios")} className="back-buttonAdm"> ← </button>
          <h1 className="back-lineAdm">|</h1>
          <button onClick={() => navigate("/usuarios")} className="back-textAdm"> USUÁRIOS </button>
        </div>

        <div className="right-perfilAdm">
          <h1 className="infoText-perfilAdm">Informações do Usuário</h1>
          <div className="container-imgIconeAdm">
            <img className="img-perfil-iconeAdm" src="/src/assets/img/perfil.png" />
          </div>

          <div className="info-perfilAdm">
            <form className="text-perfilAdm">
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">Nome:</h1>
                <input type="text" value={nome} className="textNome-perfilAdm" onChange={(e) => setNome(e.target.value)} maxLength={100} />
              </div>
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">Email:</h1>
                <input type="email" value={email} className="textEmail-perfilAdm" onChange={(e) => setEmail(e.target.value)} maxLength={100}/>
              </div>
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">CPF:</h1>
                <h2 className="textCpf-perfilAdm">{cpf}</h2>
              </div>
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">Telefone:</h1>
                <input type="tel" className="textTel-perfilAdm" value={tel} onChange={(e) => setTel(e.target.value)} maxLength={100}/>
              </div>
            </form>
          </div>
        </div>

        <div className="linha-perfilAdm">
          <div className="linhaMeio-perfilAdm"></div>
        </div>

        <div className="left-perfilAdm">
          <h1 className="reservados-perfilAdm">Quartos Reservados</h1>
          
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
                  <div className="reserva-card" style={{ position: 'relative' }}>
                    {/* Botão de excluir */}
                    <button 
                      className="delete-reserva-btn"
                      onClick={() => solicitarExclusaoReserva(reserva.id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#cc0000'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
                      title="Excluir reserva"
                    >
                      <Trash size={16} />
                    </button>

                    
                    <div className="text-perfilFinalAdm">
                      <div className="finalText-perfilAdm">
                        <h1 className="finalStyle-perfilAdm">Quarto:</h1>
                        <h2 className="finalInfo-perfilAdm">{reserva.quarto.nome}</h2>
                      </div>
                      <div className="finalText-perfilAdm">
                        <h1 className="finalStyle-perfilAdm">Período:</h1>
                        <h2 className="finalInfo-perfilAdm">
                          {formatarData(reserva.data_inicio)} - {formatarData(reserva.data_final)}
                        </h2>
                      </div>
                      <div className="finalText-perfilAdm">
                        <h1 className="finalStyle-perfilAdm">Noites:</h1>
                        <h2 className="finalInfo-perfilAdm">{noites} noite{noites > 1 ? 's' : ''}</h2>
                      </div>
                      <div className="finalText-perfilAdm">
                        <h1 className="finalStyle-perfilAdm">Total:</h1>
                        <h2 className="finalInfo-perfilAdm">{total}</h2>
                      </div>
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
             
              <div className="text-perfilFinalAdm">
                <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                  Este usuário não possui reservas no momento.
                </p>
              </div>
            </div>
          )}

          <div className="sairConta-perfilAdm">
            <button type="button" className="perfil-button1Adm" onClick={handleShow}>Excluir perfil</button>
            <button type="button" className="perfil-button2Adm" onClick={handleShowEdit}>Editar perfil</button>
          </div>
        </div>
      </div>

      {/* Modal de Exclusão */}
      <div className={`modal-container ${showModal ? 'show' : ''}`}>
        <div className="modal-content modal-delete slide-up">
          <div className="modal-header">
            <h2>⚠️⚠️Confirmação⚠️⚠️</h2>
            <button className="close-button" onClick={handleClose}>×</button>
          </div>
          <div className="modal-body">
            <p><strong>Tem certeza que deseja excluir esse perfil? </strong> <br /> (essa alteração não pode ser desfeita)</p>
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={handleClose}>Cancelar</button>
            <button className="confirm-button delete" onClick={deletarusuario}>Sim, Excluir</button>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
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
            <button className="confirm-button edit" onClick={() => editarUsuario(cpf, nome, email, tel)}>Sim, Editar</button>
          </div>
        </div>
      </div>

      {/* Modal de Exclusão de Reserva */}
      <div className={`modal-container ${showDeleteReservaModal ? 'show' : ''}`}>
        <div className="modal-content modal-delete slide-up">
          <div className="modal-header">
            <h2>⚠️⚠️Confirmação⚠️⚠️</h2>
            <button className="close-button" onClick={cancelarExclusaoReserva}>×</button>
          </div>
          <div className="modal-body">
            <p><strong>Tem certeza que deseja excluir esta reserva? </strong> <br /> (essa alteração não pode ser desfeita)</p>
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={cancelarExclusaoReserva}>Cancelar</button>
            <button className="confirm-button delete" onClick={confirmarExclusaoReserva}>Sim, Excluir</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilAdm;