document.addEventListener('DOMContentLoaded', function () {
    // Diese Funktion wird aufgerufen, wenn die DOM-Inhalte geladen sind

let selectedFoto = null;

    // Diese Funktion ändert das große Bild basierend auf der übergebenen bigImageId
function changeBigImage(bigImageId) {
        // Verstecke alle großen Bilder
        document.querySelectorAll('.big-thumb').forEach(bigThumb => {
            bigThumb.style.display = 'none';
        });

        // Zeige das ausgewählte große Bild
        document.getElementById(bigImageId).style.display = 'block';
}

// Füge einen Eventlistener für jedes kleine Bild hinzu
document.querySelectorAll('.fotoaktiv').forEach(fotoaktiv => {
    fotoaktiv.addEventListener('click', () => {
            // Wenn bereits ein Bild ausgewählt ist, entferne die 'selected' Klasse
            if (selectedFoto) {
                selectedFoto.classList.remove('selected');
            }

            // Füge die 'selected' Klasse zum angeklickten kleinen Bild hinzu
            fotoaktiv.classList.add('selected');
            // Aktualisiere die Variable selectedFoto auf das aktuell ausgewählte Bild
            selectedFoto = fotoaktiv;

            // Extrahiere die bigImageId aus dem data-big-image-id Attribut
            let bigImageId = fotoaktiv.getAttribute('data-big-image-id');
            // Rufe die Funktion auf, um das große Bild zu ändern
            changeBigImage(bigImageId);
        });
    });
});

// ---------------------LIGHTBOX---------------------
// JavaScript-Funktionen für die Lightbox
let lightbox = document.getElementById('lightbox');
let lightboxImage = document.getElementById('lightbox-image');
let previousButton = document.getElementById('previous');
let nextButton = document.getElementById('next');
let closeButton = document.getElementById('closelb');

// Lightbox öffnen
function openLightbox(imageUrl) {
    lightboxImage.src = imageUrl;
    lightbox.style.display = 'block';
}

// Lightbox schließen
function closeLightbox() {
    lightbox.style.display = 'none';
}

const bigImages = ['big-thumb1', 'big-thumb2', 'big-thumb3', 'big-thumb4'];
let currentImageIndex = 0;

// Funktion zum Hinzufügen von Event-Listenern zu den großen Bildern
function addClickListenerToBigImages() {
    bigImages.forEach(imageId => {
        const bigImage = document.getElementById(imageId);
        const imageUrl = bigImage.querySelector('img').src;

        // Füge einen Event-Listener zum Öffnen der Lightbox hinzu
        bigImage.addEventListener('click', () => openLightbox(imageUrl));
    });
}

// Lightbox-Bild wechseln
function changeLightboxImage(direction) {
    // Berechne den neuen Index basierend auf der Richtung
    currentImageIndex += direction;

    // Überprüfe, ob der Index außerhalb des Bereichs der Bilder liegt
    if (currentImageIndex < 0) {
        currentImageIndex = bigImages.length - 1;
    } else if (currentImageIndex >= bigImages.length) {
        currentImageIndex = 0;
    }

    // Setze das neue Bild in der Lightbox
    const newImageUrl = document.getElementById(bigImages[currentImageIndex]).querySelector('img').src;
    lightboxImage.src = newImageUrl;
}


// Event-Listener für Buttons hinzufügen
previousButton.addEventListener('click', () => changeLightboxImage(-1));
nextButton.addEventListener('click', () => changeLightboxImage(1));
closeButton.addEventListener('click', closeLightbox);

// Füge Event-Listener zu den großen Bildern hinzu
addClickListenerToBigImages();


let selectedFotoLB = null;

// Diese Funktion ändert das große Bild basierend auf der übergebenen bigImageId
function changeBigImageLB(bigImageIdLB) {
    console.log('Change Big Image LB called with ID:', bigImageIdLB);

    // Verstecke alle großen Bilder
    document.querySelectorAll('.small-thumbs-lb').forEach(bigThumb => {
        bigThumb.style.display = 'block';
    });

    // Zeige das ausgewählte große Bild
    const selectedBigImage = document.getElementById(bigImageIdLB);
    if (selectedBigImage) {
        selectedBigImage.style.display = 'block';
    } else {
        console.error('Big Image with ID', bigImageIdLB, 'not found.');
    }
}

// Füge einen Eventlistener für jedes kleine Bild hinzu
document.querySelectorAll('.lightbox-thumb').forEach(lightboxthumb => {
    lightboxthumb.addEventListener('click', () => {
        console.log('Clicked on small image with ID:', lightboxthumb.getAttribute('data-big-image-id'));

        // Wenn bereits ein Bild ausgewählt ist, entferne die 'selected' Klasse
        if (selectedFotoLB) {
            selectedFotoLB.classList.remove('selected');
        }

        // Füge die 'selected' Klasse zum angeklickten kleinen Bild hinzu
        lightboxthumb.classList.add('selected');
        // Aktualisiere die Variable selectedFoto auf das aktuell ausgewählte Bild
        selectedFotoLB = lightboxthumb;

        // Extrahiere die bigImageId aus dem data-big-image-id Attribut
        let bigImageIdLB = lightboxthumb.getAttribute('data-big-image-id');
        // Rufe die Funktion auf, um das große Bild zu ändern
        changeBigImageLB(bigImageIdLB);
    });
});

// ADD TO CART
let currentQuantity = 1;

function changeAmount(action) {
    // Select the quantity element by its ID
    let quantityElement = document.getElementById('current-quantity');

    if (action === 'minus' && currentQuantity > 0) {
        currentQuantity -= 1;
    }

    if (action === 'plus' && currentQuantity >= 0) {
        currentQuantity += 1;
    }
    

    // Update the inner text of the quantity element
    if (quantityElement) {
        quantityElement.innerText = currentQuantity;
    }
    updateCartQuantity(currentQuantity, true);
}

let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.cart');
let iconCartSpan = document.querySelector('.cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const product = {
    name: "Fall-Limited-Edition-Sneakers",
    price: 125,
    imageUrl: "./images/image-product-1-thumbnail.jpg"
}

function updateCartQuantity(quantity) {
    // Hier aktualisieren Sie das Element im Header mit der neuen Anzahl
    document.getElementById('iconcart-amount').textContent = quantity;
}

function addToCart() {
    const currentQuantity = parseInt(document.getElementById('current-quantity').textContent);

    const cartItem = {
        name: product.name,
        price: product.price,
        quantity: currentQuantity,
        imageUrl: product.imageUrl
    };

    // Beispiel: Fügen Sie das Produkt zum Warenkorb hinzu und aktualisieren Sie die Anzeige
    const listCart = document.querySelector('.listCart');
    const cartItemElement = document.createElement('div');

    const imgElement = document.createElement('img');
    imgElement.src = cartItem.imageUrl;
    imgElement.alt = cartItem.name;
    imgElement.style.width = '80px'; // Passen Sie die Breite nach Bedarf an
    cartItemElement.appendChild(imgElement);

    const textElement = document.createElement('div');
    textElement.textContent = `${cartItem.name} - Quantity: ${cartItem.quantity} - Price: $${cartItem.price * cartItem.quantity}`;
    cartItemElement.appendChild(textElement);

    listCart.appendChild(cartItemElement);

    updateCartQuantity(currentQuantity);
}

