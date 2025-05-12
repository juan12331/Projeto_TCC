import "./perfil_adm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useEffect, useState } from "react";
import { Pencil } from "react-bootstrap-icons";
import { getUser } from "../../../services/Api_service";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { getUsersByCpf, deleteUser } from "../../../services/Api_service";

function PerfilAdm() {
  const navigate = useNavigate();

  const cpf = useParams()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')


  useEffect(() => {
        verificacao()
        preencher()
        }, [])

        async function deletarusuario() {
          await deleteUser(cpf)
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

            async function preencher(){
              getUsersByCpf(cpf.cpf).then(data =>{
                setNome(data.nome)
                setEmail(data.email)
                setTel(data.telefone)
              }).catch(error => console.log(error))
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
              <input type="text" value={nome} className="textNome-perfilAdm" onChange={(e) => setNome(e.target.value)} />
              <Pencil className="pencilIcon-perfilAdm"/>
            </div>
            <div className="infoForm-perfilAdm">
              <h1 className="textStyle-perfilAdm">Email:</h1>
              <input type="email" value={email} className="textEmail-perfilAdm" onChange={(e) => setEmail(e.target.value)} />
              <Pencil className="pencilIcon-perfilAdm"/>
            </div>
            <div className="infoForm-perfilAdm">
              <h1 className="textStyle-perfilAdm">CPF:</h1>
              <h2 className="textCpf-perfilAdm"> {cpf.cpf}</h2>
            </div>
            <div className="infoForm-perfilAdm">
              <h1 className="textStyle-perfilAdm">Numero De Telefone:</h1>
              <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} className="textTel-perfilAdm" />
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
          <button type="submit" className="perfil-button1Adm" onClick={deletarusuario}>Excluir perfil</button>
          <button type="submit" className="perfil-button2Adm">Editar perfil</button>
        </div>
      </div>
    </div>
  </div>
  );
};
export default PerfilAdm;