import { RERUN_PACKS } from './lads.constants';

export const calculateBannerCost = (
  bannerType: string,
  diamondNumber: number,
  purpleDiamondNumber: number,
  deepspaceWishNumber: number,
  pityNumber: number,
  wishesMade: number
): number => {
  const pullsToDesiredCard = 140 - wishesMade;
  const pullsFromDiamond = Math.floor(
    (diamondNumber + purpleDiamondNumber) / 150
  );

  let pullsFromPity =
    pityNumber === 0 || pullsToDesiredCard < pityNumber ? 0 : 70 - pityNumber;

  let pulls =
    pullsToDesiredCard - deepspaceWishNumber - pullsFromDiamond - pullsFromPity;

  if (pulls <= 0) {
    return 0;
  }

  let cost = 0;
  let packs = getBannerPacks(bannerType);

  for (let i = 0; i < packs.length; i++) {
    if (pulls <= 0) {
      break;
    }

    const pack = packs[i];
    let quantity = pack.quantity;

    while (quantity > 0) {
      if (pulls <= 0) {
        break;
      }

      pulls -= pack.ticket;
      cost += pack.price;
      --quantity;
    }
  }

  return parseFloat(cost.toFixed(2));
};

const getBannerPacks = (type: string): any => {
  switch (type) {
    case 'rerun':
      return RERUN_PACKS;
    default:
      return [];
  }
};
