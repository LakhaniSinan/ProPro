import {createStackNavigator} from 'react-navigation-stack'
import Home from '../components/Home'
import History from '../components/History'
import {createAppContainer} from 'react-navigation'
import {TouchableOpacity,Text} from 'react-native'
import React from 'react'
import LoginScreen from '../components/LoginScreen'
import {Icon} from 'react-native-elements'
import Details from '../components/Details'
import Responded from '../components/Responded'
import firebase from 'firebase'
import { createDrawerNavigator } from 'react-navigation-drawer';


const HomeStack = createStackNavigator({

Login:{screen:LoginScreen,
 navigationOptions:{
  title:'Please Login',
  headerTitleAlign:'center',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:22
  },
  headerStyle:{
      backgroundColor:'green'
  },
     
 } 
},

  Home:{screen:Home,
    navigationOptions:(props)=>{
        console.log('props in home',props)
        return {
          title:'Home',
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:22
          },
          headerStyle:{
              backgroundColor:'green'
          },
         headerLeft:()=><Icon name="menu"
        size={24}
        color='white'
        onPress={()=>props.navigation.toggleDrawer()}/>,
     
    }
 }
},
Details:{screen:Details,
navigationOptions:{
          title:'Details',
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:22
          },
          headerStyle:{
              backgroundColor:'green'
          },
}},
Responded:{screen:Responded,
  navigationOptions:{
            title:'Responded',
            headerTitleAlign:'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:22
            },
            headerStyle:{
                backgroundColor:'green'
            },
  }}
})

const HistoryStack = createStackNavigator({
History:{screen:History,
  navigationOptions:(props)=>{
     
      return {
        title:'History',
        headerTitleAlign:'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize:22
        },
        headerStyle:{
            backgroundColor:'green'
        },
       headerLeft:()=><Icon name="menu"
      size={24}
      color='white'
     onPress={()=>props.navigation.toggleDrawer()}/>,
   
  }
}
}

})






const Drawer=createDrawerNavigator({
    Home:{screen:HomeStack,
      navigationOptions:{
        drawerIcon:({tintColor}) => (
       <Icon
         name="home"
         type='font-awesome'
         size={24}
    
       color={tintColor} />
       )
        
          }
      },
      History:{screen:HistoryStack,
        navigationOptions:{
          drawerIcon:({tintColor}) => (
         <Icon
           name="home"
           type='font-awesome'
           size={24}
      
         color={tintColor} />
         )
          
            }
        },
})



const Root=createAppContainer(Drawer)

export default Root