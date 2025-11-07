
import cookie from 'cookie'; import crypto from 'crypto';
export default function handler(req,res){
  const cookies = cookie.parse(req.headers.cookie || ''); const token = cookies['cappers_admin_token'];
  if(!token) return res.json({ admin:false });
  const [payload, mac] = token.split('|'); if(!payload||!mac) return res.json({ admin:false });
  const SECRET = process.env.APP_SECRET || 'dev_secret';
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  res.json({ admin: expected===mac });
}
