import React, {useState} from 'react'
import { TextInput, Text } from 'react-native'

export default function LoginButton() {
    const [text, setText] = useState('')
    return (
        <View>
            <TextInput defaultValue={ text } onChangeText={ e => setText(e) } />
            <Text> {text} </Text>
        </View>
    )
}
