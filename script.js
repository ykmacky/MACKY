
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. DARK / LIGHT MODE
    // ========================================
    const themeBtn = document.querySelector(".theme-btn");

    function applyTheme(theme) {

        document.body.classList.toggle(
            "light-mode",
            theme === "light"
        );

        localStorage.setItem("theme", theme);

        if (themeBtn) {

            themeBtn.textContent =
                theme === "light" ? "☀️" : "🌙";

            themeBtn.setAttribute(
                "aria-label",
                theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );
        }
    }

    const savedTheme = localStorage.getItem("theme");

    applyTheme(
        savedTheme === "light" ? "light" : "dark"
    );

    if (themeBtn) {

        themeBtn.addEventListener("click", function () {

            const isLight =
                document.body.classList.contains("light-mode");

            applyTheme(isLight ? "dark" : "light");

        });
    }

    // ========================================
    // 2. BACK TO TOP
    // ========================================
    const topBtn = document.querySelector(".top-btn");

    function updateTopButton() {

        if (topBtn) {

            topBtn.classList.toggle(
                "show",
                window.scrollY > 300
            );

        }
    }

    if (topBtn) {

        updateTopButton();

        window.addEventListener(
            "scroll",
            updateTopButton
        );

        topBtn.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }

});

const audio = document.getElementById("audio");
const musicBtn = document.getElementById("musicBtn");
const musicFill = document.getElementById("musicFill");

audio.loop = true;      // uulit pag natapos
audio.volume = 0.6;     // pwedeng baguhin (0 - 1)

musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    audio.paused ? audio.play() : audio.pause();
});

audio.addEventListener("play",  () => musicBtn.textContent = "❚❚");
audio.addEventListener("pause", () => musicBtn.textContent = "▶");

audio.addEventListener("timeupdate", () => {
    musicFill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

/* Backup kung sakaling hindi gumana ang loop */
audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play();
});

/* AUTOPLAY pagbukas ng page */
audio.play().catch(() => {
    // Na-block ng browser, kaya magsisimula sa unang galaw ng bisita
    const events = ["pointerdown", "keydown", "touchstart"];
    const start = () => {
        audio.play();
        events.forEach(ev => document.removeEventListener(ev, start));
    };
    events.forEach(ev => document.addEventListener(ev, start));
});