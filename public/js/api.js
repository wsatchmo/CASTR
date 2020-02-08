
var CLOUNDIAINARY_URL = 'https://api.cloudinary.com/v1_1/daa08ca0i/image/upload';
var CLOUNDIAINARY_UPLOAD_PRESET = 'daa08ca0i';

var imgPreview = document.getElementById('img-prewiew');
var fileUpload = document.getElementById('file-upload');

fileUpload.addEventListener('change', function(event){
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUNDIAINARY_UPLOAD_PRESET);

    axios({
        url: CLOUNDIAINARY_URL,
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: formData
    }).then(function(res){
        console.log(res);
    }).catch(function(err){
        console.error(err);
    });

});

