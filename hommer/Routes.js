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
import { server, storageKey, storageHome, storageUser } from './src/other/vars';
import { routes } from './src/other/routes';
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();



export default function Routes() {
    const [ logged, setLogged ] = useState(null);
    const [homeCode, setHomeCode] = useState(null)
    const [ userId, setUserId ] = useState(null)
    // const navigation = useNavigation();

    const asyncSetItem = async(key, value) => {
        await AsyncStorage.setItem(key, value) 
    }

    const logIn = (login, password) => {
        console.log(login, password)
        axios.post( `${server}/${routes.login}`, {login: login, pass: password} )
        .then( res => {
            console.log(res.data)
            if(res.data[0]){
                // if( res.data[1] !== null ){
                //     AsyncStorage.setItem( storageHome, JSON.stringify( res.data[1] ) )
                //     setHasHome( true )
                // }
                // AsyncStorage.setItem( storageUser, res.data[2] )
                // setLogged( res.data[0] )
               if( res.data[1] !== null ){
                   asyncSetItem( storageHome, JSON.stringify(res.data[1]) )
                   .then( re =>  {
                    asyncSetItem( storageKey, res.data[2] )
                    .then( re => {
                        setLogged(true)
                        setHomeCode( res.data[1] )
                        setUserId(res.data[2])
                    } )
                   } )
               }else{
                asyncSetItem(storageUser, res.data[2])
                .then( re =>{
                    setLogged( res.data[0] )
                    setHomeCode( res.data[1] )
                        setUserId(res.data[2])
                }  )
               }
            }else{
                console.log('cos poszlo nie tak')
            }
        } )
        .catch( err => console.log(err) )
    }
    const logOut = () => {
        asyncSetItem(storageKey, JSON.stringify(null))
        .then(re => {
                asyncSetItem( storageHome, null )
                .then( ree => {
                    setLogged(false)
                    setHomeCode(null)
            })
        })  
       console.log('logging out')
    }
    const register = (log, pass, email) => {
                axios.post( `${server}/${routes.register}`, {login: log, pass: pass, email: email } )
                .then( res =>   {
                    if(res.data){
                        // async function settingLogin (){
                        //     await setLogged(false)
                        // }
                        // settingLogin.then( res => {
                        //     navigation.navigate(navs.login)
                        // } )
                        setLogged(false)
                    }
                } )
                .then( re => {
                    
                        // navigation.navigate(navs.login)
                        console.log(logged)
                    
                } )
                .catch( err => console.log(err) )
          
       console.log('register')
    }
    const setHomeFunc = (code) => {
        asyncSetItem( storageHome, code )
        .then( res => {
            setHomeCode(code)
        } )
    }

    const getData = async () => {
        try{
          const data = await AsyncStorage.getItem(storageKey)
          console.log('getting data')
          if( JSON.parse(data) !== null ){
            setLogged( true )
          }else{
              setLogged(false)
          }
        }catch(e){
            console.log(e)
        }
      }
  useEffect(() => {
        if( logged == null ){
            console.log('is null!')
            getData()
        }
    })
  return (
     <LoginContext.Provider value={{ val: logged, logIn: logIn, logOut: logOut, register: register,homeCode: homeCode, setHome: setHomeFunc, userId: userId  }} >
        <Stack.Navigator initialRouteName={navs.welcome }   >
                
                { logged ? 
                    <>
                        <Stack.Screen name={navs.home} component={ DashBoard }  initialParams={ { home: homeCode, user: userId } } /> 
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

