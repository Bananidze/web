/**
* Darken the first gallery on scroll down
* depends on IntersectionObserver being available
*/
let options = {
    threshold: [1, .95, .9, .8],
    rootMargin: '10px 0px 0px 0px'
  };
  let callback = function(entries, observer) {
    let target = entries[0].target;
    let ratio = entries[0].intersectionRatio;
    if(ratio <= .80) {
      target.querySelector('.overlay').style.opacity = .5;
      target.querySelector('.text').style.transform = ("scale(1)");
    } else {
      target.querySelector('.overlay').style.opacity = 0;
      target.querySelector('.text').style.transform = ("scale(2)");
    }
  };
  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelector('.gallery-one');
    observer.observe(target);
  }
  
  
  /**
  * Create a rubber band effect on the first gallery
  */
  window.onload = function() {
    var lastY = 0;
    var initialY;
    let galleries = document.querySelectorAll('.gallery');
    let main = document.querySelector('.main');
    let firstPhoto = document.querySelector('.gallery-one img');
    let galleryOne = document.querySelector('.gallery-one');
  
    scrollable = document;
    window.addEventListener('touchstart', e => {
      initialY = e.touches[0].clientY;
    });
    window.addEventListener('touchend', e => {
      initialY = 0;
      galleryOne.style.height = "334px";
      firstPhoto.style.transform = (`scale(1)`);
    });
    window.addEventListener('touchmove', e => {
      let currentY = e.touches[0].clientY;
      if(currentY > lastY && window.scrollY <= 0){
        // moving down
        galleryOne.style.height = "400px"
      }
      lastY = currentY;
    });
  }
  
  /**
  * Expand and reduce galleries on scroll
  */
  let galleries = document.querySelectorAll('.gallery');
  let container = document.querySelector('.container');
  
  container.addEventListener('scroll', e => {
    galleries.forEach(gallery => {
      let clientY = gallery.getBoundingClientRect().bottom;
      // expandedGalleryHeight = 334px;
      // reducedGalleryHeight = 148px;
      let deltaY = (clientY - 334 - 148) * -1;
      if (deltaY >= 37 && deltaY < 180) {
        gallery.classList.add("grow");
        gallery.classList.remove("darken");
      }
      if (deltaY >= 180) {
        gallery.classList.add("darken");
      }
      else if (deltaY <= 1){
        gallery.classList.remove("grow");
        gallery.classList.remove("darken");
      }
    });
  });