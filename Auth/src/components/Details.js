import React from 'react'
import {View,Text,Image, Alert,ToastAndroid,ScrollView} from 'react-native'
import {Button, Card} from 'react-native-elements'
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';



class Details extends React.Component{

    constructor(){
        super()
        this.state={
            done:1,uid:''
           
        }
    }
    componentDidMount(){
        console.log(firebase.auth().currentUser)
        this.setState({uid:firebase.auth().currentUser.uid})
    }

    alertDone=(name,type,longitude,latitude,id)=>{
        var date=new Date().getDate()
        var month= new Date().getMonth()+1
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        
        if(this.state.done===1)
        {
        ToastAndroid.showWithGravity(
            'You Have Responsed To Alert.!!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            this.setState({done:2}, ()=> console.log(this.state)),
           )
          
        firebase.database().ref(`/responses/${id}/${this.state.uid}`)
        .push({name,type,date,month,hours,sec,min,longitude,latitude})
        this.props.navigation.navigate('Responded',{id:id})
        }
        else if(this.state.done===2&&firebase.auth().currentUser.uid!=this.state.uid){
            ToastAndroid.showWithGravity(
                `Already Responded,Connect With Nearest Cop,You are number ${this.state.done}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                this.setState({done:2}, ()=> console.log(this.state)),
               )
        }
        else {
            ToastAndroid.showWithGravity(
                `You Have Already Responded`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                this.props.navigation.navigate('Responded',{id:id})
        )}  
        
           }

           checkImage(image){
            if(image)
            {   console.log('in if')
                return (
            <View style={{justifyContent:'center',alignItems:'center'}}>

            <Image
           style={{height:400,width:350}}
           source={{uri:`data:image/png;base64,${image}`}}/>
            </View>  
                )
            }
            else{
                console.log('in else')
                 return <View><Text style={{marginLeft:25,fontSize:20}}> No Image Received</Text></View>
            }
           }

    render() {
    const {name,type,image,longitude,latitude,id}=this.props.navigation.state.params;
     console.log(image)
      return (    
      <ScrollView>
          <Text style={{fontSize:20,padding:0,margin:0}}> Image Received From Sender </Text>
                   {this.checkImage(image)}
          <Text style={{fontSize:20,padding:0,margin:0}}>Area</Text>
      <Text style={{marginLeft:25,fontSize:20}}>{name}</Text>   
      
      <Text style={{fontSize:20,padding:0,margin:0}}>Type</Text>
      <Text style={{marginLeft:25,fontSize:20}}>{type}</Text>
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
      <Image source ={require('../../image/image.jpg')}  style={{width:500,height:250}}/>
      <Image source ={require('../../image/image1.jpg')} 
      style={{width:500,height:250}}/>
      </View>
          <TouchableOpacity>
          <Button
          type="solid" 
          title="Respond"
          buttonStyle={{marginTop:50,borderRadius:20,width:300,marginLeft:300}}
          onPress={this.alertDone.bind(this,name,type,longitude,latitude,id)}
          />
          </TouchableOpacity>
    </ScrollView>
       
      )
}
}

export default Details