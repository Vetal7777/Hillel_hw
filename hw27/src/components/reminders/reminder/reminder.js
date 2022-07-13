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
            value: null,
            isEdit: false,
            reminder: this.props.children,
        };
        this.setContext.call(this);
    }
    setContext(){
        this.onStartChange = this.onStartChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setProperty = this.setProperty.bind(this);
    }
    componentDidMount() {
        this.setState({...this.state,value: this.props.children === this.state.zero.title ? '' : this.props.children});
    }
    setProperty(event){
        this.setState({
            ...this.state,
            value: event.target.value,
        })
    }
    render() {
        return (
            <>
                <div className={this.props.className}>
                    {this.renderChildren()}
                    <button className={CLASSES.deleteItem} onClick={this.props.onDelete}>Delete</button>
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
                    value={this.state.value}
                    onChange={this.setProperty}
                    onBlur={this.onChange}
                />
            )
        }
    }
    onChange(){
        this.props.onChange(this.state.value === '' ? this.state.zero.title : this.state.value);
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