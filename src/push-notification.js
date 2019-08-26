import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "900983135054"
    });
};

export const askForPermissioToReceiveNotifications = async () => {

    const messaging = firebase.messaging();

    try{
        let token = await messaging.getToken();
        if (token){
            console.log(token);
            return token;
        }
        return null
    }
    catch (err) {
        console.warn('При получении токена произошла ошибка.', err);
    }
    return null;
};