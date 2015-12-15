articleController ={};
// shows aboutME when clicking the link or typing in the URL
// but not hiding the body when the URL is entered and shows .blogBody on refresh
articleController.showAboutMe = function(){
  console.log('AC about me toggle');
  $('#filteringForm').hide();
  $('.blogPosts').hide();
  $('#aboutMeArticle').fadeIn();
  // $('.blogPosts').hide();
};
articleController.loadALLArts = function(){
  $('#aboutMeArticle').hide();
  $('#filteringForm').fadeIn();
  //this is not working as expected. I want it to only load if they are not there already
  // if( $('.blogPost').length > 1){
  //   $('.blogPosts').show();
  // }
  // else{
  blog.compileTemplate(); // this starts the chain of functions that ends with rendering the page
  // }
  //not sure If I need to reload or just hide/show
};
