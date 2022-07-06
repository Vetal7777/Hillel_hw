import './button.css';

export default function Button({title,callBack,className}){
    return (
        <>
            <button className={className} onClick={callBack}>
                {title ? title : null}
            </button>
        </>
    );
}