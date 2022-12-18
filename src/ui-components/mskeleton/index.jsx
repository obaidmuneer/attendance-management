import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function MSkeleton() {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton height={70} />
      <Skeleton height={70} />
      <Skeleton height={70} />
    </Box>
  );
}
