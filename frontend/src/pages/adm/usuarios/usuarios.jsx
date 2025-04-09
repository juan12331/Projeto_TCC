import React from "react";
import { useNavigate } from "react-router-dom";
import "./usuarios.css";
import { PlusCircle } from "react-bootstrap-icons";
import NavbarAdm from "../../../assets/components/navbarAdm";

const Usuarios = () => {
  const navigate = useNavigate();

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
          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>
        </div>

        <div className="cards-usuarios">
          <h1 className="dataReserva-usuarios">Data da Reserva</h1>
        </div>
        <div className="grid2-usuarios">
          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>

          <div className="fundoCards-usuarios">
            <img 
            className="cardsImg-usuarios" 
            src="/src/assets/imgUsuarios_Adm/foto_usuarios.png" 
            alt="" 
            />
            <h1 className="nomeCards-usuarios">Nome</h1>
            <h2 className="cpfCards-usuarios">CPF</h2>
          </div>
        </div>
      </div>

      <div className="final-usuarios">
        <div className="fundoFinal-usuarios">
          <div className="gridAdicionar-usuarios">
          <h1 className="textAdicionar-usuarios">Adicionar novo Usuário</h1>
          <button onClick={() => navigate("/criar_usuarios")} className="adicionarButton-usuarios">
            <PlusCircle className="adicionarIcon-usuarios"/>
          </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Usuarios