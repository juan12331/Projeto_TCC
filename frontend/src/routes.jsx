//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Usuarios from "./pages/adm/usuarios/usuarios.jsx";

//Rotas dos usuarios
import Cadastro from "./pages/user/cadastro/cadastro.jsx";
import Pagina from "./pages/user/pagina_inical/pagina_incial.jsx";
import Login from "./pages/user/login/login.jsx";
<<<<<<< HEAD
import Contato from "./pages/user/contato/contato.jsx";
import Perfil from "./pages/user/perfil/perfil.jsx";
import Pix from "./pages/user/pagamento_pix/pix.jsx";

=======
import Inicio from "./pages/user/pagina_inical/pagina_incial.jsx";
import Acomodacoes from "./pages/user/acomodacoes/acomodacoes.jsx";
import Contato from "./pages/user/contato/contato.jsx"
>>>>>>> 799c934b0582f92c8c6d47e88a2e015cf19a640e


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
<<<<<<< HEAD
      <Route path="/Contato" element={<Contato />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/" element={<Pix />} />

=======
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Acomodacoes" element={<Acomodacoes />} />
      <Route path="/Contato" element={<Contato />} />
>>>>>>> 799c934b0582f92c8c6d47e88a2e015cf19a640e
    </Routes>
  );
}

export default MainRoutes;