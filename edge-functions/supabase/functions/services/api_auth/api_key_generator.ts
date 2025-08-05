// src/apiKey.ts
import { randomBytes, createHash } from "node:crypto";

export function generateKeyId(): string {
  return randomBytes(4).toString('hex'); // 8-char hex
}

export function generateKeySecret(): string {
  return randomBytes(32).toString('hex'); // 64-char hex
}

export function hashKeySecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex');
}

export function createApiKey(): {
  full: string;
  keyId: string;
  keySecret: string;
  hash: string;
} {
  const keyId = generateKeyId();
  const keySecret = generateKeySecret();
  const hash = hashKeySecret(keySecret);
  const full = `sk-proj-${keyId}-${keySecret}`;
  
  return { full, keyId, keySecret, hash };
}

export function validateToken(auth: string): {
  keyId: string;
  hash: string;
} | null {
  // Handle both "Bearer sk-proj-..." and direct "sk-proj-..." formats
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
  
  // Expected format: sk-proj-{keyId}-{keySecret}
  const parts = token.split('-');
  
  // Must have exactly 4 parts: ['sk', 'proj', keyId, keySecret]
  if (parts.length !== 4 || parts[0] !== 'sk' || parts[1] !== 'proj') {
    return null;
  }
  
  const keyId = parts[2];
  const keySecret = parts[3];
  
  // Basic validation - ensure they're hex strings of expected length
  if (keyId.length !== 8 || keySecret.length !== 64) {
    return null;
  }
  
  if (!/^[0-9a-f]+$/i.test(keyId) || !/^[0-9a-f]+$/i.test(keySecret)) {
    return null;
  }

  const hash = hashKeySecret(keySecret)
  
  return { keyId, hash };
}
