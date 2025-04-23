import React from "react";
import "./usuarios.css";
import { PlusCircle } from "react-bootstrap-icons";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { Link } from "react-router-dom";
import { getUser } from "../../../services/Api_service";
import { useEffect } from "react";

const Usuarios = () => {

   useEffect(() => {
    name()
    }, [])

    async function name() {
      await getUser().then(data => console.log(data))
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
          <input id='search' className='search-usuarios' placeholder='CPF ou NOME de usuário'></input>
          </div>
        </div>
        <button type="submit" className="buttonSearch-usuarios">BUSCAR</button>
      </div>

      <div className="layout-usuarios">
        <div className="cards-usuarios">
          <h1 className="dataReserva-usuarios">Data da Reserva</h1>
        </div>
        <div className="grid1-usuarios">
          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>
        </div>

        <div className="cards-usuarios">
          <h1 className="dataReserva-usuarios">Data da Reserva</h1>
        </div>
        <div className="grid2-usuarios">
        <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>

          <Link to="/perfilAdm" className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </Link>
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