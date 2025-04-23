import "./perfil.css";
import NavbarAdm from "../../../assets/components/navbarAdm";


function Perfil() {
  return (
    <div className="div-mae-peril">
      <NavbarAdm />
      <div className="container-perfil">
        <div className="parte-de-cima">
          <div className="img-perfil-icone">
            <img
              className src="/src/assets/img/perfil.png"
            />
          </div>
          <div className="info-perfil">
            <div className="img-possition-perfil">
              <img
                src="/src/assets/img/infoUsuario.png"
              />
            </div>
            <div className="text-perfil">
              <div className="text-perfil-1">
                <h3>Nome: Neymar da Silva Santos Junior</h3>
                <div className="Email-perfil">
                  <h3>Email: Neymardasilvasantosjunior@gmail.com</h3>
                </div>
              </div>
              <div className="text-perfil-2">
                <h3>CPF: 382.443.358-31</h3>
                <div className="telefone-perfil">
                  <h3>Numero De Telefone: 55 13 3476-1111</h3>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <img src="/src/assets/img/linha.png" width="100%" />
        <div className="parte-de-baixo">
          <div className="domo_perfil_img">
            <img
              className="domo_perfil" src="/src/assets/img/domo_perfil.png"
              width="100%"
            />
          </div>
          <div className="text-perfil-3">
            <h4 className="text-perfil-4">Domo - 3 noites</h4>
            <h4 className="text-perfil-4">Total a pagar: R$ 1770,00</h4>
          </div>
          <div>
          <button type="submit" className="perfil-button1">Excluir perfil</button>
          <button type="submit" className="perfil-button2">Desmarcar perfil</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Perfil;