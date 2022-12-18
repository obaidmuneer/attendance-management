import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function MSkeletonCard({ arrLength }) {
    return (
        <Grid container wrap="nowrap" justifyContent={'center'} >
            {Array.from({ length: arrLength }).map((item, index) => (
                <Box key={index} sx={{ width: 270, mx: 3, my: 5, }}>
                    <Skeleton variant="rectangular" width={270} height={150} />
                </Box>
            ))}
        </Grid>
    );
}