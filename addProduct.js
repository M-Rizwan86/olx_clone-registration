import { collection, addDoc, serverTimestamp, getDoc, doc, app, db, onAuthStateChanged, getAuth } from "./config.js";

const form = document.getElementById("addProductForm");
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let loggedUser = docSnap.data();
            console.log("Username:", loggedUser.fullName);

            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const title = document.getElementById("title").value.trim();
                const category = document.getElementById("category").value.trim();
                const description = document.getElementById("description").value.trim();
                const price = parseFloat(document.getElementById("price").value);
                const images = document.getElementById("images").value.split(",").map(img => img.trim());

                try {
                    await addDoc(collection(db, "products"), {
                        title,
                        category,
                        description,
                        price,
                        images,
                        createdAt: serverTimestamp(),
                        ownerId: uid,
                        ownerName: loggedUser.fullName,
                        ownerEmail: user.email
                    });

                    alert(" Product added successfully!");
                    form.reset();
                } catch (error) {
                    console.error("Error adding product: ", error);
                    alert(" Failed to add product!");
                }
            });
        }
    }
});
