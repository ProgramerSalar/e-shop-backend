import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from 'react-native'
import ProductList from './ProductList'

const data = require('../../assets/data/products.json')

const ProductContainer = () => {

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
                    // <Text>{item.brand}</Text>
                    <ProductList 
                    key={item.id}
                    item={item}
                    />
                        
                       

                    }
                    keyExtractor={(item) => item.name}
                    horizontal


                     />
                    
                    <ProductList/>

            </View>


        </View>
    )
}


export default ProductContainer;