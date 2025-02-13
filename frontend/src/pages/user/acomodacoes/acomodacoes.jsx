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
        <h1 className="acomodacoes-titulo">ACOMODAÇÕES DISPONÍVEIS</h1>
        <img
          className="separador-acomodacoes"
          src="./src/assets/separador-acomodacoes.png"
          alt=""
        />
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
            placeholderText="--/--/----"
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
            placeholderText="--/--/----"
            dateFormat="dd/MM/yyyy"
          />
          </div>
          <div className="reservation-acomodacoes">
          {/* Fazer dos Hóspedes */}
          <h4 className="hospedes-acomodacoes">HÓSPEDES</h4>
          <input type="number" className="clientes-acomodacoes" required />
          </div>
          <button type="submit" className="buscar-acomodacoes">BUSCAR</button>
      </div>

      <div className="layout-acomodacoes"></div>
    </div>
  );
};

export default Acomodacoes;
