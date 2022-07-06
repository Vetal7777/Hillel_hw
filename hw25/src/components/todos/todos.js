import './todos.css';
//стили компонента
import React from "react";
import TodoList from "./todoList/todoList";
import TodoCreate from "./todo-create/todoCreate";
import TodoForm from "./todo-form/todoForm";

const todos = [
    {
        id: 1,
        title: 'Ask from Nikoly',
        body: 'about the REACT',
        isComplete: false,
    },
    {
        id: 2,
        title: 'Buy',
        body: 'sugar',
        isComplete: true,
    },
    {
        id: 3,
        title: 'Running',
        body: '2,54km every day',
        isComplete: false,
    },
    {
        id: 4,
        title: 'Call to Mom',
        body: null,
        isComplete: false,
    },
];

export default class Todos extends React.Component{
    static CLASSES = {
        todoActivator: 'todo__activator',
        todoActivatorContainer: 'todo__activator-container',
        todoActivatorLine: 'todo__activator-line',
        todoBody: 'todo__body',
        todoComponent: 'todo__component',
        todoContent: 'todo__content',
        todoControl: 'todo__control',
        todoEditButton: 'todo__edit-button',
        todoDeleteButton: 'todo__delete-button',
        todoDeleteLine: 'todo__delete-line',
        todoForm: 'todo__form',
        todoItem: 'todo__item',
        todoList: 'todo__list',
        todoStatus: 'todo__status',
        todoStatusContainer: 'todo__status-container',
        todoStatusInner: 'todo__status-inner',
        todoTitle: 'todo__title',
        completed: 'completed',
    };
    constructor(props) {
        super(props);
        this.state = {
            currentTodo: null,
            isEditTodo: false,
            isCreateTodo: false,
            todos,
            zero: {
                title: '',
                body: '',
            },
        };
        //стандартный state
        //this.setState по стандарту работает через спред оператор
        this.setContextFunctions.call(this);
    }
    createTodo(newTodo){
        this.setState({...this.state,
            isCreateTodo:false,
            todos: [...this.state.todos,{...newTodo,
                id:this.state.todos.length + 1,
                isComplete: false,}]
        })
    }
    editTodo(editedTodo){
        this.setState({...this.state,
            isEditTodo:false,
            todos: this.state.todos
                .map(todo => {
                    if(todo.id === editedTodo.id) {
                        return editedTodo;
                    }else{
                        return todo;
                    }
                }),
            currentUser: null,
        })
    }
    setContextFunctions(){
        this.createTodo = this.createTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSetComplete = this.onSetComplete.bind(this);
        this.onShowCreateForm = this.onShowCreateForm.bind(this);
    }
    onEdit(id){
        this.setState({...this.state,
            currentUser: {...this.state.todos.find(todo => todo.id === id)},
            isEditTodo: true,
        })
    }
    onDelete(id){
        this.setState({...this.state,
            todos: this.state.todos
                .filter(todo => todo.id !== id)
        })
    }
    onSetComplete(id){
        this.setState({...this.state,
            todos: this.state.todos
                .map(todo => {
                    if(todo.id === id) {
                        return {...todo,isComplete:true};
                    }else{
                        return todo;
                    }
                })})
    }
    onShowCreateForm(){
        this.setState({...this.state,
            isCreateTodo: true,
        })
    }
    render() {
        return (
            <>
                <div className={Todos.CLASSES.todoComponent}>
                    {this.renderTodoCreate()}
                    {this.renderTodoForm()}
                    {this.renderTodoList()}
                </div>
            </>
        )
    }
    renderTodoCreate(){
        if(!this.state.isEditTodo && !this.state.isCreateTodo){
            return (
                <>
                    <TodoCreate
                        classesObj={Todos.CLASSES}
                        onShowCreateFormFunc={this.onShowCreateForm}
                    />
                </>
            )
        }
    }
    renderTodoForm(){
        if(this.state.isEditTodo || this.state.isCreateTodo){
            return (
                <>
                    <TodoForm
                        className={Todos.CLASSES.todoForm}
                        title={this.state.isEditTodo ? 'Edit' : this.state.isCreateTodo ? 'Create' : null}
                        obj={this.state.currentUser || this.state.zero}
                        callBack={this.state.isEditTodo ? this.editTodo : this.state.isCreateTodo ? this.createTodo : null}
                    />
                </>
            )
        }
    }
    renderTodoList(){
        if(!(this.state.isCreateTodo + this.state.isEditTodo)){
            return (
                <>
                    <TodoList
                        classesObj={Todos.CLASSES}
                        todosArray={this.state.todos}
                        onEditFunc={this.onEdit}
                        onDeleteFunc={this.onDelete}
                        onSetCompleteFunc={this.onSetComplete}
                    />
                </>
            )
        }
    }
}