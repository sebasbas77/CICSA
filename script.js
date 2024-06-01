function obtenerGeoreferencia() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion);
    } else {
        alert("La geolocalización no está soportada por este navegador.");
    }
}

function mostrarPosicion(posicion) {
    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    // Aquí puedes usar una API de geocodificación inversa para obtener el nombre del sector y la ciudad
    // Por ejemplo, usando la API de Google Maps Geocoding

    // Aquí se actualizan los elementos en la página con los datos obtenidos
    document.getElementById("latitud").textContent = latitud;
    document.getElementById("longitud").textContent = longitud;
    document.getElementById("sector").textContent = "Sector X"; // Puedes cambiar esto por el resultado real obtenido
    document.getElementById("ciudad").textContent = "Ciudad Y"; // Puedes cambiar esto por el resultado real obtenido
}

