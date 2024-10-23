// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Router function
function router() {
    const routes = {
        '/': 'index.html',
        '/welcome': 'welcome.html',
        '/device-control': 'device-control.html',
        '/emergency-contacts': 'emergency-contacts.html',
        '/rename-device': 'rename-device.html'
    };

    const path = window.location.pathname;
    const route = routes[path] || routes['/'];

    fetch(route)
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
            initializePageFunctions();
        })
        .catch(error => console.error('Error loading page:', error));
}

// Initialize page-specific functions
function initializePageFunctions() {
    const path = window.location.pathname;

    switch (path) {
        case '/':
            initializeSignInPage();
            break;
        case '/welcome':
            initializeWelcomePage();
            break;
        case '/device-control':
            initializeDeviceControlPage();
            break;
        case '/emergency-contacts':
            initializeEmergencyContactsPage();
            break;
        case '/rename-device':
            initializeRenameDevicePage();
            break;
    }
}

// Page-specific initializations
function initializeSignInPage() {
    const googleSignInButton = document.getElementById('google-signin-button');
    if (googleSignInButton) {
        googleSignInButton.addEventListener('click', signInWithGoogle);
    }
}

function initializeWelcomePage() {
    const userNameSpan = document.getElementById('user-name');
    const continueButton = document.getElementById('continue-button');

    if (userNameSpan) {
        const user = firebase.auth().currentUser;
        if (user) {
            userNameSpan.textContent = user.displayName;
        }
    }

    if (continueButton) {
        continueButton.addEventListener('click', () => navigateTo('/device-control'));
    }
}

function initializeDeviceControlPage() {
    const updateContactsBtn = document.getElementById('update-contacts-btn');
    const renameDeviceBtn = document.getElementById('rename-device-btn');
    const navigationForm = document.getElementById('navigation-form');

    if (updateContactsBtn) {
        updateContactsBtn.addEventListener('click', () => navigateTo('/emergency-contacts'));
    }

    if (renameDeviceBtn) {
        renameDeviceBtn.addEventListener('click', () => navigateTo('/rename-device'));
    }

    if (navigationForm) {
        navigationForm.addEventListener('submit', handleNavigationFormSubmit);
    }
}

function initializeEmergencyContactsPage() {
    const emergencyContactForm = document.getElementById('emergency-contact-form');
    if (emergencyContactForm) {
        emergencyContactForm.addEventListener('submit', handleEmergencyContactFormSubmit);
    }
}

function initializeRenameDevicePage() {
    const renameDeviceForm = document.getElementById('rename-device-form');
    if (renameDeviceForm) {
        renameDeviceForm.addEventListener('submit', handleRenameDeviceFormSubmit);
    }
}

// Navigation function
function navigateTo(path) {
    window.history.pushState({}, '', path);
    router();
}

// Event listeners and form handlers (keep existing ones)
// ...

// Listen for auth state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            navigateTo('/welcome');
        }
    } else {
        // User is signed out
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            navigateTo('/');
        }
    }
});

// Initial route
router();

// Handle browser back/forward buttons
window.addEventListener('popstate', router);

// Prevent default link behavior and use router instead
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="/"]')) {
        e.preventDefault();
        navigateTo(e.target.getAttribute('href'));
    }
});
