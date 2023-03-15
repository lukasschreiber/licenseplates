import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image  } from 'react-native';

export default function LicensePlate(props) {
    const [code, setCode] = useState("");

    const handleChange = (value) => {
        setCode(value.toUpperCase());
        if(props.onChange) props.onChange(value.toUpperCase());
    }

    return (
        <View style={styles.container}>
            <Image source={require("./assets/licenseplate.png")} style={styles.left}/>
            <TextInput keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'} placeholder="DA"  style={styles.input} maxLength={3} onChangeText={handleChange} value={code}/>
            <Text style={styles.text}>: LS 256</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex", 
        flexDirection:"row", 
        justifyContent: "center", 
        alignItems: "center",
        height: 60,
        backgroundColor: "white",
        position: "relative",
        paddingRight: 20,
        elevation: 4,
        borderRadius: 5,
        margin: 20,
        marginTop: 100
    }, 
    left:{
        resizeMode: "contain",
        height: "100%",
        width: undefined,
        aspectRatio: 0.45,
        flexShrink: 1,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    input: { 
        fontFamily: 'EuroPlate', 
        fontSize: 45,
        width: 90,
        paddingLeft: 9,
        paddingRight: 9,
        textAlign: "right",
    },
    text: {
        fontFamily: 'EuroPlate', 
        fontSize: 45,
        color: "rgba(0,0,0,.7)"
    }
  });
  