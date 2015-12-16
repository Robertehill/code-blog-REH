articleController ={};
// shows aboutME when clicking the link or typing in the URL

articleController.loadALLArts = function(){
  $('#aboutMeArticle').hide();
  $('#filteringForm').fadeIn();
  //I want it to only load if they are not there already
  if( $('article').length > 0 ){
    console.log('article ele found');
    $('.blogPosts').fadeIn();
  }
  else{
    blog.compileTemplate(); // this starts the chain of functions that ends with rendering the page
  }
};
