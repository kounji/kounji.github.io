export const editFncExcute = () => {
  $(".view-btn").on('click', function(){
    var target = $(this).closest('div');
    if($(this).attr('aria-expanded') == "true"){  //열려있을 때
      $(this).attr('aria-expanded', 'false');
      if(target.hasClass('active open')){
        target.removeClass('active open');
      } 
      target.addClass('hide');
    } else {                                      //닫혀있을 때
      $(".move-list > li").each(function(){
        var toggleDiv = $(this).children('div');
        toggleDiv.removeClass('active open');
        toggleDiv.addClass('hide');
        toggleDiv.children('button').attr('aria-expanded', 'false');
      });
      $(this).attr('aria-expanded', 'true');
      if(target.hasClass('hide')){
        target.removeClass('hide');
      } 
      target.addClass('active open');
    }    
  }); 
  $(".move-list .up").on('click', function(){
      var target = $(this).parents('li');
      var num = 0;
      if(target.index() > num){
          target.prev().before(target);
      } 
  });
  $(".move-list .down").on('click', function(){
      var target = $(this).parents('li');
      if(target.index() < target.parents('ul').find('li').length - 1){
          target.next().after(target);
      }
  });
  $(".move-list .first").on('click', function(){
      var target = $(this).parents('li');
      var num = 0;
      if(target.index() > num){
          target.parents('ul').find('li:first-child').before(target);
      } 
  });
  $(".move-list .last").on('click', function(){
      var target = $(this).parents('li');
      if(target.index() < target.parents('ul').find('li').length - 1){
          target.parents('ul').find('li:last-child').after(target);
      }
  });
}