var util = {};
util.toggleAboutMe = function() {
  $('header').on('click', '#showAboutMe', function(event){
    event.preventDefault();
    // console.log('show about me function');
    $('#filteringForm').fadeOut();
    $('.blogPosts').fadeOut();
    $('#aboutMeArticle').fadeIn();
  });
  $('header').on('click', '#showArts', function(event){
    event.preventDefault();
    console.log('show about me function');
    $('#aboutMeArticle').fadeOut();
    $('#filteringForm').fadeIn();
    $('.blogPosts').fadeIn();
  });
};
util.toggleAboutMe();
