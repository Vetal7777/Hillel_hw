import './todoCreate.css'
import Button from "../../../shared/button/button";
export default function TodoCreate({classesObj,onShowCreateFormFunc}){
        return (
            <>
                <div className={classesObj.todoActivatorContainer}>
                    <Button
                        className={classesObj.todoActivator}
                        callBack={onShowCreateFormFunc}
                    >
                        <span className={classesObj.todoActivatorLine}/>
                        <span className={classesObj.todoActivatorLine}/>
                    </Button>
                </div>
            </>
        )
}
