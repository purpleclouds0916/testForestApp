/* eslint-disable  */
import { useState, VFC } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TreePriceInput } from '../../models/TreePriceInput';
import IsCalculation from '../Atoms/IsCalculations';
import TreeManagement from '../organisms/TreeManagement';
import TreeGrowth from '../organisms/TreeGrowth';
import CutTreeCost from '../organisms/CutTreeCost';
import { CalculationResultType } from '../../models/CalculationResult';
import { InputValuesTs } from '../../models/InputValues';
import testFormData from '../../data/testFormData.json';
import { AppDispatch } from '../../redux/store';
import { addCalculationResult } from '../../redux/CalculationResultSlice';
import './FormPage.css';
import defaultInputValues from '../../data/DefaultData';
import { TreeGrowthInput } from '../../models/TreeGrowthInput';
import { ManagementInput } from '../../models/ManagementInput';
import { CutOtherInput } from '../../models/CutOtherInput';

const FormPage: VFC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // const [inputValues, setInputValue] =
  //   useState<InputValuesTs>(defaultInputValues);
  // formのvalueの値をまとめると、レンダリングの範囲が広くなり、ページが遅くなるので分けた。
  const [treeGrowthValues, setTreeGrowthValues] = useState<TreeGrowthInput>(
    defaultInputValues.treeGrowth,
  );
  const [managementValues, setManagementValues] = useState<ManagementInput>(
    defaultInputValues.management,
  );
  const [thinningOtherValues, setThinningOtherValues] = useState<CutOtherInput>(
    defaultInputValues.thinning.thinningOther,
  );
  const [thinningPriceValues, setThinningPriceValues] =
    useState<TreePriceInput>(defaultInputValues.thinning.sell);

  const [clearCutOtherValues, setClearCutOtherValues] = useState<CutOtherInput>(
    defaultInputValues.clearCut.clearCutOther,
  );
  const [clearCutPriceValues, setClearCutPriceValues] =
    useState<TreePriceInput>(defaultInputValues.clearCut.sell);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    // e.preventDefault();
    // setLoading(true);
    // const submitApiData = {
    //   SH: {
    //     YieldModelType: 'S',
    //     SAType: '2021',
    //     SDMD: {
    //       NRf: inputValues.nrf,
    //       H: [
    //         inputValues.treeHeight[0],
    //         -Math.exp(
    //           Number(inputValues.treeHeight[1]) *
    //             Number(inputValues.treeHeight[2]),
    //         ),
    //         -inputValues.treeHeight[1],
    //         inputValues.treeHeight[3],
    //       ],
    //       V: inputValues.treeVolume,
    //       DBH: inputValues.dbh,
    //       HF: inputValues.highStandShape,
    //     },
    //     Density: {
    //       Plant: [
    //         inputValues.management.minimumDensity,
    //         inputValues.management.maximumDensity,
    //       ],
    //       MinimumAtClearcut: inputValues.management.minimumClearcut,
    //     },
    //     RegenerationCost: [
    //       inputValues.management.reforestationCost,
    //       inputValues.management.priceSaplings,
    //     ],
    //     ThinningPercent: [
    //       inputValues.management.minimumThinning,
    //       inputValues.management.maximumThinning,
    //     ],
    //     AnnualInterestPercent: inputValues.management.annualProfit,
    //     HarvestingAges: [
    //       inputValues.management.ageOfStartThinning,
    //       inputValues.management.ageOfEndThinning,
    //       inputValues.management.thinningInterval,
    //     ],
    //     MaxNumOfHarvest: inputValues.management.maximumNumberOfThinning,
    //     NumSearch: [3, 10000],
    //     Thinning: {
    //       YieldRate: inputValues.thinningOther.thinningYieldRate,
    //       Cost: inputValues.thinningOther.thinningCost,
    //       StumpHeight: inputValues.thinningOther.thinningStumpHeight,
    //       Diameter: inputValues.thinningDiamter,
    //       Price: inputValues.thinningPrice,
    //     },
    //     Clearcut: {
    //       YieldRate: inputValues.clearCutOther.clearCutYieldRate,
    //       Cost: inputValues.clearCutOther.clearCutCost,
    //       StumpHeight: inputValues.clearCutOther.clearCutStumpHeight,
    //       Diameter: inputValues.clearCutDiamter,
    //       Price: inputValues.clearCutPrice,
    //     },
    //     SA: {
    //       Comment: 'Type L 1000 yen/ha degradation for SEV',
    //       NumRepeat: 40,
    //       NumTempLevel: 100,
    //       MetaSearchPercentile: 0.75,
    //       NumTotalLoopN: [1, 8],
    //       NumTotalLoopPow: [3.55, 6.75],
    //       StartTemp: [0, -0.6, 0.6, 5],
    //       DiffTemp: [0, -3.8, 1.4, 5],
    //       DistScale: [0, -1.2, 0.6, 5],
    //     },
    //   },
    // };
    // // ※高知大学のWi-Fiを利用しないと必ずエラーになる(セキュリティの関係上)
    // void axios
    //   .post<CalculationResultType>('/calculation/', submitApiData)
    //   .then((res) => {
    //     dispatch(
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //       addCalculationResult(JSON.parse(res.data as unknown as string)),
    //     );
    //     navigate('/submit');
    //   })
    //   .catch(() => {
    //     // 以下はテストように開発
    //     // eslint-disable-next-line no-alert
    //     alert('計算に失敗しました。これより、デモの計算結果ページに遷移します');
    //     dispatch(addCalculationResult(testFormData));
    //     navigate('/submit');
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TreeGrowth
        inputValues={treeGrowthValues}
        setInputValue={setTreeGrowthValues}
      />
      <TreeManagement
        inputValues={managementValues}
        setInputValue={setManagementValues}
      />
      <CutTreeCost
        otherInputValues={thinningOtherValues}
        setOtherInputValue={setThinningOtherValues}
        cutMethod="thinning"
        treePriceInputValues={thinningPriceValues}
        setTreePriceInputValue={setThinningPriceValues}
      />

      <CutTreeCost
        otherInputValues={clearCutOtherValues}
        setOtherInputValue={setClearCutOtherValues}
        treePriceInputValues={clearCutPriceValues}
        setTreePriceInputValue={setClearCutPriceValues}
        cutMethod="clearCut"
      />
      <input className="submit-button" type="submit" value="計算する" />
      {loading && <IsCalculation />}
    </form>
  );
};

export default FormPage;
