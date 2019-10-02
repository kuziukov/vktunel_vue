import firebase from 'firebase/app'
import 'firebase/messaging'

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "900983135054"
    });
};

export const askForPermissioToReceiveNotifications = async () => {

    const messaging = firebase.messaging();

    try{
        let token = await messaging.getToken();
        return token ? token : null;
    }
    catch (err) {
        console.warn('При получении токена произошла ошибка.', err);
    }
    return null;
};