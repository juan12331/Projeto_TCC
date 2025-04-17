import "./avaliacoesAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { Link } from "react-router-dom";

const AvaliacoesAdm = () => {

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
                    <input id='search' className='search-avaliacoesAdm' placeholder='CPF ou NOME de usuário'></input>
                </div>
            </div>
            <button type="submit" className="buttonSearch-avaliacoesAdm">BUSCAR</button>
        </div>

        <div className="layout-avaliacoesAdm">
            <div className="grid1-avaliacoesAdm">
                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>
            </div>

            <div className="grid2-avaliacoesAdm">
                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>

                <Link to="/ava_adm" className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </Link>
            </div>
        </div>
    </div>
    );
};
export default AvaliacoesAdm