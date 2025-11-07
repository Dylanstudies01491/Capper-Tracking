
import useSWR from 'swr'; import { Shell } from './_components';
const fetcher = (u)=>fetch(u).then(r=>r.json());
export default function Leaderboards(){
  const { data } = useSWR('/api/public/leaderboard?range=30', fetcher);
  return (
    <Shell>
      <h2 className="headline">Leaderboards by ROI</h2>
      <p className="sub">Last 30 days (change ?range=7 or ?range=90 on the API)</p>
      {!data? <div style={{padding:20}}>Loading…</div> : (
        <div className="grid">
          {data.rows.map((r, i)=> (
            <div className="card" key={r.id}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <h3>#{i+1} {r.name}</h3><span className="badge">{r.record}</span>
              </div>
              <div className="stats">
                <div><div className="muted">ROI</div><div className="stat" style={{color:r.roi>=0?'#22c55e':'#ef4444'}}>{r.roi.toFixed(1)}%</div></div>
                <div><div className="muted">Units</div><div className="stat">{r.units.toFixed(2)}</div></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}
