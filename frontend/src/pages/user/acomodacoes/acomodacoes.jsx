import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale"; 
import { Envelope, Telephone, Instagram, Facebook, Whatsapp } from "react-bootstrap-icons";
import "./acomodacoes.css";
import NavbarUser from "../../../assets/components/navbarUser";
import { Link, useNavigate } from "react-router-dom";

const Acomodacoes = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null); 
  const [checkOut, setCheckOut] = useState(null); 

  const handleCheckInChange = (date) => {
    setCheckIn(date); 
    setCheckOut(null); 
  };

  const handleCheckOutChange = (date) => {
    setCheckOut(date); 
  };

  return (
    <div className="acomodacoes-page">
      <NavbarUser/>
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
            <input type="number" className="clientes-acomodacoes" min= "0" required />
          </div>

          <div className="reservation-acomodacoes">
            <h4 className="criancas-acomodacoes">CRIANÇAS</h4>
            <input type="number" className="clientes-acomodacoes" min= "0" required />
          </div>

          <button onClick={() => navigate("/")}className="buscar-acomodacoes">BUSCAR</button>
      </div>

      <div className="layout-acomodacoes">
        <div className="cardsFundo-acomodacoes">
          <img 
          className="cardsImg-acomodacoes" 
          src="/src/assets/imgAcomodacoes/domoImg_acomodacoes.png" 
          alt="" 
          />
        <div className="cardsConteudo-acomodacoes">
          <h1 className="cardsTitle-acomodacoes">Domo - R$ 599</h1>
          <h2 className="cardsText-acomodacoes">
            Experimente o charme do Domo geodésico da Quinta do Ypuã, uma acomodação aconchegante e exclusiva para até três pessoas. Com uma cama de casal confortável e um ambiente cuidadosamente planejado, é o refúgio ideal para quem busca tranquilidade e contato com a natureza.
          </h2>
          <button onClick={() => navigate("/quartos")} className="cardsButton-acomodacoes"> Reservar </button>
        </div>
      </div>
      
        <div className="cardsFundo-acomodacoes">
          <img 
          className="cardsImg-acomodacoes" 
          src="/src/assets/imgAcomodacoes/cabanaImg_acomodacoes.png" 
          alt="" 
          />
          <div className="cardsConteudo-acomodacoes">
            <h1 className="cardsTitle-acomodacoes">Cabana - R$ 490</h1>
            <h2 className="cardsText-acomodacoes">
             A cabana da Quinta do Ypuã é perfeita para quem busca conforto e privacidade em meio à natureza. Com capacidade para até três pessoas, conta com uma cama de casal e uma cama de solteiro em um espaço bem distribuído. Desfrute de uma estadia tranquila e relaxante em um cenário encantador.
            </h2>
            <button onClick={() => navigate("/quartos")} className="cardsButton-acomodacoes"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoes">
          <img 
          className="cardsImg-acomodacoes" 
          src="/src/assets/imgAcomodacoes/chaleImg_acomodacoes.png" 
          alt="" 
          />
          <div className="cardsConteudo-acomodacoes">
            <h1 className="cardsTitle-acomodacoes">Chalé Família - R$ 590</h1>
            <h2 className="cardsText-acomodacoes">
             O Chalé Família da Quinta do Ypuã é a escolha ideal para quem busca aconchego e amplitude em meio à natureza. Com capacidade para toda a família, oferece um ambiente bem distribuído, garantindo conforto, privacidade e momentos especiais. Relaxe e aproveite a tranquilidade desse refúgio exclusivo.
            </h2>
            <button onClick={() => navigate("/quartos")} className="cardsButton-acomodacoes"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoes">
          <img 
          className="cardsImg-acomodacoes" 
          src="/src/assets/imgAcomodacoes/charruaImg_acomodacoes.png" 
          alt="" 
          />
          <div className="cardsConteudo-acomodacoes">
            <h1 className="cardsTitle-acomodacoes">Charrua (Bus) - R$ 490</h1>
            <h2 className="cardsText-acomodacoes">
             O quarto Charrua (Bus) da Quinta do Ypuã é perfeito para quem busca uma experiência única de hospedagem. Com um design acolhedor e integrado à natureza, ele combina conforto e originalidade em um ambiente charmoso e bem planejado. Desfrute da tranquilidade e do charme desse espaço exclusivo, ideal para momentos de descanso e conexão com a natureza.
            </h2>
            <button onClick={() => navigate("/quartos")} className="cardsButton-acomodacoes"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoes">
         <img 
         className="cardsImg-acomodacoes" 
         src="/src/assets/imgAcomodacoes/suiteImg_acomodacoes.png" 
         alt="" 
         />
         <div className="cardsConteudo-acomodacoes">
           <h1 className="cardsTitle-acomodacoes">Suíte com cozinha - R$ 390</h1>
           <h2 className="cardsText-acomodacoes">
             A Suíte com Cozinha da Quinta do Ypuã é a escolha ideal para quem deseja conforto e praticidade em meio à natureza. Com um espaço bem planejado, oferece a comodidade de uma cozinha equipada, permitindo uma estadia independente e acolhedora. Relaxe e aproveite cada momento nesse refúgio exclusivo, onde o bem-estar e a tranquilidade são prioridades.
           </h2>
           <button onClick={() => navigate("/quartos")} className="cardsButton-acomodacoes"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoes">
         <img 
         className="cardsImg-acomodacoes" 
         src="/src/assets/imgAcomodacoes/estacionamentoImg_acomodacoes.png" 
         alt="" 
         />
         <div className="cardsConteudo-acomodacoes">
          <h1 className="cardsTitle-acomodacoes">Estacionamento para overlanders - R$ 100</h1>
          <h2 className="cardsText-acomodacoes">
           O estacionamento é privativo, garantindo maior segurança e comodidade para quem visita o local. Além disso, a pousada é pet friendly, permitindo que os hóspedes tragam seus animais de estimação.
          </h2>
          <button onClick={() => navigate("/quartos")} className="cardsButton-acomodacoes"> Reservar </button>
         </div>
        </div>
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
            <Envelope className="emailIcon-acomodacoes"/>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pousadaquintadoypua@gmail.com" target="_blank" className="infoLocalizacao-acomodacoes">pousadaquintadoypua</a>
          </div>
          <div className="gridPhone-acomodacoes">
            <Telephone className="phoneIcon-acomodacoes"/>
            <a href="tel:+554899940-9732" className="infoLocalizacao-acomodacoes">(48) 99940-9732</a>
          </div>
        </div>

        <div className="grid2-acomodacoes">
          <div className="site-acomodacoes">Site</div>
          <Link to="/"  className="infoSite-acomodacoes">Início</Link>
          <Link to="/contato"  className="infoSite-acomodacoes">Contato</Link>
          <Link to="/acomodacoes"  className="infoSite-acomodacoes">Acomodações</Link>
          <Link to="/login"  className="infoSite-acomodacoes">Login</Link>
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
            <Facebook className="faceIcon-acomodacoes"/>
          </a>
          <a href="https://www.instagram.com/pousadaquintadoypua/" target="_blank" rel="noopener noreferrer" className="gridInstagram-acomodacoes">
            <Instagram className="instaIcon-acomodacoes"/>
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