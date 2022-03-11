import { useState, VFC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import StandDensityData from '../../data/StandDensityData.json';
import './Select.css';
import { inputValuesTs } from '../../models/InputValues';

interface Props {
  inputValues: inputValuesTs;
  setInputValue: React.Dispatch<React.SetStateAction<inputValuesTs>>;
}

type StandDensityKeys = keyof typeof StandDensityData;
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const SelectLabels: VFC<Props> = (props) => {
  const { inputValues, setInputValue } = props;

  const [standDensity, setStandDensity] =
    useState<StandDensityKeys>('tohokuSugi');
  const handleChange = (event: SelectChangeEvent<StandDensityKeys>) => {
    const newStandDensity = event.target.value as unknown as StandDensityKeys;

    setStandDensity(newStandDensity);
    setInputValue({
      ...inputValues,
      treeVolume: StandDensityData[newStandDensity].SDMD.V,
      nrf: StandDensityData[newStandDensity].SDMD.NRf,
      dbh: StandDensityData[newStandDensity].SDMD.DBH,
      highStandShape: StandDensityData[newStandDensity].SDMD.HF,
    });
  };

  const MenuItems = (Object.keys(StandDensityData) as StandDensityKeys[]).map(
    (key) => (
      <MenuItem key={key} value={key}>
        {StandDensityData[key].title}
      </MenuItem>
    ),
  );

  return (
    <Select value={standDensity} onChange={handleChange} className="select-box">
      {MenuItems}
    </Select>
  );
};

export default SelectLabels;
