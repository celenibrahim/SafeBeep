import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    logo_container:{
        alignItems:'center',
    },
    image:{
        marginTop: Dimensions.get('screen').height / 10,
        marginBottom: Dimensions.get('screen').height / 10,
        width: Dimensions.get('screen').width / 1.8,
        height: Dimensions.get('screen').height / 4,
    },
    text:{
        color:'black',
    },
})