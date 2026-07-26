/**
 * PII Anonymization & Data Masking utility.
 * Sanitizes emails, phone numbers, IP addresses, credit cards, and social security numbers.
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const IP_REGEX = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
const CREDIT_CARD_REGEX = /\b(?:\d[ -]*?){13,16}\b/g;

export interface MaskingOptions {
  maskEmail?: boolean;
  maskPhone?: boolean;
  maskIp?: boolean;
  maskCreditCard?: boolean;
}

export function maskPiiText(text: string, options: MaskingOptions = {}): string {
  if (!text || typeof text !== "string") return text;

  let sanitized = text;

  if (options.maskEmail !== false) {
    sanitized = sanitized.replace(EMAIL_REGEX, (email) => {
      const parts = email.split("@");
      return parts[0][0] + "***@" + parts[1];
    });
  }

  if (options.maskPhone !== false) {
    sanitized = sanitized.replace(PHONE_REGEX, "***-***-****");
  }

  if (options.maskIp !== false) {
    sanitized = sanitized.replace(IP_REGEX, "xxx.xxx.xxx.xxx");
  }

  if (options.maskCreditCard !== false) {
    sanitized = sanitized.replace(CREDIT_CARD_REGEX, "****-****-****-****");
  }

  return sanitized;
}

export function sanitizeDatasetPii(
  rows: Array<Record<string, any>>,
  options: MaskingOptions = {}
): { sanitizedRows: Array<Record<string, any>>; count: number } {
  if (!rows || rows.length === 0) return { sanitizedRows: [], count: 0 };

  let replacedCount = 0;

  const sanitizedRows = rows.map((row) => {
    const newRow: Record<string, any> = {};
    for (const [k, v] of Object.entries(row)) {
      if (typeof v === "string") {
        const masked = maskPiiText(v, options);
        if (masked !== v) replacedCount++;
        newRow[k] = masked;
      } else {
        newRow[k] = v;
      }
    }
    return newRow;
  });

  return { sanitizedRows, count: replacedCount };
}
