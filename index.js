var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'Oh8fppC7uDzKENpreatfnJtwhmAqKXA1o5jZqdT5v1EfDf5nQz',
  consumer_secret: 'z48ygByyfRQnOcg4YMcZlHQV7znh6dxe6joJ8miAJOJ00fKYvE',
  token: '',
  token_secret: ''
});

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/likes', function(request, response){
  response.render('pages/likes/likes');
});

app.get('/likes/photos', function(request, response){
  client.blogLikes('trubutstill', function(err, data){
    var jsonString = JSON.stringify(data);
    var obj = JSON.parse(jsonString);
    var allPosts = obj.liked_posts;

    var photoPosts = [];
    for(var i = 0; i < allPosts.length; i++){
      if(allPosts[i]['type'] === 'photo'){
        var photoPost = {};
        photoPost['blogName'] = allPosts[i].blog_name;
        photoPost['photoUrl'] = allPosts[i].photos[0].alt_sizes[1].url;
      }
      photoPosts.push(photoPost);
    }

    console.log(photoPosts);

    response.render('pages/likes/photos', {posts: photoPosts});
  });


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

