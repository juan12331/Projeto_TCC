import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pagina_inicial.css";
import setapbaixo from "/src/assets/img/seta-para-baixo (1).png";
import fotodescricao from "/src/assets/img/fotodescricao.png";
import NavbarUser from "../../../assets/components/navbarUser";

const images = Object.entries(
  import.meta.glob("../../../assets/colagem/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
)
  .sort((a, b) => {
    const getNumber = (filename) => parseInt(filename[0].match(/\d+/)[0], 10);
    return getNumber(a) - getNumber(b);
  })
  .map(([, module]) => module.default);

function Inicio() {
  const navigate = useNavigate();
  
  // Estados para os campos de busca
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);

  // Função para lidar com a busca
  const handleBuscar = () => {
    if (!checkIn || !checkOut) {
      alert("Por favor, selecione as datas de check-in e check-out");
      return;
    }

    // Verificar se a data de check-out é posterior ao check-in
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("A data de check-out deve ser posterior à data de check-in");
      return;
    }

    // Criar parâmetros de busca para passar via URL
    const searchParams = new URLSearchParams({
      checkIn: checkIn,
      checkOut: checkOut,
      adultos: adultos.toString(),
      criancas: criancas.toString()
    });

    // Redirecionar para a página de acomodações com os parâmetros
    navigate(`/acomodacoes?${searchParams.toString()}`);
  };

  // Função para definir data mínima (hoje)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Função para definir data mínima do checkout (dia após checkin)
  const getMinCheckOutDate = () => {
    if (!checkIn) return getMinDate();
    const checkInDate = new Date(checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split('T')[0];
  };

  return (
    <>
     <NavbarUser />

      <div className="fundo">
        <div className="reserva-container">
          <div className="reserva">
            <div className="campo">
              <label htmlFor="checkin">CHECK-IN</label>
              <input 
                id="checkin" 
                type="date" 
                name="checkin" 
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  // Limpar checkout se for anterior ao novo checkin
                  if (checkOut && new Date(checkOut) <= new Date(e.target.value)) {
                    setCheckOut('');
                  }
                }}
                min={getMinDate()}
              />
            </div>

            <div className="campo">
              <label htmlFor="checkout">CHECK-OUT</label>
              <input 
                id="checkout" 
                type="date" 
                name="checkout" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={getMinCheckOutDate()}
                disabled={!checkIn}
              />
            </div>

            <div className="campo">
              <label htmlFor="adulto">ADULTOS</label>
              <input 
                type="number" 
                id="adulto" 
                name="adulto" 
                value={adultos}
                onChange={(e) => setAdultos(parseInt(e.target.value) || 1)}
                min="1"
              />
            </div>
            <div className="campo">
              <label htmlFor="crianca">CRIANÇAS</label>
              <input 
                type="number" 
                id="crianca" 
                name="crianca" 
                value={criancas}
                onChange={(e) => setCriancas(parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <button className="buscar-btn" onClick={handleBuscar}>BUSCAR</button>
          </div>
        </div>
      </div>

      <div className="ambiente">
        <h2>AMBIENTE PERFEITO, PRAIA MARAVILHOSA E HOSPEDAGENS ENCANTADORAS</h2>
        <div>
          <img src={setapbaixo} alt="Seta para baixo" className="setapbaixo" />
        </div>
      </div>

      <div className="descricao">
        <img className="img3" src={fotodescricao} alt="Descrição" />
        <div className="pousadat">
          <h1>A pousada Quinta do Ypuã</h1>
          <h2>
            <p>
              A pousada oferece aos seus clientes um recanto de aconchego e
              lazer, em ambiente rústico e agradável. Ideal para quem gosta de
              fugir da rotina e procura um local de paz para descansar e curtir
              a natureza.
            </p>
            <br />
            <p>
              "O Ypuã tem tudo a ver com a natureza, dá para sentir a energia do
              lugar. Eu me preocupo se você vai comer bem, dormir bem e se vai
              se sentir em casa. Vou te mostrar onde encontrar os melhores
              frutos do mar, onde curtir a melhor praia e as melhores ondas. Mas
              se você não quiser fazer nada eu também conheço o melhor lugar."
            </p>
          </h2>
          <p>
            <strong>HEITOR, Anfitrião da pousada</strong>
          </p>
        </div>
      </div>

      <div>
        <h1 className="avaliacao">ÓTIMAS AVALIAÇÕES E FEEDBACKS</h1>

        <img
          className="celular"
          src="/src/assets/img/avaliacaocel.png"
          alt=""
        />

        <img className="coment" src="/src/assets/img/coment.png" alt="" />
      </div>

      <div className="acomodacaorequi">
        <h1 className="quartosinicial">ACOMODAÇÕES MAIS REQUISITADAS</h1>
        <div className="imgquartos">
          <div className="textsuitecoz">
            <img
              className="suitecoz domo123"
              src="/src/assets/img/suitecom_cozinha.png"
              alt=""
              onClick={() => {window.location.href = '/acomodacoes'}}
            />
            <p>Suíte com cozinha</p>
          </div>
          <div className="textdomo">
          <img className="domo123" src="/src/assets/img/domoinicio.png" alt="" 
          onClick={() => {window.location.href = '/acomodacoes'}}   
          />
            <p>Domo</p>
          </div>
          <div className="textchurrua">
            <img
              className="churrua domo123"
              src="/src/assets/img/churrua_inicio.png"
              alt=""
              onClick={() => {window.location.href = '/acomodacoes'}}
            />
            <p>Churrua</p>
          </div>
        </div>
      </div>

      <div className="galeria">
        <p>Seu refúgio perfeito está te esperando. Reserve agora e relaxe!</p>
        <div className="fotos">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagem ${index + 1}`}
              className={`fotos${index + 1}`}
              
            />
          ))}
        </div>
      </div>

      <div className="rosa"></div>

      <footer>
        <div className="top">
          <img
            className="logofinal"
            src="/src/assets/img/quinta.png"
            alt="logofinal"
          />

          <div className="localizacao">
            <p>Localização</p>
            <div className="textolocal">
              <p>Estrada Ipua, nº 6</p>
              <p>Laguna - SC | 88790-000</p>

              <div className="info-item">
                <img src="/src/assets/img/emailfinal.png" alt="email" />
                <p>pousadaquintadoypua@gmail.com</p>
              </div>

              <div className="info-item">
                <img src="/src/assets/img/telefonefinal.png" alt="telefone" />
                <p>(48) 99940-9732</p>
              </div>
            </div>
          </div>

          <div className="site">
            <p>Site</p>
            <div className="barra">
              <p>Inicio</p>
              <p>Contato</p>
              <p>Acomodações</p>
              <p>Perfil</p>
            </div>
          </div>

          <div className="atendimento">
            <p>Atendimento</p>
            <div className="tcontato">
              <p>
                Entre em contato com a gente para informações sobre reservas,
                disponibilidade de datas, preços e outras dúvidas. Estaremos a
                disposição para atendê-lo e tornar a sua experiência com a
                pousada inesquecível.
              </p>
            </div>
          </div>
        </div>

        <div className="promocao-container">
          <div className="form-container">
            <div className="info_form_container">
              <p>Cadastre-se para receber promoções</p>
              <input
                type="email"
                placeholder="Insira seu email"
                className="input-email"
              />
              <button className="btn-cadastrar">Cadastrar</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Inicio;