import * as courses from "../../../data/courses.json";

const campus = () => {
    const campusOptions = [
        { value: 'sgs', label: "Saigon South Campus" },
        { value: 'hn', label: "Hanoi Campus" },
    ]
    return campusOptions
}
const major = () => {
    const courseList = Object.keys(courses)
    const majorOptions = []

    for (let i = 0; i < courseList.length - 1; i++) {
        let updateMajorDict = {}
        updateMajorDict['value'] = courseList[i]
        updateMajorDict['label'] = courseList[i]
        majorOptions.push(updateMajorDict)
    }
    return majorOptions
}

const course = () => {
    let courseOptions = []
    let set = new Set()
    Object.keys(courses).forEach((key) => {
        if (courses[key]["courseName"]) {
            Object.values(courses[key]["courseName"]).forEach((k) => {
                set.add(k);
            })
        }
    });
    set = Array.from(set)

    for (let i in set) {
        let updateCourseDict = {}
        updateCourseDict['value'] = set[i]
        updateCourseDict['label'] = set[i]
        courseOptions.push(updateCourseDict)
    }
    return courseOptions
}

export const util = { campus, major, course }