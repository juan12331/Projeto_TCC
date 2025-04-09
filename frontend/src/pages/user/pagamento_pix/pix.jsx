import { useState } from "react";
import "./pix.css";
import Pixbox from "../../../assets/components/boxpix";
import Cartaobox from "../../../assets/components/boxcartao";

function Pix() {
  const [selectedPayment, setSelectedPayment] = useState("pix");

  return (
    <div className="div-mae">
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
            <div className="container-botoes-pix">
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
            <div className="container-campos-pagamento">
              {selectedPayment === "pix" ? <Pixbox /> : <Cartaobox />}
            </div>
          </form>
        </div>
        <h3 className="cancelamento">Cancelamento de Reserva</h3>
        <div className="container-cancelamento">
          <h2 classNme="fevereiro">Cancelamento grátis antes de 01 de fevereiro</h2>
          <p>Acessar a Política de Cancelamento</p>
        </div>
      </div>

      <div className="container-pagamento2">
        <h2>Resumo Da Reserva</h2>
        <img src="/src/assets/img/linha2.png" className="linha2-pix" width="80%" />
        <img src="/src/assets/img/domo_perfil.png" className="domo-pix" />
        <div className="box-detalhes-total">
          {/* começo do input*/}
          <div className="box-color-pix">
            <div className="box-detalhes">
              <h4>Tipo de acomodação:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">Domo</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4>Datas:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">31 de Janeiro, 2025</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4>Saída:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">05 de Fevereiro, 2025</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4>Número de noites:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">5 noites</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4>Hóspedes:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">1 adulto</p>
            </div>
          </div>
          {/* final do input*/}
        </div>
        <img src="/src/assets/img/bolinha.png" className="bolinha-pix" width="80%" />
        <div className="box-detalhes-total2">
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes2">
              <h4 className="outra">Subtotal:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">R$ 2950,00</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes2">
              <h4 className="outra">Impostos (0%):</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">R$ 0 </p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes2">
              <h4 className="outra">Total:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">R$ 2950,00</p>
            </div>
          </div>
          {/* final do input*/}
        </div>
        <img src="/src/assets/img/bolinha.png" className="bolinha-pix" width="80%" />
        <h2 className="finalizar">Deseja finalizar reserva?</h2>
        <div className="container-botao-finalizar">
          <button className="botao-finalizar">Finalizar Reserva</button>
          </div>
      </div>
    </div>

  );
}

export default Pix;

