import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';


export default function ImageCorrectionsSkeleton() {
  return (
    <>
        <div className='corrections-container'>
        <Skeleton animation='wave' variant='rectangular' width={'60vw'} height={'95vh'} />
        </div>
        <div className='corrections-info'>
        {[...Array(12)].map((el, idx) => <Skeleton  key={idx} animation='wave' sx={{gridColumn: '2/3', height: '8vh'}} variant='text'/>)}
        </div>
    </>
  );
}
