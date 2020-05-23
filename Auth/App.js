

import React from 'react';
import Root from './src/navigation/Root'
import firebase from 'firebase'
import { YellowBox } from 'react-native';
import LoginScreen from './src/components/LoginScreen'

YellowBox.ignoreWarnings(['Setting a timer for a long period of time','componentWillMount has been'])


class App extends React.Component{

  componentWillMount()
  {

      const config ={
      apiKey: "AIzaSyCuh4hWyEABLxdxRveoMD290hgo69AWXV4",
      authDomain: "userapp-1569782530340.firebaseapp.com",
      databaseURL: "https://userapp-1569782530340.firebaseio.com",
      projectId: "userapp-1569782530340",
      storageBucket: "userapp-1569782530340.appspot.com",
      messagingSenderId: "470250628857",
      appId: "1:470250628857:web:9d6c71d7658a2f51d4e428", 
      measurementId: "G-YSLVGW7TXJ"
    }
  if(!firebase.apps.length){
    firebase.initializeApp(config)
  }
  }


  render(){


  return (
      <Root/>
    );
};
}

export default App
