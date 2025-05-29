import React, { useState, useEffect } from "react";
import img1 from "/src/assets/quartos/image 120.png";
// import placeholderImg from "/src/assets/quartos/image-placeholder.png"; // Assumo que você terá uma imagem de placeholder
import { FaStar } from "react-icons/fa";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate, useParams } from "react-router-dom";
import {  getQuartosDisponiveis, updateQuartos, deleteQuartos, deleteFotos, createFotos } from "../../../services/Api_service";
import "./quartosAdm.css";

function QuartosAdm() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState(0)
  const [descricao, setDescricao] = useState('')

  // Estados individuais para cada checkbox
  const [tv, setTv] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [ducha, setDucha] = useState(false);
  const [cozinha, setCozinha] = useState(false);
  const [toalhas, setToalhas] = useState(false);
  const [frigobar, setFrigobar] = useState(false);
  const [banheira, setBanheira] = useState(false);
  const [arCondicionado, setArCondicionado] = useState(false);

  // Estados para adicionar nova imagem
  const [newImage, setNewImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Tamanho máximo permitido: 16MB em bytes
  const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB

    const options = [
      { id: 1, label: ' TV', state: tv, setState: setTv, key: 'tv'},
      { id: 2, label: ' Wifi', state: wifi, setState: setWifi, key: 'wifi' },
      { id: 3, label: ' Ducha', state: ducha, setState: setDucha, key: 'ducha'},
      { id: 4, label: ' Cozinha', state: cozinha, setState: setCozinha, key: 'cozinha'},
      { id: 5, label: ' Toalhas', state: toalhas, setState: setToalhas, key: 'toalhas'},
      { id: 6, label: ' Frigobar', state: frigobar, setState: setFrigobar, key: 'frigobar'},
      { id: 7, label: ' Banheira', state: banheira, setState: setBanheira, key: 'banheira'},
      { id: 8, label: ' Ar condicionado', state: arCondicionado, setState: setArCondicionado, key: 'ar_condicionado'},
    ];

    const handleCheckboxChange = (optionId) => {
      const option = options.find(opt => opt.id === optionId);
      if (option) {
        option.setState(!option.state);
      }
      
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    };


    async function AtualizarQuarto() {
      updateQuartos(
        id_quarto,
        nome,
        valor,
        descricao,
        tv,
        wifi,
        ducha,
        cozinha,
        toalhas,
        frigobar,
        banheira,
        arCondicionado).then(data => console.log(data)).catch(error => console.log(error))

        handleCloseEdit()
    }

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
  const [showAddImageModal, setShowAddImageModal] = useState(false); // Modal para adicionar imagem

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = () => setShowEditModal(true);

  const handleCloseAddImage = () => {
    setShowAddImageModal(false);
    setNewImage(null);
    setDragOver(false);
  };
  const handleShowAddImage = () => setShowAddImageModal(true);

  const { id_quarto } = useParams();
  const { id_foto } = useParams();
  const navigate = useNavigate();

  // Função para validar o tamanho do arquivo
  const validateFileSize = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(`O arquivo "${file.name}" excede o tamanho máximo permitido de 16MB. Tamanho atual: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return false;
    }
    return true;
  };

  const checkImageSize = (dataUrl) => {
    if (!dataUrl) return false;
    
    // Remover o prefixo data:image/...;base64,
    const base64String = dataUrl.split(',')[1];
    
    // Calcular o tamanho aproximado do arquivo original
    // Base64 adiciona ~33% de overhead, então dividimos por 1.33
    const sizeInBytes = (base64String.length * 0.75);
    
    return sizeInBytes > MAX_FILE_SIZE;
  };

  // Função para converter arquivo em URL
  const fileToUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  // Handlers para drag & drop da nova imagem
  const handleNewImageDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleNewImageDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleNewImageDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      // Validar tamanho do arquivo
      if (!validateFileSize(imageFile)) {
        return;
      }
      
      const imageUrl = await fileToUrl(imageFile);
      setNewImage(imageUrl);
    }
  };

  const handleNewImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        // Validar tamanho do arquivo
        if (!validateFileSize(file)) {
          return;
        }
        
        const imageUrl = await fileToUrl(file);
        setNewImage(imageUrl);
      }
    };
    input.click();
  };

  const removeNewImage = () => {
    setNewImage(null);
  };

  // Função para adicionar nova imagem
  async function adicionarImagem() {
    if (!newImage) {
      alert('Por favor, selecione uma imagem primeiro');
      return;
    }

    // Verificar se a imagem excede o tamanho limite
    if (checkImageSize(newImage)) {
      alert('Arquivo grande demais');
      return;
    }

    try {
      console.log('chegamo aqui')
      // Enviar a nova imagem usando o ID do quarto
      await createFotos(id_quarto, newImage)
        .then(data => {
          console.log('Nova imagem enviada:', data);
          // Recarregar as imagens do quarto
          preencher();
          handleCloseAddImage();
        })
        .catch(error => console.error('Erro ao enviar nova imagem:', error));

    } catch (error) {
      console.error('Erro ao adicionar imagem:', error);
      alert('Erro ao adicionar imagem. Tente novamente.');
    }
  }

  async function  excluir() {
    try{
    await deleteQuartos(id_quarto)
    window.location.href = '/acomodacoesAdm'
    }catch(err){
      window.alert('erro ao excluir quarto')
      console.error('olha o error ao excluir quarto', err)
    } 
  }

  const [mostrarBotoesExcluir, setMostrarBotoesExcluir] = useState(false);

  async function excluirFoto(id_foto) {
    try {
      await deleteFotos(id_foto); // Agora recebe o ID numérico/UUID, não o Base64
      // Atualiza o estado removendo a foto pelo ID
      setImagens(prev => prev.filter(foto => foto.id_foto !== id_foto));
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
      alert("Erro ao excluir imagem. Verifique o console.");
    }
  }

  useEffect(() => {
    preencher();
  }, []);

  useEffect(() => {
    if (quarto) {
      // Certifique-se de que `fotos_quartos` tem a estrutura { id_foto, imagem }
      const fotosDoQuarto = quarto.fotos_quartos || [];
      setImagens(fotosDoQuarto); // Armazena objetos completos, não apenas strings
      setImagemAtual(fotosDoQuarto[0]?.imagem || img1); // Define a imagem atual
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
        // Corrigindo: setQuarto recebe diretamente os dados
        setQuarto(data);
        
        // Preenchendo os campos com os dados do quarto
        setNome(data.nome || '');    
        setValor(data.preco || 0);
        setDescricao(data.descricao || '');
        
        // Preenchendo as checkboxes com base nos dados do quarto
        setTv(data.tv || false);
        setWifi(data.wifi || false);
        setDucha(data.ducha || false);
        setCozinha(data.cozinha || false);
        setToalhas(data.toalhas || false);
        setFrigobar(data.frigobar || false);
        setBanheira(data.banheira || false);
        setArCondicionado(data.ar_condicionado || false);
        
        // Atualizando selectedOptions baseado nos dados
        const opcoesSelecionadas = [];
        if (data.tv) opcoesSelecionadas.push(1);
        if (data.wifi) opcoesSelecionadas.push(2);
        if (data.ducha) opcoesSelecionadas.push(3);
        if (data.cozinha) opcoesSelecionadas.push(4);
        if (data.toalhas) opcoesSelecionadas.push(5);
        if (data.frigobar) opcoesSelecionadas.push(6);
        if (data.banheira) opcoesSelecionadas.push(7);
        if (data.ar_condicionado) opcoesSelecionadas.push(8);
        
        setSelectedOptions(opcoesSelecionadas);
        
        console.log('Quarto carregado:', data);
      } 
          
    } catch (error) {
      console.error("Erro ao carregar dados do quarto:", error);
      setErro(true);
    } finally {
      setCarregando(false);
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
                imagens.map((foto) => ( 
                  <div key={foto.id_foto} className="miniatura-container">
                    <img
                      src={foto.imagem}
                      alt={`Miniatura ${foto.id_foto}`}
                      className={`miniatura ${imagemAtual === foto.imagem ? "ativa" : ""}`}
                      onClick={() => setImagemAtual(foto.imagem)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImg;
                        e.target.alt = "Miniatura indisponível";
                      }}
                    />
                    {mostrarBotoesExcluir && (
                      <button
                        className="btn-excluir-miniatura"
                        onClick={() => excluirFoto(foto.id_foto)}
                      >
                        ❌
                      </button>
                    )}
                  </div>
                ))
                ) : (
                  <p className="sem-miniaturas">Sem imagens disponíveis</p>
                )}
              </div>
            </section>
            <div className="buttonImage-quartosAdm">
              <button 
                type="button" 
                className="edit1-quartosAdm"
                onClick={() => setMostrarBotoesExcluir(prev => !prev)}
              >
                {mostrarBotoesExcluir ? "Cancelar" : "Excluir Imagem"}
              </button>
              <button type="button" className="edit2-quartosAdm" onClick={handleShowAddImage}>
                Adicionar Imagem
              </button>
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
                      checked={option.state}
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
                    <button className="confirm-button delete" onClick={excluir}>Sim, Excluir</button>
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
                    <button className="confirm-button edit" onClick={AtualizarQuarto}>Sim, Editar</button>
                  </div>
                </div>
              </div>

              {/* Modal para Adicionar Imagem */}
              <div className={`modal-container ${showAddImageModal ? 'show' : ''}`}>
                <div className="modal-content modal-add-image slide-up">
                  <div className="modal-header">
                    <h2>📷 Adicionar Nova Imagem</h2>
                    <button className="close-button" onClick={handleCloseAddImage}>×</button>
                  </div>
                  <div className="modal-body">
                    <p style={{fontSize: '12px', color: '#666', marginBottom: '10px', textAlign: 'center'}}>
                      Tamanho máximo por imagem: 16MB
                    </p>
                    <div 
                      className={`image-upload-area ${dragOver ? 'drag-over' : ''} ${newImage ? 'has-image' : ''}`}
                      onDragOver={handleNewImageDragOver}
                      onDragLeave={handleNewImageDragLeave}
                      onDrop={handleNewImageDrop}
                      onClick={handleNewImageClick}
                      style={{
                        border: dragOver ? '2px dashed #007bff' : '2px dashed #ccc',
                        backgroundColor: dragOver ? '#f8f9fa' : newImage ? 'transparent' : '#fafafa',
                        borderRadius: '8px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        backgroundImage: newImage ? `url(${newImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginBottom: '20px'
                      }}
                    >
                      {!newImage ? (
                        <div>
                          <p>Arraste uma imagem aqui ou clique para selecionar</p>
                          <p style={{fontSize: '12px', color: '#666'}}>Nova imagem do quarto</p>
                        </div>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNewImage();
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(255, 0, 0, 0.7)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '25px',
                            height: '25px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="cancel-button" onClick={handleCloseAddImage}>Cancelar</button>
                    <button 
                      className="confirm-button add-image" 
                      onClick={adicionarImagem}
                      disabled={!newImage}
                      style={{
                        opacity: newImage ? 1 : 0.5,
                        cursor: newImage ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Adicionar Imagem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default QuartosAdm;