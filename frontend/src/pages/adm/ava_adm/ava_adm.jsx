import React from "react";
import "./ava_adm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, getAvaliacoesById, deleteAvaliacoes } from "../../../services/Api_service";

function Avaliacao() {
    const { id_avaliacao } = useParams();
    const [informacoes, setInformacoes] = useState({ nota: 0 });
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    // Componente StarRating modificado para receber e exibir a nota da avaliação
    const StarRating = ({ rating = 0, totalStars = 5 }) => {
        return (
            <div className="star-rating-ava">
                {Array.from({ length: totalStars }, (_, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            color={starValue <= rating ? "#ffc107" : "#c0c0c0"}
                            style={{ cursor: "pointer", marginRight: "5px" }}
                        />
                    );
                })}
            </div>
        );
    };

    async function deletarAvaliacao() {
        deleteAvaliacoes(id_avaliacao)
        window.location.href = '/avaliacoesAdm'
    }

    async function preencher() {
        try {
            const info = await getAvaliacoesById(id_avaliacao);
            console.log("Dados carregados da API:", info);
            setInformacoes(info);
        } catch (error) {
            console.error("Erro ao carregar informações:", error);
        }
    }

    useEffect(() => {
        verificacao();
        preencher();
    }, []);

    async function verificacao() {
        try {
            await getUser().then(data => console.log('log'));
        } catch (error) {
            console.log(error);
            if (error.status == 403 || error.status == 401) {
                window.alert('acesso não autorizado');
                window.location.href = "/login";
            }
        }
    }

    return (
        <div className="div_mae_ava">
            <NavbarAdm />
            <div className="fundo-avaAdm">
                <div className="backgroundImg-ava">
                    <div className="back-ava">
                        <button onClick={() => navigate("/avaliacoesAdm")} className="backButton-ava"> ← </button>
                        <h1 className="backLine-ava">|</h1>
                        <button onClick={() => navigate("/avaliacoesAdm")} className="backText-ava"> AVALIAÇÕES </button>
                    </div>
                    <div className="container-ava">
                        <img
                            src="/src/assets/img/icone_usario.png"
                            className="icone_usuario"
                            alt="Ícone do usuário"
                        />
                        <div className="grid-avaAdm">
                            {/* Passando a nota da avaliação como prop para o componente StarRating */}
                            <StarRating rating={informacoes.nota || 0} />
                            <div className="input-ava">
                                <h3 className="Informações_do_Usuario">{informacoes.cpf || "Carregando..."}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reclamacao">
                    <div className="container-reclamação">
                        <h3 className="reclama-ava">{informacoes.avaliacao_texto || ""}</h3>
                    </div>
                    <div className="input-button-container-ava">
                        <button onClick={handleShow} className="ava-button">Excluir</button>
                    </div>
                </div>
            </div>

            <div className="rodapePage-avaAdm"></div>
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
            <button className="confirm-button delete" onClick={deletarAvaliacao}>Sim, Excluir</button>
          </div>
        </div>
      </div>
            
        </div>
    );
}

export default Avaliacao;