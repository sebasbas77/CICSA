// Variables globales para almacenar las coordenadas
var currentLongitude = null;
var currentLatitude = null;

// Verificar si el navegador soporta la API de Geolocalización
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentLongitude = position.coords.longitude;
            currentLatitude = position.coords.latitude;
            showPosition(position);
            enablePhotoCapture();
        }, showError);
    } else {
        alert("La Geolocalización no es soportada por este navegador.");
    }
}

// Habilitar la captura de fotografía después de obtener las coordenadas
function enablePhotoCapture() {
    var photoInput = document.getElementById("photoInput");
    photoInput.disabled = false;
}

// Mostrar las coordenadas en la página web y etiquetar la imagen
function showPosition(position) {
    document.getElementById("longitude").innerHTML = position.coords.longitude;
    document.getElementById("latitude").innerHTML = position.coords.latitude;
    addCoordinatesToImage(position.coords.longitude, position.coords.latitude);
}

// Agregar las coordenadas a la imagen
function addCoordinatesToImage(longitude, latitude) {
    var photoElement = document.getElementById("photo");
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    // Establecer el tamaño del canvas igual al tamaño de la imagen
    canvas.width = photoElement.width;
    canvas.height = photoElement.height;

    // Dibujar la imagen en el canvas
    context.drawImage(photoElement, 0, 0);

    // Establecer el estilo de texto para las coordenadas
    context.font = "bold 14px Arial";
    context.fillStyle = "white";
    context.textAlign = "right";
    context.textBaseline = "bottom";

    // Etiquetar la imagen con las coordenadas en la esquina inferior derecha
    context.fillText(`Longitud: ${longitude.toFixed(6)}, Latitud: ${latitude.toFixed(6)}`, canvas.width - 10, canvas.height - 10);

    // Actualizar la imagen en el elemento <img>
    photoElement.src = canvas.toDataURL("image/jpeg");
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
        var image = new Image();
        image.onload = function() {
            addCoordinatesToImage(currentLongitude, currentLatitude);
        };
        image.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

