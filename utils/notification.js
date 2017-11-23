import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const FLASH_CARDS_NOTIFICATION_KEY = 'km-rn-flash-cards::notification';

function createLocalNotification() {
  return {
    title: 'Try out a quiz!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(FLASH_CARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then((obj) => {
            console.log('Return object', obj);
            if (obj.status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              // Set a local notification for tomorrow 8pm.
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(), {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(FLASH_CARDS_NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(FLASH_CARDS_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}
