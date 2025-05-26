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
