console.log("Pop Up JS");
function addJqueryScript() {

    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log("Script Added");
}
function addAxioscript() {

    var script = document.createElement('script');
    script.src = 'https://unpkg.com/axios/dist/axios.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    var script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js';
    script1.integrity = 'sha512-odNmoc1XJy5x1TMVMdC7EMs3IVdItLPlCeL5vSUPN2llYKMJ2eByTTAIiiuqLg+GdNr9hF6z81p27DArRFKT7A==';
    script1.crossorigin = 'anonymous';
    script1.referrerpolicy = 'no-referrer';
    document.getElementsByTagName('head')[0].appendChild(script1);
 
    var script2 = document.createElement('script');  
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.js';
    script2.integrity = 'sha512-rozBdNtS7jw9BlC76YF1FQGjz17qQ0J/Vu9ZCFIW374sEy4EZRbRcUZa2RU/MZ90X2mnLU56F75VfdToGV0RiA==';
    script2.crossorigin = 'anonymous';
    script2.referrerpolicy = 'no-referrer';
    document.getElementsByTagName('head')[0].appendChild(script2);
    console.log("Axios Script Added");

}

addJqueryScript();
addAxioscript();
async function ecoBagFunc() {
    const data2 = await axios.get(window.Shopify.routes.root + 'admin/currencies.json',);
    console.log("DAta", data2);
    console.log("USD = ", ShopifyAnalytics.meta.currency); 

    jQuery.getJSON(window.Shopify.routes.root + 'products/eco-bag.js', function (product) {
        // alert('The title of this product is ' + product.title);
        document.getElementById('productTitle').innerHTML = `ADD ${product.title}`;
        document.getElementById('productDescription').innerHTML = product.description;
        console.log(Math.ceil(product.variants[0].price) / 100);   
        document.getElementById('productImage').src = product.images[0]
        document.getElementById('productPrice').innerHTML = `${ShopifyAnalytics.meta.currency === 'USD'? "$" : ShopifyAnalytics.meta.currency } ${ (product.variants[0].price)/100 }`
        // document.getElementById('productPrice').innerHTML = product.variants[0].price
    });

}

async function addToCartEcoBag() {

    const cartData = {
        "items": [
            {
                "id": 39449084919937,
                "quantity": 1
            }
        ]
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(cartData),  
    }
    const { data } = await axios.post(window.Shopify.routes.root + "cart/add.js", cartData, config)
    console.log("data", data);
   
    location.replace(window.Shopify.routes.root + 'checkout.js').then(() => console.log("redirected"))
}

async function noThanks() {
    location.replace(window.Shopify.routes.root + 'checkout.js').then(() => console.log("redirected"))

}

function noThanksBTN() {

    document.getElementById('noThanks').addEventListener('click', noThanks)
}
function closeModalBTN() {

    document.getElementById('closeModal').onclick = function () {
        document.getElementById('popupmodal').style.display = "none";
        console.log("Modal closed");
    }
}
function addToCartBTN() {

    document.getElementById('addBtn').addEventListener('click', addToCartEcoBag);
}
    
function idCartDrawer_Checkout() {

    document.getElementById('CartDrawer-Checkout').addEventListener("click",function (e) {
    
        e.preventDefault();
        console.log("idCartDrawer_Checkout");
        modalTogal(9999);
    })
}
function idcart_notification_form() {
    document.getElementById('cart-notification-form').onclick = function (e) {
        e.preventDefault();
        modalTogal(6);
    }
}

function idcheckout() {
    document.getElementById('checkout').onclick = function (e) {
        e.preventDefault();
        
        modalTogal(6);
    }
    
}

if (document.getElementById('checkout')) {
    console.log('Hello checkout');
    idcheckout();
}

if (document.getElementById('CartDrawer-Checkout')) {
    console.log('Hello CartDrawer-Checkout');  
     idCartDrawer_Checkout();
}
if (document.getElementById('cart-notification-form')) {
    console.log('Hello cart-notification-form');
    idcart_notification_form();
}
function modalTogal(popZIndex) {
    if (document.getElementById('popupmodal').style.display == "flex") {

        document.getElementById('popupmodal').style.display = "none";
        document.getElementById('popupmodal').style.zIndex = -1;
        // document.getElementById('shopify-section-header').style.zIndex = 3;

        console.log('closed')
    }
    else {
        // event.stopImmediatePropagation();
        document.getElementById('popupmodal').style.display = "flex";
        document.getElementById('popupmodal').style.zIndex = popZIndex;
        document.getElementById('popupmodal').style.justifyContent = "center";
        document.getElementById('popupmodal').style.alignItems = "center";
        // document.getElementById('shopify-section-header').style.zIndex = -1;
        console.log('opened')
        ecoBagFunc()
        addToCartBTN()
        noThanksBTN()
        closeModalBTN()
    }
}
async function getData(){
   
}
getData()

function findUSD(USD) {
    return USD = "$"
  }