import React from "react";
import "../components/boxpix.css"; 




function PixBox() {
  return (
    <div className="container-geral-inputs2">
            <div className="container-inputs3">
              <input type="text" placeholder="Nome do Pagador" className="input-forma" />
              <input type="text" placeholder="CPF" className="input-forma" />
            </div>
            <div className="container-inputs4">
              <input type="text" placeholder="Data de nascimento" className="input-forma" />
              <input type="text" placeholder="Telefone" className="input-forma" />
            </div>
          </div>
  );
}

export default PixBox;