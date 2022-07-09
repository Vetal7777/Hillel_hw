import './reminder.css';
import {CLASSES} from "../../../shared/consts/classes/classes";
import React from "react";
import input from "../../../shared/components/input/input";
export default class Reminder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            zero: {
                title: 'there is no note',
            },
            isEdit: false,
            reminder: this.props.children,
        }
        this.setContext.call(this);
    }
    setContext(){
        this.onStartChange = this.onStartChange.bind(this);
        this.onHideInput = this.onHideInput.bind(this);
    }
    render() {
        return (
            <>
                <div className={this.props.className}>
                    {this.renderChildren()}
                </div>
            </>
        )
    }
    renderChildren(){
        if(this.state.isEdit === false){
            return (
                <span
                    className={CLASSES.reminderTitle}
                    onClick={this.onStartChange}
                >
                    {this.props.children}
                </span>
            )
        }
        if(this.state.isEdit){
            return (
                <input
                    autoFocus
                    className={CLASSES.reminderTitle}
                    placeholder={'Reminder'}
                    value={this.props.children === this.state.zero.title ? '' : this.props.children}
                    onChange={(event) => this.props.onChange(event.target.value)}
                    onBlur={this.onHideInput}
                />
            )
        }
    }
    onHideInput(){
        this.setState({
            ...this.state,
            isEdit: false,
        })
    }
    onStartChange(){
        this.setState({
            ...this.state,
                isEdit: true,
        })
    }
}