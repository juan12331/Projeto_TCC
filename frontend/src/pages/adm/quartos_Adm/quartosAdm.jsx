import React, { useState, useEffect } from "react";
import img1 from "/src/assets/quartos/image 120.png";
import img2 from "/src/assets/quartos/image 114.png";
import img3 from "/src/assets/quartos/image 117.png";
import img4 from "/src/assets/quartos/image 119.png";
import img5 from "/src/assets/quartos/image 121.png";
// import placeholderImg from "/src/assets/quartos/image-placeholder.png"; // Assumo que você terá uma imagem de placeholder
import { FaStar } from "react-icons/fa";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate, useParams } from "react-router-dom";
import {  getQuartosDisponiveis, updateQuartos, deleteQuartos } from "../../../services/Api_service";
import "./quartosAdm.css";

function Quartos() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState(0)
  const [descricao, setDescricao] = useState('')

    const options = [
      { id: 1, label: ' TV'},
      { id: 2, label: ' Wifi' },
      { id: 3, label: ' Ducha'},
      { id: 4, label: ' Cozinha'},
      { id: 5, label: ' Toalhas'},
      { id: 6, label: ' Frigobar'},
      { id: 7, label: ' Banheira'},
      { id: 8, label: ' Ar condicionado'},
    ];


  

    const handleCheckboxChange = (optionId) => {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    };

  const [avaliacao_texto, setAvaliacao_texto] = useState('');
  const [nota, setNota] = useState(0);
  const [cpf, setCpf] = useState('');
  const [quarto, setQuarto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  
  // Estado para os dados de reserva
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adultos, setAdultos] = useState('1 Adulto');
  const [criancas, setCriancas] = useState('0 Crianças');

  // Estado para as imagens
  const [imagens, setImagens] = useState([]);
  const [imagemAtual, setImagemAtual] = useState(null);

  const [showModal, setShowModal] = useState(false);      // Modal de exclusão
  const [showEditModal, setShowEditModal] = useState(false); // Modal de edição

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = () => setShowEditModal(true);

  const { id_quarto } = useParams();
  const navigate = useNavigate();

  async function  excluir() {
    try{
    await deleteQuartos(id_quarto)
    window.location.href = '/acomodacoesAdm'
    }catch(err){
      window.alert('erro ao excluir quarto')
      console.error('olha o error ao excluir quarto', err)
    } 
  }



  useEffect(() => {
    preencher();
  }, []);

  // Efeito para configurar as imagens quando o quarto for carregado
  useEffect(() => {
    if (quarto) {
      // Configura o array de imagens com as imagens do quarto se disponíveis,
      // caso contrário, usa as imagens estáticas como fallback
      const imagensDoQuarto = [];
      
      // Verifica se o quarto tem fotos e adiciona a primeira como imagem principal
      if (quarto.fotos_quartos && quarto.fotos_quartos.length > 0) {
        quarto.fotos_quartos.forEach(foto => {
          if (foto && foto.imagem) {
            imagensDoQuarto.push(foto.imagem);
          }
        });
      }
      
      // Adiciona as imagens de fallback se necessário
      if (imagensDoQuarto.length === 0) {
        // Se não tiver imagens do quarto, usa apenas as imagens estáticas
        setImagens([img1, img2, img3, img4, img5]);
      } else {
        // Combina as imagens do quarto com as estáticas
        setImagens([...imagensDoQuarto,]);
      }
      
      // Define a imagem atual
      if (imagensDoQuarto.length > 0) {
        setImagemAtual(imagensDoQuarto[0]);
      } else if (img1) {
        setImagemAtual(img1);
      } else {
        setImagemAtual(placeholderImg);
      }
    }
  }, [quarto]);

  function saveReservationData() {
    // Verificar se as datas foram selecionadas
    if (!checkIn || !checkOut) {
      showError('Por favor, selecione as datas de check-in e check-out');
      return;
    }
    
    // Converter strings para objetos Date
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    
    // Resetar as horas para comparação apenas de datas
    today.setHours(0, 0, 0, 0);
    
    // Verificar se a data de check-in é no passado
    if (checkInDate < today) {
      showError('A data de check-in não pode ser no passado');
      return;
    }
    
    // Verificar se a data de check-out é igual ou anterior à data de check-in
    if (checkOutDate <= checkInDate) {
      showError('A data de check-out deve ser posterior à data de check-in');
      return;
    }
    
    // Formatar as datas para comparação apenas de dia/mês/ano
    const checkInDateStr = checkInDate.toISOString().split('T')[0];
    const checkOutDateStr = checkOutDate.toISOString().split('T')[0];
    
    // Verificar se o check-in e check-out são no mesmo dia
    if (checkInDateStr === checkOutDateStr) {
      showError('O check-out não pode ser no mesmo dia do check-in');
      return;
    }
    
    // Calcular a diferença de dias
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Verificar se a estadia é maior que 30 dias
    if (diffDays > 30) {
      showError('Não é possível fazer reservas por mais de 30 dias');
      return;
    }
    
    // Se passou por todas as validações, criar objeto com os dados da reserva
    const reservationData = {
      checkIn: checkIn,
      checkOut: checkOut,
      adultos: adultos,
      criancas: criancas,
      quartoId: id_quarto,
      quartoNome: quarto?.nome || '',
      quartoPreco: quarto?.preco || 0,
      diasEstadia: diffDays
    };
    
    // Salvar no localStorage
    localStorage.setItem('reservationData', JSON.stringify(reservationData));
    
    // Navegar para a página de pagamento
    navigate(`/pix/${id_quarto}`);
  }

  async function preencher() {
    try {
      setCarregando(true);
      setErro(false);
      
      const data = await getQuartosDisponiveis(id_quarto);
      console.log("Dados do quarto:", data);
      
      if (data) {
        const quartoreal = data
        setQuarto(quartoreal);
        console.log('quarto', quarto);
        setNome(quarto.nome)    
        setValor(quarto.preco)
        setDescricao(quarto.descricao)
        return;
      } 
          
    } catch (error) {
      console.error("Erro ao carregar dados do quarto:", error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  async function Criar(e) {
    e.preventDefault();

    if (avaliacao_texto === '' || nota === 0 || id_quarto === '' || cpf === '') {
      showError('preencha todos os campos');
      return;
    }

    try {
      const data = await createAvaliacoes(avaliacao_texto, nota, id_quarto, cpf);
      if (data === 'avaliação adicionada com sucesso') {
        showError('Avaliação adicionada com sucesso!');
        // Limpar os campos do formulário
        setAvaliacao_texto('');
        setNota(0);
        setCpf('');
      } else {
        showError('Erro ao adicionar avaliação');
      }
    } catch (err) {
      console.error("Erro ao criar avaliação:", err);
      showError('Erro ao enviar avaliação. Tente novamente.');
    }
  }

  const showError = (message) => {
    const span = document.getElementById('span');
    if (span) {
      span.textContent = message;
      
      // Resetar o timer se já existir
      if (span.timeoutId) {
        clearTimeout(span.timeoutId);
      }
      
      // Definir novo timer
      span.timeoutId = setTimeout(() => {
        if (span.parentNode) {
          span.textContent = '';
        }
      }, 5000);
    } else {
      // Criar um elemento para exibir o erro se não existir
      const errorSpan = document.createElement('span');
      errorSpan.id = 'span';
      errorSpan.style.color = 'red';
      errorSpan.style.display = 'block';
      errorSpan.style.marginTop = '10px';
      errorSpan.style.textAlign = 'center';
      errorSpan.style.fontWeight = 'bold';
      errorSpan.textContent = message;
      
      // Adicionar ao formulário de reserva
      const formReserva = document.querySelector('.form-reserva');
      if (formReserva) {
        formReserva.appendChild(errorSpan);
        
        // Remover após 5 segundos
        const timeoutId = setTimeout(() => {
          if (errorSpan.parentNode) {
            errorSpan.parentNode.removeChild(errorSpan);
          }
        }, 5000);
        
        // Armazenar o ID do timeout para poder cancelá-lo se necessário
        errorSpan.timeoutId = timeoutId;
      }
    }
  }

  const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => {setRating(currentRating); setNota(currentRating)}}
                style={{ display: "none" }}
              />
              <FaStar
                className="star"
                size={30}
                color={currentRating <= (hover || rating) ? "#FFD700" : "#ccc"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
    );
  };

  const handleImagemClick = (imagem) => {
    setImagemAtual(imagem);
  };

  // Renderização condicional para quando os dados estão carregando
  if (carregando) {
    return (
      <div className="fundo_quartosAdm">
        <NavbarAdm />
        <div className="loading-container">
          <p>Carregando informações do quarto...</p>
        </div>
      </div>
    );
  }

  // Renderização condicional para quando ocorre um erro
  if (erro) {
    return (
      <div className="fundo_quartosAdm">
        <NavbarAdm />
        <div className="error-container">
          <p>Erro ao carregar informações do quarto. Por favor, tente novamente.</p>
          <button onClick={preencher} className="btn-tentar-novamente">Tentar Novamente</button>
        </div>
      </div>
    );
  }

  // Renderização normal quando tudo está carregado
  return (
    <div className="quartosAdm-page">
      <NavbarAdm/>
      <div className="fundo_quartosAdm">
        <div className="fundoLeft-quartosAdm">
          <div className="back-quartosAdm">
            <button onClick={() => navigate("/acomodacoesAdm")} className="backButton-quartosAdm"> ← </button>
            <h1 className="backLine-quartosAdm">|</h1>
            <button onClick={() => navigate("/acomodacoesAdm")} className="backText-quartosAdm"> ACOMODAÇÕES </button> 
          </div>
          <main className="quartoAdm-container">
            <section className="galeria-principal">
              {imagemAtual ? (
                <img
                  src={imagemAtual}
                  alt="Imagem do quarto"
                  className="imagem-principal"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                    e.target.alt = "Imagem indisponível";
                  }}
                />
              ) : (
                <div className="imagem-indisponivel">
                  <p>Imagem indisponível</p>
                </div>
              )}
              <div className="miniaturas">
                {imagens.length > 0 ? (
                  imagens.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Miniatura ${index + 1}`}
                      className={`miniatura ${imagemAtual === img ? "ativa" : ""}`}
                      onClick={() => handleImagemClick(img)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImg;
                        e.target.alt = "Miniatura indisponível";
                      }}
                    />
                  ))
                ) : (
                  <p className="sem-miniaturas">Sem imagens disponíveis</p>
                )}
              </div>
            </section>
            <div className="buttonImage-quartosAdm">
              <button type="button" className="edit1-quartosAdm">Excluir Imagem</button>
              <button type="button" className="edit2-quartosAdm">Adicionar Imagem</button>
            </div>
          </main>
        </div>
          <div className="dividerPage-quartosAdm">
            <div className="right-quartosAdm">
              <h1 className="tituloInfo-quartosAdm">Insira as informações do quarto:</h1>
              <form className="itensCenter-quartosAdm">
                <div className="name-quartosAdm">
                    <input type="name" className="itensName-quartosAdm" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                </div>
                <div className="valor-quartosAdm">
                    <input type="Number" className="itensValor-quartosAdm" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
                </div>
                <div className="descricao-quartosAdm">
                    <input type="text" className="itensDescricao-quartosAdm" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                </div>
              </form>
              <div className="checkbox-quartosAdm">
                {options.map((option) => (
                  <div className='formItens-quartosAdm' key={option.id}>
                    <label className="nameItem-quartosAdm">
                      <input
                      type="checkbox"
                      value={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                      />
                      {option.label}
                    </label> 
                  </div>
                ))}
              </div>
              <div className="finalPage-quartosAdm">
                <button type="button" className="button1-quartosAdm" onClick={handleShow}>Excluir quarto</button>
                <button type="button" className="button2-quartosAdm" onClick={handleShowEdit}>Editar quarto</button>
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
            <button className="confirm-button delete" onClick={() => excluir}>Sim, Excluir</button>
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
            <button className="confirm-button edit" onClick={() => {}}>Sim, Editar</button>
          </div>
        </div>
      </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Quartos;