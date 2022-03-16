/* eslint-disable  */
import { VFC } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import FormArray from '../molecules/FormArray';
import Card from './Card';
import FormObject from '../molecules/FormObject';
import FormItem from '../molecules/FormItem';
import formInformation from '../../data/FormInformation';

import ChartItem from './ChartItem';
import MoveLineChart from './MoveLineChart';
import { CutOtherInput } from '../../models/CutOtherInput';
import { TreePriceInput } from '../../models/TreePriceInput';
import { FormValues } from 'models/FormValues';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import React from 'react';

interface Props {
  cutMethod: 'thinning' | 'clearCut';
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const CutTreeCost: VFC<Props> = (props) => {
  const { cutMethod, control, errors, register, setValue, watch } = props;

  const jsCutMethod = cutMethod === 'thinning' ? '間伐' : '皆伐';

  const chartData: number[][] = [];
  const watchTree = watch(`${cutMethod}`)

  // eslint-disable-next-line array-callback-return
  watchTree.price.map((_, index) => {
    chartData[index] = [
      Number(watchTree.diamter[index].value),
      Number(watchTree.price[index].value),
    ];
  });
  // const Testdata =[[1,2],[10,20],[15,22],[16,20],[19,2],[22,20],[24,2000],[28,2000],[31,200],[33,2000],[35,2900],]

  const ArrayFields = formInformation[`${cutMethod}Other`].map(
    (information) => (
      <div className="form-field-item" key={information.id}>
        <FormItem
          title={information.title}
          description={information.description}
        >
          <>
            <Controller
              name={`${cutMethod}.other.${information.id}`}
              control={props.control}
              defaultValue={information.defaultValue}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="form-field-item-input"
                  error={Boolean(
                    errors?.[`${cutMethod}`]?.other?.[information.id],
                  )}
                  helperText={
                    errors?.[`${cutMethod}`]?.other?.[information.id] &&
                    errors?.[`${cutMethod}`]?.other?.[information.id]?.message
                  }
                  InputProps={
                    information.unit
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              {information.unit}
                            </InputAdornment>
                          ),
                        }
                      : undefined
                  }
                />
              )}
            />
          </>
        </FormItem>
      </div>
    ),
  );

  const { fields: treePriceFields } = useFieldArray({
    control,
    name: `${cutMethod}.price`,
  });
  const { fields: treeDiamterFields } = useFieldArray({
    control,
    name: `${cutMethod}.diamter`,
  });

  return (
    <Card title={`${jsCutMethod}の費用`}>
      <>
        <div className={`cut-other-field-items` + `form-field-items`}>
          {ArrayFields}
        </div>
        <FormItem
          title={`${jsCutMethod}した木材の価格`}
          description="胸高直径に対する木材価格を入力してください。下のグラフを動かして変更することもできます"
        >
          <>
            <div className={'form-field-items diamter-field-items'}>
              <>
                <TextField
                  disabled
                  className="table-title"
                  defaultValue="胸高直径(cm)"
                />
                {treeDiamterFields.map((treeDiamterField, index) => (
                  <React.Fragment key={treeDiamterField.id}>
                    <Controller
                      control={control}
                      name={`${cutMethod}.diamter.${index}.value`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="form-field-item-input"
                        />
                      )}
                    />
                  </React.Fragment>
                ))}
              </>
            </div>
            <div className={'form-field-items price-field-items'}>
              <>
                <TextField
                  disabled
                  className="table-title"
                  defaultValue="価格(円)"
                />
                {treePriceFields.map((treePriceField, index) => (
                  <React.Fragment key={treePriceField.id}>
                    <Controller
                      control={control}
                      name={`${cutMethod}.price.${index}.value`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="form-field-item-input"
                        />
                      )}
                    />
                  </React.Fragment>
                ))}
              </>
            </div>
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
                setValue={setValue}
                // treePriceInputValues={treePriceInputValues}
                // setTreePriceInputValue={setTreePriceInputValue}
              />
            </ChartItem>
            {/* <ChartItem axisX="胸高直径(cm)" axisY="金額(円)">
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
            </ChartItem> */}
          </>
        </FormItem>
      </>
    </Card>
  );
};

export default CutTreeCost;
