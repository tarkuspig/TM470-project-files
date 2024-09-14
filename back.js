import { View, Text, StyleSheet, Platform } from "react-native"

export default function Back( { children, style} ) {
    return (
        <View style={[styles.box, style]}>
            <Text style={styles.text}>{ children } </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "White",
        padding: 10,
        width:'auto', 
        height: 40,
        outlineStyle: "solid",
        outlineColor: "black",
        outlineWidth: 4,
        borderRadius: 10
        

    },
    text: {
        fontSize: Platform.OS === 'android' ? 18 : 22,
        fontWeight: "bold",
        textAlign: "left",
        fontFamily: Platform.OS === 'android' ? 'Roboto' : "Times New Roman",
        color: '#e60000'
    },
});