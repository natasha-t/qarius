//My re-created jQuery

var myQuery = (function(){

  var selector = (function() {
    return {
      select: function(selector){
        var element = selector.slice(0,1);
       if (element === "#") {
         return document.getElementById(selector.slice(1,selector.length));
       } else if (element === ".") {
         return document.getElementsByClassName(selector.slice(1,selector.length))[0]
       } else {
         return document.getElementsByTagName(selector)[0]
       }
      }
    };
  })();

  var DOM = (function(){
    return {
      append: function(element, content){
        return selector.select(element).innerHTML += content;
      }
    };
  })();

  var ajax = (function(){
    return {
      request: function(ajaxRequest) {
         var promise = new Promise(function(resolve, error){
           var newReq = new XMLHttpRequest();
           newReq.open(ajaxRequest.type, ajaxRequest.url);
           newReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
           newReq.send();

           newReq.onload = function() {
             if(this.status >= 200 && this.status < 300) {
               resolve(this.response);
             } else {
               error(this.statusText);
             }
           };

         });
         return promise;
       }
    };
  })();




  return {
    selector: selector,
    DOM: DOM,
    ajax: ajax
  };

})();



