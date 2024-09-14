import { View, Text, StyleSheet } from "react-native"

export default function Box( { children, style} ) {
    return (
        <View style={[styles.box, style]}>
            <Text style={styles.text}>{ children } </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#E8E9EB",
        padding: 10,
        width:'auto', 
        height: 40,
        borderRadius: 16

    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center"
    },
});