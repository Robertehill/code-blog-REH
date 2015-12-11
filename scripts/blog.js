var blog = {};
blog.filtAut = [];
blog.filtCat = [];
blog.articles = [];
blog.render = function(){
  console.log('start render');
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
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  blog.truncateArticles();
  blog.showFilteredArts();
};
//taken from demo
blog.fetchArticles = function(data, message, xhr) {
  var eTag = xhr.getResponseHeader('eTag');
  if (!localStorage.articlesEtag || localStorage.articlesEtag != eTag) {
    console.log('cache miss!');
    localStorage.articlesEtag = eTag;
    // Remove all prior articles from the DB, and from blog:
    blog.articles = [];
    webDB.execute(
      'DELETE FROM articles;',
       blog.fetchJSON);
  } else {
    console.log('cache hit!');
    blog.fetchFromDB();
  }
};
blog.fetchJSON = function() {
  console.log('fetchJson');
  $.getJSON('data/hackerIpsum.json', blog.updateFromJSON);
};

blog.updateFromJSON = function (data) {
  console.log('loading from json');
  data.forEach(function(item) {
    var article = new Article(item);
    blog.articles.push(article);
    // Cache the article in DB
    blog.insertArticleToDB(article);
  });
  blog.initArticles();

};

blog.getTemplate = function (data) {
  console.log('getting template');
  Article.prototype.compiled = Handlebars.compile(data);
};
blog.compileTemplate = function(){
  console.log('compile template');
  $.get('templates/article-template.handlebars', blog.getTemplate)
    .done(blog.fetchArticles);
};
blog.fetchFromDB = function(callback) {
  callback = callback || function() {};
  console.log('fetch from db');
  // Fetch all articles from db.
  webDB.execute(
    //  Add SQL here...
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        blog.articles.push(new Article(ele));
      });

      blog.initArticles();
      callback();
    }
  );
};
blog.initArticles = function() {
  console.log('initArticles');
  blog.render();
};

blog.insertArticleToDB = function(article) {
  console.log('insert to db');
  webDB.execute(
    [{
      'sql': 'INSERT INTO articles (blogTitle, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
      'data': [article.blogTitle, article.author, article.authorUrl, article.category, article.publishedOn, article.markdown]
    }]
  );
};
blog.truncateArticles = function() {
  console.log('truncate');
  $('.blog-body').hide();
  $('main').on('click', '.readOn', function(event){
    event.preventDefault();
    $(this).parent().find('.blog-body').fadeIn();
    $(this).hide();
  });
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
  webDB.init();
  console.log('document ready');
  blog.compileTemplate();

});
