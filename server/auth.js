import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getDB } from './db.js';

// Secret key for token signing (in production, set SESSION_SECRET env var)
const SECRET = process.env.SESSION_SECRET || 'norwen_secret_luxury_key_palmerston_north_2026';

export function hashPassword(plainText) {
  return bcrypt.hashSync(plainText, 10);
}

export function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

/**
 * Generate a cryptographically signed HMAC-SHA256 session token
 */
export function generateToken(payload, expiresInHours = 12) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

/**
 * Verify token with constant-time signature comparison
 */
export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);

  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Express middleware for protecting admin endpoints
 */
export function requireAdmin(req, res, next) {
  let token = null;

  // 1. Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }

  // 2. Fallback to cookies
  if (!token && req.cookies && req.cookies.admin_session) {
    token = req.cookies.admin_session;
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Please sign in to the admin panel.' });
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    return res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
  }

  req.adminUser = payload;
  next();
}
