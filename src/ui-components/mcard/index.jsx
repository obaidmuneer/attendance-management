import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name.charAt(0).toUpperCase(),
    // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function mStringAvatar(name) {
  return {
    sx: {
      bgcolor: '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    children: name.charAt(0).toUpperCase(),
  }
}


export default function MCard({ student, claxx }) {

  const mwidth = claxx ? 350 : 270
  return (
    <CardActionArea sx={{ width: mwidth }} >
      <Card sx={{ maxWidth: mwidth }}>
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
          <Grid container
            spacing={1}
            // direction="row"
            // justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={8}>
              <CardContent>
                {student && <Typography variant="body1" gutterBottom>
                  Student Card
                </Typography>}
                <Typography variant="body2" component="div">
                  {student ? `Name : ${student?.name}` : `Teacher Name : ${claxx?.teacher}`}
                </Typography>

                <Typography variant="body2">Course: {student?.course} {claxx?.course}</Typography>
                <Typography variant="body2">
                  {student ? `Roll : ${student?.roll}` : `Classes Days ${claxx?.classSchedule}`}
                </Typography>
                <Typography variant="body2">{claxx && `Batch: ${claxx?.batch}`}</Typography>
                <Typography variant="body2">{student ? `Attendance %: ${student?.attendacePercent}` : `Section : ${claxx?.section}`}</Typography>
                <Typography variant="body2">{claxx && `Class Time: ${claxx?.classTiming}`}</Typography>
              </CardContent>
            </Grid>

            <Grid item xs={4}>
              <Avatar
                sx={{ width: 70, height: 70 }}
                alt="profile"
                src={student?.picture?.link}
                // {...stringAvatar((!student?.picture?.link || !claxx?.teacherPicture) && (student?.name || claxx.teacher))}
                {...(!student?.picture?.link || !claxx?.teacherPicture) && { ...mStringAvatar(student?.name || claxx.teacher) }}
              />
            </Grid>
          </Grid>


          {/* {Add alpha photo if avatar not found} */}
        </Stack>
      </Card>
    </CardActionArea>
  );
}
