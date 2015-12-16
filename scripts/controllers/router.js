page('/', function() {
  console.log('router /');
  articleController.loadALLArts();
});
page('/about', function() {
  console.log('router /about');
  repoController.showAboutMe();
});

page.start();
