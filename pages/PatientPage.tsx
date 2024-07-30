import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
      const response = await axios.get('http://10.100.0.75:3000/GuardMeAPI/patients/1');
      setPatientData(response.data);
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };
  

  const handleCancel = () => {
    setEditing(false);
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {!editing ? (
          <View style={styles.centeredContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Patient Information:</Text>
              <Text>Name: {patientData.first_name} {patientData.last_name}</Text>
              <Text>Birth date: {patientData.birth_date}</Text>
              <Text>Gender: {patientData.gender}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Contact Information:</Text>
              <Text>Name: {patientData.contacts[0].first_name} {patientData.contacts[0].last_name}</Text>
              <Text>Phone: {patientData.contacts[0].phone_num}</Text>
              <Text>Email: {patientData.contacts[0].email}</Text>
            </View>
            <TouchableOpacity style={styles.buttonBottom} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edit information</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editContainer}>
            <Text style={styles.sectionTitle}>Edit Information:</Text>
            <View style={styles.infoCard}>
              <Text style={styles.sectionSubtitle}>Patient information:</Text>
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Put name here"
                value={formData.firstName}
                onChangeText={text => setFormData({ ...formData, firstName: text })}
              />
              <Text>Birth date</Text>
              <TextInput
                style={styles.input}
                placeholder="Put birth date here"
                value={formData.birthDate}
                onChangeText={text => setFormData({ ...formData, birthDate: text })}
              />
              <Text>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Put gender here"
                value={formData.gender}
                onChangeText={text => setFormData({ ...formData, gender: text })}
              />
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.sectionSubtitle}>Contact information:</Text>
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Put name here"
                value={formData.contactFirstName}
                onChangeText={text => setFormData({ ...formData, contactFirstName: text })}
              />
              <Text>Phone number</Text>
              <TextInput
                style={styles.input}
                placeholder="Put phone number here"
                value={formData.contactPhoneNum}
                onChangeText={text => setFormData({ ...formData, contactPhoneNum: text })}
              />
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Put email here"
                value={formData.contactEmail}
                onChangeText={text => setFormData({ ...formData, contactEmail: text })}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 24,
    marginVertical: 8,
    borderRadius: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 18,
  },
  sectionSubtitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  buttonCancel: {
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 8,
    
    alignItems: 'center',
    flex: 1,

  },
  buttonBottom: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    bottom: -10,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PatientPage;