document.addEventListener("DOMContentLoaded", function() {

  myQuery.ajax.request({
    type: 'GET',
    url: '/likes/text'
  }).then(function(response){

    var text = JSON.parse(response);
    console.log(text);

    for(var i = 0; i < text.length; i++){
      myQuery.DOM.append('.text-content', '<div class=' + 'text-post' + (i + 1) + '>');
      for(var prop in text[i]){
        myQuery.DOM.append('.text-post' + (i + 1), '<div class=' + prop + '>' + text[i][prop] + '</div>');
      }
    }

  }).catch(function(error){
    console.log("there was an error");
  });


   $.ajax({
    type: 'GET',
    url: '/likes/videos'
   }).done(function(response){
      var textArray = response;

      for(var i = 0; i < textArray.length; i++){
        $('.video-content').append('<div class=' + 'video-post' + (i + 1) + '>');
        for(var prop in textArray[i]){
            $('.video-post' + (i + 1)).append('<div class=' + prop + '>' + textArray[i][prop] + '</div>');
         }
       }
   });

   // $.ajax({
   //  type: 'GET',
   //  url: '/likes/audio'
   // }).done(function(response){
   //    var textArray = response;

   //    for(var i = 0; i < textArray.length; i++){
   //      $('.audio-content').append('<div class=' + 'audio-post' + (i + 1) + '>');
   //      for(var prop in textArray[i]){
   //          $('.audio-post' + (i + 1)).append('<div class=' + prop + '>' + textArray[i][prop] + '</div>');
   //       }
   //     }
   // });


});


