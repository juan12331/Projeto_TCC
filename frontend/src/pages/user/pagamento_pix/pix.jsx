import { useState } from "react";
import "./pix.css";
import Pixbox from "../../../assets/components/boxpix";
import Cartaobox from "../../../assets/components/boxcartao";
import { useNavigate } from "react-router-dom";

function Pix() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();

  return (
    <div className="div-mae">
      <div className="container-pagamento">
        <div className="backPix-container">
          <button onClick={() => navigate("/quartos")} className="backPix-button"> ← </button> {/* JUAN, É DE ACORDO COM O QUARTO SELECIONADO ---> ISABELA*/}
          <h1 className="backPix-line">|</h1>
          <button onClick={() => navigate("/quartos")} className="backPix-text"> DOMO </button> {/* JUAN, É DE ACORDO COM O NOME DO QUARTO SELECIONADO ---> ISABELA*/}
        </div>
        <div className="conteudo-pix">
          <img src="/src/assets/img/bolinha.png" className="bolinha-pix2" width="60%" /> 
          <h3 className="detalhes">Detalhes do Hóspede</h3>
          <div className="container-hospede">
            <form className="cadastro-form-hospede">
              <div className="container-geral-inputs">
                <div className="container-inputs">
                  <input type="text" placeholder="Nome" className="input-pix" maxLength={100} />
                  <input type="text" placeholder="CPF" className="input-pix" maxLength={100} />
                  <input type="email" placeholder="Email" className="input-pix" maxLength={100} />
                </div>
                <div className="container-inputs2">
                  <input type="text" placeholder="Sobrenome" className="input-pix" maxLength={100} />
                  <input type="tel" placeholder="Telefone" className="input-pix" maxLength={100} />
                  <input type="text" placeholder="Pedidos Especiais" className="input-pix" maxLength={100} />
                </div>
              </div>
              <div className="finalInput-pix">
                <h1 className="linkInput-pix">Ao finalizar esta reserva, eu reconheço que li e aceito a
                  <a href="https://www.wixhotels.com/index.html?instance=POkngY5eQwsCu5wvqjCYjw6RGGc55DmUpTeIm1fXd4U.eyJpbnN0YW5jZUlkIjoiZTVhNjcwZDItMjA1Ny00ZWRiLTlhNzEtOGU1MDg4NjBhNWJkIiwiYXBwRGVmSWQiOiIxMzVhYWQ4Ni05MTI1LTYwNzQtNzM0Ni0yOWRjNmEzYzliY2YiLCJtZXRhU2l0ZUlkIjoiYTE1ZmZmNjYtZjAzNy00MjQxLThmNmMtZTc3NjQxODRjYTkzIiwic2lnbkRhdGUiOiIyMDI1LTAxLTMxVDExOjExOjA3LjIwM1oiLCJ2ZW5kb3JQcm9kdWN0SWQiOiJob3RlbHMiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiIwMWMxNWNlOC1mMDRmLTQyZTYtOGUwYS02ZTc1YmE4M2NhZGIiLCJhaWQiOiJlNTYzYmQ4Yi1kZDA4LTQ4ZTgtOThlZC1jZGYyMzc3NDQ5ZTQiLCJiaVRva2VuIjoiNDRmOThmYjQtZDA2MC0wYzlhLTE1MWQtNjkyNmM5ZTQ2ZjJlIiwic2l0ZU93bmVySWQiOiJiODdmODNmMi05NWY3LTQyODktYWM2MC04MTE4OWUwYjg2ZjYifQ&deviceType=desktop&cas=YuSMvH0EPqxLKpG-1K7xJSDwSdlqjIsTQwLmFHlQPis.eyJydSI6Imh0dHBzOi8vd3d3LnF1aW50YWRveXB1YS5jb20vYWNvbW9kYWNvZXMvcm9vbXMvMGY2NWMzZTktOTQ1MC00YmZlLWIwOTktMjRhZWU3MzVlNDA2IiwidnQiOiIyNGQwY2ViODFlMWVlYjBhNWU4ZDc2ZDdhMjE0YmRjYjhiODczNDY4ZTVmZTU5ZDVhZmYzMjJjMDFhNTUxZDA5Yzk2ODZlMzgyOWQxZDIwNTVlZWE1ODBiMjYwOGVjZjgxZTYwOTk0ZDUzOTY0ZTY0N2FjZjQzMWU0Zjc5OGJjZDFjYzRiMWVkMjQ0MWYxMjEwMjQ3YTM0MmU2NDE5ZGJiNzQwMzQ3NTcwNWIxNDE2YjIxODgwMTI4MTJkZGZhNDg5ZDVmYjdkNmNlNGI5NDZjODU2ZDFiYzI4ZTE5M2MxYWEwY2IxYzgxNDNiMGRkNThlYWQ1NzgyNWM5NmM0MjMyYTZkZGQ2NjRkNGM4ZjYwODc0ZmQ2MmE0YTM3MTUwNDAifQ&compId=i4e717w5_0&userLanguage=pt&noCancel=false#/terms/0f65c3e9-9450-4bfe-b099-24aee735e406"
                  className="linkInput-pix" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  Política da Propriedade</a>
                </h1>
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
                  <span className="iconePix">❖</span> Pix
                </button>
                <button
                  type="button"
                  className={`botao-forma ${selectedPayment === "cartao" ? "ativo" : ""}`}
                  onClick={() => setSelectedPayment("cartao")}
                >
                  <span className="iconeInsta">💳</span> Cartão de Crédito
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
            <h2 className="fevereiro">Cancelamento grátis antes de 01 de fevereiro</h2>
            <div className="finalCancel-pix">
              <h1 className="linkCancel-pix">Acessar a
                <a href="https://www.wixhotels.com/index.html?instance=POkngY5eQwsCu5wvqjCYjw6RGGc55DmUpTeIm1fXd4U.eyJpbnN0YW5jZUlkIjoiZTVhNjcwZDItMjA1Ny00ZWRiLTlhNzEtOGU1MDg4NjBhNWJkIiwiYXBwRGVmSWQiOiIxMzVhYWQ4Ni05MTI1LTYwNzQtNzM0Ni0yOWRjNmEzYzliY2YiLCJtZXRhU2l0ZUlkIjoiYTE1ZmZmNjYtZjAzNy00MjQxLThmNmMtZTc3NjQxODRjYTkzIiwic2lnbkRhdGUiOiIyMDI1LTAxLTMxVDExOjExOjA3LjIwM1oiLCJ2ZW5kb3JQcm9kdWN0SWQiOiJob3RlbHMiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiIwMWMxNWNlOC1mMDRmLTQyZTYtOGUwYS02ZTc1YmE4M2NhZGIiLCJhaWQiOiJlNTYzYmQ4Yi1kZDA4LTQ4ZTgtOThlZC1jZGYyMzc3NDQ5ZTQiLCJiaVRva2VuIjoiNDRmOThmYjQtZDA2MC0wYzlhLTE1MWQtNjkyNmM5ZTQ2ZjJlIiwic2l0ZU93bmVySWQiOiJiODdmODNmMi05NWY3LTQyODktYWM2MC04MTE4OWUwYjg2ZjYifQ&deviceType=desktop&cas=YuSMvH0EPqxLKpG-1K7xJSDwSdlqjIsTQwLmFHlQPis.eyJydSI6Imh0dHBzOi8vd3d3LnF1aW50YWRveXB1YS5jb20vYWNvbW9kYWNvZXMvcm9vbXMvMGY2NWMzZTktOTQ1MC00YmZlLWIwOTktMjRhZWU3MzVlNDA2IiwidnQiOiIyNGQwY2ViODFlMWVlYjBhNWU4ZDc2ZDdhMjE0YmRjYjhiODczNDY4ZTVmZTU5ZDVhZmYzMjJjMDFhNTUxZDA5Yzk2ODZlMzgyOWQxZDIwNTVlZWE1ODBiMjYwOGVjZjgxZTYwOTk0ZDUzOTY0ZTY0N2FjZjQzMWU0Zjc5OGJjZDFjYzRiMWVkMjQ0MWYxMjEwMjQ3YTM0MmU2NDE5ZGJiNzQwMzQ3NTcwNWIxNDE2YjIxODgwMTI4MTJkZGZhNDg5ZDVmYjdkNmNlNGI5NDZjODU2ZDFiYzI4ZTE5M2MxYWEwY2IxYzgxNDNiMGRkNThlYWQ1NzgyNWM5NmM0MjMyYTZkZGQ2NjRkNGM4ZjYwODc0ZmQ2MmE0YTM3MTUwNDAifQ&compId=i4e717w5_0&userLanguage=pt&noCancel=false#/terms/0f65c3e9-9450-4bfe-b099-24aee735e406"
                className="linkCancel-pix" 
                target="_blank" 
                rel="noopener noreferrer">
                Política de Cancelamento</a>
              </h1>
            </div>
          </div>
        </div>
        <div className="rodapePage-pix"></div>
      </div>

      <div className="container-pagamento2">
        <h2 className="resumo-pix">RESUMO DA RESERVA</h2>
        <img src="/src/assets/img/linha2.png" className="linha2-pix" width="80%" />
        <img src="/src/assets/img/domo_perfil.png" className="domo-pix" />
        <div className="box-detalhes-total">
          {/* começo do input*/}
          <div className="box-color-pix">
            <div className="box-detalhes">
              <h4 className="info-pix">Tipo de acomodação:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">Domo</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Datas:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">31 de Janeiro, 2025</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Saída:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">05 de Fevereiro, 2025</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Número de noites:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">5 noites</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Hóspedes:</h4>
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
        <h2 className="finalizar">Deseja finalizar a reserva?</h2>
        <div className="container-botao-finalizar">
          <button className="botao-finalizar">Finalizar Reserva</button>
          </div>
      </div>
      <div className="rodapePage-pix"></div>
    </div>

  );
}

export default Pix;

