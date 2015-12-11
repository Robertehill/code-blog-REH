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
  //this is a mess will have to fix it at some point i'm sure
  blog.truncateArticles();
  blog.showFilteredArts();
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
blog.fetchJSON = function() {
  $.getJSON('data/hackerIpsum.json', blog.updateFromJSON);
};
blog.loadArticles = function() {
  $.get('templates/article-template.handlebars', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
    $.ajax({
      type: 'HEAD',
      url: 'data/hackerIpsum.json',
      success: blog.fetchArticles
    });
  });
};
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
  // blog.render();
};
//taken from demo
blog.fetchFromDB = function(callback) {
  callback = callback || function() {};

  // Fetch all articles from db.
  webDB.execute(
    //  Add SQL here...
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        blog.articles.push(new Article(ele));
      });
      // blog.render();
      blog.initArticles();
      callback();
    }
  );
};
blog.updateFromJSON = function (data) {
  console.log('loading from json');
  data.forEach(function(item) {
    var article = new Article(item);
    blog.articles.push(article);
    // Cache the article in DB
    article.insertRecord();
  });
  blog.render();
};

// blog.getTemplate = function (data) {
//   Article.prototype.compiled = Handlebars.compile(data);
// };
blog.templateLoaded = function() {
  blog.fetchJSON();
};
blog.compileTemplate = function(){
  $.get('templates/article-template.handlebars', blog.getTemplate)
    .done(blog.templateLoaded);
};
// this is still not right will fix at some point...
blog.truncateArticles = function() {
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
blog.initArticles = function() {
  // blog.sortArticles();

  // Only render if the current page has somewhere to put all the articles
  if ($('#articles').length) {
    blog.render();
  }
};
$(function() {
  blog.compileTemplate();
});
