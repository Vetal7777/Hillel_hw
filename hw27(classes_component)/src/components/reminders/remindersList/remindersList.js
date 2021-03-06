import './remindersList.css'
import {CLASSES} from "../../../shared/consts/classes/classes";
import Reminder from "../reminder/reminder";

export default function RemindersList({reminders,onChange,onDelete}){
    return (
        <>
            <div className={CLASSES.remindersList}>
                {
                    reminders.map((reminder,index) => (
                        <Reminder
                            onChange={(value) => onChange(value,reminder.id)}
                            onDelete={() => onDelete(reminder.id)}
                            className={CLASSES.reminderItem}
                            children={reminder.title}
                            key={index}
                        />
                    ))
                }
            </div>
        </>
    )
}