document.addEventListener('DOMContentLoaded', function() {
    // Прелоадер
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Переключение темы (светлая/темная)
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }
    
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            }
        });
    }

    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Закрываем мобильное меню при клике на ссылку
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Check which section is currently visible and update nav
    function updateNavigation() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateNavigation);
    
    // Add scroll animation for sections
    const animateElements = document.querySelectorAll('.section');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in view
            if ((elementBottomPosition >= windowTopPosition) && 
                (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('in-view');
            }
        });
    }
    
    // Run check on initial load
    checkIfInView();
    
    // Run check on scroll event
    window.addEventListener('scroll', checkIfInView);

    // Анимация персонажа при смене миниатюры
    const mainGalleryImg = document.getElementById('main-gallery-img');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const characterEyes = document.querySelector('.character-eyes');
    const characterSmile = document.querySelector('.character-smile');
    
    // Смена большой картинки по клику на миниатюру и анимация персонажа
    if (mainGalleryImg && galleryThumbs.length > 0) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const src = this.getAttribute('data-src');
                const mood = this.getAttribute('data-mood');
                
                // Смена изображения с анимацией
                mainGalleryImg.style.opacity = 0;
                setTimeout(() => {
                    mainGalleryImg.src = src;
                    mainGalleryImg.style.opacity = 1;
                }, 300);
                
                // Активация миниатюры
                galleryThumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Анимация персонажа в зависимости от настроения
                if (characterEyes && characterSmile) {
                    // Сброс анимаций
                    characterEyes.className = 'character-eyes';
                    characterSmile.className = 'character-smile';
                    
                    // Добавление новой анимации в зависимости от настроения
                    if (mood === 'day') {
                        characterEyes.classList.add('eyes-happy');
                        characterSmile.classList.add('smile-happy');
                    } else if (mood === 'night') {
                        characterEyes.classList.add('eyes-calm');
                        characterSmile.classList.add('smile-calm');
                    } else if (mood === 'active') {
                        characterEyes.classList.add('eyes-excited');
                        characterSmile.classList.add('smile-excited');
                    } else if (mood === 'calm') {
                        characterEyes.classList.add('eyes-relaxed');
                        characterSmile.classList.add('smile-relaxed');
                    }
                }
            });
        });
        
        // Открытие большой картинки в оверлее
        mainGalleryImg.addEventListener('click', function() {
            const imageOverlay = document.getElementById('image-overlay');
            const overlayImage = document.getElementById('overlay-image');
            
            if (imageOverlay && overlayImage) {
                overlayImage.src = this.src;
                imageOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Закрытие оверлея при клике на крестик
    const closeOverlay = document.querySelector('.close-overlay');
    if (closeOverlay) {
        closeOverlay.addEventListener('click', function() {
            const imageOverlay = document.getElementById('image-overlay');
            if (imageOverlay) {
                imageOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Закрытие оверлея при клике вне картинки
    const imageOverlay = document.getElementById('image-overlay');
    if (imageOverlay) {
        imageOverlay.addEventListener('click', function(e) {
            if (e.target === imageOverlay) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Закрытие оверлея клавишей ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageOverlay && imageOverlay.classList.contains('active')) {
            imageOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Анимация статистики персонажа
    const stats = document.querySelectorAll('.stat-bar span');
    
    function animateStats() {
        stats.forEach(stat => {
            const width = stat.style.width;
            stat.style.width = 0;
            setTimeout(() => {
                stat.style.transition = 'width 1s ease-in-out';
                stat.style.width = width;
            }, 100);
        });
    }
    
    // Запуск анимации статистики при прокрутке к разделу
    const characterSection = document.querySelector('.character-description');
    if (characterSection) {
        const observerOptions = {
            rootMargin: '0px',
            threshold: 0.25
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sectionObserver.observe(characterSection);
    }

    // Визуализация плеера SoundCloud
    const playerVisualization = document.querySelector('.player-visualization');
    const iframeElement = document.getElementById('soundcloud-iframe');
    const scFallback = document.getElementById('sc-fallback');
    
    // Анимация визуализатора
    function animateVisualizer() {
        if (playerVisualization) {
            const spans = playerVisualization.querySelectorAll('span');
            spans.forEach(span => {
                const randomHeight = Math.floor(Math.random() * 100) + '%';
                span.style.height = randomHeight;
            });
        }
    }
    
    // Запуск анимации визуализатора
    let visualizerInterval;
    
    function startVisualizer() {
        if (!visualizerInterval) {
            visualizerInterval = setInterval(animateVisualizer, 300);
        }
    }
    
    function stopVisualizer() {
        if (visualizerInterval) {
            clearInterval(visualizerInterval);
            visualizerInterval = null;
            
            if (playerVisualization) {
                const spans = playerVisualization.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.height = '10%';
                });
            }
        }
    }
    
    // Интеграция с SoundCloud API
    if (iframeElement) {
        iframeElement.addEventListener('error', function() {
            this.style.display = 'none';
            if (scFallback) {
                scFallback.style.display = 'flex';
            }
        });
        
        // Проверка доступности SoundCloud через загрузку iframe
        setTimeout(function() {
            try {
                if (iframeElement.contentDocument === null || 
                    iframeElement.contentDocument.body.innerHTML === '') {
                    iframeElement.style.display = 'none';
                    if (scFallback) {
                        scFallback.style.display = 'flex';
                    }
                }
            } catch (e) {
                // Cross-origin error handling
                console.log('Cannot access iframe content - possible cross-origin restriction');
            }
        }, 3000);
        
        // Интеграция с SoundCloud API
        try {
            window.onSCAPIReady = function() {
                if (window.SC) {
                    const widget = SC.Widget(iframeElement);
                    
                    widget.bind(SC.Widget.Events.PLAY, function() {
                        startVisualizer();
                    });
                    
                    widget.bind(SC.Widget.Events.PAUSE, function() {
                        stopVisualizer();
                    });
                    
                    widget.bind(SC.Widget.Events.FINISH, function() {
                        stopVisualizer();
                    });
                }
            };
        } catch (e) {
            console.error('SoundCloud API not available', e);
        }
    }
    
    // Управление видео
    const videoElement = document.querySelector('.featured-video');
    const playBtn = document.querySelector('.play-btn');
    
    if (videoElement && playBtn) {
        playBtn.addEventListener('click', function() {
            if (videoElement.paused) {
                videoElement.play();
                playBtn.querySelector('i').classList.remove('fa-play');
                playBtn.querySelector('i').classList.add('fa-pause');
            } else {
                videoElement.pause();
                playBtn.querySelector('i').classList.remove('fa-pause');
                playBtn.querySelector('i').classList.add('fa-play');
            }
        });
    }
    
    // Отправка формы контактов
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('form-success-modal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Имитация отправки формы
            const formData = new FormData(this);
            console.log('Форма отправлена:', Object.fromEntries(formData));
            
            // Очистка формы
            this.reset();
            
            // Показ модального окна успеха
            if (successModal) {
                successModal.classList.add('active');
            }
        });
    }
    
    // Закрытие модального окна успеха
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    if (closeModal && successModal) {
        closeModal.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }
    
    if (modalBtn && successModal) {
        modalBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }
    
    // Анимация скролла к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Анимация индикатора скролла
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('.section');
            if (firstSection) {
                window.scrollTo({
                    top: firstSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Скрытие индикатора при скролле
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }
    
    // Инициализация GSAP анимаций, если библиотека доступна
    if (typeof gsap !== 'undefined') {
        // Анимация заголовка при загрузке
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5
        });
        
        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.8
        });
        
        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1
        });
    }
}); 