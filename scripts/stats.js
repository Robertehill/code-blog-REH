var stats = {};

stats.rawData = [];
stats.wordCountPerArticle = [];
stats.fetchFromDB = function(callback) {
  callback = callback || function() {};
  console.log('fetch from db for stats page');
  // Fetch all articles from db.
  webDB.execute(
    //this only sorts when put into DB, loading from JSON is not sorted
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        stats.rawData.push(new Article(ele));
      });
      stats.countAll();
      stats.render();
      // callback();
    }
  );
};
stats.getArrayLength = function(array){
  return array.length;
};
stats.getNumOfProp = function(items, prop) {
  console.log('getting number of ' + prop);
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
stats.countAll = function() {
  console.log('counting all ');
  stats.rawData.forEach(function(article) {
    stats.wordCountPerArticle.push(stats.countWordsPerArticle(article));
  });
};
// I think there is a better way to do this but it works for the moment...i think
stats.excludeList = function(segment) {
  return !segment.startsWith('##')
  // && !segment.startsWith('src=')
  // && !segment.startsWith('class=')
  // && !segment.startsWith('<')
  // && !segment.startsWith('com/')
  // && !segment.startsWith('http')
  // && !segment.startsWith('id=')
   && segment !== ("");// linter does not like this but can't remove "" from the array with songle quotes
};
stats.totalWords;

stats.getTotalWords = function(){
  console.log('getting total words');
  _.reduce(stats.wordCountPerArticle, function(total, n) {
    var num = total+n;
    // console.log(num);
    stats.totalWords = num;
    //returns undefine
    return (num);
  });
};

stats.countWordsPerArticle = function(article) {
  console.log('counting words per article');
  // console.log(article.markdown.split(/\s|\.|\>|\;|,|-|"|!|\?/).filter(stats.excludeList));
  // my first regx
  //this should spilt the string at every blank space (\s) period (\.) Greater than (\>) semi colon (\;) and equal (=) use (|) to seperate the characters.
  //then filter it based on the excludeList
  return article.markdown.split(/\s|\.|\>|\;|,|-|"|!|\?/).filter(stats.excludeList).length;
};
stats.avgWordsPerArt = function(array) {
  console.log('getting avg words per art');
  return Math.round(stats.totalWords / stats.getArrayLength(array));
};
stats.avgWordLength = function(argument) {
  // here for future use
};
stats.toHtml = function(text, value){
  console.log('to HTML');
  $('#blog-stats-section').append(text + ' : ' + value + '<br />');
};
stats.render = function(){
  stats.getTotalWords();
  stats.toHtml('Number of Articles', stats.getArrayLength(stats.rawData));
  stats.toHtml('Number of Authors', stats.getNumOfProp(stats.rawData, 'author'));
  stats.toHtml('Number of Categories' , stats.getNumOfProp(stats.rawData, 'category'));
  stats.toHtml('Number of Words', stats.totalWords);
  stats.toHtml('Average words per Article', stats.avgWordsPerArt(stats.rawData));
};
$(function(){
  webDB.init();
  stats.fetchFromDB();

});
