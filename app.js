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
var totalPrice; //texto con el precio total
var sum; //suma para actualizar el precio total
var productPrice;
/*====================
      FUNCIONES  
====================*/

function productMoving(event) {
      productImg = event.target;
      productPrice=productImg.getElementsByClassName("priceProduct");
      console.log("product price: "+productPrice);
      console.log("moving");
}


/* ========================
      EVENTO PRINCIPAL  
   ========================*/
document.addEventListener('DOMContentLoaded', (ev) => {
      //Variables para cambiar el texto del ticket
      ticketList = document.getElementById("ticketList");
      ticketList.innerText="";
      totalPrice = document.getElementsByClassName("totalPrice");
      sum = 0;

      //Añadimos la funcionalidad de movimiento (drag) a todos los productos
      draggableItems = document.getElementsByClassName("draggableItem");
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
                  console.log(ticketList.innerText);
                  ticketList.innerText+="** "+productImg.title+"..."+productPrice.innerText+"€\n";
                  sum+=parseInt(productPrice.innerText);
                  totalPrice.innerText=sum;
                  console.log(ticketList.innerText);
            });
      }
});
