export default function importRawData(data) {
    return data.map((doc) => {
        const result = doc.toObject()
        result._id = result._id.toString()
        return result
    })
}