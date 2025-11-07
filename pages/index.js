
import useSWR from 'swr';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import { Shell } from '../components/Shell';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);
const fetcher = (u)=>fetch(u).then(r=>r.json());

export default function Home(){
  const { data } = useSWR('/api/public/overview', fetcher, { refreshInterval: 60000 });
  if(!data) return <Shell><div style={{padding:40}}>Loading...</div></Shell>;
  return (
    <Shell>
      <h2 className="headline">Performance Dashboard</h2>
      <p className="sub">Summary of all plays • Stats based on listed units • Ranked by ROI</p>
      <div className="grid">
        {data.cappers.map(c => (
          <div className="card" key={c.id}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8}}>
              <div><h3 style={{margin:'0 0 6px 0'}}>{c.name}</h3><div className="muted">{c.bio || ''}</div></div>
              <span className="badge">Record {c.record}</span>
            </div>
            <div className="stats">
              <div><div className="muted">ROI</div><div className="stat" style={{color:c.roi>=0?'#22c55e':'#ef4444'}}>{c.roi.toFixed(1)}%</div></div>
              <div><div className="muted">Units</div><div className="stat">{c.units.toFixed(2)}</div></div>
            </div>
            <div style={{marginTop:10}}>
              <Line
                data={{
                  labels: c.chart.labels,
                  datasets: [{
                    label: 'Cumulative Units',
                    data: c.chart.data,
                    fill: true,
                    tension: 0.35,
                    backgroundColor: 'rgba(251, 191, 36, 0.12)',
                    borderColor: '#fbbf24',
                    pointRadius: 0
                  }]
                }}
                options={{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ x:{ display:false }, y:{ grid:{ color:'rgba(255,255,255,0.08)' }}} }}
                height={120}
              />
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
