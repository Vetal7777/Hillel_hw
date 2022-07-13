import './Reminders.css';
import RemindersCreate from "./remindersCreate/remindersCreate";
import {CLASSES} from "../../shared/consts/classes/classes";
import RemindersList from "./remindersList/remindersList";
import API from '../../shared/utilities/api';
import {useEffect, useState} from "react";

export default function Reminders({}){
    const [state,setState] = useState({
        zero: {
            title: 'there is no note',
        },
        upload: true,
        newReminder: null,
        editedReminder: null,
        deletedReminderId: null,
        onDelete: false,
        reminders: [],
    });
    useEffect(() => {
        API.get('reminders/')
            .then(reminders => {
                setState({
                    ...state,
                    reminders: reminders.data,
                    upload: false,
                })
            });
    },[]);
    useEffect(() => {
        if(state.newReminder){
            API.post('reminders/',state.newReminder)
                .then(reminder => {
                    setState({
                        ...state,
                        reminders: [...state.reminders,reminder.data],
                        newReminder: null,
                        upload: false,
                    })
                });
        }
        if(state.editedReminder){
            API.put('reminders/'+ state.editedReminder.id,state.editedReminder)
                .then(editedReminder => {
                    setState({
                        ...state,
                        reminders: state.reminders.map(reminder => {
                            if(editedReminder.data.id === reminder.id){
                                return editedReminder.data;
                            }else {
                                return reminder;
                            }
                        }),
                        editedReminder: null,
                        upload: false,
                    })
                });
        }
        if(state.deletedReminderId){
            API.delete('reminders/' + state.deletedReminderId)
                .then(() => {
                    setState({
                        ...state,
                        reminders: [...state.reminders].filter(reminder => reminder.id !== state.deletedReminderId),
                        deletedReminderId: null,
                        upload: false,
                    })
                })
        }
    },[state.upload === true])
    function onCreate(newReminder){
        newReminder.id = +Math.random().toFixed(3) * 1000
        newReminder.title = (newReminder.title) ? newReminder.title : state.zero.title;
        setState({
            ...state,
            newReminder : newReminder,
            upload: true,
        })
    }
    function onChange(value,id){
        setState({
            ...state,
            editedReminder: { id, title: value,},
            upload: true,
        })
    }
    function onDelete(id){
        setState({
            ...state,
            deletedReminderId: id,
            upload: true,
        })
    }
    return (
        <>
            <div className={CLASSES.remindersContainer}>
                {state.upload ? (<span className={CLASSES.loading}/>) : null}
                <RemindersCreate
                    onCreate={onCreate}
                />
                <RemindersList
                    onDelete={onDelete}
                    onChange={onChange}
                    reminders={state.reminders}
                />
            </div>
        </>
    )
}