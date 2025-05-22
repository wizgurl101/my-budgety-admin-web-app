import { jest } from '@jest/globals';
import { calculateBannerCost } from '@/app/dashboard/ladsCalculator/lads.helpers';

describe('LADS Banner Cost Tests ', () => {
  it('Given a rerun When pity and diamonds is zero Then the cost to get the myth pair is ', () => {
    const bannerType = 'rerun';
    const diamondNumber = 0;
    const purpleDiamondNumber = 0;
    const deepspaceWishNumber = 0;
    const pityNumber = 0;

    const result = calculateBannerCost(
      bannerType,
      diamondNumber,
      purpleDiamondNumber,
      deepspaceWishNumber,
      pityNumber
    );
    expect(result).toBe(216.86);
  });
});
