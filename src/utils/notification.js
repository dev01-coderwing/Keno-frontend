import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
export const requestNotificationPermission = async () => {
  console.log(" requestNotificationPermission CALLED");

  const permission = await Notification.requestPermission();
  console.log(" Permission:", permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BGlvZr76Rmo3XMlbUdohvggyO_9YuWLFtPZ1wxKCh3QmsUlgG35cGU_oSB_rD4Zsz_9ekKKHfjxEZkZa69sBQMM",
    });

    console.log(" FCM TOKEN:", token);
    return token;
  } else {
    console.log(" Permission denied");
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
