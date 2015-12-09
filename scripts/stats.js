var stats = {};
stats.numOfArticles = [];
stats.numOfWords = [];

stats.getArrayLength = function(array){
  return array.length;
};
// stats.getNumOfAuthors = function(array){
//   var numOfAuthors = [];
//
//   // if (numOfAuthors.indexOf(_.map(array, 'author')) < 0){
//   // }
//   return numOfAuthors.length;
// };
stats.getNumOfAuthors = function(items, prop) {
  var unique = [];
  var numOfAuthors = [];

  _.each(items, function(item) {
    if (unique[item[prop]] === undefined) {
      numOfAuthors.push(item);
    }

    unique[item[prop]] = 0;
  });

  return numOfAuthors.length;
};
console.log(stats.getNumOfAuthors(blog.rawData, 'author'));

stats.toHtml = function(text, value){
  $('#blog-stats-section').append(text + ' : ' + value + '<br />');
};
$(function(){
  stats.toHtml('Number of Articles', stats.getArrayLength(blog.rawData));
  stats.toHtml('Number of Authors', stats.getNumOfAuthors(blog.rawData, 'author'));

})
