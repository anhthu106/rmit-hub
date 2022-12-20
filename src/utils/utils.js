const campus = () => {
    return [
        {value: 'sgs', label: "Saigon South Campus"},
        {value: 'hn', label: "Hanoi Campus"},
    ]
}

const item = (itemProps, item) => {
    const itemOptions = []
    for (let i = 0; i < itemProps.length; i++) {
        let updateitemDict = {}
        updateitemDict['value'] = itemProps[i][item]
        updateitemDict['label'] = itemProps[i][item]
        itemOptions.push(updateitemDict)
    }
    return itemOptions
}

const username = (usernameProps) => {
    const props = []
    for (let i of usernameProps) {
        let usernameDict = {}
        usernameDict['value'] = i
        usernameDict['label'] = i
        props.push(usernameDict)
    }
    return props
}
export const util = {campus, item, username}