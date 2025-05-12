import React from "react";
import "./usuarios.css";
import { PlusCircle } from "react-bootstrap-icons";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/Api_service";


const Usuarios = () => {

const [usuarios, setUsuarios] = useState([])
const [pesquisa, setPesquisa] = useState('')

   useEffect(() => {
    verificacao()
    pegarUsuario()
    }, [])

    async function pegarUsuario(pesquisa) {
      await getUser(pesquisa).then(data => {
        setUsuarios(data) 
        console.log(usuarios)
      }).catch(error => window.alert(error))
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

    function limite(text) {
      if (text.length > 15) {
        return text.substring(0, 15) + '...'
      }
      return text;
    }

    function view(cpf) {
      window.location.href = `/PerfilAdm/${cpf}`
    }
    return(
    <div className="usuarios-page">
        <NavbarAdm/>
        <div className="inicio-usuarios">
        <h1 className="usuarios-titulo">Buscar por Usuários</h1>
        <div className="separador-usuarios">
          <div className="circle-usuarios"></div>
          <div className="divider-usuarios"></div>
          <div className="circle-usuarios"></div>
        </div>
      </div>

      <div className="fundo-usuarios">
        <div className="fundoPesquisa-usuarios">
          <div className="pesquisa-usuarios">
          <input id='search' className='search-usuarios' placeholder='CPF ou NOME de usuário' value={pesquisa} onChange={(e) => {setPesquisa(e.target.value)}}></input>
          </div>
        </div>
        <button type="submit" className="buttonSearch-usuarios" onClick={pegarUsuario}>BUSCAR</button>
      </div>

      <div className="layout-usuarios">
        <div className="cards-usuarios">
          <h1 className="dataReserva-usuarios">Data da Reserva</h1>
        </div>
        <div className="grid1-usuarios">
          {usuarios.map((usuarios,  index) =>
          
          <div className="fundoCards-usuarios" key={usuarios.cpf} onClick={() => view(usuarios.cpf)}>

            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">{limite(usuarios.nome)}</h1>
            <h2 className="cpfCards-usuarios">{limite(usuarios.cpf)}</h2>
          </div>
          )}
        </div>
      </div>

      <div className="final-usuarios">
        <div className="fundoFinal-usuarios">
          <Link to="/criar_usuarios" className="gridAdicionar-usuarios">
            <h1 className="textAdicionar-usuarios">Adicionar novo Usuário</h1>
            <PlusCircle className="adicionarIcon-usuarios"/>
          </Link>
        </div>
      </div>
    </div>
    );
};

export default Usuarios