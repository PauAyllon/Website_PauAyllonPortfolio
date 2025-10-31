/* GENERATE PROJECTS
------------------------------------------------ */
const jsonfile = 'Project_Route.json'
let JSON_ARRAY = [];

const params = new URLSearchParams(window.location.search);
const site = params.get('site');
const root = params.get('root');

fetch(jsonfile)
.then(response => {
    if (!response.ok) throw new Error('Error al cargar el JSON');
    return response.json();
})
.then(data => {
    JSON_ARRAY = data; // Guardamos el JSON como array
    showPictures(JSON_ARRAY)
})
.catch(error => {
    console.error('Error:', error);
});


/* CREATE OBSERVER FOR FADE UP EFFECT
----------------------------------------------------------------------------- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.4
});



/* CREATE PICTURES
----------------------------------------------------------------------------- */
function showPictures(data) {
    let innerHTML = '';
    let innerProyects = '';

    

    const cleanedSite = site.replace(/^\d+\.\s*/, '');

    document.title = "Pau Ayllón - " + cleanedSite;
    document.getElementById('portfolio_Title').innerHTML = cleanedSite;

    data[root][site].forEach((ruta, index) => {
        const extension = ruta.split('.').pop().toLowerCase();
        let elementHTML = '';

        if (['mp4', 'webm', 'ogg'].includes(extension)) {
            // Si es un video
            elementHTML = `
                <video style="width: 100%; margin-bottom: 20px;" class="Image fade-up" autoplay muted loop playsinline onclick="imageviewer(this)">
                    <source src="${ruta}" type="video/${extension}">
                    Tu navegador no soporta video HTML5.
                </video>
            `;
        } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(extension)) {
            // Si es una imagen
            elementHTML = `
                <img src="${ruta}" class="Image fade-up" onclick="imageviewer(this)">
            `;
        } else {
            console.warn(`Formato no reconocido: ${ruta}`);
            return; // Ignora si no es imagen ni video
        }

        innerHTML += elementHTML;
    });


    data[root]['00.Portadas'].forEach((ruta, index) => {
        const ProjectName = ruta.match(/\/(\d+)\.([^\/]+)\.png$/);
        const Projectsite = ruta.split('/').pop().replace('.png', '');

        innerProyects += `
            <div class="img_container">
                <img src="${ruta}" class="image-item" alt="img-1" id="coverind">
                <a href="portfolio?site=${Projectsite}&root=${root}" class="transition-link"><div class="overlay_img">
                    <div id="overlay_txt">${ProjectName[2]}</div>
                </div></a>
            </div>
        `
    });

    document.getElementById('project_List').innerHTML = innerProyects;

    const container = document.getElementById('Portfolio_Images');
    container.innerHTML = innerHTML;

    setTimeout(() => {
        const images = container.querySelectorAll('.fade-up');
        images.forEach(img => observer.observe(img));
    },200)

    document.addEventListener('click', function(event) {
        const link = event.target.closest('.transition-link');
        if (link) {
            event.preventDefault();
            const targetUrl = link.getAttribute('href');

            document.body.classList.remove('loaded');

            setTimeout(function() {
                window.location.href = targetUrl;
            }, 1000);
        }
    });
    
    initSlider()
}


/* FUNCTION IMAGE VIEWER
------------------------------------------------ */
function imageviewer(mediaElement) {
    document.body.style.overflow = 'hidden';

    const img = document.getElementById('ImageFullScreen');
    const video = document.getElementById('VideoFullScreen');
    const viewer = document.getElementById('ImageViewer');

    // Oculta ambos al iniciar
    img.style.display = 'none';
    video.style.display = 'none';
    viewer.style.display = 'flex';
    viewer.style.opacity = '0';

    // Si el elemento es una imagen
    if (mediaElement.tagName.toLowerCase() === 'img') {
        img.src = mediaElement.src;
        img.style.display = 'block';
        img.style.transform = 'translateY(200px)';
        img.style.opacity = '0';

        setTimeout(() => {
            img.style.transform = 'translateY(0px)';
            img.style.opacity = '1';
            viewer.style.opacity = '1';
        }, 100);
    }

    // Si el elemento es un video
    else if (mediaElement.tagName.toLowerCase() === 'video') {
        const source = mediaElement.querySelector('source');
        if (source) {
            video.src = source.src;
            video.style.display = 'block';
            video.style.transform = 'translateY(200px)';
            video.style.opacity = '0';

            // Reproduce el video en pantalla completa
            video.currentTime = 0;
            video.play();

            setTimeout(() => {
                video.style.transform = 'translateY(0px)';
                video.style.opacity = '1';
                viewer.style.opacity = '1';
            }, 100);
        }
    }
}



function CloseViewer() {
    document.body.style.overflow = ''

    document.getElementById('ImageViewer').style.opacity = '0'
    setTimeout(() => {
        document.getElementById('ImageViewer').style.display = 'none'
    }, 100);
}

/* CHANGE IMAGE
------------------------------------------------ */

function nextImage() {
    // Referencias
    const img = document.getElementById('ImageFullScreen');
    const vid = document.getElementById('VideoFullScreen');
    const container = document.getElementById('imageContainer');

    // Transición (idéntica a la original)
    document.getElementById('ImageFullScreen').style.transform = 'translate(-400px)';
    document.getElementById('ImageFullScreen').style.opacity = '0';
    document.getElementById('VideoFullScreen').style.transform = 'translate(-400px)';
    document.getElementById('VideoFullScreen').style.opacity = '0';

    // Mover hacia el otro lado
    setTimeout(() => {
        document.getElementById('ImageFullScreen').style.transform = 'translate(400px)';
        document.getElementById('VideoFullScreen').style.transform = 'translate(400px)';
    }, 200);

    // Cambiar el contenido
    setTimeout(() => {
        document.getElementById('ImageFullScreen').style.transform = 'translate(0px)';
        document.getElementById('VideoFullScreen').style.transform = 'translate(0px)';
        document.getElementById('ImageFullScreen').style.opacity = '1';
        document.getElementById('VideoFullScreen').style.opacity = '1';

        const params = new URLSearchParams(window.location.search);
        const site = params.get('site');

        // Determinar el actual visible
        let currentSrc = '';
        if (img.style.display !== 'none') currentSrc = img.src;
        else if (vid.style.display !== 'none') currentSrc = vid.src;
        else return console.warn("No se encontró imagen o video activo.");

        const rutaCodificada = currentSrc.substring(currentSrc.indexOf("Projects/"));
        const rutaRelativa = decodeURIComponent(rutaCodificada);
        const currentIndex = JSON_ARRAY[root][site].indexOf(rutaRelativa);

        let nextIndex = currentIndex + 1;
        if (nextIndex >= JSON_ARRAY[root][site].length) nextIndex = 0;

        const nextPath = JSON_ARRAY[root][site][nextIndex];
        const extension = nextPath.split('.').pop().toLowerCase();

        // Mostrar según tipo
        if (['mp4', 'webm', 'ogg'].includes(extension)) {
            img.style.display = 'none';
            vid.style.display = 'block';
            vid.src = nextPath;
            vid.play();
        } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(extension)) {
            vid.pause();
            vid.style.display = 'none';
            img.style.display = 'block';
            img.src = nextPath;
        } else {
            console.warn(`Formato no reconocido: ${nextPath}`);
        }
    }, 300);
}

function previousImage() {
    // Referencias
    const img = document.getElementById('ImageFullScreen');
    const vid = document.getElementById('VideoFullScreen');
    const container = document.getElementById('imageContainer');

    // Transición (idéntica a la original)
    document.getElementById('ImageFullScreen').style.transform = 'translate(400px)';
    document.getElementById('ImageFullScreen').style.opacity = '0';
    document.getElementById('VideoFullScreen').style.transform = 'translate(400px)';
    document.getElementById('VideoFullScreen').style.opacity = '0';

    // Mover hacia el otro lado
    setTimeout(() => {
        document.getElementById('ImageFullScreen').style.transform = 'translate(-400px)';
        document.getElementById('VideoFullScreen').style.transform = 'translate(-400px)';
    }, 200);

    // Cambiar el contenido
    setTimeout(() => {
        document.getElementById('ImageFullScreen').style.transform = 'translate(0px)';
        document.getElementById('VideoFullScreen').style.transform = 'translate(0px)';
        document.getElementById('ImageFullScreen').style.opacity = '1';
        document.getElementById('VideoFullScreen').style.opacity = '1';

        const params = new URLSearchParams(window.location.search);
        const site = params.get('site');

        // Determinar el actual visible
        let currentSrc = '';
        if (img.style.display !== 'none') currentSrc = img.src;
        else if (vid.style.display !== 'none') currentSrc = vid.src;
        else return console.warn("No se encontró imagen o video activo.");

        const rutaCodificada = currentSrc.substring(currentSrc.indexOf("Projects/"));
        const rutaRelativa = decodeURIComponent(rutaCodificada);
        const currentIndex = JSON_ARRAY[root][site].indexOf(rutaRelativa);

        let previousIndex = currentIndex - 1;
        if (previousIndex < 0) previousIndex = JSON_ARRAY[root][site].length - 1;

        const prevPath = JSON_ARRAY[root][site][previousIndex];
        const extension = prevPath.split('.').pop().toLowerCase();

        // Mostrar según tipo
        if (['mp4', 'webm', 'ogg'].includes(extension)) {
            img.style.display = 'none';
            vid.style.display = 'block';
            vid.src = prevPath;
            vid.play();
        } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(extension)) {
            vid.pause();
            vid.style.display = 'none';
            img.style.display = 'block';
            img.src = prevPath;
        } else {
            console.warn(`Formato no reconocido: ${prevPath}`);
        }
    }, 300);
}




window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const background = document.querySelector('.Background');
    
    // Ajusta la velocidad del efecto dividiendo el scroll
    background.style.transform = `translateY(${scrollPosition * -0.1}px)`;
});

function Navbar_Buttons() {
  document.getElementById('Navbar_Buttons').style.display = 'flex'
}

function Close_Navbar_Buttons() {
  document.getElementById('Navbar_Buttons').style.display = 'none'
}