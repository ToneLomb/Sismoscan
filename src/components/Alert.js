import React, { useState } from 'react';
import { Button } from 'react-native';
import { Modal } from 'react-native';
import {Image, View, Text} from 'react-native';
import {styles, images} from '../styles/alert';
import { TouchableOpacity } from 'react-native';

 export const CustomAlert = ({errorMessage, modalVisible, setModalVisible}) => {

    return (
        <View>
            <Modal 
                visible= {modalVisible}
                transparent={true}
                onRequestClose={() => {setModalVisible(!modalVisible)}}
            >
            <View style={styles.center}>
                <View style= {styles.popupContainer}>
                    <View style={styles.head}>
                        <Image
                            style={styles.image}
                            source = {images.error}
                        />
                        <Text style={styles.headText}>
                            Erreur
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bodyText}> {errorMessage} </Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.boutton}
                            onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.bouttonText} >
                                    Réessayer
                                </Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
                
            </View>
            </Modal>
        </View>
    )
 }
