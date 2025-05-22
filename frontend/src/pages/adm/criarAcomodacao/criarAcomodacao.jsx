import "./criarAcomodacao.css";
import NavbarAdm from "../../../assets/components/navbarAdm";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createFotos, createQuartos } from "../../../services/Api_service";

const CriarAcomodacao = () => {
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([null, null, null, null, null]);
    const [dragOver, setDragOver] = useState({ main: false, additional: Array(5).fill(false) });

    const [nome,  setNome] = useState('')
    const [preco,  setPreco] = useState(0)
    const [descricao,  setDescricao] = useState('')
    const [id_quarto, setId_quarto] = useState(0)

    // Estados para cada opção (0 = não selecionado, 1 = selecionado)
    const [tv, setTv] = useState(0)
    const [wifi, setWifi] = useState(0)
    const [ducha, setDucha] = useState(0)
    const [cozinha, setCozinha] = useState(0)
    const [toalhas, setToalhas] = useState(0)
    const [frigobar, setFrigobar] = useState(0)
    const [banheira, setBanheira] = useState(0)
    const [arCondicionado, setArCondicionado] = useState(0)

    // Tamanho máximo permitido: 16MB em bytes
    const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB

    const options = [
      { id: 1, label: ' TV', state: tv, setState: setTv},
      { id: 2, label: ' Wifi', state: wifi, setState: setWifi },
      { id: 3, label: ' Ducha', state: ducha, setState: setDucha},
      { id: 4, label: ' Cozinha', state: cozinha, setState: setCozinha},
      { id: 5, label: ' Toalhas', state: toalhas, setState: setToalhas},
      { id: 6, label: ' Frigobar', state: frigobar, setState: setFrigobar},
      { id: 7, label: ' Banheira', state: banheira, setState: setBanheira},
      { id: 8, label: ' Ar condicionado', state: arCondicionado, setState: setArCondicionado},
    ];

    // Função para validar o tamanho do arquivo
    const validateFileSize = (file) => {
        if (file.size > MAX_FILE_SIZE) {
            alert(`O arquivo "${file.name}" excede o tamanho máximo permitido de 16MB. Tamanho atual: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
            return false;
        }
        return true;
    };

    const checkImageSize = (dataUrl) => {
        if (!dataUrl) return false;
        
        // Remover o prefixo data:image/...;base64,
        const base64String = dataUrl.split(',')[1];
        
        // Calcular o tamanho aproximado do arquivo original
        // Base64 adiciona ~33% de overhead, então dividimos por 1.33
        const sizeInBytes = (base64String.length * 0.75);
        
        return sizeInBytes > MAX_FILE_SIZE;
    };

    async function criarAcomodacao() {
        // Verificar se alguma imagem excede o tamanho limite
        if (checkImageSize(mainImage)) {
            window.alert('arquivo grande demais');
            return;
        }
        
        for (let i = 0; i < additionalImages.length; i++) {
            if (checkImageSize(additionalImages[i])) {
                window.alert('arquivo grande demais');
                return;
            }
        }
        
        if (nome == '' || preco == '' || preco <= 0 || descricao == '' ){
            window.alert('preencha todos os campos')
            return;
        }  
        
        if (mainImage == null){
            window.alert('insira pelo menos a imagem principal')
            return;
        }

        try {
            // Criar o quarto primeiro
            const quartoData = await createQuartos(
                nome,
                preco,
                descricao,
                tv,
                wifi,
                ducha,
                cozinha,
                toalhas,
                frigobar,
                banheira,
                arCondicionado
            );

            console.log('Quarto criado:', quartoData.id_quarto);
            const novoIdQuarto = quartoData.id_quarto;
            setId_quarto(novoIdQuarto); // Atualizar o estado também

            // Enviar a imagem principal usando o ID correto
            await createFotos(novoIdQuarto, mainImage)
                .then(data => console.log('Imagem principal enviada:', data))
                .catch(error => console.error('Erro ao enviar imagem principal:', error));

            // Enviar as imagens adicionais
            for (let i = 0; i < additionalImages.length; i++) {
                if (additionalImages[i] !== null) {
                    await createFotos(novoIdQuarto, additionalImages[i])
                        .catch(error => console.log('Erro ao enviar imagem adicional:', error));
                }
            }

            console.log('Acomodação criada com sucesso!');
            // Opcional: redirecionar ou limpar o formulário
            // navigate("/acomodacoesAdm");

        } catch (error) {
            console.error('Erro ao criar quarto:', error);
        }
    }

    const handleCheckboxChange = (option) => {
        const newValue = option.state === 0 ? 1 : 0;
        option.setState(newValue);
    };

    // Função para converter arquivo em URL
    const fileToUrl = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    };

    // Handlers para drag & drop da imagem principal
    const handleMainImageDragOver = (e) => {
        e.preventDefault();
        setDragOver(prev => ({ ...prev, main: true }));
    };

    const handleMainImageDragLeave = (e) => {
        e.preventDefault();
        setDragOver(prev => ({ ...prev, main: false }));
    };

    const handleMainImageDrop = async (e) => {
        e.preventDefault();
        setDragOver(prev => ({ ...prev, main: false }));
        
        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));
        
        if (imageFile) {
            // Validar tamanho do arquivo
            if (!validateFileSize(imageFile)) {
                return;
            }
            
            const imageUrl = await fileToUrl(imageFile);
            setMainImage(imageUrl);
        }
    };

    const handleMainImageClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                // Validar tamanho do arquivo
                if (!validateFileSize(file)) {
                    return;
                }
                
                const imageUrl = await fileToUrl(file);
                setMainImage(imageUrl);
            }
        };
        input.click();
    };

    // Handlers para drag & drop das imagens adicionais
    const handleAdditionalImageDragOver = (e, index) => {
        e.preventDefault();
        setDragOver(prev => ({
            ...prev,
            additional: prev.additional.map((item, i) => i === index ? true : item)
        }));
    };

    const handleAdditionalImageDragLeave = (e, index) => {
        e.preventDefault();
        setDragOver(prev => ({
            ...prev,
            additional: prev.additional.map((item, i) => i === index ? false : item)
        }));
    };

    const handleAdditionalImageDrop = async (e, index) => {
        e.preventDefault();
        setDragOver(prev => ({
            ...prev,
            additional: prev.additional.map((item, i) => i === index ? false : item)
        }));
        
        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));
        
        if (imageFile) {
            // Validar tamanho do arquivo
            if (!validateFileSize(imageFile)) {
                return;
            }
            
            const imageUrl = await fileToUrl(imageFile);
            setAdditionalImages(prev => 
                prev.map((item, i) => i === index ? imageUrl : item)
            );
        }
    };

    const handleAdditionalImageClick = (index) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                // Validar tamanho do arquivo
                if (!validateFileSize(file)) {
                    return;
                }
                
                const imageUrl = await fileToUrl(file);
                setAdditionalImages(prev => 
                    prev.map((item, i) => i === index ? imageUrl : item)
                );
            }
        };
        input.click();
    };

    const removeMainImage = () => {
        setMainImage(null);
    };

    const removeAdditionalImage = (index) => {
        setAdditionalImages(prev => 
            prev.map((item, i) => i === index ? null : item)
        );
    };

    return (
    <div className="criarAcomodacao-page">
        <NavbarAdm />
        <div className="fundo-criarAcomodacao">
            <div className="fundoLeft-criarAcomodacao">
                <div className="back-criarAcomodacao">
                    <button onClick={() => navigate("/acomodacoesAdm")} className="back-buttonAcomodacao"> ← </button>
                    <h1 className="back-lineAcomodacao">|</h1>
                    <button onClick={() => navigate("/acomodacoesAdm")} className="back-textAcomodacao"> ACOMODAÇÕES </button>
                </div>
                <div className="pageLeft-criarAcomodacao">
                    <div className="grid-criarAcomodacao">
                        <form className="itensCenter-criarAcomodacao">
                            <h1 className="tituloInfo-criarAcomodacao">Insira as informações do quarto:</h1>
                            <div className="name-criarAcomodacao">
                                <input type="name" className="itensName-criarAcomodacao" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            </div>
                            <div className="valor-criarAcomodacao">
                                <input type="Number" className="itensValor-criarAcomodacao" placeholder="Valor" value={preco} onChange={(e) => setPreco(e.target.value)}/>
                            </div>
                            <div className="descricao-criarAcomodacao">
                                <input type="text" className="itensDescricao-criarAcomodacao" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                            </div>
                            <h1 className="tituloQuarto-criarAcomodacao">Selecione os itens do quarto:</h1>
                            <div className="checkbox-criarAcomodacao">
                                {options.map((option) => (
                                    <div className='formItens-criarAcomodacao' key={option.id}>
                                        <label className="nameItem-criarAcomodacao">
                                            <input
                                            type="checkbox"
                                            value={option.id}
                                            checked={option.state === 1}
                                            onChange={() => handleCheckboxChange(option)}
                                            />
                                            {option.label}
                                        </label> 
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                    <button onClick={criarAcomodacao} className="cadastrarAcomodacao-button">Cadastrar</button>
                </div>
            </div>

            <div className="pageRight-criarAcomodacao">
                <div className="background-criarAcomodacao">
                    <div className="fundoInfo-criarAcomodacao">
                        <h1 className="info-criarAcomodacao">ADICIONAR IMAGENS</h1>
                        <p style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>
                            Tamanho máximo por imagem: 16MB
                        </p>
                        <div 
                            className={`image-upload-area ${dragOver.main ? 'drag-over' : ''} ${mainImage ? 'has-image' : ''}`}
                            onDragOver={handleMainImageDragOver}
                            onDragLeave={handleMainImageDragLeave}
                            onDrop={handleMainImageDrop}
                            onClick={handleMainImageClick}
                            style={{
                                border: dragOver.main ? '2px dashed #007bff' : '2px dashed #ccc',
                                backgroundColor: dragOver.main ? '#f8f9fa' : mainImage ? 'transparent' : '#fafafa',
                                borderRadius: '8px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                minHeight: '150px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                backgroundImage: mainImage ? `url(${mainImage})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                marginBottom: '20px'
                            }}
                        >
                            {!mainImage ? (
                                <div>
                                    <p>Arraste uma imagem aqui ou clique para selecionar</p>
                                    <p style={{fontSize: '12px', color: '#666'}}>Imagem principal da acomodação</p>
                                </div>
                            ) : (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeMainImage();
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'rgba(255, 0, 0, 0.7)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="final-criarAcomodacao">
                        {additionalImages.map((image, index) => (
                            <div 
                                key={index}
                                className={`quadrado-criarAcomodacao ${dragOver.additional[index] ? 'drag-over' : ''}`}
                                onDragOver={(e) => handleAdditionalImageDragOver(e, index)}
                                onDragLeave={(e) => handleAdditionalImageDragLeave(e, index)}
                                onDrop={(e) => handleAdditionalImageDrop(e, index)}
                                onClick={() => handleAdditionalImageClick(index)}
                                style={{
                                    border: dragOver.additional[index] ? '2px dashed #007bff' : '2px dashed #ccc',
                                    backgroundColor: dragOver.additional[index] ? '#f8f9fa' : image ? 'transparent' : '#fafafa',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    minHeight: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    backgroundImage: image ? `url(${image})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {!image ? (
                                    <div style={{textAlign: 'center', fontSize: '12px', color: '#666'}}>
                                        <p>+</p>
                                        <p>Adicionar</p>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeAdditionalImage(index);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            background: 'rgba(255, 0, 0, 0.7)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default CriarAcomodacao;