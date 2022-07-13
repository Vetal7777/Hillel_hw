import './button.css';
export default function button({children,callBack}){
    return (
        <>
            <button onClick={callBack}>
                {children}
            </button>
        </>
    )
}