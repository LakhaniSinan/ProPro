import React from 'react'
import {View,Text, Platform,BackHandler,DeviceEventEmitter,Image} from 'react-native'
import  MapboxGL from '@react-native-mapbox-gl/maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import firebase from 'firebase'
import uuid from 'uuid'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from 'react-native-geolocation-service'


MapboxGL.setAccessToken(
    'pk.eyJ1IjoibGFraGFuaXNpbmFuIiwiYSI6ImNrNG52aDBjbTA1MnQzbHQyc2pqNmJ5a2sifQ.aW8kTtMm_eaofpYPBD-qHw'
)

const IS_ANDROID=Platform.OS==='android'

// let icon={
//     iconImage:require('../../images/123.png'),
//     iconAllowOverlap:true,
//     iconSize:1.2
// }

class Home extends React.Component{

    

    async UNSAFE_componentWillMount(){
        if(IS_ANDROID)
        {
            console.log('inside unmount')   
            const isGranted=await MapboxGL.requestAndroidLocationPermissions();
            this.setState({
                isAndroidPer:isGranted,
                isFetchingPer:false,
            })
        }
    }
    constructor(props)
    {
        super(props);
        this.state={
            isAndroidPer:false,
            isFetchingPer:IS_ANDROID,
            latitude:0,
            longitude:0,
            showUserLocation:true,
            location:[ 67.0296,24.8807],
            markerList: [],
            markerList2: [],
            showPopup: true, 
            responder:'',
            uid:'',
            base64:''   
        }
}

componentDidMount() {
    console.log(firebase.auth().currentUser)
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS,Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    }).then(function(success) {
        // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
           Geolocation.getCurrentPosition((position) => {
            console.log('i am pos',position)
            let initialPosition = JSON.stringify(position);
            this.setState({ initialPosition,latitude:position.coords.latitude,longitude:position.coords.longitude });
            }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
        }.bind(this)
    ).catch((error) => {
        console.log(error.message);
    });
    
    BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
           LocationServicesDialogBox.forceCloseDialog();
    });
    
    DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
        console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
    });
    
    
  firebase.database().ref().on('value', snapshot=>{
        console.log('key',snapshot.val())
        this.setState({markerList:snapshot.val().alerts})
    })

    this.setState({responder:firebase.auth().currentUser.email,uid:firebase.auth().currentUser.uid})
    // console.log('i am user',firebase.auth().currentUser)
}
   


// componentDidUpdate() {

//     setTimeout(() => {
//         firebase.database().ref().on('value', snapshot => {
//             this.setState({ markerList: snapshot.val().alerts })
//         })
//     }, 10000);

// }
// renderabcd = () => {
//     return (
        
       
//     )
// }


render()
    
    {   const {longitude,latitude,responder}=this.state
    console.log(firebase.auth().onAuthStateChanged,'hello')
        console.log('current coords',longitude,latitude,responder)
        
  
        const result = Object.keys(this.state.markerList).map((key) => this.state.markerList[key]);
        console.log('res',result)
      if(longitude===0)
      {
        
          return <View style={{alignItems:'center',justifyContent:'center'}}> 
              <Text style={{fontSize:20}}> 
              Please Turn On Your Location Services.. Thankyou.
       </Text>
</View>
              }
      else{
          
   
          
        return(
      <SafeAreaView style={{flex:1}}>
    <View style={{flex:1}}>
     <MapboxGL.MapView
        ref={c=>(this._map=c)}
        zoomlevel={16}
        centerCoordinate={[latitude,longitude]}
        showUserLocation={true}
        style={{flex:1}}
      //   styleURL="mapbox://styles/lakhanisinan/ck4nx4jb94ows1clwm9akwj8n"
        userTrackingMode={this.state.userSelectedUserTrackingMode}
         >
             
        <MapboxGL.Camera
            zoomLevel={16}
            animationMode={'flyTo'}
            centerCoordinate={[longitude,latitude]}
            animationDuration={0}
            ref={ c=>(this.camera = c )}
            
            >
            </MapboxGL.Camera> 
           
            <MapboxGL.UserLocation>
            </MapboxGL.UserLocation>    
        
      {result.map((marker)=>{
          const{responder,uid}=this.state
          console.log(marker,'marker');
          
        
 
          
          return (
         
              <MapboxGL.PointAnnotation
              key={uuid()}
              id={uuid()}
              // anchor={[0.0,1.0]}
              coordinate={[marker.longitude,marker.latitude]}
              onSelected={()=>this.props.navigation.navigate('Details',
              {name:marker.place_name,
                type:marker.type,
                responder:responder,
                uid:uid,
                image:marker.base64,
                longitude:marker.longitude,
                 latitude:marker.latitude ,
                 id:marker.id
                })}
              style={{width:90,height:80}}
               >
                   {/* {this.renderabcd()} */}
               
               </MapboxGL.PointAnnotation>
          
  
)})}

</MapboxGL.MapView>
</View>
</SafeAreaView>
)
        
    }
}
}
    

const styles={
container:{
    flex:1,

}
    }

export default Home