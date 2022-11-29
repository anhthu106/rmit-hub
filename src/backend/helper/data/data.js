export default function importRawData(data, ids) {
    return data.map((doc) => {
        const result = doc.toObject()
        for (let i of ids) {
            result[i] = result[i].toString()
        }
        return result
    })
}