var blog = {};
blog.filtAut = [];
blog.filtCat = [];
blog.articles = [];
blog.render = function(){
  util.toggleAboutMe();
  blog.articles.sort(function(a, b) {
    a = new Date(a.publishedOn);
    b = new Date(b.publishedOn);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  // will refactor later
  for (var i = 0; i < this.articles.length; i++){
    var art = new Article(this.articles[i]);
    art.toHTML();
  }
  blog.truncateArticles();
  blog.showFilteredArts();
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
blog.fetchJSON = function() {
  $.getJSON('data/hackerIpsum.json', blog.updateFromJSON);
};

//taken from demo
blog.updateFromJSON = function (data) {
  console.log('loading from json');
  data.forEach(function(item) {
    var article = new Article(item);
    blog.articles.push(article);

    // Cache the article in DB
    // TODO: Trigger SQL here...
  });
  blog.render();
};

blog.getTemplate = function (data) {
  Article.prototype.compiled = Handlebars.compile(data);
};
blog.templateLoaded = function() {
  blog.fetchJSON();
};
blog.compileTemplate = function(){
  $.get('templates/article-template.handlebars', blog.getTemplate)
    .done(blog.templateLoaded);
};
blog.truncateArticles = function() {
  $('.blog-body p:not(:first-child)').hide();
  $('main').on('click', '.readOn', function(event){
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};
blog.loadIntoBlogObj = function(element) {
  blog.articles.push(new Article(element));
}
blog.insertArticleToDB = function(article) {
  webDB.execute(
    [{
      'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
      'data': [article.title, article.author, article.authorUrl, article.category, article.publishedOn, article.markdown]
    }]
  );
};
blog.makeFilterList = function(array, prop) {
  for (var i = 0; i < this.articles.length; i++){
    var x = this.articles[i][prop];
    if(array.indexOf(x) === -1){
      array.push(x);
    }
  }
  for (var i = 0; i < array.length; i++) {
    var $opt = $('<option></option>');
    $opt.attr('value', array[i]);
    $opt.attr('id', array[i]);
    $opt.text(array[i]);
    $('#'+prop +'List').append($opt);
  }
};
blog.showFilteredArts = function() {
  blog.makeFilterList(blog.filtAut, 'author');
  blog.makeFilterList(blog.filtCat, 'category');
  $('#categoryList').change(function() {
    $('main').find('article').show();
    console.log(this.value);
    $('#authorList').find(':first-child').attr('selected', true);
    if(this.value === 'reset'){
      $('main').find('article').show();
    }
    else{
      //need to refactor this using data element it's macthing partial names.
      $('main').find('.searchProps:not(:contains(' + this.value +'))').parent().hide();
    }
  });
  $('#authorList').change(function() {
    $('main').find('article').show();
    $('#categoryList').find(':first-child').attr('selected', true);
    if(this.value === 'reset'){
      $('main').find('article').show();
    }
    else{
      $('main').find('.searchProps:not(:contains(' + this.value +'))').parent().hide();
    }
  });
};
$(function() {
  blog.compileTemplate();
});
