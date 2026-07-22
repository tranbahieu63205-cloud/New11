/*==================================================
    PORTFOLIO PRO V2
    SCRIPT.JS
    PART 1
==================================================*/

"use strict";

/*==============================
    SELECTOR
==============================*/

const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

/*==============================
    LOADER
==============================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        $("#loader").style.opacity = "0";
        $("#loader").style.visibility = "hidden";

    }, 1200);

});

/*==============================
    TYPING EFFECT
==============================*/

const typing = $(".typing");

const words = [

    "Frontend Developer",
    "UI Designer",
    "Creative Coder",
    "JavaScript Developer"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const current = words[wordIndex];

    if (!deleting) {

        typing.textContent =
            current.substring(0, charIndex++);

        if (charIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1200);

            return;

        }

    } else {

        typing.textContent =
            current.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length)
                wordIndex = 0;

        }

    }

    setTimeout(typeEffect, deleting ? 45 : 90);

}

typeEffect();

/*==============================
    HEADER SCROLL
==============================*/

const header = $("#header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("active");

    } else {

        header.classList.remove("active");

    }

});

/*==============================
    BACK TO TOP
==============================*/

const topBtn = $("#topBtn");

window.addEventListener("scroll", () => {

    if (scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

/*==============================
    COUNTER
==============================*/

const counters =
$$(".counter");

const counterObserver =
new IntersectionObserver(entries => {

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter =
entry.target;

const target =
+counter.dataset.target;

let value = 0;

const speed =
target / 100;

const update = ()=>{

value += speed;

if(value < target){

counter.innerText =
Math.floor(value);

requestAnimationFrame(update);

}else{

counter.innerText =
target;

}

};

update();

counterObserver.unobserve(counter);

});

});

counters.forEach(c=>{

counterObserver.observe(c);

});

/*==============================
    SKILL BAR
==============================*/

const bars =
$$(".bar");

const barObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.width =
entry.target.classList.contains("html") ? "95%" :
entry.target.classList.contains("css") ? "92%" :
entry.target.classList.contains("js") ? "88%" :
"85%";

}

});

});

bars.forEach(bar=>{

bar.style.width="0";

barObserver.observe(bar);

});

/*==============================
    MOBILE MENU
==============================*/

const menuBtn =
$("#menuBtn");

const nav =
$(".nav-menu");

menuBtn.onclick=()=>{

nav.classList.toggle("show");

menuBtn.classList.toggle("active");

};

/*==============================
    DARK MODE
==============================*/

const themeBtn =
$("#themeToggle");

let dark=true;

themeBtn.onclick=()=>{

dark=!dark;

document.body.classList.toggle("light");

themeBtn.innerHTML=

dark ?

'<i class="fa-solid fa-moon"></i>'

:

'<i class="fa-solid fa-sun"></i>';

localStorage.setItem(

"theme",

dark?"dark":"light"

);

};

if(localStorage.getItem("theme")=="light"){

document.body.classList.add("light");

themeBtn.innerHTML=

'<i class="fa-solid fa-sun"></i>';

dark=false;

}

/*==============================
    COPY BANK
==============================*/

const copyBtn =
$("#copyBank");

if(copyBtn){

copyBtn.onclick=()=>{

navigator.clipboard.writeText(

"0123456789"

);

showToast(

"Đã sao chép số tài khoản"

);

};

}

/*==============================
    TOAST
==============================*/

function showToast(text){

const toast=$("#toast");

toast.innerText=text;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}
/*==================================================
    PORTFOLIO PRO V2
    SCRIPT.JS
    PART 2
==================================================*/

/*==============================
    MUSIC PLAYER
==============================*/

const music = $("#music");
let playing = false;

window.addEventListener("click", () => {

    if (playing) return;

    music.volume = 0.4;

    music.play().catch(() => {});

    playing = true;

}, { once: true });

/*==============================
    QR POPUP
==============================*/

const qrModal = $("#qrModal");
const showQR = $("#showQR");
const closeQR = $("#closeQR");

if (showQR) {

    showQR.onclick = () => {

        qrModal.classList.add("active");

    };

}

if (closeQR) {

    closeQR.onclick = () => {

        qrModal.classList.remove("active");

    };

}

window.onclick = (e) => {

    if (e.target == qrModal) {

        qrModal.classList.remove("active");

    }

};

/*==============================
    GALLERY LIGHTBOX
==============================*/

$$(".gallery-item img").forEach(img => {

    img.addEventListener("click", () => {

        const popup = document.createElement("div");

        popup.className = "lightbox";

        popup.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="${img.src}">
        `;

        document.body.appendChild(popup);

        popup.onclick = () => popup.remove();

    });

});

/*==============================
    SCROLL REVEAL
==============================*/

const revealElements = $$(
    ".glass-card,.project-card,.service-card,.contact-card,.gallery-item,.stat-card"
);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

revealElements.forEach(el => {

    el.classList.add("hidden");

    revealObserver.observe(el);

});

/*==============================
    AVATAR PARALLAX
==============================*/

const avatar = $(".avatar-card");

document.addEventListener("mousemove", e => {

    if (!avatar) return;

    const x =
        (window.innerWidth / 2 - e.clientX) / 40;

    const y =
        (window.innerHeight / 2 - e.clientY) / 40;

    avatar.style.transform =
        `rotateY(${-x}deg) rotateX(${y}deg)`;

});

document.addEventListener("mouseleave", () => {

    if (avatar)

        avatar.style.transform = "";

});

/*==============================
    RIPPLE BUTTON
==============================*/

$$(".btn").forEach(btn => {

    btn.addEventListener("click", e => {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = btn.getBoundingClientRect();

        ripple.style.left =
            e.clientX - rect.left + "px";

        ripple.style.top =
            e.clientY - rect.top + "px";

        btn.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*==============================
    PARTICLE BACKGROUND
==============================*/

const canvas = $("#particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resize() {

        canvas.width = innerWidth;
        canvas.height = innerHeight;

    }

    resize();

    window.addEventListener("resize", resize);

    for (let i = 0; i < 90; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            r: Math.random() * 2 + 1,

            dx: (Math.random() - .5) * .4,

            dy: (Math.random() - .5) * .4

        });

    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width)
                p.dx *= -1;

            if (p.y < 0 || p.y > canvas.height)
                p.dy *= -1;

            ctx.beginPath();

            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

            ctx.fillStyle = "rgba(79,140,255,.7)";

            ctx.fill();

        });

        requestAnimationFrame(animate);

    }

    animate();

}

/*==============================
    ACTIVE NAV
==============================*/

const sections = $$("section");
const navLinks = $$(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(sec => {

        const top = sec.offsetTop - 150;

        if (scrollY >= top) {

            current = sec.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*==============================
    YEAR AUTO
==============================*/

const year = document.querySelector("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/*==============================
    PERFORMANCE
==============================*/

window.addEventListener("pageshow", () => {

    console.log("Portfolio Pro V2 Loaded Successfully.");

});

console.log(
`
██████╗  ██████╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗
██████╔╝██║   ██║██████╔╝
██╔═══╝ ██║   ██║██╔══██╗
██║     ╚██████╔╝██║  ██║
╚═╝      ╚═════╝ ╚═╝  ╚═╝

Portfolio Pro V2
Developed with ❤️
`);