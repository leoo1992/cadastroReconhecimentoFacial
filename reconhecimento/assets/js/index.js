const cam = document.getElementById('cam'),
    cadastroBtn = document.getElementById('cadastroBtn'),
    gestaoBtn = document.getElementById('irGestao'),
    canvas = document.getElementById('canvas'),
    recognizedPeople = new Set(),
    labels = [];

let lastRecognitionTime = 0;

document.getElementById('cpfInput').addEventListener('input', function (event) {
    const cpf1 = event.target.value;
    event.target.value = formatarCPF(cpf1);
});

function formatarCPF(cpf1) {
    cpf1 = cpf1.replace(/\D/g, ''); 
    cpf1 = cpf1.replace(/(\d{3})(\d)/, '$1.$2'); 
    cpf1 = cpf1.replace(/(\d{3})(\d)/, '$1.$2'); 
    cpf1 = cpf1.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf1;
}

console.error = () => { };
console.warn = () => { };
console.info = () => { };
console.log = () => { };
console.trace = () => { };
console.debug = () => { };

gestaoBtn.addEventListener('click', async () => {
    window.location.href = "http://localhost:3001/";
});

function ocultaCadastro() {
    const telaCadastro = document.getElementById('telaCadastro'),
        botaoMostrarOcultarCadastro = document.getElementById('botaoMostrarOcultarCadastro');

    if (telaCadastro.classList.contains('d-none')) {
        telaCadastro.classList.remove('d-none');
        telaCadastro.classList.add('d-flex');
        botaoMostrarOcultarCadastro.textContent = 'Ocultar Cadastro';
    } else {
        telaCadastro.classList.remove('d-flex');
        telaCadastro.classList.add('d-none');
        botaoMostrarOcultarCadastro.textContent = 'Mostrar Cadastro';
    }
}

window.onload = function () {
    const botaoMostrarOcultarCadastro = document.getElementById('botaoMostrarOcultarCadastro');
    botaoMostrarOcultarCadastro.addEventListener('click', ocultaCadastro);
}

async function registrarLogSeNecessario(nome) {
    try {
        const response = await fetch('http://localhost:3002/salvar-ou-atualizar-log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            if (nome && nome !== 'unknown') {
                mostrarToast(`${nome} Liberado`);
            }
        } else {
            console.error('Erro ao registrar o log:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function mostrarToast(texto) {
    const toast = document.getElementById("toast");
    toast.textContent = texto;

    toast.classList.remove("d-none");
    toast.classList.add("d-flex");

    setTimeout(() => {
        toast.classList.remove("d-flex");
        toast.classList.add("d-none");
    }, 4000);
}

async function carregarNomes() {
    try {
        const response = await fetch('http://localhost:3002/obter-nomes');

        if (response.ok) {
            const nomes = await response.json();
            labels.push(...nomes);
            console.log('Nomes carregados:', labels);
        } else {
            console.error('Erro ao carregar nomes:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

window.addEventListener('load', carregarNomes);

const startVideo = () => {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            if (Array.isArray(devices)) {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                if (videoDevices.length > 0) {
                    const selectedDevice = videoDevices[0];
                    navigator.getUserMedia(
                        {
                            video: {
                                deviceId: selectedDevice.deviceId
                            }
                        },
                        stream => {
                            if (window.camStream) {
                                window.camStream.getTracks().forEach(track => track.stop());
                            }
                            const canvas = document.getElementById('canvas');
                            window.camStream = stream;

                            cam.videoWidth = '40em';
                            cam.videoHeight = '22.5em';
                            cam.srcObject = stream;
                            cam.style.position = 'absolute';
                            cam.style.margin = '0px';
                            cam.style.padding = '0px';
                            cam.style.justifyContent = 'center';
                            cam.style.alignItems = 'center';
                            cam.style.alignContent = 'center';
                            cam.style.alignSelf = 'center';
                            cam.style.flexDirection = 'column';

                            canvas.width = '40em';
                            canvas.height = '22.5em';
                            canvas.style.position = 'absolute';
                            canvas.style.margin = '0px';
                            canvas.style.padding = '0px';
                            canvas.style.zIndex = '1';
                            canvas.style.justifyContent = 'center';
                            canvas.style.alignItems = 'center';
                            canvas.style.alignContent = 'center';
                            canvas.style.alignSelf = 'center';
                            canvas.style.flexDirection = 'column';
                        },
                        error => console.error(error)
                    );
                } else {
                    console.error("Nenhuma câmera disponível.");
                }
            }
        });
};

const loadLabels = () => {
    return Promise.all(labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 1; i++) {
            const img = await faceapi.fetchImage(`/reconhecimento/assets/lib/face-api/labels/${label}/${i}.jpeg`)
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()
            descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/reconhecimento/assets/lib/face-api/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/reconhecimento/assets/lib/face-api/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/reconhecimento/assets/lib/face-api/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/reconhecimento/assets/lib/face-api/models"),
    faceapi.nets.ageGenderNet.loadFromUri("/reconhecimento/assets/lib/face-api/models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/reconhecimento/assets/lib/face-api/models"),
]).then(startVideo);

function resetRecognizedPeople() {
    recognizedPeople.clear();
    lastRecognitionTime = 0;
}

cam.addEventListener('play', async () => {
    const canvasSize = {
        width: cam.videoWidth,
        height: cam.videoHeight
    },
        labels = await loadLabels(),
        videoLayer = document.createElement('div');
    faceapi.matchDimensions(canvas, canvasSize);
    videoLayer.style.position = 'relative';
    videoLayer.style.width = '100%';
    videoLayer.style.height = '100%';
    document.body.appendChild(videoLayer);
    videoLayer.appendChild(cam);
    videoLayer.appendChild(canvas);
    setInterval(async () => {
        const currentTime = Date.now();
        const elapsedTimeSinceLastRecognition = currentTime - lastRecognitionTime;

        if (elapsedTimeSinceLastRecognition >= 60000) {
            resetRecognizedPeople();
        }

        const detections = await faceapi
            .detectAllFaces(cam, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
        if (labels.length === 0 || !labels.length || !labels) {
            console.error('Pastas vazias ou não reconhecidas');
            return
        }
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6)
        const results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        results.forEach((result, index) => {
            const box = resizedDetections[index].detection.box
            const { label } = result

            if (!recognizedPeople.has(label)) {
                if (elapsedTimeSinceLastRecognition >= 6001) {
                    registrarLogSeNecessario(label);
                    recognizedPeople.add(label);
                    lastRecognitionTime = currentTime;
                }
            }

            new faceapi.draw.DrawTextField([`${label}`], box.topLeft).draw(canvas)
        })
    }, 100)
})

cadastroBtn.addEventListener('click', async () => {
    const nome = document.getElementById('nomeInput').value,
        cpf1 = document.getElementById('cpfInput').value,
        tipo = document.getElementById('tipoInput').value,
        canvasElement = document.createElement('canvas'),
        context = canvasElement.getContext('2d');

    const cpf = cpf1.replace(/[\.-]/g, '');

    function validarCPF(cpf) {
        if (cpf.length !== 11) {
            return false;
        }

        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }

    if (!nome) {
        alert('Digite um nome antes de cadastrar.');
        document.getElementById('nomeInput').value = '';
        return;
    }

    if (!validarCPF(cpf)) {
        alert('CPF inválido');
        document.getElementById('cpfInput').value = '';
        return;
    }

    if (!tipo) {
        alert('Insira um tipo antes de cadastrar.');
        document.getElementById('nomeTipo').value = '';
        return;
    }

    canvasElement.width = cam.videoWidth;
    canvasElement.height = cam.videoHeight;
    context.drawImage(cam, 0, 0, canvasElement.width, canvasElement.height);

    const responses = await fetch('http://localhost:3002/criar-pessoa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cpf, tipo }),
    });

    if (responses.ok) {
        console.log('Cadastro realizado com sucesso.');
    } else {
        console.log('Erro ou CPF existente.');
        alert('Erro ou CPF Existente')
        return
    }

    canvasElement.toBlob(async blob => {
        try {
            const response = await fetch('http://localhost:3002/salvar-imagem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/jpeg',
                    'Nome': nome
                },
                body: blob
            });

            if (response.ok) {
                alert('Foto salva com sucesso.');
                setTimeout(() => {
                    location.reload();
                }, 3002);
            } else {
                alert('Erro ao salvar a imagem.');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao se comunicar com o servidor.');
        }
    }, 'image/jpeg');
});
