var stats = {};

stats.getArrayLength = function(array){
  return array.length;
};
stats.getNumOfProp = function(items, prop) {
  var unique = [];
  var numOfProp = [];
  _.each(items, function(item) {
    if (unique[item[prop]] === undefined) {
      numOfProp.push(item);
    }
    unique[item[prop]] = 0;
  });
  return numOfProp.length;
};
stats.wordCountPerArtilce = [];
stats.countAll = function() {
  blog.rawData.forEach(function(article) {
    stats.wordCountPerArtilce.push(stats.countArticle(article));
  });
};
stats.countArticle = function(article) {
  return article.blogBody.split(' ').length;
};
stats.countAll();
var totalWords = _.reduce(stats.wordCountPerArtilce, function(total, n) {
  return total + n;
});

console.log(stats.wordCountPerArtilce);


stats.toHtml = function(text, value){
  $('#blog-stats-section').append(text + ' : ' + value + '<br />');
};
$(function(){

  stats.toHtml('Number of Articles', stats.getArrayLength(blog.rawData));
  stats.toHtml('Number of Authors', stats.getNumOfProp(blog.rawData, 'author'));
  stats.toHtml('Number of Categories' , stats.getNumOfProp(blog.rawData, 'category'));
  stats.toHtml('Number of Words', totalWords);
});
