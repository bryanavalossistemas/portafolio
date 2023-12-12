document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    scrollNap();
    navegacionFija();

}

function navegacionFija() {
    const barra = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function () {
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add("fijo");
            body.classList.add("body-scroll")
        } else {
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll")
        }
    });
}

function scrollNap() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");

    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();
            const seccionScroll = enlace.attributes.getNamedItem("href").value;
            const seccion = document.querySelector(seccionScroll)
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    for (let i = 1; i < 13; i++) {
        const imagen = document.createElement("picture");
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
                 alt="imagen de galeria">
        `;
        imagen.onclick = function () {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
                 alt="imagen de galeria">
        `;
    const overlay = document.createElement("div");

    overlay.classList.add("overlay");
    overlay.appendChild(imagen);
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove("fijar-body")
    }

    const body = document.querySelector("body");
    body.classList.add("fijar-body")
    body.appendChild(overlay);

    const cerrarModal = document.createElement("p");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");
    overlay.appendChild(cerrarModal);
}