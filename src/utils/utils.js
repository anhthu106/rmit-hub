const campus = () => {
    return [
        { value: 'sgs', label: "Saigon South Campus" },
        { value: 'hn', label: "Hanoi Campus" },
    ]
}
const major = (majorProps) => {
    const majorOptions = []

    for (let i = 0; i < majorProps.length - 1; i++) {
        let updateMajorDict = {}
        updateMajorDict['value'] = majorProps[i].name
        updateMajorDict['label'] = majorProps[i].name
        majorOptions.push(updateMajorDict)
    }
    return majorOptions
}

const course = (courseProps) => {
    let courseOptions = []

    for (let i = 0; i < courseProps.length - 1; i++) {
        let updateCourseDict = {}
        updateCourseDict['value'] = courseProps[i].name
        updateCourseDict['label'] = courseProps[i].name
        courseOptions.push(updateCourseDict)
    }
    return courseOptions
}

export const util = { campus, major, course }