import { CircularProgress } from '@mui/material';
import './IsCalculation.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IsCalculation = () => (
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
);

export default IsCalculation;
