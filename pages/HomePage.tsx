import { Button, View, Text } from "react-native";
import useAuth from "../hooks/useAuth";

function HomePage({navigation}) {
  const {authData, login, logout} = useAuth()

  return (<View>
    <Button title="camera" onPress={()=>{navigation.navigate("camera")}}></Button>
    <Button title="image" onPress={()=>{navigation.navigate("image")}}></Button>
    <Button title="Logout" onPress={logout} />
    </View>)
}
export default HomePage