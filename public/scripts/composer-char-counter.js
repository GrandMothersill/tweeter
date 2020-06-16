$(document).ready(function() {
  console.log("DOM is ready to be manipulated by jQuery. $(document).ready(function() ** inline callback delcare, it's this.")


  $("#tweet-text").on('keyup', function() {
    let charsLeft = 140 - this.value.length;

    $(this)
      .closest(".tweet-composer")
      .find("#char-counter")
      .text(charsLeft)
    if (charsLeft < 0) {
      $('#char-counter').css('color', '#FF0000');
    } else if (charsLeft >= 0) {
      $('#char-counter').css('color', '#545149');
    }



  });

});

