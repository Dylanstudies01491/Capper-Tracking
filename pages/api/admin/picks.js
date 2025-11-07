
import { supabaseAdmin } from '../../../lib/supabaseAdmin'; import { verifyAdmin } from '../../../lib/adminUtil';
export default async function handler(req,res){
  if(!verifyAdmin(req)) return res.status(401).json({ error:'unauth' });
  if(req.method==='GET'){ const { capper_id } = req.query; const { data, error } = await supabaseAdmin.from('picks').select('*').eq('capper_id', capper_id).order('event_date',{ascending:true}); if(error) return res.status(500).json({ error:error.message }); return res.json(data); }
  if(req.method==='POST'){ const { capper_id, event_date, league, description, stake, odds, outcome } = req.body || {}; let result_units = 0; if(outcome==='win') result_units = Number(stake)*(Number(odds)-1); else if(outcome==='loss') result_units = -Number(stake); else result_units=0; const { data, error } = await supabaseAdmin.from('picks').insert({ capper_id, event_date, league, description, stake, odds, outcome, result_units }).select().single(); if(error) return res.status(500).json({ error:error.message }); return res.json(data); }
  res.status(405).end();
}
