/**
 * Validation utilities for input checking and data integrity
 * Ensures data quality before processing and reporting
 */

import {
  Finding,
  FileLocation,
  Recommendation,
  ScoringResult,
  Configuration,
} from '../types/index.js';

/**
 * Validate that a score is within acceptable range
 *
 * @param {number} score - Score value to validate
 * @returns {boolean} True if score is valid (0-100)
 *
 * @example
 * validateScore(85) // Returns: true
 * validateScore(150) // Returns: false
 */
export function validateScore(score: number): boolean {
  return typeof score === 'number' && score >= 0 && score <= 100;
}

/**
 * Validate file location object
 *
 * @param {FileLocation | undefined} location - Location to validate
 * @returns {boolean} True if location is valid or undefined
 *
 * @example
 * validateFileLocation({ file: 'src/app.ts', line: 45 }) // Returns: true
 * validateFileLocation({ file: '', line: 0 }) // Returns: false
 */
export function validateFileLocation(location: FileLocation | undefined): boolean {
  if (!location) return true; // Optional field

  if (typeof location.file !== 'string' || location.file.length === 0) {
    return false;
  }

  if (location.line !== undefined && (typeof location.line !== 'number' || location.line < 0)) {
    return false;
  }

  if (location.column !== undefined && (typeof location.column !== 'number' || location.column < 0)) {
    return false;
  }

  return true;
}

/**
 * Validate a Finding object
 *
 * @param {Finding} finding - Finding to validate
 * @returns {string[]} Array of validation errors (empty if valid)
 *
 * @example
 * const errors = validateFinding(finding);
 * if (errors.length > 0) {
 *   console.error('Invalid finding:', errors);
 * }
 */
export function validateFinding(finding: Finding): string[] {
  const errors: string[] = [];

  if (!finding.id || typeof finding.id !== 'string') {
    errors.push('Finding must have a valid id');
  }

  if (!finding.severity || !['critical', 'high', 'medium', 'low', 'info'].includes(finding.severity)) {
    errors.push('Finding must have a valid severity');
  }

  if (!finding.title || typeof finding.title !== 'string') {
    errors.push('Finding must have a valid title');
  }

  if (!finding.description || typeof finding.description !== 'string') {
    errors.push('Finding must have a valid description');
  }

  if (!finding.remediation || typeof finding.remediation !== 'string') {
    errors.push('Finding must have a valid remediation');
  }

  if (finding.location && !validateFileLocation(finding.location)) {
    errors.push('Finding has invalid file location');
  }

  return errors;
}

/**
 * Validate a Recommendation object
 *
 * @param {Recommendation} recommendation - Recommendation to validate
 * @returns {string[]} Array of validation errors
 *
 * @example
 * const errors = validateRecommendation(rec);
 * if (errors.length === 0) {
 *   console.log('Recommendation is valid');
 * }
 */
export function validateRecommendation(recommendation: Recommendation): string[] {
  const errors: string[] = [];

  if (!recommendation.priority || !['critical', 'high', 'medium', 'low'].includes(recommendation.priority)) {
    errors.push('Recommendation must have a valid priority');
  }

  if (!recommendation.issue || typeof recommendation.issue !== 'string') {
    errors.push('Recommendation must have a valid issue');
  }

  if (!recommendation.remediation || typeof recommendation.remediation !== 'string') {
    errors.push('Recommendation must have a valid remediation');
  }

  if (
    !recommendation.estimatedEffort ||
    !['high', 'medium', 'low'].includes(recommendation.estimatedEffort)
  ) {
    errors.push('Recommendation must have a valid estimatedEffort');
  }

  if (!recommendation.expectedImpact || typeof recommendation.expectedImpact !== 'string') {
    errors.push('Recommendation must have a valid expectedImpact');
  }

  return errors;
}

/**
 * Validate metrics object structure
 *
 * @param {any} metrics - Metrics object to validate
 * @returns {boolean} True if metrics have required structure
 *
 * @example
 * const metrics = { complexity: {...}, duplication: {...}, ... };
 * if (!validateMetrics(metrics)) {
 *   throw new Error('Invalid metrics structure');
 * }
 */
export function validateMetrics(metrics: any): boolean {
  if (!metrics || typeof metrics !== 'object') {
    return false;
  }

  // Check for required metric fields based on type
  if (metrics.complexity !== undefined && typeof metrics.complexity !== 'object') {
    return false;
  }

  if (metrics.duplication !== undefined && typeof metrics.duplication !== 'object') {
    return false;
  }

  if (metrics.linting !== undefined && typeof metrics.linting !== 'object') {
    return false;
  }

  return true;
}

/**
 * Validate ScoringResult structure
 *
 * @param {ScoringResult} result - Result to validate
 * @returns {string[]} Array of validation errors
 *
 * @example
 * const errors = validateScoringResult(result);
 * if (errors.length > 0) {
 *   console.error('Invalid result:', errors);
 * }
 */
export function validateScoringResult(result: ScoringResult): string[] {
  const errors: string[] = [];

  if (!result.overall) {
    errors.push('ScoringResult must have overall score');
  } else {
    if (!validateScore(result.overall.score)) {
      errors.push('Overall score must be between 0-100');
    }

    if (!['A', 'B', 'C', 'D', 'F'].includes(result.overall.grade)) {
      errors.push('Grade must be A, B, C, D, or F');
    }

    if (!['pass', 'fail'].includes(result.overall.status)) {
      errors.push('Status must be pass or fail');
    }
  }

  if (!Array.isArray(result.findings)) {
    errors.push('Findings must be an array');
  } else {
    for (let i = 0; i < result.findings.length; i++) {
      const findingErrors = validateFinding(result.findings[i]);
      if (findingErrors.length > 0) {
        errors.push(`Finding ${i}: ${findingErrors.join(', ')}`);
      }
    }
  }

  if (!Array.isArray(result.recommendations)) {
    errors.push('Recommendations must be an array');
  } else {
    for (let i = 0; i < result.recommendations.length; i++) {
      const recErrors = validateRecommendation(result.recommendations[i]);
      if (recErrors.length > 0) {
        errors.push(`Recommendation ${i}: ${recErrors.join(', ')}`);
      }
    }
  }

  return errors;
}

/**
 * Validate Configuration object
 *
 * @param {Configuration} config - Configuration to validate
 * @returns {string[]} Array of validation errors
 *
 * @example
 * const errors = validateConfiguration(config);
 * if (errors.length === 0) {
 *   console.log('Configuration is valid');
 * }
 */
export function validateConfiguration(config: Configuration): string[] {
  const errors: string[] = [];

  if (!config) {
    errors.push('Configuration is required');
    return errors;
  }

  // Validate scoring weights sum to 1.0
  if (config.scoring?.weights) {
    const weights = config.scoring.weights;
    const sum = weights.codeQuality + weights.testCoverage + weights.architecture + weights.security;
    if (Math.abs(sum - 1.0) > 0.01) {
      errors.push(`Scoring weights must sum to 1.0, got ${sum.toFixed(2)}`);
    }

    if (weights.codeQuality < 0 || weights.codeQuality > 1) {
      errors.push('codeQuality weight must be between 0 and 1');
    }

    if (weights.testCoverage < 0 || weights.testCoverage > 1) {
      errors.push('testCoverage weight must be between 0 and 1');
    }

    if (weights.architecture < 0 || weights.architecture > 1) {
      errors.push('architecture weight must be between 0 and 1');
    }

    if (weights.security < 0 || weights.security > 1) {
      errors.push('security weight must be between 0 and 1');
    }
  }

  // Validate thresholds
  if (config.codeQuality?.complexity?.max && config.codeQuality.complexity.warning) {
    if (config.codeQuality.complexity.warning >= config.codeQuality.complexity.max) {
      errors.push('Complexity warning threshold must be less than max threshold');
    }
  }

  if (config.testCoverage?.minimumPercent && config.testCoverage.warningPercent) {
    if (config.testCoverage.warningPercent < config.testCoverage.minimumPercent) {
      errors.push('Coverage warning percent must be >= minimum percent');
    }
  }

  return errors;
}

/**
 * Sanitize Finding data to ensure consistency
 *
 * @param {Finding} finding - Finding to sanitize
 * @returns {Finding} Sanitized finding with defaults
 *
 * @example
 * const finding = sanitizeFinding(rawFinding);
 * // Ensures all required fields are present and valid
 */
export function sanitizeFinding(finding: Finding): Finding {
  return {
    ...finding,
    severity: (['critical', 'high', 'medium', 'low', 'info'].includes(finding.severity)
      ? finding.severity
      : 'medium') as any,
    title: finding.title?.trim() || 'Unknown Issue',
    description: finding.description?.trim() || '',
    remediation: finding.remediation?.trim() || 'No remediation provided',
    location: validateFileLocation(finding.location) ? finding.location : undefined,
  };
}

/**
 * Sanitize Recommendation data
 *
 * @param {Recommendation} rec - Recommendation to sanitize
 * @returns {Recommendation} Sanitized recommendation with defaults
 *
 * @example
 * const rec = sanitizeRecommendation(rawRec);
 */
export function sanitizeRecommendation(rec: Recommendation): Recommendation {
  return {
    ...rec,
    priority: (['critical', 'high', 'medium', 'low'].includes(rec.priority)
      ? rec.priority
      : 'medium') as any,
    issue: rec.issue?.trim() || 'Unknown Issue',
    remediation: rec.remediation?.trim() || '',
    estimatedEffort: (['high', 'medium', 'low'].includes(rec.estimatedEffort)
      ? rec.estimatedEffort
      : 'medium') as any,
    expectedImpact: rec.expectedImpact?.trim() || '',
  };
}

/**
 * Check if a file path matches any exclude pattern
 *
 * @param {string} filePath - File path to check
 * @param {string[]} excludePatterns - Exclude patterns (glob-style)
 * @returns {boolean} True if file should be excluded
 *
 * @example
 * shouldExcludeFile('node_modules/pkg/index.js', ['node_modules', '.git'])
 * // Returns: true
 */
export function shouldExcludeFile(filePath: string, excludePatterns: string[]): boolean {
  for (const pattern of excludePatterns) {
    if (filePath.includes(pattern)) {
      return true;
    }
  }
  return false;
}
