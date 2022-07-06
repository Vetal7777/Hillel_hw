export default function input({value,placeholder,callBack}){
    return (
        <>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={callBack}
            />
        </>
    )
}