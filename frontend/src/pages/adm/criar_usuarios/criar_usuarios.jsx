import "./criar_usuarios.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Criar_usuarios = () => {
    const navigate = useNavigate();

    const CountrySelect = () => {
        const [countries, setCountries] = useState([]);
        const [selectedCountry, setSelectedCountry] = useState(null);
      
        useEffect(() => {
          fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
          )
            .then((response) => response.json())
            .then((data) => {
              setCountries(data.countries);
            });
        }, []);
        return (
          <Select
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            placeholder="País"
          />
        );
      };

    return(
    <div className="criarUser_page">
        <NavbarAdm/>
        <div className="fundo-criarUser">
            <div className="fundoLeft-criarUser">
                <div className="back-criarUser">
                    <button onClick={() => navigate("/usuarios")} className="back-buttonUser"> ← </button>
                    <h1 className="back-lineUser">|</h1>
                    <button onClick={() => navigate("/usuarios")} className="back-textUser"> USUÁRIOS </button>
                </div>
                <div className="pageLeft-criarUser">
                    <img 
                    className="user_criarUser" 
                    src="/src/assets/imgCriarUser_Adm/user_criarUser.png" 
                    alt="" 
                    />
                    <div className="grid-criarUser">
                        <form className="itensLeft-criarUser">
                            <div className="name-criarUser">
                                <input type="name" className="itensName-criarUser" placeholder="Nome" />
                            </div>
                            <div className="email-criarUser">
                                <input type="email" className="itensEmail-criarUser" placeholder="Email" />
                            </div>
                            <div className="country-criarUser">
                                <CountrySelect />
                            </div>
                        </form>

                        <form className="itensRight-criarUser">
                            <div className="sobrenome-criarUser">
                                <input type="name" className="itensSobrenome-criarUser" placeholder="Sobrenome" />
                            </div>
                            <div className="phone-criarUser">
                                <input type="tel" className="itensPhone-criarUser" placeholder="Telefone" />
                            </div>
                            <div className="text-criarUser">
                                <input type="text" className="itensText-criarUser" placeholder="Pedidos Especiais" />
                            </div>
                        </form>
                    </div>
                    <button type="submit" className="cadastrarUser-button">Cadastrar</button>
                </div>
            </div>

            <div className="pageRight-criarUser">
                <div className="fundoInfo-criarUser">
                    <h1 className="info-criarUser">DESEJA RESERVAR QUARTO?</h1>
                    <button type="submit" className="reservarUser-button">Reservar</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Criar_usuarios