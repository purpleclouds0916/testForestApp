import { VFC } from 'react';
import FormNormal from '../Atoms/FormNormal';
import FormArray from '../molecules/FormArray';
import FormItem from '../molecules/FormItem';
import SelectFormula from '../molecules/SelectFormula';
import TreeHeightGrowthDescription from '../molecules/TreeHeightGrowthDescription';
import MultipleSelectPlaceholder from '../molecules/Select';
import formInformation from '../../data/FormInformation';
import { UseInputValues } from '../../models/UseInputValues';
import Card from './Card';

const TreeGrowth: VFC<UseInputValues> = (props) => {
  const { inputValues, setInputValue } = props;

  return (
    <Card title="林分の成長">
      <>
        <FormArray
          inputValues={inputValues}
          setInputValue={setInputValue}
          category="treeVolume"
          className="display-none"
        />
        <FormArray
          inputValues={inputValues}
          setInputValue={setInputValue}
          category="highStandShape"
          className="display-none"
        />
        <FormArray
          inputValues={inputValues}
          setInputValue={setInputValue}
          category="dbh"
          className="display-none"
        />
        <FormNormal
          inputValues={inputValues}
          setInputValue={setInputValue}
          category="nrf"
          className="display-none"
        />
        <FormItem
          title="林分密度管理図を選択する"
          description="選択することで、最適な林分材積を計算することができます"
        >
          <MultipleSelectPlaceholder
            inputValues={inputValues}
            setInputValue={setInputValue}
          />
        </FormItem>
        <SelectFormula inputValues={inputValues} />
        <FormItem
          title="樹高の成長"
          description={<TreeHeightGrowthDescription />}
        >
          <FormArray
            title={formInformation.treeHeightTitles}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="treeHeight"
            className="tree-height-field-items"
          />
        </FormItem>
      </>
    </Card>
  );
};

export default TreeGrowth;
