import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.64:3000/GuardMeAPI';

// Datos de ejemplo
const examplePatients = [
  {
    id_patient: 1,
    first_name: 'Brayan',
    last_name: 'Chavez',
    gender: 'Male',
    birth_date: 'June/3th/2011',
    contacts: [
      {
        first_name: 'Rocio',
        last_name: 'Rodríguez',
        phone_num: '6141826535',
        email: 'roxxio28@gmail.com'
      }
    ]
  },
  {
    id_patient: 2,
    first_name: 'Maria',
    last_name: 'Garcia',
    gender: 'Female',
    birth_date: 'April/21th/1990',
    contacts: [
      {
        first_name: 'Juan',
        last_name: 'Garcia',
        phone_num: '6123456789',
        email: 'juan.garcia@example.com'
      }
    ]
  },
  {
    id_patient: 3,
    first_name: 'Carlos',
    last_name: 'Sanchez',
    gender: 'Male',
    birth_date: 'November/10th/1985',
    contacts: [
      {
        first_name: 'Ana',
        last_name: 'Sanchez',
        phone_num: '6198765432',
        email: 'ana.sanchez@example.com'
      }
    ]
  }
];

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Aquí se usarán los datos de ejemplo en lugar de la API
        // const response = await axios.get(`${API_BASE_URL}/patients`);
        // setPatients(response.data);
        setPatients(examplePatients); // Usar datos de ejemplo
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Error fetching patients: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => onSelectPatient(item)}>
      <Text style={styles.title}>{item.first_name} {item.last_name}</Text>
      <Text>Birth date: {item.birth_date}</Text>
      <Text>Gender: {item.gender}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={patients}
      renderItem={renderItem}
      keyExtractor={(item) => item.id_patient.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const PatientDetails = ({ patient }) => {
  const [formData, setFormData] = useState({
    firstName: patient.first_name,
    lastName: patient.last_name,
    gender: patient.gender,
    birthDate: patient.birth_date,
    contactFirstName: patient.contacts[0]?.first_name || '',
    contactLastName: patient.contacts[0]?.last_name || '',
    contactPhoneNum: patient.contacts[0]?.phone_num || '',
    contactEmail: patient.contacts[0]?.email || ''
  });
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${API_BASE_URL}/patients/${patient.id_patient}`, {
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
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {!editing ? (
          <View>
            <View style={styles.card}>
              <Text style={styles.title}>Patient Information:</Text>
              <Text>Name: {patient.first_name} {patient.last_name}</Text>
              <Text>Birth date: {patient.birth_date}</Text>
              <Text>Gender: {patient.gender}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.title}>Contact Information:</Text>
              <Text>Name: {patient.contacts[0]?.first_name} {patient.contacts[0]?.last_name}</Text>
              <Text>Phone: {patient.contacts[0]?.phone_num}</Text>
              <Text>Email: {patient.contacts[0]?.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Edit information</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.title}>Edit Information:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Patient First Name" 
              value={formData.firstName} 
              onChangeText={text => setFormData({ ...formData, firstName: text })} 
            />
            <TextInput 
              style={styles.input}
              placeholder="Patient Last Name" 
              value={formData.lastName} 
              onChangeText={text => setFormData({ ...formData, lastName: text })} 
            />
            <TextInput 
              style={styles.input}
              placeholder="Gender" 
              value={formData.gender} 
              onChangeText={text => setFormData({ ...formData, gender: text })} 
            />
            <TextInput 
              style={styles.input}
              placeholder="Birth Date" 
              value={formData.birthDate} 
              onChangeText={text => setFormData({ ...formData, birthDate: text })} 
            />
            <TextInput 
              style={styles.input}
              placeholder="Contact First Name" 
              value={formData.contactFirstName} 
              onChangeText={text => setFormData({ ...formData, contactFirstName: text })} 
            />
            <TextInput 
              style={styles.input}
              placeholder="Contact Last Name" 
              value={formData.contactLastName} 
              onChangeText={text => setFormData({ ...formData, contactLastName: text })} 
            />
            <TextInput 
              style={styles.input}
              placeholder="Contact Phone Number" 
              value={formData.contactPhoneNum} 
              onChangeText={text => setFormData({ ...formData, contactPhoneNum: text })} 
            />
            <TextInput 
              style={styles.input}
              placeholder="Contact Email" 
              value={formData.contactEmail} 
              onChangeText={text => setFormData({ ...formData, contactEmail: text })} 
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const PatientPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      {selectedPatient ? (
        <PatientDetails patient={selectedPatient} />
      ) : (
        <PatientList onSelectPatient={setSelectedPatient} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PatientPage;