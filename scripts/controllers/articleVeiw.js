var articleView = {};

// articleTemplate -> renderGroup -> render (one)
articleView.loadTemplate = function(articles) {
  console.log('getting template and compileing ');
  $.get('/templates/article-template.html', function(data, msg, xhr) {
    articleView.template = Handlebars.compile(data);
    
    // articleView.renderGroup(articles);
  });
};

articleView.renderGroup = function(articleList) {
  console.log('render group');
  // blog.fetchArticles();
  $('#rendered-articles')
    .fadeIn()
    .append(
      articleList.map( function(a) {
        return articleView.render(a);
      })
    )
    .siblings().hide();
};

articleView.index = function() {
  console.log('loading all arts');
  articleView.loadTemplate(Article.articles);
};

articleView.render = function(article) {
  return articleView.loadTemplate(article);
};

articleView.show = function(articles) {
  articleView.loadTemplate(articles);
};
