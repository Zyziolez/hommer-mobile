import React, { useEffect, useRef, useState } from 'react'
import { Button, View, Text, TextInput, StyleSheet } from 'react-native'
import {  LoginContext } from '../../App';

//!!!! in this component i had to use refs to the text input instead of states, for some reason it did not work :c

export default function Login() {
    const [login, setLogin] = React.useState('')
    const [ password, setPassword ] = React.useState('')

    // useEffect(() => {
    //     return() => {
    //         setLogin('')
    //         setPassword('')
    //     }
    // }, [])

    return (
        
            <LoginContext.Consumer>
                {({val, logIn, logOut}) => (
                    <View>
                    <View>
                        <View style={styles.inputs} >
                            {/* <Text> login </Text> */}
                            <TextInput defaultValue={login} onChangeText={text =>{
                                 setLogin(text)
                            }} />

                        </View>
                        <View style={styles.inputs} >
                            {/* <Text> password </Text> */}
                            <TextInput defaultValue={password} onChangeText={text => setPassword( text)} />
                        </View>
                        <Button title='sprawdz' onPress={() =>{
                             logIn( login , password )
                        } } />
                        <Text> or </Text>
                        <Button title='google' onPress={() => {
                            console.log(login , password)
                        }} />
                        <Button title='fb' />
                        <Text> {login} </Text>
                        <Text> {password} </Text>
                </View>
                </View>
                )}
            </LoginContext.Consumer>
    )

    
}

const styles = StyleSheet.create({
    inputs: {

    }
})