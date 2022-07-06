import './todoForm.css';
import input from "../../../shared/input/input";
import Button from "../../../shared/button/button";
import {useState} from "react";
export default function TodoForm({obj,callBack,title,className}) {
    const [state,setState] = useState(obj);
    function setProperty(event){
        const newState = {...state};
        newState[event.target.placeholder] = event.target.value;
        setState(newState);
    }
    return (
        <>
            <form
                className={className}
                title={title}
                onSubmit={(event) => event.preventDefault()}
            >
                <input
                    onChange={setProperty}
                    placeholder={'title'}
                    value={state.title}
                />
                <input
                    onChange={setProperty}
                    placeholder={'body'}
                    value={state.body}
                />
                <Button
                    callBack={() => callBack(state)}
                    title={title}
                />
            </form>
        </>
    )
}