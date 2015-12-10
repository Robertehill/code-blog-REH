var util = {};
util.toggleAboutMe = function() {
  $('header').on('click', '#showAboutMe', function(event){
    event.preventDefault();
    $('#filteringForm').fadeOut();
    $('.blogPosts').fadeOut();
    $('#aboutMeArticle').fadeIn();
  });
  $('header').on('click', '#showArts', function(event){
    event.preventDefault();
    $('#aboutMeArticle').fadeOut();
    $('#filteringForm').fadeIn();
    $('.blogPosts').fadeIn();
  });
};
