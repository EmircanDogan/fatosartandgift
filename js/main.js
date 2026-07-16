document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animasyonları
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 3. SWIPER (KAYDIRMALI GALERİ) İNİTİALİZASYONU
    const swiper = new Swiper('.gallery-swiper', {
        effect: 'coverflow', // 3 Boyutlu modern görünüm
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true, // Sonsuz dönme
        coverflowEffect: {
            rotate: 25,     // Slaytların dönme açısı
            stretch: 0,
            depth: 250,     // Arkadaki slaytların derinliği
            modifier: 1,
            slideShadows: true, // 3D gölgeler
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Mobilde swipe hissini artırmak için
        speed: 600
    });

    // 4. Lightbox (Galeri Büyüteç Sistemi)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            // Sadece aktif slayta (ortadaki) tıklanınca lightbox açılsın
            const slide = e.target.closest('.swiper-slide');
            if(slide.classList.contains('swiper-slide-active')) {
                lightbox.classList.add('active');
                lightboxImg.src = e.target.src; 
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
});