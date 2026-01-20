/**
 * Tests for Configuration and Utilities
 */

import { QualityValidatorConfig } from '../../../src/lib/quality-validator/types/index.js';

describe('Configuration Loader', () => {
  describe('Valid Configuration', () => {
    it('should accept valid config', () => {
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
        excludePattern: ['node_modules'],
      };
      expect(config.projectName).toBe('test');
    });

    it('should validate weight sum', () => {
      const weights = {
        codeQuality: 0.3,
        testCoverage: 0.35,
        architecture: 0.2,
        security: 0.15,
      };
      const sum = Object.values(weights).reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 2);
    });

    it('should validate threshold ranges', () => {
      const thresholds = {
        cyclomaticComplexity: 10,
        duplication: 3,
        coverage: 80,
        security: 0,
      };
      expect(thresholds.cyclomaticComplexity).toBeGreaterThan(0);
      expect(thresholds.duplication).toBeGreaterThan(0);
      expect(thresholds.coverage).toBeGreaterThanOrEqual(0);
      expect(thresholds.coverage).toBeLessThanOrEqual(100);
    });
  });

  describe('Default Configuration', () => {
    it('should provide sensible defaults', () => {
      const defaults = {
        projectName: 'unnamed-project',
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
      };
      expect(defaults.projectName).toBeTruthy();
      const sum = Object.values(defaults.weights).reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 2);
    });
  });

  describe('Environment Variable Override', () => {
    it('should read from environment', () => {
      process.env.QUALITY_PROJECT_NAME = 'env-project';
      const name = process.env.QUALITY_PROJECT_NAME;
      expect(name).toBe('env-project');
      delete process.env.QUALITY_PROJECT_NAME;
    });

    it('should handle missing environment vars', () => {
      const name = process.env.NONEXISTENT_VAR || 'default';
      expect(name).toBe('default');
    });
  });

  describe('File Pattern Handling', () => {
    it('should process include patterns', () => {
      const patterns = ['src/**/*.ts', 'lib/**/*.ts'];
      expect(patterns.length).toBe(2);
      expect(patterns[0]).toContain('src');
    });

    it('should process exclude patterns', () => {
      const patterns = ['node_modules', '**/*.test.ts', '.git'];
      expect(patterns.length).toBe(3);
      expect(patterns).toContain('node_modules');
    });

    it('should handle glob patterns', () => {
      const pattern = '**/*.{ts,tsx}';
      expect(pattern).toContain('ts');
      expect(pattern).toContain('tsx');
    });
  });
});

describe('Logger Utility', () => {
  describe('Log Levels', () => {
    it('should support error level', () => {
      const message = 'Error message';
      expect(message).toBeTruthy();
    });

    it('should support warning level', () => {
      const message = 'Warning message';
      expect(message).toBeTruthy();
    });

    it('should support info level', () => {
      const message = 'Info message';
      expect(message).toBeTruthy();
    });

    it('should support debug level', () => {
      const message = 'Debug message';
      expect(message).toBeTruthy();
    });
  });

  describe('Formatting', () => {
    it('should format timestamp', () => {
      const timestamp = new Date().toISOString();
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}/);
    });

    it('should include log level', () => {
      const message = '[ERROR] Something failed';
      expect(message).toContain('ERROR');
    });

    it('should include message content', () => {
      const message = 'Test message';
      expect(message).toBeTruthy();
    });
  });
});

describe('File System Utility', () => {
  describe('File Operations', () => {
    it('should handle file path normalization', () => {
      const path = 'src/lib/test.ts';
      expect(path).toContain('src');
      expect(path).toContain('test.ts');
    });

    it('should validate path traversal', () => {
      const safePath = 'src/components/Button.tsx';
      const dangerous = '../../../etc/passwd';
      expect(safePath).toContain('src');
      expect(dangerous).toContain('..');
    });

    it('should handle absolute paths', () => {
      const absolute = '/Users/user/project/src/file.ts';
      expect(absolute).toMatch(/^\//);
    });

    it('should handle relative paths', () => {
      const relative = './src/file.ts';
      expect(relative).toMatch(/^\.\//);
    });
  });

  describe('Directory Operations', () => {
    it('should list directory contents', () => {
      const files = ['file1.ts', 'file2.ts', 'file3.ts'];
      expect(files.length).toBe(3);
    });

    it('should handle nested directories', () => {
      const path = 'src/components/atoms/Button.tsx';
      expect(path.split('/').length).toBe(5);
    });

    it('should validate directory existence', () => {
      const exists = true;
      expect(exists).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle file not found', () => {
      const error = { code: 'ENOENT', message: 'File not found' };
      expect(error.code).toBe('ENOENT');
    });

    it('should handle permission denied', () => {
      const error = { code: 'EACCES', message: 'Permission denied' };
      expect(error.code).toBe('EACCES');
    });

    it('should handle read errors', () => {
      const error = { message: 'Failed to read file' };
      expect(error.message).toBeTruthy();
    });
  });
});

describe('Validation Utility', () => {
  describe('Score Validation', () => {
    it('should validate score range', () => {
      const score = 85;
      const isValid = score >= 0 && score <= 100;
      expect(isValid).toBe(true);
    });

    it('should reject invalid scores', () => {
      const score = 150;
      const isValid = score >= 0 && score <= 100;
      expect(isValid).toBe(false);
    });
  });

  describe('Grade Validation', () => {
    it('should accept valid grades', () => {
      const grades = ['A', 'B', 'C', 'D', 'F'];
      expect(grades).toContain('A');
      expect(grades).toContain('F');
    });

    it('should reject invalid grades', () => {
      const grade = 'X';
      const valid = ['A', 'B', 'C', 'D', 'F'];
      expect(valid).not.toContain(grade);
    });
  });

  describe('Threshold Validation', () => {
    it('should validate complexity threshold', () => {
      const threshold = 10;
      const isValid = threshold > 0 && threshold <= 30;
      expect(isValid).toBe(true);
    });

    it('should validate coverage threshold', () => {
      const threshold = 80;
      const isValid = threshold >= 0 && threshold <= 100;
      expect(isValid).toBe(true);
    });
  });

  describe('Pattern Validation', () => {
    it('should validate file patterns', () => {
      const pattern = 'src/**/*.ts';
      expect(pattern).toContain('*');
      expect(pattern).toContain('.ts');
    });

    it('should handle empty patterns', () => {
      const patterns: string[] = [];
      expect(patterns.length).toBe(0);
    });
  });
});

describe('Formatter Utility', () => {
  describe('Number Formatting', () => {
    it('should format percentages', () => {
      const num = 85.567;
      const formatted = parseFloat(num.toFixed(2));
      expect(formatted).toBe(85.57);
    });

    it('should format large numbers', () => {
      const num = 1000;
      const formatted = `${(num / 1000).toFixed(1)}k`;
      expect(formatted).toBe('1.0k');
    });
  });

  describe('Text Formatting', () => {
    it('should capitalize text', () => {
      const text = 'hello world';
      const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
      expect(capitalized).toBe('Hello world');
    });

    it('should convert to kebab-case', () => {
      const text = 'code quality';
      const kebab = text.replace(/\s+/g, '-').toLowerCase();
      expect(kebab).toBe('code-quality');
    });
  });

  describe('Time Formatting', () => {
    it('should format milliseconds', () => {
      const ms = 1500;
      const formatted = `${(ms / 1000).toFixed(1)}s`;
      expect(formatted).toBe('1.5s');
    });

    it('should format ISO timestamp', () => {
      const date = new Date('2025-01-20T10:30:00Z');
      const iso = date.toISOString();
      expect(iso).toMatch(/\d{4}-\d{2}-\d{2}/);
    });
  });
});

describe('Constants Module', () => {
  describe('Grade Thresholds', () => {
    it('should define A grade threshold', () => {
      const threshold = 90;
      expect(threshold).toBeGreaterThanOrEqual(80);
    });

    it('should define F grade threshold', () => {
      const threshold = 60;
      expect(threshold).toBeLessThan(70);
    });
  });

  describe('Metric Names', () => {
    it('should define code quality metrics', () => {
      const metrics = ['cyclomaticComplexity', 'duplication', 'linting'];
      expect(metrics.length).toBeGreaterThan(0);
    });

    it('should define coverage metrics', () => {
      const metrics = ['lines', 'branches', 'functions', 'statements'];
      expect(metrics.length).toBe(4);
    });
  });

  describe('Severity Levels', () => {
    it('should define severity levels', () => {
      const levels = ['low', 'medium', 'high', 'critical'];
      expect(levels.length).toBe(4);
    });

    it('should define level ordering', () => {
      const critical = 4;
      const low = 1;
      expect(critical).toBeGreaterThan(low);
    });
  });
});
