import React from "react";
import "../components/boxcartao.css"; 




function CartaoBox() {
  return (
    <div className="container-geral-inputs2">
    <div className="container-inputs5">
      <input type="text" placeholder="Número do Cartão" className="input-forma2" />
      <input type="text" placeholder="Nome impresso no cartão" className="input-forma2" />
      <input type="text" placeholder="Cód. de segurança" className="input-forma2" />
      <input type="text" placeholder=" parcelas (maximo 20)" className="input-forma2" />
    </div>
    <div className="container-inputs6">
     <input type="text" placeholder="Validade" className="input-forma2" />
      <input type="text" placeholder="CPF" className="input-forma2" />
      <input type="text" placeholder="Data de nascimento" className="input-forma2" />
      <input type="text" placeholder="Celular" className="input-forma2" />
    </div>
  </div>
  );
}

export default CartaoBox;