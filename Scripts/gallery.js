/* GENERATE PROJECTS
------------------------------------------------ */
const jsonfile = 'Project_Route.json'
let JSON_ARRAY = [];


fetch(jsonfile)
.then(response => {
    if (!response.ok) throw new Error('Error al cargar el JSON');
    return response.json();
})
.then(data => {
    JSON_ARRAY = data; // Guardamos el JSON como array
    showProjects(JSON_ARRAY)
    showProjectsMobile(JSON_ARRAY)
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
    threshold: .5
});

function showProjects(data) {
    /* ---- 3D MODELS ------------------------------------------------------------------ */
    let innerHTML = ''
    let allContainers = ''
    
    data['Models']['00.Portadas'].forEach((ruta, index) => {
        let Name = ruta.match(/\/(\d+)\.([^\/]+)\.png$/);
        let site = ruta.split('/').pop().replace('.png', '');
        let root = ruta.split('/')[1];

        innerHTML += `
            <div class="Project fade-up">
                <img src="${ruta}" class="coverind">
                <a href="portfolio?site=${site}&root=${root}" class="transition-link">
                    <div class="overlay_img">
                        <div id="overlay_txt">${Name[2]}</div>
                    </div>
                </a>
            </div>
        `;

        let isLastElement = index === data['Models']['00.Portadas'].length - 1;
        if ((index + 1) % 4 === 0 || isLastElement) {
            let innerContainer = `
                <div style="display: flex; justify-content: flex-start; margin-top: 40px; gap: 2.4vw;">
                    ${innerHTML}
                </div>
            `;

            allContainers += innerContainer;
            innerHTML = '';
        }
    });

    document.getElementById('ModelsList').innerHTML = allContainers


    /* ---- DRAWINGS ------------------------------------------------------------------ */
    innerHTML = ''
    allContainers = ''

    data['Drawings']['00.Portadas'].forEach((ruta, index) => {
        let Name = ruta.match(/\/(\d+)\.([^\/]+)\.png$/);
        let site = ruta.split('/').pop().replace('.png', '');
        let root = ruta.split('/')[1];

        innerHTML += `
            <div class="Project fade-up">
                <img src="${ruta}" class="coverind">
                <a href="portfolio?site=${site}&root=${root}" class="transition-link">
                    <div class="overlay_img">
                        <div id="overlay_txt">${Name[2]}</div>
                    </div>
                </a>
            </div>
        `;

        let isLastElement = index === data['Drawings']['00.Portadas'].length - 1;
        if ((index + 1) % 4 === 0 || isLastElement) {
            let innerContainer = `
                <div style="display: flex; justify-content: flex-start; margin-top: 40px; gap: 2.7vw;">
                    ${innerHTML}
                </div>
            `;

            allContainers += innerContainer;
            innerHTML = '';
        }
    });

    document.getElementById('DrawingList').innerHTML = allContainers

    const images_ModelsList = document.getElementById('ModelsList').querySelectorAll('.fade-up');
    images_ModelsList.forEach(img => observer.observe(img));

    const images_DrawingList = document.getElementById('DrawingList').querySelectorAll('.fade-up');
    images_DrawingList.forEach(img => observer.observe(img));

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
}

function showProjectsMobile(data) {
    /* ---- 3D MODELS ------------------------------------------------------------------ */
    let innerHTML = ''
    let allContainers = ''
    
    data['Models']['00.Portadas'].forEach((ruta, index) => {
        let Name = ruta.match(/\/(\d+)\.([^\/]+)\.png$/);
        let site = ruta.split('/').pop().replace('.png', '');
        let root = ruta.split('/')[1];

        innerHTML += `
            <div class="Project fade-up">
                <img src="${ruta}" class="coverind">
                <a href="portfolio?site=${site}&root=${root}" class="transition-link">
                    <div class="overlay_img">
                        <div id="overlay_txt">${Name[2]}</div>
                    </div>
                </a>
            </div>
        `;

        let isLastElement = index === data['Models']['00.Portadas'].length - 1;
        if ((index + 1) % 2 === 0 || isLastElement) {
            let innerContainer = `
                <div style="display: flex; justify-content: flex-start; margin-top: 40px; gap: 2.4vw;">
                    ${innerHTML}
                </div>
            `;

            allContainers += innerContainer;
            innerHTML = '';
        }
    });

    document.getElementById('ModelsList_Mobile').innerHTML = allContainers


    /* ---- DRAWINGS ------------------------------------------------------------------ */
    innerHTML = ''
    allContainers = ''

    data['Drawings']['00.Portadas'].forEach((ruta, index) => {
        let Name = ruta.match(/\/(\d+)\.([^\/]+)\.png$/);
        let site = ruta.split('/').pop().replace('.png', '');
        let root = ruta.split('/')[1];

        innerHTML += `
            <div class="Project fade-up">
                <img src="${ruta}" class="coverind">
                <a href="portfolio?site=${site}&root=${root}" class="transition-link">
                    <div class="overlay_img">
                        <div id="overlay_txt">${Name[2]}</div>
                    </div>
                </a>
            </div>
        `;

        let isLastElement = index === data['Drawings']['00.Portadas'].length - 1;
        if ((index + 1) % 2 === 0 || isLastElement) {
            let innerContainer = `
                <div style="display: flex; justify-content: flex-start; margin-top: 40px; gap: 2.7vw;">
                    ${innerHTML}
                </div>
            `;

            allContainers += innerContainer;
            innerHTML = '';
        }
    });

    document.getElementById('DrawingList_Mobile').innerHTML = allContainers

    const images_ModelsList = document.getElementById('ModelsList_Mobile').querySelectorAll('.fade-up');
    images_ModelsList.forEach(img => observer.observe(img));

    const images_DrawingList = document.getElementById('DrawingList_Mobile').querySelectorAll('.fade-up');
    images_DrawingList.forEach(img => observer.observe(img));

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
}

function addLoadedClass() {
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 10); // Slight delay to ensure CSS transition works on page load
}

document.addEventListener('DOMContentLoaded', addLoadedClass);

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        addLoadedClass();
    }
});


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