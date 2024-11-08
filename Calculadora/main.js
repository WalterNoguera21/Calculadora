const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let operacion = ""; 

function ajustarTamanoFuente() {
    const longitudTexto = pantalla.textContent.replace(/\./g, "").length;

    if (longitudTexto > 15) {
        pantalla.style.fontSize = "20px"; 
    } else if (longitudTexto > 10) {
        pantalla.style.fontSize = "30px"; 
    } else if (longitudTexto > 6) {
        pantalla.style.fontSize = "30px"; 
    } else {
        pantalla.style.fontSize = "40px"; 
    }
}
function formatearConPuntos(numero) {
    let partes = numero.split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return partes.join(".");
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "c"||boton.id === "CN") {
            pantalla.textContent = "0";
            operacion = ""; 
            pantalla.style.fontSize = "50px";
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
                pantalla.textContent = "0";
                operacion = "";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
                operacion = operacion.slice(0, -1);
            }
            ajustarTamanoFuente(); 
            return;
        }

        if (boton.id === "igual") {
            try {
                pantalla.textContent = eval(operacion).toLocaleString('es', { minimumFractionDigits: 0, maximumFractionDigits: 20 }); 
                operacion = pantalla.textContent.replace(/\./g, ""); 
                ajustarTamanoFuente();
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }

      
        if (botonApretado === "." && operacion.includes(".")) {
            return;
        }

    
        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            operacion = botonApretado;
        } else {
            operacion += botonApretado;
        }

        pantalla.textContent = formatearConPuntos(operacion); 
        ajustarTamanoFuente(); 
    });
});