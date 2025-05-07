import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale"; 
import "./acomodacoesAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";
import { useEffect } from "react";
import { getUser } from "../../../services/Api_service";

const AcomodacoesAdm = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null); 
  const [checkOut, setCheckOut] = useState(null); 

    useEffect(() => {
        verificacao()
        }, [])
    
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
            <input type="number" className="clientes-acomodacoesAdm" min= "0" required />
          </div>

          <div className="reservation-acomodacoesAdm">
            <h4 className="criancas-acomodacoesAdm">CRIANÇAS</h4>
            <input type="number" className="clientes-acomodacoesAdm" min= "0" required />
          </div>

          <button onClick={() => navigate("/")}className="buscar-acomodacoesAdm">BUSCAR</button>
      </div>

      <div className="layout-acomodacoesAdm">
        <div className="cardsFundo-acomodacoesAdm">
          <img 
          className="cardsImg-acomodacoesAdm" 
          src="/src/assets/imgAcomodacoes/domoImg_acomodacoes.png" 
          alt="" 
          />
        <div className="cardsConteudo-acomodacoesAdm">
          <h1 className="cardsTitle-acomodacoesAdm">Domo - R$ 599</h1>
          <h2 className="cardsText-acomodacoesAdm">
            Experimente o charme do Domo geodésico da Quinta do Ypuã, uma acomodação aconchegante e exclusiva para até três pessoas. Com uma cama de casal confortável e um ambiente cuidadosamente planejado, é o refúgio ideal para quem busca tranquilidade e contato com a natureza.
          </h2>
          <button onClick={() => navigate("/quartosAdm")} className="cardsButton-acomodacoesAdm"> Reservar </button>
        </div>
      </div>
      
        <div className="cardsFundo-acomodacoesAdm">
          <img 
          className="cardsImg-acomodacoesAdm" 
          src="/src/assets/imgAcomodacoes/cabanaImg_acomodacoes.png" 
          alt="" 
          />
          <div className="cardsConteudo-acomodacoesAdm">
            <h1 className="cardsTitle-acomodacoesAdm">Cabana - R$ 490</h1>
            <h2 className="cardsText-acomodacoesAdm">
             A cabana da Quinta do Ypuã é perfeita para quem busca conforto e privacidade em meio à natureza. Com capacidade para até três pessoas, conta com uma cama de casal e uma cama de solteiro em um espaço bem distribuído. Desfrute de uma estadia tranquila e relaxante em um cenário encantador.
            </h2>
            <button onClick={() => navigate("/quartosAdm")} className="cardsButton-acomodacoesAdm"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoesAdm">
          <img 
          className="cardsImg-acomodacoesAdm" 
          src="/src/assets/imgAcomodacoes/chaleImg_acomodacoes.png" 
          alt="" 
          />
          <div className="cardsConteudo-acomodacoesAdm">
            <h1 className="cardsTitle-acomodacoesAdm">Chalé Família - R$ 590</h1>
            <h2 className="cardsText-acomodacoesAdm">
             O Chalé Família da Quinta do Ypuã é a escolha ideal para quem busca aconchego e amplitude em meio à natureza. Com capacidade para toda a família, oferece um ambiente bem distribuído, garantindo conforto, privacidade e momentos especiais. Relaxe e aproveite a tranquilidade desse refúgio exclusivo.
            </h2>
            <button onClick={() => navigate("/quartosAdm")} className="cardsButton-acomodacoesAdm"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoesAdm">
          <img 
          className="cardsImg-acomodacoesAdm" 
          src="/src/assets/imgAcomodacoes/charruaImg_acomodacoes.png" 
          alt="" 
          />
          <div className="cardsConteudo-acomodacoesAdm">
            <h1 className="cardsTitle-acomodacoesAdm">Charrua (Bus) - R$ 490</h1>
            <h2 className="cardsText-acomodacoesAdm">
             O quarto Charrua (Bus) da Quinta do Ypuã é perfeito para quem busca uma experiência única de hospedagem. Com um design acolhedor e integrado à natureza, ele combina conforto e originalidade em um ambiente charmoso e bem planejado. Desfrute da tranquilidade e do charme desse espaço exclusivo, ideal para momentos de descanso e conexão com a natureza.
            </h2>
            <button onClick={() => navigate("/quartosAdm")} className="cardsButton-acomodacoesAdm"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoesAdm">
         <img 
         className="cardsImg-acomodacoesAdm" 
         src="/src/assets/imgAcomodacoes/suiteImg_acomodacoes.png" 
         alt="" 
         />
         <div className="cardsConteudo-acomodacoesAdm">
           <h1 className="cardsTitle-acomodacoesAdm">Suíte com cozinha - R$ 390</h1>
           <h2 className="cardsText-acomodacoesAdm">
             A Suíte com Cozinha da Quinta do Ypuã é a escolha ideal para quem deseja conforto e praticidade em meio à natureza. Com um espaço bem planejado, oferece a comodidade de uma cozinha equipada, permitindo uma estadia independente e acolhedora. Relaxe e aproveite cada momento nesse refúgio exclusivo, onde o bem-estar e a tranquilidade são prioridades.
           </h2>
           <button onClick={() => navigate("/quartosAdm")} className="cardsButton-acomodacoesAdm"> Reservar </button>
          </div>
        </div>

        <div className="cardsFundo-acomodacoesAdm">
         <img 
         className="cardsImg-acomodacoesAdm" 
         src="/src/assets/imgAcomodacoes/estacionamentoImg_acomodacoes.png" 
         alt="" 
         />
         <div className="cardsConteudo-acomodacoesAdm">
          <h1 className="cardsTitle-acomodacoesAdm">Estacionamento para overlanders - R$ 100</h1>
          <h2 className="cardsText-acomodacoesAdm">
           O estacionamento é privativo, garantindo maior segurança e comodidade para quem visita o local. Além disso, a pousada é pet friendly, permitindo que os hóspedes tragam seus animais de estimação.
          </h2>
          <button onClick={() => navigate("/quartosAdm")} className="cardsButton-acomodacoesAdm"> Reservar </button>
         </div>
        </div>
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