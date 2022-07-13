import './Reminders.css';
import React from "react";
import RemindersCreate from "./remindersCreate/remindersCreate";
import {CLASSES} from "../../shared/consts/classes/classes";
import RemindersList from "./remindersList/remindersList";
import API from '../../shared/utilities/api';

export default class Reminders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            zero: {
                title: 'there is no note',
            },
            upload: true,
            newReminder: null,
            editedReminder: null,
            deletedReminderId: null,
            onDelete: false,
            reminders: [],
        };
        this.setContext.call(this);
    }
    componentDidMount(){
        API.get('reminders/')
            .then(reminders => {
                this.setState({
                    ...this.state,
                    reminders: reminders.data,
                    upload: false,
                },() => console.log(this.state.reminders))
            });
    }
    componentDidUpdate() {
        if(this.state.newReminder){
            API.post('reminders/',this.state.newReminder)
                .then(reminder => {
                    this.setState({
                        ...this.state,
                        reminders: [...this.state.reminders,reminder.data],
                        newReminder: null,
                        upload: false,
                    })
                });
        }
        if(this.state.editedReminder){
            API.put('reminders/'+ this.state.editedReminder.id,this.state.editedReminder)
                .then(editedReminder => {
                    this.setState({
                        ...this.state,
                        reminders: this.state.reminders.map(reminder => {
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
        if(this.state.deletedReminderId){
            console.log(this.state.reminders)
            API.delete('reminders/' + this.state.deletedReminderId)
                .then(() => {
                    this.setState({
                        ...this.state,
                        reminders: [...this.state.reminders].filter(reminder => reminder.id !== this.state.deletedReminderId),
                        deletedReminderId: null,
                        upload: false,
                    },() => console.log(this.state.reminders))
                })
        }
    }

    setContext(){
        this.onCreate = this.onCreate.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onCreate(newReminder){
        newReminder.id = +Math.random().toFixed(3) * 1000
        newReminder.title = (newReminder.title) ? newReminder.title : this.state.zero.title;
        this.setState({
            ...this.state,
            newReminder : newReminder,
            upload: true,
        })
    }
    onChange(value,id){
        this.setState({
            ...this.state,
            editedReminder: { id, title: value,},
            upload: true,
        })
    }
    onDelete(id){
        this.setState({
            ...this.state,
            deletedReminderId: id,
            upload: true,
        })
    }
    render() {
        return (
            <>
                <div className={CLASSES.remindersContainer}>
                    {this.state.upload ? (<span className={CLASSES.loading}/>) : null}
                    <RemindersCreate
                        onCreate={this.onCreate}
                    />
                    <RemindersList
                        onDelete={this.onDelete}
                        onChange={this.onChange}
                        reminders={this.state.reminders}
                    />
                </div>
            </>
        )
    }
}