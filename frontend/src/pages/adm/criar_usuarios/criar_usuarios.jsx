import "./criar_usuarios.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/Api_service";


const Criar_usuarios = () => {
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
                            <div className="cpf-criarUser">
                                <input type="cpf" className="itensCpf-criarUser" placeholder="CPF" />
                            </div>
                            <div className="email-criarUser">
                                <input type="email" className="itensEmail-criarUser" placeholder="Email" />
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
                <div className="backgroundImg-criarUser">
                    <div className="fundoInfo-criarUser">
                        <h1 className="info-criarUser">DESEJA RESERVAR QUARTO?</h1>
                        <button onClick={() => navigate("/acomodacoesAdm")} className="reservarUser-button">Reservar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Criar_usuarios