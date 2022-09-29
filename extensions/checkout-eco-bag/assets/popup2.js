// console.log("Pop Up 2 JS")

// const ecoBagFunc = () => {
//     jQuery.getJSON(window.Shopify.routes.root + 'products/eco-bag.js', function (product) {
//         // alert('The title of this product is ' + product.title);
//         document.getElementById('productTitle').innerHTML = `ADD ${product.title}`;
//         document.getElementById('productDescription').innerHTML = product.description;
//         console.log(product.variants[0].price);
//         document.getElementById('productImage').src = product.images[0]
//         document.getElementById('productPrice').innerHTML = `$${product.variants[0].price}`
//         // document.getElementById('productPrice').innerHTML = product.variants[0].price
//     });

// }
// const addToCartEcoBag = async () => {


//     const cartData = {
//         "items": [
//             {
//                 "id": 39449084919937,
//                 "quantity": 1
//             }
//         ]
//     }
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//         data: JSON.stringify(cartData),
//     }
   

//     const { data } = await axios.post(window.Shopify.routes.root + "cart/add.js", cartData, config)
//     console.log("data", data);
//     location.replace(window.Shopify.routes.root + 'checkout.js').then(() => console.log("redirected"))
// }
// const noThanks = async () => {
//     location.replace(window.Shopify.routes.root + 'checkout.js').then(() => console.log("redirected"))

// }

// function noThanksBTN(){

//     document.getElementById('noThanks').addEventListener('click', noThanks)
// }
// function closeModalBTN(){

//     document.getElementById('closeModal').onclick = function () {
//         document.getElementById('popupmodal').style.display = "none";
//         console.log("Modal closed");
//     }
// }
// function addToCartBTN(){

//     document.getElementById('addBtn').addEventListener('click', addToCartEcoBag);
// }

// document.getElementById('cart-notification-form').onclick = function (e) {
//     e.preventDefault();
    
//     modalTogal();
    
    
// }
// document.getElementById('checkout').onclick = function (e) {
//     e.preventDefault();
    
//     modalTogal();
    
    
// }
// // document.getElementById('CartDrawer-Checkout').onclick = function (e) {
// //     e.preventDefault();
    
// //     modalTogal();
    
    
// // }



// const checkoutTax = async () => {
//     console.log("Hello Checkout");

    

//     try {
//         // const { data } = await axios.post(window.Shopify.routes.root + "admin/orders.json", taxItem, config)
//         // console.log("data", data);

//         jQuery.post(window.Shopify.routes.root + 'cart/update.js', {
//             updates: {
//                 39449084919937: 1,
//                 // 794864233: 3
                
                
//             }
//         }).then(() => location.replace(window.Shopify.routes.root + 'checkout.js').then(() => console.log("redirected")))

//     } catch (error) { 
//         console.log("Error" + error);
//     }
// }

// // document.getElementById('continue_button').onclick = checkoutTax();

// // document.getElementById('addBtn').addEventListener('click', checkoutTax) 
// // document.getElementById('checkout').addEventListener('click', stopPropagation) 
// // document.getElementById('checkout').addEventListener('click', addToCartEcoBag) 

// function stopPropagation(){
//     console.log("Hello from stopPropagation");
//     event.stopImmediatePropagation();
// }

// function modalTogal(){
//     if (document.getElementById('popupmodal').style.display == "flex") {
//         // stopPropagation();
//         document.getElementById('popupmodal').style.display = "none";
//         document.getElementById('popupmodal').style.zIndex = -1;
//         // document.getElementById('shopify-section-header').style.zIndex = 3;
 
//         console.log('closed')
//     }
//     else {
//         // event.stopImmediatePropagation();
//         document.getElementById('popupmodal').style.display = "flex";
//         document.getElementById('popupmodal').style.zIndex = 6;
//         document.getElementById('popupmodal').style.justifyContent = "center";
//         document.getElementById('popupmodal').style.alignItems = "center";
//         // document.getElementById('shopify-section-header').style.zIndex = -1;
//         console.log('opened')
//         ecoBagFunc()
//         addToCartBTN()
//         noThanksBTN()
//         closeModalBTN()
//     }  
// }