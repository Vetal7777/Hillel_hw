import './remindersCreate.css';
import {CLASSES} from "../../../shared/consts/classes/classes";
import React from "react";
import input from "../../../shared/components/input/input";
import button from "../../../shared/components/button/button";

export default class RemindersCreate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            reminder: {
                title : '',
            },
        }
        this.setContext.call(this);
    }
    setProperty(event){
        this.setState({
            ...this.state,
            value: event.target.value,
            reminder: {...this.state.reminder,
                title: event.target.value,
            }
        })
    }
    setContext(){
        this.setProperty = this.setProperty.bind(this)
    }
    sendNewReminder(event) {
        event.preventDefault();
        const newReminder = {...this.state.reminder};
        this.setState({
            ...this.state,
            value: '',
            reminder: {
                title : '',
            },
        })
        return newReminder;
    }
    render() {
        return (
            <>
                <form
                    className={CLASSES.remindersCreateContainer}
                    onSubmit={(event) => this.props.onCreate(this.sendNewReminder(event))}
                >
                    <input
                        autoFocus
                        value={this.state.value}
                        name={'title'}
                        placeholder={'Reminders'}
                        onChange={this.setProperty}
                    />
                    <button >
                        <span className={CLASSES.line}/>
                        <span className={CLASSES.line}/>
                    </button>
                </form>
            </>
        )
    }
}