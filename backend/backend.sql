-- 1. Criar o banco de dados
DROP DATABASE IF EXISTS pousada;
CREATE DATABASE pousada;

-- 2. Conectar ao banco (em alguns ambientes isso precisa ser feito manualmente)
\c pousada;

-- 3. Criar tabela tipos_usuarios
CREATE TABLE tipos_usuarios (
    id_tipo SERIAL PRIMARY KEY,
    permissao VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

-- 4. Criar tabela usuarios
CREATE TABLE usuarios (
    cpf VARCHAR(20) PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha TEXT NOT NULL,
    id_tipo INTEGER REFERENCES tipos_usuarios(id_tipo),
    telefone VARCHAR(20),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

-- 5. Criar tabela quartos
CREATE TABLE quartos (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(10),
    descricao TEXT,
    preco DECIMAL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

-- 6. Criar tabela fotos_quartos
CREATE TABLE fotos_quartos (
    id SERIAL PRIMARY KEY,
    id_quarto INTEGER REFERENCES quartos(id),
    url TEXT,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

-- 7. Criar tabela avaliacoes
CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    cpf_usuario VARCHAR(20) REFERENCES usuarios(cpf),
    comentario TEXT,
    nota INTEGER,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

-- 8. Criar tabela avaliacoes_quartos
CREATE TABLE avaliacoes_quartos (
    id SERIAL PRIMARY KEY,
    id_quarto INTEGER REFERENCES quartos(id),
    id_avaliacao INTEGER REFERENCES avaliacoes(id),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

-- 9. Criar tabela reservas
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    cpf_usuario VARCHAR(20) REFERENCES usuarios(cpf),
    id_quarto INTEGER REFERENCES quartos(id),
    data_inicio DATE,
    data_fim DATE,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

-- 10. Inserir tipos de usuário
INSERT INTO tipos_usuarios (permissao) VALUES
('admin'),
('usuario');

-- 11. Inserir usuários
INSERT INTO usuarios (cpf, nome, email, senha, id_tipo, telefone)
VALUES
('111.111.111-11', 'Adm', 'Adm@gmail.com', '$10$PnOoSUdYCkWgzGztPKs7NOKMizwgmxZBtW.IM3yDbOQgtPOJd2TUG', 1, '(12) 3123-1232'), --A senha equivale a 901.129.420-32Aa
('123.123.123-19', 'usuario já foi cadastrado', 'akjbfds@gmail.com', 'senha_hash2', 2, '(12) 3213-1212'),
('123.123.123-20', 'createUser', '123.123.123-21@gmail.com', 'senha_hash3', 2, '(12) 3123-1232'),
('123.123.123-21', 'asojd', 'aoiusjd1@gmail.com', 'senha_hash4', 2, '(12) 3123-1212'),
('123.123.123-28', '123.123.123-20', '123.123.123-21@A.com', 'senha_hash5', 2, '(12) 3123-1232'),
('123.923.382-12', '123', '123@gmail.com', 'senha_hash6', 2, '(11) 1111-1111'),
('138.923.382-13', 'Juan', 'Juan@gmail.com', 'senha_hash7', 2, '(12) 3123-1231'),
('541.154.468-89', 'Yasmin', 'Yasmin@gmail.com', 'senha_hash8', 2, '(12) 3123-1232');



INSERT INTO quartos (id_quarto, nome, preco, descricao, ar_condicionado, tv, wifi, ducha, frigobar, toalhas, cozinha, createdAt, updatedAt) VALUES
(1, '3', 599, 'tem busca tranquilidade e contato com a natureza', 1, 0, 1, 1, 0, 1, 0, '2025-05-15 11:37:32', '2025-05-15 11:37:32'),
(2, 'Chale Familia', 590, 'O Chalé Familia da Quinta do Ypuã é a escolha...', 0, 1, 1, 0, 1, 1, 0, '2025-05-15 11:38:14', '2025-05-15 11:38:14'),
(3, 'Charrus (Bus)', 490, 'O quarto Charrus (Bus) da Quinta do Ypuã é pe...', 0, 0, 1, 1, 1, 1, 0, '2025-05-15 11:38:35', '2025-05-15 11:38:35'),
(4, 'Suite com cozinha', 390, 'A Suíte com Cozinha da Quinta do Ypuã é a esc...', 1, 1, 1, 0, 1, 1, 1, '2025-05-15 11:38:58', '2025-05-15 11:38:58'),
(5, 'Estacionamento para overlanders', 100, 'O estacionamento é privativo, garantindo maior...', 0, 0, 1, 0, 0, 0, 0, '2025-05-15 11:39:39', '2025-05-15 11:39:39'),
(6, 'Cabana', 490, 'A cabana da Quinta do Ypuã é perfeita para qu...', 1, 1, 1, 1, 1, 1, 0, '2025-05-15 11:39:57', '2025-05-15 11:39:57'),
(7, 'Quarto teste', 999, 'APAGUE ESSE QUARTO!!!', 1, 0, 1, 0, 1, 1, 1, '2025-05-15 11:40:18', '2025-05-15 11:40:18');


INSERT INTO fotos_quartos (id_foto, imagem, id_quarto, createdAt, updatedAt) VALUES
(1, 'https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg', 1, '2025-05-21 11:40:33', '2025-05-21 11:40:33'),
(2, 'https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg', 2, '2025-05-21 11:40:37', '2025-05-21 11:40:37'),
(3, 'https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg', 3, '2025-05-21 11:40:42', '2025-05-21 11:40:42'),
(4, 'https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg', 4, '2025-05-21 11:40:44', '2025-05-21 11:40:44'),
(5, 'https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg', 5, '2025-05-21 11:40:50', '2025-05-21 11:40:50'),
(6, 'https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg', 6, '2025-05-21 11:40:52', '2025-05-21 11:40:52'),
(7, 'https://static.wixstatic.com/media/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/b87f83_fd189730414e46d39003c5767b995e9b~mv2.jpg', 7, '2025-05-21 11:40:55', '2025-05-21 11:40:55');