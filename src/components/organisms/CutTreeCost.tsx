/* eslint-disable  */
import { VFC } from 'react';
import { TextField } from '@mui/material';
import FormArray from '../molecules/FormArray';
import Card from './Card';
import FormObject from '../molecules/FormObject';
import FormItem from '../molecules/FormItem';
import formInformation from '../../data/FormInformation';

import ChartItem from './ChartItem';
import MoveLineChart from './MoveLineChart';
import { CutOtherInput } from '../../models/CutOtherInput';
import { TreePriceInput } from '../../models/TreePriceInput';

interface Props {
  cutMethod: 'thinning' | 'clearCut';
  otherInputValues: CutOtherInput;
  setOtherInputValue: React.Dispatch<React.SetStateAction<CutOtherInput>>;
  treePriceInputValues: TreePriceInput;
  setTreePriceInputValue: React.Dispatch<React.SetStateAction<TreePriceInput>>;
}

const CutTreeCost: VFC<Props> = (props) => {
  const {
    cutMethod,
    otherInputValues,
    setOtherInputValue,
    treePriceInputValues,
    setTreePriceInputValue,
  } = props;

  const jsCutMethod = cutMethod === 'thinning' ? '間伐' : '皆伐';

  const chartData: number[][] = [];

  // eslint-disable-next-line array-callback-return
  treePriceInputValues.price.map((_, index) => {
    chartData[index] = [
      Number(treePriceInputValues.diamter[index]),
      Number(treePriceInputValues.price[index]),
    ];
  });

  return (
    <Card title={`${jsCutMethod}の費用`}>
      <>
        <FormObject
          formInformation={formInformation[`${cutMethod}Other`]}
          inputValues={otherInputValues}
          setInputValue={setOtherInputValue}
          className="cut-other-field-items"
        />
        <FormItem
          title={`${jsCutMethod}した木材の価格`}
          description="胸高直径に対する木材価格を入力してください。下のグラフを動かして変更することもできます"
        >
          <>
            <FormArray
              inputValues={treePriceInputValues}
              setInputValue={setTreePriceInputValue}
              category="price"
              className="price-field-items"
            >
              <TextField
                disabled
                className="table-title"
                defaultValue="価格(円)"
              />
            </FormArray>
            <FormArray
              inputValues={treePriceInputValues}
              setInputValue={setTreePriceInputValue}
              category="diamter"
              className="diamter-field-items"
            >
              <TextField
                disabled
                className="table-title"
                defaultValue="胸高直径(cm)"
              />
            </FormArray>
            <ChartItem axisX="胸高直径(cm)" axisY="金額(円)">
              <MoveLineChart
                top={10}
                bottom={30}
                left={65}
                right={10}
                className={`${cutMethod}-chart`}
                idName={`${cutMethod}-chart`}
                // inputValues={treePriceInputValues}
                // setInputValue={setTreePriceInputValue}
                data={chartData}
                cutMethod={`${cutMethod}`}
                treePriceInputValues={treePriceInputValues}
                setTreePriceInputValue={setTreePriceInputValue}
              />
            </ChartItem>
          </>
        </FormItem>
      </>
    </Card>
  );
};

export default CutTreeCost;
