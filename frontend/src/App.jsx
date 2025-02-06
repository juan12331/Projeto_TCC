import Inicio from "./pages/user/pagina_inical/pagina_incial"
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';

function App(){
  return (
      <BrowserRouter>
      <MainRoutes/>
    </BrowserRouter>
    )
  
}

export default App;