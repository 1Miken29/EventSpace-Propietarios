import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserDataForm = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    maternalLastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    maternalLastName: '',
    email: '',
    phone: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [originalData, setOriginalData] = useState(userData);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);

  const validateName = (name) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name); // Solo letras y espacios
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Validación estándar de correo
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone); // Solo números, longitud de 10 dígitos

  const handleChange = (name, value) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Validaciones
    let error = '';
    if (name === 'firstName' || name === 'lastName' || name === 'maternalLastName') {
      if (!validateName(value)) {
        error = 'Solo se permiten letras y espacios.';
      }
    } else if (name === 'email') {
      if (!validateEmail(value)) {
        error = 'Correo no válido.';
      }
    } else if (name === 'phone') {
      if (!validatePhone(value)) {
        error = 'El teléfono debe tener 10 dígitos.';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const filterNameInput = (text) => text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Eliminar caracteres no permitidos
  const filterPhoneInput = (text) => text.replace(/[^0-9]/g, ''); // Eliminar todo excepto números

  const handleEdit = () => {
    if (isEditing) {
      // Si está editando y presiona cancelar
      setUserData(originalData); // Restaura los datos originales
      setIsEditing(false);
      setActiveButton(null);
    } else {
      // Si va a comenzar a editar
      setOriginalData(userData); // Guarda los datos originales
      setIsEditing(true);
      setActiveButton('edit');
    }
  };

  const validateAllFields = () => {
    const hasEmptyFields = Object.values(userData).some(value => value === '');
    if (hasEmptyFields) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }

    const hasValidationErrors = Object.values(errors).some(error => error !== '');
    if (hasValidationErrors) {
      Alert.alert('Error', 'Por favor corrige los errores antes de guardar');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateAllFields()) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000); 
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmSave = () => {
    setOriginalData(userData);
    setIsEditing(false);
    setActiveButton(null);
    setShowConfirmDialog(false);
    navigation.navigate('succes'); 
  };

  return (
    <View className="flex-1 p-5 bg-[#8B5DFF1A] items-center justify-center">
      <Text className="text-3xl font-outfit text-[#191D31] mb-5 text-left w-full">
        Datos del Usuario
      </Text>

      <View className="bg-[#8B5DFF24] rounded-[33px] w-[95%] p-3">
        {/* Nombre */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Nombre(s)
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="h-10 border border-[#C4C4C4] rounded bg-white w-11/12 self-center px-2"
                placeholder="Nombre(s)"
                placeholderTextColor="#C4C4C4"
                value={userData.firstName}
                onChangeText={(text) => handleChange('firstName', filterNameInput(text))}
                style={{
                  color: userData.firstName ? '#000000' : '#C4C4C4'
                }}
              />
              {errors.firstName ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.firstName}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.firstName || 'Nombre(s)'}</Text>
            </View>
          )}
        </View>

        {/* Apellido Paterno */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Apellido Paterno
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="h-10 border border-[#C4C4C4] rounded bg-white w-11/12 self-center px-2"
                placeholder="Apellido Paterno"
                placeholderTextColor="#C4C4C4"
                value={userData.lastName}
                onChangeText={(text) => handleChange('lastName', filterNameInput(text))}
                style={{
                  color: userData.lastName ? '#000000' : '#C4C4C4'
                }}
              />
              {errors.lastName ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.lastName}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.lastName || 'Apellido Paterno'}</Text>
            </View>
          )}
        </View>

        {/* Apellido Materno */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Apellido Materno
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="h-10 border border-[#C4C4C4] rounded bg-white w-11/12 self-center px-2"
                placeholder="Apellido Materno"
                placeholderTextColor="#C4C4C4"
                value={userData.maternalLastName}
                onChangeText={(text) => handleChange('maternalLastName', filterNameInput(text))}
                style={{
                  color: userData.maternalLastName ? '#000000' : '#C4C4C4'
                }}
              />
              {errors.maternalLastName ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.maternalLastName}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.maternalLastName || 'Apellido Materno'}</Text>
            </View>
          )}
        </View>

        {/* Correo Electrónico */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Correo Electrónico
          </Text>
          {isEditing ? (
            <TextInput
              className="h-10 border border-[#C4C4C4] rounded bg-white w-11/12 self-center px-2"
              placeholder="Correo Electrónico"
              placeholderTextColor="#C4C4C4"
              underlineColorAndroid="transparent"
              value={userData.email}
              onChangeText={(text) => handleChange('email', text)}
              style={{
                color: userData.email ? '#000000' : '#C4C4C4'
              }}
              keyboardType="email-address"
            />
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.email || 'Correo Electrónico'}</Text>
            </View>
          )}
        </View>

        {/* Teléfono */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Teléfono
          </Text>
          {isEditing ? (
            <>
              <TextInput
                className="h-10 border border-[#C4C4C4] rounded bg-white w-11/12 self-center px-2"
                placeholder="Teléfono"
                placeholderTextColor="#C4C4C4"
                value={userData.phone}
                onChangeText={(text) => handleChange('phone', filterPhoneInput(text))}
                style={{
                  color: userData.phone ? '#000000' : '#C4C4C4'
                }}
                keyboardType="phone-pad"
              />
              {errors.phone ? (
                <Text className="text-red-500 text-xs self-start pl-3">{errors.phone}</Text>
              ) : null}
            </>
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.phone || 'Teléfono'}</Text>
            </View>
          )}
        </View>

        {/* Contraseña */}
        <View className="w-full items-center mb-3">
          <Text className="text-sm font-outfit-medium text-[#8B5DFF] mb-2 self-start pl-3">
            Contraseña
          </Text>
          {isEditingPassword ? (
            <TextInput
              className="h-10 border border-[#C4C4C4] rounded bg-white w-11/12 self-center px-2"
              placeholder="Contraseña"
              placeholderTextColor="#C4C4C4"
              value={userData.password}
              
              onChangeText={(text) => handleChange('password', text)}
              style={{
                color: userData.password ? '#000000' : '#C4C4C4'
              }}
              secureTextEntry
            />
          ) : (
            <View className="p-3 border border-[#C4C4C4] rounded bg-[#f9f9f9] w-11/12 self-center">
              <Text>{userData.password ? userData.password.replace(/./g, '•') : 'Contraseña'}</Text>
            </View>
          )}
        </View>

        {/* Botones */}
        <View className="flex-row justify-between mt-5">
          <TouchableOpacity
            className={`p-3 rounded-full w-[49%] items-center border border-[#8B5DFF] ${
              isEditing ? 'bg-[#8B5DFFB0]' : 'bg-[#8B5DFF4D]'
            }`}
            onPress={handleEdit}
          >
            <Text className="text-white font-outfit-light text-center">
              {isEditing ? 'Cancelar' : 'Editar Datos del Usuario'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-3 rounded-full w-[49%] items-center border border-[#8B5DFF] ${
              (isEditing || activeButton === 'password') ? 'bg-[#8B5DFFB0]' : 'bg-[#8B5DFF4D]'
            }`}
            onPress={isEditing ? handleSave : () => {
              setActiveButton('password');
              navigation.navigate('change');
            }}
            disabled={isEditing && Object.values(errors).some(error => error !== '')}
          >
            <Text className="text-white font-outfit-light text-center">
              {isEditing ? 'Guardar' : 'Editar Contraseña'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showErrorAlert && (
        <View className="absolute bottom-20 w-11/12 bg-[#00000066] p-4 rounded-full mx-4">
          <Text className="text-white font-outfit-medium text-center">
            No se han podido actualizar los datos
          </Text>
        </View>
      )}

      {showConfirmDialog && (
        <View className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <View className="bg-white p-6 rounded-[30px] w-[80%] m-4">
            <Text className="text-lg text-center text-[#191D31] mb-4 font-outfit">
              ¿Estás seguro de continuar con la edición?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-[#8B5DFF4D] p-3 rounded-full flex-1 mr-2 border border-[#8B5DFF]"
                onPress={() => setShowConfirmDialog(false)}
              >
                <Text className="text-[#666876] font-outfit text-center">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#8B5DFFB0] p-3 rounded-full flex-1 ml-2 border border-[#8B5DFF]"
                onPress={confirmSave}
              >
                <Text className="text-white font-outfit text-center">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

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

export default UserDataForm;