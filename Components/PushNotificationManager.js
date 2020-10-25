import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { useDispatch } from 'react-redux';
import { setDeviceToken } from '../store/actions/user';

const PushNotificationManager = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    registerDevice = () => {
      Notifications.events().registerRemoteNotificationsRegistered(event => {
        // Set the device token state
        dispatch(setDeviceToken(event.deviceToken));
        console.log('Device Token Received', event.deviceToken)

      })
      Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
        console.error(event)
      })
      Notifications.registerRemoteNotifications()
    }

    registerNotificationEvents = () => {
      Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
        console.log('Notification Received - Foreground', notification)
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: false, badge: true })
      })

      Notifications.events().registerNotificationOpened((notification, completion) => {
        console.log('Notification opened by device user', notification)
        console.log(`Notification opened with an action identifier: ${notification.identifier}`)
        completion()
      })

      Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
        console.log('Notification Received - Background', notification)

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false })
      })

      Notifications.getInitialNotification()
        .then(notification => {
          console.log('Initial notification was:', notification || 'N/A')
        })
        .catch(err => console.error('getInitialNotifiation() failed', err))
    }

    registerDevice()
    registerNotificationEvents()
  }, [dispatch])

  return (
    <View style={{ flex: 1 }}>
      {props.children}
    </View>
  )

}

export default PushNotificationManager;
