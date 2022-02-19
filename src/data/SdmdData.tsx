/* eslint-disable array-callback-return */
import { FieldType } from '../models/FieldType';

const treeHeight: FieldType[] = [
  {
    id: 1,
    title: '木の高さだよ',
    description: "説明が入るよ",
    defaultValue: 0.58,
  },
  {
    id: 2,
    defaultValue: 10343,
  },
  {
    id: 3,
    defaultValue: 0.5,
  },
  {
    id: 4,
    defaultValue: 0.5,
  },
];

const treeVolume: FieldType[] = [
  {
    id: 4,
    defaultValue: 0.58,
  },
  {
    id: 5,
    defaultValue: 10343,
  },
  {
    id: 6,
    defaultValue: 0.5,
  },
];

const nrf: FieldType[] = [
  {
    id: 1,
    defaultValue: 0.58,
  },
  {
    id: 2,
    defaultValue: 10343,
  },
  {
    id: 3,
    defaultValue: 0.5,
  },
];

const dbh: FieldType[] = [
  {
    id: 1,
    defaultValue: 0.58,
  },
  {
    id: 2,
    defaultValue: 10343,
  },
  {
    id: 3,
    defaultValue: 0.5,
  },
];

const sdmdData = {
  treeHeight,
  treeVolume,
  nrf,
  dbh,
};
export default sdmdData;
