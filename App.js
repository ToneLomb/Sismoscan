import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Platform, SafeAreaView } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import MainContainer from './navigation/MainContainer';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';


export default function App(){

  const LoginComponent = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Button 
        title={"Login"} 
        onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
      />
      {auth ? <Button title="Next" onPress={() => navigation.navigate('MainContainer')} /> : undefined}
      </View>
    );
  };

  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();
  const [requireRefresh, setRequireRefresh] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "609807130285-uf6hvh6sgu683kkpod41hv58lf6jn74c.apps.googleusercontent.com",
    iosClientId: "609807130285-437rl64g73nqfuj5a9dhqbcjstn7afri.apps.googleusercontent.com",
    expoClientId: "609807130285-q1bbhnm4qfug5b3i48qps9nukbghvee1.apps.googleusercontent.com"
  });

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      setAuth(response.authentication);

      const persistAuth = async () => {
        await AsyncStorage.setItem("auth", JSON.stringify(response.authentication));
      };
      persistAuth();
    }
  }, [response]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuth(authFromJson);
        console.log(authFromJson);

        setRequireRefresh(!AuthSession.TokenResponse.isTokenFresh({
          expiresIn: authFromJson.expiresIn,
          issuedAt: authFromJson.issuedAt
        }));
      }
    };
    getPersistedAuth();
  }, []);

  const getUserData = async () => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });

    userInfoResponse.json().then(data => {
      console.log(data);
      setUserInfo(data);
    });

  };

  const showUserData = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  };

  const getClientId = () => {
    if (Platform.OS === "ios") {
      return "609807130285-437rl64g73nqfuj5a9dhqbcjstn7afri.apps.googleusercontent.com";
    } else if (Platform.OS === "android") {
      return "609807130285-uf6hvh6sgu683kkpod41hv58lf6jn74c.apps.googleusercontent.com";
    } else {
      console.log("Invalid platform - not handled");
    }
  }


  const logout = async () => {
    await AuthSession.revokeAsync({
      token: auth.accessToken
    }, {
      revocationEndpoint: "https://oauth2.googleapis.com/revoke"
    });

    setAuth(undefined);
    setUserInfo(undefined);
    await AsyncStorage.removeItem("auth");
  };


  return (      
    <View style={styles.container}>
      {showUserData()}
      <Button 
        title={auth ? "Get User Data": "Login with Google"} 
        onPress={auth ? getUserData : () => promptAsync({ useProxy: true, showInRecents: true })}
      />
      {auth ? <Button title="Logout" onPress={logout} /> : undefined}

    </View>
  );
   

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});