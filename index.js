let cardElement = document.getElementById("cards");

// ✅ Fetch and Display Products
async function getData() {
    let response = await fetch('https://dummyjson.com/products');
    let data = await response.json();
    let { products } = data;

    products.map((product) => {
        let { title, description, category, images, price } = product;
        cardElement.innerHTML += "";

        cardElement.innerHTML +=  `
        <div class="card">
            <div class="badge">HOT SALE</div>
            <div class="tilt">
                <div class="img"><img src="${images[0]}" alt="Premium Laptop"></div>
            </div>
            <div class="info">
                <div class="cat">${category}</div>
                <h2 class="title"><a href="productsDetail.html?id=${product.id}">${title}</a></h2>
                <p class="desc">${description}</p>
                <div class="bottom">
                    <div class="price">
                        <span class="new">$${price}</span>
                    </div>
                    <button class="btn">
                        <span>Add to Cart</span>
                        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>`;
    });
}
getData();


// ✅ Handle Users
let userarr = JSON.parse(localStorage.getItem('user')) || [];

class Person {
    constructor(fullName, email, password) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}

// Register
let fullName = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');

function registerUser(event) {
    event.preventDefault();

    let checkStoredUser = userarr.find((element) => element.email === email.value);
    if (checkStoredUser) {
        alert("User already exists");
    } else {
        let newUser = new Person(fullName.value, email.value, password.value);
        userarr.push(newUser);
        localStorage.setItem('user', JSON.stringify(userarr));
        alert("User registered successfully \nPlease login now");

        // Hide register modal
        let modalElement = document.getElementById('registerModal');
        let registerModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        registerModal.hide();
    }
    fullName.value = "";
    email.value = "";
    password.value = "";
}

// Login
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');

function loginUser(event) {
    event.preventDefault();

    // Always get updated data from localStorage
    let storedUser = JSON.parse(localStorage.getItem('user')) || [];

    let savedUser = storedUser.find((element) => element.email === loginEmail.value);
    if (savedUser?.password === loginPassword.value && savedUser?.email === loginEmail.value) {
        localStorage.setItem('LoggedUser', JSON.stringify(savedUser));
        alert(`Logged in successfully, ${savedUser.fullName}`);

        // Hide login modal
        let modalElement = document.getElementById('loginModal');
        let loginModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        loginModal.hide();



        showUserProfile();
    } else {
        alert("Invalid credentials");
    }
    loginEmail.value = "";
    loginPassword.value = "";
}


function logoutUser() {
    localStorage.removeItem('LoggedUser');
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('login-underline').style.display = 'block';
    document.getElementById('profile-Dropdown').style.display = 'none';
    alert("Logged out successfully");
}


function showUserProfile() {
    let currentUser = JSON.parse(localStorage.getItem('LoggedUser'));

    if (currentUser) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('login-underline').style.display = 'none';
        document.getElementById('profile-Dropdown').style.display = 'block';
        document.getElementById('username-sec').innerText = currentUser.fullName;
        document.getElementById('email-sec').innerText = currentUser.email;
    } else {
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('login-underline').style.display = 'block';
        document.getElementById('profile-Dropdown').style.display = 'none';
    }
}
showUserProfile();
