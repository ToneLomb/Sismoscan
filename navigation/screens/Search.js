import React from "react";
import { MyForm } from "../../src/components/Form";
import { Image, View, ScrollView } from "react-native";
import {styles, images} from '../../src/styles/searchScreen'



export const SearchScreen = () => {

    return (
            <ScrollView style={styles.formContainer}>
                <View style={styles.header}>
                    <Image
                        style={styles.banner}
                        source = {images.banner}
                    />
                </View>
                <View style={styles.body}>
                    <MyForm />
                </View>
                <View style={styles.footer}>

              </View>
            </ScrollView>
            
      );
}