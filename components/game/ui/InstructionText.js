import React from "react";
import {StyleSheet,Text } from "react-native";
import Colors from "../../../constants/colors";

function InstructionText({ children, style }){
return   <Text style={[styles.intructionText, style]}>{children}</Text>
}
export default InstructionText;

const styles = StyleSheet.create({
    intructionText:{
        fontFamily:'open-sans',
        color: Colors.accent500,
        fontSize: 24
      },
});
