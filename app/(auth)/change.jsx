import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../hooks/UserContext";
import VignetteImage from "../../assets/images/viñ.png"; // Importa la imagen
import CheckImage from "../../assets/images/ver.png"; // Importa la imagen de verificación

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const alertOpacity = useState(new Animated.Value(0))[0];
  const [showPasswordRequirements, setShowPasswordRequirements] =useState(false);

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
  }, [showAlert]);

  const validatePasswords = () => {
    const newErrors = {};
    if (!formData.oldPassword) {
      newErrors.oldPassword = "Por favor ingrese su contraseña anterior";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "Por favor ingrese una nueva contraseña";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "La nueva contraseña debe tener al menos 8 caracteres";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validatePasswords()) {
      setAlertMessage("Contraseña actualizada correctamente");
      setShowAlert(true);
      // Logic to update the password can be added here
    }
  };

  const PasswordRequirements = () => {
    const password = formData.newPassword; // Use the new password field
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[#$%&@]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    return (
      <View className="w-full border border-black p-4 mt-6">
        <Text className="font-outfit text-black mb-2">Tu contraseña debe de contener:</Text>
        <View className="pl-4">

          <View className="flex flex-row items-center mb-1">
            <Image
              source={hasMinLength ? CheckImage : VignetteImage}
              style={{
              width: 15,
              height: 15,
              marginRight: 8,
              tintColor: hasMinLength ? "#4285F4" : "black",
              }}
            />
            <Text className={`font-outfit text-sm ${hasMinLength ? "text-[#4800FF]" : "text-black"}`}>
              Al menos 8 caracteres de largo
            </Text>
            
          </View>

          <View className="flex flex-row items-center mb-1">
          <Image
              source={hasMinLength ? CheckImage : VignetteImage}
              style={{
              width: 15,
              height: 15,
              marginRight: 8,
              tintColor: hasMinLength ? "#4285F4" : "black",
              }}
            />
            <Text className={`font-outfit text-sm ${hasLowerCase ? "text-[#4800FF]" : "text-black"}`}>
              Letras mayúsculas y minúsculas (Aa - Zz)
            </Text>
          </View>

          <View className="flex flex-row items-center mb-1">
          <Image
              source={hasMinLength ? CheckImage : VignetteImage}
              style={{
              width: 15,
              height: 15,
              marginRight: 8,
              tintColor: hasMinLength ? "#4285F4" : "black",
              }}
            />
            <Text className={`font-outfit text-sm ${hasSpecialChar ? "text-[#4800FF]" : "text-black"}`}>
              Caracteres especiales (#,$,%,&,@)
            </Text>
          </View>

          <View className="flex flex-row items-center mb-1">
          <Image
              source={hasMinLength ? CheckImage : VignetteImage}
              style={{
              width: 15,
              height: 15,
              marginRight: 8,
              tintColor: hasMinLength ? "#4285F4" : "black",
              }}
            />
            <Text className={`font-outfit text-sm ${hasNumber ? "text-[#4800FF]" : "text-black"}`}>
              Números (0-9)
            </Text>
          </View>

        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-5 bg-[#8B5DFF1A] items-center justify-center">
      <Text className="text-3xl font-outfit text-[#191D31] mb-5">Editar Contraseña</Text>

      <View className="bg-[#8B5DFF24] rounded-[33px] w-[95%] p-5">
        <Text className="text-lg font-outfit-medium text-[#8B5DFF] mb-2">Contraseña Anterior</Text>
        <View className="relative">
          <TextInput
            className={`h-14 w-full border bg-white ${errors.oldPassword ? "border-red-500" : "border-[#C4C4C4]"} rounded-xl p-3 font-outfit text-xl`}
            placeholder="Contraseña Anterior"
            placeholderTextColor="#C4C4C4"
            secureTextEntry={!passwordVisible}
            value={formData.oldPassword}
            onChangeText={(text) => setFormData({ ...formData, oldPassword: text })}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.oldPassword && <Text className="text-red-500 text-xs mt-1">{errors.oldPassword}</Text>}

        <Text className="text-lg font-outfit-medium text-[#8B5DFF] mt-4 mb-2">Contraseña Nueva</Text>
        <View className="relative">
          <TextInput
            className={`h-14 w-full border bg-white ${errors.newPassword ? "border-red-500" : "border-[#C4C4C4]"} rounded-xl p-3 font-outfit text-xl`}
            placeholder="Contraseña Nueva"
            placeholderTextColor="#C4C4C4"
            secureTextEntry={!passwordVisible}
            value={formData.newPassword}
            onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.newPassword && <Text className="text-red-500 text-xs mt-1">{errors.newPassword}</Text>}

        <Text className="text-lg font-outfit-medium text-[#8B5DFF] mt-4 mb-2">Confirmar Contraseña</Text>
        <View className="relative">
          <TextInput
            className={`h-14 w-full border bg-white ${errors.confirmPassword ? "border-red-500" : "border-[#C4C4C4]"} rounded-xl p-3 font-outfit text-xl`}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#C4C4C4"
            secureTextEntry={!passwordVisible}
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>}

        {/* Password Requirements */}
        <PasswordRequirements />

        {/* Submit Button */}
        <TouchableOpacity
          className="w-full bg-[#246BFD] py-4 rounded-full mt-6"
          onPress={handleSubmit}
        >
          <Text className="text-white font-outfit text-lg text-center">Guardar Cambios</Text>
        </TouchableOpacity>
      </View>

      {/* Alert */}
      {showAlert && (
        <Animated.View
          style={{
            opacity: alertOpacity,
            position: "absolute",
            bottom: 20,
            width: "90%",
            backgroundColor: "#00000066",
            padding: 14,
            borderRadius: 50,
            alignItems: "center",
          }}
        >
          <Text className="text-white font-outfit-medium text-center">{alertMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}