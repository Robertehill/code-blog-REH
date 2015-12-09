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
    stats.wordCountPerArtilce.push(stats.countWordsPerArticle(article));
  });
};
stats.excludeAttr = function(segment) {
  return !segment.startsWith('<img')
  && !segment.startsWith('src=')
  && !segment.startsWith('class=')
  && !segment.startsWith('<')
  && !segment.startsWith('com/')
  && !segment.startsWith('"http')
  && segment !== ("");
};
stats.countWordsPerArticle = function(article) {
  console.log(article.blogBody.split(/\s|\.|\>|\;|=/).filter(stats.excludeAttr));
  return article.blogBody.split(' ').filter(stats.excludeAttr).length;
};
stats.countAll();
stats.totalWords = _.reduce(stats.wordCountPerArtilce, function(total, n) {
  return total + n;
});
stats.avgWordsPerArt = function(array) {
  return Math.round(stats.totalWords / stats.getArrayLength(array));
};
stats.avgWordLength = function(argument) {
  // here for future use
}
stats.toHtml = function(text, value){
  $('#blog-stats-section').append(text + ' : ' + value + '<br />');
};
$(function(){
  stats.toHtml('Number of Articles', stats.getArrayLength(blog.rawData));
  stats.toHtml('Number of Authors', stats.getNumOfProp(blog.rawData, 'author'));
  stats.toHtml('Number of Categories' , stats.getNumOfProp(blog.rawData, 'category'));
  stats.toHtml('Number of Words', stats.totalWords);
  stats.toHtml('Average words per Article', stats.avgWordsPerArt(blog.rawData));
});
