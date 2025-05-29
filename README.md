# 📝 Descrição do Projeto: 

O projeto tem como objetivo o desenvolvimento de um site institucional para o hotel Quinta do Ypuã, visando otimizar o processo de agendamento de quartos, aprimorar a comunicação entre os administradores e os clientes, além de oferecer uma interface visualmente agradável e de fácil navegação. Trata-se de um projeto prático com foco em desenvolvimento web, no qual foram aplicadas técnicas de design responsivo, usabilidade e integração de funcionalidades específicas para o setor hoteleiro. O sistema proposto permite uma melhor organização interna, proporciona ao cliente uma experiência mais eficiente ao realizar reservas, além de centralizar informações relevantes sobre o hotel e seus serviços.  

---

# ✅ Requisitos: 

- "@emailjs/browser": "^4.4.1", 
- "axios": "^1.8.3", 
- "bcrypt": "^6.0.0", 
- "bcryptjs": "^3.0.2", 
- "bootstrap": "^5.3.3", 
- "date-fns": "^4.1.0", 
- "dotenv": "^16.5.0", 
- "framer-motion": "^12.3.1", 
- "react": "^18.3.1", 
- "react-bootstrap": "^2.10.9", 
- "react-bootstrap-icons": "^1.11.5", 
- "react-datepicker": "^8.0.0", 
- "react-dom": "^18.3.1", 
- "react-google-recaptcha": "^3.1.0", 
- "react-icons": "^5.5.0", 
- "react-rating-stars-component": "^2.2.0", 
- "react-router-dom": "^7.5.0", 
- "react-select": "^5.10.1", 
- "react-slick": "^0.30.3"

---

# 🚀 Instruções Gerais de Execução: 

1. Clone este repositório: git clone https://github.com/juan12331/Projeto_TCC.git 

2. Navegue para o Diretório do Projeto: cd Projeto_TCC 

3. Para acessar a pasta Frontend: cd frontend 

4. Para acessar a pasta Backend: cd backend 

5. Instale as Dependências: npm i 

6. Rodar código na pasta Frontend: npm run dev 

7. Rodar código na pasta Backend: noder server.js

---

# 🖥️ Instruções de Execução Backend: 

 Configurar arquivo .env: 

```
TOKEN_SECRETO_JWT=[escreva seu token aqui]
PORT=[escreva sua porta sql aqui]
TOKEN_MERCADO_PAGO=[escreva o seu token do mercado pago aqui]
SQL_USERNAME=[escreva o seu username mysql aqui]
SQL_PASSWORD=[escreva o sua senha mysql aqui (caso não haja deixe vazio)]
SQL_DATABASE=[escreava o nome da database que esta utilizando aqui]
SQL_HOST=[escreva o host que esta utilizando aqui ex: localhost]
```

---

# 💻 Instruções de Execução Frontend: 

 Configurar arquivo .env: 

```
VITE_TOKEN_EMAIL=[Seu token de email (consegue depois de criar sua conta no email.js)]
VITE_SERVICE_ID=[Seu id de serviço (consegue depois de criar seu serviço no email.js)]
VITE_TEMPLATE_ID=[Seu id do template (consegue depois de criar seu template email no email.js)]
VITE_RECAPTCHA_KEY=[token recaptcha do site (consegue depois de criar uma conta https://www.google.com/recaptcha/admin/site/) ]
```

---

# 📂 Estrutura de Arquivos: 

### Pasta Backend:
  
⚙️ Arquivos Raiz 

- backend.sql: Script SQL utilizado para a definição ou manipulação do banco de dados. 

- package.json: Arquivo de manifesto do projeto Node.js, contendo metadados, dependências e scripts do projeto. 

- package-lock.json: Arquivo gerado automaticamente pelo npm que registra as versões exatas das dependências instaladas, garantindo consistência nas instalações futuras. 

- server.js: Ponto de entrada principal do servidor backend, onde o aplicativo Express é iniciado.

  
📦 Diretórios 


- config 

  - sequelize.js: Arquivo de configuração do Sequelize ORM, responsável por estabelecer a conexão com o banco de dados e   
  definir parâmetros de operação.


- controllers 

  - authenticate.js: Gerencia a lógica de autenticação de usuários. 
  
  - avaliacoes.js: Controla as operações relacionadas às avaliações gerais. 
  
  - avaliacoes_quartos.js: Gerencia as avaliações específicas de quartos. 
  
  - fotos_quartos.js: Controla o gerenciamento de fotos associadas aos quartos. 
  
  - quartos.js: Gerencia as operações relacionadas aos quartos disponíveis. 
  
  - reservas.js: Controla o processo de reservas realizadas pelos usuários. 
  
  - tipos_usuarios.js: Gerencia os diferentes tipos de usuários e suas permissões. 
  
  - usuarios.js: Controla as operações relacionadas aos usuários do sistema.
 
    
- models 

  - avaliacoes.js: Modelo representando a entidade de avaliações gerais. 
  
  - avaliacoes_quartos.js: Modelo para as avaliações específicas de quartos. 
  
  - fotos_quartos.js: Modelo que representa as fotos associadas aos quartos. 
  
  - quartos.js: Modelo representando os quartos disponíveis no sistema. 
  
  - reservas.js: Modelo para as reservas realizadas pelos usuários. 
  
  - tipos_usuarios.js: Modelo que define os diferentes tipos de usuários. 
  
  - usuarios.js: Modelo representando os usuários cadastrados no sistema.
 
    
- routes 

  - routes.js: Arquivo que define as rotas da API backend, associando endpoints aos respectivos controladores. 

 

### Pasta Frontend:
  
⚙️ Arquivos Raiz 

- index.html: Arquivo principal que serve como ponto de entrada para a aplicação React. 

- package.json: Arquivo contendo metadados, dependências e scripts específicos do React. 

- package-lock.json: Arquivo que registra as versões das dependências instaladas no frontend. 

- vite.config.js: Arquivo de configuração do Vite.

  
📦 Diretórios 


- public 

  - vite.svg: Recurso de imagem SVG utilizado na interface do usuário.
 
    
- src 

  - App.jsx: Componente raiz da aplicação React, responsável por definir a estrutura e as rotas principais. 
  
  - App.css: Estilização aplicada ao componente App.jsx. 
  
  - main.jsx: Ponto de entrada da aplicação React, onde o componente App é renderizado. 
  
  - index.css: Estilização global. 
  
  - routes.jsx: Arquivo que define as rotas do frontend. 

  - assets
    
   ⬛ colagem: Contém imagens utilizadas para compor colagens na interface do usuário. 
   ⬛ components: Contém componentes reutilizáveis da interface: 
    - boxcartao.jsx / boxcartao.css: Componente e estilos para o cartão de informações. 
    
    - boxpix.jsx / boxpix.css: Componente e estilos para a opção de pagamento via Pix. 
    
    - navbarAdm.jsx / navbarAdm.css: Componente e estilos para a barra de navegação do administrador. 
    
    - navbarUser.jsx / navbarUser.css: Componente e estilos para a barra de navegação do usuário. 

   ⬛ img: Contém diversas imagens utilizadas no frontend.
  
   ⬛ imgAcomodacoes: Imagens utilizadas na tela de acomodações.
  
   ⬛ imgCriarUser_Adm: Imagens utilizadas na tela de criar_usuarios do Adm.
  
   ⬛ imgLogin: Imagens utilizadas na tela de login.
  
   ⬛ imgNavbar: Imagens utilizadas utilizadas na tela de navegação.
  
   ⬛ imgUsuarios_Adm: Imagens utilizadas na tela de usuarios do Adm.
  
   ⬛ quartos: Imagens utilizadas na tela de quartos.
  
 - pages
   
   ⬛ adm

     - acomodacoesAdm: Pasta com página e estilos para a gestão de acomodações do Adm. 
     - ava_adm: Pasta com página e estilos para a gestão de avaliação do usuário do Adm. 
     - ava_adm_quarto: Pasta com página para a gestão de avaliações de quartos do Adm. 
     - avaliacoesAdm Pasta com página e estilos para a visualização de avaliações gerais do Adm. 
     - criar_usuarios: Pasta com página e estilos para a criação de novos usuários do Adm. 
     - criarAcomodacao: Pasta com página e estilos para a criação de novas acomodações do Adm. 
     - perfil_adm: Pasta com página e estilos para o perfil de usuários do Adm. 
     - quartos_Adm: Pasta com página e estilos para a gestão de quartos do Adm. 
     - usuarios: Pasta com página e estilos para a gestão de usuários do Adm. 

   ⬛ user 

    - acomodacoes: Pasta com página e estilos para a visualização de acomodações disponíveis. 
    - cadastro: Pasta com página e estilos para o cadastro de novos usuários. 
    - contato: Pasta com página e estilos para o contato com a administração. 
    - esqueceu_senha: Pasta com página para recuperação de senha. 
    - login: Pasta com página e estilos para o login de usuários. 
    - pagamento_pix: Pasta com página e estilos para o pagamento via Pix. 
    - pagina_inical: Pasta com página e estilos para a página inicial da aplicação. 
    - perfil: Pasta com página e estilos para o perfil do usuário. 
    - quartos: Pasta com página e estilos para a visualização de quartos disponíveis. 
    - redefinir_senha: Pasta com página para redefinição de senha. 

 - Services
   
  ⬛ Api_service.js: Serviço responsável pela comunicação com a API backend. 
  ⬛ http.js: Configurações e instâncias do cliente HTTP utilizado nas requisições. 

---

## 🛠 Contribuidores: 

Carolina Teixeira, Isabela Manzano, Juan Miguel e Kauan Duarte 
