//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Usuarios from "./pages/adm/usuarios/usuarios.jsx";

//Rotas dos usuarios
import Cadastro from "./pages/user/cadastro/cadastro.jsx";
import Pagina from "./pages/user/pagina_inical/pagina_incial.jsx";
import Login from "./pages/user/login/login.jsx";
import Inicio from "./pages/user/pagina_inical/pagina_incial.jsx";
import Acomodacoes from "./pages/user/acomodacoes/acomodacoes.jsx";
import Contato from "./pages/user/contato/contato.jsx"
import Quartos from "./pages/user/quartos/quartos.jsx";


// FIX: adicionar obrigatoriadoredade de token nas rotas


function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Usuarios" element={<Usuarios />} />


      {/* User Routes */}
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/quartos" element={<Quartos />} />
      <Route path="/" element={<Inicio />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/acomodacoes" element={<Acomodacoes />} />
      <Route path="/Contato" element={<Contato />} />
    </Routes>
  );
}

export default MainRoutes;