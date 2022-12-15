import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader";
import StudentTable from "../student_table";

const Student = ({ api }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${api}/students`)
      .then((res) => {
        // console.log(res.data.data);
        setStudents(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setStudents(null);
        setLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {
        loading ? <Loader loading={loading} /> : <StudentTable students={students} />
      }
    </div>
  );
};

export default Student;
