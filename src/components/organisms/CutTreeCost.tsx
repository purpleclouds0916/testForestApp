import { VFC } from 'react';
import { TextField } from '@mui/material';
import FormArray from '../molecules/FormArray';
import Card from './Card';
import FormObject from '../molecules/FormObject';
import FormItem from '../molecules/FormItem';
import formInformation from '../../data/FormInformation';

import { UseInputValues } from '../../models/UseInputValues';
import ChartItem from './ChartItem';
import MoveLineChart from './MoveLineChart';

interface Props {
  cutMethod: 'thinning' | 'clearCut';
}

const CutTreeCost: VFC<Props & UseInputValues> = (props) => {
  const { cutMethod, inputValues, setInputValue } = props;

  const jsCutMethod = cutMethod === 'thinning' ? '間伐' : '皆伐';

  const chartData: number[][] = [];

  // eslint-disable-next-line array-callback-return
  inputValues.thinningPrice.map((_, index) => {
    chartData[index] = [
      Number(inputValues[`${cutMethod}Diamter`][index]),
      Number(inputValues[`${cutMethod}Price`][index]),
    ];
  });

  return (
    <Card title={`${jsCutMethod}の費用`}>
      <>
        <FormObject
          formInformation={formInformation[`${cutMethod}Other`]}
          inputValues={inputValues}
          setInputValue={setInputValue}
          category={`${cutMethod}Other`}
          className="cut-other-field-items"
        />
        <FormItem
          title={`${jsCutMethod}した木材の価格`}
          description="胸高直径に対する木材価格を入力してください。下のグラフを動かして変更することもできます"
        >
          <>
            <FormArray
              inputValues={inputValues}
              setInputValue={setInputValue}
              category={`${cutMethod}Price`}
              className="price-field-items"
            >
              <TextField
                disabled
                className="table-title"
                defaultValue="価格(円)"
              />
            </FormArray>
            <FormArray
              inputValues={inputValues}
              setInputValue={setInputValue}
              category={`${cutMethod}Diamter`}
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
                inputValues={inputValues}
                setInputValue={setInputValue}
                data={chartData}
                cutMethod={`${cutMethod}`}
              />
            </ChartItem>
          </>
        </FormItem>
      </>
    </Card>
  );
};

export default CutTreeCost;
