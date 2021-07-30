import React, {useContext} from 'react'
import Routes from './Routes'
// import { RecoilRoot, atom } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { routes } from './src/other/routes';
import { server, storageKey } from './src/other/vars';

// export const loggedUser = atom ({
//   key:'loggedUser',
//   default: null
// }

export const LoginContext =  React.createContext( {
  val: null,
  logIn: () => {},
logOut: () => {}
}
 )

export default function App() {

  
  return (
    <NavigationContainer>
      {/* <RecoilRoot> */}
      <Routes/>
    {/* </RecoilRoot> */}
    </NavigationContainer>
  )
}
