// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

function setTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
    themeToggle.checked = true;
    themeToggleMobile.checked = true;
}

themeToggle.addEventListener('change', (e) => {
    setTheme(e.target.checked);
    themeToggleMobile.checked = e.target.checked;
});

themeToggleMobile.addEventListener('change', (e) => {
    setTheme(e.target.checked);
    themeToggle.checked = e.target.checked;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll for project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Typing effect for the hero section
const typingText = document.querySelector('.typing');
const texts = ['PHP Laravel Developer', 'Full Stack Engineer', 'Backend Specialist', 'Software Architect'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
    const whatsAppLink = function (phone) {
        return `https://wa.me/${phone.replace(/\s+/g, '').replace(/\+/g, '')}`;
    };

    document.querySelectorAll(".masked-phone").forEach(function (elem) {
        const phone = `${elem.dataset.part1} ${elem.dataset.part2} ${elem.dataset.part3}`;

        const existingHtml = elem.innerHTML;

        elem.innerHTML = `<a href="${whatsAppLink(phone)}" class="hover:text-blue-400" target="_blank">${existingHtml} ${phone}</a>`;
    });

    document.querySelectorAll(".masked-whatsapp").forEach(function (elem) {
        const phone = `${elem.dataset.part1} ${elem.dataset.part2} ${elem.dataset.part3}`;

        const existingHtml = elem.innerHTML;

        elem.innerHTML = `<a href="${whatsAppLink(phone)}" class="whatsapp-float" target="_blank">${existingHtml}</a>`;
    });

    document.querySelectorAll(".masked-email").forEach(function (elem) {
        const email = `${elem.dataset.user}@${elem.dataset.domain}`;
        const existingHtml = elem.innerHTML;
        elem.innerHTML = `<a href="mailto:${email}" class="hover:text-blue-400">${existingHtml} ${email}</a>`;
    });

    document.querySelectorAll(".masked-location").forEach(function (elem) {
        const location = `${elem.dataset.part1} ${elem.dataset.part2} ${elem.dataset.part3}`;
        const mapQuery = encodeURIComponent(location);
        const existingHtml = elem.innerHTML;
        elem.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" 
                                target="_blank" 
                                class="hover:text-blue-400">
                                ${existingHtml}
                                ${location}
                            </a>`;
    });
});
