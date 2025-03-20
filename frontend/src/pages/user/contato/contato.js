import StarRating from "./StarRating"; // Importe o componente

const Contato = () => {
  return (
    <div>
      {/* Seu código existente */}
      <p className="contact-text2">
        Agradecemos por escolher a Quinta do Ypuã para sua estadia. <br />
        Compartilhe sua experiência conosco logo abaixo!
      </p>

      {/* Adicionando as estrelas abaixo do texto de avaliações */}
      <StarRating />
    </div>
  );
};

export default Contato;