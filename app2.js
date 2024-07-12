/*========================================
    FUNCIONAMIENTO DE LA APLICACIÓN 
  ========================================*/

/*====================
        VARIABLES  
  ====================*/
//ESTADOS: true->obj activo para moverlo  false->obj en otro lugar
var productsState = []; //Array booleanos para el estado del bloque izq
var cartState = []; //Array booleanos para el estado del bloque derec
var ticketText = []; //Array nombres para el ticket
var prices = []; //Array precios
var productMoving;
var ticketList;
var ticketTotal;

/*====================
        FUNCIONES  
  ====================*/
/**
* Función que establece el DRAG para la zona de productos de la izquierda: imagen que se está sosteniendo y su precio
* @param {Event} event 
*/
function productMovingEvent(event) {
    productMoving = event.target;
    console.log("moving");
}

/**
 * Función que actualiza la lista de productos y la cuantía total del ticket según los productos en el carrito
 */
function updateTicket() {
    for (let i = 0; i < cartState.length; i++) {
        if (cartState[i]) {
            ticketList.innerText += "  - " + ticketText[i] + "\n";
            ticketTotal.innerText += "" + (parseInt(ticketTotal.innerText) + parseInt(prices[i]));
        }
    }
}

/* ========================
      EVENTO PRINCIPAL  
   ========================*/
document.addEventListener('DOMContentLoaded', (event) => {
    //Información del ticket
    ticketList = document.getElementById("ticketList");
    ticketTotal = document.getElementById("totalPrice");

    //Variable para almacenar productos de la izq
    let draggableItems = document.getElementsByClassName("draggableItem");
    for (let item of draggableItems) {
        productsState.push(true);
        item.addEventListener('dragstart', productMovingEvent);
        item.addEventListener('drop', (event) => {

        });
    }

    //Variable para almacenar productos de la der
    let cartProducts = document.getElementsByClassName("cartProduct");
    let i = 0;
    for (let cartItem of cartProducts) {
        cartItem.addEventListener('drop', (event) => {
            let posProduct = parseInt(productMoving.id.substring(productMoving.id.length - 2));
            if (productsState[posProduct]) {
                productsState[posProduct] = false;
                //La posición del carrito en la que se suelta va a ser el último número del id de esa imagen del carrito
                //let posCart = event.target.id.substring(event.target.id.length - 1);
                cartState[i] = true;
                ticketText[i] = productMoving.title;
                let posInit = productMoving.title.indexOf("(");
                let priceTitle = productMoving.title.substring(posInit, productMoving.title.length - 2);
                prices[i] = priceTitle;
                updateTicket();
            }
        });
        i++;
    }

})