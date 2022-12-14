import TextField from "@mui/material/TextField";

const ModifiedTextField = ({ str, type, placeHelper, formik }) => {
  return (
    <TextField
      id={str}
      name={str}
      label={str.charAt(0).toUpperCase() + str.slice(1)}
      //   margin="dense"
      value={formik.values[str]}
      InputProps={{ sx: { height: 50 } }}
      sx={{
        width: 300,
      }}
      placeholder={placeHelper}
      type={type || "text"}
      onChange={formik.handleChange}
      error={formik.touched[str] && Boolean(formik.errors[str])}
      helperText={formik.touched[str] && formik.errors[str]}
    />
  );
};

export default ModifiedTextField;
