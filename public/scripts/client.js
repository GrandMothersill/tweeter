/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// const $tweetTest = $(`<article class="tweet">Hello world</article>`);

const createTweetElement = function(data) {
  return `
  <article>
  <header>
    <img src="${data.user.avatars}">
    <span>${data.user.name}</span>
    <span class="article-tweet-userhandle">${data.user.handle}</span>
  </header>
  <p>${data.content.text}</p>
  <hr>
  <footer>
    <span>${data.created_at}</span>
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
  </footer>
</article>
    `
};

const renderTweets = (tweetArr) => {
  for (let tweet of tweetArr) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

// Turbo log > shortcut when you highlihg what you want to console.
// const $tweet = createTweetElement(tweetData);
// $('#tweets-container').append($tweet);


$(document).ready(function() {
  console.log("Client DOM ready to be manipulated")
  // $('#tweets-container').append("<p>Text.</p>");
  const $tweet = createTweetElement(tweetData);

  $('#name-click').click(function() {
    //$('#tweets-container').append($tweet);
    // createTweetElement(tweetData);
    console.log("Click registered", $tweet);
    renderTweets(data);
  })
})



// Test / driver code (temporary). Eventually will get this from the server.
// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc





// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//   <script>
//     function appendText() {
//   var txt1 = "<p>Text.</p>";        // Create text with HTML
//   var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
//   var txt3 = document.createElement("p");
//   txt3.innerHTML = "Text.";         // Create text with DOM
//   $("body").append(txt1, txt2, txt3);   // Append new elements
// }
// </script>
//   <script>
//     $(document).ready(function(){
//       $("#btn1").click(function() {
//         $("img").before("<b>Before</b>");
//       });

//   $("#btn2").click(function(){
//       $("img").after("<i>After</i>");
//   });
// });
// </script>
//   <script>
//     function afterText() {
//   var txt1 = "<b>I </b>";           // Create element with HTML
//   var txt2 = $("<i></i>").text("love ");  // Create with jQuery
//   var txt3 = document.createElement("b");   // Create with DOM
//   txt3.innerHTML = "jQuery!";
//   $("img").after(txt1, txt2, txt3);    // Insert new elements after img
// }
// </script>