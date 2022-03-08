/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, VFC } from 'react';
import { useSelector } from 'react-redux';
import ArrowDown from '../Atoms/ArrowDown';
// import { BsFillArrowDownCircleFill } from 'react-icons/bs';
// import { IconContext } from 'react-icons';
import { RootState } from '../../redux/store';
import Card from '../organisms/Card';
import './ResultPage.css';
import ResultLineChart from '../organisms/ResultLineChart';
import ChartItem from '../organisms/ChartItem';

// import ResultLineChart from '../organism/ResultLineChart';
// import arrow from '../../img/arrow.jpeg';

// import './Result.css';

const Result: VFC = () => {
  const calculationResult = useSelector((state: RootState) => state);

  const ageforest = calculationResult.SH_S.Stand_simulation.T;
  const treeHeight = calculationResult.SH_S.Stand_simulation.H;
  const standDensity = calculationResult.SH_S.Stand_simulation.N;
  const standVolume = calculationResult.SH_S.Stand_simulation.V;
  const DBH = calculationResult.SH_S.Stand_simulation.D;
  const cutAllMony =
    calculationResult.SH_S.Stand_simulation.Value_of_standing_trees_no_discount;

  const treeHeightData: number[][] = [];
  const standDensityData: number[][] = [];
  const dbhData: number[][] = [];
  const cutAllMonyData: number[][] = [];
  const standVolumeData: number[][] = [];
  // eslint-disable-next-line array-callback-return
  ageforest.map((_, index) => {
    treeHeightData[index] = [ageforest[index], treeHeight[index]];
    standDensityData[index] = [ageforest[index], standDensity[index]];
    dbhData[index] = [ageforest[index], DBH[index]];
    cutAllMonyData[index] = [ageforest[index], cutAllMony[index]];
    standVolumeData[index] = [ageforest[index], standVolume[index]];
  });

  return (
    <div className="result-wrapper">
      <Card title="提案された施業方法">
        <>
          <div className="result-cards">
            <Card>
              <>
                <ul className="result-card-item">
                  <li>植林密度</li>
                  <li>{calculationResult.SH_S.Optimal_solution.N[0]}本/ha</li>
                </ul>
                <ArrowDown />
              </>
            </Card>

            <>
              {calculationResult.SH_S.Optimal_solution.T.map(
                (_item: number, i: number) => (
                  <Card key={i}>
                    <>
                      <ul className="result-card-item">
                        {/* 一番最後の要素で条件分岐 */}
                        {calculationResult.SH_S.Optimal_solution.T.length -
                          1 !==
                        i ? (
                          <li>{i + 1}回目の間伐のタイミング</li>
                        ) : (
                          <li>伐期</li>
                        )}

                        <li>
                          {calculationResult.SH_S.Optimal_solution.T[i]}年
                        </li>
                      </ul>

                      {/* 一番最後の要素以外で表示 */}
                      {calculationResult.SH_S.Optimal_solution.T.length - 1 !==
                        i && (
                        <ul className="result-card-item">
                          <li>間伐後の植林密度</li>
                          <li>
                            {calculationResult.SH_S.Optimal_solution.N[i + 1]}
                            本/ha
                          </li>
                        </ul>
                      )}

                      <ul className="result-card-item">
                        <li>収穫材積</li>
                        <li>
                          {calculationResult.SH_S.Optimal_solution.Y[i]}m
                          <span className="Exponentiation">3</span>
                        </li>
                      </ul>

                      <ul className="result-card-item result-card-last-item">
                        <li>収益</li>
                        <li>
                          {
                            calculationResult.SH_S.Optimal_solution
                              .Harvesting_profit_no_discount[i]
                          }
                          円
                        </li>
                      </ul>

                      {/* 一番最後の要素以外で表示 */}
                      {calculationResult.SH_S.Optimal_solution.T.length - 1 !==
                        i && <ArrowDown />}
                    </>
                  </Card>
                ),
              )}
            </>
          </div>
          <ul className="result-sev">
            <li>
              この施業の土地希望価(SEV)<span className="hidden-sp">：</span>
            </li>
            <li>{calculationResult.SH_S.Optimal_solution.SEV}円</li>
          </ul>
        </>
      </Card>
      <Card title="計算結果の詳細">
        <>
          <ChartItem axisX="樹齢(年)" axisY="樹高(m)" title="樹高の推移">
            <ResultLineChart
              top={10}
              bottom={30}
              left={65}
              right={10}
              idName="tree-height-chart"
              data={treeHeightData}
              yaxisUnit="m"
              yaxisTitle="樹高"
            />
          </ChartItem>
          <ChartItem
            axisX="樹齢(年)"
            axisY="胸高直径(cm)"
            title="平均胸高直径の推移"
          >
            <ResultLineChart
              top={10}
              bottom={30}
              left={65}
              right={10}
              idName="dbh-chart"
              data={dbhData}
              yaxisUnit="cm"
              yaxisTitle="胸高直径"
            />
          </ChartItem>
          <ChartItem
            axisX="樹齢(年)"
            axisY="林分材積(㎥)"
            title="平均胸高直径の推移"
          >
            <ResultLineChart
              top={10}
              bottom={30}
              left={65}
              right={10}
              idName="stand-volume-chart"
              data={standVolumeData}
              yaxisUnit="㎥"
              yaxisTitle="林分材積"
            />
          </ChartItem>
          <ChartItem
            axisX="樹齢(年)"
            axisY="立木密度(本/ha)"
            title="立木密度の推移"
          >
            <ResultLineChart
              top={10}
              bottom={30}
              left={65}
              right={10}
              idName="stand-density-chart"
              data={standDensityData}
              yaxisUnit="本/ha"
              yaxisTitle="立木密度"
              increaseYaxis={500}
            />
          </ChartItem>
          <ChartItem axisX="樹齢(年)" axisY="金額(万円)" title="林分の価値の推移">
            <ResultLineChart
              top={10}
              bottom={30}
              left={65}
              right={10}
              idName="cut-all-mony-chart"
              data={cutAllMonyData}
              yaxisUnit="万円"
              yaxisTitle="金額"
              displayUnit={10000}
            />
          </ChartItem>
        </>
      </Card>

      {/* <div className="chart-wrapper">
        <div className="card">
          <div className="result-title">施業方法の詳細</div>
          <div className="">
            <div className="chart-items">
              <ResultLineChart
                title="樹高の推移"
                arrayX={ageforest}
                arrayY={treeHeight}
                DigitsOfYaxis={10}
                yaxisTitle="樹高"
                yaxisUnit="m"
                tooltipWidth={90}
              />
              <ResultLineChart
                title="立木密度の推移"
                arrayX={ageforest}
                arrayY={standDensity}
                DigitsOfYaxis={1000}
                yaxisTitle="立木密度"
                yaxisUnit="本/ha"
                tooltipWidth={150}
              />
              <ResultLineChart
                title="林分材積の推移"
                arrayX={ageforest}
                arrayY={ForestStandTimberArea}
                DigitsOfYaxis={100}
                yaxisTitle="材積"
                yaxisUnit="㎥"
                tooltipWidth={90}
              />
              <ResultLineChart
                title="平均胸高直径の推移"
                arrayX={ageforest}
                arrayY={DBH}
                DigitsOfYaxis={10}
                yaxisTitle="胸高直径"
                yaxisUnit="cm"
                tooltipWidth={110}
              />
              <ResultLineChart
                title="林分の価値"
                arrayX={ageforest}
                arrayY={cutAllMony}
                DigitsOfYaxis={1000000}
                yaxisTitle="金額"
                yaxisUnit="万円"
                tooltipWidth={100}
                givenInUnits={10000}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Result;
