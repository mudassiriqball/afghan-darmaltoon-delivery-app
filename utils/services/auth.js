
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = () => (
    <></>
)

export async function saveTokenToStorage(_token) {
    try {
        await AsyncStorage.setItem('token', _token)
    } catch (err) {
        console.log('save token error:', err)
    }
}

export async function getTokenFromStorage() {
    try {
        const _token = await AsyncStorage.getItem('token')
        return _token
    } catch (err) {
        console.log('get token error:', err)
        return null
    }
}

export async function removeTokenFromStorage() {
    try {
        await AsyncStorage.removeItem('token')
        return true
    } catch (err) {
        return false
    }
}

export async function getDecodedTokenFromStorage() {
    try {
        const _token = await AsyncStorage.getItem('token')
        if (_token != null) {
            const decodedToken = jwt_decode(_token);
            if (decodedToken.exp < Date.now() / 1000) {
                await AsyncStorage.removeItem('token')
                return null
            } else {
                return decodedToken.data;
            }
        } else {
            return null;
        }
    } catch (err) {
        console.log('checkTokenExpAuth error:', err)
        return null
    }
}

export default auth;