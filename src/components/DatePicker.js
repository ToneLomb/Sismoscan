import React, { useState } from 'react';
import { Image, Modal, Text, View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {styles, images} from '../styles/date';
 

export const MyDatePicker = ({startDate, onDateChange}) => {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(startDate);


    function handleOnPress() {
        setOpen(!open);
    }

    function handleChange(newDate) {
        setDate(newDate);
        onDateChange(newDate);
    }

    return (
        <View>
            <View>
                <TouchableOpacity onPress={handleOnPress}
                style={styles.datePicker}>
                <Text>{date}</Text>
                <Image
                    source={images.calendar}
                    style={styles.calendar}
                  />
            </TouchableOpacity>
            </View>
            <Modal
                    visible= {open}
                    animationType='slide'
                    transparent={true}
            >
            <View style = {styles.centeredView} >
                <View style= {styles.modalView} >

                    <DatePicker
                        mode='calendar'
                        selected={date}
                        onDateChange={handleChange}
                    />


                    <TouchableOpacity onPress={handleOnPress}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>
        </View>
    );

};

