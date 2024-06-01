// Verificar si el navegador soporta la API de Geolocalización y MediaDevices
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("La Geolocalización no es soportada por este navegador.");
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                var video = document.getElementById('video');
                video.srcObject = stream;
                video.play();
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });
    } else {
        alert("La captura de video no es soportada por este navegador.");
    }
}

// Tomar una fotografía
function takeSnapshot() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, 400, 300);
    var photoURL = canvas.toDataURL('image/jpeg');

    // Mostrar la imagen capturada
    var img = new Image();
    img.src = photoURL;
    document.body.appendChild(img);
}
