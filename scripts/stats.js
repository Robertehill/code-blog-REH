var stats = {};
// will change this when I get JSON working.
stats.rawData = blog.rawData;
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
stats.wordCountPerArticle = [];
stats.countAll = function() {
  stats.rawData.forEach(function(article) {
    stats.wordCountPerArticle.push(stats.countWordsPerArticle(article));
  });
};
// I think there is a better way to do this but it works for the moment...i think
stats.excludeList = function(segment) {
  return !segment.startsWith('<img')
  && !segment.startsWith('src=')
  && !segment.startsWith('class=')
  && !segment.startsWith('<')
  && !segment.startsWith('com/')
  && !segment.startsWith('http')
  && segment !== ("");
};
stats.countWordsPerArticle = function(article) {
  console.log(article.blogBody.split(/\s|\.|\>|\;|,|-|"|\?/).filter(stats.excludeList));
  // my first regx
  //this should spilt the string at every blank space (\s) period (\.) Greater than (\>) semi colon (\;) and equal (=) use (|) to seperate the characters.
  //then filter it based on the excludeList
  return article.blogBody.split(/\s|\.|\>|\;|=|,|-/).filter(stats.excludeList).length;
};
stats.countAll();
stats.totalWords = _.reduce(stats.wordCountPerArticle, function(total, n) {
  return total + n;
});
stats.avgWordsPerArt = function(array) {
  return Math.round(stats.totalWords / stats.getArrayLength(array));
};
stats.avgWordLength = function(argument) {
  // here for future use
};
stats.toHtml = function(text, value){
  $('#blog-stats-section').append(text + ' : ' + value + '<br />');
};
$(function(){
  stats.toHtml('Number of Articles', stats.getArrayLength(stats.rawData));
  stats.toHtml('Number of Authors', stats.getNumOfProp(stats.rawData, 'author'));
  stats.toHtml('Number of Categories' , stats.getNumOfProp(stats.rawData, 'category'));
  stats.toHtml('Number of Words', stats.totalWords);
  stats.toHtml('Average words per Article', stats.avgWordsPerArt(stats.rawData));
});
