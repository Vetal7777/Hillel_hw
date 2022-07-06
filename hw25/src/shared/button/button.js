import './button.css';

export default function Button({callBack,className,children}){
    return (
        <>
            <button className={className} onClick={callBack}>
                {children}
            </button>
        </>
    );
}