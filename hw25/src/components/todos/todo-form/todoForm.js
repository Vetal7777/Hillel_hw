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
                {
                    Object.entries(state)
                        .filter(key => typeof key[1] === 'string')
                        .map(elem => {
                            return (
                                <input
                                    key={elem[0]}
                                    onChange={setProperty}
                                    placeholder={elem[0]}
                                    value={elem[1]}
                                />
                            )
                        })
                }
                <Button
                    callBack={() => callBack(state)}
                    children={title}
                />
            </form>
        </>
    )
}