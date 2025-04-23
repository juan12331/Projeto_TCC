import http from "./http"




// funções usuarios


export async function getUser(params){
    const response = await http.get('/usuarios', {params});
    return response.data
}

export async function getUsersByCpf(cpf) {
    const response = await http.get(`/usuarios/${cpf}`);
    return response.data;
}

export async function loginUser(cpf, senha) {
    const response = await http.post('/login', { cpf, senha });

    const { token } = response.data;
    if (token) {
        localStorage.setItem('token', token);
    }

    return response.data;
}



export async function logout() {
    await http.post('/logout');
    localStorage.removeItem('token');
}

export async function createUser(cpf, nome, email, senha, telefone) {
    const response = await http.post('/usuarios', { cpf: cpf, nome: nome, email: email, senha: senha, telefone: telefone });
    return response.data;
}

export async function deleteUser(cpf) {
    const response = await http.delete(`/usuarios/${cpf}`);
    return;
}

export async function updateUser(cpf, nome, email, senha, papel, telefone) {
    const response = await http.put(`/usuarios/${cpf}`, { nome: nome, email: email, senha: senha, papel: papel, telefone: telefone });
    return console.log(response.data);
}


// funções tipos_usuarios


export async function createTipoUser(id_tipo, permissao) {
    const response = await http.post('/tiposusuarios', { id_tipo: id_tipo, permissao: permissao});
    return response.data;
}

export async function deleteTipoUser(id_tipo) {
    const response = await http.delete(`/tiposusuarios/${id_tipo}`);
    return response;
}

export async function GetTipoUser(params) {
    const response = await http.get('/tiposusuarios', {params});
    return response.data;
}


// funções reserva


export async function getReservas(params) {
    const response = await http.get('/reservas', {params});
    return response.data;
}

export async function getReservasById(id) {
    const response = await http.get(`/reservas/${id}`);
    return response.data;
}

export async function getReservasByCpf(cpf) {
    const response = await http.get(`/reservas/${cpf}`);
    return response.data;
}

export async function getReservasByTwoDate(data_inicio, data_final) {
    const response = await http.get(`/reservas/data/${data_inicio}/${data_final}`);
    return response.data;
}

export async function getReservasOneDate(data) {
    const response = await http.get(`/reservas/data/${data}`);
    return response.data;
}

export async function createReserva(cpf, id_quarto, data_inicio, data_final) {
    const response = await http.post(`/reservas`, {cpf: cpf, id_quarto: id_quarto, data_inicio: data_inicio, data_final: data_final});
    return response.data;
}

export async function updateReserva(id, cpf, id_quarto, data_inicio, data_final) {
    const response = await http.put(`/reservas/${id}`, {cpf: cpf, id_quarto: id_quarto, data_inicio: data_inicio, data_final: data_final});
    return response.data;
}

export async function deleteReserva(id) {
    const response = await http.delete(`/reservas/${id}`);
    return response.data;
}


// funções quartos


export async function getAllQuartosDisponiveis(params) {
    const response = await http.get('/quartos', {params});
    return response.data;
}

export async function getQuartosDisponiveis(id_quarto) {
    const response = await http.get(`/quartos/${id_quarto}`);
    return response.data;
}

export async function createQuartos(nome, preco, descricao) {
    const response = await http.post(`/quartos`, {nome: nome, preco: preco, descricao: descricao});
    return response.data;
}

export async function updateQuartos(id_quarto, nome, preco, descricao) {
    const response = await http.put(`/quartos/${id_quarto}`, {nome: nome, preco: preco, descricao: descricao});
    return response.data;
}

export async function deleteQuartos(id_quarto) {
    const response = await http.delete(`/quartos/${id_quarto}`);
    return response;
}

// funções fotos_quartos


export async function createFotos(id_quarto, imagem) {
    const response = await http.post('/fotosquartos', { id_quarto: id_quarto, imagem: imagem});
    return response.data;
}

export async function deleteFotos(id_foto) {
    const response = await http.delete(`/fotosquartos/${id_foto}`);
    return response;
}

export async function GetFotos() {
    const response = await http.get('/fotosquartos');
    return response.data;
}


// funções avaliações

export async function GetAllAvaliacoes(params) {
    const response = await http.get('/avaliacoes', {params});
    return response.data;
}

export async function GetMediaAvaliacoes() {
    const response = await http.get('/avaliacoesNota');
    return response.data;
}

export async function getAvaliacoesById(id_avaliacao) {
    const response = await http.get(`/avaliacoes/${id_avaliacao}`);
    return response.data;
}

export async function createAvaliacoes(avaliacao_texto, nota, cpf) {
    const response = await http.post(`/avaliacoes`, {avaliacao_texto: avaliacao_texto, nota: nota, cpf: cpf});
    return response.data;
}

export async function updateAvaliacoes(id_avaliacao, avaliacao_texto, nota, cpf) {
    const response = await http.put(`/avaliacoes/${id_avaliacao}`, {avaliacao_texto: avaliacao_texto, nota: nota, cpf: cpf});
    return response.data;
}

export async function deleteAvaliacoes(id_avaliacao) {
    const response = await http.delete(`/avaliacoes/${id_avaliacao}`);
    return response.data;
}


// funções avaliações_quartos


export async function getAllAvaliacoes_quartos(params) {
    const response = await http.get('/avaliacoesQuartos', {params});
    return response.data;
}

export async function getAvaliacoes_quartosById(id_reclamacao) {
    const response = await http.get(`/avaliacoesQuartos/${id_reclamacao}`);
    return response.data;
}

export async function getAvaliacoes_quartosByCpf(Cpf) {
    const response = await http.get(`/avaliacoesQuartos/${Cpf}`);
    return response.data;
}

export async function getAvaliacoes_quartosByQuarto(id_quarto) {
    const response = await http.get(`/avaliacoesQuartos/${id_quarto}`);
    return response.data;
}

export async function deleteAvaliacoes_quartos(id_quarto) {
    const response = await http.delete(`/avaliacoesQuartos/${id_quarto}`);
    return response;
}

export async function createAvaliacoes_quartos(avaliacao_texto, nota, id_quarto, cpf) {
    const response = await http.post(`/avaliacoesQuartos`, {avaliacao_texto: avaliacao_texto, nota: nota, id_quarto: id_quarto, cpf: cpf});
    return response.data;
}

export async function updateAvaliacoes_quartos(id_reclamacao, avaliacao_texto, nota, id_quarto, cpf) {
    const response = await http.put(`/avaliacoesQuartos/${id_reclamacao}`, {avaliacao_texto: avaliacao_texto, nota: nota, id_quarto: id_quarto, cpf: cpf});
    return response.data;
}