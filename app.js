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
/*====================
      FUNCIONES  
====================*/

function productMoving(event) {
      productImg = event.target;
      console.log("moving");
      //Almacenamos el precio de ese producto para luego actualizar el ticket
      let posInit = productImg.title.indexOf("(");
      productPrice = productImg.title.substring(posInit + 1, productImg.title.length - 2);

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
      }
      //Añadimos la funcionalidad sobre los contenedores del carrito para soltar los productos
      productCart = document.getElementsByClassName("product");
      for (let item of productCart) {
            item.addEventListener('dragover', e => { e.preventDefault(); });
            item.addEventListener('drop', (item) => {
                  item.target.src = productImg.src; //Cambiamos la imagen del carrito por la seleccionada
                  //Añadimos el producto al ticket
                  console.log("ticket text: " + ticketList.innerText);
                  let posInit = productImg.title.indexOf("(");
                  ticketList.innerText += "    ** " + productImg.title.substring(0, posInit - 1) + "....." + productPrice + "€\n";
                  sum += parseInt(productPrice);
                  total.textContent = sum;
            });
      }
});
