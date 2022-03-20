/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, VFC } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import formInformation from '../../data/FormInformation';
import Card from './Card';
import FormItem from '../molecules/FormItem';
import { FormValues } from '../../models/FormValues';

interface Props {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  clearErrors: UseFormClearErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

const TreeManagement: VFC<Props> = React.memo((props) => {
  const { control, errors, watch, clearErrors, setValue } = props;
  // 不要なレンダリングを減らすためのタイマー
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  // yupでwhenを使った時に、変更中のテキストの値を見ることができないため、依存関係のエラー解除を実装できなかった
  // なので無理矢理onChangeで実装している
  const onChange = () => {
    clearTimeout(timer as unknown as NodeJS.Timeout);
    const {
      maximumDensity,
      minimumDensity,
      minimumClearcut,
      minimumThinning,
      maximumThinning,
      ageOfStartThinning,
      ageOfEndThinning,
    } = watch(`management`);
    if (Number(minimumDensity) < Number(maximumDensity)) {
      clearErrors(['management.minimumDensity', 'management.maximumDensity']);
    }
    if (Number(minimumClearcut) < Number(minimumDensity)) {
      clearErrors(['management.minimumClearcut']);
    }
    if (Number(minimumThinning) < Number(maximumThinning)) {
      clearErrors(['management.minimumThinning', 'management.maximumThinning']);
    }
    if (Number(ageOfStartThinning) < Number(ageOfEndThinning)) {
      clearErrors([
        'management.ageOfStartThinning',
        'management.ageOfEndThinning',
      ]);
    }

    const newTimer = setTimeout(() => undefined, 500);
    setTimer(newTimer);
  };

  const ArrayFields = formInformation.management.map((information) => (
    <div className="form-field-item" key={information.id}>
      <FormItem title={information.title} description={information.description}>
        <Controller
          name={`management.${information.id}`}
          control={control}
          defaultValue={information.defaultValue}
          render={({ field }) => (
            <TextField
              {...field}
              className="form-field-item-input"
              error={Boolean(errors?.management?.[information.id])}
              helperText={
                errors?.management?.[information.id] &&
                errors?.management?.[information.id]?.message
              }
              onChange={(e) => {
                setValue(`management.${information.id}`, e.target.value);
                onChange();
              }}
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
  ));

  return (
    <Card title="経営方法の詳細">
      <div className="form-field-items management-field-items">
        {ArrayFields}
      </div>
    </Card>
  );
});

export default TreeManagement;
