/* ==========================================
   CODEVAULT - JAVASCRIPT
   Developer Productivity Dashboard
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------
       1. SMOOTH NAVIGATION
    -------------------------------------- */

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                event.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    /* --------------------------------------
       2. ANIMATED STATISTICS
    -------------------------------------- */

    const statNumbers = document.querySelectorAll(".stat-card strong");

    function animateNumber(element) {

        const finalValue = parseInt(
            element.textContent.replace(/\D/g, "")
        );

        if (isNaN(finalValue)) return;

        let currentValue = 0;

        const duration = 1000;
        const steps = 40;
        const increment = finalValue / steps;

        const timer = setInterval(() => {

            currentValue += increment;

            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }

            element.textContent =
                Math.floor(currentValue);

        }, duration / steps);
    }

    statNumbers.forEach(number => {
        animateNumber(number);
    });


    /* --------------------------------------
       3. PROGRESS BAR ANIMATION
    -------------------------------------- */

    const progressBars =
        document.querySelectorAll(".progress-fill");

    progressBars.forEach(bar => {

        const originalWidth =
            bar.style.width || "0%";

        bar.style.width = "0%";

        setTimeout(() => {
            bar.style.transition =
                "width 1.2s ease";

            bar.style.width = originalWidth;
        }, 300);
    });


    /* --------------------------------------
       4. FEATURE CARD INTERACTION
    -------------------------------------- */

    const featureCards =
        document.querySelectorAll(".feature-card");

    featureCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform =
                "translateY(-8px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "translateY(0)";
        });
    });


    /* --------------------------------------
       5. SCROLL REVEAL EFFECT
    -------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".feature-card, .progress-container, .about"
    );

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform =
            "translateY(30px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        revealObserver.observe(element);
    });


    /* --------------------------------------
       6. CURRENT YEAR
    -------------------------------------- */

    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* --------------------------------------
       7. DASHBOARD HEALTH STATUS
    -------------------------------------- */

    const statusElement =
        document.querySelector(".status");

    if (statusElement) {

        statusElement.textContent =
            "● System Active";

        statusElement.style.color =
            "#57d68d";
    }


    /* --------------------------------------
       8. CONSOLE INFORMATION
    -------------------------------------- */

    console.log(
        "CodeVault loaded successfully."
    );

    console.log(
        "Developer Productivity Dashboard initialized."
    );

});
// =========================
// CodeVault Interactions
// =========================

const refreshButton = document.getElementById("refreshButton");

if (refreshButton) {
    refreshButton.addEventListener("click", function () {

        const problemCount = document.getElementById("problemCount");
        const streakCount = document.getElementById("streakCount");

        if (problemCount) {
            problemCount.textContent =
                Number(problemCount.textContent) + 1;
        }

        if (streakCount) {
            streakCount.textContent =
                Number(streakCount.textContent) + 1;
        }

        refreshButton.textContent = "Data Updated";

        setTimeout(function () {
            refreshButton.textContent = "Refresh Data";
        }, 2000);
    });
}

