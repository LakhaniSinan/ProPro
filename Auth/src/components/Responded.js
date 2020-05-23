import React from 'react'
import {View,Text,Image, Alert,ToastAndroid,ScrollView,TouchableOpacity} from 'react-native'
import {Button, Card} from 'react-native-elements'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call'  


class Responded extends React.Component{

    constructor(props){
      super()
      this.state={
        count:1,
        responseList: [],
      }
    }
  componentDidMount(){
    // firebase.database().ref().on('value', snapshot => {
    
    //   this.setState({ responseList: snapshot.val().responses })
    // }

      setTimeout(()=>{
        this.setState({count:this.state.count+1})
        
      },60000)


}

componentDidUpdate() {

  setTimeout(() => {
      firebase.database().ref().on('value', snapshot => {
          this.setState({responseList: snapshot.val().responses })
      })
  }, 3000);;
}
      callPolice() {
            const args = {
              number: '15', // String value with the number to call
              prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
          call(args)
          }
          
          callAmbulance() {
            const args = {
              number: '021111111134', // String value with the number to call
              prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
          call(args).catch(console.error)
          }
          
          callFire() {
            const args = {
              number: '911', // String value with the number to call
              prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
          call(args).catch(console.error)
          }
          
    render(){
      const driver = Object.keys(this.state.responseList).map((key) => this.state.responseList[key]);
      let driver_response;
      driver.map((index1) => {
        console.log(index1, "First Iteration")
        const index_1 = Object.keys(index1).map((key) => index1[key]);
        index_1.map((index2) => {
            console.log(index2, "Second Iteration")

            driver_response = Object.keys(index2).map((key) => index2[key]);
        })
    })
    let count=0
        
        return (
            <View>
     
        <Text>{this.state.count}</Text>

                <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}}>
  <View style={{marginLeft:20}}>
        <TouchableOpacity onPress={this.callAmbulance}>
     <Icon name="ambulance"
           size={50}
           color='green'/>
   
      </TouchableOpacity>
      <Text style={{fontWeight:'600',fontSize:20,marginTop:15,marginLeft:-25}}>Request Ambulance</Text>
      </View>

      <View style={{marginLeft:30}}>
        <TouchableOpacity onPress={this.callFire}>
     <Icon name="fire"
           size={50}
           color='red'
           style={{marginLeft:22}}/>
     </TouchableOpacity>
      <Text style={{fontWeight:'600',fontSize:20,marginTop:15,marginLeft:-25}}>Request Fire-Brigade</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}}>
  
  <View style={{marginLeft:20,marginTop:-28}}>
    <TouchableOpacity onPress={this.callPolice}>
 <Icon name="car"
       size={50}
       color='grey'/>
 </TouchableOpacity>
  <Text style={{fontWeight:'600',fontSize:20,marginTop:15,marginLeft:-25}}> Request Police</Text>
  </View>
  </View>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <Button
          type="solid" 
          title="Persuit Completed"
          buttonStyle={{marginTop:50,borderRadius:20,width:300,height:60}}
          
          />
            </View>
            
    
      </View>
        )
    }
}

export default Responded