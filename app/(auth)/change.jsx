import React, { useState, useEffect } from 'react';
import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View, Animated} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VignetteImage from "../../assets/images/viñ.png"; // Importa la imagen
import CheckImage from "../../assets/images/ver.png"; // Importa la imagen de verificación
import { useUser } from "../../hooks/UserContext";
import axios from "axios";

export default function change() {
    const baseURL = "https://eventspce-production.up.railway.app/api";
      const router = useRouter();
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const { userData, saveCredentials } = useUser();

  const [errors, setErrors] = useState({});
    const [showPasswordRequirements, setShowPasswordRequirements] =
      useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const alertOpacity = useState(new Animated.Value(0))[0];
  
    useEffect(() => {
      if (showAlert) {
        Animated.timing(alertOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(alertOpacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => setShowAlert(false));
          }, 3000);
        });
      }
      console.log(userData);
    }, [showAlert, userData]);
  
    const validatePassword = (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasSpecialChar = /[#$%&@]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasMinLength = password.length >= 8;
  
      const newErrors = [];
      if (!hasUpperCase) newErrors.push("Debe contener al menos una mayúscula");
      if (!hasLowerCase) newErrors.push("Debe contener al menos una minúscula");
      if (!hasSpecialChar) newErrors.push("Debe contener al menos un carácter especial (#,$,%,&,@)");
      if (!hasNumber) newErrors.push("Debe contener al menos un número (0-9)");
      if (!hasMinLength) newErrors.push("Debe contener al menos 8 caracteres");
  
      return newErrors;
    };
  
    const handleSubmit = async () => {
        const newErrors = {};
    
        if (!formData.password) {
          newErrors.password = "Por favor ingrese una contraseña";
        } else {
          const passwordErrors = validatePassword(formData.password);
          if (passwordErrors.length > 0) {
            newErrors.password =
              "La contraseña debe cumplir con los requisitos, inténtelo de nuevo";
          }
        }
    
        setErrors(newErrors);
    
      };
    
      const PasswordRequirements = () => {
        const password = formData.password;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[#$%&@]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasMinLength = password.length >= 8;    

    return (
      <View className="flex-1 p-5 bg-[#8B5DFF1A] items-center justify-center">
        <Text className="text-3xl font-outfit text-[#191D31] mb-5 text-left w-full">
            Datos del Usuario
        </Text>

        <View className="bg-[#8B5DFF24] rounded-[33px] w-[95%] p-3">
            <View className="w-full items-center mb-3">
            <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
                Contraseña
            </Text>
            {isEditingPassword ? (
                <TextInput className={`h-14 w-full border ${ errors.password ? "border-red-500" : "border-[#C4C4C4]"
                  } rounded-xl p-3 font-outfit text-xl ${ formData.password ? "text-black" : "text-[#C4C4C4]" }`}
                  placeholder="Contraseña"
                  placeholderTextColor="#C4C4C4"
                  value={userData.password}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => handleChange('password', text)}
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => setShowPasswordRequirements(false)}
                  secureTextEntry={!passwordVisible}
                />
              ) : (
                <View className="p-3 border border-[#C4C4C4] rounded bg-[#f9f9f9] w-11/12 self-center">
                <Text>{userData.password ? userData.password.replace(/./g, '•') : 'Contraseña'}</Text>
                
                <TouchableOpacity
                  className="absolute right-3 top-4"
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>

                </View>
            )}


            </View>

            {/* Botones */}
            <View className="flex-row justify-between mt-5">
            <TouchableOpacity
                className={`p-3 rounded-full w-[49%] items-center border border-[#8B5DFF] ${
                activeButton === 'edit' ? 'bg-[#8B5DFFB0]' : 'bg-[#8B5DFF4D]'
                }`}
                onPress={() => {
                setIsEditing(!isEditing);
                setActiveButton('edit');
                }}
            >
                <Text className="text-white font-outfit-light text-center">
                {isEditing ? 'Guardar Cambios' : 'Editar Datos del Usuario'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className={`p-3 rounded-full w-[49%] items-center border border-[#8B5DFF] ${
                activeButton === 'password' ? 'bg-[#8B5DFFB0]' : 'bg-[#8B5DFF4D]'
                }`}
                onPress={() => {
                setIsEditingPassword(!isEditingPassword);
                setActiveButton('password');
                }}
            >
                <Text className="text-white font-outfit-light text-center">
                {isEditingPassword ? 'Guardar Contraseña' : 'Editar Contraseña'}
                </Text>
            </TouchableOpacity>
            </View>
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
                source={require('../../assets/images/home.png')}
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
    };
}