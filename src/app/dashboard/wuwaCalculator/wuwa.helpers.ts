import {
  SPECIAL_BANNER_BUNDLES,
  DOUBLE_TOP_UP_LUNITE_BUNDLES,
  LUNITE_BUNDLES,
} from './wuwa.constants';

export interface WuwaBannerCosts {
  total: number;
  asteritesLeftOver: number;
}

export interface CostResult {
  total: number;
  asteritesLeftOver: number;
  asteritesStillNeeded: number;
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
  }

  // then use the normal lunite bundles last
  // as they are the least value for money spent
  if (asteritesNeeded > 0) {
    const luniteResult = calculateCost(asteritesNeeded, asteritesLeftOver, '');
    cost += luniteResult.total;
    asteritesLeftOver += luniteResult.asteritesLeftOver;
  }

  return { total: cost, asteritesLeftOver };
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

  return { total, asteritesLeftOver: leftOver, asteritesStillNeeded };
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

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
