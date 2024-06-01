// Objeto para almacenar la información de ubicación y fotografía
var locationData = {
    longitude: null,
    latitude: null,
    photoUrl: null
};

// Verificar si el navegador soporta la API de Geolocalización
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocationAndShowPhoto, showError);
    } else {
        alert("La Geolocalización no es soportada por este navegador.");
    }
}

// Guardar las coordenadas y mostrar la fotografía en la página
function saveLocationAndShowPhoto(position) {
    locationData.longitude = position.coords.longitude;
    locationData.latitude = position.coords.latitude;

    document.getElementById("longitude").innerHTML = locationData.longitude;
    document.getElementById("latitude").innerHTML = locationData.latitude;
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

// Previsualizar la fotografía antes de subirla y guardar la URL
function previewPhoto(event) {
    var photoElement = document.getElementById("photo");
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        photoElement.src = e.target.result;
        locationData.photoUrl = e.target.result;
    };

    reader.readAsDataURL(file);
}

// Mostrar la información de ubicación y fotografía en la página
function showLocationAndPhoto() {
    if (locationData.longitude && locationData.latitude && locationData.photoUrl) {
        alert("Longitud: " + locationData.longitude + "\nLatitud: " + locationData.latitude + "\nURL de la Fotografía: " + locationData.photoUrl);
    } else {
        alert("Aún no se ha capturado la ubicación y la fotografía.");
    }
}
