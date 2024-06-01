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
    document.getElementById("longitude").innerHTML = position.coords.longitude;
    document.getElementById("latitude").innerHTML = position.coords.latitude;
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
