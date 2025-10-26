// Ensure the script runs after the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // 1. GSAP Text Animation (Typing Effect)
    const animatedTextElement = document.querySelector('.animated-text');
    const fullText = animatedTextElement.textContent;
    animatedTextElement.textContent = ''; // Clear the text to start animation

    // Split the text into individual characters for the typing effect
    const chars = fullText.split('');

    // GSAP Timeline for the typing effect
    const typingTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Loop indefinitely

    // 1. Initial wait for dramatic effect
    typingTimeline.to({}, { duration: 0.5 });

    // 2. Type out the text character by character
    chars.forEach((char, index) => {
        typingTimeline.to(animatedTextElement, {
            duration: 0.05, // Speed of typing
            // This function adds one character at a time to the element's text content
            onUpdate: () => {
                animatedTextElement.textContent = fullText.substring(0, index + 1);
            },
            ease: "none"
        });
    });

    // 3. Add a cursor/caret blink effect
    typingTimeline.to(animatedTextElement, {
        duration: 0.5,
        // Add a class for a simple blinking effect (requires CSS)
        className: "+=blinking",
        repeat: 3, // Blink 3 times
        yoyo: true,
        ease: "power2.inOut"
    });

    // 4. Erase the text quickly
    typingTimeline.to(animatedTextElement, {
        duration: 0.8,
        onUpdate: () => {
            // Gradually erase the text
            const currentLength = animatedTextElement.textContent.length;
            const newLength = Math.max(0, currentLength - Math.ceil(fullText.length / 10)); // Erase quickly
            animatedTextElement.textContent = fullText.substring(0, newLength);
        },
        ease: "power1.in"
    }, "+=1"); // Wait 1 second before erasing
    
    typingTimeline.to(animatedTextElement, {
        duration: 0.1, // Final step to ensure it's empty
        onComplete: () => {
            animatedTextElement.textContent = '';
        }
    });


    // 2. Initial Hero Section Animation (Simple fade in)
    gsap.from(".hero-content *", {
        opacity: 0,
        y: 50,
        stagger: 0.2, // Stagger the elements' appearance
        duration: 1.5,
        ease: "power3.out"
    });
});