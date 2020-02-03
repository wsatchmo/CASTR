$(document).ready(function() {
    // This is from activity 12 during the sequelize week.
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var postId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId);
    }

    // Getting jQuery references to the post name, email, form, and commentBody select
    var nameInput = $("#name");
    var emailInput = $("#email");
    var commentForm = $("#comment");
    var commentArea = $("#commentBody");
    // Adding an event listener for when the form is submitted
    $(commentForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a name or a email
      if (!emailInput.val().trim() || !nameInput.val().trim()) {
        return;
      }

      // ======> WRITE LOGIC THAT ALERTS USER THAT THEY CAN'T LEAVE A FIELD EMPTY

      // Constructing a newComment object to hand to the database
      var newComment = {
        name: nameInput.val().trim(),
        email: emailInput.val().trim(),
        commentBody: commentArea.val()
      };

      console.log(newComment);

      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newComment.id = postId;
        updatePost(newComment);
      }
      else {
        submitPost(newComment);
      }
    });

    // Submits a new post and brings user to blog page upon completion
    function submitPost(Post) {
      $.post("/api/comment/", Post, function() {
        window.location.href = "/comments";
      });
    }

    // Gets post data for a post if we're editing
    function getPostData(id) {
      $.get("/api/comment/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our forms with its data
          nameInput.val(data.name);
          emailInput.val(data.email);
          commentArea.val(data.commentBody);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }

    // Update a given post, bring user to the blog page when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
        .then(function() {
          window.location.href = "/comments";
        });
    }
  });
