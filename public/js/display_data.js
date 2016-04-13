$(function(){


   $.ajax({
    type: 'GET',
    url: '/likes/text'
   }).done(function(response){
      var textArray = response;

      for(var i = 0; i < textArray.length; i++){
        $('.content').append('<div class=' + 'text-post' + (i + 1) + '>');
        for(var prop in textArray[i]){
            $('.text-post' + (i + 1)).append('<div class=' + prop + '>' + textArray[i][prop] + '</div>');
         }
       }
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

   $.ajax({
    type: 'GET',
    url: '/likes/audio'
   }).done(function(response){
      var textArray = response;

      for(var i = 0; i < textArray.length; i++){
        $('.audio-content').append('<div class=' + 'audio-post' + (i + 1) + '>');
        for(var prop in textArray[i]){
            $('.audio-post' + (i + 1)).append('<div class=' + prop + '>' + textArray[i][prop] + '</div>');
         }
       }
   });


});

