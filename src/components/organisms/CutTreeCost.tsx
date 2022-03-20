/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable array-callback-return */
import React, { useState, VFC } from 'react';
import { Alert, Button, InputAdornment, TextField } from '@mui/material';

import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FormValues } from '../../models/FormValues';
import Card from './Card';
import FormItem from '../molecules/FormItem';
import formInformation from '../../data/FormInformation';

import ChartItem from './ChartItem';
import MoveLineChart from './MoveLineChart';

interface Props {
  cutMethod: 'thinning' | 'clearCut';
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  clearErrors: UseFormClearErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const CutTreeCost: VFC<Props> = (props) => {
  const { cutMethod, control, errors, setValue, watch, clearErrors } = props;

  const jsCutMethod = cutMethod === 'thinning' ? '間伐' : '皆伐';

  const otherCutMethod = cutMethod === 'thinning' ? 'clearCut' : 'thinning';

  const chartData: number[][] = [];
  const watchTree = watch(`${cutMethod}`);

  watchTree.price.map((_, index) => {
    chartData[index] = [
      Number.isNaN(Number(watchTree.diamter[index].value))
        ? 0
        : Number(watchTree.diamter[index].value),
        Number.isNaN(Number(watchTree.price[index].value))
        ? 0
        : Number(watchTree.price[index].value),
    ];
  });

  const tableAllErrors: string[] = [];

  if (errors[cutMethod]?.price !== undefined) {
    // @ts-ignore
    errors[cutMethod]?.price.map((value) => {
      // @ts-ignore
      tableAllErrors.push(value.value?.message);
    });
  }

  if (errors[cutMethod]?.diamter !== undefined) {
    // @ts-ignore
    errors[cutMethod]?.diamter.map((value) => {
      // @ts-ignore
      tableAllErrors.push(value.value?.message);
    });
  }

  const tableErrors = [...new Set(tableAllErrors)];

  const ArrayFields = formInformation[`${cutMethod}Other`].map(
    (information) => (
      <div className="form-field-item" key={information.id}>
        <FormItem
          title={information.title}
          description={information.description}
        >
          <Controller
            name={`${cutMethod}.other.${information.id}`}
            control={control}
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
  // 不要なレンダリングを減らすためのタイマー
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // データを参照し簡単に入力できる機能
  const onClickButton = () => {
    const watchValues = watch(otherCutMethod);
    watchValues.price.map((_, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setValue(
        `${cutMethod}.price.${index}.value`,
        watchValues.price[index].value,
      );
      setValue(
        `${cutMethod}.diamter.${index}.value`,
        watchValues.diamter[index].value,
      );
    });
  };

  return (
    <Card title={`${jsCutMethod}の費用`}>
      <>
        <div className="cut-other-field-items form-field-items">
          {ArrayFields}
        </div>
        <FormItem
          title={`${jsCutMethod}した木材の価格`}
          description="胸高直径に対する木材価格を入力してください。下のグラフを動かして変更することもできます"
        >
          <>
            <div className="cut-button">
              <Button
                variant="contained"
                type="button"
                onClick={onClickButton}
                style={{
                  marginBottom: '12px',
                  backgroundColor: 'steelblue',
                  fontSize: '16px',
                }}
              >
                {`${
                  cutMethod === 'thinning' ? '皆伐' : '間伐'
                }した木材の価格を参照する`}
              </Button>
            </div>

            <div className="form-field-items diamter-field-items">
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
                        error={Boolean(errors?.[cutMethod]?.diamter?.[index])}
                        className="form-field-item-input"
                        onChange={(e) => {
                          setValue(
                            `${cutMethod}.diamter.${index}.value`,
                            e.target.value,
                          );
                          // @ts-ignore
                          clearTimeout(timer);
                          const { diamter } = watch(`${cutMethod}`);
                          diamter.map(() => {
                            if (index !== 10) {
                              if (
                                Number(diamter[index].value) <=
                                Number(diamter[index + 1].value)
                              ) {
                                clearErrors([
                                  `${cutMethod}.diamter.${index}`,
                                  `${cutMethod}.diamter.${index + 1}`,
                                ]);
                              }
                            }
                          });

                          const newTimer = setTimeout(() => undefined, 500);
                          setTimer(newTimer);
                        }}
                      />
                    )}
                  />
                </React.Fragment>
              ))}
            </div>
            <div className="form-field-items price-field-items">
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
                        error={Boolean(errors?.[cutMethod]?.price?.[index])}
                        className="form-field-item-input"
                      />
                    )}
                  />
                </React.Fragment>
              ))}
            </div>
            {tableErrors.length >= 1 && (
              <Alert severity="error" className="alert">
                <div>
                  {tableErrors.map((tableError) => (
                    <div key={tableError}>{tableError}</div>
                  ))}
                </div>
              </Alert>
            )}
            <ChartItem axisX="胸高直径(cm)" axisY="金額(円)">
              <MoveLineChart
                top={10}
                bottom={30}
                left={65}
                right={10}
                className={`${cutMethod}-chart`}
                idName={`${cutMethod}-chart`}
                data={chartData}
                cutMethod={`${cutMethod}`}
                setValue={setValue}
                clearErrors={clearErrors}
              />
            </ChartItem>
          </>
        </FormItem>
      </>
    </Card>
  );
};

export default CutTreeCost;