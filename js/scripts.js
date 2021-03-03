$(function() {
  
  // when clicking "categories" :
  
  let dropIconPosition = "down";
  
  $(".drop-icon").parent().click(function() {
    
    if(window.innerWidth <= 930){
      
      if(dropIconPosition) {
        
        $(".drop-icon-click").css("transform","scaleX(1.5) rotate(450deg)");
        dropIconPosition = "";
        
      } else {
        
        $(".drop-icon-click").css("transform","scaleX(1.5) rotate(-90deg)");
        dropIconPosition = "down"
        
      }
    
      $(".drop-list-click").slideToggle();
      
    }
    
  });
  
//   when Resising :
  
  $(window).resize(function() {
  
    if(window.innerWidth > 1100) {

      $(".drop-list-click").hide();
      $(".drop-icon-click").css("transform","scaleX(1.5) rotate(-90deg)");
      dropIconPosition = "down";

    } 
  
  });

  // carousel 

  let config = {
    type: "carousel",
    perView: 1,
    gap: "60px",
    autoplay: "4000",
    hoverpause: "true",
    animationDuration: "1000",
  };

  new Glide(".glide", config).mount();

});


