var util = {};
//not needed anymore
// util.showAboutMe = function() {
  // console.log(' about me toggle');
  // // $('header').on('click', '#showAboutMe', function(event){
  //   // event.preventDefault();
  // $('#filteringForm').fadeOut();
  // $('.blogPosts').fadeOut();
  // $('#aboutMeArticle').fadeIn();
  // });
  // $('header').on('click', '#showArts', function(event){
  //   event.preventDefault();
  //   $('#aboutMeArticle').fadeOut();
  //   $('#filteringForm').fadeIn();
  //   $('.blogPosts').fadeIn();
  // });
// };
//not sure this belongs here
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
//this does belong here
util.getToday = function() {
  var dateObj = new Date();
  var month =  dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  return year + '-' + month + '-' + day;
};
