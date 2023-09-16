import React from "react";
import { Dimensions, TouchableOpacity, View } from 'react-native'


var { width } = Dimensions.get('window')

export const Product = (props) => {
    return(
        <TouchableOpacity style={{width:'50%'}}>
            <View style={{width:width/2, backgroundColor:'gainboro'}}>

            </View>

        </TouchableOpacity>
    )
}