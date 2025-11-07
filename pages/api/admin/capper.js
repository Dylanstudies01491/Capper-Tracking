
import { supabaseAdmin } from '../../../lib/supabaseAdmin'; import { verifyAdmin } from '../../../lib/adminUtil';
export default async function handler(req,res){
  if(!verifyAdmin(req)) return res.status(401).json({ error:'unauth' });
  const { id } = req.query; const { data, error } = await supabaseAdmin.from('cappers').select('*').eq('id', id).single();
  if(error) return res.status(404).json({ error:error.message }); res.json(data);
}
