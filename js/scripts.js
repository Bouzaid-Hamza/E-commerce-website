$(function() {
  
  // when clicking "categories" :
  
  let dropIconPosition = "down";
  
  $(".drop-icon").parent().click(function() {
    
    if(window.innerWidth <= 1100){
      
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

  let bestSellerConfig = {
    type: "carousel",
    perView: 1,
    gap: "60px",
    autoplay: "3000",
    hoverpause: "true",
    animationDuration: "1000",
  };

  new Glide(".product-carousel", bestSellerConfig).mount();

  let latestProductConfig = {
    type: "carousel",
    perView: 4,
    gap: "10px",
    autoplay: "3000",
    hoverpause: "true",
    animationDuration: "1000",
  };

  new Glide(".latest-products-container", latestProductConfig).mount();

});

let myData;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    myData = JSON.parse(this.responseText);
    console.log(myData);
  }
}
xhr.open("GET", "./data/products.json", true);
xhr.send();





