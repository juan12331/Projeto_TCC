// import React from "react";
// import "./acomodacoes.css";

// const Acomodacoes = () => {

//     return (
//     <div className="acomodacoes-page">
//         <div className="header-acomodacoes">
//             <h1 className="acomodacoes-titulo">ACOMODAÇÕES DISPONÍVEIS</h1>
//             <img className="separador-acomodacoes" src="./src/assets/separador-acomodacoes.png" alt="" />
//         </div>
//             <div className="data-acomodacoes">
//                 <div className="fundo-acomodacoes">
//                     <div className="reservation-acomodacoes">
//                         <h2 className="checkin-acomodacoes">Check-in</h2>
//                     </div>
//                 </div>
//             </div>
//     </div>
//     );
//   };

// export default Acomodacoes;

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
            <img className="separador-acomodacoes" src="./src/assets/separador-acomodacoes.png" alt="" />
        </div>
                <div className="fundo-acomodacoes">
                    <div className="reservation-acomodacoes">
                        <h2 className="checkin-acomodacoes">Check-in</h2>
                        <DatePicker
                            selected={checkIn}
                            onChange={(date) => setCheckIn(date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            placeholderText="--/--/----"
                            dateFormat="dd/MM/yyyy"
                        />
                            <h3 className="checkout-acomodacoes">Check-out</h3>
                        <DatePicker
                            selected={checkOut}
                            onChange={(date) => setCheckOut(date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn} 
                            placeholderText="--/--/----"
                            dateFormat="dd/MM/yyyy"
                        />
                            {/* Fazer dos Hóspedes */}
                            <h4 className="hospedes-acomodacoes">Hóspedes</h4>
                            <input type="number" required/>
                        <button type="submit" className="buscar-acomodacoes">BUSCAR</button>
                    </div>
                </div>
                    <div className="layout-acomodacoes">

                    </div>
    </div>
    );
  };

export default Acomodacoes;

