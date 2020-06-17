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

// const loadTweets = function() {
//   //responsible for fetching tweets from the http://localhost:8080/tweets page.
// }


$(document).ready(function() {
  console.log("Client DOM ready to be manipulated")


  $('#the-form').submit(function(evt) {
    evt.preventDefault();
    console.log("Submit registered");
    console.log($(this).serialize());
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
    })
      .then(function() {
        console.log("Hurrah");
        $('#tweets-container').empty();
        renderTweets(data);
      });
  });


  $.fn.loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
      .then(function(data) {
        renderTweets(data);
      })
  };

  $.fn.loadTweets();
});



// const loadTweets = $(function() {
//   const $button = $('#load-more-posts');
//   $button.on('click', function() {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('more-posts.html', { method: 'GET' })
//       .then(function(morePostsHtml) {
//         console.log('Success: ', morePostsHtml);
//         $button.replaceWith(morePostsHtml);
//       });
//   });
// });



// });