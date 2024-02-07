import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:10,
        padding:10,
        flexDirection:'row',
        margin:5,
    },
    icon:{
        width:60,
        height:60,
        borderRadius:10,
        backgroundColor:'#fab2c8',
    },
    inner_container:{
        marginLeft:20,
        padding:10,
    },
    title:{
        fontWeight:'bold',
        color:'black',
        fontSize:30,
    }
})