"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const app_1 = require("@firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: "AIzaSyABv88FlimepZtUpH681ZSTBmui0FMK9jo",
    authDomain: "online-shopping-5bd84.firebaseapp.com",
    projectId: "online-shopping-5bd84",
    storageBucket: "online-shopping-5bd84.appspot.com",
    messagingSenderId: "673941476649",
    appId: "1:673941476649:web:783ea5e842a794e9919338",
    measurementId: "G-N9MF5H75Z2"
};
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(firebaseApp);
//# sourceMappingURL=firebase.js.map