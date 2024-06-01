// Obtenemos la referencia a los elementos del DOM
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const gpsCoordinates = document.getElementById('gps-coordinates');

// Accedemos a la cámara del dispositivo
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error('Error accessing the camera:', err);
    });

// Función para capturar la foto
captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertimos la imagen a Base64 para mostrarla en la página (puedes enviarla a un servidor en este punto)
    const imgData = canvas.toDataURL('image/jpeg');
    const imgElement = new Image();
    imgElement.src = imgData;
    document.body.appendChild(imgElement);

    // Obtenemos las coordenadas GPS
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        gpsCoordinates.innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
    }, (err) => {
        console.error('Error getting GPS coordinates:', err);
        gpsCoordinates.innerText = 'GPS coordinates unavailable';
    });
});

