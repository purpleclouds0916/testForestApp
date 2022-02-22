/* eslint-disable */
import { useState, VFC } from 'react';

import FormCard from '../organisms/FormCard';
import FormObject from '../molecules/FormObject';
import FormArray from '../molecules/FormArray';

import { Management } from '../../models/ManagementModels';
import { ThinningOtherTs } from '../../models/ThinningOther';
import { ClearCutOtherTs } from '../../models/ClearCutOther';

import formInformation from '../../data/FormInformation';
import defaultData from '../../data/DefaultData';
import FormNormal from 'components/Atoms/FormNormal';

const FormPage: VFC = () => {
  const [inputValues, setInputValue] = useState<{
    treeHeight: Array<number | string>;
    treeVolume: Array<number | string>;
    highStandShape: Array<number | string>;
    dbh: Array<number | string>;
    nrf: number | string;
    management: Management;
    thinningOther: ThinningOtherTs;
    thinningPrice: Array<number | string>;
    thinningDiamter: Array<number | string>;
    clearCutOther: ClearCutOtherTs;
    clearCutPrice: Array<number | string>;
    clearCutDiamter: Array<number | string>;
  }>({
    treeHeight: defaultData.treeHeight,
    treeVolume: defaultData.treeVolume,
    highStandShape: defaultData.highStandShape,
    dbh: defaultData.dbh,
    nrf: 5.992602,
    management: defaultData.management,
    thinningOther: defaultData.thinningOther,
    thinningPrice: defaultData.treePrice,
    thinningDiamter: defaultData.treeDiamter,
    clearCutOther: defaultData.clearCutOther,
    clearCutPrice: defaultData.treePrice,
    clearCutDiamter: defaultData.treeDiamter,
  });

  const handleSubmit = () => {
    const submitApiData = {
      SDMD: {
        NRf: inputValues.nrf,
        H: inputValues.treeHeight,
        V: inputValues.treeVolume,
        DBH: inputValues.dbh,
        HF: inputValues.highStandShape,
      },
      Density: {
        Plant: [
          inputValues.management.minimumDensity,
          inputValues.management.maximumDensity,
        ],
        Minimum: inputValues.management.minimumClearcut,
      },
      RegenerationCost: [
        inputValues.management.reforestationCost,
        inputValues.management.priceSaplings,
      ],
      ThinningPercent: [
        inputValues.management.minimumThinning,
        inputValues.management.maximumThinning,
      ],
      AnnualInterestPercent: inputValues.management.annualProfit,
      HarvestingAges: [
        inputValues.management.ageOfStartThinning,
        inputValues.management.ageOfEndThinning,
        inputValues.management.thinningInterval,
      ],
      MaxNumOfHarvest: inputValues.management.maximumNumberOfThinning,
      Thinning: {
        YieldRate: inputValues.thinningOther.thinningYieldRate,
        Cost: inputValues.thinningOther.thinningCost,
        StumpHeight: inputValues.thinningOther.thinningStumpHeight,
        Diameter: inputValues.thinningDiamter,
        Price: inputValues.thinningPrice,
      },
      Clearcut: {
        YieldRate: inputValues.clearCutOther.clearCutYieldRate,
        Cost: inputValues.clearCutOther.clearCutCost,
        StumpHeight: inputValues.clearCutOther.clearCutStumpHeight,
        Diameter: inputValues.clearCutDiamter,
        Price: inputValues.clearCutPrice,
      },
    };
    alert(JSON.stringify(submitApiData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title="林分の成長">
        <>
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="treeHeight"
            className="tree-height-field-items"
          />
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
        </>
      </FormCard>
      <FormCard title="経営方法の詳細">
        <FormObject
          formInformation={formInformation.management}
          inputValues={inputValues}
          setInputValue={setInputValue}
          category="management"
          className="management-field-items"
        />
      </FormCard>
      <FormCard title="間伐材の費用">
        <>
          <FormObject
            formInformation={formInformation.thinningOther}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="thinningOther"
            className="other-items"
          />
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="thinningPrice"
            className="price-items"
          />
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="thinningDiamter"
            className="diamter-items"
          />
        </>
      </FormCard>

      <FormCard title="間伐材の費用">
        <>
          <FormObject
            formInformation={formInformation.clearCutOther}
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="clearCutOther"
            className="other-items"
          />
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="clearCutPrice"
            className="price-items"
          />
          <FormArray
            inputValues={inputValues}
            setInputValue={setInputValue}
            category="clearCutDiamter"
            className="diamter-items"
          />
        </>
      </FormCard>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormPage;
