/*
_____ _____ _____ _____    _____ _____ _____ _____ _____ _____ _____
|  _  |  .  |   __|_   _|  | __  |   __|     |  |  |   __|   __|_   _|
|   __|  |  |__   | | |    |    -|   __|  |  |  |  |   __|__   | | |
|__|  |_____|_____| |_|    |__|__|_____|__  _|_____|_____|_____| |_|
                                          |__|
*/

//"POST_REQUEST_FOR POST //Script for sending POST request
//If selecting image from pexels
var pexImage;
function selectImg(pexelsUrl, selected){
    event.preventDefault();
    pexImage = pexelsUrl;
    setTimeout(function()
    {
        $(".checkcircle-image").css("opacity", "0");
    }, 3000);
    setTimeout(function()
    {
        $(".checkcircle-image").remove();
    }, 3500);
    $("#" + selected).append("<i class='far fa-check-circle checkcircle-image'></i>");
};

//Actual post request
$("#add-post").on("click", function(event) {
    //console.log("Submit button pressed");
    var type;
    let title = $("#post-title").val();
    let user = $("#newpost_username").text();
    let body = $("#post-body").val();
    //If post image is selected, post image; same for pexel image
    let linkImage = $("#post-image").val();
    var image;
    if ($(".image-url").hasClass("is-active")){
        image = linkImage;
    }
    if ($(".pexels-search").hasClass("is-active")){
        image = pexImage;
    }
    let genreInput = $(".genre-input");
    let genreSelect = $(".genre-select");

    //If user enters their own genre, use it
    if (genreInput.val() !== ""){
        type = genreInput.val();
    } else {
        type = genreSelect.val();
    }

    //If any of these are blank, modal
    if ((type === "") || (image === "") || (title === "") ){
        console.warn("Not enough info; image, title, and genre required");
        $("#required-modal").addClass("is-active");
    } else {
        //otherwise add to db
        data = { //This sends the data from the fields to the server
        post_title: title,
        post_type: type,
        post_user: user,
        post_body: body,
        post_image: image
        }
        //console.log(data);
        // Send the POST request.
        $.ajax("/newpost/add", {
        type: "POST",
        data: data
        }).then(
        function(req) {
            
        });
        // LOAD A PAGE THAT DISPLAYS THE POST
        setTimeout(function() { //In 3 sec, go to post
        //console.log("Countdown fired");
        window.location.href = '/newpost/post';
        }, 1000);
    }
});

//=============IMAGE_TABS
const tabs = [...document.querySelectorAll('.tabs li')];
const activeClass = 'is-active';
const imgUrl = $(".image-url");
const pexelsSearch = $(".pexels-search");

//Initialize tabs
function initTabs() {
    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
        let selected = tab.getAttribute('data-tab');
        //console.log(selected);
        updateActiveTab(tab);
        if (selected === 'image-url'){
            imageUrlActive();
        }
        if (selected === 'pexels-search'){
            pexelsSearchActive();
        }
        })
    })
}

//Change active tab
function updateActiveTab(selected) {
tabs.forEach((tab) => {
    if (tab && tab.classList.contains(activeClass)) {
    tab.classList.remove(activeClass);
    }
});
selected.classList.add(activeClass);
}

//Change active content
function imageUrlActive(){        
if (!imgUrl.hasClass(activeClass)){
    $(".image-url").addClass(activeClass);
    $(".pexels-search").removeClass(activeClass);
}
}
function pexelsSearchActive(){        
if (!pexelsSearch.hasClass(activeClass)){
    $(".pexels-search").addClass(activeClass);
    $(".image-url").removeClass(activeClass);
}
}

initTabs();

/*
_________________________  ______________.____       _________
\______   \_   _____/\   \/  /\_   _____/|    |     /   _____/
 |     ___/|    __)_  \     /  |    __)_ |    |     \_____  \ 
 |    |    |        \ /     \  |        \|    |___  /        \
 |____|   /_______  //___/\  \/_______  /|_______ \/_______  /
                  \/       \_/        \/         \/        \/
                */

//"PEXELS_SEARCH
function makePexelsRequest (queryParamater, page){
    // This is our API key
    const APIKey = "563492ad6f917000010000016cb107822cca4692b05cb34dd239360d";

    // Here we are building the URL we need to query the database
    const queryURL = `https://api.pexels.com/v1/search?query=${queryParamater}&per_page=15&page=` + page;
    //console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        'Authorization': APIKey
      } 
    })
    .then(function(response) {
      // Log the resulting object
      // console.log(response);
      //console.log("PEXELS RESPONSE:: ", response);
      if (response.total_results === 0){
        //Modal for no pexels responses
        noResultsPhoto();
      } else {
        const photos = response.photos;
        // call a function to handle the response 
        handleResponse(photos);
      }
    });
}

function noResultsPhoto(){
    const APIKey = "563492ad6f917000010000016cb107822cca4692b05cb34dd239360d";
    let page = Math.floor(Math.random() * 1000 + 1);
    // Here we are building the URL we need to query the database
    const queryURL = `https://api.pexels.com/v1/curated?per_page=1&page=` + page;
    //console.log("queryURL::", queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        'Authorization': APIKey
      } 
    })
    .then(function(response) {
      // Log the resulting object
      //console.log(response);
      const photo = response.photos[0];    
      let imageContainer = $("#random-img");
      let image = `<img class='random-image-inner' src="${photo.src.large}`
      imageContainer.empty().append(image);
      $("#noresults-modal").addClass("is-active");   
    });
}

  // make a function called handleResponse that displays to a modal
function handleResponse (photos){
    // console.log(photos);
    for(var i = 0; i<photos.length; i++){
      let photo =  photos[i];
      let imageContainer = $(".image-dropping");
      let image = `<div class='pexels-image' id='${photo.id}' onclick="selectImg('${photo.src.large}', '${photo.id}')"><img class='pexels-image-inner' src="${photo.src.medium}" ></div>`
      imageContainer.prepend(image);
      $("#pexels-modal").addClass("is-active");
    }
}

  //pagination
  var tempParam = "";
  var page;
  $(".search-btn").on("click", function(e){
    e.preventDefault();
    let queryParamater = $("#pexel-image-search").val();
    if (tempParam != queryParamater){
      page = 1;
      tempParam = queryParamater;
      //console.log("queryParamater:");
      //console.log(queryParamater);
      //console.log("tempParam:");
      //console.log(tempParam);
      if(queryParamater !== "" && queryParamater !== undefined){
        makePexelsRequest (queryParamater, page)
      } else{
        console.warn("You need to type something");
      }
    } else {
      if(queryParamater !== "" && queryParamater !== undefined){
        page++;
        makePexelsRequest (queryParamater, page)
      } else{
        console.warn("You need to type something");
      }
    }
});
