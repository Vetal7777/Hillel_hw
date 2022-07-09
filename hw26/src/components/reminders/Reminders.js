import './Reminders.css';
import React from "react";
import RemindersCreate from "./remindersCreate/remindersCreate";
import {CLASSES} from "../../shared/consts/classes/classes";
import RemindersList from "./remindersList/remindersList";

export default class Reminders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            zero: {
                title: 'there is no note',
            },
            reminders: [],
        };
        this.setContext.call(this);
    }
    setContext(){
        this.onCreate = this.onCreate.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onCreate(newReminder){
        this.setState({
            ...this.state,
            reminders: [
                ...this.state.reminders, {
                    title: (newReminder.title) ? newReminder.title : this.state.zero.title,
                    id: this.state.reminders.length + 1,
            }],
        })
    }
    onChange(value,id){
        this.setState({
            ...this.state,
                reminders: [
                    ...this.state.reminders.map(reminder => {
                        if(reminder.id === id){
                            return {
                                ...reminder,
                                    title: value ? value : this.state.zero.title,
                            }
                        }else{
                            return reminder;
                        }

                    })
                ]
        })
    }
    render() {
        return (
            <>
                <div className={CLASSES.remindersContainer}>
                    <RemindersCreate
                        onCreate={this.onCreate}
                    />
                    <RemindersList
                        onChange={this.onChange}
                        reminders={this.state.reminders}
                    />
                </div>
            </>
        )
    }
}