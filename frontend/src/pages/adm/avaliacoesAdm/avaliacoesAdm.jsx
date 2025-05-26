import "./avaliacoesAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, GetAllAvaliacoes, getAllAvaliacoes_quartos } from "../../../services/Api_service";


const AvaliacoesAdm = () => {
    
    const [avaliacoes, setAvaliacoes] = useState([])
    const [avaliacoesQuartos, setAvaliacoesQuartos] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {   
        verificacao()
        pesquisar()
    }, [])

    function limite(text) {
        if (text && text.length > 25) {
            return text.substring(0, 25) + '...';
        }
        return text || '';
    }

    function AvaliacaoQuartoRedirecionar(id_quarto){
        window.location.href = `/AvaliacaoQuarto/${id_quarto}`
    }

    function AvaliacaoRedirecionar(id_quarto){
        window.location.href = `/Avaliacao/${id_quarto}`
    }
    
    async function pesquisar() {
        console.log(pesquisa)
        // Fix: Match the parameters expected by the backend
        // The backend checks for cpf, nota, or avaliacao_texto
        // We'll send the pesquisa value to all three to make sure it works
        const params = {
            cpf: pesquisa,
            nota: pesquisa,
            avaliacao_texto: pesquisa
        }
        
        const avaliacoes1 = await GetAllAvaliacoes(params)
        // Add id_quarto for the second API call
        const params2 = {
            ...params,
            id_quarto: pesquisa
        }
        const avaliacoesQuartos1 = await getAllAvaliacoes_quartos(params2)

        setAvaliacoes(avaliacoes1)
        setAvaliacoesQuartos(avaliacoesQuartos1)

        console.log(avaliacoes, avaliacoesQuartos)
    }
    
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
    
    // Added this function to make the Enter key work correctly
    function Buscar() {
        pesquisar();
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
                    <input id='search' className='search-avaliacoesAdm' placeholder='CPF ou NOME de usuário' 
                    value={pesquisa} 
                    onChange={(e) => setPesquisa(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && Buscar()}
                    maxLength={100}></input>
                </div>
            </div>
            <button className="buttonSearch-avaliacoesAdm" onClick={pesquisar}>BUSCAR</button>
        </div>

        <div className="layout-avaliacoesAdm">
        <div className="grid1-avaliacoesAdm">
            {avaliacoes.length > 0 ? (
                avaliacoes.map((avaliacao, index) => (
                <div className="fundoCards-avaliacoesAdm domo123" key={avaliacao.id_avaliacao} onClick={() => AvaliacaoRedirecionar(avaliacao.id_avaliacao)}
                >
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">{limite(avaliacao.avaliacao_texto)}</h1>
                    </div>
                    <h3 className="cpfCards-avaliacoesAdm">{avaliacao.cpf}</h3>
                </div>
               ))
            ) : (
                <div className="sem-resultados">Nenhuma avaliação encontrada</div>
          )}
            </div>

            {/* <span className="avaliacoesAdm-titulo">avaliacoes de quartos</span>
            <div className="grid2-avaliacoesAdm ">
            { avaliacoesQuartos.length > 0 ? (
                 avaliacoesQuartos.map((avaliacao, index) => (
                <div  className="fundoCards-avaliacoesAdm domo123" key={avaliacao.id_reclamacao} onClick={() => AvaliacaoQuartoRedirecionar(avaliacao.id_reclamacao)}>
                    <div className="reclamacao-avaliacoesAdm">
                        <h1 className="text-avaliacoesAdm">{limite(avaliacao.avaliacao_texto)}</h1>
                    </div>
                    <h3 className="cpfCards-avaliacoesAdm">{avaliacao.cpf}</h3>
                    <h3 className="cpfCards-avaliacoesAdm">{avaliacao.quarto.nome}</h3>
                </div>
                 ))
            ) : (
                <div className="sem-resultados">Nenhuma avaliação encontrada</div>
            )}
            </div> */}
        </div>
    </div>
    );
};
export default AvaliacoesAdm