// Elementos del DOM
const mobileToggle = document.getElementById("menu-toggle") as HTMLButtonElement;
const mobileMenu = document.getElementById("mobile-menu") as HTMLElement;
const hamburgerIcon = mobileToggle?.querySelector(".hamburger-icon") as HTMLElement;
let isAnimating = false;

// Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const inicioLinks = document.querySelectorAll('a[href="/"]');
    
    inicioLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            if (window.location.pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                
                if (window.innerWidth < 768 && mobileMenu.classList.contains("open")) {
                    closeMobileMenu();
                }
            }
        });
    });
});

// Eventos principales
if (mobileToggle && mobileMenu && hamburgerIcon) {
    mobileToggle.addEventListener("click", (e: Event) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    document.addEventListener("click", (event: Event) => {
        if (mobileMenu.classList.contains("open")) {
            const target = event.target as Node;
            if (!mobileMenu.contains(target) && !mobileToggle.contains(target)) {
                closeMobileMenu();
            }
        }
    });

    document.querySelectorAll<HTMLAnchorElement>("#mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });
}

// Funciones del menú
function toggleMobileMenu() {
    if (isAnimating) return;
    
    mobileMenu.classList.toggle("open");
    hamburgerIcon.classList.toggle("active");
    isAnimating = true;

    if (mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0)';
    } else {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-20px)';
    }

    setTimeout(() => {
        isAnimating = false;
        if (!mobileMenu.classList.contains("open")) {
            mobileMenu.classList.add("hidden");
        }
    }, 300);
}

function closeMobileMenu() {
    if (isAnimating) return;
    
    mobileMenu.classList.remove("open");
    hamburgerIcon.classList.remove("active");
    isAnimating = true;

    mobileMenu.style.opacity = '0';
    mobileMenu.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        mobileMenu.classList.add("hidden");
        isAnimating = false;
    }, 300);
}