document.addEventListener("DOMContentLoaded", function() {

  myQuery.ajax.request({
    type: 'GET',
    url: '/likes/text'
  }).then(function(response){

    var text = JSON.parse(response);

    for(var i = 0; i < text.length; i++){
      myQuery.DOM.append('.text-content', '<div class=' + 'text-post' + (i + 1) + '>');
      for(var prop in text[i]){
        myQuery.DOM.append('.text-post' + (i + 1), '<div class=' + prop + '>' + text[i][prop] + '</div>');
      }
    }

  }).catch(function(error){
    console.log("there was an error");
  });


   myQuery.ajax.request({
    type: 'GET',
    url: '/likes/videos'
    }).then(function(response){

      var videos = JSON.parse(response);

      for(var i = 0; i < videos.length; i++){
        myQuery.DOM.append('.video-content', '<div class=' + 'video-post' + (i + 1) + '>');
        for(var prop in videos[i]){
          myQuery.DOM.append('.video-post' + (i + 1), '<div class=' + prop + '>' + videos[i][prop] + '</div>');
        }
      }

    }).catch(function(error){
      console.log("there was an error");
    });

  myQuery.ajax.request({
    type: 'GET',
    url: '/likes/audio'
    }).then(function(response){

      var audio = JSON.parse(response);

      for(var i = 0; i < audio.length; i++){
        myQuery.DOM.append('.audio-content', '<div class=' + 'audio-post' + (i + 1) + '>');
        for(var prop in audio[i]){
          myQuery.DOM.append('.audio-post' + (i + 1), '<div class=' + prop + '>' + audio[i][prop] + '</div>');
        }
      }

    }).catch(function(error){
      console.log("there was an error");
    });


});


