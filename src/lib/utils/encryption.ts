import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 10000;

// Retrieve secret key or fallback to a deterministic value for local dev
const SECRET = process.env.ENCRYPTION_SECRET || "synthara-super-secret-key-development";

function getDerivationKey(salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(SECRET, salt, ITERATIONS, KEY_LENGTH, "sha256");
}

export function encryptKey(text: string): string {
  if (!text) return "";
  
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getDerivationKey(salt);
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  // Combine salt, iv, authTag, and encrypted text into one string payload
  const payload = Buffer.concat([salt, iv, authTag, encrypted]);
  return payload.toString("base64");
}

export function decryptKey(encryptedText: string): string {
  if (!encryptedText) return "";
  
  try {
    const payload = Buffer.from(encryptedText, "base64");
    
    const salt = payload.subarray(0, SALT_LENGTH);
    const iv = payload.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const authTag = payload.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + 16);
    const encrypted = payload.subarray(SALT_LENGTH + IV_LENGTH + 16);
    
    const key = getDerivationKey(salt);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Encryption decryption failure:", error);
    return "";
  }
}
