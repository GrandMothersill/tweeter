const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creates tweet-container html using input data
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
    <span>${moment(data.created_at).fromNow()}</span>
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
  </footer>
</article>
    `;
};

// prepends all tweets of given array
const renderTweets = (tweetArr) => {
  for (let tweet of tweetArr) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

$(document).ready(function() {

  $.fn.loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
      .then(function(data) {
        $('#tweets-container').empty();
        renderTweets(data);
      });
  };


  // hide/show new-tweet section
  let shown = false;

  $("#nav-new-tweet").on('click', function() {
    if (!shown) {
      $("#nav-new-tweet").html("<strong>Hide</strong> tweet composer");
      $(".new-tweet").slideDown();
      $(".new-tweet").css("display", "block");
      $("#tweet-text").focus();
      shown = true;
    } else {
      $("#nav-new-tweet").html("<strong>Write</strong> a new tweet");
      $(".new-tweet").slideUp();
      shown = false;
    }
  });

  $("#sticky-button").on('click', function() {
    shown = true;
    $("#nav-new-tweet").html("<strong>Hide</strong> tweet composer");
    $(".new-tweet").slideDown();
    $(".new-tweet").css("display", "block");
    $("#tweet-text").focus();
    $(window).scrollTop(0);
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $("#sticky-button").css("display", "block");
    } else {
      $("#sticky-button").css("display", "none");
    }
  });

  // submitting a new tweet & error handling
  let error = false;
  $('#the-form').submit(function(evt) {
    evt.preventDefault();
    $(".isa_error").css("display", "none");
    let tweetText = $("#tweet-text").val();
    tweetText = tweetText.trim();

    if (tweetText.length === 0) {
      error = true;
      $(".isa_error").slideDown();
      $(".isa_error").text("Tweet must contain at least 1 character");
      $(".isa_error").css("display", "block");
    } else if (tweetText.length > 140) {
      error = true;
      $(".isa_error").slideDown();
      $(".isa_error").text("Tweet must contain less than 140 characters");
      $(".isa_error").css("display", "block");
    } else {
      if (error) {
        $(".isa_error").css("display", "block");
        $(".isa_error").slideUp();
        error = false;
      }

      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
      })
        .then(function() {
          $('#tweet-text').val('');
          $('#char-counter').text(140);
          $.fn.loadTweets();
        });
    }
  });

  //// tweet-input character counter
  $("#tweet-text").on('keyup', function() {
    let charsLeft = 140 - this.value.length;

    $('#char-counter').text(charsLeft);

    if (charsLeft < 0) {
      $('#char-counter').css('color', '#FF0000');
    } else if (charsLeft >= 0) {
      $('#char-counter').css('color', '#545149');
    }
  });

  //initial load from database
  $.fn.loadTweets();
}); 