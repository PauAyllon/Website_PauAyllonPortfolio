
/* FUNCTION IMAGE VIEWER
------------------------------------------------ */
function imageviewer(img_Container, title, url) {
  document.body.style.overflow = 'hidden'

  document.getElementById('ImageFullScreen').src = img_Container.src
  document.getElementById('ImageViewer').style.display = 'flex'

  document.getElementById('imageTitle').innerHTML = title
  
  document.getElementById('Btn_VisitProject').href = 'portfolio.html?site=' + url;

  document.getElementById('ImageFullScreen').style.transform = 'translateY(200px)'
  document.getElementById('ImageFullScreen').style.opacity = '0'

  setTimeout(() => {
    document.getElementById('ImageFullScreen').style.transform = 'translateY(0px)'
    document.getElementById('ImageFullScreen').style.opacity = '1'
    document.getElementById('ImageViewer').style.opacity = '1'
  }, 100);


}

function CloseViewer() {
    document.body.style.overflow = ''
    document.getElementById('ImageViewer').style.opacity = '0'
    setTimeout(() => {
        document.getElementById('ImageViewer').style.display = 'none'
    }, 100);
}

function Navbar_Buttons() {
  document.getElementById('Navbar_Buttons').style.display = 'flex'
}

function Close_Navbar_Buttons() {
  document.getElementById('Navbar_Buttons').style.display = 'none'
}

/* FADE OUT TRANSITION
----------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  requestAnimationFrame(() => {
    body.classList.add("in");
  });

});
