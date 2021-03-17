import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, StatusBar, Image, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios'
import { saveTokenToStorage } from "../../utils/services/auth";
import CustomButton from "../../components/custom-button";
import * as Linking from 'expo-linking';

import PhoneInput from "react-native-phone-number-input";
import FieldErrorText from "../../components/field-error-text";
import constants from "../../constants";
import urls from "../../utils/urls";
import { TextInput } from "react-native-paper";
import CustomTextField from "../../components/custom-text-field";

const FormValidationSchema = yup.object().shape({
    mobile: yup.string().required('Required *'),
    password: yup.string().required('Required *')
        .min(8, 'Must have at least 8 characters')
        .max(20, 'Can\'t be longer than 20 characters'),
});

export default function Login(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [mobileError, setMobileError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const login = async (values, setSubmitting) => {
        if (!phoneInput.current?.isValidNumber(formattedValue)) {
            setMobileError('Invalid Mobile Number');
            return;
        }
        setSubmitting(true);
        setMobileError('')
        setGeneralError('')
        let data = {}
        data = {
            mobile: formattedValue,
            password: values.password
        }
        await axios.post(urls.POST_REQUEST.LOGIN, data).then((res) => {
            saveTokenToStorage(res.data.token);
            setSubmitting(false);
            props.reloadUser();
            props.navigation.navigate('Root', { screen: 'Home' });
        }).catch((err) => {
            setSubmitting(false);
            setGeneralError('Invalid Mobile or Password!')
        })
    }

    const phoneInput = useRef();
    const [formattedValue, setFormattedValue] = useState("");
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Formik
                initialValues={{ mobile: "", password: "" }}
                validationSchema={FormValidationSchema}
                onSubmit={(values, { setSubmitting }) => login(values, setSubmitting)}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    handleBlur,
                    setSubmitting,
                    isSubmitting
                }) => {
                    return (
                        <View>
                            <Image style={{ alignSelf: 'center', margin: 20, width: 150, height: 150, borderRadius: 75, padding: 5, borderColor: constants.COLORS.MAIN, borderWidth: 1 }} source={require('../../assets/icon.png')} />
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={values.mobile}
                                value={values.mobile}
                                defaultCode="PK"
                                layout="first"
                                onChangeText={handleChange("mobile")}
                                onChangeFormattedText={(text) => {
                                    setFormattedValue(text)
                                    setGeneralError('')
                                    setMobileError('')
                                }}
                                withDarkTheme
                                withShadow
                                autoFocus
                                containerStyle={{ width: '100%' }}
                            />
                            {mobileError !== '' && <FieldErrorText>{mobileError}</FieldErrorText>}
                            <CustomTextField
                                label={'Password'}
                                secureTextEntry={showPassword ? false : true}
                                value={values.password}
                                onChangeText={handleChange("password")}
                                textContentType='password'
                                error={touched.password && errors.password}
                                onBlur={handleBlur("password")}
                                left={<TextInput.Icon name='lock' color={constants.COLORS.MAIN} color={constants.COLORS.MAIN} />}
                                right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} color={constants.COLORS.MAIN} color={constants.COLORS.MAIN} onPress={() => setShowPassword(!showPassword)} />}
                            />
                            <View style={styles.forgot_password}>
                                <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://afghandarmaltoon.herokuapp.com/forgot-password')} > {'Forgot Password?'} </Text>
                            </View>
                            {generalError !== '' && <FieldErrorText>{generalError}</FieldErrorText>}
                            <CustomButton
                                onPress={handleSubmit}
                                loading={isSubmitting}
                                title={'Login'}
                                block
                            />
                        </View>
                    );
                }}
            </Formik>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: constants.SIZES.BASE * 2,
        backgroundColor: constants.COLORS.WHITE,
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 30,
        color: constants.COLORS.BLACK,
        marginBottom: 10,
        marginTop: -50,
        fontWeight: "700",
    },
    forgot_password: {
        marginTop: 2,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    signup: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});