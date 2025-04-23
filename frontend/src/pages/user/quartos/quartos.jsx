import React, { useState } from "react";
import "./quartos.css";
import logo from "/src/assets/img/Logo.png";
import img from "/src/assets/quartos/domo_quartos.png";
import img1 from "/src/assets/quartos/image 120.png";
import img2 from "/src/assets/quartos/image 114.png";
import img3 from "/src/assets/quartos/image 117.png";
import img4 from "/src/assets/quartos/image 119.png";
import img5 from "/src/assets/quartos/image 121.png";
import { FaStar } from "react-icons/fa";
import NavbarUser from "../../../assets/components/navbarUser";

function Quartos() {
  const imagens = [img, img1, img2, img3, img4, img5];
  const [imagemAtual, setImagemAtual] = useState(imagens[0]);

  const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
                style={{ display: "none" }}
              />
              <FaStar
                className="star"
                size={30}
                color={currentRating <= (hover || rating) ? "#FFD700" : "#ccc"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
    );
  };

  const handleImagemClick = (imagem) => {
    setImagemAtual(imagem);
  };

  return (
    <>
      <div className="fundo_quartos">
        <NavbarUser/>
        <div className="back-quartos">
          <button onClick={() => navigate("/acomodacoes")} className="backButton-quartos"> ← </button>
          <h1 className="backLine-quartos">|</h1>
          <button onClick={() => navigate("/acomodacoes")} className="backText-quartos"> ACOMODAÇÕES </button> 
        </div>
        <main className="quarto-container">
          <section className="galeria-principal">
            <img
              src={imagemAtual}
              alt="Imagem do domo"
              className="imagem-principal"
            />
            <div className="miniaturas">
              {imagens.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className={`miniatura ${imagemAtual === img ? "ativa" : ""}`}
                  onClick={() => handleImagemClick(img)}
                />
              ))}
            </div>
          </section>

          <section className="detalhes-quarto">
            <div className="preco-container">
              <p>A PARTIR DE</p>
              <h2>R$590,00</h2>
              <p>POR NOITE</p>
            </div>

            <div className="form-reserva">
              <input type="date" placeholder="Check-in" />
              <input type="date" placeholder="Check-out" />
              <select>
                <option>1 Adulto</option>
                <option>2 Adultos</option>
                <option>3 Adultos</option>
              </select>

              <select>
                <option>0 Crianças</option>
                <option>1 Crianças</option>
                <option>2 Crianças</option>
                <option>3 Crianças</option>
              </select>
              <button className="btn-reservar">Reservar</button>
            </div>
          </section>
        </main>
        <div className="tudo_domo">
          <div className="domo_titulo">
            <p>CONHEÇA O DOMO</p>
          </div>
          <article>
            <div className="aviso">
              <div>
                <p>
                  Os valores exibidos no site estão sujeitos a constantes
                  atualizações. Nos feriados e datas comemorativas o valor da
                  diária também é diferenciado. Para mais detalhes entre em
                  contato por telefone. O Domo é a grande novidade da pousada.
                  Uma acomodação totalmente diferenciada construída nos padrões
                  arquitetônicos dos domos geodésicos modernos.
                </p>
              </div>
            </div>

            <div className="informacoes_domo">
              <div className="top">
                <div className="line">
                  <div className="item">
                    <img
                      src="/src/assets/quartos/ar-condicionado.png"
                      alt="ar-condicionado"
                    />
                    <p>Ar condicionado</p>
                  </div>
                </div>

                <div className="line">
                  <div className="item">
                    <img
                      src="/src/assets/quartos/televisao.png"
                      alt="televisao"
                    />
                    <p>TV</p>
                  </div>
                  <div className="item">
                    <img src="/src/assets/quartos/wifi.png" alt="wifi" />
                    <p>Wifi</p>
                  </div>
                </div>

                <div className="line">
                  <div className="item">
                    <img src="/src/assets/quartos/ducha.png" alt="ducha" />
                    <p>Ducha</p>
                  </div>
                  <div className="item">
                    <img
                      src="/src/assets/quartos/frigobar.png"
                      alt="frigobar"
                    />
                    <p>Frigobar</p>
                  </div>
                </div>

                <div className="line">
                  <div className="item">
                    <img src="/src/assets/quartos/toalhas.png" alt="toalhas" />
                    <p>Toalhas</p>
                  </div>
                  <div className="item">
                    <img
                      src="/src/assets/quartos/cozinha_domo.png"
                      alt="cozinha"
                    />
                    <p>Cozinha</p>
                  </div>
                </div>
              </div>

              <div className="botton">
                <div className="line2">
                  <div className="item2">
                    <p className="textcor">Acomoda: </p>
                    <p className="textsem">3 pessoas</p>
                  </div>
                  <div className="item2">
                    <p className="textcor">Camas: </p>
                    <p className="textsem">1 cama de casal</p>
                  </div>
                </div>

                <div className="line2">
                  <div className="item2">
                    <p className="textcor">Check-in: </p>
                    <p className="textsem">14h00</p>
                  </div>
                  <div className="item2">
                    <p className="textcor">Check-out: </p>
                    <p className="textsem">10h00</p>
                  </div>
                </div>

                <div className="line2">
                  <div className="item2">
                    <p className="textcor">Check-in: </p>
                    <p className="textsem">14h00</p>
                  </div>
                  <a href="https://www.pousadadomirantenoronha.com.br/p/politica-da-pousada">
                    Leia nossas políticas
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="avaldomo">
          <p>AVALIAÇÃO</p>
        </div>
        <section className="avaliacoes">
          <div className="testimonials-container">
            <div className="testimonial-item">
              <div className="testimonial-img-container">
                <img
                  src="/src/assets/quartos/usuario_domo.png"
                  alt="Usuário"
                  className="testimonial-img"
                />
              </div>
              <p className="testimonial-text">
                Quarto super confortável e atendimento excelente
              </p>
            </div>

            <div className="testimonial-item">
              <div className="testimonial-img-container">
                <img
                  src="/src/assets/quartos/usuario_domo.png"
                  alt="Usuário"
                  className="testimonial-img"
                />
              </div>
              <p className="testimonial-text">
                Excelente acomodação. Voltarei mais vezes
              </p>
            </div>

            <div className="testimonial-item">
              <div className="testimonial-img-container">
                <img
                  src="/src/assets/quartos/usuario_domo.png"
                  alt="Usuário"
                  className="testimonial-img"
                />
              </div>
              <p className="testimonial-text">Quarto aconchegante. Nota 10!</p>
            </div>

            <div className="testimonial-item">
              <div className="testimonial-img-container">
                <img
                  src="/src/assets/quartos/usuario_domo.png"
                  alt="Usuário"
                  className="testimonial-img"
                />
              </div>
              <p className="testimonial-text">Ótima acomodação!</p>
            </div>
          </div>

          <div className="aval_domo">
            <p>
              Agradecemos por escolher o Domo para sua estadia. <br />{" "}
              Compartilhe sua experiência conosco logo abaixo!
            </p>
            <StarRating />

            <div className="aval-container">
              <div className="form-aval">
                <div className="info_form_aval">
                  <input
                    type="name"
                    placeholder="Nome"
                    className="input-nome"
                  />
                  <input
                    type="email"
                    placeholder="Insira seu email"
                    className="input-email"
                  />
                  <input
                    type="text"
                    placeholder="Digite sua mensagem"
                    className="input-mensg"
                  />
                  
                  <button className="btn-enviar">Enviar avaliação</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Quartos;
