import React, { useState } from 'react';
import {ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, FlatList, SafeAreaView} from 'react-native';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://192.168.0.230:8181';

const AuthScreen = () => {

    const [company, setCompany] = useState('');
    const [model, setModel] = useState('');
    const [id, setId] = useState(0);
    const [phones, setPhones] = useState([]);

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isAdd, setIsAdd] = useState(true);

    const onChangeHandler = () => {
        setIsAdd(!isAdd);
        setMessage('');
    };

    const editPhone = (company, model, id) => {
        setIsAdd(false);
        setMessage('');
        setCompany(company);
        setModel(model);
        setId(id);
    };

    const onSubmitHandler = () => {
        const payload = {
            company,
            model,
        };
        if(!isAdd) {
            payload.id = id;
        }
        fetch(`${API_URL}/${isAdd ? 'addPhone' : 'updatePhone'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => {
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    setIsError(false);
                    setMessage(jsonRes.message);
                    setPhones(jsonRes.phones);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    const Phone = ({ company, model, id}) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.company}>{'Company: ' + company}</Text>
                <Text style={styles.model}>{'Model: ' + model}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => editPhone(company, model, id)}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => editPhone(company, model, id)}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );


    const renderPhone = ({ item }) => (
        <Phone company={item.company} model={item.model} id={item.id}/>
    );

    return (
        <ImageBackground source={require('../public/images/app-background.jpg')} style={styles.image}
                         imageStyle={{ opacity: 0.7}}>
            <View style={styles.card}>
                <Text style={styles.heading}>{isAdd ? 'Add Phone' : 'Update Phone'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} value={company} placeholder="Company" onChangeText={setCompany}></TextInput>
                        <TextInput style={styles.input} value={model} placeholder="Model" onChangeText={setModel}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        {/*<TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>*/}
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>{isAdd ? 'Add Phone' : 'Update Phone'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={phones}
                    renderItem={renderPhone}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255,210,108,0.4)',
        width: '80%',
        marginTop: '7%',
        borderRadius: 20,
        maxHeight: 250,
        paddingBottom: '5%',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '5%',
        marginBottom: '5%',
        color: 'black',
        textAlign: 'center'
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        width: '25%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    container: {
        flex: 1,
        marginTop: 40,
        width: '100%'
    },
    item: {
        backgroundColor: '#b5d5b6',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
    },
});

export default AuthScreen;
