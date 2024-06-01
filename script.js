var longitude = "";
var latitude = "";
var photoElement = document.getElementById("photo");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Verificar si el navegador soporta la API de Geolocalización
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("La Geolocalización no es soportada por este navegador.");
    }
}

// Mostrar las coordenadas en la página web
function showPosition(position) {
    longitude = position.coords.longitude.toFixed(6);
    latitude = position.coords.latitude.toFixed(6);
    document.getElementById("longitude").innerHTML = longitude;
    document.getElementById("latitude").innerHTML = latitude;
}

// Manejar errores de geolocalización
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario denegó la solicitud de geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud de ubicación ha expirado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Se ha producido un error desconocido.");
            break;
    }
}

// Previsualizar la fotografía antes de subirla
function previewPhoto(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        photoElement.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

// Capturar una fotografía desde la cámara del dispositivo
function capturePhoto() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("La captura de imágenes no es soportada por este navegador.");
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        var context = canvas.getContext('2d');

        video.addEventListener('loadedmetadata', function() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Mostrar coordenadas en la imagen
            context.font = "16px Arial";
            context.fillStyle = "white";
            context.fillText(`Longitud: ${longitude} / Latitud: ${latitude}`, 10, canvas.height - 10);

            // Detener la reproducción del video
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
        });
    })
    .catch(function(error) {
        console.error("Error al capturar la imagen:", error);
        alert("Se produjo un error al capturar la imagen.");
    });
}

// Guardar la imagen con las coordenadas
function saveImage() {
    var dataURL = canvas.toDataURL('image/jpeg');

    var link = document.createElement('a');
    link.href = dataURL;
    link.download = `photo_${longitude}_${latitude}.jpg`;
    link.click();
}
