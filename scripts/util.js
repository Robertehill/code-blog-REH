var util = {};
//not sure this belongs here 
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
util.truncateArticles = function() {
  console.log('truncate');
  // $('.blog-body').hide();
  ///taken from demo and adapted to fit my code base.
  $('.blog-body').children(':nth-child(n+5)').hide();
  $('main').on('click', '.readOn', function(event){
    event.preventDefault();
    $(this).prev('.blog-body').children().fadeIn();
    // $(this).parent().find('.blog-body').fadeIn();
    $(this).hide();
  });
};
