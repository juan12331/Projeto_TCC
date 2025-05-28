import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import { Envelope, Telephone, Instagram, Facebook, Whatsapp } from "react-bootstrap-icons";
import "./acomodacoes.css";
import NavbarUser from "../../../assets/components/navbarUser";
import { Link } from "react-router-dom";
import { getAllQuartosDisponiveis, getReservasByTwoDate } from "../../../services/Api_service"

const Acomodacoes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [checkIn, setCheckIn] = useState(null);
  const [quartos, setQuartos] = useState([])
  const [quartosReservados, setQuartosReservados] = useState([])
  const [checkOut, setCheckOut] = useState(null);
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  
  useEffect(() => {
    getQuartos()
    
    // Processar parâmetros da URL vindos da página inicial
    const searchParams = new URLSearchParams(location.search);
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');

    if (checkInParam && checkOutParam) {
      const checkInDate = new Date(checkInParam);
      const checkOutDate = new Date(checkOutParam);
      
      setCheckIn(checkInDate);
      setCheckOut(checkOutDate);
      
      // Automaticamente verificar disponibilidade quando vem da página inicial
      verificarDisponibilidadeComDatas(checkInDate, checkOutDate);
    }
  }, [location.search])

  async function getQuartos(params) {
    getAllQuartosDisponiveis(params).then(data => {
      console.log(data);
      setQuartos(data)
      console.log(quartos[0]?.fotos_quartos[0]?.imagem)
    }).catch(error => console.error(error, "erro no get de quartos"))
  }

  // Nova função para verificar quartos reservados com datas específicas
  async function verificarDisponibilidadeComDatas(dataCheckIn, dataCheckOut) {
    try {
      const reservas = await getReservasByTwoDate(dataCheckIn, dataCheckOut);
      console.log("Reservas encontradas:", reservas);
      
      // Extrair IDs dos quartos reservados
      const idsQuartosReservados = reservas.map(reserva => reserva.id_quarto);
      setQuartosReservados(idsQuartosReservados);
      
      console.log("IDs dos quartos reservados:", idsQuartosReservados);
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error);
      setQuartosReservados([]);
    }
  }

  // Função original para verificar quartos reservados
  async function verificarDisponibilidade() {
    if (!checkIn || !checkOut) {
      alert("Por favor, selecione as datas de check-in e check-out");
      return;
    }

    await verificarDisponibilidadeComDatas(checkIn, checkOut);
  }

  // Função para verificar se um quarto está reservado
  const isQuartoReservado = (idQuarto) => {
    return quartosReservados.includes(idQuarto);
  }

  function view(id) {
    if (isQuartoReservado(id)) {
      alert("Este quarto não está disponível para as datas selecionadas");
      return;
    }
    window.location.href = `/quartos/${id}`
  }

  const handleCheckInChange = (date) => {
    setCheckIn(date);
    setCheckOut(null);
    setQuartosReservados([]); // Limpar quartos reservados ao mudar data
  };

  const handleCheckOutChange = (date) => {
    setCheckOut(date);
    setQuartosReservados([]); // Limpar quartos reservados ao mudar data
  };

  return (
    <div className="acomodacoes-page">
      <NavbarUser />
      <div className="inicio-acomodacoes">
        <h1 className="acomodacoes-titulo">ACOMODAÇÕES <br /> DISPONÍVEIS</h1>
        <div className="separador-acomodacoes">
          <div className="circle-acomodacoes"></div>
          <div className="divider-acomodacoes"></div>
          <div className="circle-acomodacoes"></div>
        </div>
      </div>

      <div className="fundo-acomodacoes">
        <div className="reservation-acomodacoes">
          <h2 className="checkin-acomodacoes">CHECK-IN</h2>
          <DatePicker
            className="data-acomodacoes"
            selected={checkIn}
            onChange={handleCheckInChange}
            locale={ptBR}
            selectsStart
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>

        <div className="reservation-acomodacoes">
          <h3 className="checkout-acomodacoes">CHECK-OUT</h3>
          <DatePicker
            className="data-acomodacoes"
            selected={checkOut}
            onChange={handleCheckOutChange}
            locale={ptBR}
            selectsEnd
            minDate={checkIn || new Date()}
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="reservation-acomodacoes">
          <h4 className="adultos-acomodacoes">ADULTOS</h4>
          <input 
            type="number" 
            className="clientes-acomodacoes" 
            min="1" 
            value={adultos}
            onChange={(e) => setAdultos(parseInt(e.target.value) || 1)}
            required 
          />
        </div>

        <div className="reservation-acomodacoes">
          <h4 className="criancas-acomodacoes">CRIANÇAS</h4>
          <input 
            type="number" 
            className="clientes-acomodacoes" 
            min="0" 
            value={criancas}
            onChange={(e) => setCriancas(parseInt(e.target.value) || 0)}
            required 
          />
        </div>

        <button onClick={verificarDisponibilidade} className="buscar-acomodacoes">BUSCAR</button>
      </div>

      {/* Mostrar informações da busca atual */}
      {checkIn && checkOut && quartosReservados.length >= 0 && (
        <div className="info-busca" style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          margin: '20px',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>
            Resultados para: {checkIn.toLocaleDateString('pt-BR')} - {checkOut.toLocaleDateString('pt-BR')}
          </h3>
          
          {quartosReservados.length > 0 && (
            <p style={{ color: '#f44336', fontWeight: 'bold' }}>
              {quartosReservados.length} quarto{quartosReservados.length > 1 ? 's' : ''} indisponível{quartosReservados.length > 1 ? 'eis' : ''} para este período
            </p>
          )}
        </div>
      )}

      <div className="layout-acomodacoes">
        {quartos.length > 0 ? (
          quartos.map((quarto, index) => (
            <div 
              className={`cardsFundo-acomodacoesAdm ${isQuartoReservado(quarto.id_quarto) ? 'quarto-indisponivel' : ''}`}
              key={quarto.id_quarto}
              style={{
                backgroundColor: isQuartoReservado(quarto.id_quarto) ? '#ffebee' : '',
                border: isQuartoReservado(quarto.id_quarto) ? '2px solid #f44336' : '',
                opacity: isQuartoReservado(quarto.id_quarto) ? 0.7 : 1
              }}
            >
              <img
                className="cardsImg-acomodacoesAdm"
                src={quarto.fotos_quartos && quarto.fotos_quartos.length > 0 ? quarto.fotos_quartos[0].imagem : '/src/assets/imgAcomodacoes/placeholder.png'}
                alt={quarto.nome || 'Quarto'}
              />
              <div className="cardsConteudo-acomodacoesAdm">
                <h1 className="cardsTitle-acomodacoesAdm">
                  {quarto.nome} - R$ {quarto.preco}
                  {isQuartoReservado(quarto.id_quarto) && (
                    <span style={{ color: '#f44336', fontSize: '14px', display: 'block' }}>
                      Indisponível para as datas selecionadas
                    </span>
                  )}
                </h1>
                <h2 className="cardsText-acomodacoesAdm">
                  {quarto.descricao}
                </h2>
                <button 
                  onClick={() => view(quarto.id_quarto)} 
                  className="cardsButton-acomodacoesAdm"
                  disabled={isQuartoReservado(quarto.id_quarto)}
                  style={{
                    backgroundColor: isQuartoReservado(quarto.id_quarto) ? '#ccc' : '',
                    cursor: isQuartoReservado(quarto.id_quarto) ? 'not-allowed' : 'pointer'
                  }}
                > 
                  {isQuartoReservado(quarto.id_quarto) ? 'Indisponível' : 'Reservar'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sem-resultados">Nenhum quarto encontrado</div>
        )
        }
      </div>

      <div className="separadorFinal-acomodacoes">
        <img
          className="imgFinal-acomodacoes"
          src="/src/assets/imgAcomodacoes/separador_final.png"
          alt=""
        />
      </div>

      <div className="final-acomodacoes">
        <div className="logoFinal-acomodacoes">
          <img
            className="imgLogoFinal-acomodacoes"
            src="/src/assets/imgAcomodacoes/logo-acomodacoes.png"
            alt="" />
        </div>

        <div className="grid1-acomodacoes">
          <h1 className="localizacao-acomodacoes">Localização</h1>
          <a href="https://www.google.com/maps/search/?api=1&query=Estrada+Ipua,+6,+Laguna,+SC,+88790-000" target="_blank" className="infoLocalizacao-acomodacoes">Estrada Ipua, nº 6 | Laguna - SC </a>
          <div className="gridEmail-acomodacoes">
            <Envelope className="emailIcon-acomodacoes" />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pousadaquintadoypua@gmail.com" target="_blank" className="infoLocalizacao-acomodacoes">pousadaquintadoypua</a>
          </div>
          <div className="gridPhone-acomodacoes">
            <Telephone className="phoneIcon-acomodacoes" />
            <a href="tel:+554899940-9732" className="infoLocalizacao-acomodacoes">(48) 99940-9732</a>
          </div>
        </div>

        <div className="grid2-acomodacoes">
          <div className="site-acomodacoes">Site</div>
          <Link to="/" className="infoSite-acomodacoes">Início</Link>
          <Link to="/contato" className="infoSite-acomodacoes">Contato</Link>
          <Link to="/acomodacoes" className="infoSite-acomodacoes">Acomodações</Link>
          <Link to="/login" className="infoSite-acomodacoes">Login</Link>
        </div>

        <div className="grid3-acomodacoes">
          <h1 className="atendimento-acomodacoes">Atendimento</h1>
          <h2 className="infoAtendimento-acomodacoes">
            Entre em contato com a gente para informações sobre reservas, disponibilidade de datas, preços e outras dúvidas. Estaremos a disposição para atendê-lo e tornar a sua experiência com a pousada inesquecível.
          </h2>
          <h3 className="infoAtendimento2-acomodacoes">Cadastre-se para receber promoções</h3>
          <div className="email-acomodacoes">
            <input type="email" className="acomodacoes-input" placeholder="Insira seu e-mail" />
          </div>
          <div className="submit-acomodacoes">
            <button type="submit" className="cadastro-acomodacoes">Cadastrar</button>
          </div>
        </div>
      </div>

      <div className="grid4-acomodacoes">
        <div className="Widgets_acomodacoes">
          <a href="https://api.whatsapp.com/send?phone=5548999409732&text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20pousada%20e%20tenho%20interesse%20em%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer" className="gridWhatsapp-acomodacoes">
            <Whatsapp className="whatsIcon-acomodacoes" />
          </a>
          <a href="https://www.facebook.com/pousadaquintadoypua" target="_blank" rel="noopener noreferrer" className="gridFacebook-acomodacoes">
            <Facebook className="faceIcon-acomodacoes" />
          </a>
          <a href="https://www.instagram.com/pousadaquintadoypua/" target="_blank" rel="noopener noreferrer" className="gridInstagram-acomodacoes">
            <Instagram className="instaIcon-acomodacoes" />
          </a>
        </div>

        <div className="direito-acomodacoes">
          <h1 className="Textdireito-acomodacoes">© Pousada Quinta do Ypuã / Todos os direitos reservados</h1>
        </div>
      </div>

      <div className="rodapePage-acomodacoes"></div>
    </div>
  );
};

export default Acomodacoes;