import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'; 
import VignetteImage from "../../assets/images/viñ.png"; // Importa la imagen
import CheckImage from "../../assets/images/ver.png"; // Importa la imagen de verificación

export default function registerP2() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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
  }, [showAlert]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[#$%&@]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    const newErrors = [];
    if (!hasUpperCase) newErrors.push('Debe contener al menos una mayúscula');
    if (!hasLowerCase) newErrors.push('Debe contener al menos una minúscula');
    if (!hasSpecialChar) newErrors.push('Debe contener al menos un carácter especial (#,$,%,&,@)');
    if (!hasNumber) newErrors.push('Debe contener al menos un número (0-9)');
    if (!hasMinLength) newErrors.push('Debe contener al menos 8 caracteres');

    return newErrors;
  };

  const checkDuplicateEmail = async (email) => {
    // Aquí deberías implementar la lógica para verificar el email en tu backend
    // Por ahora retornamos false como ejemplo
    return false;
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Por favor ingrese un correo electrónico';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El correo introducido es incorrecto, intente de nuevo';
    } else if (await checkDuplicateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico ya ha sido registrado, inicie sesión';
    }

    if (!formData.password) {
      newErrors.password = 'Por favor ingrese una contraseña';
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = 'La contraseña debe cumplir con los requisitos, inténtelo de nuevo';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push("/exito");
    } else {
      const errorMessages = Object.values(newErrors).join('\n');
      setAlertMessage(errorMessages);
      setShowAlert(true);
    }
  };

  const PasswordRequirements = () => {
    const password = formData.password;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[#$%&@]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    return (
      <View className="w-full border-2 p-4 m-3">
        <Text className={`font-outfit-medium mb-2 ${password ? 'text-[#4285F4]' : ''}`}>Tu contraseña debe contener:</Text>
        <View className="pl-4">
          <View className="flex flex-row items-center mb-1">
            <Image source={hasMinLength ? CheckImage : VignetteImage} style={{ width: 15, height: 15, marginRight: 8, tintColor: hasMinLength ? '#4285F4' : 'black' }} />
            <Text className={`font-outfit text-sm ${hasMinLength ? 'text-[#4285F4]' : ''}`}>Al menos 8 caracteres de largo</Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image source={hasLowerCase ? CheckImage : VignetteImage} style={{ width: 15, height: 15, marginRight: 8, tintColor: hasLowerCase ? '#4285F4' : 'black' }} />
            <Text className={`font-outfit text-sm mb-1 ${hasLowerCase ? 'text-[#4285F4]' : ''}`}>Letras minúsculas (a-z)</Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image source={hasUpperCase ? CheckImage : VignetteImage} style={{ width: 15, height: 15, marginRight: 8, tintColor: hasUpperCase ? '#4285F4' : 'black' }} />
            <Text className={`font-outfit text-sm mb-1 ${hasUpperCase ? 'text-[#4285F4]' : ''}`}>Letras mayúsculas (A-Z)</Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image source={hasSpecialChar ? CheckImage : VignetteImage} style={{ width: 15, height: 15, marginRight: 8, tintColor: hasSpecialChar ? '#4285F4' : 'black' }} />
            <Text className={`font-outfit text-sm ${hasSpecialChar ? 'text-[#4285F4]' : ''}`}>Al menos un carácter especial (#,$,%,&,@)</Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image source={hasNumber ? CheckImage : VignetteImage} style={{ width: 15, height: 15, marginRight: 8, tintColor: hasNumber ? '#4285F4' : 'black' }} />
            <Text className={`font-outfit text-sm ${hasNumber ? 'text-[#4285F4]' : ''}`}>Números (0-9)</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
        <View className="flex flex-row items-center w-80">
          <Image source={require("../../assets/images/Logo.png")}/>
          <Text className="pl-2 font-outfit-bold text-2xl leading-tight">
            EventSpace 
          </Text>
          <Text className="font-outfit-light text-xl md:text-lg lg:text">{" "} | Propietarios</Text>
        </View>
        <Text className="font-outfit text-xl my-10">Crea tu usuario</Text>
        <TextInput
          className={`h-14 w-full border ${errors.email ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl mb-2 ${formData.email ? 'text-black' : 'text-[#C4C4C4]'}`} 
          placeholder="Correo electrónico*"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View className="relative w-full">
          <TextInput
            className={`h-14 w-full border ${errors.password ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl ${formData.password ? 'text-black' : 'text-[#C4C4C4]'}`}
            placeholder="Contraseña*"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={!passwordVisible}
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            className="absolute right-3 top-4"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {showPasswordRequirements && <PasswordRequirements />}
        <TouchableOpacity className="w-full border border-[#4285F4] bg-[#246BFD] py-[18px] rounded-full my-4" onPress={handleSubmit}>
          <Text className="text-2xl font-outfit-medium text-center text-white">
            Registrarse
          </Text>
        </TouchableOpacity>
        
        <View className="w-full">
          <Text className="font-outfit-medium text-xl text-left">
            ¿Ya tienes cuenta?{" "}
            <Link href="/Propietario/signInP" className="font-outfit-bold">
              Inicia Sesión
            </Link>
          </Text>
        </View>
      </View>
      
      {showAlert && (
        <Animated.View style={{ opacity: alertOpacity }} className="absolute bottom-10 w-11/12 bg-[#C4C4C4] p-4 rounded-lg items-center justify-center">
          <Text className="text-black text-center">{alertMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}
