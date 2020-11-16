import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../store/actions/user';
import { handleNotification } from '../helpers/notificationHelper';

const PushNotificationManager = (props) => {
  const dispatch = useDispatch();
  const contactedIDs = useSelector(state => state.user.contactedIDs);


  useEffect(() => {
    registerDevice = () => {
      Notifications.events().registerRemoteNotificationsRegistered(event => {
        // Set the device token state
        dispatch(userActions.setDeviceToken(event.deviceToken));
        console.log('PushNotificationManager.js/registerDevice() - Device Token Received', event.deviceToken)

      })
      Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
        console.error(event)
      })
      Notifications.registerRemoteNotifications()
    }

    registerNotificationEvents = () => {
      Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
        console.log('PushNotificationManager.js/registerNotificationEvents() - Notification Received - Foreground', notification)
        const matchedContacts = handleNotification(notification, contactedIDs);
        dispatch(userActions.updateNotificationHistory(matchedContacts));
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
        const matchedContacts = handleNotification(notification, contactedIDs);
        dispatch(userActions.updateNotificationHistory(matchedContacts));
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false })
      })

      Notifications.getInitialNotification()
        .then(notification => {
          console.log('Initial notification was:', notification || 'N/A')
        })
        .catch(err => console.error('getInitialNotification() failed', err))
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
