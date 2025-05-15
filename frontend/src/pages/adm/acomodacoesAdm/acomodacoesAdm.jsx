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
  createQuartos,
  createFotos,
} from "../../../services/Api_service";

const AcomodacoesAdm = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [quartos, setQuartos] = useState([]);
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const formularioRef = useRef(null);

  useEffect(() => {
    verificacao();
    getQuartos();
    if (formularioVisivel && formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formularioVisivel]);

  async function getQuartos(params) {
    getAllQuartosDisponiveis(params)
      .then((data) => {
        console.log(data);
        setQuartos(data);
      })
      .catch((error) => console.error(error, "erro no get de quartos"));
  }

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

  const abrirFormulario = () => {setFormularioVisivel(true);};
  const fecharFormulario = () => {setFormularioVisivel(false);};
  
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id_quarto, setId_quarto] = useState('');
  const [imagem, setImagem] = useState('');

  const showError = (message) => {
    const span = document.getElementById("span");
    if (span) {
      span.textContent = message;
    } else {
      console.error("Elemento 'span' não encontrado:", message);
    }
  };


  async function criarAcomodacao(e) {
    e.preventDefault();
  
    if (!nome || !preco || !descricao || !imagem) {
      showError("Preencha todos os campos");
      return;
    }
  
    try {
      // Primeiro cria o quarto
      const dataQuarto = await createQuartos(nome, preco, descricao);
  
      if (dataQuarto === "quarto ja foi cadastrado") {
        showError("Quarto Já Cadastrado");
        return;
      }
  
      // Extrai o ID
      const id = dataQuarto.id || dataQuarto;
      setId_quarto(id);
  
      try {
        // Tenta adicionar a foto em um bloco try/catch separado
        const dataFoto = await createFotos(id, imagem);
        
        if (dataFoto === "Foto já adicionada") {
          showError("Quarto criado, mas a foto já existe");
        } else if (dataFoto === "Sem permissão para adicionar fotos") {
          showError("Quarto criado, mas você não tem permissão para adicionar fotos");
        } else {
          showError("Acomodação adicionada com sucesso");
          fecharFormulario();
          setNome("");
          setPreco("");
          setDescricao("");
          setImagem("");
          setId_quarto("");
        }
      } catch (fotoError) {
        // Se falhar ao adicionar a foto, ainda mantém o quarto criado
        console.error("Erro ao adicionar foto:", fotoError);
        showError("Quarto foi criado, mas houve um erro ao adicionar a foto");
      }
    } catch (err) {
      console.error("Erro ao criar quarto:", err);
      showError("Erro ao adicionar acomodação");
    }
  }

  

  return (
    <div className="acomodacoes-pageAdm">
      <NavbarAdm />
      <div className="inicio-acomodacoesAdm">
        <h1 className="acomodacoes-tituloAdm">
          ACOMODAÇÕES <br /> DISPONÍVEIS
        </h1>
        <div className="separador-acomodacoesAdm">
          <div className="circle-acomodacoesAdm"></div>
          <div className="divider-acomodacoesAdm"></div>
          <div className="circle-acomodacoesAdm"></div>
        </div>
      </div>

      <div className="fundo-acomodacoesAdm">
        <div className="reservation-acomodacoesAdm">
          <h2 className="checkin-acomodacoesAdm">CHECK-IN</h2>
          <DatePicker
            className="data-acomodacoesAdm"
            selected={checkIn}
            onChange={handleCheckInChange}
            locale={ptBR}
            selectsStart
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>

        <div className="reservation-acomodacoesAdm">
          <h3 className="checkout-acomodacoesAdm">CHECK-OUT</h3>
          <DatePicker
            className="data-acomodacoesAdm"
            selected={checkOut}
            onChange={handleCheckOutChange}
            locale={ptBR}
            selectsEnd
            minDate={checkIn || new Date()}
            placeholderText="__/__/__"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="reservation-acomodacoesAdm">
          <h4 className="adultos-acomodacoesAdm">ADULTOS</h4>
          <input
            type="number"
            className="clientes-acomodacoesAdm"
            min="0"
            required
            maxLength={100}
          />
        </div>

        <div className="reservation-acomodacoesAdm">
          <h4 className="criancas-acomodacoesAdm">CRIANÇAS</h4>
          <input
            type="number"
            className="clientes-acomodacoesAdm"
            min="0"
            required
            maxLength={100}
          />
        </div>

        <button onClick={() => navigate("/")} className="buscar-acomodacoesAdm">
          BUSCAR
        </button>
      </div>

      <div className="layout-acomodacoesAdm">
        {quartos.length > 0 ? (
          quartos.map((quartos, index) => (
            <div className="cardsFundo-acomodacoesAdm" key={quartos.id_quarto}>
              {/* <img
                className="cardsImg-acomodacoesAdm"
                src={quartos.fotos_quartos[0].imagem }
                alt=""
              //n esta lendo a imagem, (imagem inexistente) /> */} 
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
                  Reservar{" "}
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
            onClick={abrirFormulario}
            className="gridAdicionar-acomodacoesAdm"
          >
            <h1 className="textAdicionar-acomodacoesAdm">
              Adicionar nova Acomodação
            </h1>
            <PlusCircle className="adicionarIcon-acomodacoesAdm" />
          </Link>
        </div>
        {formularioVisivel && (
          <div ref={formularioRef} className="forms-acomodacoesAdm">
            <input
              type="text"
              className="itensForms-acomodacoesAdm"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              className="itensForms-acomodacoesAdm"
              placeholder="Valor"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
            <input
              type="text"
              className="itensForms-acomodacoesAdm"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="text"
              className="itensForms-acomodacoesAdm"
              placeholder="URL da Imagem"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
            <button type="submit" onClick={criarAcomodacao} className="buttonForms-acomodacoesAdm">
              Adicionar
            </button>
            <button
              onClick={fecharFormulario}
              className="buttonForms-acomodacoesAdm"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcomodacoesAdm;
