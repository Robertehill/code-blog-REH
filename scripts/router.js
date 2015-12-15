page('/', function() {
  console.log('called /');
  articleController.loadALLArts();
});
page('/about', function() {
  console.log('called /about');
  articleController.showAboutMe();
});
page.start();
