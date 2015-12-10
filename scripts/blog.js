var blog = {};
blog.filtAut = [];
blog.filtCat = [];
blog.articles = [];
blog.render = function(){

  // here for testing. remove when JSON stuff is work, which might be sometime around.. never....
  // blog.articles = blog.rawData;
  blog.articles.sort(function(a, b) {
    a = new Date(a.publishedOn);
    b = new Date(b.publishedOn);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  for (var i = 0; i < this.rawData.length; i++){
    var art = new Article(this.articles[i]);
    art.toHTML();
  }
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
blog.fetchJSON = function() {
  $.getJSON('data/hackerIpsum.json', blog.updateFromJSON);
};

// Drop old records and insert new into db and blog object:
blog.updateFromJSON = function (data) {
  // Iterate over new article JSON:
  console.log('loading from json');
  data.forEach(function(item) {
    // Instantiate an article based on item from JSON:
    var article = new Article(item);

    // Add the article to blog.articles
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
  util.toggleAboutMe();

  blog.truncateArticles();
  blog.showFilteredArts();

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
  for (var i = 0; i < this.rawData.length; i++){
    var x = this.rawData[i][prop];
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
