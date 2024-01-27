document.addEventListener('DOMContentLoaded', function () {
    // ========== Your existing code ==========

    /*========== menu icon navbar ==========*/
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    /*========== scroll sections active link ==========*/
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    };

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    /*========== swiper ==========*/
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    /*========== dark light mode ==========*/
    let darkModeIcon = document.querySelector('#darkMode-icon');

    darkModeIcon.onclick = () => {
        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');
    };

    /*========== scroll reveal ==========*/
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

    // ========== New code to fetch and post messages ==========

    const contactForm = document.getElementById('contactForm');
    const messageTableBody = document.querySelector('#messageTable tbody');

    // Function to fetch messages from the server
    async function loadMessages() {
        const response = await fetch('http://localhost:3000/messages');
        const data = await response.json();
        data.forEach(message => appendMessageToTable(message));
    }

    loadMessages();

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value;
        const message = document.getElementById('message').value;

        // Create a new table row for the message with muted background
        const newRow = messageTableBody.insertRow();
        newRow.innerHTML = `<td class="text-center muted-background">${message}</td>
                            <td class="text-center muted-background">${fullName}</td>`;

        // Save message to the server
        const newMessage = { fullName, message };
        await fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        });

        // Clear the form fields
        contactForm.reset();
    });
});
