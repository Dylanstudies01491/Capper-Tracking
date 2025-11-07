
import cookie from 'cookie';
import crypto from 'crypto';
export function verifyAdmin(req){
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies['cappers_admin_token'];
  if (!token) return false;
  const [payload, mac] = token.split('|');
  if (!payload || !mac) return false;
  const SECRET = process.env.APP_SECRET || 'dev_secret';
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return expected === mac;
}
