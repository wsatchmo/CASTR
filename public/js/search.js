var podSearch = $("#pod-output");

function podSearchRun(word){
  // This is our API key
  var keys = require("./keys.js");

  // Here we are building the URL we need to query the database
  var queryURL = 'https://api.mixcloud.com/search/?q=' + word + '&type=cloudcast';

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "cloudcast",
    headers: {
      'Authorization': keys
    } 
  })

  .then(function(response) {
  // Log the resulting object
    console.log(response);
    if (response.noun){
      var noun = response.noun;
      var nounSyn = noun.syn;
      thesaurusOutput.append("<p style='margin-top: 10px; margin-bottom: 0px; font-size: 16px; font-weight: bold; font-style: italic;'>Noun:</p>");
      addToPage(nounSyn);
      console.log("nounSyn:");
      console.log(nounSyn);
    }
    // call a function to put on page 
  });
}

// TODO :: Use if statements to select verb, noun, etc from response if they exist
function addToPage(words){
  for (var i = 0; i < words.length; i++){
    var word = words[i];
    var wordP = $("<p class='thesaurus-word' style='width: 300px; margin-left: 10px; display: inline;'>");
    wordP.append(word);
    thesaurusOutput.append(wordP);
    thesaurusOutput.append("<br>");
  }
}
  
$("#podSearch-btn").on("click", function(event){
  podSearch.empty();  
  event.preventDefault();
  var queryParamater = document.getElementById("pod-input").value;
  if(queryParamater !== "" && queryParamater !== undefined){
    podSearchRun(queryParamater)
  } else{
    alert ("you need to type something");
  }
});