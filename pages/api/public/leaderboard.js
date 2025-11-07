
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
export default async function handler(req,res){
  const range = Number(req.query.range || 30);
  const since = new Date(Date.now() - range*24*60*60*1000).toISOString().slice(0,10);
  const { data: cappers } = await supabaseAdmin.from('cappers').select('*');
  const rows = [];
  for (const c of (cappers||[])){
    const { data: picks } = await supabaseAdmin.from('picks').select('*').eq('capper_id', c.id).gte('event_date', since).order('event_date', {ascending:true});
    let W=0,L=0,P=0, stake=0, units=0;
    for (const p of (picks||[])){
      stake += Number(p.stake);
      if (p.outcome==='win'){ units += Number(p.stake)*(Number(p.odds)-1); W++; }
      else if (p.outcome==='loss'){ units -= Number(p.stake); L++; }
      else { P++; }
    }
    const roi = stake>0 ? (units/stake)*100 : 0;
    rows.push({ id:c.id, name:c.name, record:`${W}-${L}-${P}`, units, roi });
  }
  rows.sort((a,b)=> b.roi - a.roi);
  res.json({ rows });
}
