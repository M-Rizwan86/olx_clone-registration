import {
    getAuth, getDocs, getDoc, setDoc, doc, app, db, onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut, collection
}
    from "./config.js";
let cardElement = document.getElementById("cards");


async function getData() {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((product) => {
        let { title, description, category, images, price } = product.data();
        cardElement.innerHTML += "";

        cardElement.innerHTML += `
        <div class="card">
            <div class="badge">HOT SALE</div>
            <div class="tilt">
                <div class="img"><img src="${images}" alt="Premium Laptop"></div>
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





// Register

let registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();  // stop form from refreshing
    registerUser();
});
const auth = getAuth(app);
async function registerUser() {


    let fullNameField = document.getElementById('name');
    let emailField = document.getElementById('email');
    let passwordField = document.getElementById('password');
    let fullname = fullNameField.value;
    let email = emailField.value;
    let password = passwordField.value;

    try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user.uid)
        // Add user data to Firestore with UID as document ID

        await storeUser(fullname, email, user.uid)



        // Hide register modal
        let modalElement = document.getElementById('registerModal');
        let registerModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        registerModal.hide();

        // Clear input fields
        fullNameField.value = "";
        emailField.value = "";
        passwordField.value = "";


    } catch (error) {
        console.log("Error during registration:", error.message);
    }
}
async function storeUser(fullname, email, uid) {
    try {
        await setDoc(doc(db, "users", uid), {
            fullName: fullname,
            email: email,
            uid: uid
        });
        console.log("User stored successfully");
    } catch (error) {
        console.error("Error storing user:", error);
    }

}
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;

        // Fetch Firestore document
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let loggedUser = docSnap.data();

            console.log("Username:", loggedUser.fullName);
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('login-underline').style.display = 'none';
            document.getElementById('profile-Dropdown').style.display = 'block';
            document.getElementById('username-sec').innerText = loggedUser.fullName;
            document.getElementById('email-sec').innerText = loggedUser.email;
            document.getElementById('sellBtn').style.display = 'block';

        } else {
            loggedUser = null;
            console.log("User document not found!");
        }
    } else {
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('login-underline').style.display = 'block';
        document.getElementById('profile-Dropdown').style.display = 'none';

    }
});

// Login
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let loginBtn = document.getElementById('loginButton');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();  // stop form from refreshing
    loginUser();
});
function loginUser() {
    const email = loginEmail.value;
    const password = loginPassword.value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    // Hide login modal
    let modalElement = document.getElementById('loginModal');
    let loginModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    loginModal.hide();
    loginEmail.value = "";
    loginPassword.value = "";
}

document.getElementById('logoutBtn').addEventListener('click', logoutUser);
function logoutUser() {
    signOut(auth).then(() => {
        alert("User logged out successfully");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error logging out:", error);
    });

}
