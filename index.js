var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'Oh8fppC7uDzKENpreatfnJtwhmAqKXA1o5jZqdT5v1EfDf5nQz',
  consumer_secret: 'z48ygByyfRQnOcg4YMcZlHQV7znh6dxe6joJ8miAJOJ00fKYvE',
  token: '',
  token_secret: ''
});
var helpers = require('helpers');

var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.get('/', function(request, response) {
  response.render('pages/index');
});

var allPosts = helpers.getPosts(client, 'trubutstill');

app.get('/likes', function(request, response){
  allPosts.then(function(data) {
    response.render('pages/likes/all_likes', { posts: data });
  });
});

app.get('/likes/photos', function(request, response){
  allPosts.then(function(data){
   var posts = helpers.sortPosts(data, function(post) { return post['type'] === 'photo'}, function(post){ return helpers.postCreator(post,'photo'); });
    response.render('pages/likes/photos', {posts: posts});
  }).catch(function(err) {
    console.error(err);
    response.render('pages/index');
  });

});


app.get('/likes/text', function(request, response){
  allPosts.then(function(data){
    var posts = helpers.sortPosts(data, function(post) { return post['type'] === 'text'}, function(post){ return helpers.postCreator(post,'text'); });

    if(request.xhr){
      response.send(posts);
    } else {
      response.render('pages/likes/text', {posts: posts});
    }
  }).catch(function(err) {
    console.error(err);
    response.render('pages/index');
  });
});

app.get('/likes/quotes', function(request, response){
  allPosts.then(function(data){
    var posts = helpers.sortPosts(data, function(post) { return post['type'] === 'quote'}, function(post){ return helpers.postCreator(post,'quote'); });

    response.render('pages/likes/quotes', {posts: posts})
  }).catch(function(err) {
    console.error(err);
    response.render('pages/index');
  });
});


app.get('/likes/links', function(request, response){
  allPosts.then(function(data){
    var posts = helpers.sortPosts(data, function(post) { return post['type'] === 'link'}, function(post){ return helpers.postCreator(post,'link'); });

    response.render('pages/likes/links', {posts: posts})
  }).catch(function(err) {
    console.error(err);
    response.render('pages/index');
  });
});

app.get('/likes/videos', function(request, response){
  allPosts.then(function(data){
    var posts = helpers.sortPosts(data, function(post) { return post['type'] === 'video'}, function(post){ return helpers.postCreator(post,'video'); });

    if(request.xhr){
      response.send(posts);
    } else {
      response.render('pages/likes/videos', {posts: posts});
    }
  }).catch(function(err) {
    console.error(err);
    response.render('pages/index');
  });
});

app.get('/likes/audio', function(request, response){
  allPosts.then(function(data){
    var posts = helpers.sortPosts(data, function(post) { return post['type'] === 'audio'}, function(post){ return helpers.postCreator(post,'audio'); });

    if(request.xhr){
      response.send(posts);
    } else {
      response.render('pages/likes/audio', {posts: posts});
    }
  }).catch(function(err) {
    console.error(err);
    response.render('pages/index');
  });
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

