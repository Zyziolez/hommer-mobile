import { useNavigation } from '@react-navigation/native';
import React, {useEffect} from 'react'
import { View } from 'react-native';
import { navs } from './../other/navigation';
import { server } from './../other/vars';
import { routes } from './../other/routes';
import axios from 'axios';

export default function Home({children}) {
    const navigation = useNavigation()

    // useEffect(() => {
    //     axios.get(`${server}/${routes.isLogged}`)
    //     .then( res => {
    //         if( !res.data ){
    //             // navigation.navigate( navs.welcome )
    //             console.log(res.data)
    //         }
    //     } )
    //     .catch(err => {
    //         navigation.navigate( navs.error )
    //     })
    // })

    return (
        <View>
            {children}
        </View>
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