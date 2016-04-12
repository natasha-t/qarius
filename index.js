var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'Oh8fppC7uDzKENpreatfnJtwhmAqKXA1o5jZqdT5v1EfDf5nQz',
  consumer_secret: 'z48ygByyfRQnOcg4YMcZlHQV7znh6dxe6joJ8miAJOJ00fKYvE',
  token: '',
  token_secret: ''
});

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

app.get('/likes', function(request, response){
  client.blogLikes('trubutstill', function(err, data){
    var jsonString = JSON.stringify(data);
    var obj = JSON.parse(jsonString);
    var allPosts = obj.liked_posts;

    response.render('pages/likes/all_likes', {posts: allPosts});

  })
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
      photoPosts.push(photoPost);
      }
    };

    response.render('pages/likes/photos', {posts: photoPosts});
  });
});



app.get('/likes/text', function(request, response){
  client.blogLikes('trubutstill', function(err, data){
    var jsonString = JSON.stringify(data);
    var obj = JSON.parse(jsonString);
    var allPosts = obj.liked_posts;

    var textPosts = [];
    for(var i = 0; i < allPosts.length; i++){
      if(allPosts[i]['type'] === 'text'){
        var textPost = {};
        textPost['blogName'] = allPosts[i].blog_name;
        textPost['text'] = allPosts[i].body;

        if(allPosts[i]['title']){
          textPost['title'] = allPosts[i].title;
        }

        textPosts.push(textPost);
      }
    };

    if(request.xhr){
      response.send(textPosts);
    } else {
      response.render('pages/likes/text', {posts: textPosts});
    }

  });
});

app.get('/likes/quotes', function(request, response){
  client.blogLikes('trubutstill', function(err, data){
    var jsonString = JSON.stringify(data);
    var obj = JSON.parse(jsonString);
    var allPosts = obj.liked_posts;



    var quotePosts = [];
    for(var i = 0; i < allPosts.length; i++){
      if(allPosts[i]['type'] === 'quote'){
        var quotePost = {};
        quotePost['blogName'] = allPosts[i].blog_name;
        quotePost['source'] = allPosts[i].source;
        quotePost['text'] = allPosts[i].text;

        quotePosts.push(quotePost);
      }
    };

    response.render('pages/likes/quotes', {posts: quotePosts})
  });
});


app.get('/likes/links', function(request, response){
  client.blogLikes('trubutstill', function(err, data){
    var jsonString = JSON.stringify(data);
    var obj = JSON.parse(jsonString);
    var allPosts = obj.liked_posts;

    var linkPosts = [];
    for(var i = 0; i < allPosts.length; i++){
      if(allPosts[i]['type'] === 'link'){
        var linkPost = {};
        linkPost['blogName'] = allPosts[i].blog_name;
        linkPost['publisher'] = allPosts[i].publisher;
        linkPost['title'] = allPosts[i].title;
        linkPost['url'] = allPosts[i].url;
        linkPost['excerpt'] = allPosts[i].excerpt;
        linkPost['linkAuthor'] = allPosts[i].link_author;

      if(allPosts[i]['link_image']){
        linkPost['linkImage'] = allPosts[i].link_image;
      }

        linkPosts.push(linkPost);
      }
    };

    console.log(linkPosts);

    response.render('pages/likes/links', {posts: linkPosts})
  });
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

