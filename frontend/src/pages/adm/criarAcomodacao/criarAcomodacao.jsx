import "./criarAcomodacao.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createFotos, createQuartos } from "../../../services/Api_service";

const CriarAcomodacao = () => {
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
      { id: 1, label: ' TV'},
      { id: 2, label: ' Wifi' },
      { id: 3, label: ' Ducha'},
      { id: 4, label: ' Cozinha'},
      { id: 5, label: ' Toalhas'},
      { id: 6, label: ' Frigobar'},
      { id: 7, label: ' Banheira'},
      { id: 8, label: ' Ar condicionado'},
    ];

    const handleCheckboxChange = (optionId) => {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    };
    

    return (
    <div className="criarAcomodacao-page">
        <NavbarAdm />
        <div className="fundo-criarAcomodacao">
            <div className="fundoLeft-criarAcomodacao">
                <div className="back-criarAcomodacao">
                    <button onClick={() => navigate("/acomodacoesAdm")} className="back-buttonAcomodacao"> ← </button>
                    <h1 className="back-lineAcomodacao">|</h1>
                    <button onClick={() => navigate("/acomodacoesAdm")} className="back-textAcomodacao"> ACOMODAÇÕES </button>
                </div>
                <div className="pageLeft-criarAcomodacao">
                    <div className="grid-criarAcomodacao">
                        <form className="itensCenter-criarAcomodacao">
                            <h1 className="tituloInfo-criarAcomodacao">Insira as informações do quarto:</h1>
                            <div className="name-criarAcomodacao">
                                <input type="name" className="itensName-criarAcomodacao" placeholder="Nome"/>
                            </div>
                            <div className="valor-criarAcomodacao">
                                <input type="text" className="itensValor-criarAcomodacao" placeholder="Valor"/>
                            </div>
                            <div className="descricao-criarAcomodacao">
                                <input type="text" className="itensDescricao-criarAcomodacao" placeholder="Descrição"/>
                            </div>
                            <h1 className="tituloQuarto-criarAcomodacao">Selecione os itens do quarto:</h1>
                            <div className="checkbox-criarAcomodacao">
                                {options.map((option) => (
                                    <div className='formItens-criarAcomodacao' key={option.id}>
                                        <label className="nameItem-criarAcomodacao">
                                            <input
                                            type="checkbox"
                                            value={option.id}
                                            checked={selectedOptions.includes(option.id)}
                                            onChange={() => handleCheckboxChange(option.id)}
                                            />
                                            {option.label}
                                        </label> 
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                    <button /*onClick={criarAcomodacao}*/ className="cadastrarAcomodacao-button">Cadastrar</button>
                </div>
            </div>

            <div className="pageRight-criarAcomodacao">
                <div className="background-criarAcomodacao">
                    <div className="fundoInfo-criarAcomodacao">
                        <h1 className="info-criarAcomodacao">DESEJA ADICIONAR IMAGEM?</h1>
                        <input type='url' className="reservarAcomodacao-button" placeholder="Cole o link"/>
                    </div>
                    <div className="final-criarAcomodacao">
                        <div className="quadrado-criarAcomodacao">
                            <input type='url' className="foto-criarAcomodacao" placeholder="Cole o link"/>
                        </div>
                        <div className="quadrado-criarAcomodacao">
                            <input type='url' className="foto-criarAcomodacao" placeholder="Cole o link"/>
                        </div>
                        <div className="quadrado-criarAcomodacao">
                            <input type='url' className="foto-criarAcomodacao" placeholder="Cole o link"/>
                        </div>
                        <div className="quadrado-criarAcomodacao">
                            <input type='url' className="foto-criarAcomodacao" placeholder="Cole o link"/>
                        </div>
                        <div className="quadrado-criarAcomodacao">
                            <input type='url' className="foto-criarAcomodacao" placeholder="Cole o link"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default CriarAcomodacao;