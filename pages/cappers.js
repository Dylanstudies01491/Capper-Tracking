
import useSWR from 'swr'; import { Shell } from './_components';
const fetcher = (u)=>fetch(u).then(r=>r.json());
export default function Cappers(){
  const { data } = useSWR('/api/public/overview', fetcher);
  return (
    <Shell>
      <h2 className="headline">All Cappers</h2>
      <p className="sub">Browse every capper profile & current stats</p>
      {!data? <div style={{padding:20}}>Loading…</div> : (
        <ul style={{listStyle:'none', padding:0, marginTop:12}}>
          {data.cappers.map(c=> (
            <li key={c.id} className="card" style={{marginBottom:10}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div><h3 style={{margin:'0 0 4px 0'}}>{c.name}</h3><div className="muted">{c.bio||''}</div></div>
                <div style={{display:'flex', gap:16}}>
                  <div><div className="muted">Record</div><div className="stat">{c.record}</div></div>
                  <div><div className="muted">ROI</div><div className="stat" style={{color:c.roi>=0?'#22c55e':'#ef4444'}}>{c.roi.toFixed(1)}%</div></div>
                  <div><div className="muted">Units</div><div className="stat">{c.units.toFixed(2)}</div></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
