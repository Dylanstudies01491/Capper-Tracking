
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
export default async function handler(req,res){
  const { data: cappers, error: e1 } = await supabaseAdmin.from('cappers').select('*').order('created_at',{ascending:true});
  if (e1) return res.status(500).json({ error: e1.message });
  const results = [];
  for (const c of cappers){
    const { data: picks } = await supabaseAdmin.from('picks').select('*').eq('capper_id', c.id).order('event_date',{ascending:true});
    let W=0,L=0,P=0, staked=0, units=0, cum=0;
    const labels=[], series=[];
    for (const p of (picks||[])){
      staked += Number(p.stake);
      let u=0;
      if (p.outcome==='win'){ u = Number(p.stake)*(Number(p.odds)-1); W++; }
      else if (p.outcome==='loss'){ u = -Number(p.stake); L++; }
      else { u = 0; P++; }
      units += u; cum += u;
      labels.push(new Date(p.event_date).toISOString().slice(0,10));
      series.push(Number(cum.toFixed(4)));
    }
    const roi = staked>0 ? (units/staked)*100 : 0;
    results.push({ id:c.id, name:c.name, bio:c.bio, record:`${W}-${L}-${P}`, units, roi, chart:{ labels, data: series } });
  }
  res.json({ cappers: results });
}
