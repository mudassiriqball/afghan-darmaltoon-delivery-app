import React from 'react';
import { View, } from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from '../constants';
import FieldErrorText from './field-error-text';

const CustomTextField = (props) =>
    <View style={props.width == 'half' ? { width: '50%' } : { width: '100%' }}>
        <TextInput
            mode='outlined'
            style={{ marginTop: 10, borderRadius: 15 }}
            underlineColor={Constants.COLORS.MAIN}
            theme={{ colors: { primary: Constants.COLORS.MAIN, background: Constants.COLORS.WHITE } }}
            error={props.error}
            {...props}
        />
        {<FieldErrorText>
            {props.error}
        </FieldErrorText>}
    </View>

export default CustomTextField
