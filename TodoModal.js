import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from './Colors';

export default class TodoModal extends React.Component {
    state = {
        newTodo: '',
        editedListName: this.props.list.name,
        isEditingListName: false,
        editedTodoIndex: -1,
        editedTodoTitle: '',
    };

    deleteTodo = (index) => {
        const updatedTodos = this.props.list.todos.filter((todo, todoIndex) => index !== todoIndex);
        const updatedList = { ...this.props.list, todos: updatedTodos };
        this.props.updateList(updatedList);
    };

    addTodo = () => {
        const { newTodo } = this.state;
        if (newTodo.trim() !== '') {
            let list = this.props.list;
            list.todos.push({ title: newTodo, completed: false });
            this.props.updateList(list);
            this.setState({ newTodo: '' });
            Keyboard.dismiss();
        }
    };

//
    renderTodo = (todo, index) => {
        const { editedTodoIndex, editedTodoTitle } = this.state;

        return (
            <View style={styles.todoContainer}>
                {editedTodoIndex === index ? (
                    <TextInput
                        style={styles.editTodoInput}
                        value={editedTodoTitle}
                        onChangeText={(text) => this.setState({ editedTodoTitle: text })}
                        onBlur={() => this.endEditingTodoTitle(index)}
                        autoFocus={true}
                    />
                ) : (
                    <Text
                        style={[
                            styles.todo,
                            {
                                color: todo.completed ? Colors.gray : Colors.black,
                            },
                        ]}
                        onPress={() => this.startEditingTodoTitle(index, todo.title)}
                    >
                        {todo.title}
                    </Text>
                )}
                <View style={styles.iconContainer}>
                    {/* mao ni ang edit icon pero wala pa syay functionality */}
                    <AntDesign name="edit" size={24} color={Colors.gray} />
                    <TouchableOpacity onPress={() => this.deleteTodo(index)} style={styles.deleteIcon}>
                        <AntDesign name="delete" size={24} color={Colors.gray} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    //

    
    
    
    
    startEditingTodoTitle = (index, title) => {
        this.setState({ editedTodoIndex: index, editedTodoTitle: title });
    };

    endEditingTodoTitle = (index) => {
        const { editedTodoTitle } = this.state;
        const { list, updateList } = this.props;
        const updatedList = { ...list, todos: list.todos.map((todo, i) => (i === index ? { ...todo, title: editedTodoTitle } : todo)) };
        updateList(updatedList);
        this.setState({ editedTodoIndex: -1, editedTodoTitle: '' });
    };

    startEditingListName = () => {
        this.setState({ isEditingListName: true, editedListName: this.props.list.name });
    };

    endEditingListName = () => {
        const { editedListName } = this.state;
        const { list, updateList } = this.props;
        const updatedList = { ...list, name: editedListName };
        updateList(updatedList);
        this.setState({ isEditingListName: false });
    };

    render() {
        const { list } = this.props;
        const { editedListName, isEditingListName } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name="close" size={24} color={Colors.black} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        {isEditingListName ? (
                            <TextInput
                                style={styles.titleInput}
                                value={editedListName}
                                onChangeText={(text) => this.setState({ editedListName: text })}
                                onBlur={this.endEditingListName}
                                autoFocus={true}
                            />
                        ) : (
                            <TouchableOpacity onPress={this.startEditingListName}>
                                <Text style={styles.title}>{list.name}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={styles.taskCount}>{list.todos.length} students</Text>
                    </View>

                    <View style={[styles.section, { flex: 4 }]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({ item, index }) => this.renderTodo(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingHorizontal: 28, paddingVertical: 54 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]}>
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={(text) => this.setState({ newTodo: text })}
                            value={this.state.newTodo}
                            placeholder="Add a new student"
                        />
                        <TouchableOpacity
                            style={[styles.addTodo, { backgroundColor: list.color }]}
                            onPress={this.addTodo}
                        >
                            <AntDesign name="plus" size={16} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
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
        marginLeft: 24,
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
    editTodoInput: {
        borderBottomWidth: 1,
        borderColor: Colors.black,
        fontSize: 16,
        fontWeight: '700',
        color: Colors.black,
        flex: 1,
    },
    todoContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    }, 
});