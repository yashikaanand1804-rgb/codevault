// ==========================================
// CODEVAULT - MAIN JAVASCRIPT
// Developer Productivity Dashboard
// ==========================================

// ---------- APPLICATION DATA ----------

const developerData = {
    name: "Developer",

    stats: {
        dsaSolved: 128,
        projects: 8,
        streak: 21,
        achievements: 12
    },

    skills: {
        JavaScript: 78,
        Java: 72,
        "Data Structures": 68,
        "Problem Solving": 74
    },

    projects: [
        {
            name: "CodeVault",
            status: "In Progress",
            progress: 75
        },
        {
            name: "Task Manager",
            status: "Completed",
            progress: 100
        },
        {
            name: "Weather App",
            status: "Completed",
            progress: 100
        }
    ],

    dsa: {
        easy: 62,
        medium: 48,
        hard: 18
    }
};


// ---------- DOM ELEMENTS ----------

const dashboardButton = document.querySelector("button");
const stats = document.querySelectorAll(".stats strong");
const progressBar = document.querySelector(".bar div");


// ---------- APPLICATION INITIALIZATION ----------

document.addEventListener("DOMContentLoaded", () => {

    console.log("=================================");
    console.log("🚀 CodeVault Started");
    console.log("=================================");

    initializeApplication();
});


// ---------- MAIN INITIALIZER ----------

function initializeApplication() {

    loadSavedData();
    updateStatistics();
    updateProgress();
    setupNavigation();
    setupDashboardButton();
    setupStatAnimations();

    console.log("✅ Application initialized");
}


// ---------- LOCAL STORAGE ----------

function loadSavedData() {

    const savedData = localStorage.getItem("codevaultData");

    if (savedData) {

        try {

            const parsedData = JSON.parse(savedData);

            Object.assign(developerData.stats, parsedData.stats);

            console.log("📦 Saved developer data loaded");

        } catch (error) {

            console.log("⚠️ Could not load saved data");

        }

    } else {

        saveData();
    }
}


function saveData() {

    const dataToSave = {
        stats: developerData.stats
    };

    localStorage.setItem(
        "codevaultData",
        JSON.stringify(dataToSave)
    );

    console.log("💾 Developer data saved");
}


// ---------- STATISTICS ----------

function updateStatistics() {

    if (!stats.length) {
        return;
    }

    const values = [
        developerData.stats.dsaSolved,
        developerData.stats.projects,
        developerData.stats.streak,
        developerData.stats.achievements
    ];

    stats.forEach((element, index) => {

        if (values[index] !== undefined) {

            animateNumber(
                element,
                0,
                values[index],
                1000
            );

        }

    });
}


// ---------- NUMBER ANIMATION ----------

function animateNumber(element, start, end, duration) {

    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        const currentValue = Math.floor(
            start + (end - start) * progress
        );

        element.textContent = currentValue;

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);
}


// ---------- OVERALL PROGRESS ----------

function calculateOverallProgress() {

    const skillValues = Object.values(
        developerData.skills
    );

    if (skillValues.length === 0) {
        return 0;
    }

    const total = skillValues.reduce(
        (sum, value) => sum + value,
        0
    );

    return Math.round(
        total / skillValues.length
    );
}


function updateProgress() {

    if (!progressBar) {
        return;
    }

    const progress =
        calculateOverallProgress();

    progressBar.style.width =
        progress + "%";

    console.log(
        `📊 Overall Progress: ${progress}%`
    );
}


// ---------- DASHBOARD BUTTON ----------

function setupDashboardButton() {

    if (!dashboardButton) {
        return;
    }

    dashboardButton.addEventListener(
        "click",
        openDashboard
    );
}


function openDashboard() {

    alert(
        "🚀 CodeVault Dashboard\n\n" +
        "DSA Problems: " +
        developerData.stats.dsaSolved +
        "\nProjects: " +
        developerData.stats.projects +
        "\nCurrent Streak: " +
        developerData.stats.streak +
        " days"
    );

    console.log(
        "📊 Dashboard opened"
    );
}


// ---------- STAT CARD ANIMATIONS ----------

function setupStatAnimations() {

    const statCards =
        document.querySelectorAll(".stats div");

    statCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-5px)";

                card.style.transition =
                    "0.3s";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";
            }
        );

    });
}


// ---------- NAVIGATION ----------

function setupNavigation() {

    const links =
        document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    link.getAttribute("href");

                if (
                    target &&
                    target.startsWith("#")
                ) {

                    const section =
                        document.querySelector(target);

                    if (section) {

                        event.preventDefault();

                        section.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }

            }
        );

    });
}


// ---------- DSA ANALYTICS ----------

function getTotalDSAProblems() {

    const dsa = developerData.dsa;

    return (
        dsa.easy +
        dsa.medium +
        dsa.hard
    );
}


function getDSAPercentage() {

    const total =
        getTotalDSAProblems();

    const target = 200;

    return Math.min(
        Math.round((total / target) * 100),
        100
    );
}


function getDSADifficultyBreakdown() {

    const dsa = developerData.dsa;

    return {

        easy: dsa.easy,

        medium: dsa.medium,

        hard: dsa.hard,

        total: getTotalDSAProblems()

    };
}


// ---------- PROJECT ANALYTICS ----------

function getCompletedProjects() {

    return developerData.projects.filter(
        project =>
            project.status === "Completed"
    ).length;
}


function getActiveProjects() {

    return developerData.projects.filter(
        project =>
            project.status === "In Progress"
    ).length;
}


function getProjectCompletionRate() {

    const projects =
        developerData.projects;

    if (projects.length === 0) {
        return 0;
    }

    const completed =
        getCompletedProjects();

    return Math.round(
        (completed / projects.length) * 100
    );
}


// ---------- ACHIEVEMENT SYSTEM ----------

function checkAchievements() {

    const achievements = [];

    const stats =
        developerData.stats;

    if (stats.dsaSolved >= 50) {

        achievements.push(
            "🎯 First 50 DSA Problems"
        );

    }

    if (stats.dsaSolved >= 100) {

        achievements.push(
            "🔥 100 DSA Problems"
        );

    }

    if (stats.streak >= 7) {

        achievements.push(
            "⚡ 7 Day Streak"
        );

    }

    if (stats.streak >= 21) {

        achievements.push(
            "🏆 21 Day Streak"
        );

    }

    if (stats.projects >= 5) {

        achievements.push(
            "🚀 5 Projects"
        );

    }

    return achievements;
}


// ---------- DEVELOPER SUMMARY ----------

function generateDeveloperSummary() {

    const progress =
        calculateOverallProgress();

    const totalDSA =
        getTotalDSAProblems();

    const completedProjects =
        getCompletedProjects();

    return {

        progress,

        totalDSA,

        completedProjects,

        currentStreak:
            developerData.stats.streak,

        achievements:
            checkAchievements()

    };
}


// ---------- SEARCH UTILITY ----------

function searchProjects(keyword) {

    const searchTerm =
        keyword.toLowerCase().trim();

    if (!searchTerm) {

        return developerData.projects;
    }

    return developerData.projects.filter(
        project =>
            project.name
                .toLowerCase()
                .includes(searchTerm)
    );
}


// ---------- PROJECT FILTER ----------

function filterProjects(status) {

    if (status === "All") {

        return developerData.projects;
    }

    return developerData.projects.filter(
        project =>
            project.status === status
    );
}


// ---------- ADD DSA PROBLEM ----------

function addDSAProblem(difficulty) {

    if (!developerData.dsa[difficulty]) {

        console.log(
            "❌ Invalid difficulty"
        );

        return;
    }

    developerData.dsa[difficulty]++;

    developerData.stats.dsaSolved++;

    saveData();

    updateStatistics();

    console.log(
        `✅ ${difficulty} problem added`
    );
}


// ---------- STREAK SYSTEM ----------

function updateStreak() {

    developerData.stats.streak++;

    saveData();

    console.log(
        `🔥 New streak: ${
            developerData.stats.streak
        } days`
    );
}


// ---------- RESET DATA ----------

function resetDeveloperData() {

    const confirmation =
        confirm(
            "Are you sure you want to reset your CodeVault data?"
        );

    if (!confirmation) {
        return;
    }

    localStorage.removeItem(
        "codevaultData"
    );

    location.reload();
}


// ---------- DEBUG INFORMATION ----------

function showDeveloperReport() {

    const summary =
        generateDeveloperSummary();

    console.table({

        "Overall Progress":
            summary.progress + "%",

        "DSA Problems":
            summary.totalDSA,

        "Completed Projects":
            summary.completedProjects,

        "Current Streak":
            summary.currentStreak,

        "Achievements":
            summary.achievements.length

    });

    return summary;
}


// ---------- KEYBOARD SHORTCUTS ----------

document.addEventListener(
    "keydown",
    event => {

        // Ctrl + K
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            console.log(
                "🔎 Search shortcut activated"
            );

        }

        // Ctrl + D
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "d"
        ) {

            event.preventDefault();

            console.log(
                "📊 Dashboard shortcut activated"
            );

        }

    }
);


// ---------- APPLICATION STATUS ----------

console.log(
    "CodeVault JavaScript loaded successfully 🚀"
);

console.log(
    "DSA Problems:",
    getTotalDSAProblems()
);

console.log(
    "Project Completion:",
    getProjectCompletionRate() + "%"
);

console.log(
    "Achievements:",
    checkAchievements()
);