
import { useState } from 'react'; import { Shell } from './_components';
function americanToDecimal(a){ a = Number(a); if (a>0) return 1 + (a/100); return 1 + (100/Math.abs(a)); }
export default function Calculator(){
  const [stake, setStake] = useState(1);
  const [odds, setOdds] = useState(-110);
  const [fmt, setFmt] = useState('american'); // american | decimal
  const dec = fmt==='american' ? americanToDecimal(odds) : Number(odds);
  const profitWin = stake * (dec - 1);
  const loss = -stake;
  return (
    <Shell>
      <h2 className="headline">Profit Calculator</h2>
      <p className="sub">Quickly estimate return and units for a pick</p>
      <div className="card">
        <div className="form-row">
          <label>Stake (units)<input className="input" type="number" step="0.01" value={stake} onChange={e=>setStake(Number(e.target.value))}/></label>
          <label>Odds format
            <select className="input" value={fmt} onChange={e=>setFmt(e.target.value)}>
              <option value="american">American (+150 / -120)</option>
              <option value="decimal">Decimal (2.5 / 1.83)</option>
            </select>
          </label>
          <label>Odds<input className="input" type="number" step="0.01" value={odds} onChange={e=>setOdds(e.target.value)}/></label>
        </div>
        <div className="stats" style={{marginTop:12}}>
          <div><div className="muted">Decimal odds</div><div className="stat">{dec.toFixed(3)}</div></div>
          <div><div className="muted">Profit if Win</div><div className="stat" style={{color:'#22c55e'}}>{profitWin.toFixed(2)} u</div></div>
          <div><div className="muted">If Loss</div><div className="stat" style={{color:'#ef4444'}}>{loss.toFixed(2)} u</div></div>
        </div>
      </div>
    </Shell>
  );
}
