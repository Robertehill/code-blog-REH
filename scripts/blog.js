var blog = {};
blog.filtAut = [];
blog.filtCat = [];
blog.articles = [];
blog.render = function(){
  console.log('start render');
  blog.sortArts();// SQl does this for me know but loading from JSON is still unsorted,
  // should refactor later using forEach
  for (var i = 0; i < this.articles.length; i++){
    var art = new Article(this.articles[i]);
    art.toHTML();
  }
  //removed 'pre' becuase it would not highlight code tags without the pre tags, aka inline markdown for code tags.
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  util.toggleAboutMe();
  util.truncateArticles();
  blog.showFilteredArts();
};
// needed to sort articles when loading from JSON
blog.sortArts = function () {
  blog.articles.sort(function(a,b){
    a = new Date(a.publishedOn);
    b = new Date(b.publishedOn);
    return a>b ? -1 : a<b ? 1 : 0;
  });
};
////////////////taken from demo//////////////////
blog.fetchArticles = function(data, message, xhr) {
  var eTag = xhr.getResponseHeader('eTag');
  if (!localStorage.articlesEtag || localStorage.articlesEtag != eTag) {
    console.log('cache miss!');
    localStorage.articlesEtag = eTag;
    //clear and reload all data.
    blog.articles = [];
    webDB.execute(
      'DELETE FROM articles;',
       blog.fetchJSON);
  }
  else {
    console.log('cache hit!');
    blog.fetchFromDB();
  }
};
blog.updateFromJSON = function (data) {
  console.log('loading from json');
  data.forEach(function(item) {
    var article = new Article(item);
    blog.articles.push(article);
    blog.insertArticleToDB(article);
  });
  blog.initArticles();
};
blog.fetchJSON = function() {
  console.log('fetchJson');
  $.getJSON('data/hackerIpsum.json',blog.updateFromJSON);
};
blog.fetchFromDB = function(callback) {
  callback = callback || function() {};
  console.log('fetch from db');
  // webDB.setupTables();// not sure where the best place for this is.
  // Fetch all articles from db.
  webDB.execute(
    //this only sorts when put into DB, loading from JSON is not sorted
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
/////////////////////////////////////////////////////////////////
blog.getTemplate = function (data) {
  console.log('getting template');
  Article.prototype.compiled = Handlebars.compile(data);
  ////taken from demo/////////////
  $.ajax({
    type: 'HEAD',
    url: 'data/hackerIpsum.json',
    success: blog.fetchArticles
  });
  ////////////////////////////////
};
blog.compileTemplate = function(){
  console.log('compile template');
  $.get('templates/article-template.handlebars', blog.getTemplate);
};
blog.makeFilterList = function(array, prop) {
  // need to refactor to a function or use DB.
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
      //need to refactor this using data element it's macthing partial names.
      $('main').find('.searchProps:not(:contains(' + this.value +'))').parent().hide();
    }
  });
};
$(function() {
  console.log('document ready');
  webDB.init();
  webDB.setupTables();
  blog.compileTemplate();
});
