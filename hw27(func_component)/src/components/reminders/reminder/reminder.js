import './reminder.css';
import {CLASSES} from "../../../shared/consts/classes/classes";
import input from "../../../shared/components/input/input";
import {useEffect, useState} from "react";
export default function Reminder({children,onChangeFunc,className,onDelete}){
    const [state,setState] = useState({
        zero: {
            title: 'there is no note',
        },
        value: null,
        isEdit: false,
        reminder: children,
    });
    useEffect(() => {
        setState({...state,value: children === state.zero.title ? '' : children});
    },[])
    function setProperty(event){
        setState({
            ...state,
            value: event.target.value,
        })
    }
    function renderChildren(){
        if(state.isEdit === false){
            return (
                <span
                    className={CLASSES.reminderTitle}
                    onClick={onStartChange}
                >
                    {children}
                </span>
            )
        }
        if(state.isEdit){
            return (
                <input
                    autoFocus
                    className={CLASSES.reminderTitle}
                    placeholder={'Reminder'}
                    value={state.value}
                    onChange={setProperty}
                    onBlur={onChange}
                />
            )
        }
    }
    function onChange(){
        onChangeFunc(state.value === '' ? state.zero.title : state.value);
        setState({
            ...state,
            isEdit: false,
        })
    }
    function onStartChange(){
        setState({
            ...state,
                isEdit: true,
        })
    }
    return (
        <>
            <div className={className}>
                {renderChildren()}
                <button className={CLASSES.deleteItem} onClick={onDelete}>Delete</button>
            </div>
        </>
    )
}