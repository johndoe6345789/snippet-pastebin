/**
 * Tests for Quality Validator Type Definitions
 * Validates all TypeScript interfaces and types are correct
 */

import {
  AnalysisResult,
  CodeQualityMetrics,
  CoverageMetrics,
  ArchitectureMetrics,
  SecurityMetrics,
  ScoringResult,
  Finding,
  Recommendation,
  QualityGrade,
  AnalysisError,
  QualityValidatorConfig,
} from '../../../src/lib/quality-validator/types';

describe('Quality Validator Type Definitions', () => {
  describe('CodeQualityMetrics', () => {
    it('should have valid cyclomatic complexity range', () => {
      const metrics: CodeQualityMetrics = {
        cyclomaticComplexity: {
          average: 5.2,
          max: 15,
          violations: 2,
          files: ['file1.ts', 'file2.ts'],
        },
        duplication: {
          percentage: 2.5,
          blocks: 3,
          files: ['file1.ts'],
        },
        linting: {
          errors: 0,
          warnings: 5,
          style: 2,
        },
        componentSize: {
          oversized: ['LargeComponent.tsx'],
          average: 150,
        },
      };

      expect(metrics.cyclomaticComplexity.average).toBeGreaterThanOrEqual(0);
      expect(metrics.duplication.percentage).toBeLessThanOrEqual(100);
      expect(metrics.linting.errors).toBeGreaterThanOrEqual(0);
    });

    it('should handle zero metrics', () => {
      const metrics: CodeQualityMetrics = {
        cyclomaticComplexity: {
          average: 0,
          max: 0,
          violations: 0,
          files: [],
        },
        duplication: {
          percentage: 0,
          blocks: 0,
          files: [],
        },
        linting: {
          errors: 0,
          warnings: 0,
          style: 0,
        },
        componentSize: {
          oversized: [],
          average: 0,
        },
      };

      expect(metrics.cyclomaticComplexity.average).toBe(0);
      expect(metrics.duplication.percentage).toBe(0);
    });
  });

  describe('CoverageMetrics', () => {
    it('should have valid coverage percentages', () => {
      const metrics: CoverageMetrics = {
        lines: 85.5,
        branches: 72.3,
        functions: 90.1,
        statements: 88.7,
        gaps: [
          { file: 'test.ts', lines: [10, 11, 12] },
        ],
      };

      expect(metrics.lines).toBeGreaterThanOrEqual(0);
      expect(metrics.lines).toBeLessThanOrEqual(100);
      expect(metrics.branches).toBeGreaterThanOrEqual(0);
      expect(metrics.branches).toBeLessThanOrEqual(100);
    });
  });

  describe('ArchitectureMetrics', () => {
    it('should validate component organization', () => {
      const metrics: ArchitectureMetrics = {
        components: {
          valid: ['Button.tsx', 'Input.tsx'],
          invalid: ['MismatchedComponent.tsx'],
          total: 100,
        },
        dependencies: {
          circular: [['ComponentA', 'ComponentB']],
          violations: 2,
        },
        layers: {
          violations: 0,
          components: [],
        },
      };

      expect(metrics.components.total).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(metrics.dependencies.circular)).toBe(true);
    });
  });

  describe('SecurityMetrics', () => {
    it('should track security findings', () => {
      const metrics: SecurityMetrics = {
        vulnerabilities: {
          critical: 0,
          high: 2,
          medium: 5,
        },
        secrets: ['test.env'],
        patterns: {
          unsafeDom: ['component.tsx'],
          missingValidation: [],
        },
      };

      expect(metrics.vulnerabilities.critical).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(metrics.secrets)).toBe(true);
      expect(Array.isArray(metrics.patterns.unsafeDom)).toBe(true);
    });
  });

  describe('QualityGrade', () => {
    it('should accept valid grades', () => {
      const validGrades: QualityGrade[] = ['A', 'B', 'C', 'D', 'F'];
      validGrades.forEach(grade => {
        expect(['A', 'B', 'C', 'D', 'F']).toContain(grade);
      });
    });
  });

  describe('Finding', () => {
    it('should create valid finding with severity', () => {
      const finding: Finding = {
        id: 'find-001',
        category: 'code-quality',
        severity: 'high',
        message: 'High complexity function',
        file: 'test.ts',
        line: 42,
      };

      expect(['low', 'medium', 'high', 'critical']).toContain(finding.severity);
      expect(['code-quality', 'coverage', 'architecture', 'security']).toContain(finding.category);
    });
  });

  describe('Recommendation', () => {
    it('should create valid recommendation', () => {
      const rec: Recommendation = {
        id: 'rec-001',
        priority: 'high',
        title: 'Refactor complex function',
        description: 'Function has cyclomatic complexity of 20',
        action: 'Break into smaller functions',
      };

      expect(['low', 'medium', 'high']).toContain(rec.priority);
      expect(rec.title).toBeTruthy();
    });
  });

  describe('ScoringResult', () => {
    it('should contain all required sections', () => {
      const result: ScoringResult = {
        overall: {
          score: 85.5,
          grade: 'B',
          status: 'good',
        },
        componentScores: {
          codeQuality: 82,
          testCoverage: 88,
          architecture: 79,
          security: 91,
        },
        findings: [],
        recommendations: [],
        metadata: {
          timestamp: new Date(),
          projectPath: '/project',
          analysisTime: 25,
          toolVersion: '1.0.0',
          nodeVersion: '18.0.0',
          configUsed: {
            projectName: 'test-project',
            weights: {
              codeQuality: 0.3,
              testCoverage: 0.35,
              architecture: 0.2,
              security: 0.15,
            },
          },
        },
      };

      expect(result.overall.score).toBeGreaterThanOrEqual(0);
      expect(result.overall.score).toBeLessThanOrEqual(100);
      expect(['A', 'B', 'C', 'D', 'F']).toContain(result.overall.grade);
    });
  });

  describe('AnalysisError', () => {
    it('should track error details', () => {
      const error: AnalysisError = {
        code: 'FILE_READ_ERROR',
        message: 'Could not read file',
        file: 'test.ts',
        details: 'Permission denied',
      };

      expect(error.code).toBeTruthy();
      expect(error.message).toBeTruthy();
    });
  });

  describe('QualityValidatorConfig', () => {
    it('should have valid weights that sum to 1.0', () => {
      const config: QualityValidatorConfig = {
        projectName: 'test',
        weights: {
          codeQuality: 0.3,
          testCoverage: 0.35,
          architecture: 0.2,
          security: 0.15,
        },
        thresholds: {
          cyclomaticComplexity: 10,
          duplication: 3,
          coverage: 80,
          security: 0,
        },
        includePattern: ['src/**/*.ts'],
        excludePattern: ['node_modules', '**/*.test.ts'],
      };

      const sum = Object.values(config.weights).reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 2);
    });
  });

  describe('Grade conversion', () => {
    it('should map scores to correct grades', () => {
      const scoreToGrade = (score: number): QualityGrade => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
      };

      expect(scoreToGrade(95)).toBe('A');
      expect(scoreToGrade(85)).toBe('B');
      expect(scoreToGrade(75)).toBe('C');
      expect(scoreToGrade(65)).toBe('D');
      expect(scoreToGrade(55)).toBe('F');
    });
  });
});
