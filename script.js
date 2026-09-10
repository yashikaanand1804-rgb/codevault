// CodeVault Dashboard

const refreshButton = document.getElementById("refreshButton");

if (refreshButton) {
    refreshButton.addEventListener("click", () => {

        const problemCount = document.getElementById("problemCount");
        const streakCount = document.getElementById("streakCount");

        problemCount.textContent =
            Number(problemCount.textContent) + 1;

        streakCount.textContent =
            Number(streakCount.textContent) + 1;

        refreshButton.textContent = "Updated";

        setTimeout(() => {
            refreshButton.textContent = "Refresh Data";
        }, 1500);
    });
}


// DSA Progress Animation

const progressBars =
    document.querySelectorAll(".progress-fill");

progressBars.forEach((bar) => {

    const width = bar.style.width;

    bar.style.width = "0%";

    setTimeout(() => {
        bar.style.width = width;
    }, 300);
});

    
