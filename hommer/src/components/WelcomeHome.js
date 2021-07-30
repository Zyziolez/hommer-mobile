import React from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { LoginContext } from '../../App';
import { server } from './../other/vars';
import { routes } from './../other/routes';
import axios from 'axios'

export default function WelcomeHome() {
    const [create, setCreate] = useState( false )
    const [codeInpt, setCodeInpt] = useState( '' )
    const [homeName, setHomeName] = useState('')

    useEffect(() => {
        return() => {
            setCreate(false)
            setCodeInpt('')
            setHomeName('')
        }
    }, [])

     const joinHome = (setHome, user) => {
        axios.patch( `${server}/${routes.joinHome}`, {code: codeInpt, user: user} )
        .then( res => {
            console.log(res.data)
            if(res.data){
                setHome( codeInpt )
            }
        } )
        .catch( err => console.log(err) )
    }

    const createHome = ( setHome, user ) => {
        axios.post( `${server}/${routes.createHome}`, { name: homeName, user: user } )
        .then( res => {
            if( res.data !== false ){
                setHome( res.data )
            }
        } )
        .catch( err => console.log(err) )
    }

    return (
        <LoginContext.Consumer>
            {({setHome, userId}) => (
                <View>
                <Text> Welcome home! </Text>
                <Text> Before we start... </Text>
                <View> 
                    <Text> join home </Text>
                    <TextInput defaultValue={codeInpt} onChangeText={ text => {
                        setCodeInpt(text)
                        if( text.length == 6 ){
                            joinHome()
                        }
                    } } />
                </View>
                <Text> or </Text>
                <Button title='create one' onPress={() => setCreate(!create)} />
                { create ? 
                    <View>
                        <View>
                            <Text> Name </Text>
                            <TextInput defaultValue={homeName} onChangeText={ text => setHomeName(text) } />
                            <Button title='Ready!' onPress={() => createHome(setHome, userId)} />
                        </View>
                    </View>
                    :null    
                }
                <Text> I dont know what to do? </Text>
                <ScrollView>
                    <Text>If your “home” already exists, enter a 6-number code ( from email adress ) if not - create your own where you can add your family!</Text>
                </ScrollView>
            </View>
            )}
        </LoginContext.Consumer>
    )
}
