import * as Crypto from 'expo-crypto'
import base64 from 'react-native-base64'


export const formatter = {
    toBase64: (str) => {
        return base64.encode(str)
    },

    toSHA256: async (str) => {
       const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, str);
       return hash
    }
}