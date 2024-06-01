// Capturar una fotografía desde la cámara del dispositivo
function capturePhoto() {
    var photoElement = document.getElementById("photo");

    // Verificar si el navegador soporta getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("La captura de imágenes no es soportada por este navegador.");
        return;
    }

    // Solicitar acceso a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        // Crear un elemento de video y mostrar la cámara en él
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        // Crear un canvas para capturar la imagen
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Mostrar la imagen en el elemento img
        photoElement.src = canvas.toDataURL('image/jpeg');

        // Detener la cámara y liberar los recursos
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
    })
    .catch(function(error) {
        console.error("Error al capturar la imagen:", error);
        alert("Se produjo un error al acceder a la cámara.");
    });
}
