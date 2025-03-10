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

export async function loginUser(email, senha) {
    const response = await http.post('/login', { email: email, senha: senha });
    return response.data;
}

export async function createUser(cpf, nome, email, senha, telefone) {
    const response = await http.post('/usuarios', { cpf: cpf, nome: nome, email: email, senha: senha, telefone: telefone })
    return response.data
}

export async function deleteUser(cpf) {
    const response = await http.delete(`/usuarios/${cpf}`)
    return;
}

export async function updateUser(cpf, nome, email, senha, papel, telefone) {
    const response = await http.put(`/usuarios/${cpf}`, { nome: nome, email: email, senha: senha, papel: papel, telefone: telefone })
    return console.log(response.data);
}

// funções tipos_usuarios

export async function createTipoUser(id_tipo, permissao) {
    const response = await http.post('/tiposusuarios', { id_tipo: id_tipo, permissao: permissao})
    return response.data
}

export async function deleteTipoUser(id_tipo) {
    const response = await http.delete(`/tiposusuarios/${id_tipo}`)
    return response
}

export async function GetTipoUser(params) {
    const response = await http.get('/tiposusuarios', {params})
    return response.data
}

// funções reserva



// funções quartos

// funções fotos_quartos

export async function createFotos(id_quarto, imagem) {
    const response = await http.post('/fotosquartos', { id_quarto: id_quarto, imagem: imagem})
    return response.data
}

export async function deleteFotos(id_foto) {
    const response = await http.delete(`/fotosquartos/${id_foto}`)
    return response
}

export async function GetFotos() {
    const response = await http.get('/fotosquartos')
    return response.data
}

// funções avaliações

// funções avaliações_quartos