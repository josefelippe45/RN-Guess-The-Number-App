import React from 'react';
import { TextInput, StyleSheet, TextInputBase} from 'react-native';

const Input = props =>{
    //{...props} takes all the props we have and adds them to our components
    //we are fowarding our props to the component we are using in our custom component
    //it bassicaly makes our Input component a TextInput component
    return <TextInput {...props} style= {{...styles.input, ...props.style}}/>
};

const styles = StyleSheet.create({
    input:{
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 10
    }
});
export default Input;