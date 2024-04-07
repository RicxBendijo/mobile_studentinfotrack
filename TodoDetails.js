import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from './Colors';

export default function TodoModal(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedListName, setEditedListName] = useState(props.list.name);
    const list = props.list;

    const startEditing = () => {
        setIsEditing(true);
    };

    const endEditing = () => {
        setIsEditing(false);
        // Update the list name if edited
        props.list.name = editedListName;
    };

    const renderListTitle = () => {
        if (isEditing) {
            return (
                <TextInput
                    style={[styles.titleInput, { borderBottomColor: list.color }]}
                    value={editedListName}
                    onChangeText={setEditedListName}
                    onBlur={endEditing}
                    autoFocus={true}
                />
            );
        } else {
            return (
                <TouchableOpacity onPress={startEditing}>
                    <Text style={styles.title}>{list.name}</Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                    onPress={props.closeModal}
                >
                    <AntDesign name="close" size={24} color={Colors.black} />
                </TouchableOpacity>

                <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                    {renderListTitle()}
                    <Text style={styles.taskCount}>{list.todos.length} students</Text>
                </View>

                
                
                
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.black,
    },
    titleInput: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.black,
        borderBottomWidth: 3,
    },
    taskCount: {
        fontWeight: '600',
        color: Colors.gray,
        marginTop: 4,
        marginBottom: 16,
    },
    
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },

    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
    },

    todo: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: 16,
    },
});
