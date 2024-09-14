import { Text, View, StyleSheet, Button, SafeAreaView, Platform, FlatList, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react";
import axios from "axios";
import Back from "./back";

export default function LeaderBoard({ route, navigation }) {
    const [userData, setUserData] = useState(null);
    const [winnerData, setWinnerData] = useState(null)
    const [pos, setPos] = useState(1)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get('http://192.168.1.80:5001/leaderboard');
            setUserData((res.data.data).sort((a, b) => b.cumulative_score - a.cumulative_score));
            
                       
            
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
    fetchData();
    }, []);

    function incre() { //increments leaderboard position
        setPos(pos+1)
    }
   


    return (
        <SafeAreaView style={styles.container}>
            <View style={{justifyContent: "left", alignItems: "left"}}>
                <TouchableOpacity onPress={() => 
                        navigation.navigate("Home")}>
                    <Back>←Back                               
                    </Back>      
                </TouchableOpacity>
            
            </View>

            <View style={styles.container}>
                
                  
                <FlatList
                data={userData}
                renderItem={({ item, index }) => {
                    
                    return(
                        <View style={styles.card} key={item.username}>
                            
                            <Text style={styles.cardText}>#{(index+1)}   {item.username}</Text>
                            <Text style={styles.cardText}>Yearly Score {item.cumulative_score} </Text>
                            <Text style={styles.cardText}>Daily Score {item.daily_score} </Text>
                        </View>
                    ); incre();
                    
                }}
                keyExtractor={(item, index) => item._id.toString()}
                ItemSeparatorComponent={<View style={{height: 16}}/>}
                ListEmptyComponent={<Text style={{fontSize: 36, fontWeight: "bold", alignItems: "center",
                    justifyContent: "center", textAlign: "center"
                }}>No Items Found</Text>}
                ListHeaderComponent={<Text style={styles.headerText}>LeaderBoard</Text>}
                ListFooterComponent={<Text style={styles.footerText}>LeaderBoard</Text>}
                />
            
            </View>
            <View style={styles.promoBoard}>
            <Text style={styles.promoHeaderText}>Linda's Specials</Text>
                <Text style={styles.promoText}>- Chips & Curry Sauce + Juice (can) £4.20</Text>
                <Text style={styles.promoText}>- Soup & Sandwich £4</Text>
                <Text style={styles.promoText}>- Hot Roll & Hot Drink £3.50</Text>
            </View>
        </SafeAreaView>
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
    titleText: {
        fontSize: 48,
        fontWeight: "bold",
        textAlign: "center",
        color: "black"
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
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
       // marginBottom: 16
    },
    cardText: {
        fontSize: 24,
        justifyContent: "space-between"
    },
    posText: {
        fontSize: 24,
        textAlign: "right"
    },
    headerText: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 12,
    },
    footerText: {
        fontSize: 24,
        textAlign: "center",
        marginTop: 12,
    },
    sectionHeaderText: {
        backgroundColor: 'lightgreen',
        fontSize: 24,
        fontWeight: "bold"
    },
})
