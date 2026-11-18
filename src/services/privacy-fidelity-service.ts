/**
 * Privacy & Fidelity Assurance Service
 * Provides automated PII detection, masking, differential privacy scoring,
 * and synthetic data fidelity auditing.
 */

export interface PIIDetection {
  type: 'email' | 'phone' | 'ssn' | 'credit_card' | 'ip_address' | 'passport';
  column: string;
  rowIndex: number;
  originalSnippet: string;
  maskedSnippet: string;
}

export interface ColumnPrivacyMetric {
  column: string;
  piiCount: number;
  piiTypes: string[];
  uniquenessRatio: number;
  entropyScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface PrivacyFidelityResult {
  overallPrivacyScore: number; // 0 to 100
  fidelityScore: number; // 0 to 100
  fidelityGrade: 'A+' | 'A' | 'B' | 'C' | 'D';
  totalPiiDetected: number;
  detectedPii: PIIDetection[];
  columnMetrics: ColumnPrivacyMetric[];
  sanitizedRows?: Array<Record<string, any>>;
  complianceAudit: {
    gdprCompliant: boolean;
    ccpaCompliant: boolean;
    hipaaSafeHarbor: boolean;
    recommendations: string[];
  };
}

export interface PrivacyOptions {
  maskPii?: boolean;
  maskingToken?: 'TAG' | 'HASH' | 'ASTERISKS';
  columnsToExclude?: string[];
}

const PII_PATTERNS: Record<PIIDetection['type'], RegExp> = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  ssn: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g,
  credit_card: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
  ip_address: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  passport: /\b[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]\b/g,
};

export class PrivacyFidelityService {
  /**
   * Evaluates privacy risks and statistical fidelity of a dataset
   */
  static analyzeAndSanitize(
    rows: Array<Record<string, any>>,
    options: PrivacyOptions = {}
  ): PrivacyFidelityResult {
    if (!rows || rows.length === 0) {
      return {
        overallPrivacyScore: 100,
        fidelityScore: 100,
        fidelityGrade: 'A+',
        totalPiiDetected: 0,
        detectedPii: [],
        columnMetrics: [],
        complianceAudit: {
          gdprCompliant: true,
          ccpaCompliant: true,
          hipaaSafeHarbor: true,
          recommendations: ['Dataset is empty; no PII risks detected.'],
        },
      };
    }

    const maskPii = options.maskPii ?? false;
    const maskingToken = options.maskingToken ?? 'TAG';
    const excludedSet = new Set(options.columnsToExclude || []);
    const columns = Object.keys(rows[0] || {}).filter((col) => !excludedSet.has(col));
    const detectedPii: PIIDetection[] = [];
    const columnMetrics: ColumnPrivacyMetric[] = [];
    const sanitizedRows: Array<Record<string, any>> = maskPii
      ? rows.map((r) => ({ ...r }))
      : [];

    columns.forEach((col) => {
      let colPiiCount = 0;
      const colPiiTypes = new Set<string>();
      const values = rows.map((r) => String(r[col] ?? ''));
      const uniqueValues = new Set(values);
      const uniquenessRatio = rows.length > 0 ? uniqueValues.size / rows.length : 0;

      // Calculate Shannon entropy for diversity
      const freqMap = new Map<string, number>();
      values.forEach((v) => freqMap.set(v, (freqMap.get(v) || 0) + 1));
      let entropy = 0;
      freqMap.forEach((count) => {
        const p = count / values.length;
        if (p > 0) entropy -= p * Math.log2(p);
      });
      const maxEntropy = Math.log2(Math.max(values.length, 2));
      const normalizedEntropy = maxEntropy > 0 ? Math.min(1, entropy / maxEntropy) : 0;

      // Scan rows for PII
      rows.forEach((row, rowIndex) => {
        const val = String(row[col] ?? '');
        if (!val) return;

        let sanitizedVal = val;

        (Object.keys(PII_PATTERNS) as Array<PIIDetection['type']>).forEach((piiType) => {
          const regex = PII_PATTERNS[piiType];
          regex.lastIndex = 0;
          let match: RegExpExecArray | null;

          while ((match = regex.exec(val)) !== null) {
            const matchedText = match[0];
            colPiiCount++;
            colPiiTypes.add(piiType);

            let replacement = `[${piiType.toUpperCase()}]`;
            if (maskingToken === 'HASH') {
              let hash = 0;
              for (let i = 0; i < matchedText.length; i++) {
                hash = (hash << 5) - hash + matchedText.charCodeAt(i);
                hash |= 0;
              }
              replacement = `HASH_${Math.abs(hash).toString(16)}`;
            } else if (maskingToken === 'ASTERISKS') {
              replacement = '*'.repeat(matchedText.length);
            }

            detectedPii.push({
              type: piiType,
              column: col,
              rowIndex,
              originalSnippet: matchedText,
              maskedSnippet: replacement,
            });

            if (maskPii) {
              sanitizedVal = sanitizedVal.replace(matchedText, replacement);
            }
          }
        });

        if (maskPii && sanitizedRows[rowIndex]) {
          sanitizedRows[rowIndex][col] = sanitizedVal;
        }
      });

      // Determine column risk level
      let riskLevel: ColumnPrivacyMetric['riskLevel'] = 'LOW';
      if (colPiiTypes.has('credit_card') || colPiiTypes.has('ssn')) {
        riskLevel = 'CRITICAL';
      } else if (colPiiCount > 5 || colPiiTypes.size > 1) {
        riskLevel = 'HIGH';
      } else if (colPiiCount > 0) {
        riskLevel = 'MEDIUM';
      }

      columnMetrics.push({
        column: col,
        piiCount: colPiiCount,
        piiTypes: Array.from(colPiiTypes),
        uniquenessRatio: Math.round(uniquenessRatio * 100) / 100,
        entropyScore: Math.round(normalizedEntropy * 100) / 100,
        riskLevel,
      });
    });

    // Compute Overall Privacy Score (100 is pristine zero-risk)
    const criticalDeduction = detectedPii.filter((p) => p.type === 'ssn' || p.type === 'credit_card').length * 15;
    const standardDeduction = detectedPii.filter((p) => p.type !== 'ssn' && p.type !== 'credit_card').length * 4;
    const overallPrivacyScore = Math.max(0, Math.min(100, 100 - (criticalDeduction + standardDeduction)));

    // Compute Fidelity Score (evaluates realism, non-trivial entropy, and absence of excessive nulls)
    const avgEntropy = columnMetrics.length > 0
      ? columnMetrics.reduce((sum, c) => sum + c.entropyScore, 0) / columnMetrics.length
      : 1;
    const avgUniqueness = columnMetrics.length > 0
      ? columnMetrics.reduce((sum, c) => sum + c.uniquenessRatio, 0) / columnMetrics.length
      : 1;
    
    const fidelityScore = Math.round(Math.min(100, (avgEntropy * 50 + avgUniqueness * 50)));

    let fidelityGrade: PrivacyFidelityResult['fidelityGrade'] = 'A+';
    if (fidelityScore < 60) fidelityGrade = 'D';
    else if (fidelityScore < 75) fidelityGrade = 'C';
    else if (fidelityScore < 85) fidelityGrade = 'B';
    else if (fidelityScore < 95) fidelityGrade = 'A';

    // Regulatory Compliance Audit
    const gdprCompliant = detectedPii.length === 0 || maskPii;
    const ccpaCompliant = !detectedPii.some((p) => p.type === 'ssn' || p.type === 'credit_card');
    const hipaaSafeHarbor = detectedPii.length === 0;

    const recommendations: string[] = [];
    if (detectedPii.length > 0) {
      recommendations.push(
        `Found ${detectedPii.length} real PII patterns (emails, phones, or identifiers). Apply synthetic masking before publishing.`
      );
    } else {
      recommendations.push('Zero real-world PII patterns detected. High privacy protection.');
    }

    if (fidelityScore < 70) {
      recommendations.push('Low column entropy detected. Consider increasing model temperature or prompt diversity for richer variability.');
    } else {
      recommendations.push('High synthetic data fidelity with healthy distribution entropy.');
    }

    return {
      overallPrivacyScore,
      fidelityScore,
      fidelityGrade,
      totalPiiDetected: detectedPii.length,
      detectedPii: detectedPii.slice(0, 100),
      columnMetrics,
      sanitizedRows: maskPii ? sanitizedRows : undefined,
      complianceAudit: {
        gdprCompliant,
        ccpaCompliant,
        hipaaSafeHarbor,
        recommendations,
      },
    };
  }
}
