
//MODAL FOR LOGIN; modal closing is globally required
$(".modal-button").click(function() {
  var target = $(this).data("target");
  $("html").addClass("is-clipped");
  $(target).addClass("is-active");
});

$(".modal-close").click(function() {
  $("html").removeClass("is-clipped");
  $(this).parent().removeClass("is-active");
});

$(".modal-background").click(function() {
  $("html").removeClass("is-clipped");
  $(this).parent().removeClass("is-active");
});

/*
 .d88b.  db   dD d888888b  .d8b.        .d8b.  db    db d888888b db   db 
.8P  Y8. 88 ,8P' `~~88~~' d8' `8b      d8' `8b 88    88 `~~88~~' 88   88 
88    88 88,8P      88    88ooo88      88ooo88 88    88    88    88ooo88 
88    88 88`8b      88    88~~~88      88~~~88 88    88    88    88~~~88 
`8b  d8' 88 `88.    88    88   88      88   88 88b  d88    88    88   88 
 `Y88P'  YP   YD    YP    YP   YP      YP   YP ~Y8888P'    YP    YP   YP
 */

//use the Okta widget to power authentication
var oktaSignIn = new OktaSignIn({
    baseUrl: "https://dev-809000.okta.com",
    clientId: "0oa5cc8ibdeo6rX7y4x6",
    authParams: {
        issuer: "https://dev-809000.okta.com/oauth2/default",
        responseType: ['token', 'id_token'],
        display: 'page'
    },
    features: {
        registration: true
    }
});

if (oktaSignIn.token.hasTokensInUrl()) {
    console.log("OKTA_TRUE");
    oktaSignIn.token.parseTokensFromUrl(
        // If we get here, the user just logged in.
        function success(res) {
            var accessToken = res[0];
            var idToken = res[1];
            oktaSignIn.tokenManager.add('accessToken', accessToken);
            oktaSignIn.tokenManager.add('idToken', idToken);
            window.location.hash='';
            $("#okta-button").hide();
            document.getElementById("messagebox").innerHTML = "Hello, " + idToken.claims.email + " ";
        },
        function error(err) {
            console.error(err);
        }
    );
} else {
    oktaSignIn.session.get(function (res) {
        // If we get here, the user is already signed in.
        if (res.status === 'ACTIVE') {
            $("#okta-button").hide();
            let userE = res.login;
            let n = userE.indexOf("@");
            userE = userE.substring(0, n);
            document.getElementById("messagebox").innerHTML = "Hello, " + userE + "";
            $("#messagebox").attr("data-email", res.login);
            $("#messagebox").attr("data-login", userE);
            let newpostUsername = document.getElementById("newpost_username");
            if (newpostUsername){
                document.getElementById("newpost_username").innerHTML = "" + userE + "";
            }
        console.log("res.login ::", res.login);
            return;
        }
        oktaSignIn.renderEl(
            { el: '#okta-login-container' },
            function success(res) {},
            function error(err) {
                console.error(err);
            }
        );
    });
}

function callMessagesApi() {
  var accessToken = oktaSignIn.tokenManager.get("accessToken");

  if (!accessToken) {
    return;
  }

  // Make the request using jQuery
  $.ajax({
    url: "https://dev-809000.okta.com/oauth2/default",
    headers: {
      Authorization : "Bearer " + accessToken.accessToken //,
      //Access-Control-Allow-Origin : *
    },
    success: function(response) {
      console.log('Messages', response);
    },
    error: function(response) {
      console.error(response);
    }
  });
}

function logout() {
  oktaSignIn.signOut();
  location.reload();
}

// {{!-- NAVBAR BURGER JS --}}
$(document).ready(function() {
// Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });
});

// {{!-- CLICK IMAGE TO GO TO PAGE --}}
$(".mosaic-image").on("click", function toPage(){
    let id = $(this).attr("data-id");
    //console.log(id);
    window.location.href = "/post/" + id;
});

// {{!-- IMAGE SIZE RANDOMIZER --}}
$(".mosaic-image").each(function randomClass(){
    let random = Math.floor(Math.random() * 6);
    //console.log(random);
    if (random <= 1){
        $(this).addClass("mosaic-small");
    }
    else if (random <= 4){
        $(this).addClass("mosaic-med");
    }
    else {
        $(this).addClass("mosaic-lrg");
    }
});

// {{!-- POST RANDOMIZER --}}
function randomPage() {
    console.log("RANDOM PAGE");
    window.location.href = "/random";
}; 
