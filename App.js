import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Linking, Pressable, Text, Image, StyleSheet } from "react-native"
import HomeScreen from './components/screens/HomeScreen';
import Register from './components/screens/Register';
import LoginScreen from './components/screens/LoginScreen';
import PlayScreen from './components/screens/PlayScreen';
import LeaderBoard from './components/screens/LeaderBoard';
import GameScreen from './components/screens/GameScreen';
import MenuScreen from './components/screens/MenuScreen';
import menuData from './menudata';
const logoImg = require("./assets/images/lindalogo.png")
const titleImg = require("./assets/images/titleScreen.png")
const smallLogo = require("./assets/images/smallLogo.png")

const Stack = createNativeStackNavigator()
export default function App() {
    const data = menuData;
    return (
   
    <NavigationContainer>      
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerStyle: {
                backgroundColor: "white"
            },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: "bold"},
            headerRight: () => (
                <Pressable onPress={() => Linking.openURL(`tel:${'0141-561-1234'}`)}>
                    <Text style={{ fontSize: 22}}>0141-561-1234</Text>
                </Pressable>
            ),
            headerLeft: () => (                
                <Image source={smallLogo} style={styles.image} />               
            ),
            contentStyle: {
                backgroundColor: "#e8e4f3"
            }
        }}> 
            <Stack.Screen name="Play" component={PlayScreen} initialParams={{titleImg}} />  
            <Stack.Screen name="Board" component={LeaderBoard}  />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} initialParams={{data}} />
            <Stack.Screen name="Login" component={LoginScreen} initialParams={{logoImg}} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{logoImg}}
            options={{
                title: "Welcome",
                
            }}/>
            

        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 38,
        marginBottom: 10
    }
})