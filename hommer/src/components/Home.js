import { useNavigation } from '@react-navigation/native';
import React, { Children } from 'react'
import { View } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { storageKey } from '../other/vars';
import { useState, useEffect } from 'react';
import { LoginContext } from '../../App';
import WelcomeHome from './WelcomeHome';
import { storageHome } from './../other/vars';
import DashBoard from './DashBoard';



export default function Home({children}) {

    return (
        <LoginContext.Consumer>
            {({ homeCode}) => {
             console.log(homeCode)
             if( homeCode !== null ){
                    return(
                        <View>
                            {children}
                        </View>
                    )
                }else{
                    return(
                        <WelcomeHome/>
                    )
                }
            }
            }
        </LoginContext.Consumer>
    )
}
// else{
//     navigation.dispatch( CommonActions.reset({
//         index: 1,
//         routes: [
//             { name: navs.home }
//         ]
//     }) )
// }