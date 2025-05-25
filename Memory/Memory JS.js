//Crear objeto carta.
function Carta(){
    this.id = null;
    this.nom = null;
    this.src = null;
}


// Funcion para mezclar un array.
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
}

//Funcion para crear una ficha.
function crearFicha(carta) {
    let ficha = document.createElement("div");
    let imatge = document.createElement("img");
    imatge.src = carta.src;
    imatge.alt = carta.nom;
    ficha.appendChild(imatge);
    ficha.classList.add("cartaTapada");
    ficha.onclick = destapar;
    return ficha;
}

//Variables globales para el contador.
let count;
let seg = 0;
function iniContador(){
    seg = 0;
    document.getElementById("contador").innerHTML = seg;

    clearInterval(count);

    count = setInterval(()=>{
        seg++;
        document.getElementById("contador").innerHTML = seg;
    },1000);
}


//Arrays.
let cartasMoodle = [];
let cartesTaulell = [];


//Bucle que crea todas las cartas.
for (let i = 0; i < 17; i++){
    let carta = new Carta();
    carta.id = (i + 1);
    carta.nom = "ODS " + (i+1);
    if (i <9){
        carta.src = "../Imatges/S-WEB-Goal-0"+(i+1)+".png";
    } else {
        carta.src = "../Imatges/S-WEB-Goal-"+(i+1)+".png";
    }
    cartasMoodle.push(carta);
}

//LocalStorage de records.
let recEasy = localStorage.getItem("easy");
let recMid = localStorage.getItem("mid");
let recHard = localStorage.getItem("hard");
document.getElementById("easy").innerHTML = recEasy;
document.getElementById("mid").innerHTML = recMid;
document.getElementById("hard").innerHTML = recHard;

//Funcion para iniciar el juego.
let total = 0;
let dificultat = document.getElementById("Seleccion").value;
function Start(){
    dificultat = document.getElementById("Seleccion").value;
    iniContador();
    mezclarArray(cartasMoodle);
    let tablero = document.getElementById("Taulell");
    let parejas = 0;
    tablero.innerHTML = "";
    cartesTaulell = [];

    if(dificultat === "facil"){
        parejas = 5;
    } else if (dificultat === "mig"){
        parejas = 10;
    } else {
        parejas = 15;
    }

    total = parejas*2;

    for (let i = 0; i < parejas; i++){
        let carta = cartasMoodle[i];

        cartesTaulell.push(crearFicha(carta));
        cartesTaulell.push(crearFicha(carta));
    }

    mezclarArray(cartesTaulell);
    cartesTaulell.forEach(f => tablero.appendChild(f));
}

//Boolean para controlar los clicks.
let noMore = false;

//Listas para hacer comparaciones.
let cComp = document.querySelectorAll(".comparable");
let cCorrectas = document.querySelectorAll(".correcta");

//Funcion para destapar una carta.
function destapar() {
    if (!noMore) {
        if (this.classList.contains("cartaTapada")) {
            this.classList.remove("cartaTapada");
            this.classList.add("cartaDestapada");
            this.classList.add("comparable");
        }
    }

    //Verificar si hay dos cartas comparables destapadas.
    cComp = document.querySelectorAll(".comparable");
    if (cComp.length === 2) {
        noMore = true; // Bloqueja les interaccions mentre es comparen les cartes
        comprobar();
    }
}

//Funcion para tapar una carta.
function tapar(carta) {
    if (carta.classList.contains("cartaDestapada")) {
        carta.classList.remove("cartaDestapada", "comparable");
        carta.classList.add("cartaTapada");
    }
}


//Funcion para comprobar si las cartas son iguales.
function comprobar() {

    if (cComp[0].querySelector("img").alt === cComp[1].querySelector("img").alt) {

        //Si són iguales, se marcan como correctas.
        cComp[0].classList.add("correcta");
        cComp[1].classList.add("correcta");
        cComp[0].classList.remove("comparable");
        cComp[1].classList.remove("comparable");

        noMore = false;

        //Comprobar si hemos ganado.
        cCorrectas = document.querySelectorAll(".correcta");
        if (cCorrectas.length === total) {
            final();
        }
    } else {

        //Si no són iguales tapamos desoues de 2s.
        setTimeout(() => {
            tapar(cComp[0]);
            tapar(cComp[1]);
            noMore = false;
        }, 2000);
    }
}

//Funcion para parar el timer y acualizar record
function final(){
    clearInterval(count);
    let time = seg;
    document.getElementById("resultat").innerHTML = "Has guanyat la partida!!";

    let dificultat = document.getElementById("Seleccion").value;

    if(dificultat === "facil"){
        let recEasy = localStorage.getItem("easy");
        if(recEasy === "null"){
            recEasy = time;
            localStorage.setItem("easy", recEasy);
            document.getElementById("easy").innerHTML = recEasy;
            document.getElementById("resultat").innerHTML += "<br> Has batut un nou rècord per a la dificultat facil";
        } else {
            recEasy = parseInt(recEasy);  //Convertir el valor a num
            if(time < recEasy){
                recEasy = time;
                localStorage.setItem("easy", recEasy);
                document.getElementById("easy").innerHTML = recEasy;
                document.getElementById("resultat").innerHTML += "<br> Has batut un nou rècord per a la dificultat facil";
            }
        }
    } else if (dificultat === "mig"){
        let recMid = localStorage.getItem("mid");
        if(recMid === "null"){
            recMid = time;
            localStorage.setItem("mid", recMid);
            document.getElementById("mid").innerHTML = recMid;
            document.getElementById("resultat").innerHTML += "<br> Has batut un nou rècord per a la dificultat mitja";
        } else {
            recMid = parseInt(recMid);
            if(time < recMid){
                recMid = time;
                localStorage.setItem("mid", recMid);
                document.getElementById("mid").innerHTML = recMid;
                document.getElementById("resultat").innerHTML += "<br> Has batut un nou rècord per a la dificultat mitja";
            }
        }
    } else {
        let recHard = localStorage.getItem("hard");
        if(recHard === "null"){
            recHard = time;
            localStorage.setItem("hard", recHard);
            document.getElementById("hard").innerHTML = recHard;
            document.getElementById("resultat").innerHTML += "<br> Has batut un nou rècord per a la dificultat dificil";
        } else {
            recHard = parseInt(recHard);
            if(time < recHard){
                recHard = time;
                localStorage.setItem("hard", recHard);
                document.getElementById("hard").innerHTML = recHard;
                document.getElementById("resultat").innerHTML += "<br> Has batut un nou rècord per a la dificultat dificil";
            }
        }
    }
}




