import React from "react";
import { MyForm, seismes } from "../../src/components/Form";
import { Text,Image, View } from "react-native";
import {styles, images} from '../../src/styles/searchScreen'

const Seismes = () => {

    return (
      <View>
          {seismes.map((seisme) => (
        
        <View key={seisme.id}> 
          <Text> {seisme.properties.description.fr}</Text>
        </View>
      
      ))}
      </View>
    )
  }

export const SearchScreen = () => {


    return (
            <View style={{backgroundColor: "white"}}>
                <View style={styles.header}>
                    <Image
                        style={styles.banner}
                        source = {images.banner}
                    />
                </View>
                <View styles={styles.body}>
                    <MyForm />
                </View>
                <View>
                    <Seismes/>
                </View>
            </View>
            
      );
}