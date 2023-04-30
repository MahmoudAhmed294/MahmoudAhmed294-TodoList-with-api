import { StyleSheet } from "react-native";

 const authStyle = StyleSheet.create({
    input: {
      width:"100%",
      marginTop:8
    },
    container: {
        height: '100%',
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      mt_3: {
        marginTop: 24,
      },
      submitBtn: {
        marginTop: 40,
      },
      submitText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
      },
      loginLink: {
        marginTop: 20,
        color: 'blue',
      },
    
    
  });
  

  export default authStyle;