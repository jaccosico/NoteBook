import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { stylesheet, colors, showAlertMessage } from '../styles/globalStyles';
import NoteForm from './NoteForm';
import EditForm from './EditForm';
import Card from '../styles/Card';
import { uuid } from 'uuidv4';
import UUIDGenerator from 'react-native-uuid-generator';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const object = {
  key: '',
  subject: '',
  schedule: '',
  professor: '',
  topic: '',
  notes: '',
};
const isEmpty = (note) => {
  if (
    note.subject === object.subject &&
    note.schedule === object.schedule &&
    note.professor === object.professor &&
    note.topic === object.topic &&
    note.notes === object.notes
  )
    return true;
  else return false;
};

export default function Notes({ navigation }) {
  const [data, setData] = useState();
  const [noteAdd, setNoteAdd] = useState(false);
  const [noteEdit, setNoteEdit] = useState(false);
  const [noteList, setNoteList] = useState([]);

  const editHandler = ({ item }) => {
    setData(item);
    setNoteEdit(true);
  };
  const editNote = (note) => {
    if (isEmpty(note)) {
      setNoteEdit(false);
      deleteHandler(note.key);
      showAlertMessage('Nothing to save. Note discarded', 'default', 'bottom');
    } else {
      const NewList = noteList.map((item) => {
        if (item.key == note.key) {
          item.key == note.key
          item.subject = note.subject;
          item.schedule = note.schedule;
          item.professor = note.professor;
          item.topic = note.topic;
          item.notes = note.notes;
          return item;
        }
        return item;
      });
      setNoteList(NewList);
      setNoteEdit(false);
    }
  };

  const deleteHandler = (key) => {
    setNoteList((prevNoteList) => {
      return prevNoteList.filter((note) => note.key != key);
    });
  };
  const deleteAlert = ({ item }) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Delete',
          onPress: () => deleteHandler(item.key),
          style: 'destructive',
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: false }
    );
  };
  const longPressAlert = ({ item }) => {
    var message='';
    var title='';
    item.topic !== '' ? (title = item.topic) : (title = 'Untitled');
    item.subject !== '' ? (message += item.subject + '\n') : {};
    item.schedule !== '' ? (message += item.schedule + '\n') : {};
    item.professor !== '' ? (message += item.professor) : {};

    Alert.alert(
      title,
      message,
      [
        {
          text: 'Edit',
          onPress: () => editHandler({ item }),
          style: 'default',
        },
        {
          text: 'Delete',
          onPress: () => deleteAlert({ item }),
          style: 'destructive',
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: false }
    );
  };
  const discardChangesAlert = (modal) => {
    Alert.alert(
      'Discard Changes?',
      'Changes you made will not be saved.',
      [
        { text: 'Discard', onPress: () => modal(false), style: 'destructive' },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true }
    );
  };
  const addNote = (note) => {
    if (isEmpty(note)) {
      setNoteAdd(false);
      showAlertMessage('Nothing to save. Note discarded', 'default', 'bottom');
    } else {
      note.key = UUIDGenerator.getRandomUUID();
      setNoteList((prevNoteList) => {
        return [note, ...prevNoteList];
      });
      setNoteAdd(false);
    }
  };

  const emptyNotes = () => {
    if (noteList.length === 0) {
      return (
        <View
          style={{ alignItems: 'center', top: 225, justifyContent: 'center' }}>
          <Image
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
              opacity: 20,
            }}
            source={require('../assets/NoNotes.png')}
          />
          <Text style={{...styles.topic, color:colors.empty, marginTop: 5}}>No Notes</Text>
        </View>
      );
    }
  };

  return (
    <View style={stylesheet.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.primary}
      />
      <Modal
        visible={noteEdit}
        animationType="fade"
        statusBarTranslucent={false}
        onRequestClose={() => discardChangesAlert(setNoteEdit)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <EditForm
              editNote={editNote}
              item={data}
              discardChangesAlert={discardChangesAlert}
              setNoteEdit={setNoteEdit}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={noteAdd}
        animationType="fade"
        statusBarTranslucent={false}
        onRequestClose={() => discardChangesAlert(setNoteAdd)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <NoteForm
              addNote={addNote}
              discardChangesAlert={discardChangesAlert}
              setNoteAdd={setNoteAdd}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.list}>
      {emptyNotes()}
        <FlatList
          data={noteList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => longPressAlert({ item })}
              onPress={() => navigation.navigate('NoteDetails', item)}>
              <Card>
                {topicText(item)}
                {subjectText(item)}
                {scheduleText(item)}
                {professorText(item)}
                {notesText(item)}
                <TouchableOpacity
                  style={styles.goButton}
                  onPress={() => navigation.navigate('NoteDetails', item)}>
                  <View>
                    <SimpleLineIcons
                      name="arrow-right"
                      size={16}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlashMessage />
      <TouchableOpacity
        activeOpacity={0.7}
        style={stylesheet.addButton}
        onPress={() => setNoteAdd(true)}>
        <MaterialIcons name="add" size={30} color={colors.dark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
  goButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.secondary,
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderColor: colors.dark,
    borderWidth: 0.5,
  },
  list: {
    flex: 1,
    margin: 10,
  },
  topic: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.dark,
    marginBottom: 4,
  },
  textBold: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    textAlign: 'left',
    letterSpacing: 0.25,
    fontWeight: 'bold',
    marginRight: 4,
  },
  textBody: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    textAlign: 'left',
    letterSpacing: 0.25,
    width: '70%',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 1,
  },
});

const topicText = (item) => {
  if (item.topic !== '') {
    return <Text style={styles.topic}>{item.topic}</Text>;
  }
};

const subjectText = (item) => {
  if (item.subject !== '') {
    return (
      <View style={styles.line}>
        <Text style={styles.textBold}>Subject:</Text>
        <Text style={styles.textBody} numberOfLines={1}>
          {item.subject}
        </Text>
      </View>
    );
  }
};

const scheduleText = (item) => {
  if (item.schedule !== '') {
    return (
      <View style={styles.line}>
        <Text style={styles.textBold}>Schedule:</Text>
        <Text style={{ ...styles.textBody, textTransform: 'uppercase' }}>
          {item.schedule}
        </Text>
      </View>
    );
  }
};

const professorText = (item) => {
  if (item.professor !== '') {
    return (
      <View style={styles.line}>
        <Text style={styles.textBold}>Professor:</Text>
        <Text style={styles.textBody}>{item.professor}</Text>
      </View>
    );
  }
};

const notesText = (item) => {
  if (item.notes !== '') {
    return (
      <View style={styles.line}>
        <Text style={styles.textBold}>Notes:</Text>
        <Text style={styles.textBody} numberOfLines={1}>
          {item.notes}
        </Text>
      </View>
    );
  }
};
