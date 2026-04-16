import { jest, describe, it, expect } from '@jest/globals';
import {
  calculateBannerCost,
  WuwaBannerCosts,
} from '@/app/dashboard/wuwaCalculator/wuwa.helpers';

describe("Wuwa's Event Character Banner Cost Tests", () => {
  it('test case 1', () => {
    const asterites = 0;
    const radiantTides = 0;
    const lunites = 0;
    const pity = 0;
    const isGuaranteed = false;
    const areBundlesAvailable = true;
    const areDoubleLuniteAvailable = true;
    const expected: WuwaBannerCosts = {
      total: 199.95,
      asteritesLeftOver: 440,
    };

    const result = calculateBannerCost(
      asterites,
      radiantTides,
      lunites,
      pity,
      isGuaranteed,
      areBundlesAvailable,
      areDoubleLuniteAvailable
    );

    expect(result.total).toEqual(expected.total);
    expect(result.asteritesLeftOver).toEqual(expected.asteritesLeftOver);
  });
});
