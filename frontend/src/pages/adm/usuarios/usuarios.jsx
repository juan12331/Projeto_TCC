import React from "react";
import "./usuarios.css";
import { PlusSquare } from "react-bootstrap-icons";
import NavbarAdm from "../../../assets/components/navbarAdm";

const Usuarios = () => {

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
          <h1>Adicionar novo Usuário</h1>
          {/* COLOCAR ICONE */}
        </div>
      </div>

    </div>
    );
};

export default Usuarios