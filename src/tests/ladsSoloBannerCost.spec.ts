import { jest } from '@jest/globals';
import { calculateBannerCost } from '@/app/dashboard/ladsCalculator/lads.helpers';

describe('LADS Solo Banner Cost Tests ', () => {
  it('Given a solo banner When wish and diamonds is zero, pity is 2 and event card is guaranteed Then the cost to get the event card is $0.98 ', () => {
    const bannerType = 're-run';
    const diamondNumber = 0;
    const purpleDiamondNumber = 0;
    const deepspaceWishNumber = 0;
    const pityNumber = 2;
    const wishesMade = 0;
    const isEventCardGuaranteed = true;

    const result = calculateBannerCost(
      bannerType,
      diamondNumber,
      purpleDiamondNumber,
      deepspaceWishNumber,
      pityNumber,
      wishesMade,
      isEventCardGuaranteed
    );
    expect(result).toBe(0.98);
  });
});
