/*========================================
    FUNCIONAMIENTO DE LA APLICACIÓN 
  ========================================*/

/*====================
        VARIABLES  
  ====================*/
var draggableItems; //elementos de la izq
var productImg; //producto en movimiento de la izq
var productCart; //array con todos los productos del carrito
var ticketList; //texto del ticket
var total; //texto con el precio total
var sum; //suma para actualizar el precio total
var productPrice;
//---Variables proceso inverso
var cartImage;
var movingCart=false;
/*====================
      FUNCIONES  
====================*/

/**
 * Función que establece el DRAG para la zona de productos de la izquierda: imagen que se está sosteniendo y su precio
 * @param {Event} event 
 */
function productMoving(event) {
      productImg = event.target;
      console.log("moving");
      //Almacenamos el precio de ese producto para luego actualizar el ticket
      let posInit = productImg.title.indexOf("(");
      productPrice = productImg.title.substring(posInit + 1, productImg.title.length - 2);
      //Nos aseguramos de que no se pueda acceder al drop en la misma zona (IZQ) para evitar que al soltar un item agarrado por descuido, se borre del ticket si está añadido en el carrito
      movingCart=false; 
}

function movingFromCart(event){
      cartImage=event.target;
      movingCart=true;
      console.log("hola");
}

/* ========================
      EVENTO PRINCIPAL  
   ========================*/
document.addEventListener('DOMContentLoaded', (ev) => {
      //---- Variables para cambiar el texto del ticket ----
      ticketList = document.getElementById("ticketList");
      total = document.getElementById("totalPrice");
      sum = 0;

      draggableItems = document.getElementsByClassName("draggableItem"); //Añadimos el movimiento (drag) a todos los productos a la izq
      for (let item of draggableItems) {
            item.addEventListener('dragstart', productMoving);
            item.addEventListener('drop', (item)=>{
                  if(movingCart && cartImage.src==productImg.src){
                        //Eliminamos el producto del ticket
                        let titleProduct=cartImage.title;
                        ticketList.innerText=ticketList.innerText.replace(titleProduct,'');

                        //Volvemos a establecer la imagen original del carrito
                        cartImage.src="./img/product.png";
                        movingCart=false;
                  }
            })
      }
      //Añadimos la funcionalidad sobre los contenedores del carrito para soltar los productos
      productCart = document.getElementsByClassName("product");
      for (let item of productCart) {
            item.addEventListener('dragover', e => { e.preventDefault(); });
            item.addEventListener('drop', (item) => {
                  //Condicional para asegurar que no se añade al ticket el mimso producto si se suelta sobre él mismo
                  if (item.target.src != productImg.src) {
                        item.target.src = productImg.src; //Cambiamos la imagen del carrito por la seleccionada
                        //----- Añadimos el producto al ticket -----
                        let posInit = productImg.title.indexOf("(");
                        ticketList.innerText += "    ** " + productImg.title.substring(0, posInit - 1) + "....." + productPrice + "€\n";
                        //----- Calculamos el precio total -----
                        sum += parseInt(productPrice);
                        total.textContent = sum;
                  }
            });
            item.addEventListener('dragstart', movingFromCart);
      }

      //COSAS QUE HACER:
      /*
      - Darle a los productos de la izq el evento del drop para poder devolverlos a su sitio, borrarlos del ticket y volver
      a poner como imagen en la derecha la cajita naranja
      - a las cajas de la derec darle el evento de drap
      */

      
});
