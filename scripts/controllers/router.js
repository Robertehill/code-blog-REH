page('/', function() {
  // console.log('router /');
  articleController.loadALLArts();
});
page('/category/:category',
  articleController.category,
  articleController.show
);
page('/author/:author', articleController.author);
page('/about', function() {
  // console.log('router /about');
  repoController.showAboutMe();
});

page.start();
