const cam = document.getElementById('cam');
const cadastroBtn = document.getElementById('cadastroBtn');
const gestaoBtn = document.getElementById('irGestao');
const canvas = document.getElementById('canvas');
const labels = [];

gestaoBtn.addEventListener('click', async () => {
    window.location.href = "http://localhost:3001/";
});

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

                            canvas.width = 640;
                            canvas.height = 360;
                            cam.videoWidth = 640;
                            cam.videoHeight = 360;

                            window.camStream = stream;

                            cam.srcObject = stream;
                            cam.style.position = 'absolute';
                            cam.style.top = '75%';
                            cam.style.left = '1%';
                            cam.style.marginTop = '20px';
                            cam.style.display = 'flex';
                            cam.style.justifyContent = 'center';
                            cam.style.alignItems = 'center';
                            cam.style.alignContent = 'center';

                            canvas.style.position = 'absolute';
                            canvas.style.top = '75%';
                            canvas.style.left = '1%';
                            canvas.style.zIndex = '1';
                            canvas.style.marginTop = '20px';
                            canvas.style.display = 'flex';
                            canvas.style.justifyContent = 'center';
                            canvas.style.alignItems = 'center';
                            canvas.style.alignContent = 'center';
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
            const img = await faceapi.fetchImage(`/reconhecimento/assets/lib/face-api/labels/${label}/${i}.jpg`)
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
    faceapi.nets.tinyFaceDetector.loadFromUri('/reconhecimento/assets/lib/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/reconhecimento/assets/lib/face-api/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/reconhecimento/assets/lib/face-api/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/reconhecimento/assets/lib/face-api/models'),
]).then(startVideo);

cam.addEventListener('play', async () => {
    const canvasSize = {
        width: cam.videoWidth,
        height: cam.videoHeight
    }
    const labels = await loadLabels()
    faceapi.matchDimensions(canvas, canvasSize);
    const videoLayer = document.createElement('div');
    videoLayer.style.position = 'relative';
    videoLayer.style.width = '100%';
    videoLayer.style.height = '100%';
    document.body.appendChild(videoLayer);
    videoLayer.appendChild(cam);
    videoLayer.appendChild(canvas);
    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(
                cam,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6)
        const results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        results.forEach((result, index) => {
            const box = resizedDetections[index].detection.box
            const { label } = result
            new faceapi.draw.DrawTextField([
                `${label}`
            ], box.topLeft).draw(canvas)
        })
    }, 100)
})

cadastroBtn.addEventListener('click', async () => {
    const nome = document.getElementById('nomeInput').value;
    const cpf = document.getElementById('cpfInput').value;
    const tipo = document.getElementById('tipoInput').value;

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


    const canvasElement = document.createElement('canvas');
    canvasElement.width = cam.videoWidth;
    canvasElement.height = cam.videoHeight;

    const context = canvasElement.getContext('2d');
    context.drawImage(cam, 0, 0, canvasElement.width, canvasElement.height);

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
