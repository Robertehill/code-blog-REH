articleController ={};
articleController.showAboutMe = function(){
  console.log('AC about me toggle');
  $('#filteringForm').hide();
  $('.blogPosts').hide();
  $('#aboutMeArticle').fadeIn();
};
articleController.loadALLArts = function(){
  $('#aboutMeArticle').hide();
  $('#filteringForm').fadeIn();
  //not sure this is needed or if it even works
  if(!$('.blogPost')){
    blog.compileTemplate(); // this starts the chain of functions that ends with rendering the page
  }
  else{
    $('.blogPosts').show();
  }
  //not sure If I need to reload or just hide/show
};
