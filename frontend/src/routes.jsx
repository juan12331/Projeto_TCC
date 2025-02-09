//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
// import Users from "../src/pages/user/cadastro/cadastro.jsx";


//Rotas dos usuarios
import Cadastro from "./pages/user/cadastro/cadastro.jsx";
import Pagina from "./pages/user/pagina_inical/pagina_incial.jsx";
import Login from "./pages/user/login/login.jsx";
import Inicio from "./pages/user/pagina_inical/pagina_incial.jsx";
import Acomodacoes from "./pages/user/acomodacoes/acomodacoes.jsx";


// FIX: adicionar obrigatoriadoredade de token nas rotas


function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      {/* <Route path="/Adm/Users" element={<Users />} /> */}


      {/* User Routes */}
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/" element={<Pagina />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/Inicio" element={<Inicio/>} />
      <Route path="/Acomodacoes" element={<Acomodacoes />} />


    </Routes>
  );
}

export default MainRoutes;