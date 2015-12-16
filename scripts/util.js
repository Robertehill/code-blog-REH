var util = {};
//this does belong here
util.getToday = function() {
  var dateObj = new Date();
  var month =  dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  return year + '-' + month + '-' + day;
};
//not sure this belongs here
