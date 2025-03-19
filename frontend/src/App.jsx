import Cadastro from './pages/user/cadastro/cadastro';
import Inicio from './pages/user/pagina_inical/pagina_incial';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quartos from './pages/user/quartos/quartos';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/quartos" element={<Quartos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;