/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import { useState, VFC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import StandDensityData from '../../data/StandDensityData.json';
import './Select.css';
import { TreeGrowthInput } from '../../models/TreeGrowthInput';
import { FormValues } from '../../models/FormValues';
import { UseFormSetValue } from 'react-hook-form';

type StandDensityKeys = keyof typeof StandDensityData;

interface Props {
  setValue: UseFormSetValue<FormValues>;
}
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const SelectLabels: VFC<Props> = (props) => {
  const { setValue } = props;

  const [standDensity, setStandDensity] =
    useState<StandDensityKeys>('tohokuSugi');
  const handleChange = (event: SelectChangeEvent<StandDensityKeys>) => {
    const newStandDensity = event.target.value as unknown as StandDensityKeys;
    setStandDensity(newStandDensity);

    StandDensityData[newStandDensity].SDMD.V.map((value, index) => {
      setValue(`treeGrowth.treeVolume.${index}.value`, value);
    });
    StandDensityData[newStandDensity].SDMD.DBH.map((value, index) => {
      setValue(`treeGrowth.dbh.${index}.value`, value);
    });
    StandDensityData[newStandDensity].SDMD.HF.map((value, index) => {
      setValue(`treeGrowth.highStandShape.${index}.value`, value);
    });
    setValue(`treeGrowth.nrf`, StandDensityData[newStandDensity].SDMD.NRf);
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
