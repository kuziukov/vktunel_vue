importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBlhrjca3zMlH1KPpSj2o3YbxZHj13ik7o",
    authDomain: "wlusmru.firebaseapp.com",
    databaseURL: "https://wlusmru.firebaseio.com",
    projectId: "wlusmru",
    storageBucket: "",
    messagingSenderId: "900983135054",
    appId: "1:900983135054:web:7728e4e4579aa38b"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/clouds.png',
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow('https://wlusm.ru/tasks'));
});
