import { useEffect, useState } from "react"


const ClassesList = ({ stdCourse, classes, defaultVal, fetchedVal }) => {
    const [selectedClass, setSelectedClass] = useState([])

    useEffect(() => {
        let data = classes.filter(eachClass => {
            return eachClass.course == stdCourse
        })
        console.log(data);
        setSelectedClass(data)
    }, [])


    return (
        <select defaultValue={defaultVal}>
            <option value={defaultVal} disabled >Select {defaultVal}..</option>
            {
                selectedClass.map((eachClass, index) => {
                    return <option key={index} value={eachClass[fetchedVal]}>{eachClass[fetchedVal]}</option>
                })
                // classes.filter((eachClass, index) => {
                //     return <option key={index} value={eachClass[fetchedVal]}>{eachClass[fetchedVal]}</option>

                // })
            }
        </select>
    )
}

export default ClassesList