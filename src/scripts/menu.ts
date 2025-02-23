// Obtiene los elementos del DOM
const mobileToggle = document.getElementById("menu-toggle") as HTMLButtonElement;
const mobileMenu = document.getElementById("mobile-menu") as HTMLElement;
const hamburgerIcon = mobileToggle?.querySelector(".hamburger-icon") as HTMLElement;
let isAnimating = false;

// Evento cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", () => {
    const inicioLinks = document.querySelectorAll('a[href="/"]'); // Selecciona todos los enlaces de inicio

    inicioLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            if (window.location.pathname === "/") {
                event.preventDefault(); // Evita la recarga
                window.scrollTo({ top: 0, behavior: "smooth" }); // Hace scroll hacia arriba

                // Cierra el menú en mobile si está abierto
                if (window.innerWidth < 768 && !mobileMenu.classList.contains("hidden")) {
                    closeMobileMenu();
                }
            }
        });
    });
});

// Verifica que los elementos existen antes de agregar eventos
if (mobileToggle && mobileMenu && hamburgerIcon) {
    // Evento para abrir/cerrar menú móvil
    mobileToggle.addEventListener("click", (e: Event) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener("click", (event: Event) => {
        if (window.innerWidth < 768 && !mobileMenu.classList.contains("hidden")) {
            const target = event.target as Node;
            if (!mobileMenu.contains(target) && !mobileToggle.contains(target) && !isAnimating) {
                closeMobileMenu();
            }
        }
    });

    // Cierra el menú al hacer clic en un enlace dentro del menú móvil
    document.querySelectorAll<HTMLAnchorElement>("#mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            if (!isAnimating) {
                closeMobileMenu();
            }
        });
    });
}

// Función para alternar el menú móvil
function toggleMobileMenu() {
    if (isAnimating) return;

    hamburgerIcon.classList.toggle("active");
    isAnimating = true;

    if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("menu-open");
        mobileMenu.classList.remove("menu-close");

        setTimeout(() => (isAnimating = false), 400);
    } else {
        closeMobileMenu();
    }
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    if (isAnimating) return;

    hamburgerIcon.classList.remove("active");
    isAnimating = true;

    mobileMenu.classList.add("menu-close");
    mobileMenu.classList.remove("menu-open");

    setTimeout(() => {
        mobileMenu.classList.add("hidden");
        isAnimating = false;
    }, 300);
}
