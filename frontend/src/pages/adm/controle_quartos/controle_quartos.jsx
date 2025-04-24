import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import {
  Envelope,
  Telephone,
  Instagram,
  Facebook,
  Whatsapp,
} from "react-bootstrap-icons";
import "./controle_quartos.css";
import NavbarUser from "../../../assets/components/navbarUser";

const Controle_quartos = () => {
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
      <NavbarUser />
      <div className="inicio-acomodacoes">
        <h1 className="acomodacoes-titulo">
          ACOMODAÇÕES <br /> DISPONÍVEIS
        </h1>
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
            min="0"
            required
          />
        </div>

        <div className="reservation-acomodacoes">
          <h4 className="criancas-acomodacoes">CRIANÇAS</h4>
          <input
            type="number"
            className="clientes-acomodacoes"
            min="0"
            required
          />
        </div>

        <button onClick={() => navigate("/")} className="buscar-acomodacoes">
          BUSCAR
        </button>
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
              Experimente o charme do Domo geodésico da Quinta do Ypuã, uma
              acomodação aconchegante e exclusiva para até três pessoas. Com uma
              cama de casal confortável e um ambiente cuidadosamente planejado,
              é o refúgio ideal para quem busca tranquilidade e contato com a
              natureza.
            </h2>
            <button
              onClick={() => navigate("/")}
              className="cardsButton-acomodacoes"
            >
              {" "}
              Reservar{" "}
            </button>
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
              A cabana da Quinta do Ypuã é perfeita para quem busca conforto e
              privacidade em meio à natureza. Com capacidade para até três
              pessoas, conta com uma cama de casal e uma cama de solteiro em um
              espaço bem distribuído. Desfrute de uma estadia tranquila e
              relaxante em um cenário encantador.
            </h2>
            <button
              onClick={() => navigate("/")}
              className="cardsButton-acomodacoes"
            >
              {" "}
              Reservar{" "}
            </button>
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
              O Chalé Família da Quinta do Ypuã é a escolha ideal para quem
              busca aconchego e amplitude em meio à natureza. Com capacidade
              para toda a família, oferece um ambiente bem distribuído,
              garantindo conforto, privacidade e momentos especiais. Relaxe e
              aproveite a tranquilidade desse refúgio exclusivo.
            </h2>
            <button
              onClick={() => navigate("/")}
              className="cardsButton-acomodacoes"
            >
              {" "}
              Reservar{" "}
            </button>
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
              O quarto Charrua (Bus) da Quinta do Ypuã é perfeito para quem
              busca uma experiência única de hospedagem. Com um design acolhedor
              e integrado à natureza, ele combina conforto e originalidade em um
              ambiente charmoso e bem planejado. Desfrute da tranquilidade e do
              charme desse espaço exclusivo, ideal para momentos de descanso e
              conexão com a natureza.
            </h2>
            <button
              onClick={() => navigate("/")}
              className="cardsButton-acomodacoes"
            >
              {" "}
              Reservar{" "}
            </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoes">
          <img
            className="cardsImg-acomodacoes"
            src="/src/assets/imgAcomodacoes/suiteImg_acomodacoes.png"
            alt=""
          />
          <div className="cardsConteudo-acomodacoes">
            <h1 className="cardsTitle-acomodacoes">
              Suíte com cozinha - R$ 390
            </h1>
            <h2 className="cardsText-acomodacoes">
              A Suíte com Cozinha da Quinta do Ypuã é a escolha ideal para quem
              deseja conforto e praticidade em meio à natureza. Com um espaço
              bem planejado, oferece a comodidade de uma cozinha equipada,
              permitindo uma estadia independente e acolhedora. Relaxe e
              aproveite cada momento nesse refúgio exclusivo, onde o bem-estar e
              a tranquilidade são prioridades.
            </h2>
            <button
              onClick={() => navigate("/")}
              className="cardsButton-acomodacoes"
            >
              {" "}
              Reservar{" "}
            </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoes">
          <img
            className="cardsImg-acomodacoes"
            src="/src/assets/imgAcomodacoes/estacionamentoImg_acomodacoes.png"
            alt=""
          />
          <div className="cardsConteudo-acomodacoes">
            <h1 className="cardsTitle-acomodacoes">
              Estacionamento para overlanders - R$ 100
            </h1>
            <h2 className="cardsText-acomodacoes">
              O estacionamento é privativo, garantindo maior segurança e
              comodidade para quem visita o local. Além disso, a pousada é pet
              friendly, permitindo que os hóspedes tragam seus animais de
              estimação.
            </h2>
            <button
              onClick={() => navigate("/")}
              className="cardsButton-acomodacoes"
            >
              {" "}
              Reservar{" "}
            </button>
          </div>
        </div>
        <div>
            <button className="add-btn">
              Adicionar nova acomodação 

              <img src="/src/assets/imgAcomodacoes/sinal-de-mais (2) 1.png" alt="mais" />
            </button>
          </div>
      </div>
    </div>
  );
};

export default Controle_quartos;