
import { useEffect, useState } from 'react'; import Router from 'next/router'; import { Shell } from '../_components';
export default function Admin(){
  const [ok,setOk]=useState(false); const [loading,setLoading]=useState(true); const [pw,setPw]=useState('');
  useEffect(()=>{ fetch('/api/admin/session').then(r=>r.json()).then(d=>{ setOk(d.admin===true); setLoading(false); }); },[]);
  async function login(e){ e.preventDefault(); const r=await fetch('/api/admin/login',{method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ password: pw })}); if(r.ok) Router.push('/admin/manage'); else alert('Wrong password'); }
  return (<Shell>{loading? <div style={{padding:40}}>Checking…</div> : !ok ? (<div className="card"><h3>Admin Login</h3><form onSubmit={login}><input className="input" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}/> <button className="btn">Login</button></form><p className="muted">Default: Truth99 (set ADMIN_PASSWORD env)</p></div>) : (<div className="card"><a className="link" href="/admin/manage">Open Admin Panel</a></div>)}</Shell>); }
