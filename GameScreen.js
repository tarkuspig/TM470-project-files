import React from 'react';
import { useState, useEffect } from 'react';
import { View, Button, Alert, Text, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import Back from './back';





export default function GameScreen ({ route, navigation }) {
  const [hasPlayed, setHasPlayed] = useState(false)
  const loggedUserData = route.params.passedUserData;
  

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;
  const onMessage = (payload) => {
      let dataPayload;
      try {
        dataPayload = JSON.parse(payload.nativeEvent.data);
      } catch (e) {}
  
      if (dataPayload) {
        if (dataPayload.type === 'Console') {
          const myarr = dataPayload.data.log
          console.log(myarr[0])
          console.log(myarr[1])
          console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
          console.log(loggedUserData.username) 
          if(myarr){
            axios.put(`http://192.168.1.80:5001/log-score`, [myarr, loggedUserData.username])
            .then(res=> {
            console.log(res.data);
          })
        } else{
          alert(res.data.data);
        }


      } else {
        console.log(dataPayload)
      }
    }
  };
      return (
        <View style={{justifyContent: 'left', flex: 1, backgroundColor: "white"}}>
          <Text>{onMessage.dataPayload}</Text>
          <TouchableOpacity style={{alignItems:'left'}} onPress={() => 
                        navigation.navigate("Home")}>
            <Back>←Back                               
            </Back>      
          </TouchableOpacity>
        
        <WebView 

            source={ {uri: 'http://192.168.1.80:5001/index.html'} }
            injectedJavaScript={debugging}
            onMessage={onMessage}
            style={{flex: 1}}
            originWhitelist={['*']}//this line should avoid cors errors
            javaScriptEnabled={true}
            
          />
            
          
       </View>
      );
    }
  