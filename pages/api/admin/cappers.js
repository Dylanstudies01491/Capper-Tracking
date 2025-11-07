
import { supabaseAdmin } from '../../../lib/supabaseAdmin'; import { verifyAdmin } from '../../../lib/adminUtil';
export default async function handler(req,res){
  if(!verifyAdmin(req)) return res.status(401).json({ error:'unauth' });
  if(req.method==='GET'){ const { data, error } = await supabaseAdmin.from('cappers').select('*').order('created_at',{ascending:true}); if(error) return res.status(500).json({ error:error.message }); return res.json(data); }
  if(req.method==='POST'){ const { name, bio } = req.body || {}; const { data, error } = await supabaseAdmin.from('cappers').insert({ name, bio }).select().single(); if(error) return res.status(500).json({ error:error.message }); return res.json(data); }
  res.status(405).end();
}
