import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { server } from './../other/vars';
import { routes } from './../other/routes';
import { useNavigation } from '@react-navigation/native';
import { navs } from './../other/navigation';

export default function Register() {
    const navigation = useNavigation()
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        return() => {
            setName('')
            setPass('')
            setEmail('')
        }
    }, [])


    const register = () => {
        axios.post( `${server}/${routes.register}`, { login: name, pass: pass } )
        .then( res => {
            if(res.data){
                navigation.navigate( navs.login )
            }else{
                console.log(':(')
            }
        } )
        .catch( err => console.log(err) )
    }

    return (
        <View>
            <View>
                <Text> Home, sweet home! </Text>
                <View style={styles.inputs} >
                    <Text>login</Text>
                    <TextInput value={name} onChangeText={setName} />
                </View>
                <View style={styles.inputs} >
                    <Text>password</Text>
                    <TextInput value={pass} onChangeText={setPass} />
                </View>
                <View style={styles.inputs} >
                    <Text>email address</Text>
                    <TextInput value={email} onChangeText={setEmail} />
                </View>
                <Button title='register' onPress={register} />
                <Text> or </Text>
                <Button title='google' />
                <Button title='fb' />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
inputs: {

}
})