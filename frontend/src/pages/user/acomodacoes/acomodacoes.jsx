import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./acomodacoes.css";

const Acomodacoes = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <div className="acomodacoes-page">
      <div className="header-acomodacoes">
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
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="reservation-acomodacoes">
          <h3 className="checkout-acomodacoes">CHECK-OUT</h3>
          <DatePicker
            className="data-acomodacoes"
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy" 
          />
          </div>
          <div className="reservation-acomodacoes">
          {/* Fazer dos Hóspedes */}
          <h4 className="hospedes-acomodacoes">HÓSPEDES</h4>
          <input type="number" className="clientes-acomodacoes" required />
          </div>
          <button onclick={() => navigate("/")}className="buscar-acomodacoes">BUSCAR</button>
      </div>

      <div className="layout-acomodacoes">
        <div className="domoFundo-acomodacoes">
        <img className="domoImg-acomodacoes" src="/src/assets/domoImg_acomodacoes.png" alt="" />
            <div className="domoConteudo-acomodacoes">
                <h1 className="domoTitle-acomodacoes">Domo - R$ 599</h1>
                <h2 className="domoText-acomodacoes">
                    Experimente o charme do Domo geodésico da Quinta do Ypuã, uma acomodação aconchegante e exclusiva para até três pessoas. 
                    Com uma cama de casal confortável e um ambiente cuidadosamente planejado, é o refúgio ideal para quem busca tranquilidade e contato com a natureza.
                </h2>
                <button onClick={() => navigate("/")} className="domoButton-acomodacoes"> Reservar </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Acomodacoes;
