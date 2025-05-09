import "./perfil_adm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useEffect, useState } from "react";
import { Pencil } from "react-bootstrap-icons";
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
      <div className="back-containerAdm">
        <button onClick={() => navigate("/usuarios")} className="back-buttonAdm"> ← </button>
        <h1 className="back-lineAdm">|</h1>
        <button onClick={() => navigate("/usuarios")} className="back-textAdm"> USUÁRIOS </button>
      </div>
      <div className="right-perfilAdm">
        <h1 className="infoText-perfilAdm">Suas Informações</h1>
        <div className="container-imgIconeAdm">
          <img
            className="img-perfil-iconeAdm" 
            src="/src/assets/img/perfil.png"
          />
        </div>
        <div className="info-perfilAdm">
          <form className="text-perfilAdm">
            <div className="infoForm-perfilAdm">
              <h1 className="textStyle-perfilAdm">Nome:</h1>
              <input type="text" placeholder="Neymar da Silva Santos Junior" className="textNome-perfilAdm" />
              <Pencil className="pencilIcon-perfilAdm"/>
            </div>
            <div className="infoForm-perfilAdm">
              <h1 className="textStyle-perfilAdm">Email:</h1>
              <input type="email" placeholder="Neymardasilvasantosjunior@gmail.com" className="textEmail-perfilAdm" />
              <Pencil className="pencilIcon-perfilAdm"/>
            </div>
            <div className="infoForm-perfilAdm">
              <h1 className="textStyle-perfilAdm">CPF:</h1>
              <h2 className="textCpf-perfilAdm"> 382.443.358-31</h2>
            </div>
            <div className="infoForm-perfilAdm">
              <h1 className="textStyle-perfilAdm">Numero De Telefone:</h1>
              <input type="tel" placeholder="55 13 3476-1111" className="textTel-perfilAdm" />
              <Pencil className="pencilIcon-perfilAdm"/>
            </div>
          </form>
        </div>
      </div>

      <div className="linha-perfilAdm">
        <div className="linhaMeio-perfilAdm"></div>
      </div>

      <div className="left-perfilAdm">
        <h1 className="reservados-perfilAdm">Quartos Reservados</h1>
        <div className="domo_perfil_imgAdm">
          <img
            className="domo_perfilAdm" src="/src/assets/img/domo_perfil.png"
            width="100%"
          />
        </div>
        <div className="text-perfilFinalAdm">
          <div className="finalText-perfilAdm">
            <h1 className="finalStyle-perfilAdm">Domo:</h1>
            <h2 className="finalInfo-perfilAdm">3 noites</h2>
          </div>
          <div className="finalText-perfilAdm">
            <h1 className="finalStyle-perfilAdm">Total a pagar:</h1>
            <h2 className="finalInfo-perfilAdm">R$ 1770,00</h2>
          </div>
        </div>
        <div className="sairConta-perfilAdm">
          <button type="submit" className="perfil-button1Adm">Excluir perfil</button>
          <button type="submit" className="perfil-button2Adm">Desmarcar perfil</button>
        </div>
      </div>
    </div>
  </div>
  );
};
export default PerfilAdm;