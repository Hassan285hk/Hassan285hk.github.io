// =========================================================================
// PREMIUM FUTURE PORTFOLIO CONTROLLER (2026 EDITION)
// Features: Boot Loader, Custom Snapping Cursor, GSAP ScrollTrigger,
//           Command Palette, Theme Engine, Live GitHub API, Confetti Comms
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. BOOT LOADER & SYSTEM INITIALIZATION ---
    const loadingLogs = document.getElementById("loading-logs");
    const loadingProgress = document.getElementById("loading-progress");
    const neonBtn = document.getElementById("neon-button");
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.querySelector("main");
    const navbar = document.getElementById("navbar");

    const bootSteps = [
        "Connecting to hassan285hk.github.io...",
        "Establishing quantum handshakes...",
        "Syncing visual rendering engines... [OK]",
        "Loading interactive bento grid frameworks... [OK]",
        "Injecting dynamic typography modules... [OK]",
        "Resolving GitHub API server bridges... [OK]",
        "Calibrating Aurora magnetic fields... [OK]",
        "System diagnostics: 100% Operational.",
        "Awaiting authorization key..."
    ];

    let currentStep = 0;
    let progressVal = 0;

    const printLogs = () => {
        if (currentStep < bootSteps.length) {
            const logLine = document.createElement("p");
            logLine.className = "log-line";
            logLine.textContent = `> ${bootSteps[currentStep]}`;
            loadingLogs.appendChild(logLine);
            loadingLogs.scrollTop = loadingLogs.scrollHeight;
            
            // Progress Bar simulation
            progressVal += 100 / bootSteps.length;
            loadingProgress.style.width = `${Math.min(progressVal, 100)}%`;

            currentStep++;
            setTimeout(printLogs, 450 + Math.random() * 200);
        } else {
            // Enable boot button
            neonBtn.classList.remove("disabled");
            neonBtn.removeAttribute("disabled");
            neonBtn.textContent = "INITIALIZE PROTOCOL";
        }
    };

    // Begin log sequence
    setTimeout(printLogs, 500);

    // Click Boot Button to unlock site
    neonBtn.addEventListener("click", () => {
        // Fade out splash
        introScreen.style.opacity = "0";
        setTimeout(() => {
            introScreen.style.display = "none";
            
            // Show main layout
            mainContent.style.opacity = "1";
            mainContent.style.transform = "translateY(0)";
            navbar.style.opacity = "1";
            navbar.style.transform = "translateX(-50%) translateY(0)";

            // Trigger GSAP entrance animations
            triggerEntranceAnimations();
            
            // Recalculate ScrollTrigger positioning
            ScrollTrigger.refresh();

        }, 800);
    });


    // --- 2. MULTI-THEME ENGINE ---
    const themeBtn = document.getElementById("theme-toggle-btn");
    const sunIcon = themeBtn.querySelector(".sun-icon");
    const moonIcon = themeBtn.querySelector(".moon-icon");
    
    // Check saved theme or system default
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    updateThemeIcons(savedTheme);

    themeBtn.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.body.setAttribute("data-theme", nextTheme);
        localStorage.setItem("portfolio-theme", nextTheme);
        updateThemeIcons(nextTheme);

        // Quick alert toast
        showToast(`Aesthetic set to: ${nextTheme.toUpperCase()}`);
    });

    function updateThemeIcons(theme) {
        if (theme === "dark") {
            sunIcon.style.display = "block";
            moonIcon.style.display = "none";
        } else {
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
        }
    }


    // --- 3. CUSTOM CURSOR WITH LERP & MAGNETIC SNAPPING ---
    const cursor = document.getElementById("custom-cursor");
    const trail = document.getElementById("cursor-trail");
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;
    let currentScale = 1;
    let isSnapped = false;
    let snapTarget = null;

    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Loop using requestAnimationFrame
        const tickCursor = () => {
            if (isSnapped && snapTarget) {
                // Snap custom cursor tightly around the button bounds
                const rect = snapTarget.getBoundingClientRect();
                const centerBtnX = rect.left + rect.width / 2;
                const centerBtnY = rect.top + rect.height / 2;
                
                // Pull cursor toward target center with slight LERP
                trailX += (centerBtnX - trailX) * 0.25;
                trailY += (centerBtnY - trailY) * 0.25;
                
                cursor.style.left = `${trailX}px`;
                cursor.style.top = `${trailY}px`;
                cursor.classList.add("snapped");
            } else {
                cursor.classList.remove("snapped");
                // Normal LERP follow
                // Cursor dot goes immediate
                cursor.style.left = `${mouseX}px`;
                cursor.style.top = `${mouseY}px`;
                
                // Trail circle follows with lag
                trailX += (mouseX - trailX) * 0.12;
                trailY += (mouseY - trailY) * 0.12;
                
                trail.style.left = `${trailX}px`;
                trail.style.top = `${trailY}px`;
            }

            requestAnimationFrame(tickCursor);
        };
        tickCursor();

        // Magnetic Snapping and Scaling listeners
        const interactiveElements = document.querySelectorAll(
            "a, button, .coordinate-item, .filter-btn, .certificate-card, .project-card, .bento-box"
        );

        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", (e) => {
                document.body.classList.add("cursor-hover");
                
                // Snapping validation
                if (el.classList.contains("magnetic-btn") || el.classList.contains("icon-btn")) {
                    isSnapped = true;
                    snapTarget = el;
                }
            });

            el.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
                isSnapped = false;
                snapTarget = null;
            });

            // Magnetic Pull physical movement
            if (el.classList.contains("magnetic-btn") || el.classList.contains("icon-btn")) {
                el.addEventListener("mousemove", (e) => {
                    const rect = el.getBoundingClientRect();
                    const elX = rect.left + rect.width / 2;
                    const elY = rect.top + rect.height / 2;
                    
                    // Compute pull offsets
                    const xPull = (e.clientX - elX) * 0.35;
                    const yPull = (e.clientY - elY) * 0.35;
                    
                    gsap.to(el, {
                        x: xPull,
                        y: yPull,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                el.addEventListener("mouseleave", () => {
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            }
        });
    } else {
        // Disable custom cursors entirely on touch displays
        if (cursor) cursor.style.display = "none";
        if (trail) trail.style.display = "none";
    }


    // --- 4. NAVIGATION BAR BEHAVIOR ---
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        // Hide/Show navbar based on scroll direction
        if (window.scrollY > 150) {
            if (window.scrollY > lastScrollY) {
                navbar.classList.add("nav-hidden");
            } else {
                navbar.classList.remove("nav-hidden");
            }
        } else {
            navbar.classList.remove("nav-hidden");
        }
        
        lastScrollY = window.scrollY;
        
        // Scroll Progress Bar Update
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-progress-bar").style.width = scrolled + "%";
    });

    // Mobile Hamburger Menu Trigger
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileBtn.addEventListener("click", () => {
        mobileBtn.classList.toggle("open");
        mobileMenu.classList.toggle("open");
    });

    // Close mobile menu on clicking nav link
    document.querySelectorAll(".mobile-nav-item").forEach(link => {
        link.addEventListener("click", () => {
            mobileBtn.classList.remove("open");
            mobileMenu.classList.remove("open");
        });
    });


    // --- 5. DYNAMIC SCROLLSPY ---
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll("section");

    const scrollSpy = () => {
        let currentSectionId = "hero";
        
        sections.forEach(sec => {
            const top = sec.offsetTop - 180;
            const height = sec.offsetHeight;
            const scrollPos = window.scrollY;
            
            if (scrollPos >= top && scrollPos < top + height) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollSpy);


    // --- 6. GSAP SCROLL-TRIGGERED ANIMATIONS ---
    function triggerEntranceAnimations() {
        // Hero section intro staggers
        const heroTl = gsap.timeline();
        heroTl.from("#hero .badge-container", { y: -30, opacity: 0, duration: 0.6, ease: "power3.out" })
              .from("#hero .title", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
              .from("#hero .role-anim", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.5")
              .from("#hero .description", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
              .from("#hero .hero-actions", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
              .from("#hero .hero-social-strip", { opacity: 0, duration: 0.5 }, "-=0.3")
              .from("#hero .hero-graphic", { scale: 0.9, opacity: 0, duration: 1, ease: "power2.out" }, "-=1")
              .from("#hero .node", { scale: 0, opacity: 0, stagger: 0.15, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5");

        // Stagger Scroll Animations across other sections
        sections.forEach(section => {
            if (section.getAttribute("id") === "hero") return;

            const sectionTitle = section.querySelector(".section-title");
            const revealItems = section.querySelectorAll(".glass-panel, .timeline-item, .project-card, .certificate-card");

            if (sectionTitle) {
                gsap.from(sectionTitle, {
                    scrollTrigger: {
                        trigger: sectionTitle,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            }

            if (revealItems.length > 0) {
                gsap.from(revealItems, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        toggleActions: "play none none none"
                    },
                    y: 50,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });

        // About Stats Counter Engine Trigger
        const counters = document.querySelectorAll(".counter-number");
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            
            gsap.fromTo(counter, 
                { textContent: 0 },
                {
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%",
                    },
                    textContent: target,
                    duration: 2,
                    snap: { textContent: 1 },
                    ease: "power1.out",
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(counter.textContent);
                    }
                }
            );
        });

        // Timeline Node-Lighting & Timeline-Bar Fill Animation
        const timelineItems = document.querySelectorAll(".timeline-item");
        timelineItems.forEach(item => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 70%",
                    onEnter: () => item.classList.add("active-node"),
                    onLeaveBack: () => item.classList.remove("active-node")
                }
            });
        });
    }


    // --- 7. INTERACTIVE SKILL CARDS AND BENTO GRIDS ---
    const progressFills = document.querySelectorAll(".progress-fill");
    progressFills.forEach(fill => {
        gsap.to(fill, {
            scrollTrigger: {
                trigger: fill,
                start: "top 90%"
            },
            width: fill.getAttribute("data-width"),
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // 3D Tilt reflection/rotate logic (updated and optimized)
    const tiltCards = document.querySelectorAll(".tilt-card");
    if (!isTouchDevice) {
        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.02,
                    duration: 0.15,
                    overwrite: "auto",
                    ease: "power1.out"
                });

                // Move overlay for sheen effect
                const overlay = card.querySelector(".image-overlay");
                if (overlay) {
                    const sheenX = ((x / rect.width) * 100) - 50;
                    const sheenY = ((y / rect.height) * 100) - 50;
                    overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;
                }
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });

                const overlay = card.querySelector(".image-overlay");
                if (overlay) {
                    overlay.style.background = "linear-gradient(to top, rgba(var(--secondary-rgb), 0.3) 0%, transparent 100%)";
                }
            });
        });
    }


    // --- 8. TYPING ROLES ANIMATOR ---
    const typingText = document.getElementById("typing-text");
    const roles = [
        "Senior Software Engineer",
        "AI & Machine Learning Developer",
        "Creative UI/UX Designer",
        "Flutter Architect"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const runTypingLoop = () => {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            // Wait at final word
            isDeleting = true;
            typeSpeed = 2000; // Freeze delay
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(runTypingLoop, typeSpeed);
    };

    if (typingText) {
        setTimeout(runTypingLoop, 1500);
    }


    // --- 9. DYNAMIC PROJECT TAB FILTER ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".filter-item");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active states
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            // Hide/Show items using GSAP for smooth scale animation
            projectItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "flex";
                    gsap.fromTo(item, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
                } else {
                    gsap.to(item, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            item.style.display = "none";
                        }
                    });
                }
            });
        });
    });


    // --- 10. DYNAMIC GITHUB API LOADER ---
    const reposContainer = document.getElementById("repos-container");
    const repoCountEl = document.getElementById("git-repos-count");
    const repoStarsEl = document.getElementById("git-stars-count");
    const repoFollowersEl = document.getElementById("git-followers-count");

    // Static fallback items in case API is throttled or fails
    const staticRepos = [
        {
            name: "Aura-Neural-Studio",
            description: "Deep learning interface for neural style transfer and computer vision filters.",
            language: "Python",
            stars: 12,
            forks: 4,
            html_url: "https://github.com/Hassan285hk"
        },
        {
            name: "Flutter-Robotic-Sync",
            description: "Android/iOS app interface supporting serial Bluetooth links for Arduino control.",
            language: "Dart",
            stars: 8,
            forks: 2,
            html_url: "https://github.com/Hassan285hk"
        },
        {
            name: "Gravity-Physics-WebGL",
            description: "A custom gravitational particle simulation portal utilizing Three.js and shader vectors.",
            language: "JavaScript",
            stars: 14,
            forks: 3,
            html_url: "https://github.com/Hassan285hk"
        }
    ];

    const loadStaticRepos = () => {
        reposContainer.innerHTML = "";
        staticRepos.forEach(repo => {
            const card = createRepoCard(repo);
            reposContainer.appendChild(card);
        });
    };

    const createRepoCard = (repo) => {
        const langColors = {
            "Python": "#3572A5",
            "Dart": "#00B4AB",
            "JavaScript": "#f1e05a",
            "C++": "#f34b7d",
            "HTML": "#e34c26"
        };
        const dotColor = langColors[repo.language] || "#fff";

        const card = document.createElement("a");
        card.href = repo.html_url;
        card.target = "_blank";
        card.className = "repo-card glass-panel";
        card.innerHTML = `
            <div class="repo-name-row">
                <i data-lucide="folder"></i>
                <span class="repo-name">${repo.name}</span>
            </div>
            <p class="repo-description">${repo.description || "No description provided."}</p>
            <div class="repo-meta">
                <div class="repo-meta-left">
                    <span class="repo-stat">
                        <span class="repo-lang-dot" style="background-color: ${dotColor}"></span>
                        <span>${repo.language || "Unknown"}</span>
                    </span>
                </div>
                <div class="repo-meta-right">
                    <span class="repo-stat"><i data-lucide="star"></i> ${repo.stars}</span>
                    <span class="repo-stat"><i data-lucide="git-fork"></i> ${repo.forks}</span>
                </div>
            </div>
        `;
        return card;
    };

    // Live API fetch
    const fetchGitHubData = async () => {
        try {
            const userRes = await fetch("https://api.github.com/users/Hassan285hk");
            if (!userRes.ok) throw new Error("Throttled");
            const userData = await userRes.json();
            
            // Populate stats
            repoCountEl.textContent = userData.public_repos;
            repoFollowersEl.textContent = userData.followers;

            const reposRes = await fetch("https://api.github.com/users/Hassan285hk/repos?sort=updated&per_page=6");
            if (!reposRes.ok) throw new Error("Throttled");
            const repos = await reposRes.json();

            // Calculate total stars
            let totalStars = 0;
            reposContainer.innerHTML = "";
            
            // Filter and print repos
            const filteredRepos = repos.filter(r => !r.fork).slice(0, 3);
            
            filteredRepos.forEach(repo => {
                totalStars += repo.stargazers_count;
                const repoObj = {
                    name: repo.name,
                    description: repo.description,
                    language: repo.language,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    html_url: repo.html_url
                };
                reposContainer.appendChild(createRepoCard(repoObj));
            });

            repoStarsEl.textContent = totalStars || 24; // fallback stars count
            
            // Re-bind Lucide icons for the newly injected dynamic HTML
            lucide.createIcons();

        } catch (err) {
            console.warn("GitHub API limit exceeded or network down, falling back to static database.");
            loadStaticRepos();
            lucide.createIcons();
        }
    };

    fetchGitHubData();


    // --- 11. COMMAND PALETTE (CTRL + K) CONTROLLER ---
    const palette = document.getElementById("command-palette");
    const paletteInput = document.getElementById("palette-search");
    const paletteResults = document.getElementById("palette-results");
    let activeIdx = 0;

    const commandsList = [
        { text: "Scroll to Home", icon: "home", category: "Navigation", action: () => scrollToSection("hero") },
        { text: "Scroll to About Logs", icon: "user", category: "Navigation", action: () => scrollToSection("about") },
        { text: "Scroll to Skills Bento", icon: "cpu", category: "Navigation", action: () => scrollToSection("skills") },
        { text: "Scroll to Experience Timeline", icon: "briefcase", category: "Navigation", action: () => scrollToSection("experience") },
        { text: "Scroll to Active Projects", icon: "code-2", category: "Navigation", action: () => scrollToSection("projects") },
        { text: "Scroll to Credentials", icon: "award", category: "Navigation", action: () => scrollToSection("certificates") },
        { text: "Scroll to Contact Node", icon: "mail", category: "Navigation", action: () => scrollToSection("contact") },
        { text: "Toggle Theme Aesthetics", icon: "palette", category: "Utility", action: () => themeBtn.click() },
        { text: "Copy SMTP Email Coordinates", icon: "copy", category: "Action", action: () => copyText("hassankashif1459@gmail.com") },
        { text: "Download System Resume", icon: "download", category: "Action", action: () => window.open("portfoliopic.png", "_blank") },
        { text: "Open GitHub Core", icon: "github", category: "External", action: () => window.open("https://github.com/Hassan285hk", "_blank") }
    ];

    const openPalette = () => {
        palette.classList.add("open");
        palette.setAttribute("aria-hidden", "false");
        paletteInput.focus();
        paletteInput.value = "";
        renderCommands(commandsList);
    };

    const closePalette = () => {
        palette.classList.remove("open");
        palette.setAttribute("aria-hidden", "true");
    };

    // Toggle on Ctrl + K or Cmd + K
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            if (palette.classList.contains("open")) {
                closePalette();
            } else {
                openPalette();
            }
        }
        
        // Escape to close
        if (e.key === "Escape" && palette.classList.contains("open")) {
            closePalette();
        }
    });

    // Close palette on backdrop click
    palette.addEventListener("click", (e) => {
        if (e.target === palette) closePalette();
    });

    const triggerPaletteBtn = document.getElementById("cmd-palette-btn");
    if(triggerPaletteBtn) {
        triggerPaletteBtn.addEventListener("click", openPalette);
    }

    const renderCommands = (list) => {
        paletteResults.innerHTML = "";
        activeIdx = 0;

        if (list.length === 0) {
            paletteResults.innerHTML = `<div class="palette-no-results">No protocols found matching that query.</div>`;
            return;
        }

        list.forEach((cmd, idx) => {
            const item = document.createElement("div");
            item.className = `palette-item ${idx === 0 ? 'active' : ''}`;
            item.innerHTML = `
                <div class="palette-item-left">
                    <i data-lucide="${cmd.icon}"></i>
                    <span class="palette-item-text">${cmd.text}</span>
                </div>
                <span class="palette-item-category">${cmd.category}</span>
            `;
            
            // Hover mouse binds
            item.addEventListener("mouseenter", () => {
                document.querySelectorAll(".palette-item").forEach(el => el.classList.remove("active"));
                item.classList.add("active");
                activeIdx = idx;
            });

            item.addEventListener("click", () => {
                cmd.action();
                closePalette();
            });

            paletteResults.appendChild(item);
        });

        lucide.createIcons();
    };

    // Keyboard Command Palette navigation
    paletteInput.addEventListener("keydown", (e) => {
        const items = document.querySelectorAll(".palette-item");
        
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (items.length > 0) {
                items[activeIdx].classList.remove("active");
                activeIdx = (activeIdx + 1) % items.length;
                items[activeIdx].classList.add("active");
                items[activeIdx].scrollIntoView({ block: "nearest" });
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (items.length > 0) {
                items[activeIdx].classList.remove("active");
                activeIdx = (activeIdx - 1 + items.length) % items.length;
                items[activeIdx].classList.add("active");
                items[activeIdx].scrollIntoView({ block: "nearest" });
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (items.length > 0 && items[activeIdx]) {
                items[activeIdx].click();
            }
        }
    });

    // Query filters
    paletteInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = commandsList.filter(cmd => 
            cmd.text.toLowerCase().includes(query) || 
            cmd.category.toLowerCase().includes(query)
        );
        renderCommands(filtered);
    });

    function scrollToSection(id) {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }


    // --- 12. KEYBOARD SHORTCUTS SYSTEM ---
    document.addEventListener("keydown", (e) => {
        // Only run if not typing in form inputs or palette search
        const activeNode = document.activeElement.tagName.toLowerCase();
        if (activeNode === "input" || activeNode === "textarea") return;

        switch (e.key.toLowerCase()) {
            case "h": scrollToSection("hero"); break;
            case "a": scrollToSection("about"); break;
            case "s": scrollToSection("skills"); break;
            case "e": scrollToSection("experience"); break;
            case "p": scrollToSection("projects"); break;
            case "c": scrollToSection("contact"); break;
            case "t": themeBtn.click(); break;
        }
    });


    // --- 13. CERTIFICATE MODAL LIGHTBOX ---
    const certModal = document.getElementById("cert-modal");
    const certModalImg = document.getElementById("cert-modal-img");
    const certModalTitle = document.getElementById("cert-modal-title");
    const certModalDesc = document.getElementById("cert-modal-desc");

    window.openCertModal = (imgSrc, title, desc) => {
        certModalImg.src = imgSrc;
        certModalTitle.textContent = title;
        certModalDesc.textContent = desc;
        certModal.classList.add("open");
        certModal.setAttribute("aria-hidden", "false");
    };

    window.closeCertModal = () => {
        certModal.classList.remove("open");
        certModal.setAttribute("aria-hidden", "true");
    };


    // --- 14. CONTACT FORM PACKET SUBMISSION ---
    window.handleFormSubmit = (event) => {
        event.preventDefault();
        
        const form = document.getElementById("portfolio-contact-form");
        const submitBtn = document.getElementById("submit-form-btn");
        const btnText = submitBtn.querySelector(".btn-text");
        const btnSpinner = submitBtn.querySelector(".btn-spinner");
        const btnSuccess = submitBtn.querySelector(".btn-success");

        // Swap to loading state
        btnText.style.display = "none";
        btnSpinner.style.display = "flex";
        submitBtn.setAttribute("disabled", "true");

        // Simulate network API delay
        setTimeout(() => {
            // Hide spinner, show success mark
            btnSpinner.style.display = "none";
            btnSuccess.style.display = "flex";
            
            // Trigger confetti burst
            triggerConfetti();

            // Show Toast Alert
            showToast("Signal Transmitted Successfully via SMTP");

            // Reset form elements
            form.reset();

            // Revert button back after delay
            setTimeout(() => {
                btnSuccess.style.display = "none";
                btnText.style.display = "block";
                submitBtn.removeAttribute("disabled");
            }, 3000);

        }, 1500);
    };

    function triggerConfetti() {
        // Fire confetti from the canvas-confetti library
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10006 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, animate a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }


    // --- 15. GLOBALS & UTILS ---
    window.copyText = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast("Node Coordinates Copied to Clipboard!");
        }).catch(err => {
            console.error("Failed to copy coordinates: ", err);
        });
    };

    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Scroll to Top
    window.scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Easter Egg logging
    let keyBuffer = "";
    document.addEventListener("keydown", (e) => {
        keyBuffer += e.key.toLowerCase();
        // Limit buffer
        if (keyBuffer.length > 20) {
            keyBuffer = keyBuffer.substring(keyBuffer.length - 20);
        }

        if (keyBuffer.includes("matrix")) {
            keyBuffer = "";
            showToast("Matrix Protocol Initialized...");
            document.body.style.filter = "hue-rotate(120deg) brightness(1.2)";
            setTimeout(() => {
                document.body.style.filter = "none";
                showToast("Matrix Protocol Offline.");
            }, 6000);
        }
        
        if (keyBuffer.includes("l33t")) {
            keyBuffer = "";
            showToast("Easter Egg Triggered! 1337 Mode.");
            triggerConfetti();
        }
    });

    // Node statistics simulation details
    const pingTimeEl = document.getElementById("ping-time");
    const sysLoadEl = document.getElementById("sys-load");
    
    setInterval(() => {
        if(pingTimeEl) pingTimeEl.textContent = `${Math.floor(25 + Math.random() * 30)}ms`;
        if(sysLoadEl) sysLoadEl.textContent = `${(0.01 + Math.random() * 0.15).toFixed(2)}%`;
    }, 4000);

    // Initial year sync
    const yearEl = document.getElementById("year");
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Initialize Lucide Icons for standard layouts
    lucide.createIcons();
    
    // --- 16. TSPARTICLES LOAD DEEP SPACE NET ---
    tsParticles.load({
        id: "tsparticles",
        options: {
            background: {
                color: {
                    value: "transparent"
                }
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        quantity: 4
                    }
                }
            },
            particles: {
                color: {
                    value: ["#00e5ff", "#7b2cbf", "#ffffff"]
                },
                links: {
                    color: "rgba(0, 229, 255, 0.25)",
                    distance: 120,
                    enable: true,
                    opacity: 0.25,
                    width: 1
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce"
                    },
                    random: true,
                    speed: 0.6,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 65
                },
                opacity: {
                    value: { min: 0.2, max: 0.6 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false
                    }
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 2.5 },
                    animation: {
                        enable: true,
                        speed: 1.5,
                        sync: false
                    }
                }
            },
            detectRetina: true
        }
    });

});
