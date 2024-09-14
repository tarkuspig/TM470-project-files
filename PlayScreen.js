import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, SafeAreaView, Platform } from "react-native"
import { useState } from "react";
import Box from "./box";
import Back from "./back";
export default function PlayScreen({ route, navigation }) {
    const titleImg = route.params.titleImg;
    const passedUserData = route.params.userData
    const [pressed, setPressed] = useState(false)
    const desc = "Dozey delivery drivers are losing all of Lovely Linda's Cakes!!!!  Take Control of Rad Brad and collect as many of the items as possible before Dozy Dave and his buddies knock you out the screen!"
    const desc1 = "Tap the screen to jump, if a truck hits you tap quickly to hop over it and try to land on the back of trucks for a speed boost!  The higher the item is off the ground the more points it's worth!"
    const desc2 = "Play as many times as you like, only the first play of the day records your score so make it count!  Play before 11am and log in again after 11am each day to see if you are the winner or check the leaderboard page to see where you rank in the yearly table.  Daily prize must be collected before 6pm when the daily scores are reset"
    const desc3 = "The daily prize is a free Cake and Hot drink courtesy of Lovely Linda at Linda's Lite Bites, the yearly prize is a whopping £100 store voucher.  Good Luck!"
    return (
        <ScrollView style={styles.container}>
            <View style={{justifyContent: "left", alignItems: "left"}}>
            <TouchableOpacity style={{alignItems:'left'}} onPress={() => 
                        navigation.navigate("Home")}>
                    <Back>←Back                               
                    </Back>      
                </TouchableOpacity>
            </View>
            <View>
            <Image style={styles.image} source={titleImg} resizeMode="stretch" />
            </View>
            <Text style={styles.text}>{desc}</Text>
            <Text style={styles.text}>{desc1}</Text>
            <Text style={styles.text}>{desc2}</Text>
            <Text style={styles.text}>{desc3}</Text>
            <TouchableOpacity disabled={pressed} onPress={() => (setPressed(true), ///this only works while on the screen
                    navigation.navigate("Game", {
                        passedUserData
                    }) )}
                        style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent",
                            marginBottom:10
                        }}>
                            
                            <Box>Start</Box>
                            
                        
            </TouchableOpacity>
            
            <View style={styles.promoBoard}>
            <Text style={styles.promoHeaderText}>Linda's Specials</Text>
                <Text style={styles.promoText}>- Cake & Hot Drink £3</Text>
                <Text style={styles.promoText}>- Hot Roll & Hot Drink £3.50</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    text: {
        fontSize: 18,
        fontColor: "Grey",
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "centre"
    },
    image: {
        width: 320,
        height: 260,
        alignSelf: "center",
        marginBottom: 20,
    },
    promoBoard: {
        flex: 0.8,
        
        
        padding: 10,
        paddingHorizontal: 20,
        //paddingTop: 10,
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
        marginBottom: 0,
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
})
