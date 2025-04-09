import "./avaliacoesAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";

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
                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>
            </div>

            <div className="grid2-avaliacoesAdm">
                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>

                <div className="fundoCards-avaliacoesAdm">
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">Reclamação!</h1>
                    </div>
                    <h2 className="nomeCards-avaliacoesAdm">Nome</h2>
                    <h3 className="cpfCards-avaliacoesAdm">CPF</h3>
                </div>
            </div>
        </div>
    </div>
    );
};
export default AvaliacoesAdm