import "./perfil_adm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useEffect, useState } from "react";
import { getUser, getUsersByCpf, deleteUser, updateUser } from "../../../services/Api_service";
import { useParams, useNavigate } from "react-router-dom";

function PerfilAdm() {
  const navigate = useNavigate();
  const { cpf } = useParams();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  const [showModal, setShowModal] = useState(false);      // Modal de exclusão
  const [showEditModal, setShowEditModal] = useState(false); // Modal de edição

  useEffect(() => {
    verificacao();
    preencher();
  }, []);

  async function verificacao() {
    try {
      await getUser();
    } catch (error) {
      if (error.status === 403 || error.status === 401) {
        window.alert('Acesso não autorizado');
        window.location.href = "/login";
      }
    }
  }

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

  async function deletarusuario() {
    await deleteUser(cpf);
    window.location.href = '/usuarios';
  }

  async function editarUsuario(cpf, nome, email, senha, papel, telefone) {
    console.log(cpf, nome, email, senha, papel, telefone)
    await updateUser(cpf, nome, email, senha, papel, telefone);
    setShowEditModal(false);
    window.alert("Perfil atualizado com sucesso!");
  }

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = () => setShowEditModal(true);

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
            <img className="img-perfil-iconeAdm" src="/src/assets/img/perfil.png" />
          </div>

          <div className="info-perfilAdm">
            <form className="text-perfilAdm">
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">Nome:</h1>
                <input type="text" value={nome} className="textNome-perfilAdm" onChange={(e) => setNome(e.target.value)} maxLength={100} />
              </div>
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">Email:</h1>
                <input type="email" value={email} className="textEmail-perfilAdm" onChange={(e) => setEmail(e.target.value)} maxLength={100}/>
              </div>
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">CPF:</h1>
                <h2 className="textCpf-perfilAdm">{cpf}</h2>
              </div>
              <div className="infoForm-perfilAdm">
                <h1 className="textStyle-perfilAdm">Telefone:</h1>
                <input type="tel" className="textTel-perfilAdm" value={ tel} onChange={(e) => setTelefone(e.target.value)} maxLength={100}/>
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
            <img className="domo_perfilAdm" src="/src/assets/img/domo_perfil.png" width="100%" />
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
            <button type="button" className="perfil-button1Adm" onClick={handleShow}>Excluir perfil</button>
            <button type="button" className="perfil-button2Adm" onClick={handleShowEdit}>Editar perfil</button>
          </div>
        </div>
      </div>

      {/* Modal de Exclusão */}
      <div className={`modal-container ${showModal ? 'show' : ''}`}>
        <div className="modal-content modal-delete slide-up">
          <div className="modal-header">
            <h2>⚠️⚠️Confirmação⚠️⚠️</h2>
            <button className="close-button" onClick={handleClose}>×</button>
          </div>
          <div className="modal-body">
            <p><strong>Tem certeza que deseja excluir esse perfil? </strong> <br /> (essa alteração não pode ser desfeita)</p>
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={handleClose}>Cancelar</button>
            <button className="confirm-button delete" onClick={deletarusuario}>Sim, Excluir</button>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
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
            <button className="confirm-button edit" onClick={() => editarUsuario(cpf, nome, email, tel)}>Sim, Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilAdm;
