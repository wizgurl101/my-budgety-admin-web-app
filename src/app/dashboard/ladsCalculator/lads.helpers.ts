import { RERUN_PACKS, LIMITED_PACKS, MYTH_PACKS } from './lads.constants';

export const calculateBannerCost = (
  bannerType: string,
  diamondNumber: number,
  purpleDiamondNumber: number,
  deepspaceWishNumber: number,
  pityNumber: number,
  wishesMade: number,
  isEventCardGuaranteed: boolean = false
): number => {
  let pullsToGuaranteedCard = 140;
  const pullsTo5Stars = 70;

  if (isEventCardGuaranteed && bannerType === 'solo') {
    pullsToGuaranteedCard = pityNumber;
  } else if (!isEventCardGuaranteed && bannerType === 'solo') {
    pullsToGuaranteedCard = pityNumber + pullsTo5Stars;
  } else {
    pullsToGuaranteedCard -= wishesMade;
  }

  const pullsFromDiamond = Math.floor(
    (diamondNumber + purpleDiamondNumber) / 150
  );

  let pulls = pullsToGuaranteedCard - deepspaceWishNumber - pullsFromDiamond;

  if (pulls <= 0) {
    return 0;
  }

  return calculatePullCost(bannerType, pulls);
};

export const calculatePullCost = (
  bannerType: string,
  pulls: number
): number => {
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

// double check if the packs for solo and multi are the same
const getBannerPacks = (type: string): any => {
  switch (type) {
    case 'multi':
      return LIMITED_PACKS;
    case 'solo':
      return LIMITED_PACKS;
    case 'myth':
      return MYTH_PACKS;
    case 're-run':
      return RERUN_PACKS;
    default:
      return [];
  }
};

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
