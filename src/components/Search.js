import {styles} from '../styles/search'
import {TouchableOpacity, TextInput, Text, View, FlatList } from 'react-native';
import { Modal } from 'react-native';
import React, {useRef, useState} from 'react';
import cities from '../../cities.json'


export var ville = {name: "Rechercher"}

const setVille = (newVille) => {
    ville = newVille

}


export const Search = ({selected, setSelected}) => {

    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(cities);
    const searchRef = useRef();
    const onSearch = (search) => {
        if (search !== '') {
          const tempData = cities.filter((item) => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
          });
      
          // Trier les résultats par rapport à la longueur de la recherche
          tempData.sort((a, b) => {
            const aLength = a.name.length;
            const bLength = b.name.length;
            return aLength - bLength;
          });
      
          setData(tempData);
        } else {
          setData(cities);
        }
      };

    return(
        <View>
            <Modal
                visible= {selected}
                transparent={true}
                onRequestClose={() => {setSelected(!selected)}}
            >
             <View style={styles.center}>
                <View style= {styles.popupContainer}>
                    <View>
                    {selected ? (
                        <View
                            style={styles.scroller}>
                        <TextInput
                            placeholder="Ville"
                            value={search}
                            ref={searchRef}
                            onChangeText={txt => {
                                onSearch(txt);
                                setSearch(txt);
                            }}
                            style={styles.searchBar}
                        />
                        <FlatList
                            data={data}
                            renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                style={styles.ville}
                                onPress={() => {
                                    setVille(item);
                                    setClicked(!clicked);
                                    onSearch('');
                                    setSearch('');
                                    setSelected(!selected)
                                    
                                }}>
                                <Text style={{fontWeight: '600'}}>{item.name}, {item.department_code}</Text>
                                </TouchableOpacity>
                            );
                            }}
                        />
                        </View>
                    ) : null}
                    </View>
                </View>  
            </View>
                
            </Modal>
        </View>
    );
}