
import { useRouter } from 'next/router'; import { useEffect, useState } from 'react'; import { Shell } from '../../_components';
export default function Capper(){
  const router = useRouter(); const { id } = router.query;
  const [capper,setCapper]=useState(null); const [picks,setPicks]=useState([]);
  const [form,setForm]=useState({ d:new Date().toISOString().slice(0,10), stake:1, odds:1.9, outcome:'win', league:'NBA', description:'' });
  useEffect(()=>{ if(!id) return; fetch(`/api/admin/capper?id=${id}`).then(r=>r.json()).then(setCapper); load(); },[id]);
  async function load(){ if(!id) return; const r=await fetch(`/api/admin/picks?capper_id=${id}`); setPicks(await r.json()); }
  async function add(e){ e.preventDefault(); await fetch('/api/admin/picks',{method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ capper_id:id, event_date:form.d, stake:Number(form.stake), odds:Number(form.odds), outcome:form.outcome, league:form.league, description:form.description })}); setForm({...form, description:''}); load(); }
  return (<Shell>
    {!capper? <div style={{padding:40}}>Loading…</div> : (<>
      <h2 className="headline">{capper.name} — Picks</h2>
      <div className="card">
        <h3>Add Pick</h3>
        <form onSubmit={add} className="form-row">
          <input className="input" type="date" value={form.d} onChange={e=>setForm({...form,d:e.target.value})}/>
          <input className="input" type="number" step="0.01" value={form.stake} onChange={e=>setForm({...form,stake:e.target.value})} placeholder="Stake (u)"/>
          <input className="input" type="number" step="0.01" value={form.odds} onChange={e=>setForm({...form,odds:e.target.value})} placeholder="Decimal odds"/>
          <select className="input" value={form.outcome} onChange={e=>setForm({...form,outcome:e.target.value})}><option>win</option><option>loss</option><option>push</option></select>
          <input className="input" value={form.league} onChange={e=>setForm({...form,league:e.target.value})} placeholder="League"/>
          <input className="input" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description (optional)"/>
          <button className="btn">Add Pick</button>
        </form>
      </div>
      <div className="card" style={{marginTop:12}}>
        <table className="table">
          <thead><tr><th>Date</th><th>League</th><th>Description</th><th>Stake</th><th>Odds</th><th>Outcome</th></tr></thead>
          <tbody>{picks.map(p=>(<tr key={p.id}><td>{p.event_date}</td><td>{p.league||''}</td><td>{p.description||''}</td><td>{p.stake}</td><td>{p.odds}</td><td className={p.outcome}>{p.outcome}</td></tr>))}</tbody>
        </table>
      </div>
    </>)}
  </Shell>);
}
