import "./perfil.css";

import NavbarUser from "../../../assets/components/navbarUser";


function Perfil() {
    return (
     <div>
      <NavbarUser/>
      <div className="container-perfil">
        <img
          src="/src/assets/img/imgPerfil2.png"
          alt="Fundoctt"
          className="background-image2"
        />
      </div>
      <div className="contact-box2">
       <div  className="linha-perfil">
        <img
          src="/src/assets/img/Linha.png"
          width="107%"
        />
      </div>
      <div  className="perfil-perfil">
        <img
          src="/src/assets/img/perfil.png"   
        />
      </div>
      <div  className="informacoes-perfil">
        <img
          src="/src/assets/img/informações.png"   
        />
      </div>
      <div  className="reservados-perfil">
        <img
          src="/src/assets/img/reservados.png"   
        />
      </div>
      <div  className="domo-perfil">
        <img
          src="/src/assets/img/domo_perfil.png" 
          width="70%"  
        />
      </div>
      <div className="text-perfil">
      <h3>Nome: Neymar da Silva Santos Junior</h3>   
      <h3> Email: Neymardasilvasantosjunior@gmail.com</h3>
      <h3> CPF: 382.443.358-31</h3> 
      <h3> Numero De Telefone: 55 13 3476-1111</h3>   
      </div>
      <div className="text-perfil2">
      <h4>Domo - 3 noites</h4>   
      <h4>Total a pagar: R$ 1770,00</h4>   
      </div>
      

      </div>
    </div>

      

            

            
    );
  };
  
  export default Perfil;