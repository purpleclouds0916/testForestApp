/* eslint-disable */
import TeX from '@matejmazur/react-katex';
import { VFC } from 'react';

import 'katex/dist/katex.min.css';
import './SelectFormula.css';
import { UseFormWatch, Control, useWatch } from 'react-hook-form';
import { FormValues } from '../../models/FormValues';
// import { TreeGrowthInput } from '../../models/TreeGrowthInput';

interface Props {
  watch: UseFormWatch<FormValues>;
  control: Control<FormValues>;
}

const SelectFormula: VFC<Props> = (props) => {
  const { watch } = props;

  const treeGrowth = watch('treeGrowth');

  return (
    <div className="sdmd-katexs-items">
      <div className="sdmd-katex-item sdmd-katex-formula">
        <TeX>{String.raw`V = ({${treeGrowth.treeVolume[0].value}}H^{{${
          treeGrowth.treeVolume[1].value
        }}}{${
          treeGrowth.treeVolume[2].value > 0
            ? `+${treeGrowth.treeVolume[2].value}`
            : `${treeGrowth.treeVolume[2].value}`
        }}H^{{${treeGrowth.treeVolume[3].value}}}/N)^{-1}`}</TeX>
        <br />
        <TeX>{String.raw`HF = {${treeGrowth.highStandShape[0].value}}{${
          treeGrowth.highStandShape[1].value > 0
            ? `+${treeGrowth.highStandShape[1].value}`
            : `${treeGrowth.highStandShape[1].value}`
        }}H{${
          treeGrowth.highStandShape[2].value > 0
            ? `+${treeGrowth.highStandShape[2].value}`
            : `${treeGrowth.highStandShape[2].value}`
        }}\sqrt{N}\cdot{H/100}`}</TeX>
        <br />
        <TeX>{String.raw`G = V/HF`}</TeX>
        <br />
        <TeX>{String.raw`\overline{dg} = 200\sqrt{G/(\pi\cdot{N})}`}</TeX>
        <br />
        <TeX>{String.raw`\overline{d} = {${treeGrowth.dbh[0].value}}{${
          treeGrowth.dbh[1].value > 0
            ? `+${treeGrowth.dbh[1].value}`
            : `${treeGrowth.dbh[1].value}`
        }}\overline{d}g{${
          treeGrowth.dbh[2].value === 0
            ? ``
            : `${
                treeGrowth.dbh[2].value > 0
                  ? `+${treeGrowth.dbh[2].value}${String.raw`\sqrt{N}\cdot{H/100}`}`
                  : `${treeGrowth.dbh[2].value}${String.raw`\sqrt{N}\cdot{H/100}`}`
              }`
        }}`}</TeX>
        <br />
        <TeX>{String.raw`\overline{R\footnotesize{y}} = V/V\tiny {Rf}`}</TeX>
        <br />
        <TeX>{String.raw`{V\tiny{Rf}} = ({${treeGrowth.treeVolume[0].value}}H^{${
          treeGrowth.treeVolume[1].value
        }}{${
          treeGrowth.treeVolume[2].value > 0
            ? `+${treeGrowth.treeVolume[2].value}`
            : `${treeGrowth.treeVolume[2].value}`
        }}H^{${treeGrowth.treeVolume[3].value}}/{N\tiny{Rf}})^{-1}`}</TeX>
        <br />
        <TeX>{String.raw`\log{N\tiny{Rf}} = {${treeGrowth.nrf}}{${
          Math.round(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (treeGrowth.treeVolume[3].value - treeGrowth.treeVolume[1].value) *
              100000,
          ) / 100000
        }}\log{H}`}</TeX>
      </div>

      <div className="sdmd-katex-item sdmd-katex-description">
        <div className="explanation-item">
          <TeX>{String.raw`{\text{V:ha当たり材積}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`{\text{H:上層樹高}}`}</TeX>
        </div>
        <div className="explanation-item">
          <TeX>{String.raw`{\text{N:ha当たり本数}}`}</TeX>
        </div>
        <div className="explanation-item">
          <TeX>{String.raw`{\text{HF:林分形状高}}`}</TeX>
        </div>
        <div className="explanation-item">
          <TeX>{String.raw`{\text{G:ha当たり断面積}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`\overline{dg}{\text{:断面積平均直径}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`\overline{d}{\text{:平均胸腔直径}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`\overline{R\footnotesize{y}}{\text{:収穫比数}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`{V\tiny{Rf}}{\text{:最多密度におけるha当たり材積}}`}</TeX>
        </div>

        <div className="explanation-item">
          <TeX>{String.raw`{N\tiny{Rf}}{\text{:最多密度におけるha当たり本数}}`}</TeX>
        </div>
      </div>
    </div>
  );
};

export default SelectFormula;
