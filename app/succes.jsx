import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react';

export default function succes() {
  return (
    <View className="bg-[#8B5DFF1A] w-full h-full items-center justify-center">

        <View className="flex flex-row items-center w-80">
            <Text className="pl-2 font-outfit text-3xl leading-tight mb-20">
              Editar datos del Usuario
            </Text>
        </View>

      <View className="bg-[#8B5DFF24] rounded-[33px] w-[80%] px-4 items-center py-10">
        
        <Image source={require("../assets/images/check.png")} className="mt-10"/>
        <Text className="font-outfit m-10 text-center text-2xl">
            Los datos se han editado correctamente
        </Text>
        <TouchableOpacity className="w-[90%] border border-[#8B5DFF] bg-[#8B5DFFB0] py-[15px] rounded-full">
          <Link
            href="/user"
            className="text-[20px] font-outfit-medium text-center text-white"
          >
            Volver a Perfil
          </Link>
        </TouchableOpacity>
      </View>


    <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderTopColor: '#C4C4C4',
                borderTopWidth: 1,
              }}
            >
              <View className="flex-column justify-between ">
                  <Image
                    source={require('./assets/images/home.png')}                          
                    style={{ width: 30, height: 30, tintColor: '#666876' }}/>
                  <Text className="text-[#666876] font-outfit-light text-center text-sm">Inicio</Text>
              </View>
              <View className="flex-column justify-between ">
                  <Image
                  source={require('../../assets/images/search.png')}
                  style={{ width: 30, height: 30, tintColor: '#666876' }}
                  />
                  <Text className="text-[#666876] font-outfit-light text-center text-sm">Buscar</Text>
              </View>
              <View>
                  <Image
                  source={require('../../assets/images/p.png')}
                  style={{ width: 30, height: 30, tintColor: '#666876' }}
                  />
                  <Text className="text-[#666876] font-outfit-light text-center text-sm">Perfil</Text>
              </View>
          </View>
      
    </View>
  );
}
