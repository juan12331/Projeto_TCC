import "./criar_usuarios.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, createUser } from "../../../services/Api_service";


const Criar_usuarios = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('')
    const [tel, setTelefone] = useState('')
    const [papel, setPapel] = useState('')


    useEffect(() => {
        verificacao()
    }, [])


    const rageEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rageSenha = /^(?=.*[A-Z])(?=.*\d).+$/;
    const rageCaracter = /^.{8,}$/;
    const regexMaisDe14Caracteres = /^.{15,}$/

    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    function formatPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\D/g, '');

        if (phoneNumber.length === 11) {
            return phoneNumber.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        } else if (phoneNumber.length === 10) {
            return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return phoneNumber;
        }
    }

    async function Criar(e) {
        e.preventDefault();
        console.log(Number(papel))

        if (nome === '' || email === '' || senha === '' || tel === '' || cpf === '') {
            showError('preencha todos os campos')
            return;
        }
        if (!rageEmail.test(email)) {
            showError('Email invalido')
            return;
        } if (!rageSenha.test(senha)) {
            showError('Senha fraca, coloque numeros e letras maiusculas')
            return;
        } if (!rageCaracter.test(senha)) {
            showError('senha precisa no minimo de 8 caracteres')
            return
        } if (regexMaisDe14Caracteres.test(cpf)) {
            showError('Cpf incorreto')
            return
        } if (regexMaisDe14Caracteres.test(tel)) {
            showError('telefone não suportado/incorreto')
            return
        } if (validateCPF(cpf) !== true) {
            showError('cpf inexistente')
            return
        }
        if (papel === "" || papel === null || papel === undefined) {
            showError('Selecione um papel válido');
            return;
        }
        
        console.log('Enviando papel:', papel);
        
        try {
            // Verificar que o papel é uma string contendo "1" ou "2"
            const papelValue = papel;
            
            // Chamada da API passando o valor selecionado
            const data = await createUser(cpf, nome, email, senha, tel, Number(papel));
            
            if (data === 'usuario ja foi cadastrado') {
                showError('Usuário Já Cadastrado')
                return;
            }
            window.location.href = '/Usuarios'
        } catch (err) {
            console.error("Erro ao criar usuário:", err);
            showError('Erro ao criar usuário');
        }
    }

    const validateCPF = (cpf) => {
        // Função para validar CPF
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    };

    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }

    async function verificacao() {
        try {
            await getUser().then(data => { })
        } catch (error) {
            console.log(error);
            if (error.status === 403 || error.status === 401) {
                window.alert('acesso não autorizado')
                window.location.href = "/login"
            }
        }
    }

    // Esta função lida com a mudança no select de papel
    const handlePapelChange = (e) => {
        const selectedValue = e.target.value;
        setPapel(selectedValue);
        console.log("Papel selecionado:", selectedValue);
    };

    return (
        <div className="criarUser_page">
            <NavbarAdm />
            <div className="fundo-criarUser">
                <div className="fundoLeft-criarUser">
                    <div className="back-criarUser">
                        <button onClick={() => navigate("/usuarios")} className="back-buttonUser"> ← </button>
                        <h1 className="back-lineUser">|</h1>
                        <button onClick={() => navigate("/usuarios")} className="back-textUser"> USUÁRIOS </button>
                    </div>
                    <div className="pageLeft-criarUser">
                        <img
                            className="user_criarUser"
                            src="/src/assets/imgCriarUser_Adm/user_criarUser.png"
                            alt=""
                        />
                        <div className="grid-criarUser">
                            <form className="itensLeft-criarUser">
                                <div className="name-criarUser">
                                    <input type="name" className="itensName-criarUser" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </div>
                                <div className="cpf-criarUser">
                                    <input type="cpf" className="itensCpf-criarUser" placeholder="CPF" value={cpf} onChange={(e) => setCPF(formatCPF(e.target.value))} />
                                </div>
                                <div className="email-criarUser">
                                    <input type="email" className="itensEmail-criarUser" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </form>

                            <form className="itensRight-criarUser">
                                <div className="sobrenome-criarUser">
                                    <input type="password" className="itensSobrenome-criarUser" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                </div>
                                <div className="phone-criarUser">
                                    <input type="tel" className="itensPhone-criarUser" placeholder="Telefone" value={tel} onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))} />
                                </div>
                                <div className="text-criarUser">
                                    <select
                                        className="itensText-criarUser"
                                        value={papel}
                                        onChange={handlePapelChange}
                                        required
                                    >
                                        <option value="" disabled>Selecione um papel</option>
                                        <option value="1">adm</option>
                                        <option value="2">user</option>
                                    </select>
                                </div>
                                <div className="">
                                    <span className='error esquerdinha' id='span' ></span>
                                </div>
                            </form>

                        </div>
                        <button onClick={Criar} className="cadastrarUser-button">Cadastrar</button>
                    </div>
                </div>

                <div className="pageRight-criarUser">
                    <div className="backgroundImg-criarUser">
                        <div className="fundoInfo-criarUser">
                            <h1 className="info-criarUser">DESEJA RESERVAR QUARTO?</h1>
                            <button onClick={() => navigate("/acomodacoesAdm")} className="reservarUser-button">Reservar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Criar_usuarios;