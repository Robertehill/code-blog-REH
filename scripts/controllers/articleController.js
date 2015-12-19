articleController ={};
// shows aboutME when clicking the link or typing in the URL

articleController.loadALLArts = function(){
  $.ajax({
    type: 'HEAD',
    url: 'data/hackerIpsum.json',
    success: blog.fetchArticles
  });
  // articleView.index();
  // $('#aboutMeArticle').hide();
  // $('#filteringForm').fadeIn();
  // //I want it to only load if they are not there already
  // if( $('article').length > 0 ){
  //   // console.log('article ele found');
  //   $('.blogPosts').fadeIn();
  // }
  // else{
  //   articleView.loadTemplate(blog.rawData);
  //   // blog.compileTemplate(); // this starts the chain of functions that ends with rendering the page
  // }
};

articleController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();

  };
  Article.findByCategory(ctx.params.category, categoryData );
};


articleController.author = function(ctx, next) {
  console.log(ctx);
};

articleController.show = function(ctx, next) {
  articleView.show(ctx.articles);
};
