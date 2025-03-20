import "./pagina_inicial.css";
import logo from "/src/assets/img/Logo.png";
import fundo from "/src/assets/img/fundo_inicio.png";
import setapbaixo from "/src/assets/img/seta-para-baixo (1).png";
import fotodescricao from "/src/assets/img/fotodescricao.png";
import NavbarUser from "../../../assets/components/navbarUser";

function Inicio() {
  return (
    <>
      <NavbarUser/>

      <div className="fundo">
        <div className="reserva">
          <div>
            <label htmlFor="checkin">Escolha a data de check-in:</label>
            <input id="checkin" type="datetime-local" name="checkin" />

            <label htmlFor="checkout">Escolha a data de check-out:</label>
            <input id="checkout" type="datetime-local" name="checkout" />

            <div>
              <label htmlFor="adulto">Adultos</label>
              <input type="number" id="adulto" name="adulto" />
              <label htmlFor="crianca">Crianças</label>
              <input type="number" id="crianca" name="crianca" />
            </div>
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
            A pousada oferece aos seus clientes um recanto de aconchego e lazer,
            em ambiente rústico e agradável. Ideal para quem gosta de fugir da
            rotina e procura um local de paz para descansar e curtir a natureza.
          </p>
          <p>
            "O Ypuã tem tudo a ver com a natureza, dá para sentir a energia do
            lugar. Eu me preocupo se você vai comer bem, dormir bem e se vai se
            sentir em casa. Vou te mostrar onde encontrar os melhores frutos do
            mar, onde curtir a melhor praia e as melhores ondas. Mas se você não
            quiser fazer nada eu também conheço o melhor lugar."
          </p>
          </h2>
          <p>
            <strong>HEITOR, Anfitrião da pousada</strong>
          </p>
        </div>
      </div>

      <div>
        <h1 className="avaliacao">ÓTIMAS AVALIAÇÕES E FEEDBACKS</h1>

      </div>
    </>
  );
}

export default Inicio