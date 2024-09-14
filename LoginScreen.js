import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity} from "react-native"
import { useState } from "react";
import Box from "./box";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginScreen( {navigation, route} ) {
    
    const logoImg = route.params.logoImg;
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [pressed, setPressed] = useState(false)
    
    const validateForm = () => {
        let errors = {};

        if(!username) errors.username = "Username is Required";
        if(!password) errors.password = "Password is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = () => {
        if(validateForm()) {
            console.log("Submitted", username, password);
            const userData = {
                username: username,
                password
            };
            axios.post("http://192.168.1.80:5001/login-user", userData)//change the ip address when home
            .then(res=> {
                console.log(res.data);
                if(res.data.status === "ok"){ 
                    alert("Logged in!")
                    AsyncStorage.setItem('token', res.data.data);                  
                    navigation.navigate("Home")

                } else if(res.data.data === "Username Invalid"){
                    alert(res.data.data)
                    setUserName("");
                    setPassword("");
                    setErrors({});
                }  
                })
            
                
        }
            
    }
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios1" ? 100 : 0} behavior="padding" style={styles.container}>
            <View style={styles.form}>   
                <Image style={styles.image} source={logoImg} resizeMode="contain"/> 
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} 
                
                placeholder="Enter your username" 
                value={username}
                onChangeText={setUserName} 
                autoCorrect={false}/>
                {
                    errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null
                }
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} 
                placeholder="Enter your password" 
                secureTextEntry
                value={password}  
                onChangeText={setPassword}
                />
                {
                    errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null
                }
                <TouchableOpacity onPress={handleSubmit}
                        style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent",
                            marginBottom:10
                        }}>
                        <Box>
                            Login
                        </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => 
                    navigation.navigate("Register")}
                    style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent"}}>
                    <Box>Sign Up</Box>                        
                </TouchableOpacity>
                <Button  title="Forgotten Password" 
            onPress={() => alert("Please bring your device in-store") }/>
            

                
                
           
            </View>
            <View style={styles.promoBoard}>
            <Text style={styles.promoHeaderText}>Linda's Specials</Text>
                <Text style={styles.promoText}>- Steak Pie and Chips £5</Text>
                <Text style={styles.promoText}>- Hot Roll & Hot Drink £3.50</Text>
            </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        backgroundColor: "#f5f5f5",
    },
    form: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {                       
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,                      
        elevation: 5 
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "white",
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: "center",
        marginBottom: 50,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
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
        marginBottom: 16,
        marginTop: -25
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
        
    }
    

});