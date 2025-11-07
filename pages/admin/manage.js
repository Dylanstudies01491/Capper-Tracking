
import { useEffect, useState } from 'react'; import Router from 'next/router'; import { Shell } from '../_components';
export default function Manage(){
  const [ok,setOk]=useState(false); const [list,setList]=useState([]); const [form,setForm]=useState({name:'',bio:''});
  useEffect(()=>{ fetch('/api/admin/session').then(r=>r.json()).then(d=>{ if(!d.admin) Router.push('/admin'); else setOk(true); }); load(); },[]);
  async function load(){ const r=await fetch('/api/admin/cappers'); setList(await r.json()); }
  async function add(e){ e.preventDefault(); await fetch('/api/admin/cappers',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)}); setForm({name:'',bio:''}); load(); }
  if(!ok) return <Shell><div style={{padding:40}}>Loading…</div></Shell>;
  return (<Shell>
    <h2 className="headline">Admin Panel</h2>
    <div className="card">
      <h3>Add Capper</h3>
      <form onSubmit={add} className="form-row">
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input className="input" placeholder="Bio (optional)" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/>
        <button className="btn">Add</button>
      </form>
    </div>
    <div className="grid" style={{marginTop:12}}>
      {list.map(c=> (<div className="card" key={c.id}><h3>{c.name}</h3><p className="muted">{c.bio||''}</p><a className="link" href={`/admin/capper/${c.id}`}>Manage Picks</a></div>))}
    </div>
  </Shell>);
}
