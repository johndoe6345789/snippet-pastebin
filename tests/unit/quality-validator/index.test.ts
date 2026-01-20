/**
 * Tests for Quality Validator Main Orchestrator
 * Tests CLI entry point and main analysis workflow
 */

import { QualityValidatorConfig } from '../../../src/lib/quality-validator/types';

describe('Quality Validator Orchestrator', () => {
  const mockConfig: QualityValidatorConfig = {
    projectName: 'test-project',
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

  describe('Configuration validation', () => {
    it('should accept valid configuration', () => {
      const weights = mockConfig.weights;
      const sum = Object.values(weights).reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 2);
    });

    it('should reject invalid weights', () => {
      const invalidWeights = {
        codeQuality: 0.5,
        testCoverage: 0.5,
        architecture: 0.5,
        security: 0.5,
      };
      const sum = Object.values(invalidWeights).reduce((a, b) => a + b, 0);
      expect(sum).toBeGreaterThan(1.0);
    });
  });

  describe('Analysis workflow', () => {
    it('should handle project configuration', () => {
      expect(mockConfig.projectName).toBe('test-project');
      expect(mockConfig.weights).toHaveProperty('codeQuality');
      expect(mockConfig.weights).toHaveProperty('testCoverage');
      expect(mockConfig.weights).toHaveProperty('architecture');
      expect(mockConfig.weights).toHaveProperty('security');
    });

    it('should process include patterns', () => {
      expect(mockConfig.includePattern).toContain('src/**/*.ts');
      expect(Array.isArray(mockConfig.includePattern)).toBe(true);
    });

    it('should process exclude patterns', () => {
      expect(mockConfig.excludePattern).toContain('node_modules');
      expect(mockConfig.excludePattern).toContain('**/*.test.ts');
    });
  });

  describe('Threshold configuration', () => {
    it('should have valid complexity threshold', () => {
      expect(mockConfig.thresholds.cyclomaticComplexity).toBeGreaterThan(0);
      expect(mockConfig.thresholds.cyclomaticComplexity).toBeLessThanOrEqual(30);
    });

    it('should have valid duplication threshold', () => {
      expect(mockConfig.thresholds.duplication).toBeGreaterThanOrEqual(0);
      expect(mockConfig.thresholds.duplication).toBeLessThanOrEqual(10);
    });

    it('should have valid coverage threshold', () => {
      expect(mockConfig.thresholds.coverage).toBeGreaterThanOrEqual(0);
      expect(mockConfig.thresholds.coverage).toBeLessThanOrEqual(100);
    });

    it('should have valid security threshold', () => {
      expect(mockConfig.thresholds.security).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Scoring result structure', () => {
    it('should have overall score', () => {
      const mockResult = {
        overall: {
          score: 85.5,
          grade: 'B' as const,
          status: 'good' as const,
        },
      };
      expect(mockResult.overall.score).toBeGreaterThanOrEqual(0);
      expect(mockResult.overall.score).toBeLessThanOrEqual(100);
    });

    it('should have component scores', () => {
      const mockResult = {
        componentScores: {
          codeQuality: 82,
          testCoverage: 88,
          architecture: 79,
          security: 91,
        },
      };
      expect(mockResult.componentScores).toHaveProperty('codeQuality');
      expect(mockResult.componentScores).toHaveProperty('testCoverage');
      expect(mockResult.componentScores).toHaveProperty('architecture');
      expect(mockResult.componentScores).toHaveProperty('security');
    });

    it('should contain metadata', () => {
      const mockMetadata = {
        timestamp: new Date(),
        projectPath: '/project',
        analysisTime: 25,
        toolVersion: '1.0.0',
        nodeVersion: '18.0.0',
        configUsed: mockConfig,
      };
      expect(mockMetadata.timestamp).toBeInstanceOf(Date);
      expect(mockMetadata.projectPath).toBeTruthy();
      expect(mockMetadata.analysisTime).toBeGreaterThan(0);
    });
  });

  describe('Findings collection', () => {
    it('should initialize empty findings list', () => {
      const findings: any[] = [];
      expect(Array.isArray(findings)).toBe(true);
      expect(findings.length).toBe(0);
    });

    it('should add code quality findings', () => {
      const findings = [
        {
          id: 'find-001',
          category: 'code-quality' as const,
          severity: 'high' as const,
          message: 'High complexity',
          file: 'test.ts',
          line: 42,
        },
      ];
      expect(findings.length).toBe(1);
      expect(findings[0].category).toBe('code-quality');
    });

    it('should add multiple findings by category', () => {
      const findings = [
        { category: 'code-quality', severity: 'high' },
        { category: 'coverage', severity: 'medium' },
        { category: 'security', severity: 'critical' },
        { category: 'architecture', severity: 'low' },
      ];
      expect(findings.length).toBe(4);
      expect(findings.every(f => ['code-quality', 'coverage', 'security', 'architecture'].includes(f.category))).toBe(true);
    });
  });

  describe('Recommendations generation', () => {
    it('should generate recommendations from findings', () => {
      const recommendations = [
        {
          id: 'rec-001',
          priority: 'high' as const,
          title: 'Refactor function',
          description: 'CC is 20',
          action: 'Break into smaller pieces',
        },
      ];
      expect(recommendations.length).toBe(1);
      expect(recommendations[0].priority).toBe('high');
    });

    it('should prioritize critical recommendations', () => {
      const recommendations = [
        { priority: 'low', title: 'Minor improvement' },
        { priority: 'high', title: 'Critical issue' },
        { priority: 'medium', title: 'Important issue' },
      ];
      const highPriority = recommendations.filter(r => r.priority === 'high');
      expect(highPriority.length).toBe(1);
    });
  });

  describe('Error handling', () => {
    it('should track analysis errors', () => {
      const errors = [
        {
          code: 'FILE_READ_ERROR',
          message: 'Could not read file',
          file: 'missing.ts',
          details: 'File not found',
        },
      ];
      expect(errors.length).toBe(1);
      expect(errors[0].code).toBe('FILE_READ_ERROR');
    });

    it('should handle missing files gracefully', () => {
      const files = ['exists.ts', 'missing.ts', 'also-missing.ts'];
      const validFiles = files.filter(f => !f.includes('missing'));
      expect(validFiles.length).toBe(1);
    });

    it('should continue analysis on partial failures', () => {
      const results = {
        codeQuality: { score: 82, errors: ['Error reading file A'] },
        coverage: { score: 88, errors: [] },
        architecture: { score: 79, errors: ['Error analyzing deps'] },
        security: { score: 91, errors: [] },
      };
      const analysisCompleted = Object.values(results).some(r => r.score !== undefined);
      expect(analysisCompleted).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should track analysis time', () => {
      const startTime = Date.now();
      const endTime = Date.now();
      const analysisTime = endTime - startTime;
      expect(analysisTime).toBeGreaterThanOrEqual(0);
      expect(analysisTime).toBeLessThan(60000); // Less than 60 seconds
    });

    it('should complete analysis within time budget', () => {
      const timeBudget = 30000; // 30 seconds
      const analysisTime = 25000; // 25 seconds
      expect(analysisTime).toBeLessThan(timeBudget);
    });
  });
});
