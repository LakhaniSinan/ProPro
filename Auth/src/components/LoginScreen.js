import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Alert} from 'react-native';
import CardSection from './CardSection';
import Input from './Input.js';
import Spinner from './Spinner.js';
import firebase from 'firebase'
import {Button} from 'react-native-elements'




class LoginScreen extends Component {
    state={email:'',password:'',error:'',loading:false}
 

onButtonPress()
{
        const { email,password }= this.state
        let abc=email+'@police.com'
         this.setState({error:'',loading:true})
         firebase.auth().signInWithEmailAndPassword(abc,password)
        .then(this.LoginSuccess.bind(this))
        .catch(()=>{
    this.setState({error:'Please Check Id and Pass',loading:false}) 
}) 

}


renderSpinner()
{  
    
   
    if(this.state.loading)
    {
        return <Spinner size="small"/>
    }
    
    return (
        <TouchableOpacity style={[styles.Account,styles.loginButton]} 
        onPress={this.onButtonPress.bind(this)}
        >
        <Text style={{fontSize:20,fontWeight:'bold'}}>Login</Text>
                 </TouchableOpacity>  

 
    )
} 



LoginSuccess()
{
    console.log('inside loginSuccess',this.props)
    this.setState({
        loading:false,
        error:'',
        email:'',
        password:''

    })

    this.props.navigation.navigate('Home') 
}

render() {
    
        return (
       
             <View > 
           <CardSection>
                  <Input
                        label="Your ID Here"
                        placeholder="Sinan9648"
                        value={this.state.email}
                        onChangeText={email=>this.setState({email})}
                        />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="Password"
                        value={this.state.password} 
                        onChangeText={password=>this.setState({password})}
                        />
                    </CardSection>
                     <Text style={styles.errorStyle}>{this.state.error}</Text>
                 <CardSection> 
                 {this.renderSpinner()}
                     </CardSection>
                     <View style={{marginTop:30,marginLeft:400}}>
                      <Text style={{fontSize:20,fontWeight:'bold'}}>Having Problem In Login?</Text></View>
                  <CardSection style={{flexDirection:'row'}}>
                     
                     <TouchableOpacity style={[styles.Account,styles.loginButton]} onPress={()=> this.props.navigation.navigate('Home') }>
                  <Text style={{fontSize:20,fontWeight:'bold'}}> Contact Support</Text>
                 </TouchableOpacity>  
                 </CardSection>

  
                    
           
                 </View>





        )
    }
}


const styles = {
    errorStyle: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 16
    },
    wrapper:
    {
        display: 'flex',
        flex: 1
    },
    checkStyle: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        marginTop:20, 
        marginLeft:130, 
        width:250,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
      },
      Account: {
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        marginTop:20, 
        marginLeft:330, 
        width:360,
        borderRadius:20,
        alignItems:'center',
        justifyContent :'center'
      },
      loginButton: {
        backgroundColor: "#00b5ec",
      },
}
export default LoginScreen
