import { jest, describe, it, expect } from '@jest/globals';
import {
  calculateBannerCost,
  WuwaBannerCosts,
} from '@/app/dashboard/wuwaCalculator/wuwa.helpers';

// Update test cases when proper implementation for wuwa calculator is work on
describe.skip("Wuwa's Event Character Banner Cost Tests ", () => {
  it(
    `Given the number of asterites, radiant tides, lunites and pity to be zero` +
      `and there is no guarantee ` +
      `and both special banner and double lunite bundles are available` +
      `Then the cost to get the character should be $199.95` +
      ` and 440 asterites left over`,
    () => {
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
    }
  );
});
