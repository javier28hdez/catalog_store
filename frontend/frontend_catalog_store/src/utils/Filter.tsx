
export function filterInput<T>(array: Array<T>, attributeFilter: keyof T,e: React.ChangeEvent<HTMLInputElement>): Array<T>{
    const filter = e.target.value.toLowerCase();
    return array.filter(value=>{
        const valueOfCheck = value[attributeFilter];
        if (typeof valueOfCheck === 'string')
            return valueOfCheck.toLowerCase().includes(filter);
    });
}