import React, { useState } from "react";
import "./ava_adm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Componente de Estrelas
const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);

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
                        onClick={() => setRating(starValue)}
                    />
                );
            })}
        </div>
    );
};

function Avaliacao() {
    const navigate = useNavigate();

    return (
        <div className="div_mae_ava">
            <NavbarAdm />
            <div className="criar_usuario">
                <div className="inicio-ava">
                    <div className="back-ava">
                        <button onClick={() => navigate("/avaliacoesAdm")} className="backButton-ava"> ← </button>
                        <h1 className="backLine-ava">|</h1>
                        <button onClick={() => navigate("/avaliacoesAdm")} className="backText-ava"> AVALIAÇÕES </button>
                    </div>

                    <div className="container-ava">
                        <img
                            src="/src/assets/img/icone_usario.png"
                            className="icone_usuario"
                        />
                        {/* Aqui é onde as estrelas aparecem */}
                        <StarRating />
                        <div className="input-ava">
                            <h3 className="Informações_do_Usuario">Informações do Usuario</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reclamacao">
                <div className="container-reclamação">
                    <h3 className="reclama-ava">Reclamação</h3>
                </div>
                <div className="input-button-container-ava">
                    <button type="submit" className="ava-button ">Excluir</button>
                    <button type="submit" className="ava-button ">Marcar</button>
                </div>
            </div>
        </div>
    );
}

export default Avaliacao;
