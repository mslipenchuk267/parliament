import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../store/actions/user';
import { handleNotification } from '../helpers/notificationHelper';

/**
 * The PushNotificationManager function handles the notifications by
 * taking the device token of the user and presenting alerts to the 
 * user's device. 
 * @example
 * return (
 *   <PushNotificationManager />
 * )
 */
const PushNotificationManager = (props) => {
  const dispatch = useDispatch();
  const contactedIDs = useSelector(state => state.user.contactedIDs);
  const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

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

        /* Notification format
          body: the text of the incoming notification
          title: the title of the incoming notification
          sound: sound played on notification delivery. If !default, must be packaged with app
          fireDate: the time of notification delivery
        */
        if (matchedContacts > 0) {
          Notifications.postLocalNotification({
            body: 'You may have paired with a flagged device',
            title: 'Parliament Match!',
            sound: 'default',
            fireDate: new Date()
          }, deviceToken);
        }

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
    if (!didTryAutoLogin) {
      registerDevice();
    }
    registerNotificationEvents();
  }, [dispatch, contactedIDs])

  return (
    <View style={{ flex: 1 }}>
      {props.children}
    </View>
  )

}

export default PushNotificationManager;
