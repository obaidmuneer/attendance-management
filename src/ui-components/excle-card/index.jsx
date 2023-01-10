import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

export default function ExcleMediaCard({ img, givenWidth, handle }) {
    return (
        <Stack alignItems={'center'} >
            <Card raised sx={{ maxWidth: givenWidth || 550 }}>
                <CardMedia
                    component="img"
                    alt="guide pic"
                    height="150"
                    image={img}

                />
                <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">
                    Guide
                </Typography> */}
                    <Typography variant="body2" color="text.secondary">
                        Your Excle file should be as shown in image
                    </Typography>
                </CardContent>
                <CardActions>
                {/* <Button size="small">OK</Button> */}
                <Button onClick={handle} size="small">Dont Show Again</Button>
            </CardActions>
            </Card>
        </Stack>
    );
}