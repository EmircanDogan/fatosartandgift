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
        const elementVisible = 100; // Element 100px göründüğünde tetikle

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    
    // Sayfa yüklendiğinde ve scroll edildiğinde kontrol et
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 3. Lightbox (Galeri Büyüteç Sistemi)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Görsellere tıklandığında lightbox'ı aç
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            lightbox.classList.add('active');
            lightboxImg.src = e.target.src; // Tıklanan görselin kaynağını modal'a aktar
            document.body.style.overflow = 'hidden'; // Arka plan kaydırmasını kapat
        });
    });

    // Kapatma butonuna tıklandığında lightbox'ı kapat
    closeBtn.addEventListener('click', closeLightbox);

    // Lightbox'ın dışına (siyah alana) tıklandığında kapat
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // ESC tuşu ile kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Arka plan kaydırmasını geri aç
    }
});