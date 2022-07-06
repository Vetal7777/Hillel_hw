import './todoCreate.css'
import Button from "../../../shared/button/button";
export default function TodoCreate({classesObj,onShowCreateFormFunc}){
    const innerActivator = () => {
        return (
            <>
                <span className={classesObj.todoActivatorLine}/>
                <span className={classesObj.todoActivatorLine}/>
            </>
        )
    }
        return (
            <>
                <div className={classesObj.todoActivatorContainer}>
                    <Button
                        className={classesObj.todoActivator}
                        title={innerActivator()}
                        callBack={onShowCreateFormFunc}
                    />
                </div>
            </>
        )
}
