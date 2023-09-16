import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from 'react-native'
import {ProductList} from './ProductList'

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
                       <ProductList key={item.id} item={item} />

                    }
                    keyExtractor={item => item.name}
                    horizontal />

            </View>


        </View>
    )
}