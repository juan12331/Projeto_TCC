import { useState } from "react";
import "./pix.css";

function Pix() {
  const [selectedPayment, setSelectedPayment] = useState("pix");

  return (
    <div className="container-pagamento">
      <h2>Pagamento</h2>
      <img src="/src/assets/img/bolinha.png" className="bolinha-pix" width="40%" />
      <img src="/src/assets/img/flecha.png" className="flecha-pix" width="3%" />
      <h3 className="detalhes">Detalhes do Hóspede</h3>

      <div className="container-hospede">
        <form className="cadastro-form-hospede">
          <div className="container-geral-inputs">
            <div className="container-inputs">
              <input type="text" placeholder="Nome" className="input-pix" />
              <input type="email" placeholder="Email" className="input-pix" />
              <input type="text" placeholder="País" className="input-pix" />
            </div>
            <div className="container-inputs2">
              <input type="text" placeholder="Sobrenome" className="input-pix" />
              <input type="text" placeholder="Telefone" className="input-pix" />
              <input type="text" placeholder="Pedidos Especiais" className="input-pix" />
            </div>
          </div>
        </form>
      </div>

      <h3 className="detalhes">Forma de Pagamento</h3>

      <div className="container-forma">
        <form className="cadastro-form-forma">
          {/* Botões de seleção de pagamento */}
          <div className="container-botoes">
            <button
              type="button"
              className={`botao-forma ${selectedPayment === "pix" ? "ativo" : ""}`}
              onClick={() => setSelectedPayment("pix")}
            >
              <span className="icone">❖</span> Pix
            </button>
            <button
              type="button"
              className={`botao-forma ${selectedPayment === "cartao" ? "ativo" : ""}`}
              onClick={() => setSelectedPayment("cartao")}
            >
              <span className="icone">💳</span> Cartão de Crédito
            </button>
          </div>

          {/* Campos de pagamento */}
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
        </form>
      </div>
      
    </div>
  );
}

export default Pix;
