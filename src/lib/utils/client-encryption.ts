/**
 * Simple client-side storage encryption helpers using a XOR-obscuration strategy
 * suitable for environment fallback keys in non-secure local contexts.
 */

const OBFUSCATION_KEY = "synthara-client-fingerprint-salt-string";

export function encryptClientValue(text: string): string {
  if (!text) return "";
  try {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result);
  } catch (e) {
    console.error("XOR encryption failed:", e);
    return "";
  }
}

export function decryptClientValue(obscuredBase64: string): string {
  if (!obscuredBase64) return "";
  try {
    const raw = atob(obscuredBase64);
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      const charCode = raw.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (e) {
    console.error("XOR decryption failed:", e);
    return "";
  }
}
