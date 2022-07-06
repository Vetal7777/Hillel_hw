import './todoList.css';
import Todo from "../todo/todo";

export default function TodoList({classesObj,todosArray,onEditFunc,onDeleteFunc,onSetCompleteFunc}){
    return (
    <>
        <div className={classesObj.todoList}>
            {todosArray.map(todo => <Todo
                key={todo.id}
                classesObj={classesObj}
                todo={todo}
                onEditFunc={() => onEditFunc(todo.id)}
                onDeleteFunc={() => onDeleteFunc(todo.id)}
                onSetCompleteFunc={() =>onSetCompleteFunc(todo.id)}/>)}
        </div>
    </>
    )
}