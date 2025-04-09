//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Usuarios from "./pages/adm/usuarios/usuarios.jsx";

//Rotas dos usuarios
import Cadastro from "./pages/user/cadastro/cadastro.jsx";
import Pagina from "./pages/user/pagina_inical/pagina_incial.jsx";
import Login from "./pages/user/login/login.jsx";
import Contato from "./pages/user/contato/contato.jsx";
import Perfil from "./pages/user/perfil/perfil.jsx";
import Pix from "./pages/user/pagamento_pix/pix.jsx";
import Inicio from "./pages/user/pagina_inical/pagina_incial.jsx";
import Acomodacoes from "./pages/user/acomodacoes/acomodacoes.jsx";


// FIX: adicionar obrigatoriadoredade de token nas rotas


function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Usuarios" element={<Usuarios />} />


      {/* User Routes */}
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/Pagina" element={<Pagina />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/Contato" element={<Contato />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/Pix" element={<Pix />} />
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Acomodacoes" element={<Acomodacoes />} />
    </Routes>
  );
}

export default MainRoutes;