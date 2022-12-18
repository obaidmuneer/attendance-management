import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { CardActionArea } from "@mui/material";

export default function MCard({ student }) {
  return (
    <CardActionArea sx={{width: 275}} >
      <Card sx={{ maxWidth: 275 }}>
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              Student Card
            </Typography>
            <Typography variant="body2" component="div">
              Name : {student?.name}
            </Typography>

            <Typography variant="body2">Course: {student?.course}</Typography>
            <Typography variant="body2">Roll: {student?.roll}</Typography>
            <Typography variant="body2">Attendance %: {student?.attendacePercent}</Typography>
          </CardContent>
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt="profile"
            src={student?.picture?.link}
          />
          {/* {Add alpha photo if avatar not found} */}
        </Stack>
      </Card>
    </CardActionArea>
  );
}