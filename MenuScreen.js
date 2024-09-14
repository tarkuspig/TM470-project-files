import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { SectionList } from 'react-native';
import Back from './back';

export default function MenuScreen({ route, navigation }) {
    const data = route.params.data;
    
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{justifyContent: "left", alignItems: "left"}}>
            <TouchableOpacity style={{alignItems:'left'}} onPress={() => 
                        navigation.navigate("Home")}>
                    <Back>←Back                               
                    </Back>      
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.titleText}>Menu</Text>
            </View>
            <SectionList
                sections={data}
                renderItem={({ item }) => {
                    return(
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{item[0]}</Text>
                            <Text style={styles.priceText}>{item[1]}</Text>
                        </View>
                    );
                }}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeaderText}>{section.type}</Text>
                )
            }
            ItemSeparatorComponent={() => <View style={{height: 16}}/>}
            SectionSeparatorComponent={() => <View style={{height: 16}}/>}
                />
                
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    ScrollView: {
        paddingHorizontal: 16

    },
    card: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 0
    },
    cardText: {
        fontSize: 30,
        fontColor: '#e60000'
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
        backgroundColor: 'white',
        fontColor: "#e6000",
        fontSize: 30,
        fontWeight: "bold"
    },
    priceText: {
        fontSize: 24,
        textAlign: "right"
    },
    titleText: {
        fontSize: 48,
        fontWeight: "bold",
        textAlign: "center"
    }
})