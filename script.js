document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------------
       1. CANVAS IMAGE SEQUENCE (INFINITE LOOP)
       -------------------------------------------------- */
    const canvas = document.getElementById("product-canvas");
    const context = canvas.getContext("2d");

    const frameCount = 213;
    const currentFrame = index => (
        `assets/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const airpods = {
        frame: 0
    };

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    // Set canvas dimensions based on the first image once loaded
    images[0].onload = render;

    function render() {
        if (!images[airpods.frame]) return;

        // We want the canvas to match the image dimensions for best quality
        // and let CSS handle the scaling
        if (canvas.width !== images[0].width || canvas.height !== images[0].height) {
            canvas.width = images[0].width;
            canvas.height = images[0].height;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Ensure pure white background if images have transparency or edges
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(images[airpods.frame], 0, 0);
    }

    // GSAP Animation to loop through frames
    gsap.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 7, // ~30fps for 213 frames
        repeat: -1, // Infinite loop
        onUpdate: render
    });

    /* --------------------------------------------------
       2. ANTI-GRAVITY FLOATING EFFECT
       -------------------------------------------------- */
    // Make the entire canvas wrapper float softly
    gsap.to(".canvas-wrapper", {
        y: -30,
        rotation: 0.5,
        ease: "sine.inOut",
        duration: 4,
        yoyo: true,
        repeat: -1
    });

    /* --------------------------------------------------
       3. TYPOGRAPHY ENTRANCE ANIMATION
       -------------------------------------------------- */
    const tl = gsap.timeline();

    tl.fromTo(".luxury-navbar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
        .fromTo(".small-label",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.5"
        )
        .fromTo(".main-headline",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
            "-=0.6"
        )
        .fromTo(".subheading",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.8"
        )
        .fromTo(".cta-group",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.8"
        )
        .fromTo(".trust-badges .badge-item",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
            "-=0.6"
        )
        .fromTo(".limited-offer",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
            "-=0.4"
        )
        .fromTo(".hero-visual-right",
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" },
            "-=1.5"
        );

    /* --------------------------------------------------
       4. SPARSE GOLD PARTICLES
       -------------------------------------------------- */
    const particlesContainer = document.getElementById("particles-container");
    const numParticles = 15;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Random size between 2px and 5px
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        particlesContainer.appendChild(particle);

        // Animate particle floating
        gsap.to(particle, {
            y: startY - (Math.random() * 200 + 100),
            x: startX + (Math.random() * 100 - 50),
            opacity: Math.random() * 0.5 + 0.2, // Subtle opacity
            duration: Math.random() * 10 + 10,
            ease: "none",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * -20 // Stagger start times
        });

        // Twinkle effect
        gsap.to(particle, {
            opacity: 0,
            duration: Math.random() * 2 + 1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * -5
        });
    }

    /* --------------------------------------------------
       5. SCROLLTRIGGER FADE-UP ANIMATIONS
       -------------------------------------------------- */
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-up').forEach((element) => {
        // Respect inline animation delays from the original HTML
        let delay = 0;
        if(element.style.animationDelay) {
            delay = parseFloat(element.style.animationDelay);
        }

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: delay
        });
    });

});
