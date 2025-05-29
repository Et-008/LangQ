// src/apiKey.ts
import { randomBytes, createHash } from "node:crypto";

export function generateKeyId(): string {
  return randomBytes(8).toString('hex'); // 16-char
}

export function generateKeySecret(): string {
  return randomBytes(32).toString('hex'); // 64-char
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
  const full = `${keyId}.${keySecret}`;
  return { full, keyId, keySecret, hash };
}



