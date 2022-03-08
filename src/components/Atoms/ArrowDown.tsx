/* eslint-disable @typescript-eslint/explicit-module-boundary-types  */

import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const ArrowDown = () => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <IconContext.Provider value={{ color: 'steelblue', className: 'arrow-down' }}>
    <BsFillArrowDownCircleFill />
  </IconContext.Provider>
);

export default ArrowDown;
