// Input sanitization and sensitive data detection helpers

/**
 * Strips dangerous HTML tags and trims whitespace to prevent XSS.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // strip direct angle brackets
    .trim();
}

export interface SensitiveDataCheck {
  containsSensitiveData: boolean;
  warningMessage?: string;
  detectedType?: string;
}

/**
 * Checks if user input appears to contain sensitive confidential data:
 * - Credit/Debit card numbers (16 digits)
 * - CVV codes
 * - Passwords / PINs
 * - Indian Aadhaar numbers (12 digits)
 * - Bank account numbers
 */
export function checkForSensitiveData(text: string): SensitiveDataCheck {
  if (!text) return { containsSensitiveData: false };

  // 16-digit credit card pattern (with or without spaces/dashes)
  const cardPattern = /\b(?:\d[ -]*?){13,19}\b/;
  if (cardPattern.test(text)) {
    // Basic Luhn check or 16 digit check
    const cleanNumbers = text.replace(/\D/g, '');
    if (cleanNumbers.length >= 13 && cleanNumbers.length <= 19) {
      return {
        containsSensitiveData: true,
        detectedType: 'Card Number',
        warningMessage: 'Warning: Looks like a credit/debit card number. For your security and privacy, do not enter payment card details.'
      };
    }
  }

  // Aadhaar 12-digit pattern
  const aadhaarPattern = /\b[2-9]\d{3}[ -]?\d{4}[ -]?\d{4}\b/;
  if (aadhaarPattern.test(text)) {
    return {
      containsSensitiveData: true,
      detectedType: 'Identity Number',
      warningMessage: 'Warning: Looks like an identity or national ID number. CLEARPATH does not require national ID numbers.'
    };
  }

  // Keywords indicating passwords or OTPs
  const passwordKeywords = /\b(password|passwd|otp|pin|netbanking password)\s*[:=]\s*\S+/i;
  if (passwordKeywords.test(text)) {
    return {
      containsSensitiveData: true,
      detectedType: 'Security Credential',
      warningMessage: 'Warning: Never enter passwords, OTPs, or secret credentials into CLEARPATH.'
    };
  }

  return { containsSensitiveData: false };
}
