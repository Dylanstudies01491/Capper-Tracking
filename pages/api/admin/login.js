
import cookie from 'cookie'; import crypto from 'crypto';
export default function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const { password } = req.body || {}; const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Truth99';
  if(password !== ADMIN_PASSWORD) return res.status(401).json({ error:'bad' });
  const SECRET = process.env.APP_SECRET || 'dev_secret';
  const payload = `admin:${Date.now()}`; const mac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  res.setHeader('Set-Cookie', cookie.serialize('cappers_admin_token', `${payload}|${mac}`, { httpOnly:true, path:'/', secure: process.env.NODE_ENV==='production', maxAge: 60*60*24*7 }));
  res.json({ ok:true });
}
