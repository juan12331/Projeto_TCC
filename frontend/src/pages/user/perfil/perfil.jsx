import "./perfil.css";
import NavbarUser from "../../../assets/components/navbarUser";


function Perfil() {
  return (
    <div className="div-mae-peril">
      <NavbarUser />
      <div className="container-perfil">
        <div className="right-perfil">
          <h1 className="infoText-perfil">Suas Informações</h1>
          <div className="container-imgIcone">
            <img
              className="img-perfil-icone" 
              src="/src/assets/img/perfil.png"
            />
          </div>
          <div className="info-perfil">
            <div className="text-perfil">
              <div className="nomeText-perfil">
                <h1 className="textStyle-perfil">Nome:</h1>
                <h2 className="textInfo-perfil"> Neymar da Silva Santos Junior</h2>
              </div>
              <div className="nomeText-perfil">
                <h1 className="textStyle-perfil">Email:</h1>
                <h2 className="textInfo-perfil"> Neymardasilvasantosjunior@gmail.com</h2>
              </div>
              <div className="nomeText-perfil">
                <h1 className="textStyle-perfil">CPF:</h1>
                <h2 className="textInfo-perfil"> 382.443.358-31</h2>
              </div>
              <div className="nomeText-perfil">
                <h1 className="textStyle-perfil">Numero De Telefone:</h1>
                <h2 className="textInfo-perfil">  55 13 3476-1111</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="linha-perfil">
          <img className="linhaMeio-perfil" src="/src/assets/img/linha.png" width="100%" />
        </div>

        <div className="left-perfil">
          <h1 className="reservados-perfil">Quartos Reservados</h1>
          <div className="domo_perfil_img">
            <img
              className="domo_perfil" src="/src/assets/img/domo_perfil.png"
              width="100%"
            />
          </div>
          <div className="text-perfilFinal">
            <div className="finalText-perfil">
              <h1 className="finalStyle-perfil">Domo:</h1>
              <h2 className="finalInfo-perfil">3 noites</h2>
            </div>
            <div className="finalText-perfil">
              <h1 className="finalStyle-perfil">Total a pagar:</h1>
              <h2 className="finalInfo-perfil">R$ 1770,00</h2>
            </div>
          </div>
          <div className="sairConta-perfil">
            <h1 className="conta-perfil">Deseja sair da sua conta?</h1>
            <button onClick={() => navigate("/")} className="sair-perfil"> Sair </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;