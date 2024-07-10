/*========================================
    FUNCIONAMIENTO DE LA APLICACIÓN 
  ========================================*/

/*====================
        VARIABLES  
  ====================*/
var draggableItems;
var productImg;
var productCart;
/*====================
      FUNCIONES  
====================*/

function productMoving(event) {
      productImg = event.target;
      console.log("moving");
}


/* ========================
      EVENTO PRINCIPAL  
   ========================*/
document.addEventListener('DOMContentLoaded', (ev) => {
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
                  console.log("item src: "+item.src);
                  item.target.src = productImg.src;
                  console.log("item src: "+item.src);
                  console.log("productImg src: "+productImg.src);
                  console.log("change");
            });
      }
});
