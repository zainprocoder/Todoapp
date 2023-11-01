import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { globalStyles } from '../styles/global';
import { Formik } from "formik";
import * as Yup from "yup";
import FlatButton from "../shared/button";

const reviewSchema = Yup.object({
    title:Yup.string().required().min(4),
    body: Yup.string().required().min(10),
    rating: Yup.string().required().test('is-num-1-5', 'rating must be a number 1-5', (val) => {
        return parseInt(val) < 6 && parseInt(val) > 0;
    })
})

export default function ReviewForm({addReview}) {
    return(
        <View style={globalStyles.container}>
            <Formik initialValues={{title: '', body: '', rating: ''}}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReview(values);
                    // console.log(values);
            }}
            >
                {(props) => (
                    <View>
                        <TextInput
                        style={globalStyles.input}
                        placeholder="Review Title"
                        onChangeText={props.handleChange('title')}
                        value={props.values.title}
                        onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>
                        <TextInput
                        multiline
                        style={globalStyles.input}
                        placeholder="Review Body"
                        onChangeText={props.handleChange('body')}
                        value={props.values.body}
                        onBlur={props.handleBlur('body')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.body && props.errors.body}</Text>
                        <TextInput
                        style={globalStyles.input}
                        placeholder="Rating (1-5)"
                        onChangeText={props.handleChange('rating')}
                        value={props.values.rating}
                        keyboardType="numeric"
                        onBlur={props.handleBlur('rating')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.rating && props.errors.rating}</Text>
                        <FlatButton onPress={props.handleSubmit} text='submit' />
                    </View>
                )}
            </Formik>
        </View>
    )
}