import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native';
import { navs } from './../other/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { server } from './../other/vars';
import { routes } from './../other/routes';

export default function Welcome() {
    const navigation = useNavigation()

    useEffect(() => {
        axios.get( `${server}/${routes.isLogged}` )
        .then( res => {
            if(res.data){
                navigation.navigate(navs.home)
            }
        } )
        .catch(err => console.log(err))
    }, [])

    return (
        <View>
            <Text> Organize your home life </Text>
            <Button title='register' onPress={ e => navigation.navigate( navs.register ) } />
            <Text> or </Text>
            <Button title='login' onPress={ e => navigation.navigate(navs.login) } />
        </View>
    )
}
