$(document).ready(function() {
  // console.log("DOM is ready to be manipulated by jQuery. $(document).ready(function() ** inline callback delcare, it's this.")

  $("#tweet-text").on('keyup', function() {
    let charsLeft = 140 - this.value.length;

    $('#char-counter').text(charsLeft);

    if (charsLeft < 0) {
      $('#char-counter').css('color', '#FF0000');
    } else if (charsLeft >= 0) {
      $('#char-counter').css('color', '#545149');
    }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $("#sticky-button").css("display", "block")
    } else {
      $("#sticky-button").css("display", "none")
    }
  });

  $("#sticky-button").on('click', function() {
    $(".new-tweet").slideDown();
    $(".new-tweet").css("display", "block");
    $("#tweet-text").focus()
    $(window).scrollTop(0);
  })

});

