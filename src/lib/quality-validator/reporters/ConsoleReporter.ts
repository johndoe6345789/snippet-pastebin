/**
 * Console Reporter
 * Generates formatted console output with colors
 */

import { ScoringResult, Finding, Recommendation } from '../types/index.js';
import { logger } from '../utils/logger.js';

/**
 * Console Reporter
 */
export class ConsoleReporter {
  /**
   * Generate console report
   */
  generate(result: ScoringResult, useColors: boolean = true): string {
    const lines: string[] = [];

    // Header
    lines.push(this.generateHeader(result, useColors));

    // Overall section
    lines.push(this.generateOverallSection(result, useColors));

    // Component scores
    lines.push(this.generateComponentScoresSection(result, useColors));

    // Findings section
    if (result.findings.length > 0) {
      lines.push(this.generateFindingsSection(result.findings, useColors));
    }

    // Recommendations section
    if (result.recommendations.length > 0) {
      lines.push(this.generateRecommendationsSection(result.recommendations, useColors));
    }

    // Trend section
    if (result.trend) {
      lines.push(this.generateTrendSection(result, useColors));
    }

    // Footer
    lines.push(this.generateFooter(result, useColors));

    return lines.join('\n');
  }

  /**
   * Generate header
   */
  private generateHeader(result: ScoringResult, useColors: boolean): string {
    const color = this.getColorizer(useColors);
    const lines: string[] = [];

    lines.push('');
    lines.push(color('╔════════════════════════════════════════════════════════╗', 'cyan'));
    lines.push(color('║   QUALITY VALIDATION REPORT - snippet-pastebin         ║', 'cyan'));
    lines.push(
      color(
        `║   ${result.metadata.timestamp.substring(0, 19).padEnd(49)}║`,
        'cyan'
      )
    );
    lines.push(color('╚════════════════════════════════════════════════════════╝', 'cyan'));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate overall score section
   */
  private generateOverallSection(result: ScoringResult, useColors: boolean): string {
    const color = this.getColorizer(useColors);
    const { overall } = result;

    const gradeColor =
      overall.grade === 'A' || overall.grade === 'B'
        ? 'green'
        : overall.grade === 'C' || overall.grade === 'D'
          ? 'yellow'
          : 'red';

    const lines: string[] = [];

    lines.push(color('┌─ OVERALL ────────────────────────────────────────────────┐', 'cyan'));
    lines.push(
      `│ Grade: ${color(overall.grade, gradeColor).padEnd(6)} Score: ${color(
        overall.score.toFixed(1) + '%',
        gradeColor
      ).padEnd(8)} Status: ${overall.status === 'pass' ? color('✓ PASS', 'green') : color('✗ FAIL', 'red')}`
    );
    lines.push(`│ ${overall.summary}`);
    lines.push(color('└─────────────────────────────────────────────────────────┘', 'cyan'));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate component scores section
   */
  private generateComponentScoresSection(result: ScoringResult, useColors: boolean): string {
    const color = this.getColorizer(useColors);
    const { componentScores } = result;

    const lines: string[] = [];

    lines.push(color('┌─ COMPONENT SCORES ──────────────────────────────────────┐', 'cyan'));

    const scores = [
      {
        name: 'Code Quality',
        score: componentScores.codeQuality.score,
        weight: `${(componentScores.codeQuality.weight * 100).toFixed(0)}%`,
      },
      {
        name: 'Test Coverage',
        score: componentScores.testCoverage.score,
        weight: `${(componentScores.testCoverage.weight * 100).toFixed(0)}%`,
      },
      {
        name: 'Architecture',
        score: componentScores.architecture.score,
        weight: `${(componentScores.architecture.weight * 100).toFixed(0)}%`,
      },
      {
        name: 'Security',
        score: componentScores.security.score,
        weight: `${(componentScores.security.weight * 100).toFixed(0)}%`,
      },
    ];

    for (const score of scores) {
      const scoreColor = score.score >= 80 ? 'green' : score.score >= 60 ? 'yellow' : 'red';
      const bar = this.generateScoreBar(score.score);
      lines.push(
        `│ ${score.name.padEnd(18)} ${bar} ${color(score.score.toFixed(1).padStart(5), scoreColor)}% (${score.weight})`
      );
    }

    lines.push(color('└─────────────────────────────────────────────────────────┘', 'cyan'));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate findings section
   */
  private generateFindingsSection(findings: Finding[], useColors: boolean): string {
    const color = this.getColorizer(useColors);
    const lines: string[] = [];

    // Group by severity
    const bySeverity = new Map<string, Finding[]>();
    for (const finding of findings) {
      if (!bySeverity.has(finding.severity)) {
        bySeverity.set(finding.severity, []);
      }
      bySeverity.get(finding.severity)!.push(finding);
    }

    const severityOrder = ['critical', 'high', 'medium', 'low', 'info'];

    lines.push(color('┌─ FINDINGS ───────────────────────────────────────────────┐', 'cyan'));
    lines.push(`│ Total: ${findings.length} findings`);
    lines.push(color('├─────────────────────────────────────────────────────────┤', 'cyan'));

    for (const severity of severityOrder) {
      const severityFindings = bySeverity.get(severity) || [];
      if (severityFindings.length === 0) continue;

      const severityColor =
        severity === 'critical' || severity === 'high'
          ? 'red'
          : severity === 'medium'
            ? 'yellow'
            : 'blue';

      lines.push(
        color(`│ ${severity.toUpperCase().padEnd(15)} (${severityFindings.length})`, severityColor)
      );

      for (const finding of severityFindings.slice(0, 3)) {
        lines.push(`│   • ${finding.title}`);
        if (finding.location?.file) {
          lines.push(`│     Location: ${finding.location.file}${finding.location.line ? `:${finding.location.line}` : ''}`);
        }
      }

      if (severityFindings.length > 3) {
        lines.push(`│   ... and ${severityFindings.length - 3} more`);
      }
    }

    lines.push(color('└─────────────────────────────────────────────────────────┘', 'cyan'));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate recommendations section
   */
  private generateRecommendationsSection(recommendations: Recommendation[], useColors: boolean): string {
    const color = this.getColorizer(useColors);
    const lines: string[] = [];

    lines.push(color('┌─ TOP RECOMMENDATIONS ────────────────────────────────────┐', 'cyan'));

    for (let i = 0; i < Math.min(5, recommendations.length); i++) {
      const rec = recommendations[i];
      const priorityColor =
        rec.priority === 'critical' || rec.priority === 'high'
          ? 'red'
          : rec.priority === 'medium'
            ? 'yellow'
            : 'green';

      lines.push(
        `│ ${(i + 1).toString().padEnd(2)} ${color(rec.priority.toUpperCase().padEnd(8), priorityColor)} ${rec.issue}`
      );
      lines.push(`│    → ${rec.remediation}`);
      lines.push(`│    Effort: ${rec.estimatedEffort} | Impact: ${rec.expectedImpact}`);
    }

    lines.push(color('└─────────────────────────────────────────────────────────┘', 'cyan'));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate trend section
   */
  private generateTrendSection(result: ScoringResult, useColors: boolean): string {
    const color = this.getColorizer(useColors);
    const { trend } = result;

    if (!trend) return '';

    const lines: string[] = [];

    lines.push(color('┌─ TREND ──────────────────────────────────────────────────┐', 'cyan'));

    if (trend.previousScore !== undefined) {
      const change = trend.currentScore - trend.previousScore;
      const changeStr = change >= 0 ? `+${change.toFixed(1)}` : `${change.toFixed(1)}`;
      const trendColor = change >= 0 ? 'green' : 'red';
      const trendSymbol = change >= 0 ? '↑' : change <= 0 ? '↓' : '→';

      lines.push(`│ Score: ${trend.currentScore.toFixed(1)}% ${color(trendSymbol + ' ' + changeStr + '%', trendColor)}`);
      lines.push(`│ Direction: ${color(trend.direction || 'unknown', trendColor)}`);
    }

    if (trend.lastFiveScores && trend.lastFiveScores.length > 0) {
      const sparkline = this.generateSparkline(trend.lastFiveScores);
      lines.push(`│ Recent: ${sparkline}`);
    }

    lines.push(color('└─────────────────────────────────────────────────────────┘', 'cyan'));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate footer
   */
  private generateFooter(result: ScoringResult, useColors: boolean): string {
    const color = this.getColorizer(useColors);
    const lines: string[] = [];

    lines.push(color('╔════════════════════════════════════════════════════════╗', 'cyan'));
    lines.push(
      `║ Analysis completed in ${result.metadata.analysisTime.toFixed(2)}ms${' '.repeat(28)}║`
    );
    lines.push(
      `║ Tool: ${result.metadata.toolVersion}${' '.repeat(48)}║`
    );
    lines.push(color('╚════════════════════════════════════════════════════════╝', 'cyan'));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate a visual score bar
   */
  private generateScoreBar(score: number, width: number = 30): string {
    const filled = Math.round((score / 100) * width);
    const empty = width - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `[${bar}]`;
  }

  /**
   * Generate a sparkline from data points
   */
  private generateSparkline(values: number[], width: number = 10): string {
    const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return values
      .slice(Math.max(0, values.length - width))
      .map((v) => {
        const index = Math.round(((v - min) / range) * (chars.length - 1));
        return chars[index];
      })
      .join('');
  }

  /**
   * Get a colorizer function
   */
  private getColorizer(useColors: boolean) {
    if (!useColors) {
      return (text: string, _color?: string) => text;
    }

    return (text: string, color?: string) => {
      if (!color) return text;

      const colors: Record<string, string> = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        cyan: '\x1b[36m',
        gray: '\x1b[90m',
      };

      const reset = '\x1b[0m';
      return `${colors[color] || ''}${text}${reset}`;
    };
  }
}

export const consoleReporter = new ConsoleReporter();
