import { jest } from '@jest/globals';
import { calculateBannerCost } from '@/app/dashboard/ladsCalculator/lads.helpers';

describe('LADS Banner Cost Tests ', () => {
  it('Given a rerun When pity and diamonds is zero Then the cost to get the myth pair is $216.86 ', () => {
    const bannerType = 'rerun';
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

  it('Given a rerun When pity is 67, diamonds is 615, wishes made is 105 Then the cost to get the myth pair is $47.94', () => {
    const bannerType = 'rerun';
    const diamondNumber = 615;
    const purpleDiamondNumber = 0;
    const deepspaceWishNumber = 0;
    const pityNumber = 67;
    const wishesMade = 105;
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
    expect(result).toBe(47.94);
  });

  it('Given a rerun When pity is 20, diamonds is 4440, purple diamonds is 740, tickets is 2, wishes made is 19, event card is guaranteed Then the cost to get the myth pair is $122.89', () => {
    const bannerType = 'rerun';
    const diamondNumber = 4440;
    const purpleDiamondNumber = 740;
    const deepspaceWishNumber = 2;
    const pityNumber = 20;
    const wishesMade = 19;
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
    expect(result).toBe(122.89);
  });

  it('Given a multi banner When pity is 20, diamonds is 4440, purple diamonds is 740, tickets is 2, wishes made is 0, event card is guaranteed Then the cost to get the myth pair is $0', () => {
    const bannerType = 'rerun';
    const diamondNumber = 4440;
    const purpleDiamondNumber = 740;
    const deepspaceWishNumber = 2;
    const pityNumber = 20;
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
    expect(result).toBe(0);
  });
});
