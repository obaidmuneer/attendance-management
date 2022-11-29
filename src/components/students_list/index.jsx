
const StudentsList = ({ students }) => {
    return (
        <div>
            {
                students ?
                    <table>
                        <thead>
                            {
                                students[0] && <tr>
                                    <td>{Object.keys(students[0])[1]}</td>
                                    <td>{Object.keys(students[0])[2]}</td>
                                    <td>{Object.keys(students[0])[3]}</td>
                                    <td>{Object.keys(students[0])[4]}</td>
                                    {/* <td>{Object.keys(students[0])[5]}</td> */}
                                    <td>{Object.keys(students[0])[6]}</td>
                                    {/* <td>{Object.keys(students[0])[10]}</td> */}

                                </tr>
                            }
                        </thead>
                        <tbody>
                            {
                                students.map((std, index) => {
                                    return <tr key={index} >
                                        <td>{std.name}</td>
                                        <td>{std.fathername}</td>
                                        <td>{std.roll}</td>
                                        <td>{std.contact}</td>
                                        {/* <td>{std.cnic}</td> */}
                                        <td>{std.course}</td>
                                        <td><img src={std.picture?.link} alt="" width={50}/></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    :
                    <div>Something went wrong</div>
            }
        </div>
    )
}

export default StudentsList