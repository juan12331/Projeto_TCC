import "./avaliacoesAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, GetAllAvaliacoes } from "../../../services/Api_service";


const AvaliacoesAdm = () => {

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
    <div className="avaliacoesAdm-page">
        <NavbarAdm/>
        <div className="inicio-avaliacoesAdm">
            <h1 className="avaliacoesAdm-titulo">Buscar por Usuários</h1>
            <div className="separador-avaliacoesAdm">
                <div className="circle-avaliacoesAdm"></div>
                <div className="divider-avaliacoesAdm"></div>
                <div className="circle-avaliacoesAdm"></div>
            </div>
        </div>

        <div className="fundo-avaliacoesAdm">
            <div className="fundoPesquisa-avaliacoesAdm">
                <div className="pesquisa-avaliacoesAdm">
                    <input id='search' className='search-avaliacoesAdm' placeholder='CPF ou NOME de usuário' maxLength={100}></input>
                </div>
            </div>
            <button type="submit" className="buttonSearch-avaliacoesAdm">BUSCAR</button>
        </div>

        <div className="layout-avaliacoesAdm"> {/*Fazer igual usuario*/}
            <div className="grid1-avaliacoesAdm">
                <Link to="/Avaliacao" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>
            </div>

            <span className="avaliacoesAdm-titulo">avaliacoes de quartos</span>
            <div className="grid2-avaliacoesAdm">
                
                <Link to="/Avaliacao" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                    <h3 className="cpfCards-avaliacoesAdm">id_quarto</h3>
                </Link>
            </div>
        </div>
    </div>
    );
};
export default AvaliacoesAdm