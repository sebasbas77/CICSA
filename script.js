// Verificar si el navegador soporta la API de Geolocalización
function getLocationAndCapturePhoto() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            showPosition(position);
            capturePhoto();
        }, showError);
    } else {
        alert("La Geolocalización no es soportada por este navegador.");
    }
}

// Mostrar las coordenadas en la página web y etiquetar la imagen
function showPosition(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;

    document.getElementById("longitude").innerHTML = longitude;
    document.getElementById("latitude").innerHTML = latitude;

    // Etiquetar la imagen con las coordenadas
    var photoElement = document.getElementById("photo");
    photoElement.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = photoElement.width;
        canvas.height = photoElement.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(photoElement, 0, 0);
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`Latitud: ${latitude.toFixed(6)}, Longitud: ${longitude.toFixed(6)}`, canvas.width - 230, canvas.height - 10);
        photoElement.src = canvas.toDataURL();
    };
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
    var photoElement = document.getElementById("photo");
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        photoElement.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

// Capturar una fotografía desde la cámara del dispositivo
function capturePhoto() {
    var photoElement = document.getElementById("photo");

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

        stream.getTracks().forEach(function(track) {
            track.stop();
        });
    })
    .catch(function(error) {
        console.error("Error al capturar la imagen:", error);
        alert("Se produjo un error al capturar la imagen.");
    });
}
