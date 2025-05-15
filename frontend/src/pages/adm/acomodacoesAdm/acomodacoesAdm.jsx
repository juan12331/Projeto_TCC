import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale"; 
import "./acomodacoesAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";
import { useEffect } from "react";
import { getUser, getAllQuartosDisponiveis } from "../../../services/Api_service";

const AcomodacoesAdm = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null); 
  const [checkOut, setCheckOut] = useState(null); 
  const [quartos, setQuartos] = useState([])

    useEffect(() => {
        verificacao()
        getQuartos()
        }, [])

        async function getQuartos(params) {
          getAllQuartosDisponiveis(params).then(data => {
            console.log(data);
            setQuartos(data)
            console.log(quartos[0].fotos_quartos[0].imagem)
          }).catch(error => console.error(error, "erro no get de quartos"))
        }
    
        async function verificacao() {
              try{
                await getUser().then(data => console.log('log'))
              } catch(error) {
                console.log(error);
                if (error.status == 403 || error.status == 401) {
                  window.alert('acesso não autorizado')
                  window.location.href = "/login"
                }
              }
            }

            function view(id) {
              window.location.href = `/quartosAdm/${id}`
            }
        

  const handleCheckInChange = (date) => {
    setCheckIn(date); 
    setCheckOut(null); 
  };

  const handleCheckOutChange = (date) => {
    setCheckOut(date); 
  };

  return (
    <div className="acomodacoes-pageAdm">
      <NavbarAdm/>
      <div className="inicio-acomodacoesAdm">
        <h1 className="acomodacoes-tituloAdm">ACOMODAÇÕES <br /> DISPONÍVEIS</h1>
        <div className="separador-acomodacoesAdm">
          <div className="circle-acomodacoesAdm"></div>
          <div className="divider-acomodacoesAdm"></div>
          <div className="circle-acomodacoesAdm"></div>
        </div>
      </div>

      <div className="fundo-acomodacoesAdm">
        <div className="reservation-acomodacoesAdm">
          <h2 className="checkin-acomodacoesAdm">CHECK-IN</h2>
          <DatePicker
            className="data-acomodacoesAdm"
            selected={checkIn}
            onChange={handleCheckInChange}
            locale={ptBR}
            selectsStart
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>

        <div className="reservation-acomodacoesAdm">
          <h3 className="checkout-acomodacoesAdm">CHECK-OUT</h3>
          <DatePicker
            className="data-acomodacoesAdm"
            selected={checkOut}
            onChange={handleCheckOutChange}
            locale={ptBR}
            selectsEnd
            minDate={checkIn || new Date()}
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy" 
          />
          </div>

          <div className="reservation-acomodacoesAdm">
            <h4 className="adultos-acomodacoesAdm">ADULTOS</h4>
            <input type="number" className="clientes-acomodacoesAdm" min= "0" required  maxLength={100}/>
          </div>

          <div className="reservation-acomodacoesAdm">
            <h4 className="criancas-acomodacoesAdm">CRIANÇAS</h4>
            <input type="number" className="clientes-acomodacoesAdm" min= "0" required  maxLength={100}/>
          </div>

          <button onClick={() => navigate("/")}className="buscar-acomodacoesAdm">BUSCAR</button>
      </div>

      <div className="layout-acomodacoesAdm">
        {quartos.length > 0 ? (
          quartos.map((quartos, index) => (
        <div className="cardsFundo-acomodacoesAdm"  key={quartos.id_quarto} 
        >
         <img 
         className="cardsImg-acomodacoesAdm" 
         src={quartos.fotos_quartos[0].imagem}
         alt="" 
         />
         <div className="cardsConteudo-acomodacoesAdm">
          <h1 className="cardsTitle-acomodacoesAdm">{quartos.nome} - R$ {quartos.preco}</h1>
          <h2 className="cardsText-acomodacoesAdm">
          {quartos.descricao}
          </h2>
          <button onClick={() => view(quartos.id_quarto)} className="cardsButton-acomodacoesAdm"> Reservar </button>
         </div>
        </div>
        ))
        ) : (
          <div className="sem-resultados">Nenhum quarto encontrado</div>
        )
}
      </div>
        
      <div className="final-acomodacoesAdm">
        <div className="fundoFinal-acomodacoesAdm">
          <Link to="" className="gridAdicionar-acomodacoesAdm">
            <h1 className="textAdicionar-acomodacoesAdm">Adicionar nova Acomodação</h1>
            <PlusCircle className="adicionarIcon-acomodacoesAdm"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AcomodacoesAdm;