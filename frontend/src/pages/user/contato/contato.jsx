import React from "react";
import "./contato.css";

function Contato() {
  return (
    <div className="contato-container">
      <header className="header">
        <nav className="nav">
          <a href="#inicio">INÍCIO</a>
          <a href="#contato">CONTATO</a>
          <a href="#quinta">QUINTA CORVADA</a>
          <a href="#acomodacoes">ACOMODAÇÕES</a>
          <a href="#login">LOGIN</a>
        </nav>
      </header>

      <section className="contato-section">
        <h1>Vamos conversar?</h1>
        <p>
          Entre em contato com a gente para informações sobre reservas, disponibilidade de datas, preços e outras dúvidas. Estaremos à disposição para atendê-lo e tornar a sua experiência com a pousada inesquecível.
        </p>
        <button className="fale-conosco-button">Fale conosco</button>
      </section>

      <section className="avaliacoes-section">
        <h2>Avaliações</h2>
        <p>
          Agradecemos por escolher a Quinta do Ypuá para sua estadia. Compartilhe sua experiência conosco logo abaixo!
        </p>
        <form className="avaliacoes-form">
          <input type="text" placeholder="Nome" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <textarea placeholder="Digite sua mensagem" className="input-field textarea-field"></textarea>
          <button type="submit" className="submit-button">Enviar avaliação</button>
        </form>
      </section>
    </div>
  );
}

export default Contato;