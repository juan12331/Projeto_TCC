import { useState, useEffect } from "react";
import "./pix.css";
import Pixbox from "../../../assets/components/boxpix";
import Cartaobox from "../../../assets/components/boxcartao";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getUsersByCpf, getQuartosDisponiveis, createReserva } from "../../../services/Api_service";

function Pix() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();
  const [openPopUp, setopenPopUp] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [quarto, setQuarto] = useState('')
  const [checkin, setCheckIn] = useState('')
  const [checkout, setCheckOut] = useState('')
  const [numerodias, setNumerosDias] = useState('')
  const [subtotal, setSubtotal] = useState(0)
  const [imposto, setImposto] = useState(0)
  const [precototal, setTotal] = useState(0)


  const cpf = localStorage.getItem('cpf')
  const { id_quarto } = useParams()

  async function fazerReserva() {
    try{
      await createReserva(cpf, id_quarto, reservationData.checkIn, reservationData.checkOut)
      localStorage.removeItem('reservationData')
      navigate('/Acomodacoes')

    } catch (error) {
      window.alert('erro ao finalizar a reserva')
      console.log(error)
    }
    
  }

  function formatarData(dateString) {
    // Verificar se a string tem o formato esperado
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return "Formato de data inválido. Use YYYY-MM-DD";
    }
  
    // Criar objeto de data
    const data = new Date(dateString);
    
    // Verificar se a data é válida
    if (isNaN(data.getTime())) {
      return "Data inválida";
    }
    
    // Array com os nomes dos meses em português
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    // Obter os componentes da data
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    
    // Retornar a string formatada
    return `${dia.toString().padStart(2, '0')} de ${mes}, ${ano}`;
  }



  const location = useLocation();

  const reservationData = JSON.parse(localStorage.getItem('reservationData'));


  function calcularDiferencaEmDias(dataInicio, dataFim) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataInicio) || !/^\d{4}-\d{2}-\d{2}$/.test(dataFim)) {
      throw new Error("Formato de data inválido. Use YYYY-MM-DD");
    }
  
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);    
    const diferencaMs = fim.getTime() - inicio.getTime();
    const diferencaDias = Math.round(diferencaMs / (24 * 60 * 60 * 1000));
    return diferencaDias;
  }

  // Removida a função subTotal, impostos e total
  // Usaremos o useEffect para calcular esses valores

  useEffect(() => {
    const resData = JSON.parse(localStorage.getItem('reservationData'));
  
    pegarUsuario(cpf);
    pegarQuarto(id_quarto);
    
    if (resData) {
      setCheckIn(formatarData(resData.checkIn));
      setCheckOut(formatarData(resData.checkOut));
  
      const dias = calcularDiferencaEmDias(resData.checkIn, resData.checkOut);
      setNumerosDias(dias);
    }
  
    const unlisten = () => {
      setTimeout(() => {
        if (location.key !== window.history.state?.key) {
          localStorage.removeItem('reservationData');
        }
      }, 0);
    };
  
    return unlisten;
  }, [location, cpf, id_quarto]);

  // useEffect separado para calcular valores após quarto e numerodias estarem disponíveis
  useEffect(() => {
    if (quarto && quarto.preco && numerodias) {
      // Calcular subtotal
      const subTotalValue = quarto.preco * Number(numerodias);
      setSubtotal(subTotalValue);
      
      // Calcular imposto baseado no subtotal
      const impostoValue = Math.round((subTotalValue/100) * 0.99);
      setImposto(impostoValue);
      
      // Calcular total
      setTotal(subTotalValue + impostoValue);
    }
  }, [quarto, numerodias]);

  async function pegarQuarto(id_quarto) {
    const dataQuartos = await getQuartosDisponiveis(id_quarto)
    setQuarto(dataQuartos)
  }
  
  async function pegarUsuario(cpf) {
    const data = await getUsersByCpf(cpf)
    setUsuario(data)
  }

  return (
    <div className="div-mae">
      <div className="container-pagamento">
        <div className="backPix-container">
          <button onClick={() => setopenPopUp(!openPopUp)} className="backPix-button"> ← </button>
          <h1 className="backPix-line">|</h1>
          <button onClick={() => setopenPopUp(!openPopUp)} className="backPix-text" > Voltar </button>
        </div>
        <div className="conteudo-pix">
          <img src="/src/assets/img/bolinha.png" className="bolinha-pix2" width="60%" /> 
          <h3 className="detalhes">Detalhes do Hóspede</h3>
          <div className="container-hospede">
            <form className="cadastro-form-hospede">
              <div className="container-geral-inputs">
                <div className="container-inputs">
                  <input type="text" placeholder="Nome" className="input-pix" maxLength={100} value={usuario.nome} />
                  <input type="text" placeholder="CPF" className="input-pix" maxLength={100} value={usuario.cpf}/>
                  <input type="email" placeholder="Email" className="input-pix" maxLength={100} value={usuario.email} />
                </div>
                <div className="container-inputs2">
                  <input type="text" placeholder="Sobrenome" className="input-pix" maxLength={100} />
                  <input type="tel" placeholder="Telefone" className="input-pix" maxLength={100} value={usuario.telefone} />
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
            <h2 className="fevereiro">Cancelamento até um dia antes da reserva</h2>
            <div className="finalCancel-pix">
              <h1 className="linkCancel-pix">Leia nossa
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
        <img src={quarto.fotos_quartos && quarto.fotos_quartos.length > 0 ? quarto.fotos_quartos[0].imagem : '/src/assets/imgAcomodacoes/placeholder.png'} className="domo-pix" />
        <div className="box-detalhes-total">
          {/* começo do input*/}
          <div className="box-color-pix">
            <div className="box-detalhes">
              <h4 className="info-pix">Nome da acomodação:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">{quarto.nome}</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Entrada:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">{checkin}</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Saída:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">{checkout}</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Número de noites:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">{numerodias} noites</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes">
              <h4 className="info-pix">Hóspedes:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">
                {reservationData && `${reservationData.adultos} e ${reservationData.criancas}`}
              </p>
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
              <p className="domo-text">R$ {subtotal}</p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes2">
              <h4 className="outra">Impostos (0.99%):</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">R$ {imposto} </p>
            </div>
          </div>
          {/* final do input*/}
          {/* começo do input*/}
          <div className="box-color2">
            <div className="box-detalhes2">
              <h4 className="outra">Total:</h4>
            </div>
            <div className="box-detalhes-resultado">
              <p className="domo-text">R$ {precototal}</p>
            </div>
          </div>
          {/* final do input*/}
        </div>
        <img src="/src/assets/img/bolinha.png" className="bolinha-pix" width="80%" />
        <h2 className="finalizar">Deseja finalizar a reserva?</h2>
        <div className="container-botao-finalizar">
          <button className="botao-finalizar" onClick={() => fazerReserva()}>Finalizar Reserva</button>
          <button className="botao-cancelar" onClick={() => setopenPopUp(!openPopUp)}>Cancelar Reserva</button>
          </div>
      </div>
      {
        openPopUp &&
        <div class="popup-overlay">
        <div class="popUp">
            <div class="popUp-message">
                Tem certeza que deseja sair?
            </div>
            <div class="popUp-warning">
                (as alterações feitas serão perdidas)
            </div>
            <div class="buttons-container">
                <button class="btn btn-cancel" onClick={() => setopenPopUp(!openPopUp)} >Cancelar</button>
                <button class="btn btn-confirm" onClick={() => {
                  localStorage.removeItem('reservationData')
                  navigate('/Acomodacoes')
                }} >Sair</button>
            </div>
        </div>
    </div>
      }
      <div className="rodapePage-pix"></div>
    </div>
  );
}

export default Pix;