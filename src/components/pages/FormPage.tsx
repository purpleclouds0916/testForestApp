import { useState, VFC } from 'react';

import FormCard from '../organisms/FormCard';
import Form from '../molecules/Form';

import defaultData from '../../data/DefaultData';
import sdmdData from '../../data/SdmdData';
import management from '../../data/ManagementData';
import treePriceAndDiamterData from '../../data/TreePriceAndDiamterData';

import { FormState } from '../../models/FormState';

const FormPage: VFC = () => {
  const [inputValues, setInputValue] = useState<{
    treeHeight: FormState[];
    treeVolume: FormState[];
    nrf: FormState[];
    dbh: FormState[];
    management: FormState[];
    thinningOther: FormState[];
    thinningPrice: FormState[];
    thinningDiamter: FormState[];
    clearCutOther: FormState[];
    clearCutPrice: FormState[];
    clearCutDiamter: FormState[];
  }>({
    treeHeight: defaultData.treeHeight,
    treeVolume: defaultData.treeVolume,
    nrf: defaultData.nrf,
    dbh: defaultData.dbh,
    management: defaultData.management,
    thinningOther: defaultData.thinningOther,
    thinningPrice: defaultData.treePrice,
    thinningDiamter: defaultData.treeDiamter,
    clearCutOther: defaultData.clearCutOther,
    clearCutPrice: defaultData.treePrice,
    clearCutDiamter: defaultData.treeDiamter,
  });

  const handleSubmit = () => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(inputValues));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="林分の成長">
        <>
          <Form
            formInformation={sdmdData.treeHeight}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="treeHeight"
          />
          <Form
            formInformation={sdmdData.treeVolume}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="treeVolume"
            className='display-none'
          />
          <Form
            formInformation={sdmdData.nrf}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="nrf"
            className='display-none'
          />
          <Form
            formInformation={sdmdData.dbh}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="dbh"
            className='display-none'
          />
        </>
      </FormCard>
      <FormCard title="経営方法の詳細">
        <Form
          formInformation={management}
          inputValues={inputValues}
          setInputValue={setInputValue}
          category="management"
        />
      </FormCard>
      <FormCard title="間伐材の費用">
        <>
          <Form
            formInformation={treePriceAndDiamterData.treeThinningCutInformation}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="thinningOther"
          />
          <Form
            formInformation={treePriceAndDiamterData.priceFormInformation}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="thinningPrice"

          />
          <Form
            formInformation={treePriceAndDiamterData.diamterFormInformation}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="thinningDiamter"
          />
        </>
      </FormCard>
      <FormCard title="間伐材の費用">
        <>
          <Form
            formInformation={treePriceAndDiamterData.treeClearCutInformation}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="clearCutOther"
          />
          <Form
            formInformation={treePriceAndDiamterData.priceFormInformation}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="clearCutPrice"
          />
          <Form
            formInformation={treePriceAndDiamterData.diamterFormInformation}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="clearCutDiamter"
          />
        </>
      </FormCard>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormPage;
