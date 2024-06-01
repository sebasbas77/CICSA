document.addEventListener('DOMContentLoaded', () => {
    const getCoordinatesBtn = document.getElementById('getCoordinatesBtn');
    const takePhotoBtn = document.getElementById('takePhotoBtn');
    const latitudeSpan = document.getElementById('latitude');
    const longitudeSpan = document.getElementById('longitude');
    const capturedImage = document.getElementById('capturedImage');
    const cameraInput = document.getElementById('cameraInput');

    let latitude = null;
    let longitude = null;

    // Función para obtener las coordenadas GPS
    const getCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                latitudeSpan.textContent = latitude.toFixed(6);
                longitudeSpan.textContent = longitude.toFixed(6);
            }, error => {
                alert('Error getting GPS coordinates: ' + error.message);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    // Función para tomar una fotografía
    const takePhoto = () => {
        cameraInput.click();
    };

    // Mostrar la fotografía capturada
    cameraInput.addEventListener('change', () => {
        const file = cameraInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                capturedImage.style.display = 'block';
                capturedImage.src = reader.result;
                // Aquí podrías enviar la imagen con las coordenadas a algún servidor para etiquetarla, almacenarla, etc.
            };
        }
    });

    // Event listeners
    getCoordinatesBtn.addEventListener('click', getCoordinates);
    takePhotoBtn.addEventListener('click', takePhoto);
});
