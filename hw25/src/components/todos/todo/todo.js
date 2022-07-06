import './todo.css';
import Button from "../../../shared/button/button";

export default function Todo({todo,classesObj,onEditFunc,onDeleteFunc,onSetCompleteFunc}){
    return (
        <>
            <div className={`${classesObj.todoItem} ${todo.isComplete ? classesObj.completed : ''}`}>
                <div className={classesObj.todoStatusContainer}>
                    <Button
                        className={classesObj.todoStatus}
                        callBack={!todo.isComplete ? onSetCompleteFunc : null}
                    >
                        <span className={classesObj.todoStatusInner}/>
                    </Button>
                </div>
                <div className={classesObj.todoContent}>
                    <span className={classesObj.todoTitle}>{todo.title}</span>
                    <span className={classesObj.todoBody}>{todo.body}</span>
                </div>
                <div className={classesObj.todoControl}>
                    <Button
                        children={'Edit'}
                        callBack={onEditFunc}
                        className={classesObj.todoEditButton}
                    />
                    <Button
                        callBack={onDeleteFunc}
                        className={classesObj.todoDeleteButton}
                    >
                        <span className={classesObj.todoDeleteLine}/>
                        <span className={classesObj.todoDeleteLine}/>
                    </Button>
                </div>
            </div>
        </>
    )
}