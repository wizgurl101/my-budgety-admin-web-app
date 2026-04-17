import {
  SPECIAL_BANNER_BUNDLES,
  DOUBLE_TOP_UP_LUNITE_BUNDLES,
  LUNITE_BUNDLES,
} from './wuwa.constants';

export interface WuwaBannerCosts {
  total: number;
  asteritesLeftOver: number;
  packsPurchased: RequiredPack[];
}

interface CostResult {
  total: number;
  asteritesLeftOver: number;
  asteritesStillNeeded: number;
  packsPurchased: RequiredPack[];
}

interface RequiredPack {
  name: string;
  cost: number;
  asterite: number;
  limit: number;
}

const DOUBLE_PACK_TYPE = 'double';
const BUNDLE_PACK_TYPE = 'bundle';

export const calculateBannerCost = (
  asterites: number,
  radiantTides: number,
  lunites: number,
  pity: number,
  isGuaranteed: boolean = false,
  areBundlesAvailable: boolean = false,
  areDoubleLuniteAvailable: boolean = false
): WuwaBannerCosts => {
  const characterPity = isGuaranteed ? 80 - pity : 160 - pity;

  let packs: RequiredPack[] = [];
  let cost = 0;
  let asteritesLeftOver = 0;
  let asteritesNeeded =
    characterPity * 160 - asterites - lunites - radiantTides * 160;

  // check if double lunite bundles are available and use them if they are
  // since they are of the best value
  if (areDoubleLuniteAvailable) {
    const doubleLuniteResult = calculateCost(
      asteritesNeeded,
      asteritesLeftOver,
      DOUBLE_PACK_TYPE
    );
    cost += doubleLuniteResult.total;
    asteritesLeftOver += doubleLuniteResult.asteritesLeftOver;
    asteritesNeeded = doubleLuniteResult.asteritesStillNeeded;
    packs = [...packs, ...doubleLuniteResult.packsPurchased];
  }

  // then check if banner bundles are available
  if (areBundlesAvailable) {
    const bundleResult = calculateCost(
      asteritesNeeded,
      asteritesLeftOver,
      BUNDLE_PACK_TYPE
    );
    cost += bundleResult.total;
    asteritesLeftOver += bundleResult.asteritesLeftOver;
    asteritesNeeded = bundleResult.asteritesStillNeeded;
    packs = [...packs, ...bundleResult.packsPurchased];
  }

  // then use the normal lunite bundles last
  // as they are the least value for money spent
  if (asteritesNeeded > 0) {
    const luniteResult = calculateCost(asteritesNeeded, asteritesLeftOver, '');
    cost += luniteResult.total;
    asteritesLeftOver += luniteResult.asteritesLeftOver;
    packs = [...packs, ...luniteResult.packsPurchased];
  }

  // if there is left over asterites
  // go through the packs needed to be purchase
  // remove any pack that have asterites that is less than the asterites left over

  return { total: cost, asteritesLeftOver, packsPurchased: packs };
};

export const calculateCost = (
  asteritesNeeded: number,
  asteritesLeftOver: number,
  packType: string
): CostResult => {
  let leftOver = asteritesLeftOver;
  let total = 0;
  let asteritesStillNeeded = asteritesNeeded;
  const packs = getPacks(packType);
  let packNeeded: RequiredPack[] = [];

  for (let i = 0; i < packs.length; i++) {
    if (asteritesStillNeeded <= 0) {
      break;
    }

    const tides = packs[i]?.radiantTides || 0;
    const packAsterite = packs[i]?.astrite || 0;
    const asteriteFromTides = tides * 160 + packAsterite;
    const asteriteFromLunite = packs[i]?.lunite || 0;
    const packAsteriteTotal = asteriteFromTides + asteriteFromLunite;

    let quantity = packs[i].limit;

    while (quantity > 0) {
      if (asteritesStillNeeded <= 0) {
        break;
      }

      asteritesStillNeeded -= packAsteriteTotal;
      total += packs[i].cost;

      const newRequiredPack: RequiredPack = {
        name: packs[i].name,
        cost: packs[i].cost,
        asterite: packAsteriteTotal,
        limit: packs[i].limit,
      };

      packNeeded.push(newRequiredPack);
      --quantity;
    }
  }

  return {
    total,
    asteritesLeftOver: leftOver,
    asteritesStillNeeded,
    packsPurchased: packNeeded,
  };
};

const getPacks = (type: string): any => {
  switch (type) {
    case DOUBLE_PACK_TYPE:
      return DOUBLE_TOP_UP_LUNITE_BUNDLES;
    case BUNDLE_PACK_TYPE:
      return SPECIAL_BANNER_BUNDLES;
    default:
      return LUNITE_BUNDLES;
  }
};

const removeUnnecessaryPacks = () => {};

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
