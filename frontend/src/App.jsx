import Cadastro from './pages/user/cadastro/cadastro';
import Inicio from './pages/user/pagina_inical/pagina_incial';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quartos from './pages/user/quartos/quartos';
import MainRoutes from './routes';
import './App.css'
function App(){
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;