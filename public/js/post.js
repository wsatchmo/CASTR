
/*
_____ _____ _____ _____    _____ _____ _____ _____ _____ _____ _____
|  _  |  .  |   __|_   _|  | __  |   __|     |  |  |   __|   __|_   _|
|   __|  |  |__   | | |    |    -|   __|  |  |  |  |   __|__   | | |
|__|  |_____|_____| |_|    |__|__|_____|__  _|_____|_____|_____| |_|
                                         |__|
   */

//POST_REQUEST_FOR COMMENTS //Script for sending POST request

$("#push-comment").on("click", function(event) {
    //console.log("Comment submit button pressed");
    let postId = parseInt($("#post-number").attr("data-id"));
    let name = $("#messagebox").attr("data-login");
    let email = $("#messagebox").attr("data-email");
    let comment = $("#add-comment").val().trim();
    //console.log(email);
   
    if (email === undefined){
        console.log("Must log in to add comments");
        $("html").addClass("is-clipped");
        $("#not-loggedin-modal").addClass("is-active");
    } else {
       //If comment field blank, modal
       if (comment === ""){
            console.log("Not enough info");
            $("html").addClass("is-clipped");
            $("#comment-modal").addClass("is-active");
       } else {
            //otherwise add to db
            data = { //This sends the data from the fields to the server
            postId: postId,
            name: name,
            email: email,
            comment: comment
            }
            //console.log(data);

            // Send the POST request.
            $.ajax("/post/comment", {
                type: "POST",
                data: data
            }).then(
            function(req) {     
            });
            setTimeout(function() { //In 3 sec, go to post
            //console.log("Countdown fired");
            window.location.href = '/post/' + postId;
            }, 1000);
        };
    };
});

//COMMENT_OWNER_DISPLAY
var count = 0;

$(document).ready(loadCommentOwner());

function loadCommentOwner() {
   let userE = $("#messagebox").attr("data-login");
   if (userE !== undefined){    
       $('.comment-name').each(function(i, obj) {
           let commentName = $(this).html();
           if (userE.trim() === commentName.trim()){
           //console.log("firing");
           $(this).removeClass("comment-name-left");
           $(this).addClass("comment-name-right");
           }
       });
       $('.comments-inner').each(function(i, obj) {
           let commentName = $(this).find("p").html();
           if (userE.trim() === commentName.trim()){
           //console.log("firing");
           $(this).removeClass("comment-left");
           $(this).addClass("comment-right");
           }
       });
   }
};
var commentRetry = setInterval(function() { //For 10 seconds, try again (just in case)
   count+=1;
   //console.log(count);
   if (count < 10){
       loadCommentOwner();
   } else {
       clearInterval(commentRetry);
   };
}, 1000);

//NEXT PAGE, PREVIOUS PAGE BUTTONS
function nextPage() {
    let dataIdN = $(".next_button").attr("data-id");
    let nextNum = parseInt(dataIdN) + 1;
    window.location.href = "/post/" + nextNum;
};

function previousPage() {
    let dataIdP = $(".previous_button").attr("data-id");
    let previousNum = parseInt(dataIdP) - 1;
    if (previousNum !== 0){
        window.location.href = "/post/" + previousNum;
    } //If previous is 0, don't go
};

//EMBEDDING IFRAMES
$(document).ready(function() {
    let postBod = $(".post-body");
    //console.log(postBod);
    let postBodVal = postBod[0].innerText;
    //console.log(postBodVal);
    let ifEmbed = $("#if-embed");
    if (postBodVal.includes("<iframe")) {
        console.info("Embed link recognized");
        ifEmbed.append(postBodVal);
        postBod.remove();
    }
});