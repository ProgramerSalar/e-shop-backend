import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import {ProductCard}  from "./ProductCard";


var { width } = Dimensions.get('window')

const ProductList = (props) => {
    const { item } = props

    return (
        <TouchableOpacity style={styles.touchableopacity}>
            <View style={styles.view} >
                <ProductCard />
                <Text>Hello world</Text>

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view:{
        width: width / 2, backgroundColor: 'gainboro' 
    },
    touchableopacity:{
        width:'50%',
    }
})


export default ProductList;