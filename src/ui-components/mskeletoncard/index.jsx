import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function MSkeletonCard({ arrLength, claxx }) {
    const mwidth = claxx ? 320 : 270
    const mheight = claxx ? 170 : 150

    return (
        <Grid container justifyContent={'center'} alignItems='center' >
            {Array.from({ length: arrLength }).map((item, index) => (
                <Box key={index} sx={{ width: mwidth, mx: 3, my: 5, }}>
                    <Grid item xs={'auto'} key={index}>
                        <Skeleton variant="rectangular" width={mwidth} height={mheight} />
                    </Grid>
                </Box>
            ))}
        </Grid>
    );
}