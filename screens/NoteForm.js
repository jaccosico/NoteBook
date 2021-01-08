import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { stylesheet, colors } from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

export default function NoteForm({ addNote, discardChangesAlert, setNoteAdd }) {
  return (
    <ScrollView style={styles.content}>
      <Formik
        initialValues={{
          key: '',
          subject: '',
          schedule: '',
          professor: '',
          topic: '',
          notes: '',
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 5000);
          actions.resetForm();
          addNote(values);
        }}>
        {(props) => (
          <View>
          
            <View style={styles.modalHeader}>
              <MaterialIcons
                style={{ marginLeft: 10 }}
                name="arrow-back"
                size={24}
                color={colors.dark}
                onPress={() => discardChangesAlert(setNoteAdd)}
              />
              <Text style={stylesheet.headerText}>
                Create Note
              </Text>
              {props.isSubmitting ? (
                <ActivityIndicator size="small" color={colors.dark} />
              ) : (
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={props.handleSubmit}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.textInputContainer}>
              <MaterialIcons
                name="bookmark"
                size={24}
                color={colors.dark}
                style={styles.icon}
              />
              <TextInput
                style={styles.noteTitle}
                placeholder="Subject"
                autoCapitalize="sentences"
                onChangeText={props.handleChange('subject')}
                onBlur={props.handleBlur('subject')}
                value={props.values.subject}
                returnKeyType="next"
                onSubmitEditing={() => this.second.focus()}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.textInputContainer}>
              <MaterialIcons
                name="schedule"
                size={24}
                color={colors.dark}
                style={styles.icon}
              />
              <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="Schedule (eg. MON - 07:00 AM)"
                autoCapitalize="sentences"
                onChangeText={props.handleChange('schedule')}
                value={props.values.schedule}
                ref={(ref) => (this.second = ref)}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.textInputContainer}>
              <MaterialIcons
                name="account-circle"
                size={24}
                color={colors.dark}
                style={styles.icon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Professor"
                autoCapitalize="words"
                onChangeText={props.handleChange('professor')}
                value={props.values.professor}
                ref={(ref) => (this.third = ref)}
                returnKeyType="next"
                onSubmitEditing={() => this.fourth.focus()}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.noteTitleContainer}>
              <MaterialIcons
                name="subject"
                size={24}
                color={colors.dark}
                style={styles.icon}
              />
              <TextInput
                style={styles.noteTitle}
                maxLength={50}
                placeholder={'Lesson / Topic'}
                autoCapitalize="sentences"
                onChangeText={props.handleChange('topic')}
                value={props.values.topic}
                ref={(ref) => (this.fourth = ref)}
                returnKeyType="next"
                onSubmitEditing={() => this.fifth.focus()}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.noteParagraphContainer}>
              <TextInput
                style={styles.noteParagraph}
                multiline={true}
                placeholder={'Write notes here...'}
                autoCapitalize="sentences"
                onChangeText={props.handleChange('notes')}
                value={props.values.notes}
                ref={(ref) => (this.fifth = ref)}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 15,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  textInput: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    flex: 1,
    padding: 10,
    marginRight: 10,
  },
  noteTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  noteTitle: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  noteParagraph: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    textAlignVertical: 'top',
    paddingBottom: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  noteParagraphContainer: {
    flex: 1,
    paddingBottom: 15,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 45,
    marginRight: 10,
  },
  button: {
    width: 70,
    borderRadius: 8,
    padding: 5,
    backgroundColor: colors.dark,
  },
  buttonText: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.white,
  },
  modalHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingTop: Platform.OS == 'ios' ? 30 : 15,
    paddingBottom: 10,
  },
});
