import { jest } from '@jest/globals';
import { calculateBannerCost } from '@/app/dashboard/ladsCalculator/lads.helpers';

describe('LADS Solo Banner Cost Tests ', () => {
  it('Given a solo banner When pity and diamonds is zero Then the cost to get the myth pair is $216.86 ', () => {
    const bannerType = 're-run';
    const diamondNumber = 0;
    const purpleDiamondNumber = 0;
    const deepspaceWishNumber = 0;
    const pityNumber = 0;
    const wishesMade = 0;
    const isEventCardGuaranteed = false;

    const result = calculateBannerCost(
      bannerType,
      diamondNumber,
      purpleDiamondNumber,
      deepspaceWishNumber,
      pityNumber,
      wishesMade,
      isEventCardGuaranteed
    );
    expect(result).toBe(216.86);
  });
});
