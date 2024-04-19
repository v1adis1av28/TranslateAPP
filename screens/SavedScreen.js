import { StyleSheet, Text, View, Image, TextInput} from 'react-native';

export default function SavedScreen() {
  return (
    <View>
      <Text>SavedScreen</Text>
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d955cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    width: 50,
    height: 50,
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:"white",
    color:"white"
  },
  Text:{
    color:"#faf2f9",
  }
});