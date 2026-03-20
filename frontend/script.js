// =======================
// CAMBIO DE TABS (LOGIN / REGISTRO)
// =======================
function mostrarTab(tab){
    const login = document.getElementById("loginTab");
    const registro = document.getElementById("registroTab");

    if(login && registro){
        login.classList.add("oculto");
        registro.classList.add("oculto");
        document.getElementById(tab).classList.remove("oculto");
    }
}

// =======================
// REGISTRO
// =======================
function registro(){
    const usuario = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;

    fetch("http://localhost:3000/registro",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({usuario, password})
    })
    .then(res => res.json())
    .then(data => {
        alert(data.mensaje);
    })
    .catch(() => alert("Error en registro"));
}

// =======================
// LOGIN + LOCALSTORAGE
// =======================
function login(){
    const usuario = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({usuario, password})
    })
    .then(res => res.json())
    .then(data => {
        if(data.mensaje === "Login correcto"){
            localStorage.setItem("usuario", usuario);
            window.location.href = "lugares.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    })
    .catch(() => alert("Error en login"));
}

// =======================
// LOGOUT
// =======================
function logout(){
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}

// =======================
// PROTEGER PAGINA DE LUGARES
// =======================
function protegerRuta(){
    if(window.location.pathname.includes("lugares.html")){
        const user = localStorage.getItem("usuario");

        if(!user){
            alert("Debes iniciar sesión");
            window.location.href = "login.html";
        }
    }
}

// =======================
// CARGAR LUGARES TURÍSTICOS
// =======================
function cargarLugares(){
    const contenedor = document.getElementById("contenedor");

    if(!contenedor) return;

    fetch("http://localhost:3000/lugares")
    .then(res => res.json())
    .then(data => {

        contenedor.innerHTML = "";

        data.forEach((lugar, i) => {
            contenedor.innerHTML += `
                <div class="card fade-in" style="animation-delay:${i * 0.2}s">
                    <img src="img/${lugar.imagen}">
                    <h3>${lugar.nombre}</h3>
                    <p>${lugar.descripcion}</p>
                    <p><strong>Seguridad:</strong> ${lugar.seguridad}</p>
                    <p>🧭 Actividades: turismo, caminatas, fotografía</p>
                    <p>💰 Precio estimado: económico</p>
                    <p>📅 Mejor época: todo el año</p>
                </div>
            `;
        });
    })
    .catch(() => {
        contenedor.innerHTML = "<p>Error cargando lugares</p>";
    });
}

// =======================
// EXPORTAR PDF
// =======================
function exportarPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    // TÍTULO CENTRADO
    doc.setFontSize(16);
    doc.text("Tripify - Recorridos Turisticos", 105, y, null, null, "center");

    y += 10;

    // FECHA
    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(11);
    doc.text("Fecha: " + fecha, 10, y);

    y += 10;

    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const titulo = card.querySelector("h3").innerText;

        const overlay = card.querySelector(".card-overlay");

        let descripcion = "";
        let seguridad = "";

        if(overlay){
            const textos = overlay.querySelectorAll("p");

            // 🔥 QUITAR CARACTERES RAROS
            descripcion = textos[0]?.innerText.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
            seguridad = textos[1]?.innerText.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
        }

        // SALTO DE PAGINA
        if(y > 270){
            doc.addPage();
            y = 10;
        }

        // TITULO
        doc.setFontSize(14);
        doc.text("Lugar: " + titulo, 10, y);
        y += 6;

        // DESCRIPCION
        doc.setFontSize(11);
        doc.text("Descripcion: " + descripcion, 10, y);
        y += 6;

        // SEGURIDAD
        doc.text("Seguridad: " + seguridad, 10, y);
        y += 10;

        // LINEA
        doc.line(10, y, 200, y);
        y += 5;
    });

    doc.save("recorridos_tripify.pdf");
}
// =======================
// INICIO AUTOMÁTICO
// =======================
window.onload = function(){
    protegerRuta();
    cargarLugares();

    const user = localStorage.getItem("usuario");
    if(user){
        console.log("Sesión activa:", user);
    }
};
function mostrarUsuario(){
    const user = localStorage.getItem("usuario");
    if(user){
        const span = document.getElementById("usuarioActivo");
        if(span){
            span.textContent = "👤 " + user;
        }
    }
}
function eliminarCuenta(){
    const confirmacion = confirm("¿Seguro que quieres eliminar tu cuenta?");
    
    if(confirmacion){
        localStorage.removeItem("usuario");
        alert("Cuenta eliminada");
        window.location.href = "login.html";
    }
}
function mostrarAyuda(){
    document.getElementById("modalAyuda").classList.remove("oculto");
}

function cerrarAyuda(){
    document.getElementById("modalAyuda").classList.add("oculto");
}
function cargarLugares(){
    const contenedor = document.getElementById("contenedor");
    if(!contenedor) return;

    fetch("http://localhost:3000/lugares")
    .then(res => res.json())
    .then(data => {
        contenedor.innerHTML = "";

        data.forEach(l => {
            contenedor.innerHTML += `
            <div class="card">
                <img src="img/${l.imagen}">
                
                <div class="card-overlay">
                    <h3>${l.nombre}</h3>
                    <p>${l.descripcion}</p>
                    <p>Seguridad: ${l.seguridad}</p>
                    <p>🧭 Actividades: turismo, fotos</p>
                    <p>💰 Económico</p>
                </div>

                <h3 style="padding:10px">${l.nombre}</h3>
            </div>
            `;
        });
    });
}
window.onload = function(){
    protegerRuta();
    cargarLugares();
    mostrarUsuario();
}