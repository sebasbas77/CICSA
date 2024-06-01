document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('captureBtn');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error('Error al acceder a la cámara: ', err);
        });

    captureBtn.addEventListener('click', function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imgData = canvas.toDataURL('image/png');

        // Aquí enviarías la imagen al backend para procesarla
        // En este ejemplo, simplemente mostramos la imagen en una nueva ventana
        const newWindow = window.open();
        newWindow.document.write('<img src="' + imgData + '" width="100%">');
    });
});
