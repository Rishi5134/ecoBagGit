console.log("Pop Up JS");

var script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(script);
console.log("Script Added");

var script = document.createElement("script");
script.src = "https://unpkg.com/axios/dist/axios.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

var script1 = document.createElement("script");
script1.src =
    "https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js";
script1.integrity =
    "sha512-odNmoc1XJy5x1TMVMdC7EMs3IVdItLPlCeL5vSUPN2llYKMJ2eByTTAIiiuqLg+GdNr9hF6z81p27DArRFKT7A==";
script1.crossOrigin = "anonymous";
script1.referrerpolicy = "no-referrer";
document.getElementsByTagName("head")[0].appendChild(script1);

var script2 = document.createElement("script");
script2.src = "https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.js";
script2.integrity =
    "sha512-rozBdNtS7jw9BlC76YF1FQGjz17qQ0J/Vu9ZCFIW374sEy4EZRbRcUZa2RU/MZ90X2mnLU56F75VfdToGV0RiA==";
script2.crossOrigin = "anonymous";
script2.referrerpolicy = "no-referrer";
document.getElementsByTagName("head")[0].appendChild(script2);
console.log("Axios Script Added");


async function checkEcoBag() {
    const ecoBagExists = await axios
        .get(window.Shopify.routes.root + "cart.js")
        .then(() => console.log("Done"))
        .catch((e) => console.log("Error: ", e));
    const foundEcoBag = ecoBagExists.data.items;
    var obj = foundEcoBag.find((o) => o.title === "Eco Bag");
    console.log(obj.title);
    if (obj.title === "Eco Bag") {
        noThanksBTN();
    } else {
        idcart_notification_form();
    }
}

async function ecoBagFunc() {
    jQuery.getJSON(
        window.Shopify.routes.root + "products/eco-bag.js",
        function (product) {
            // alert('The title of this product is ' + product.title);
            if (product.variants.length === 1) {
                console.log(document.getElementById('innerBlock4').classList.add('visually-hidden') );
            }
            console.log("Inner HTML", document.getElementById('addToCartID').innerHTML);
            if (document.getElementById('addToCartID').innerHTML === '') {
                    console.log("We are done bro...");
                    document.getElementById("productPrice").innerHTML =  `${ShopifyAnalytics.meta.currency} ${product.price / 100}`
                    document.getElementById("productImage").src =  product.images[0];
                    document.getElementById("addToCartID").innerHTML = product.variants[0].id;
                    console.log(document.getElementById('addToCartID').innerHTML);
                    
            }
            console.log(product.variants);
            console.log("Length of variants: ", product.variants.length);
            document.getElementById(
                "productTitle"
            ).innerHTML = `ADD ${product.title}`;
            // document.getElementById("variantTitle").innerHTML = product.variants.map((i) => (`${i.title}`));
            
            $('#variantSelector').append(product.variants.map((i,index) => `<button class='variantTitle'  id='${i.id}' value='${i.title}' >${i.title}</button>`));
            document.getElementById("productDescription").innerHTML =
            product.description;
            
            product.variants.map((i) => document.getElementById(i.id).addEventListener('click', function(){
                console.log("We are done bro...", i.id);
                document.getElementById("productPrice").innerHTML =  `${ShopifyAnalytics.meta.currency} ${i.price / 100}`
                document.getElementById("productImage").src =  i.featured_image.src 
                document.getElementById("addToCartID").innerHTML = i.id;
                console.log(document.getElementById('addToCartID').innerHTML);
                
            }))

        }
    );
}

async function addToCartEcoBag() {

    const ecoBagData = await fetch(window.Shopify.routes.root + 'admin/products.json', {
        method: 'GET',
    }).then(response => response.json())
        .then(data => { return data }).catch((err) => console.log(err));
    console.log("Eco Bag Data", ecoBagData.products);
    var obj = ecoBagData.products.find((o) => o.title === "Eco Bag");
    console.log("obj", obj.variants[0].id);

    const cartData = {
        items: [
            {
                id: document.getElementById('addToCartID').innerHTML,
                quantity: 1,
            },
        ],
    };

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(cartData),
    };
    const { data } = await axios.post(
        window.Shopify.routes.root + "cart/add.js",
        cartData,
        config
    );
    console.log("data", data);

    location
        .replace(window.Shopify.routes.root + "checkout.js")
        .then(() => console.log("redirected"));
}

async function noThanks() {
    location
        .replace(window.Shopify.routes.root + "checkout.js")
        .then(() => console.log("redirected"));
}

function noThanksBTN() {
    document.getElementById("noThanks").addEventListener("click", noThanks);
}
function closeModalBTN() {
    document.getElementById("closeModal").onclick = function () {
        document.getElementById("popupmodal").style.display = "none";
        console.log("Modal closed");
    };
}
function addToCartBTN() {
    document.getElementById("addBtn").addEventListener("click", addToCartEcoBag);
}

async function idCartDrawer_Checkout(e) {

    const findAddButn = document.querySelectorAll('[name="add"]');

    console.log("findBtn", findAddButn);
    for (i = 0; i < findAddButn.length; i++) {
        findAddButn[i].addEventListener('click', async function (e) {
            e.preventDefault();

            console.log("Clicked");
            await jQuery.post(window.Shopify.routes.root + 'cart/add.js', $('form[action$="/cart/add"]').serialize()).then(async () => {
                console.log(jQuery.get(window.Shopify.routes.root + 'cart.js'));
                location.reload().then(() => {

                })

            });

            document.querySelector('body').setAttribute('class', 'gradient overflow-hidden');
            document.querySelector('cart-drawer').setAttribute('class', 'drawer animate active');

        });
    }

    document
        .getElementById("CartDrawer-Checkout")
        .addEventListener("click", async function (e) {
            e.preventDefault();



            const ecoBagExists = await axios.get(
                window.Shopify.routes.root + "cart.js"
            );

            const foundEcoBag = ecoBagExists.data.items;
            console.log("foundEcoBag: " + foundEcoBag);
            var obj = foundEcoBag.find((o) => o.product_title === "Eco Bag");

            if (obj) {
                console.log("Eco Bag found");

                location
                    .replace(window.Shopify.routes.root + "checkout.js")
                    .then(() => console.log("redirected"));

            } else {
                console.log("Eco Bag not found");
                modalTogal(9999);
            }
        });
}
async function idcart_notification_form() {
    document.getElementById("cart-notification-form").onclick = async function (
        e
    ) {
        e.preventDefault();
        const ecoBagExists = await axios.get(
            window.Shopify.routes.root + "cart.js"
        );
        const foundEcoBag = ecoBagExists.data.items;
        console.log("foundEcoBag: " + foundEcoBag);
        var obj = foundEcoBag.find((o) => o.product_title === "Eco Bag");

        if (obj) {
            console.log("Eco Bag found");

            location
                .replace(window.Shopify.routes.root + "checkout.js")
                .then(() => console.log("redirected"));
        } else {
            console.log("Eco Bag not found");
            modalTogal(6);
        }
    };
}

async function idcheckout() {
    document.getElementById("checkout").onclick = async function (e) {
        e.preventDefault();
        const ecoBagExists = await axios.get(
            window.Shopify.routes.root + "cart.js"
        );
        const foundEcoBag = ecoBagExists.data.items;
        console.log("foundEcoBag: " + foundEcoBag);
        var obj = foundEcoBag.find((o) => o.product_title === "Eco Bag" );

        if (obj) {
            console.log("Eco Bag found");

            location
                .replace(window.Shopify.routes.root + "checkout.js")
                .then(() => console.log("redirected"));
        } else {
            console.log("Eco Bag not found");
            modalTogal(6);
        }
        // modalTogal(6);
    };
}

if (document.getElementById("checkout")) {
    console.log("Hello checkout");
    idcheckout();
}

if (document.getElementById("CartDrawer-Checkout")) {
    console.log("Hello CartDrawer-Checkout");
    idCartDrawer_Checkout();
}
if (document.getElementById("cart-notification-form")) {
    // const ecoBagExists = jQuery.getJSON(window.Shopify.routes.root + 'cart.js')
    // const foundEcoBag = ecoBagExists.data.items;
    // var obj = foundEcoBag.find(o => o.title === 'Eco Bag');
    // console.log(obj.title);

    console.log("Hello cart-notification-form");
    idcart_notification_form();
    // checkEcoBag();
}

function modalTogal(popZIndex) {
    if (document.getElementById("popupmodal").style.display == "flex") {
        document.getElementById("popupmodal").style.display = "none";
        document.getElementById("popupmodal").style.zIndex = -1;
        // document.getElementById('shopify-section-header').style.zIndex = 3;

        console.log("closed");
    } else {
        // event.stopImmediatePropagation();
        document.getElementById("popupmodal").style.display = "flex";
        document.getElementById("popupmodal").style.zIndex = popZIndex;
        document.getElementById("popupmodal").style.justifyContent = "center";
        document.getElementById("popupmodal").style.alignItems = "center";
        // document.getElementById('shopify-section-header').style.zIndex = -1;
        console.log("opened");
        ecoBagFunc();
        addToCartBTN();
        noThanksBTN();
        closeModalBTN();
    }
}

function findUSD(USD) {
    return (USD = "$");
}



