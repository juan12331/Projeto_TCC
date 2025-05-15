//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Usuarios from "./pages/adm/usuarios/usuarios.jsx";
import Criar_usuarios from "./pages/adm/criar_usuarios/criar_usuarios.jsx";
import AvaliacoesAdm from "./pages/adm/avaliacoesAdm/avaliacoesAdm.jsx";
import Avaliacao from "./pages/adm/ava_adm/ava_adm.jsx";
import PerfilAdm from "./pages/adm/perfil_adm/perfil_adm.jsx";
import AcomodacoesAdm from "./pages/adm/acomodacoesAdm/acomodacoesAdm.jsx";
import QuartosAdm from "./pages/adm/quartos_Adm/quartosAdm.jsx";

//Rotas dos usuarios
import Cadastro from "./pages/user/cadastro/cadastro.jsx";
import Login from "./pages/user/login/login.jsx";
import Contato from "./pages/user/contato/contato.jsx";
import Perfil from "./pages/user/perfil/perfil.jsx";
import Pix from "./pages/user/pagamento_pix/pix.jsx";
import Inicio from "./pages/user/pagina_inical/pagina_incial.jsx";
import Acomodacoes from "./pages/user/acomodacoes/acomodacoes.jsx";
import Quartos from "./pages/user/quartos/quartos.jsx";
import EsqueceuSenha from "./pages/user/esqueceu_senha/esqueceu_senha.jsx"
import RedefinirSenha from "./pages/user/redefinir_senha/redefinir_senha.jsx"

function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Usuarios" element={<Usuarios />} />
      <Route path="/Criar_usuarios" element={<Criar_usuarios />} />
      <Route path="/AvaliacoesAdm" element={<AvaliacoesAdm />} />
      <Route path="/Avaliacao" element={<Avaliacao />} />
      <Route path="/PerfilAdm/:cpf" element={<PerfilAdm />} />
      <Route path="/AcomodacoesAdm" element={<AcomodacoesAdm />} />
      <Route path="/quartosAdm/:id_quarto" element={<QuartosAdm />} />
      


      {/* User Routes */}
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/" element={<Inicio />} /> 
      <Route path="/Login" element={<Login />} />
      <Route path="/Contato" element={<Contato />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/Pix" element={<Pix />} />
      <Route path="/Acomodacoes" element={<Acomodacoes />} />
      <Route path="/Quartos" element={<Quartos />} />
      <Route path="/ForgotPassword" element={<EsqueceuSenha />} />
      <Route path="/ResetPassword" element={<RedefinirSenha />} />
    </Routes>
  );
}

export default MainRoutes;