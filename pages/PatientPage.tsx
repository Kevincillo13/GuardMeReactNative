import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PatientPage = () => {
  const [patientData, setPatientData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    contactFirstName: '',
    contactLastName: '',
    contactPhoneNum: '',
    contactEmail: ''
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('http://192.168.100.52:3000/GuardMeAPI/patients/1'); // Cambia el ID del paciente según corresponda
        setPatientData(response.data);
        setFormData({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          gender: response.data.gender,
          birthDate: response.data.birth_date,
          contactFirstName: response.data.contacts[0].first_name,
          contactLastName: response.data.contacts[0].last_name,
          contactPhoneNum: response.data.contacts[0].phone_num,
          contactEmail: response.data.contacts[0].email
        });
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://192.168.100.52:3000/GuardMeAPI/patients/${patientData.id_patient}`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        birth_date: formData.birthDate,
        contacts: [
          {
            first_name: formData.contactFirstName,
            last_name: formData.contactLastName,
            phone_num: formData.contactPhoneNum,
            email: formData.contactEmail
          }
        ]
      });
      setEditing(false);
      // Vuelve a cargar los datos del paciente
      const response = await axios.get('http://192.168.100.52:3000/GuardMeAPI/patients/1');
      setPatientData(response.data);
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  if (!patientData) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {!editing ? (
        <View>
          <View style={{ marginBottom: 16 }}>
            <Text>Patient Information:</Text>
            <Text>Name: {patientData.first_name} {patientData.last_name}</Text>
            <Text>Birth date: {patientData.birth_date}</Text>
            <Text>Gender: {patientData.gender}</Text>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text>Contact Information:</Text>
            <Text>Name: {patientData.contacts[0].first_name} {patientData.contacts[0].last_name}</Text>
            <Text>Phone: {patientData.contacts[0].phone_num}</Text>
            <Text>Email: {patientData.contacts[0].email}</Text>
          </View>
          <Button title="Edit information" onPress={handleEdit} />
        </View>
      ) : (
        <View>
          <Text>Edit Information:</Text>
          <TextInput placeholder="Patient First Name" value={formData.firstName} onChangeText={text => setFormData({ ...formData, firstName: text })} />
          <TextInput placeholder="Patient Last Name" value={formData.lastName} onChangeText={text => setFormData({ ...formData, lastName: text })} />
          <TextInput placeholder="Gender" value={formData.gender} onChangeText={text => setFormData({ ...formData, gender: text })} />
          <TextInput placeholder="Birth Date" value={formData.birthDate} onChangeText={text => setFormData({ ...formData, birthDate: text })} />
          <TextInput placeholder="Contact First Name" value={formData.contactFirstName} onChangeText={text => setFormData({ ...formData, contactFirstName: text })} />
          <TextInput placeholder="Contact Last Name" value={formData.contactLastName} onChangeText={text => setFormData({ ...formData, contactLastName: text })} />
          <TextInput placeholder="Contact Phone Number" value={formData.contactPhoneNum} onChangeText={text => setFormData({ ...formData, contactPhoneNum: text })} />
          <TextInput placeholder="Contact Email" value={formData.contactEmail} onChangeText={text => setFormData({ ...formData, contactEmail: text })} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PatientPage;
