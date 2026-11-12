
// ===============================
// BACKGROUND MUSIC
// ===============================

const audio = new Audio("assets/music/smita-song.mp4");

audio.loop = true;
audio.volume = 0.75;

let musicStarted = false;

document.addEventListener("click", async () => {
    if (musicStarted) return;

    try {
        await audio.play();
        musicStarted = true;
    } catch (error) {
        console.log("Music could not start:", error);
    }
}, { once: true });


// ===============================
// MEMORY PHOTO UPLOAD
// ===============================

document.querySelectorAll(".photoPicker").forEach(input => {

    input.addEventListener("change", () => {

        const file = input.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {

            const box = input.closest(".polaroid").querySelector(".photo");

            box.innerHTML = "";

            const img = document.createElement("img");

            img.src = reader.result;
            img.alt = "Memory photo";

            box.appendChild(img);
        };

        reader.readAsDataURL(file);
    });

});


// ===============================
// SURPRISE BUTTON - FALLING HEARTS
// ===============================

const confettiButton = document.querySelector("#surpriseBtn");

if (confettiButton) {

    confettiButton.addEventListener("click", () => {

        document.querySelector("#finalMessage")?.classList.remove("hidden");

        for (let i = 0; i < 65; i++) {

            const heart = document.createElement("div");

            heart.className = "heart";
            heart.innerHTML = ["❤️", "💜", "💕", "💗", "💖"][i % 5];

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (3 + Math.random() * 3) + "s";
            heart.style.animationDelay = Math.random() * 2 + "s";
            heart.style.fontSize = (14 + Math.random() * 22) + "px";

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 7000);

        }

    });

}


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });

});
