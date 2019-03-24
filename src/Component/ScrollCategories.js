import React, { Component } from 'react'
import {
    ScrollView,
    TouchableOpacity,
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native'

import { FlatGrid } from 'react-native-super-grid'
import Category from './Category'
/*
<ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{height: 180}}
                    >
                    <View
                        style={{
                            height: 180,
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}    
                    >
                        <Category imageUri={require('../assets/img/icons/computer_32.png')}/>
                        <Category imageUri={require('../assets/img/icons/make-up.png')}/>
                        <Category imageUri={require('../assets/img/icons/exercise.png')}/>
                        <Category imageUri={require('../assets/img/icons/computer_32.png')}/>
                        <Category imageUri={require('../assets/img/icons/make-up.png')}/>
                        <Category imageUri={require('../assets/img/icons/exercise.png')}/>
                        <Category imageUri={require('../assets/img/icons/computer_32.png')}/>
                        <Category imageUri={require('../assets/img/icons/make-up.png')}/>
                        <Category imageUri={require('../assets/img/icons/exercise.png')}/>
                    </View>
                    </ScrollView>
*/
export default class ScrollCategories extends Component {
    render() {
        const items = [
            { 
                imageUri: require('../assets/img/icons/computer_32.png'),
                name: 'electric.'
            },
            { 
                imageUri: require('../assets/img/icons/make-up.png'),
                name: 'make up'
            },
            { 
                imageUri: require('../assets/img/icons/exercise.png'),
                name: 'exercise',
            },
            { 
                imageUri: require('../assets/img/icons/bathroom.png'),
                name: 'bathroom'
            },
            { 
                imageUri: require('../assets/img/icons/make-up.png') 
            },
            { 
                imageUri: require('../assets/img/icons/exercise.png') 
            },
            { 
                imageUri: require('../assets/img/icons/computer_32.png') 
            },
            { 
                imageUri: require('../assets/img/icons/make-up.png') 
            },
            { 
                imageUri: require('../assets/img/icons/exercise.png') 
            },
            { 
                imageUri: require('../assets/img/icons/computer_32.png') 
            },
            { 
                imageUri: require('../assets/img/icons/make-up.png') 
            },
            { 
                imageUri: require('../assets/img/icons/exercise.png') },
        ]
        return (
            <View>
                <View style={{marginTop: 20, paddingVertical: 8}}>
                    <ScrollView  
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <FlatGrid
                            itemDimension={45}
                            items={items}
                            fixed={true}
                            staticDimension={550}
                            renderItem={({item, index}) => (
                                <Category imageUri={item.imageUri} name={item.name}/>
                            )}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

})