import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import './TreeHeightGrowthDescription.css';
import { VFC } from 'react';

const TreeHeightGrowthDescription: VFC = () => (
  <>
    林齢<TeX>{String.raw`t`}</TeX>における樹高
    <TeX>{String.raw`H`}</TeX>は以下の式で表されます
    <div className="sdmd-katexs-items tree-height-item">
      <TeX>{String.raw`\color{black}H(t) = \textcolor{red}a[1-\exp\lbrace-\textcolor{red}b(t-\textcolor{red}c)\rbrace]\color{red}^d`}</TeX>
    </div>
    例：高知県におけるスギの3等地 <TeX>{String.raw`a`}</TeX>:62.37996, <TeX>{String.raw`b`}</TeX>
    :0.00446:, <TeX>{String.raw`c`}</TeX>:0, <TeX>{String.raw`d`}</TeX>:0.67572
    <br /> 例：高知県におけるヒノキの3等地 <TeX>{String.raw`a`}</TeX>:32.84414,
    <TeX>{String.raw`b`}</TeX>:0.01360:, <TeX>{String.raw`c`}</TeX>:0, <TeX>{String.raw`d`}</TeX>:0.92438
  </>
);

export default TreeHeightGrowthDescription;
