//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Users from "../src/pages/user/cadastro/cadastro.jsx";


//Rotas dos usuarios
import Users from "../src/pages/user/cadastro/cadastro.jsx";
import Pagina_inicial from "../src/pages/user/login/pagina_inicial.jsx";
import Login from "../src/pages/user/login/login.jsx";



// FIX: adicionar obrigatoriadoredade de token nas rotas


function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Adm/Users" element={<Users />} />


      {/* User Routes */}
      <Route path="/Cadastro" element={<Create />} />
      <Route path="/" element={<Pagina_inicial />} />
      <Route path="/Cadastro" element={<Login />} />

    </Routes>
  );
}

export default MainRoutes;