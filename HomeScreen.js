import { DevSettings, Text, View, StyleSheet, Button, TouchableOpacity, Pressable, Image, Platform } from "react-native"
import RNRestart from 'react-native-restart';

import Box from "./box";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function HomeScreen( { navigation, route } ) {
    const [pressed, setPressed] = useState(false)
    const [userData, setUserData] = useState("")
    const [leaderData, setLeaderData] = useState([])
    const [winner, setWinner] = useState([])
    const logoImg = route.params.logoImg;
      
    async function getData() { ///Gets Current User Data
        const token = await AsyncStorage.getItem('token');
        //console.log(token);
        axios
            .post("http://192.168.1.80:5001/userdata", {token: token})
                .then(res => {
                    //console.log(res.data.data)
                    setUserData(res.data.data)
        })
            
    }
      
    const getWinner = () => {
        axios.get('http://192.168.1.80:5001/winner')
        .then(res => setWinner(res.data))
        .catch(err => console.log(err));
        

        
    }
    console.log('winner')
        console.log(winner)
        console.log(winner)
    useEffect(() => {
        getData(); 
        getWinner(); 
    }, []);
   
    if (!winner || winner.length === 0) { //ensures the thing works
        console.log('details not ready')
        return;
    }   
    return (
        
        <View style={styles.container}>
           
            <Text style={styles.titleText}>Todays Winner is - {winner.daily_winner[0]} </Text>
            <Text style={styles.titleText}>Score - {winner.daily_winner[1]}</Text>
            <Text style={styles.titleText}>Don't forget to bring your device in-store before 6pm to claim!</Text>
            <View>
                <Image style={styles.image} source={logoImg} resizeMode="contain" />
            </View>
            <TouchableOpacity onPress={() => 
                navigation.navigate("Play", {
                        userData
                    })
                }


                style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent",
                            marginBottom:10
                }}>
                <Box>
                    Play
                </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => 
                navigation.navigate("Board", {data: userData})}
                    style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent",
                        marginBottom:10
                    }}>
                    <Box>
                        LeaderBoard
                    </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => 
                    navigation.navigate("Menu")}
                    style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent",
                        marginBottom:10
                    }}>
                    <Box>Menu</Box>                        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (
                    navigation.navigate("Login", DevSettings.reload()))}
                        style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent",
                            marginBottom:10
                        }}>
                        <Box>
                            Log Out
                        </Box>
                        </TouchableOpacity>
            <View style={styles.promoBoard}>
            <Text style={styles.promoHeaderText}>Linda's Specials</Text>
                <Text style={styles.promoText}>- Any 4 Cakes £4</Text>
                <Text style={styles.promoText}>- Hot Roll & Hot Drink £3.50</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
       // marginBottom: 16
    },
    cardText: {
        fontSize: 30,
    },
    promoBoard: {
        flex: 0.6,
        
        
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: "#333333",
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {                       
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,                      
        elevation: 5, 
        marginBottom: -40,
        marginTop: 0
    },
    promoText: {
        fontFamily: Platform.OS === 'android' ? 'Roboto' : "Chalkduster",
        fontSize: 24, 
        color: "white",
    }, 
    promoHeaderText: {
        fontFamily: Platform.OS === 'android' ? 'Roboto' : "Chalkduster",
        fontSize: 24, 
        color: "white",
        
    },
    image: {
        width: 400,
        height: 200,
        alignSelf: "center",
        marginBottom: 50,
    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center"
    }
})
