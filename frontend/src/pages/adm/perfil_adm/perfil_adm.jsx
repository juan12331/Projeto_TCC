import "./perfil_adm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/Api_service";

import { useNavigate } from "react-router-dom";

function PerfilAdm() {
  const navigate = useNavigate();

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
        

  return (
    <div className="div-mae-perilAdm">
      <NavbarAdm />
      <div className="container-perfilAdm">
        <div className="back-container">
          <button onClick={() => navigate("/usuarios")} className="back-button"> ← </button>
          <h1 className="back-line">|</h1>
          <button onClick={() => navigate("/usuarios")} className="back-text"> USUÁRIOS </button>
        </div>
        <div className="parte-de-cimaAdm">
          <div className="img-perfil-iconeAdm">
            <img
              className src="/src/assets/img/perfil.png"
            />
          </div>
          <div className="info-perfilAdm">
            <div className="img-possition-perfilAdm">
              <img
                src="/src/assets/img/infoUsuario.png"
              />
            </div>
            <div className="text-perfilAdm">
              <div className="text-perfil-1Adm">
                <h3>Nome: Neymar da Silva Santos Junior</h3>
                <div className="Email-perfilAdm">
                  <h3>Email: Neymardasilvasantosjunior@gmail.com</h3>
                </div>
              </div>
              <div className="text-perfil-2Adm">
                <h3>CPF: 382.443.358-31</h3>
                <div className="telefone-perfilAdm">
                  <h3>Numero De Telefone: 55 13 3476-1111</h3>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        {/* <img src="/src/assets/img/linha.png" width="100%" /> */}
        <div className="parte-de-baixoAdm">
          <div className="domo_perfil_imgAdm">
            <img
              className="domo_perfilAdm" src="/src/assets/img/domo_perfil.png"
              width="100%"
            />
          </div>
          <div className="text-perfil-3Adm">
            <h4 className="text-perfil-4Adm">Domo - 3 noites</h4>
            <h4 className="text-perfil-4Adm">Total a pagar: R$ 1770,00</h4>
          </div>
          <div>
          <button type="submit" className="perfil-button1Adm">Excluir perfil</button>
          <button type="submit" className="perfil-button2Adm">Desmarcar perfil</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PerfilAdm;