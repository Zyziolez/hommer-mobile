import React from 'react'
import { Button } from 'react-native'
import { LoginContext } from './../../App'
import Home from './Home'

export default function DashBoard() {

    return (
        <LoginContext.Consumer>
            {({val, logIn, logOut}) => (
                <Home>
                <Button title='Log out' onPress={logOut} />
                </Home>
            )}
        </LoginContext.Consumer>
    )
}
