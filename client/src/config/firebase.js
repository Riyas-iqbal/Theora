
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB8FzeFOgkUgc9KfhaTEYOtBp7jA1xdZFY",
    authDomain: "theora-web-app.firebaseapp.com",
    projectId: "theora-web-app",
    storageBucket: "theora-web-app.appspot.com",
    messagingSenderId: "82276966171",
    appId: "1:82276966171:web:3c5e109df0f4aa164b7dbe",
    measurementId: "G-2TLCCFXMC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app