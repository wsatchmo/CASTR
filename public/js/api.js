

function displayPics(){
    var picture = $(this).attr("data-pic");
    console.log(picture);
    var queryURL = "CLOUDINARY_URL=cloudinary://491934646965334:6WGsvdJIuzIGY6Iz5dT4RZ4oQQs@daa08ca0i"+
    picture + "491934646965334";

    console.log(queryURL)
        $.ajax({
            url: queryURL,
            method:  "GET"
        }).then(function(response){
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++){

                var pictureDiv = $("<div>");
                var pictureDiv = $("<div class='pic'>")

               var pictures = $("<img>");
               
               pictures.attr("scr", results[i].images.fixed_height.url);

               pictureDiv.append(pictures);
            }
        })
}