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

document.addEventListener('DOMContentLoaded', function() {
    // Add click event to links with class "transition-link"
    const links = document.querySelectorAll('.transition-link');
    for (let link of links) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');

            // Fade-out effect
            document.body.classList.remove('loaded');
            
            setTimeout(function() {
                window.location.href = targetUrl;
            }, 2000); // Wait for the fade-out effect to complete
        });
    }
});