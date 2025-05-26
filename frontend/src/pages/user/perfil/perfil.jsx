import "./perfil.css";
import { useState, useEffect } from "react";
import NavbarUser from "../../../assets/components/navbarUser";
import { Pencil } from "react-bootstrap-icons";
import { logout, getUsersByCpf, updateUser } from "../../../services/Api_service";



function Perfil() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const cpf = localStorage.getItem('cpf')
  const [tel, setTel] = useState('')

  const [showEditModal, setShowEditModal] = useState(false); // Modal de edição


  async function deslogar() {
            logout()
            window.location.href = '/login'
  }

  useEffect(() => {
    preencher();
  }, []);

  async function preencher() {
    try {
      const data = await getUsersByCpf(cpf);
      setNome(data.nome);
      setEmail(data.email);
      setTel(data.telefone);
    } catch (error) {
      console.error(error);
    }
  }

  async function editar() {
    await updateUser(cpf, nome, email, tel).then(data => console.log(data)).catch(error => console.log(error))
  }

  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = () => setShowEditModal(true);

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
            <form className="text-perfil">
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">Nome:</h1>
                <input type="text" placeholder={nome} className="textNome-perfil" maxLength={100} onChange={(e) => setNome(e.target.value)} />
                <Pencil className="pencilIcon-perfil"/>
              </div>
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">Email:</h1>
                <input type="email" placeholder={email} className="textEmail-perfil" maxLength={100} onChange={(e) => setEmail(e.target.value)} />
                <Pencil className="pencilIcon-perfil"/>
              </div>
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">CPF:</h1>
                <h2 className="textCpf-perfil"> {cpf}</h2>
              </div>
              <div className="infoForm-perfil">
                <h1 className="textStyle-perfil">Numero De Telefone:</h1>
                <input type="tel" placeholder={tel} className="textTel-perfil" maxLength={100} onChange={(e) => setTel(e.target.value)}  />
                <Pencil className="pencilIcon-perfil"/>
              </div>
            </form>
          </div>
        </div>

        <div className="linha-perfil">
          <div className="linhaMeio-perfil"></div>
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
            <div className="botoes-perfil-alinhar">
            <button onClick={() => handleShowEdit()} className="sair-perfil"> Editar </button>
            <button onClick={() => deslogar()} className="sair-perfil"> Sair </button>

            </div>
            
          </div>
        </div>
      </div>
      <div className={`modal-container ${showEditModal ? 'show' : ''}`}>
        <div className="modal-content modal-edit slide-up">
          <div className="modal-header">
            <h2>⚠️⚠️Confirmação⚠️⚠️</h2>
            <button className="close-button" onClick={handleCloseEdit}>×</button>
          </div>
          <div className="modal-body">
            <p><strong>Tem certeza que deseja editar esse perfil? </strong> <br /> (essa alteração não pode ser desfeita)</p>
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={handleCloseEdit}>Cancelar</button>
            <button className="confirm-button edit" onClick={() => {editar(); handleCloseEdit()}}>Sim, Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;