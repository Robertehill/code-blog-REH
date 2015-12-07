var blog = {};
blog.filtAut = [];
blog.filtCat =[];
blog.render = function(){
  blog.rawData.sort(function(a, b) {
    a = new Date(a.publishedOn);
    b = new Date(b.publishedOn);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  for (var i = 0; i < this.rawData.length; i++){
    var art = new Article(this.rawData[i]);
    art.toHTML();
  }
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
blog.truncateArticles = function() {
  $('.blogBody p:not(:first-child)').hide();
  $('main').on('click', '.readOn', function(event){
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
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
    // console.log(prop +'List');
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
      // console.log('reset filter');
      // this is dupeing articles
      // $(document).ready(blog.render());
      $('main').find('article').show();
    }
    else{
      // $('blogPost').find(data(this.value))
      // console.log($('blogPost').find(data(this.value)))''
      // $('main').find('#'+)
      $('main').find('.searchProps:not(:contains(' + this.value +'))').parent().hide();
    }
  });
  $('#authorList').change(function() {
    $('main').find('article').show();
    // console.log(this.value);
    $('#categoryList').find(':first-child').attr('selected', true);
    if(this.value === 'reset'){
      // console.log('reset filter');
      // this is dupeing articles
      $('main').find('article').show();
      // $(document).ready(blog.render());
    }
    else{
      // console.log($('main').find('article:contains(' + this.value +')').hide());
      $('main').find('.searchProps:not(:contains(' + this.value +'))').parent().hide();
    }
  });
};
