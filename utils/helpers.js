import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'UdaciFlashCards:Notifications1'

export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification(){
    return {
        title: 'Take a quiz today!',
        body: "👋 don't forget to take a quiz today!",
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then( (data) => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then( ({status}) => {
                        if( status === "granted"){
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate( tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(30)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),{
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}