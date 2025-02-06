<<<<<<< HEAD
import Inicio from "./pages/user/pagina_inical/pagina_incial"
=======
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';
>>>>>>> c446ecf727ab6147c6aa721f703935ce803d273d

function App(){
  return (
<<<<<<< HEAD
    <>
      <Inicio />
    </>
  )
=======
    <BrowserRouter>
      <MainRoutes/>
    </BrowserRouter>
  );
>>>>>>> c446ecf727ab6147c6aa721f703935ce803d273d
}

export default App;