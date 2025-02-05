//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
// import Users from "../src/pages/user/cadastro/cadastro.jsx";


//Rotas dos usuarios
import Cadastro from "./pages/user/cadastro/cadastro.jsx";
// import Paginainicial from "./pages/user/pagina_inicial/pagina_inicial.jsx";
import Login from "./pages/user/login/login.jsx";



// FIX: adicionar obrigatoriadoredade de token nas rotas


function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      {/* <Route path="/Adm/Users" element={<Users />} /> */}


      {/* User Routes */}
      <Route path="/Cadastro" element={<Cadastro />} />
      {/* <Route path="/" element={<Paginainicial />} /> */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default MainRoutes;