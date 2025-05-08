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
              <h3 className="nomeText-perfil"><h4 className="textStyle-perfil">Nome:</h4> Neymar da Silva Santos Junior</h3>
              <h3 className="emailText-perfil"><h4 className="textStyle-perfil">Email:</h4> Neymardasilvasantosjunior@gmail.com</h3>
              <h3 className="cpfText-perfil"><h4 className="textStyle-perfil">CPF:</h4> 382.443.358-31</h3>
              <h3 className="telefoneText-perfil"><h4 className="textStyle-perfil">Numero De Telefone:</h4> 55 13 3476-1111</h3>
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
            <h4 className="domoText-perfil">Domo: 3 noites</h4>
            <h4 className="pagarText-perfil">Total a pagar: R$ 1770,00</h4>
          </div>
          <button onClick={() => navigate("/")} className="sair-perfil"> Sair </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;