import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import StandDensityData from '../../data/StandDensityData.json';
import "./Select.css"

type StandDensityKeys = keyof typeof StandDensityData;
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const SelectLabels = () => {
  const [standDensity, setStandDensity] =
    useState<StandDensityKeys>('tohokuSugi');
  const handleChange = (event: SelectChangeEvent<StandDensityKeys>) => {
    // エラーを消す方法がわからないので、聞きたい
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setStandDensity(event.target.value);
  };

  const MenuItems = (Object.keys(StandDensityData) as StandDensityKeys[]).map(
    (key) => (
      <MenuItem key={key} value={key}>
        {StandDensityData[key].title}
      </MenuItem>
    ),
  );

  return (
    <Select
      value={standDensity}
      onChange={handleChange}
      className="select-box"
    >
      {MenuItems}
    </Select>
  );
};

export default SelectLabels;
