// Esta es la variable que controla cuántos elementos se consideran en el tablero en cada eje (XY)
var nivel = 4;

// En esta variable se almacena el número calculado de la cantidad de fichas que se desean utilizar
// con base al nivel especificado
var cantidad_fichas;

// Objeto para guardar el tablero del rompecabezas 
var tablero_rompecabezas;

// Pantalla de inicio, apenas se abre la sesión del juego
var seccion_de_inicio = document.getElementById('seccion_de_inicio');

// Objeto que se llama cuando el tablero es resuelto
var nivel_completado = document.getElementById('nivel_completado');

// Esta rutina inicia el juego, definiendo la cantidad de fichas
// tanto en el eje X como Y para crear el tablero.
function IniciarJuego() {

    //Se calculan la cantidad de fichas en el arreglo. El "-1" es el espacio en blanco en el tablero
    cantidad_fichas = Math.pow(nivel, 2) - 1;

    //Se oculan la pantalla principal y el mensaje de resultad completado en caso de estar visibles.
    seccion_de_inicio.style.display = "none";
    nivel_completado.style.display = "none";

    //Se llama el método para dibujar el tablero, dando inicio al juego, una vez configurados los parámetros
    dibujar();
}
  
// Esta rutina crea dinámicamente los elementos del tablero y los eventos asociados a ellos.
// Dicha funcionalidad se puede ver en este URL https://www.w3schools.com/jsref/met_document_createelement.asp
// Esto es prácticamente crear instancias de objetos y métodos.
function dibujar() {
    // Se crea el div que contiene todos los elementos dentro
    tablero_rompecabezas = document.createElement('div');

    // Le asigna la clase al elemento
    tablero_rompecabezas.classList.add('tablero_rompecabezas')

    // El ancho y la altura se configurar con base a la cantidad de fichas con las que cuenta el tablero,
    // usando como referencia que cada ficha mide 100px, se dejan 5px de margen en los 4 lados.
    tablero_rompecabezas.style.height = nivel * 110 + 'px';
    tablero_rompecabezas.style.width = nivel * 110 + 'px';

    for(i = cantidad_fichas; i >= 0; i--) {
        // Este método agrega un una nueva ficha dentro del DIV
        crear_ficha(tablero_rompecabezas);
    }

    // Una vez que ya el objeto fue instanciado, se agrega en el código del cuerpo de la página
    document.body.appendChild(tablero_rompecabezas);
    revolver();
}

// Método para agregar el código HTML de una nueva ficha
function crear_ficha(parent) {
    // Cada ficha se crea como un "DIV" dentro de un objeto
    var ficha = document.createElement('div');
    
    // Se le asigna el número a la ficha
    ficha.textContent = i;

    // Se le agrega la clase
    ficha.classList.add('ficha');

    // Se le asigna el evento
    ficha.addEventListener('click', ejecutar_movimiento);
    
    // Se agrega el objeto al código HTML
    parent.appendChild(ficha);

    // Es importante saver que si el nivel del cuadro es PAR, las fechas finales deben ser 3 1 2,
    // en vez de 3 2 1 al inicio, de no ser así el juego sería imposible (o extremadamente difícil)
    // de resolver.
    if(nivel % 2 === 0) { // Si el número XY es par
        if(i === 1) { // Si el número que está insertando es un 1

            // Se realiza un ajuste de los valores para cumplir la validación anterior.
            ficha.textContent = 2;
            ficha.previousSibling.textContent = 1;
        }
    }
    // Si el valor que está dibujando es un 0 (ficha vacía) se le asigna la clase que corresponde.
    if(i === 0) {
        ficha.classList.add('espacio_vacio');
    }

    // Agrega la ficha al código HTML
    parent.appendChild(ficha);
}
  
// Este es el método que se agrega a cada una de las fichas de forma dinámica
function ejecutar_movimiento() {

    // Se le asigna a esta variable un elemento de la página, usando el método document.querySelector,
    // el cuál busca el primero elemento que contenga la clase que se especifica como parámetro.
    // Se puede ver la documentación del método aquí: https://www.w3schools.com/jsref/met_document_queryselector.asp
    var espacio_vacio = document.querySelector('.espacio_vacio');

    // Se mueve la ficha a la cuál se le hizo click. La instancia del objeto es llamada por medio de la palabra "this"
    mover.call(this, Number(this.textContent), espacio_vacio);

    // Revisión del estatus del juego después de cada movimiento, para validar si el tablero ya se resolvió
    if(solucionado()) {
        nivel_completado.style.display = "block";
        document.body.removeChild(tablero_rompecabezas);
    }
}

// Este es el método que, de ser posible, realiza el movimiento de la ficha
function mover(ficha, destino) {
    // El método slice, toma una serie de valores y los convierte en un arreglo. En este caso, busca todos los elementos
    // con la clase ".ficha" y los agrega en la variable mi Arreglo
    var miArreglo = Array.prototype.slice.call(document.querySelectorAll('.ficha'));
    
    // Revisa si el movimiento se puede realizar o no
    if(esMovimientoPosible(miArreglo, ficha)) {
        // Se procede a cambiar la ficha seleccionada con la posición destino, la cuál contiene el espacio en blanco
        intercambiar(this, destino);
    }
}

// Este es el método que devuelve TRUE o FALSE en caso de que el movimiento se pueda realizar
// La clave de este método, es que utiliza los valores contenidos dentro de cada ficha.
function esMovimientoPosible(miArreglo, ficha) {
    
    // Se recorre el arreglo de forma ordenada, inicio a fin.
    for(var i = 0; i < miArreglo.length; i++) {

        // Valida si encontró el número de la ficha seleccionada dentro del arreglo, no hacerlo sólo sigue el ciclo
        if(Number(miArreglo[i].textContent) === ficha) {

            // Cuando se encontró el número de la  ficha dentro del arreglo de objetos, se valida si el movimiento
            // es posible por medio de condiciones, que validan si existe una celda arriba, abajo, izquierda o a
            // la derecha sin texto.
            if(
                // Revisa si el movimiento para arriba es posible
                (miArreglo[i - nivel] && miArreglo[i - nivel].textContent == 0) || 
                // Revisa si el movimiento para abajo es posible
                ((miArreglo[i + nivel]) && miArreglo[i + nivel].textContent == 0) ||
                // Revisa el el movimiento para la izquierda es posible
                ((i % nivel) && miArreglo[i - 1].textContent == 0) || 
                // Revisa el el movimiento para la derecha es posible
                (((i + 1) % nivel) && miArreglo[i + 1].textContent == 0)
                )
            {
                // Si alguna de las condiciones se cumplió, significa que sí hay una celda vacía y sí se puede mover
                return true;
            } else {
                // No hay una celda vacía. Se invalida el movimiento
                return false;
            }
        }
    }
}

// Este método intercambia las celdas (seleccionada y vacía) de lugar, utilizando el método de burbuja
function intercambiar(celda1, celda2) {
    // Se clona el NODO OBJETO de la lista de elementos en la celda1 en una variable temporal.
    // Se puede ver la info del comando aquí: https://www.w3schools.com/jsref/met_node_clonenode.asp
    var tmp = celda1.cloneNode(true);

    // Se reemplaza el valor de tmp con celda1
    celda1.parentNode.replaceChild(tmp, celda1);

    // Se reemplaza el valor de celda1 con el valor de celda2
    celda2.parentNode.replaceChild(celda1, celda2);

    // Se reemplaza el valor de celda2 con el valor de tmp
    tmp.parentNode.replaceChild(celda2, tmp);
}

// Este método revolverá las fichas del tablero
function revolver() {

    for(var i = 0; i < (200 * nivel); i++) {
        // Obtiene el objeto designado como espacio vacío
        var espacio_vacio = document.querySelector('.espacio_vacio');

        // Obtiene las los objetos con la clase ".ficha" y los coloca en un arreglo
        var fichas =  Array.prototype.slice.call(document.querySelectorAll('.ficha'));

        // Obtiene el número de la posición donde está la ficha vacía
        var espacio_vacio_posicion = fichas.indexOf(espacio_vacio);
        
        // Obtiene todas las direcciones alrededor del espacio vacío en donde se puede realizar un movimiento
        var direcciones = [fichas[espacio_vacio_posicion - nivel], fichas[espacio_vacio_posicion + nivel], fichas[espacio_vacio_posicion + 1], fichas[espacio_vacio_posicion - 1]].filter(direccion => direccion);
        
        // Se obtiene del arreglo direcciones, una al azar con base a las dimensiones del tablero
        var direccion_aleatoria = direcciones[Math.floor(Math.random() * direcciones.length)];

        // Intercambia el valor de la ficha en blanco con la ficha seleccionada aleatoriamente
        if(esMovimientoPosible(fichas, Number(direccion_aleatoria.textContent))) {
            intercambiar(espacio_vacio, direccion_aleatoria);
        }
    }
}

// Método encargado de validar si las fichas ya están en orden o no
function solucionado() {
    // Carga todas las fichas actuales en un arreglo
    var arr = Array.prototype.slice.call(document.querySelectorAll('.ficha'));

    // Define la ficha de inicio para validar el orden
    var index = 1;
    for(var i = 0; i < arr.length; i++) {
        if(i === cantidad_fichas) { // Si ya terminó de revisar todas las fichas entonces están ordenadas
            return true;
        } else {
            // Si el número de la ficha NO es igual al número del índice, significa que el arreglo NO está en orden
            if(Number(arr[i].textContent) !== index) {
                return false;
            }
        }
        index++;
    }
    // Valor por defecto en caso de terminar el ciclo y todo estar bien
    return true;
}