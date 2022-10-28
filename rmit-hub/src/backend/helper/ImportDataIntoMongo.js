import * as courses from "../../../../data/courses.json";
import Major from "../models/major";
import Course from "../models/course.models";

const majors = Object.keys(courses)
for (let i = 0; i < majors.length-1; i++) {
    let a = majors[i]
    let Courses = Object.values(courses[a]["courseName"])
    const major = {
        name: majors[i],
    }
    await Major.create(major)

    for (let x = 0; x < Courses.length; x++) {
        let Cid = await Course.findOne({name: Courses[x]})
        let Mid = await Major.findOne({name: a})
        if (Cid) {
            await CourseUpdate(Cid._id.toString(), Mid._id.toString())
        } else {
            let course = {
                name: Courses[x],
                major_id: Mid._id.toString()
            }
            await Course.create(course)
            Cid = await Course.findOne({name: Courses[x]})
        }
        await MajorUpdate(Mid._id, Cid._id.toString())
    }
}

async function MajorUpdate(_id, C_id) {
    await Major.findByIdAndUpdate({
            _id
        }, {
            $push: {
                course_id: C_id
            }
        },
        {
            new: true, upsert: true
        }
    )
}

async function CourseUpdate(_id, M_id) {
    await Course.findByIdAndUpdate({
            _id
        }, {
            $push: {
                major_id: M_id
            }
        },
        {
            new: true, upsert: true
        })
}