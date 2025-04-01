import { Link } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Exito() {
  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
        <View className="flex flex-row items-center w-80">
            <Image source={require("../assets/images/Logo.png")} />
            <Text className="pl-2 font-outfit-bold text-2xl leading-tight">
              EventSpace 
            </Text>
            <Text className="font-outfit-light text-xl md:text-lg lg:text">{" "} | Propietarios</Text>
        </View>
        <Image source={require("../assets/images/check.png")} className="mt-10"/>
        <Text className="font-outfit-medium m-10 text-center text-3xl">
            Usuario Registrado con Éxito
        </Text>
        <TouchableOpacity className="w-[300px] border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full">
          <Link
            href="/inicial"
            className="text-2xl font-outfit-medium text-center text-white"
          >
            Aceptar
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
