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
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(data) {
  return `
  <article>
  <header>
    <img src="${escape(data.user.avatars)}">
    <span>${escape(data.user.name)}</span>
    <span class="article-tweet-userhandle">${escape(data.user.handle)}</span>
  </header>
  <p>${escape(data.content.text)}</p>
  <hr>
  <footer>
    <span>${escape(data.created_at)}</span>
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
  </footer>
</article>
    `
};

const renderTweets = (tweetArr) => {
  for (let tweet of tweetArr) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};


$(document).ready(function() {
  console.log("Client DOM ready to be manipulated")

  $.fn.loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
      .then(function(data) {
        renderTweets(data);
      })
  };

  $('#the-form').submit(function(evt) {
    evt.preventDefault();
    console.log("Submit registered");
    $(".isa_error").css("display", "none");
    let tweetText = $(this).serialize().slice(5)
    if (tweetText.length === 0) {
      $(".isa_error").slideDown();
      $(".isa_error").text("Tweet must contain at least 1 character");
      $(".isa_error").css("display", "block");
    } else if (tweetText.length > 140) {
      $(".isa_error").slideDown();
      $(".isa_error").text("Tweet must contain under 140 characters");
      $(".isa_error").css("display", "block");
    } else {
      // console.log(tweetText);
      // console.log("LENGTH " + tweetText.length);
      $(".isa_error").css("display", "none");
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
      })
        .then(function() {
          console.log("Hurrah");
          $('#tweets-container').empty();
          $('#tweet-text').val('');
          $.fn.loadTweets();
        })
    }
  });


  // $.fn.loadTweets();
});