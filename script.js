document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.mobile-nav a');

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        
        const isOpen = mobileNav.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 2. Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 3. Navbar scroll effect & Back to Top visibility
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Back to top click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Highlight Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a');
    
    function updateActiveLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Offset for fixed navbar
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);

    // 5. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Profile Picture Swing Animation on Click
    const profilePic = document.querySelector('.profile-placeholder');
    if (profilePic) {
        profilePic.addEventListener('click', function() {
            this.classList.remove('swing');
            // Trigger reflow to restart animation
            void this.offsetWidth;
            this.classList.add('swing');
        });
    }
});