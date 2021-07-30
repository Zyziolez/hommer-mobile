import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { navs } from './src/other/navigation';
import Callendar from './src/components/Callendar'
import Login from './src/components/Login'
import Register from './src/components/Register'
import RemindTemplate from './src/components/RemindTemplate'
import ShoppingList from './src/components/ShoppingList'
import Tasks from './src/components/Tasks'
import Welcome from './src/components/Welcome'
import ErrorPage from './src/components/ErrorPage';
import DashBoard from './src/components/DashBoard';
// import { useRecoilState } from 'recoil';
import { LoginContext } from './App';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server, storageKey } from './src/other/vars';
import { routes } from './src/other/routes';
import {Text} from 'react-native'

const Stack = createStackNavigator();



export default function Routes() {
    const [ logged, setLogged ] = useState(null)

    const logIn = (login, password) => {
        console.log(login, password)
        axios.post( `${server}/${routes.login}`, {login: login, pass: password} )
        .then( res => {
            console.log(res.data)
            if(res.data){
                setLogged( res.data )
            }else{
                console.log('cos poszlo nie tak')
            }
        } )
        .catch( err => console.log(err) )
    }
    const logOut = () => {
        
                axios.get( `${server}/${routes.logout}` )
                .then( res =>   {
                    AsyncStorage.setItem( storageKey, JSON.stringify(false) )
                    setLogged(false)
                } )
                .catch( err => console.log(err) )
          
       console.log('logging out')
    }

    const getData = async () => {
        try{
          const data = await AsyncStorage.getItem(storageKey)
          console.log('getting data')
          if( data !== null ){
            setLogged( JSON.parse(data) )
          }else{
              storeData()
          }
        }catch(e){
            console.log(e)
        }
      }
    const storeData = (  ) => {
        console.log('setting data')
            axios.get(`${server}/${routes.isLogged}`)
            .then( res => {
                 AsyncStorage.setItem( storageKey, JSON.stringify(res.data) )
                    setLogged(res.data)
            } )
            .catch( err=> console.log(err) )
    }
  useEffect(() => {
        if( logged == null ){
            console.log('is null!')
            getData()
        }
    })

  
//   if( logged == null ){
//     return(
//       <Text> hihi hoho </Text>
//     )
//   }
    // if( logged == null ){
    //     axios.get(`${server}/${routes.isLogged}`)
    //     .then( res => {
    //              setLogged( res.data )
    //          } )
    //       .catch( err=> console.log('error screen') )
    // }

    const homeComponent = () => {
        return(
            <DashBoard logOut={logOut} />
        )
    }

  return (
     <LoginContext.Provider value={{ val: logged, logIn: logIn, logOut: logOut }} >
        <Stack.Navigator initialRouteName={navs.welcome || navs.welcome}   >
           
                { logged ? 
                    <>
                    <Stack.Screen name={navs.home} component={ DashBoard } /> 
                    <Stack.Screen name={navs.callendar} component={ Callendar } />
                    <Stack.Screen name={navs.remind} component={ RemindTemplate } />
                    <Stack.Screen name={navs.shoppingList} component={ ShoppingList } />
                    <Stack.Screen name={navs.tasks} component={ Tasks } />
                    <Stack.Screen name={navs.error} component={ErrorPage} />
                    </>    :
                    <>
                        <Stack.Screen name={navs.welcome} component={ Welcome } />
                        <Stack.Screen name={navs.login} component={ Login } />
                        <Stack.Screen name={navs.register} component={ Register } />
                    </>
                }       
                {console.log(logged)}
              
        </Stack.Navigator>
        </LoginContext.Provider>   

  );
}
//screenOptions={{ header: () => null }}
// const Callendar = lazy(() => import('./src/components/Callendar'))
// const Home = lazy(() => import('./src/components/Home'))
// const Login = lazy(() => import('./src/components/Login'))
// const Register = lazy(() => import('./src/components/Register'))
// const RemindTemplate = lazy(() => import('./src/components/RemindTemplate'))
// const ShoppingList = lazy(() => import('./src/components/ShoppingList'))
// const Tasks = lazy(() => import('./src/components/Tasks'))
// const Welcome = lazy(() => import('./src/components/Welcome'))import { loggedUser } from './App';

