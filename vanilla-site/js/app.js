/**
 * ========================================
 * QUICK RED TECH - MAIN APPLICATION
 * Premium Interactive Experience
 * Vanilla JavaScript + GSAP + Three.js + Lenis
 * ========================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    CustomCursor.init();
    Navigation.init();
    ThreeBackground.init();
    GSAPAnimations.init();
    LenisScroll.init();
    DynamicContent.init();
    Interactions.init();
});

/**
 * ========================================
 * PRELOADER MODULE
 * Handles initial page load animation
 * ========================================
 */
const Preloader = {
    init() {
        this.preloader = document.getElementById('preloader');
        this.progressBar = document.querySelector('.preloader-progress');
        this.animate();
    },

    animate() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.hide();
            }
            this.progressBar.style.width = `${progress}%`;
        }, 100);
    },

    hide() {
        setTimeout(() => {
            this.preloader.classList.add('hidden');
            // Trigger hero animations after preloader
            this.triggerHeroAnimations();
        }, 500);
    },

    triggerHeroAnimations() {
        const elements = document.querySelectorAll('#home .opacity-0');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
};

/**
 * ========================================
 * CUSTOM CURSOR MODULE
 * Interactive cursor with magnetic effect
 * ========================================
 */
const CustomCursor = {
    init() {
        if (window.innerWidth < 768) return; // Disable on mobile

        this.cursor = document.getElementById('cursor');
        this.cursorDot = document.getElementById('cursor-dot');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;

        this.addEventListeners();
        this.animate();
    },

    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursor.style.borderColor = '#ff3b3b';
                this.cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.style.borderColor = '#ff3b3b';
                this.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    },

    animate() {
        // Smooth follow using linear interpolation
        this.cursorX += (this.mouseX - this.cursorX) * 0.1;
        this.cursorY += (this.mouseY - this.cursorY) * 0.1;

        this.cursor.style.left = `${this.cursorX}px`;
        this.cursor.style.top = `${this.cursorY}px`;
        
        this.cursorDot.style.left = `${this.mouseX}px`;
        this.cursorDot.style.top = `${this.mouseY}px`;

        requestAnimationFrame(() => this.animate());
    }
};

/**
 * ========================================
 * NAVIGATION MODULE
 * Handles navbar behavior and mobile menu
 * ========================================
 */
const Navigation = {
    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileBtn = document.getElementById('mobile-menu-btn');
        this.mobileNav = document.getElementById('mobile-nav');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        this.addEventListeners();
        this.setupActiveState();
    },

    addEventListeners() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        this.mobileBtn.addEventListener('click', () => {
            this.mobileNav.classList.toggle('hidden');
        });

        // Close mobile nav on link click
        this.mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileNav.classList.add('hidden');
            });
        });

        // Active indicator on hover
        this.navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const indicator = link.querySelector('.nav-indicator');
                if (indicator) {
                    indicator.style.width = '100%';
                }
            });
            link.addEventListener('mouseleave', () => {
                const indicator = link.querySelector('.nav-indicator');
                if (indicator && !link.classList.contains('active')) {
                    indicator.style.width = '0';
                }
            });
        });
    },

    setupActiveState() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                    const indicator = link.querySelector('.nav-indicator');
                    if (indicator) {
                        indicator.style.width = '100%';
                    }
                } else {
                    const indicator = link.querySelector('.nav-indicator');
                    if (indicator) {
                        indicator.style.width = '0';
                    }
                }
            });
        });
    }
};

/**
 * ========================================
 * THREE.JS BACKGROUND MODULE
 * Interactive particle system
 * ========================================
 */
const ThreeBackground = {
    init() {
        this.canvas = document.getElementById('bg-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;

        this.setup();
        this.addEventListeners();
        this.animate();
    },

    setup() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;

        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 200;
            colors[i] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.5,
            color: 0xff3b3b,
            transparent: true,
            opacity: 0.8,
            vertexColors: false
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);

        // Add floating geometric shapes
        this.addFloatingShapes();
    },

    addFloatingShapes() {
        // Create floating icosahedrons
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff3b3b,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });

        for (let i = 0; i < 5; i++) {
            const shape = new THREE.Mesh(geometry, material);
            shape.position.x = (Math.random() - 0.5) * 100;
            shape.position.y = (Math.random() - 0.5) * 100;
            shape.position.z = (Math.random() - 0.5) * 50;
            shape.rotationSpeed = {
                x: Math.random() * 0.01,
                y: Math.random() * 0.01
            };
            this.scene.add(shape);
            this.floatingShapes = this.floatingShapes || [];
            this.floatingShapes.push(shape);
        }
    },

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    },

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.0005;
            
            // Mouse interaction
            this.particles.rotation.x += this.mouseY * 0.0005;
            this.particles.rotation.y += this.mouseX * 0.0005;
        }

        // Animate floating shapes
        if (this.floatingShapes) {
            this.floatingShapes.forEach(shape => {
                shape.rotation.x += shape.rotationSpeed.x;
                shape.rotation.y += shape.rotationSpeed.y;
            });
        }

        this.renderer.render(this.scene, this.camera);
    }
};

/**
 * ========================================
 * GSAP ANIMATIONS MODULE
 * Scroll-triggered animations
 * ========================================
 */
const GSAPAnimations = {
    init() {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        this.setupRevealAnimations();
        this.setupParallaxEffects();
        this.setupStaggerAnimations();
        this.setupCounterAnimations();
    },

    setupRevealAnimations() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        
        elements.forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                onComplete: () => el.classList.add('revealed')
            });
        });
    },

    setupParallaxEffects() {
        // Parallax for hero elements
        gsap.to('.hero-badge', {
            scrollTrigger: {
                trigger: '#home',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 100,
            opacity: 0
        });

        // Floating cards parallax
        gsap.utils.toArray('[data-hover-effect]').forEach(card => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -30,
                ease: 'none'
            });
        });
    },

    setupStaggerAnimations() {
        // Project cards stagger
        gsap.from('#projects-grid > *', {
            scrollTrigger: {
                trigger: '#projects-grid',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Core values stagger
        gsap.from('#core-values-grid > *', {
            scrollTrigger: {
                trigger: '#core-values-grid',
                start: 'top 80%'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });

        // Timeline items
        gsap.from('#timeline-container > *', {
            scrollTrigger: {
                trigger: '#timeline-container',
                start: 'top 75%'
            },
            x: (i) => (i % 2 === 0 ? -50 : 50),
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
        });
    },

    setupCounterAnimations() {
        // Animate numbers when they come into view
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        innerText: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerText: 1 }
                    });
                }
            });
        });
    }
};

/**
 * ========================================
 * LENIS SMOOTH SCROLL MODULE
 * Premium smooth scrolling
 * ========================================
 */
const LenisScroll = {
    init() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false
        });

        this.addEventListeners();
    },

    addEventListeners() {
        function raf(time) {
            LenisScroll.lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Sync with GSAP ScrollTrigger
        LenisScroll.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            LenisScroll.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }
};

/**
 * ========================================
 * DYNAMIC CONTENT MODULE
 * Loads projects, news, and other content
 * ========================================
 */
const DynamicContent = {
    async init() {
        await this.loadProjects();
        this.loadCoreValues();
        this.loadTimeline();
        this.loadNews();
        this.loadCEOContent();
        this.loadSocialLinks();
    },

    async loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        
        const projects = [
            {
                name: 'StackCheckMate',
                description: 'Universal environment automation tool. Automate virtual environments, dependency pinning, and reproducible builds across all languages.',
                tech: ['Go', 'YAML', 'CLI'],
                githubUrl: 'https://github.com/QRTQuick/stackcheckmate',
                featured: true
            },
            {
                name: 'D-Red-Bot',
                description: 'Windows-native system utility for low-level diagnostics, memory intelligence, and automated maintenance tasks.',
                tech: ['C++', 'Win32 API'],
                githubUrl: 'https://github.com/QRTQuick/D-Red-Bot'
            },
            {
                name: 'Shinpuru-Sachi',
                description: 'Lightweight terminal browser for fast web searches, link previews, and bookmarks directly from the command line.',
                tech: ['Python', 'TUI'],
                githubUrl: 'https://github.com/QRTQuick/Shinpuru-Sachi'
            }
        ];

        // Try to fetch from GitHub API
        try {
            const response = await fetch('https://api.github.com/users/QRTQuick/repos');
            if (response.ok) {
                const repos = await response.json();
                if (Array.isArray(repos)) {
                    this.renderProjects(repos.slice(0, 6), projectsGrid);
                    return;
                }
            }
        } catch (error) {
            console.log('Using fallback projects data');
        }

        // Fallback to static data
        this.renderProjects(projects, projectsGrid);
    },

    renderProjects(projects, container) {
        container.innerHTML = projects.map(project => `
            <div class="glass-card p-8 group hover:border-brand-red/50 hover:shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-300 project-card relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative z-10 flex flex-col justify-between h-full">
                    <div>
                        <div class="flex items-center justify-between mb-6">
                            <div class="p-2 bg-white/5 rounded-lg">
                                <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div class="flex items-center gap-2 text-xs font-mono text-brand-silver/40">
                                <svg class="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                                ${project.language || project.tech?.[0] || 'Native'}
                            </div>
                        </div>
                        <h2 class="text-2xl font-bold mb-3 group-hover:text-brand-red transition-colors">${project.name}</h2>
                        <p class="text-brand-silver/60 text-sm leading-relaxed mb-8">
                            ${project.description || 'A high-performance utility built for developers.'}
                        </p>
                    </div>

                    <div class="flex items-center justify-between pt-6 border-t border-white/5">
                        <a href="${project.githubUrl}" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-brand-red transition-colors">
                            VIEW ON GITHUB
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.24-.796-1.065-3.221.261-6.264 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.326 3.044-.497 5.468.258 6.264.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        ${project.stargazers_count ? `<div class="flex items-center gap-1 text-xs font-mono text-brand-silver/60">
                            <svg class="w-3 h-3 text-brand-red" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            ${project.stargazers_count}
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    },

    loadCoreValues() {
        const container = document.getElementById('core-values-grid');
        const values = [
            {
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
                title: 'Speed & Efficiency',
                description: 'We build tools that are lightweight and lightning-fast, ensuring developers never have to wait on their software.'
            },
            {
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>',
                title: 'Privacy First',
                description: 'Your data is yours. Our tools are designed with a privacy-first mindset, prioritizing local execution and data sovereignty.'
            },
            {
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>',
                title: 'Developer Ergonomics',
                description: 'We focus on the human element of engineering, creating intuitive interfaces for complex system-level tasks.'
            },
            {
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>',
                title: 'System Mastery',
                description: 'We thrive at the low-level, mastering the interactions between software and hardware to deliver peak performance.'
            }
        ];

        container.innerHTML = values.map(value => `
            <div class="glass-card p-8 hover:border-brand-red/50 hover:shadow-[0_0_30px_rgba(255,0,0,0.1)] transition-all duration-300 group">
                <div class="mb-6 transform group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${value.icon}
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">${value.title}</h3>
                <p class="text-brand-silver/50 text-sm leading-relaxed">${value.description}</p>
            </div>
        `).join('');
    },

    loadTimeline() {
        const container = document.getElementById('timeline-container');
        const milestones = [
            {
                year: 'August 12, 2024',
                title: 'Foundation',
                description: 'Quick Red Tech was founded by Chisom Life Eke with a vision to simplify complex developer workflows and enhance system security.'
            },
            {
                year: '2025',
                title: 'Public Launch',
                description: 'The organization officially started its publicity, sharing its mission and tools with the global developer community.'
            },
            {
                year: '2025',
                title: 'First Major Release',
                description: 'Launch of Shinpuru Sachi, a project focused on simplicity and efficiency for public use.'
            },
            {
                year: '2026',
                title: 'Expansion',
                description: 'Growing the ecosystem with StackCheckMate and D-Red-Bot, focusing on high-performance automation.'
            }
        ];

        container.innerHTML = milestones.map((m, i) => `
            <div class="flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}">
                <div class="flex-1 text-center md:text-${i % 2 === 0 ? 'right' : 'left'}">
                    <span class="text-brand-red font-mono text-2xl font-bold">${m.year}</span>
                    <h4 class="text-xl font-bold mt-2">${m.title}</h4>
                    <p class="text-brand-silver/50 mt-2 max-w-md mx-auto md:mx-0">${m.description}</p>
                </div>
                <div class="w-4 h-4 rounded-full bg-brand-red relative z-10 shadow-[0_0_15px_rgba(255,0,0,0.5)]"></div>
                <div class="flex-1"></div>
            </div>
        `).join('');
    },

    loadNews() {
        const container = document.getElementById('news-grid');
        const news = [
            {
                title: 'Shinpuru Sachi: Performance Overhaul',
                date: 'March 15, 2026',
                excerpt: 'Major updates have been pushed to the Shinpuru Sachi core. We\'ve achieved significant performance gains in file processing and indexing.'
            },
            {
                title: 'StackCheckMate v2.0 Roadmap',
                date: 'March 10, 2026',
                excerpt: 'We\'re planning a major overhaul of our environment automation tool with better support for containerized workflows.'
            },
            {
                title: 'Internal Performance Audit',
                date: 'March 05, 2026',
                excerpt: 'Our latest audit shows a 15% reduction in memory overhead across all our CLI utilities.'
            }
        ];

        container.innerHTML = news.map(item => `
            <div class="glass-card p-8 group hover:border-brand-red/50 transition-all">
                <div class="flex items-center gap-2 text-brand-silver/40 text-xs font-mono uppercase mb-4">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    ${item.date}
                </div>
                <h3 class="text-2xl font-bold mb-4 group-hover:text-brand-red transition-colors uppercase tracking-tighter">${item.title}</h3>
                <p class="text-brand-silver/60 mb-6">${item.excerpt}</p>
                <div class="text-brand-red text-sm font-bold flex items-center gap-2 cursor-pointer hover:gap-4 transition-all">
                    READ MORE
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </div>
            </div>
        `).join('');
    },

    loadCEOContent() {
        const container = document.getElementById('ceo-cards');
        const cards = [
            {
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
                title: 'The Vision',
                description: '"I envision a future where routine developer work is reliably automated by tools that are predictable, transparent, and respectful of developer intent."'
            },
            {
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
                title: 'The Mission',
                description: 'To deliver practical, privacy-first developer tools and automation systems that scale. We combine careful engineering with human-centered product design.'
            },
            {
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>',
                title: 'The Philosophy',
                description: 'Pragmatism over hype. We ship solutions that solve real problems—not hypothetical ones. If it doesn\'t make a developer faster, we don\'t build it.'
            }
        ];

        container.innerHTML = cards.map(card => `
            <div class="glass-card p-8">
                <svg class="w-10 h-10 text-brand-red mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${card.icon}
                </svg>
                <h3 class="text-2xl font-bold mb-4">${card.title}</h3>
                <p class="text-brand-silver/60 leading-relaxed">${card.description}</p>
            </div>
        `).join('');

        // CEO Image Container Animation
        const imageContainer = document.getElementById('ceo-image-container');
        if (imageContainer) {
            imageContainer.innerHTML = `
                <div class="absolute inset-0 z-0">
                    <div class="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-transparent opacity-40"></div>
                    <div class="absolute inset-0 grid-pattern opacity-50"></div>
                </div>
                <div class="absolute left-0 right-0 h-[2px] bg-brand-red/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20 pointer-events-none" style="animation: scan 4s linear infinite;"></div>
                <div class="relative z-10 w-full h-full p-12" style="animation: float 10s ease-in-out infinite;">
                    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
                         alt="Digital Core Representation" 
                         class="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                         referrerPolicy="no-referrer">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-32 h-32 border border-brand-red/30 rounded-full animate-ping opacity-20"></div>
                        <div class="absolute w-48 h-48 border border-brand-red/10 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div class="absolute bottom-8 left-8 right-8 p-6 glass-card bg-brand-dark/80 z-30 backdrop-blur-lg border-white/10 group-hover:border-brand-red/30 transition-colors">
                    <p class="text-sm font-mono text-brand-red mb-2 uppercase tracking-widest">Current Focus</p>
                    <p class="text-lg font-bold">High-performance developer automation & system utilities.</p>
                </div>
            `;
        }
    },

    loadSocialLinks() {
        const socialLinks = [
            { name: 'TikTok', url: 'https://www.tiktok.com/@shinpuru_sachi', icon: 'M22.16 7.89c-1.5-.66-2.93-1.74-4.06-3.06-.6-.7-1.07-1.49-1.38-2.35h-3.92v10.9c0 2.48-2.02 4.5-4.5 4.5s-4.5-2.02-4.5-4.5 2.02-4.5 4.5-4.5c.34 0 .67.04.99.11v-3.9C8.53 4.71 7.78 4.5 7 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5V9.2c1.69 1.97 4.07 3.35 6.75 3.79V7.89z' },
            { name: 'Instagram', url: 'https://www.instagram.com/quick_red_tech/', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z' },
            { name: 'YouTube', url: 'https://www.youtube.com/@QuickRedTechTips-x', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
            { name: 'WhatsApp', url: 'https://wa.me/2347062423270', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
            { name: 'GitHub', url: 'https://github.com/QRTQuick', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.24-.796-1.065-3.221.261-6.264 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.326 3.044-.497 5.468.258 6.264.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' }
        ];

        const container = document.getElementById('social-links');
        if (container) {
            container.innerHTML = socialLinks.map(social => `
                <a href="${social.url}" target="_blank" class="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-brand-red/10 transition-colors group">
                    <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-brand-red" fill="currentColor" viewBox="0 0 24 24">
                            <path d="${social.icon}"/>
                        </svg>
                        <span class="font-bold">${social.name}</span>
                    </div>
                    <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            `).join('');
        }

        // Footer socials
        const footerSocials = document.getElementById('footer-socials');
        if (footerSocials) {
            footerSocials.innerHTML = socialLinks.slice(0, 5).map(social => `
                <a href="${social.url}" target="_blank" class="text-brand-silver/60 hover:text-brand-red transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="${social.icon}"/>
                    </svg>
                </a>
            `).join('');
        }
    }
};

/**
 * ========================================
 * INTERACTIONS MODULE
 * Button clicks, hover effects, etc.
 * ========================================
 */
const Interactions = {
    init() {
        this.setupStayUpdated();
        this.setupMagneticButtons();
        this.setupSmoothScroll();
    },

    setupStayUpdated() {
        const btn = document.getElementById('stay-updated-btn');
        if (!btn) return;

        btn.addEventListener('click', async () => {
            // Request notification permission
            if ('Notification' in window) {
                try {
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                        new Notification('Quick Red Tech', {
                            body: 'Notifications enabled! We\'ll alert you when Luvon-Sachi launches.',
                        });
                    }
                } catch (err) {
                    console.error('Notification permission error:', err);
                }
            }

            // Create and download ICS calendar event
            const event = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Quick Red Tech//Luvon-Sachi//EN',
                'BEGIN:VEVENT',
                'UID:' + Date.now() + '@quickredtech.com',
                'DTSTAMP:20260318T112500Z',
                'DTSTART:20260529T090000Z',
                'DTEND:20260529T100000Z',
                'SUMMARY:Luvon-Sachi Launch - Quick Red Tech',
                'DESCRIPTION:Official launch of the Luvon-Sachi advanced project initialization tool.',
                'LOCATION:https://quickredtech.com',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'luvon-sachi-launch.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Update button state
            const originalContent = btn.innerHTML;
            btn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                CALENDAR UPDATED
            `;
            btn.classList.add('bg-emerald-600', 'border-emerald-500');
            
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.classList.remove('bg-emerald-600', 'border-emerald-500');
            }, 5000);
        });
    },

    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    },

    setupSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    }
};

// Add scan animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes scan {
        0% { top: 0%; }
        100% { top: 100%; }
    }
`;
document.head.appendChild(style);
