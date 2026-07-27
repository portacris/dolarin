/* =====================================================
   DOLARÍN - JAVASCRIPT PRINCIPAL
   Landing Page
===================================================== */



document.addEventListener(
    "DOMContentLoaded",
    () => {



/* =====================================================
   AÑO AUTOMÁTICO FOOTER
===================================================== */


const year =
document.getElementById("year");


if(year){

    year.textContent =
    new Date().getFullYear();

}





/* =====================================================
   MENÚ MÓVIL
===================================================== */


const menuButton =
document.querySelector(".menu-button");


const nav =
document.querySelector("nav");



if(menuButton){


    menuButton.addEventListener(
        "click",
        () => {


            nav.classList.toggle(
                "active"
            );


        }
    );


}





/* =====================================================
   CERRAR MENÚ AL SELECCIONAR OPCIÓN
===================================================== */


const navLinks =
document.querySelectorAll(
    "nav a"
);



navLinks.forEach(
    link => {


        link.addEventListener(
            "click",
            () => {


                nav.classList.remove(
                    "active"
                );


            }
        );


    }
);







/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */


const animatedElements =
document.querySelectorAll(
    ".card, .stat-card, .market, .security"
);




const observer =
new IntersectionObserver(
    entries => {


        entries.forEach(
            entry => {


                if(entry.isIntersecting){


                    entry.target.classList.add(
                        "show"
                    );


                }


            }
        );


    },
    {

        threshold:0.15

    }

);




animatedElements.forEach(
    element => {


        element.classList.add(
            "hidden"
        );


        observer.observe(
            element
        );


    }
);







/* =====================================================
   FUTURA CONEXIÓN API DOLARÍN

   Aquí conectaremos:

   - Binance P2P
   - Bybit P2P
   - Eldorado
   - Airtm

   Ejemplo futuro:

   async function obtenerPrecioUSDT(){

       const respuesta =
       await fetch(API_URL);

       const datos =
       await respuesta.json();

   }


===================================================== */





/* =====================================================
   BOTONES DE DESCARGA

   Preparado para Google Play
===================================================== */


const downloadButtons =
document.querySelectorAll(
    ".play-button"
);



downloadButtons.forEach(
    button => {


        button.addEventListener(
            "click",
            () => {


                alert(
                "Dolarín estará disponible próximamente en Google Play."
                );


            }
        );


    }
);





/* =====================================================
   EFECTO NAVBAR AL BAJAR
===================================================== */


const navbar =
document.querySelector(
    ".navbar"
);



window.addEventListener(
    "scroll",
    () => {


        if(window.scrollY > 50){


            navbar.classList.add(
                "scrolled"
            );


        }else{


            navbar.classList.remove(
                "scrolled"
            );


        }


    }
);





    }

);
