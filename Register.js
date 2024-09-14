import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity, Alert} from "react-native"
import { useState } from "react";
import Box from "./box";
import Back from "./back";
import axios from 'axios'


export default function Register({ route, navigation }) {
    const [username, setUserName] = useState("");
    const [userNameVerify, setUsernameVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [name, setName] = useState("");
    const [nameVerify, setNameVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [errors, setErrors] = useState({});
    const [pressed, setPressed] = useState(false)
    
    const validateForm = () => {
        let errors = {};

        if(!username) errors.username = "Username is Required";
        if(!password) errors.password = "Password is required";
        if(!name) errors.name = "Name is required";
        if(name.length <= 3) errors.name = "Name must be at least 4 characters"
        if(!email) errors.email = "Email is required";
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) errors.email = "Please include valid email address"

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const handleSubmit = () => {
        if(validateForm()) {
            console.log("Submitted", username, password, name, email);
            const userData = {
                name:name,
                username:username,
                email:email,
                password:password,
                cumulative_score: 0,
                daily_score: 0,
    
            };
            axios
            .post("http://192.168.1.80:5001/register", userData)
            .then(res=> {
                console.log(res.data);
                if(!(res.data.data === "User already exists" || res.data.data === "Email Address Already Registered")){
            
                    alert("Registration Successful")
                    navigation.navigate("Login", {
                    name: username,
                    password: password
                })
            } else{
                alert(res.data.data)
            }
        })
            .catch(e => console.log(e));            
            setUserName("");
            setPassword("");
            setEmail("");
            setName("");
            setErrors({});           
        }
    }

    
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios1" ? 100 : 0} behavior="padding" style={styles.container}>
            <View>
                <TouchableOpacity style={{alignItems:'left'}} onPress={() => 
                        navigation.navigate("Login")}>
                    <Back>←Back                               
                    </Back>      
                </TouchableOpacity>
            </View>
            <View style={styles.form}>  
            
        
        
            <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} 
                autoCapitalize="none"
                placeholder="Enter your full name" 
                value={name}
                onChangeText={setName} 
                autoCorrect={false}/>
                {
                    errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null
                }
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} 
                
                placeholder="Enter your email address" 
                value={email}
                onChangeText={setEmail} 
                autoCapitalize="none"
                autoCorrect={false}/>
                {
                    errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null
                }
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} 
                
                placeholder="Enter your username" 
                value={username}
                onChangeText={setUserName} 
                autoCapitalize="none"
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
                autoCapitalize="none"
                />
                {
                    errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null
                }
                <TouchableOpacity onPress={()=>handleSubmit()}
                        style={{ backgroundColor: pressed ? "#E8E9EB" : "transparent",
                            marginBottom:10
                        }}>
                        <Box>
                            Register
                        </Box>
                </TouchableOpacity>
                

                
                
           
            </View>
            <View style={styles.promoBoard}>
            <Text style={styles.promoHeaderText}>Linda's Specials</Text>
                <Text style={styles.promoText}>- Steak Pie and chips £5</Text>
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
        marginTop: -10
    },
    promoText: {
        fontFamily: "Chalkduster",
        fontSize: 24, 
        color: "white",
    }, 
    promoHeaderText: {
        fontFamily: "Chalkduster",
        fontSize: 24, 
        color: "white",
        
    }
    

});