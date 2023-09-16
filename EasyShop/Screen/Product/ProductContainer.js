import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from 'react-native'


const data = require('../../assets/data/products.json')


export const ProductContainer = () => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(data)

        return () => {
            setProducts([])
        }
    }, [])



    return (
        <View>
            
            <View>
                <FlatList
                    data={products}
                    renderItem={({ item }) =>
                        <Text>{item.brand}</Text>

                    }
                    keyExtractor={item => item.name}
                    horizontal />

            </View>


        </View>
    )
}