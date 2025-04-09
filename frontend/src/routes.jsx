//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Usuarios from "./pages/adm/usuarios/usuarios.jsx";
import Criar_usuarios from "./pages/adm/criar_usuarios/criar_usuarios.jsx";

//Rotas dos usuarios
import Cadastro from "./pages/user/cadastro/cadastro.jsx";
import Login from "./pages/user/login/login.jsx";
import Contato from "./pages/user/contato/contato.jsx";
import Perfil from "./pages/user/perfil/perfil.jsx";
import Pix from "./pages/user/pagamento_pix/pix.jsx";
import Acomodacoes from "./pages/user/acomodacoes/acomodacoes.jsx";
import Inicio from "./pages/user/pagina_inical/pagina_incial.jsx";


// FIX: adicionar obrigatoriadoredade de token nas rotas


function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Usuarios" element={<Usuarios />} />
      <Route path="/Criar_usuarios" element={<Criar_usuarios />} />


      {/* User Routes */}
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/" element={<Inicio />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/Contato" element={<Contato />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/Pix" element={<Pix />} />
      <Route path="/Acomodacoes" element={<Acomodacoes />} />
    </Routes>
  );
}

export default MainRoutes;