$(document).ready(function() {
    var newPost = $("input.new-post"); //TAKE INFO FROM THE FORM new-post
    // Our new posts will go inside the todoContainer
    var postPageContainer = $(".post-container");
    //Event listener form adding new posts
    $(document).on("submit", "#todo-form", createPost(newPost));

    // This function constructs a post row
    function createPost(post) {
        var $newInputRow = $(
        [
            "<h3 class='list-group-item post-item'>",
            post.title,
            "</h3>",
            "<img src='${post.image}'>",
            "<p>",
            post.body,
            "</p>",
            "<span>",
            post.user,
            "</span>",
            "<span>",
            post.type,
            "</span>",
            "<input type='text' class='delete' style='display: none;'>",
            "<button class='delete btn'>Delete Post</button>",
            "<button class='like btn'>Like</button>",
            "</li>"
        ].join("")
        );

        $newInputRow.find("button.like").data("id", post.id);
        $newInputRow.find("button.delete").data("id", post.id);
        $newInputRow.find("input.delete").css("display", "none");
        $newInputRow.data("post", post);
        return $newInputRow;
    }

    // This function inserts a new post into our database and then updates the view
    function insertpost(event) {
        event.preventDefault();
        var post = {
        text: $newItemInput.val().trim(),
        complete: false
        };

        $.post("/api/posts", post, getPosts);
        $newItemInput.val("");
    }
});

//Make 2 handlebars files for this: 
    // - one with the forms to post in
    // - one with information posted (same information, but uneditable -- sort of just confirmation)