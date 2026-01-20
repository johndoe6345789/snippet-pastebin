import { ConfigLoader } from '../../../src/lib/quality-validator/config/ConfigLoader';

describe('Debug ConfigLoader', () => {
  it('should show config sharing', async () => {
    const loader = ConfigLoader.getInstance();
    const config1 = await loader.loadConfiguration();

    console.log('[TEST] After loadConfiguration:');
    console.log('config1.testCoverage.enabled:', config1.testCoverage.enabled);

    expect(config1.testCoverage.enabled).toBe(true);

    const modified = loader.applyCliOptions(config1, { skipCoverage: true });
    console.log('[TEST] After applyCliOptions:');

    console.log('=== AFTER applyCliOptions ===');
    console.log('config1.testCoverage.enabled:', config1.testCoverage.enabled);
    console.log('modified.testCoverage.enabled:', modified.testCoverage.enabled);
    console.log('config1 === modified:', config1 === modified);
    console.log('config1.testCoverage === modified.testCoverage:', config1.testCoverage === modified.testCoverage);

    expect(modified.testCoverage.enabled).toBe(false, 'modified should be false');
    expect(config1.testCoverage.enabled).toBe(true, 'original config1 should still be true');
  });
});
