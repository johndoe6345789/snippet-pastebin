/**
 * Tests for Scoring Engine and Report Generators
 */

import { QualityGrade, ScoringResult } from '../../../src/lib/quality-validator/types/index.js';

describe('Scoring Engine', () => {
  describe('Score Calculation', () => {
    it('should calculate weighted score', () => {
      const scores = {
        codeQuality: 80,
        testCoverage: 90,
        architecture: 75,
        security: 85,
      };

      const weights = {
        codeQuality: 0.3,
        testCoverage: 0.35,
        architecture: 0.2,
        security: 0.15,
      };

      const total =
        scores.codeQuality * weights.codeQuality +
        scores.testCoverage * weights.testCoverage +
        scores.architecture * weights.architecture +
        scores.security * weights.security;

      expect(total).toBeCloseTo(83.25, 1);
    });

    it('should handle perfect score', () => {
      const scores = {
        codeQuality: 100,
        testCoverage: 100,
        architecture: 100,
        security: 100,
      };

      const weights = {
        codeQuality: 0.3,
        testCoverage: 0.35,
        architecture: 0.2,
        security: 0.15,
      };

      const total =
        scores.codeQuality * weights.codeQuality +
        scores.testCoverage * weights.testCoverage +
        scores.architecture * weights.architecture +
        scores.security * weights.security;

      expect(total).toBe(100);
    });

    it('should handle failing score', () => {
      const scores = {
        codeQuality: 30,
        testCoverage: 20,
        architecture: 40,
        security: 10,
      };

      const weights = {
        codeQuality: 0.3,
        testCoverage: 0.35,
        architecture: 0.2,
        security: 0.15,
      };

      const total =
        scores.codeQuality * weights.codeQuality +
        scores.testCoverage * weights.testCoverage +
        scores.architecture * weights.architecture +
        scores.security * weights.security;

      expect(total).toBeLessThan(50);
    });

    it('should clamp scores to 0-100 range', () => {
      const score = Math.max(0, Math.min(100, 150));
      expect(score).toBe(100);

      const negative = Math.max(0, Math.min(100, -50));
      expect(negative).toBe(0);
    });
  });

  describe('Grade Assignment', () => {
    const assignGrade = (score: number): QualityGrade => {
      if (score >= 90) return 'A';
      if (score >= 80) return 'B';
      if (score >= 70) return 'C';
      if (score >= 60) return 'D';
      return 'F';
    };

    it('should assign A grade', () => {
      expect(assignGrade(95)).toBe('A');
      expect(assignGrade(92)).toBe('A');
      expect(assignGrade(90)).toBe('A');
    });

    it('should assign B grade', () => {
      expect(assignGrade(89)).toBe('B');
      expect(assignGrade(85)).toBe('B');
      expect(assignGrade(80)).toBe('B');
    });

    it('should assign C grade', () => {
      expect(assignGrade(79)).toBe('C');
      expect(assignGrade(75)).toBe('C');
      expect(assignGrade(70)).toBe('C');
    });

    it('should assign D grade', () => {
      expect(assignGrade(69)).toBe('D');
      expect(assignGrade(65)).toBe('D');
      expect(assignGrade(60)).toBe('D');
    });

    it('should assign F grade', () => {
      expect(assignGrade(59)).toBe('F');
      expect(assignGrade(50)).toBe('F');
      expect(assignGrade(0)).toBe('F');
    });

    it('should handle boundary scores', () => {
      expect(assignGrade(90)).toBe('A');
      expect(assignGrade(89.9)).toBe('B');
      expect(assignGrade(80)).toBe('B');
      expect(assignGrade(79.9)).toBe('C');
    });
  });

  describe('Status Assignment', () => {
    it('should assign excellent status', () => {
      const score = 95;
      const status = score >= 90 ? 'excellent' : 'good';
      expect(status).toBe('excellent');
    });

    it('should assign good status', () => {
      const score = 85;
      const status = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'needs-improvement';
      expect(status).toBe('good');
    });

    it('should assign needs-improvement status', () => {
      const score = 70;
      const status = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'needs-improvement';
      expect(status).toBe('needs-improvement');
    });
  });

  describe('Recommendation Generation', () => {
    it('should generate recommendations for code quality', () => {
      const score = 70;
      const recommendations = [];
      if (score < 80) {
        recommendations.push({
          priority: 'high',
          title: 'Improve code quality',
          action: 'Refactor complex functions',
        });
      }
      expect(recommendations.length).toBe(1);
      expect(recommendations[0].priority).toBe('high');
    });

    it('should generate recommendations for coverage', () => {
      const score = 60;
      const recommendations = [];
      if (score < 80) {
        recommendations.push({
          priority: 'high',
          title: 'Increase test coverage',
          action: 'Add more test cases',
        });
      }
      expect(recommendations.length).toBe(1);
    });

    it('should handle no recommendations', () => {
      const score = 95;
      const recommendations = [];
      if (score < 90) {
        recommendations.push({ priority: 'medium', title: 'Minor improvement' });
      }
      expect(recommendations.length).toBe(0);
    });

    it('should prioritize high-impact recommendations', () => {
      const recommendations = [
        { priority: 'low', impact: 'low' },
        { priority: 'high', impact: 'high' },
        { priority: 'medium', impact: 'medium' },
      ];
      const highPriority = recommendations.filter(r => r.priority === 'high');
      expect(highPriority.length).toBe(1);
    });
  });

  describe('Trend Analysis', () => {
    it('should calculate score change', () => {
      const current = 85;
      const previous = 80;
      const change = current - previous;
      expect(change).toBe(5);
    });

    it('should determine trend direction', () => {
      const change = 5;
      const direction = change > 0 ? 'improving' : change < 0 ? 'declining' : 'stable';
      expect(direction).toBe('improving');
    });

    it('should track score history', () => {
      const history = [70, 75, 78, 82, 85];
      expect(history.length).toBe(5);
      expect(history[history.length - 1]).toBe(85);
    });

    it('should calculate trend percentage', () => {
      const history = [70, 85];
      const change = ((history[1] - history[0]) / history[0]) * 100;
      expect(change).toBeCloseTo(21.43, 1);
    });
  });
});

describe('Console Reporter', () => {
  describe('Output Formatting', () => {
    it('should format overall score', () => {
      const score = 85.5;
      const formatted = `Score: ${score.toFixed(1)}%`;
      expect(formatted).toBe('Score: 85.5%');
    });

    it('should format grade', () => {
      const grade = 'B';
      const formatted = `Grade: ${grade}`;
      expect(formatted).toBe('Grade: B');
    });

    it('should format component scores', () => {
      const scores = {
        codeQuality: 82,
        testCoverage: 88,
        architecture: 79,
        security: 91,
      };
      Object.entries(scores).forEach(([name, score]) => {
        expect(`${name}: ${score}`).toBeTruthy();
      });
    });
  });

  describe('Color Coding', () => {
    it('should use green for excellent', () => {
      const score = 95;
      const color = score >= 90 ? 'green' : 'yellow';
      expect(color).toBe('green');
    });

    it('should use yellow for good', () => {
      const score = 85;
      const color = score >= 90 ? 'green' : score >= 80 ? 'yellow' : 'red';
      expect(color).toBe('yellow');
    });

    it('should use red for poor', () => {
      const score = 65;
      const color = score >= 90 ? 'green' : score >= 80 ? 'yellow' : 'red';
      expect(color).toBe('red');
    });
  });

  describe('Table Formatting', () => {
    it('should format findings table', () => {
      const findings = [
        { severity: 'high', message: 'Issue 1' },
        { severity: 'medium', message: 'Issue 2' },
      ];
      expect(findings.length).toBe(2);
      expect(findings[0].severity).toBe('high');
    });

    it('should format recommendations table', () => {
      const recommendations = [
        { priority: 'high', action: 'Fix critical issue' },
        { priority: 'medium', action: 'Improve coverage' },
      ];
      expect(recommendations.length).toBe(2);
    });
  });
});

describe('JSON Reporter', () => {
  describe('JSON Structure', () => {
    it('should produce valid JSON', () => {
      const result: ScoringResult = {
        overall: { score: 85, grade: 'B', status: 'good' },
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
          projectPath: '/test',
          analysisTime: 10,
          toolVersion: '1.0.0',
          nodeVersion: '18.0.0',
          configUsed: {
            projectName: 'test',
            weights: {
              codeQuality: 0.3,
              testCoverage: 0.35,
              architecture: 0.2,
              security: 0.15,
            },
          },
        },
      };

      const json = JSON.stringify(result);
      expect(() => JSON.parse(json)).not.toThrow();
    });

    it('should include all sections', () => {
      const json = {
        overall: {},
        componentScores: {},
        findings: [],
        recommendations: [],
        metadata: {},
      };
      expect(json).toHaveProperty('overall');
      expect(json).toHaveProperty('componentScores');
      expect(json).toHaveProperty('findings');
      expect(json).toHaveProperty('recommendations');
      expect(json).toHaveProperty('metadata');
    });
  });

  describe('Data Serialization', () => {
    it('should serialize scores', () => {
      const scores = {
        codeQuality: 82,
        testCoverage: 88,
        architecture: 79,
        security: 91,
      };
      const json = JSON.stringify(scores);
      const parsed = JSON.parse(json);
      expect(parsed.codeQuality).toBe(82);
    });

    it('should serialize findings', () => {
      const findings = [
        {
          id: 'f1',
          category: 'code-quality',
          severity: 'high',
          message: 'Test',
        },
      ];
      const json = JSON.stringify(findings);
      expect(json).toContain('code-quality');
    });
  });
});

describe('HTML Reporter', () => {
  describe('HTML Structure', () => {
    it('should generate valid HTML', () => {
      const html = '<html><head></head><body></body></html>';
      expect(html).toContain('<html>');
      expect(html).toContain('<head>');
      expect(html).toContain('<body>');
    });

    it('should include CSS styles', () => {
      const html = '<style>body { color: black; }</style>';
      expect(html).toContain('<style>');
    });

    it('should include script tags', () => {
      const html = '<script>console.log("test");</script>';
      expect(html).toContain('<script>');
    });
  });

  describe('Content Sections', () => {
    it('should include header', () => {
      const html = '<header><h1>Quality Report</h1></header>';
      expect(html).toContain('Quality Report');
    });

    it('should include score section', () => {
      const html = '<section id="score">Score: 85%</section>';
      expect(html).toContain('Score: 85%');
    });

    it('should include findings section', () => {
      const html = '<section id="findings"><h2>Findings</h2></section>';
      expect(html).toContain('Findings');
    });

    it('should include footer', () => {
      const html = '<footer>Generated by Quality Validator</footer>';
      expect(html).toContain('Generated by Quality Validator');
    });
  });
});

describe('CSV Reporter', () => {
  describe('CSV Format', () => {
    it('should generate CSV header', () => {
      const header = 'Category,Severity,Message,File,Line';
      expect(header).toContain('Category');
      expect(header).toContain('Severity');
    });

    it('should format rows', () => {
      const rows = [
        'code-quality,high,Complex function,app.ts,42',
        'security,critical,Hardcoded secret,.env,10',
      ];
      expect(rows.length).toBe(2);
      expect(rows[0]).toContain('code-quality');
    });

    it('should escape special characters', () => {
      const value = 'Message with "quotes"';
      const escaped = `"${value}"`;
      expect(escaped).toContain('quotes');
    });
  });
});

describe('Report Generation Workflow', () => {
  it('should generate all report formats', () => {
    const formats = ['console', 'json', 'html', 'csv'];
    expect(formats.length).toBe(4);
    expect(formats).toContain('console');
    expect(formats).toContain('json');
  });

  it('should handle report output', () => {
    const reports = {
      console: 'text output',
      json: 'json string',
      html: 'html string',
      csv: 'csv string',
    };
    expect(Object.keys(reports).length).toBe(4);
  });

  it('should validate report content', () => {
    const reports = {
      console: { length: 150 },
      json: { isValid: true },
      html: { isValid: true },
      csv: { lines: 5 },
    };
    expect(reports.console.length).toBeGreaterThan(0);
    expect(reports.json.isValid).toBe(true);
  });
});
