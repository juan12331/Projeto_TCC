import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import "./acomodacoesAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";
import {
  getUser,
  getAllQuartosDisponiveis,
} from "../../../services/Api_service";

const AcomodacoesAdm = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [quartos, setQuartos] = useState([]);

  // Imagem placeholder para quando não houver imagem
  const imagemPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%23666'%3ESem imagem disponível%3C/text%3E%3C/svg%3E";

  async function getQuartos(params) {
    getAllQuartosDisponiveis(params)
      .then((data) => {
        console.log(data);
        setQuartos(data);
      })
      .catch((error) => console.error(error, "erro no get de quartos"));
  }

  useEffect(() => {
      verificacao();
      getQuartos(); // Carrega todos os usuários no início
    }, []);

  async function verificacao() {
    try {
      await getUser().then((data) => console.log("log"));
    } catch (error) {
      console.log(error);
      if (error.status == 403 || error.status == 401) {
        window.alert("acesso não autorizado");
        window.location.href = "/login";
      }
    }
  }

  function view(id) {
    window.location.href = `/quartosAdm/${id}`;
  }

  const handleCheckInChange = (date) => {
    setCheckIn(date);
    setCheckOut(null);
  };

  const handleCheckOutChange = (date) => {
    setCheckOut(date);
  };

  // Função para obter a imagem do quarto de forma segura
  const obterImagemQuarto = (quarto) => {
    // Verifica se existe fotos_quartos e se tem pelo menos um item
    if (quarto.fotos_quartos && 
        Array.isArray(quarto.fotos_quartos) && 
        quarto.fotos_quartos.length > 0 && 
        quarto.fotos_quartos[0] && 
        quarto.fotos_quartos[0].imagem) {
      return quarto.fotos_quartos[0].imagem;
    }
    
    // Retorna imagem placeholder se não houver imagem
    return imagemPlaceholder;
  };
  

  return (
    <div className="acomodacoes-pageAdm">
      <NavbarAdm />
      <div className="inicio-acomodacoesAdm">
        <h1 className="acomodacoes-tituloAdm">
          ACOMODAÇÕES
        </h1>
        <div className="separador-acomodacoesAdm">
          <div className="circle-acomodacoesAdm"></div>
          <div className="divider-acomodacoesAdm"></div>
          <div className="circle-acomodacoesAdm"></div>
        </div>
      </div>

     
      

      <div className="layout-acomodacoesAdm">
        {quartos.length > 0 ? (
          quartos.map((quartos, index) => (
            <div className="cardsFundo-acomodacoesAdm" key={quartos.id_quarto}>
               <img
                className="cardsImg-acomodacoesAdm"
                src={obterImagemQuarto(quartos)}
                alt={quartos.nome || "Imagem do quarto"}
                onError={(e) => {
                  // Fallback adicional caso a imagem falhe ao carregar
                  e.target.src = imagemPlaceholder;
                }}
              /> 
              <div className="cardsConteudo-acomodacoesAdm">
                <h1 className="cardsTitle-acomodacoesAdm">
                  {quartos.nome} - R$ {quartos.preco}
                </h1>
                <h2 className="cardsText-acomodacoesAdm">
                  {quartos.descricao}
                </h2>
                <button
                  onClick={() => view(quartos.id_quarto)}
                  className="cardsButton-acomodacoesAdm"
                >
                  {" "}
                  Editar{" "}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sem-resultados">Nenhum quarto encontrado</div>

        )}

      </div>

      <div className="final-acomodacoesAdm">
        <div className="fundoFinal-acomodacoesAdm">

          <Link
            to='/criarAcomodacao'
            className="gridAdicionar-acomodacoesAdm"
          >
            <h1 className="textAdicionar-acomodacoesAdm">
              Adicionar nova Acomodação
            </h1>

            <PlusCircle className="adicionarIcon-acomodacoesAdm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AcomodacoesAdm;