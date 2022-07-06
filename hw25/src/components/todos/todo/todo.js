import './todo.css';
import Button from "../../../shared/button/button";

export default function Todo({todo,classesObj,onEditFunc,onDeleteFunc,onSetCompleteFunc}){
    const innerDelete = () => {
        return (
            <>
                <span className={classesObj.todoDeleteLine}/>
                <span className={classesObj.todoDeleteLine}/>
            </>
        )
    }
    return (
        <>
            <div className={`${classesObj.todoItem} ${todo.isComplete ? classesObj.completed : ''}`}>
                <div className={classesObj.todoStatusContainer}>
                    <Button
                        className={classesObj.todoStatus}
                        title={<span className={classesObj.todoStatusInner}/>}
                        callBack={onSetCompleteFunc}
                    />
                </div>
                <div className={classesObj.todoContent}>
                    <span className={classesObj.todoTitle}>{todo.title}</span>
                    <span className={classesObj.todoBody}>{todo.body}</span>
                </div>
                <div className={classesObj.todoControl}>
                    <Button
                        title={'Edit'}
                        callBack={onEditFunc}
                        className={classesObj.todoEditButton}
                    />
                    <Button
                        callBack={onDeleteFunc}
                        className={classesObj.todoDeleteButton}
                        title={innerDelete()}
                    />
                </div>
            </div>
        </>
    )
}