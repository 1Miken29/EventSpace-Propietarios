import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { useState, useEffect } from "react";

export default function registerP1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
  });

  const [errors, setErrors] = useState({});
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

  const validateName = (name) => {
    const nameRegex = /^[A-Za-zÁ-ÿ\s]{1,40}$/;
    return nameRegex.test(name);
  };

  const filterOnlyLetters = (text) => {
    return text.replace(/[^A-Za-zÁ-ÿ\s]/g, '');
  };

  const handleNameChange = (text, field) => {
    const filteredText = filterOnlyLetters(text);
    setFormData({ ...formData, [field]: filteredText });

    if (filteredText.length > 0 && !validateName(filteredText)) {
      setErrors({ ...errors, [field]: 'Solo se permiten letras' });
    } else {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate.split('/').reverse().join('-'));
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const validateDate = (date) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    return dateRegex.test(date);
  };

  const handleDateChange = (text) => {
    const filteredText = text.replace(/[^0-9/]/g, '');
    setFormData({ ...formData, fechaNacimiento: filteredText });
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!validateName(formData.nombre)) {
      newErrors.nombre = 'Por favor ingrese un nombre';
    }
    if (!validateName(formData.apellidoPaterno)) {
      newErrors.apellidoPaterno = 'Por favor ingrese un apellido paterno';
    }
    if (!validateName(formData.apellidoMaterno)) {
      newErrors.apellidoMaterno = 'Por favor ingrese un apellido materno';
    }
    if (!validateDate(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Por favor ingrese una fecha válida';
    } else if (!validateAge(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Debe ser mayor de edad';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push("/Propietario/registerP2");
    } else {
      const errorMessages = Object.values(newErrors).join('\n');
      setAlertMessage(errorMessages);
      setShowAlert(true);
    }
  };

  return (
    <View className="bg-[#C3B6E3] w-full h-full items-center justify-center">
      <View className="bg-white rounded-[33px] w-96 px-4 items-center py-10">
        <View className="flex flex-row items-center w-80">
          <Image source={require("../../assets/images/Logo.png")} />
          <Text className="pl-2 font-outfit-bold text-2xl leading-tight">
            EventSpace
          </Text>
          <Text className="font-outfit-light text-xl md:text-lg lg:text">{" "} | Propietarios</Text>
        </View>
        <Text className="font-outfit text-xl my-10">Crea tu usuario</Text>
        <TextInput
        
          className={`h-14 w-full border ${errors.nombre ? 'border-red-500 text-#EA435' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl ${formData.nombre ? 'text-black' : 'text-[#C4C4C4]'}`}
          placeholder="Nombre(s)*"
          placeholderTextColor="#C4C4C4"
          value={formData.nombre}
          onChangeText={(text) => handleNameChange(text, 'nombre')}
          underlineColorAndroid="transparent"
        />

        <View className="flex flex-row my-2 space-x-2">
          <View className="flex-1">
            <TextInput
              className={`h-14 w-full border ${errors.apellidoPaterno ? 'border-red-500 text-[#EA435]' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl ${formData.apellidoPaterno ? 'text-black' : 'text-[#C4C4C4]'}`}
              placeholder="Apellido Paterno*"
              placeholderTextColor="#C4C4C4"
              value={formData.apellidoPaterno}
              onChangeText={(text) => handleNameChange(text, 'apellidoPaterno')}
              underlineColorAndroid="transparent"
            />
          </View>
          <View className="flex-1">
            <TextInput
              className={`h-14 w-full border ${errors.apellidoMaterno ? 'border-red-500 text-[#EA435]' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl ${formData.apellidoMaterno ? 'text-black' : 'text-[#C4C4C4]'}`}
              placeholder="Apellido Materno*"
              placeholderTextColor="#C4C4C4"
              value={formData.apellidoMaterno}
              onChangeText={(text) => handleNameChange(text, 'apellidoMaterno')}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <TextInput
          className={`h-14 w-full border ${errors.fechaNacimiento ? 'border-red-500 text-[#EA435]' : 'border-[#C4C4C4]'} rounded-xl p-3 font-outfit text-xl ${formData.fechaNacimiento ? 'text-black' : 'text-[#C4C4C4]'}`}
          placeholder="Fecha de Nacimiento (DD/MM/AAAA)*"
          placeholderTextColor="#C4C4C4"
          value={formData.fechaNacimiento}
          onChangeText={handleDateChange}
          underlineColorAndroid="transparent"
        />

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