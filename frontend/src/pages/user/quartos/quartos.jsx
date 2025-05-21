import React, { useState, useEffect } from "react";
import "./quartos.css";
import img1 from "/src/assets/quartos/image 120.png";
import img2 from "/src/assets/quartos/image 114.png";
import img3 from "/src/assets/quartos/image 117.png";
import img4 from "/src/assets/quartos/image 119.png";
import img5 from "/src/assets/quartos/image 121.png";
// import placeholderImg from "/src/assets/quartos/image-placeholder.png"; // Assumo que você terá uma imagem de placeholder
import { FaStar } from "react-icons/fa";
import NavbarUser from "../../../assets/components/navbarUser";
import { useNavigate, useParams } from "react-router-dom";
import { createAvaliacoes, getQuartosDisponiveis } from "../../../services/Api_service";

function Quartos() {
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

  const { id_quarto } = useParams();
  const navigate = useNavigate();

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
        setQuarto(data);
      } else {
        setErro(true);
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
      <div className="fundo_quartos">
        <NavbarUser />
        <div className="loading-container">
          <p>Carregando informações do quarto...</p>
        </div>
      </div>
    );
  }

  // Renderização condicional para quando ocorre um erro
  if (erro) {
    return (
      <div className="fundo_quartos">
        <NavbarUser />
        <div className="error-container">
          <p>Erro ao carregar informações do quarto. Por favor, tente novamente.</p>
          <button onClick={preencher} className="btn-tentar-novamente">Tentar Novamente</button>
        </div>
      </div>
    );
  }

  // Renderização normal quando tudo está carregado
  return (
    <>
      <div className="fundo_quartos">
        <NavbarUser/>
        <div className="back-quartos">
          <button onClick={() => navigate("/acomodacoes")} className="backButton-quartos"> ← </button>
          <h1 className="backLine-quartos">|</h1>
          <button onClick={() => navigate("/acomodacoes")} className="backText-quartos"> ACOMODAÇÕES </button> 
        </div>
        <main className="quarto-container">
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

          <section className="detalhes-quarto">
            <div className="preco-container">
              <p>A PARTIR DE</p>
              <h2>R${quarto?.preco || 0},00</h2>
              <p>POR NOITE</p>
            </div>

            <div className="form-reserva">
              <input 
                type="date" 
                placeholder="Check-in" 
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  // Se o check-out for no mesmo dia ou antes do novo check-in, limpar o check-out
                  if (checkOut && new Date(checkOut) <= new Date(e.target.value)) {
                    setCheckOut('');
                  }
                }}
              />
              <input 
                type="date" 
                placeholder="Check-out"
                value={checkOut}
                min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                disabled={!checkIn}
              />
              <select
                value={adultos}
                onChange={(e) => setAdultos(e.target.value)}
              >
                <option>1 Adulto</option>
                <option>2 Adultos</option>
                <option>3 Adultos</option>
              </select>

              <select
                value={criancas}
                onChange={(e) => setCriancas(e.target.value)}
              >
                <option>0 Crianças</option>
                <option>1 Criança</option>
                <option>2 Crianças</option>
                <option>3 Crianças</option>
              </select>
              <button onClick={saveReservationData} className="btn-reservar">Reservar</button>
            </div>
          </section>
        </main>
        <div className="tudo_domo">
          <div className="domo_titulo">
            <p>CONHEÇA {quarto?.nome || "QUARTO"}</p>
          </div>
          <article>
            <div className="aviso">
              <div>
                <p>
                  {quarto?.descricao || "Descrição do quarto não disponível."}
                </p>
                <p>
                  Os valores exibidos no site estão sujeitos a constantes
                  atualizações. Nos feriados e datas comemorativas o valor da
                  diária também é diferenciado. Para mais detalhes entre em
                  contato por telefone.
                </p>
              </div>
            </div>

            <div className="informacoes_domo">
              <div className="top">
                {/* Renderização condicional para ar condicionado */}
                {quarto?.ar_condicionado && (
                  <div className="line">
                    <div className="item">
                      <img
                        src="/src/assets/quartos/ar-condicionado.png"
                        alt="ar-condicionado"
                      />
                      <p>Ar condicionado</p>
                    </div>
                  </div>
                )}

                <div className="line">
                  {/* Renderização condicional para TV */}
                  {quarto?.tv && (
                    <div className="item">
                      <img
                        src="/src/assets/quartos/televisao.png"
                        alt="televisao"
                      />
                      <p>TV</p>
                    </div>
                  )}
                  {/* Renderização condicional para WiFi */}
                  {quarto?.wifi && (
                    <div className="item">
                      <img src="/src/assets/quartos/wifi.png" alt="wifi" />
                      <p>Wifi</p>
                    </div>
                  )}
                </div>

                <div className="line">
                  {/* Renderização condicional para ducha */}
                  {quarto?.ducha && (
                    <div className="item">
                      <img src="/src/assets/quartos/ducha.png" alt="ducha" />
                      <p>Ducha</p>
                    </div>
                  )}
                  {/* Renderização condicional para frigobar */}
                  {quarto?.frigobar && (
                    <div className="item">
                      <img
                        src="/src/assets/quartos/frigobar.png"
                        alt="frigobar"
                      />
                      <p>Frigobar</p>
                    </div>
                  )}
                </div>

                <div className="line">
                  {/* Renderização condicional para toalhas */}
                  {quarto?.toalhas && (
                    <div className="item">
                      <img src="/src/assets/quartos/toalhas.png" alt="toalhas" />
                      <p>Toalhas</p>
                    </div>
                  )}
                  {/* Renderização condicional para cozinha */}
                  {quarto?.cozinha && (
                    <div className="item">
                      <img
                        src="/src/assets/quartos/cozinha_domo.png"
                        alt="cozinha"
                      />
                      <p>Cozinha</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="botton">
                <div className="line2">
                  <div className="item2">
                    <p className="textcor">Acomoda: </p>
                    <p className="textsem">3 pessoas</p>
                  </div>
                  <div className="item2">
                    <p className="textcor">Camas: </p>
                    <p className="textsem">1 cama de casal</p>
                  </div>
                </div>

                <div className="line2">
                  <div className="item2">
                    <p className="textcor">Check-in: </p>
                    <p className="textsem">14h00</p>
                  </div>
                  <div className="item2">
                    <p className="textcor">Check-out: </p>
                    <p className="textsem">10h00</p>
                  </div>
                </div>

                <div className="line2">
                  <div className="item2">
                    <p className="textcor">Check-in: </p>
                    <p className="textsem">14h00</p>
                  </div>
                  <a href="https://www.pousadadomirantenoronha.com.br/p/politica-da-pousada">
                    Leia nossas políticas
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="avaldomo">
          <p>AVALIAÇÃO</p>
        </div>
        <section className="avaliacoes">
          <div className="testimonials-container">
            {quarto?.avaliacoes_quartos && quarto.avaliacoes_quartos.length > 0 ? (
              quarto.avaliacoes_quartos.map((avaliacao, index) => (
                <div key={index} className="testimonial-item">
                  <div className="testimonial-img-container">
                    <img
                      src="/src/assets/quartos/usuario_domo.png"
                      alt="Usuário"
                      className="testimonial-img"
                    />
                  </div>
                  <p className="testimonial-text">
                    {avaliacao.avaliacao_texto}
                  </p>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="star"
                        size={15}
                        color={i < avaliacao.nota ? "#FFD700" : "#ccc"}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="testimonial-item">
                  <div className="testimonial-img-container">
                    <img
                      src="/src/assets/quartos/usuario_domo.png"
                      alt="Usuário"
                      className="testimonial-img"
                    />
                  </div>
                  <p className="testimonial-text">
                    Quarto super confortável e atendimento excelente
                  </p>
                </div>

                <div className="testimonial-item">
                  <div className="testimonial-img-container">
                    <img
                      src="/src/assets/quartos/usuario_domo.png"
                      alt="Usuário"
                      className="testimonial-img"
                    />
                  </div>
                  <p className="testimonial-text">
                    Excelente acomodação. Voltarei mais vezes
                  </p>
                </div>

                <div className="testimonial-item">
                  <div className="testimonial-img-container">
                    <img
                      src="/src/assets/quartos/usuario_domo.png"
                      alt="Usuário"
                      className="testimonial-img"
                    />
                  </div>
                  <p className="testimonial-text">Quarto aconchegante. Nota 10!</p>
                </div>

                <div className="testimonial-item">
                  <div className="testimonial-img-container">
                    <img
                      src="/src/assets/quartos/usuario_domo.png"
                      alt="Usuário"
                      className="testimonial-img"
                    />
                  </div>
                  <p className="testimonial-text">Ótima acomodação!</p>
                </div>
              </>
            )}
          </div>

          <div className="aval_domo">
            <p>
              Agradecemos por escolher {quarto?.nome || "nosso quarto"} para sua estadia. <br />{" "}
              Compartilhe sua experiência conosco logo abaixo!
            </p>
            <StarRating />

            <div className="aval-container">
              <div className="form-aval">
                <div className="info_form_aval">
                  <input
                    type="name"
                    placeholder="Nome"
                    className="input-nome"
                  />
                  <input
                    type="text"
                    placeholder="CPF"
                    className="input-cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                  <input
                    value={avaliacao_texto} 
                    onChange={(e) => {setAvaliacao_texto(e.target.value)}}
                    type="text"
                    placeholder="Digite sua mensagem"
                    className="input-mensg"
                  />
                  
                  <button onClick={Criar} className="btn-enviar">Enviar avaliação</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Quartos;