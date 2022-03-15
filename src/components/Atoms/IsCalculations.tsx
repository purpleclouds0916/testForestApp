import { CircularProgress } from '@mui/material';
import React from 'react';
import './IsCalculation.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IsCalculation = React.memo(() => (
  <div className="is-calculation">
    <div className="is-calculation-wrapper">
      <div className="circularprogres">
        <CircularProgress disableShrink size={60} />
      </div>
      <div className="text">
        計算中です。この処理は10秒ほどかかることがあります。
      </div>
    </div>
  </div>
));

export default IsCalculation;
