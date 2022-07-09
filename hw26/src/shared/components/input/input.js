export default function input({placeholder,value = null,onChange}){
    return (
        <>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}