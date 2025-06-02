import { jest } from '@jest/globals';
import { calculateBannerCost } from '@/app/dashboard/ladsCalculator/lads.helpers';

describe('LADS Solo Banner Cost Tests ', () => {
  it('Given a solo banner When wish and diamonds is zero, pity is 2 and event card is guaranteed Then the cost to get the event card is $0.98 ', () => {
    const bannerType = 'solo';
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

  it('Given a solo banner When wish is 11, diamonds is 190, pity is 67 and event card is not guaranteed Then the cost to get the event card is $85.37 ', () => {
    const bannerType = 'solo';
    const diamondNumber = 190;
    const purpleDiamondNumber = 630;
    const deepspaceWishNumber = 67;
    const pityNumber = 67;
    const wishesMade = 11;
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
    expect(result).toBe(85.37);
  });

  it('Given a solo banner When wish and diamonds is zero, pity is 70 and event card is not guaranteed Then the cost to get the event card is $237.33 ', () => {
    const bannerType = 'solo';
    const diamondNumber = 0;
    const purpleDiamondNumber = 0;
    const deepspaceWishNumber = 0;
    const pityNumber = 70;
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
    expect(result).toBe(237.33);
  });
});
