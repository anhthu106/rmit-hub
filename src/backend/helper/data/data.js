export default function importRawData(data, ids, date) {
    return data.map((doc) => {
        const result = doc.toObject()
        for (let i of ids) {
            result[i] = result[i].toString()
        }
        if (date !== null) {
            result[date] = result[date].toLocaleString()
        }
        return result
    })
}