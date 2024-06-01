// Capturar una fotografía desde la cámara del dispositivo
function capturePhoto() {
    var photoElement = document.getElementById("photo");
    var coordinatesElement = document.getElementById("coordinates");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("La captura de imágenes no es soportada por este navegador.");
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        photoElement.src = canvas.toDataURL('image/jpeg');

        // Obtener coordenadas
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude.toFixed(6);
            var longitude = position.coords.longitude.toFixed(6);
            coordinatesElement.textContent = `Lat: ${latitude}, Long: ${longitude}`;
        }, function(error) {
            console.error("Error al obtener las coordenadas:", error);
        });

        stream.getTracks().forEach(function(track) {
            track.stop();
        });
    })
    .catch(function(error) {
        console.error("Error al capturar la imagen:", error);
        alert("Se produjo un error al capturar la imagen.");
    });
}
