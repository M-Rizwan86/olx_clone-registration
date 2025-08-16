import { doc, db, getDoc } from "./config.js";
let params = new URLSearchParams(window.location.search);
let id = params.get('id');
console.log(id);

async function getProductDetail() {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let { title, description, category, images, price, ownerEmail, ownerName, ownerPhone, ownerLocation } = docSnap.data();

    let pImage = document.getElementById('product-detail-image');
    let pName = document.getElementById('product-name');
    let pCategory = document.getElementById('product-category');
    let pPrice = document.getElementById('product-price');
    let pDescription = document.getElementById('product-description');
    let pFeature1 = document.getElementById('product-feature-1');
    let pFeature2 = document.getElementById('product-feature-2');
    let pFeature3 = document.getElementById('product-feature-3');

    let sellerName = document.getElementById('seller-name');
    let sellerEmail = document.getElementById('seller-email');
    let sellerPhone = document.getElementById('seller-phone');
    let sellerLocation = document.getElementById('seller-location');

    sellerName.innerHTML = "";
    sellerEmail.innerHTML = "";
    sellerPhone.innerHTML = "";
    sellerLocation.innerHTML = "";

    pImage.innerHTML = "";
    pName.innerHTML = "";
    pCategory.innerHTML = "";
    pPrice.innerHTML = "";
    pDescription.innerHTML = "";
    pFeature1.innerHTML = "";
    pFeature2.innerHTML = "";
    pFeature3.innerHTML = "";

    images.forEach((image, index) => {
      pImage.innerHTML += `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img class="d-block w-100" src="${image}" alt="Product image ${index + 1}">
    </div>
  `;
    });

    pName.innerHTML = title;
    sellerName.innerHTML = ownerName || "Not available";
    sellerEmail.innerHTML = ownerEmail || "Not available";
    sellerPhone.innerHTML = ownerPhone || "Not available";
    sellerLocation.innerHTML = ownerLocation || "Not available";


    pCategory.innerHTML = category;
    pPrice.innerHTML = `$${price}`;
    pDescription.innerHTML = description;
    pFeature1.innerHTML = `Rating: ${rating} <br> Stock: ${stock}`;
    pFeature2.innerHTML = `Warranty: ${warrantyInformation || 'N/A'}`;
    pFeature3.innerHTML = `Category: ${category}`;
  } else {
    detailContainer.innerHTML = "<p> Product not found</p>";

  }
}

getProductDetail();
