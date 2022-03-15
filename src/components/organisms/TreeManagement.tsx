import React, { VFC } from 'react';
import { ManagementInput } from '../../models/ManagementInput';
import formInformation from '../../data/FormInformation';
import FormObject from '../molecules/FormObject';
import Card from './Card';

interface Props {
  inputValues: ManagementInput;
  setInputValue: React.Dispatch<React.SetStateAction<ManagementInput>>;
}

const TreeManagement: VFC<Props> = React.memo((props) => {
  const { inputValues, setInputValue } = props;

  return (
    <Card title="経営方法の詳細">
      <FormObject
        formInformation={formInformation.management}
        inputValues={inputValues}
        setInputValue={setInputValue}
        className="management-field-items"
      />
    </Card>
  );
});

export default TreeManagement;
