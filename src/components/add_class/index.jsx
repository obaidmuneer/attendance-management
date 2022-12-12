import axios from "axios"

const AddClass = ({ api }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        // just checking i can also do it this way lol 
        let { teacher, classTiming, classSchedule, section, course, batch } = e.target
        let data = {
            teacher: teacher.value,
            classTiming: classTiming.value,
            classSchedule: classSchedule.value,
            section: section.value,
            course: course.value,
            batch: batch.value
        }

        axios.post(`${api}/add_class`, data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h3>Add Class</h3>
            <form onSubmit={handleSubmit} >
                <span>Teacher :</span><input type="text" name="teacher" /> <br />
                <span>Class Timing :</span><input type="text" name="classTiming" /> <br />
                <span>Class Schedule :</span><input type="text" name="classSchedule" /><br />
                <span>Section :</span><input type="text" name="section" /><br />
                <span>Course :</span><input type="text" name="course" /><br />
                <span>Batch :</span><input type="text" name="batch" /><br />
                <input type="submit" value="Submit" />


            </form>
        </div>
    )
}

export default AddClass