import axios from "axios";
import { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../../context/context";

import MTable from "../../ui-components/mtable";
import Loader from "../../ui-components/loader";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "fathername", label: "Father Name", minWidth: 170 },
  { id: "roll", label: "Roll Number", minWidth: 170 },
  { id: "contact", label: "Phone Number", minWidth: 170 },
  { id: "course", label: "Course", minWidth: 170 },
  // { id: "picture", label: "Photo", minWidth: 170 },
];

const Students = () => {
  const { state } = useContext(GlobalContext)
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${state.api}/students`)
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
        loading ? <Loader loading={loading} /> : <MTable data={students} columns={columns} height={'80vh'} />
      }
    </div>
  );
};

export default Students;
