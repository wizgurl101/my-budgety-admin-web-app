import {
  SPECIAL_BANNER_BUNDLES,
  DOUBLE_TOP_UP_LUNITE_BUNDLES,
  LUNITE_BUNDLES,
} from './wuwa.constants';

export interface WuwaBannerCosts {
  total: number;
  asteritesLeftOver: number;
}

export const calculateBannerCost = (
  asterites: number,
  radiantTides: number,
  lunites: number,
  pity: number,
  isGuaranteed: boolean = false,
  areBundlesAvailable: boolean = false,
  areDoubleLuniteAvailable: boolean = false
): WuwaBannerCosts => {
  let cost = 0;
  let asteritesLeftOver = 0;
  const characterPity = isGuaranteed ? 80 - pity : 160 - pity;
  const asteritesNeeded = characterPity * 160;

  // check if double lunite bundles are available and use them if they are
  // since they are of the best value

  // then check if banner bundles are available

  // then use the normal lunite bundles last
  // as they are the least value for money spent

  return { total: cost, asteritesLeftOver };
};

export const calculatePullCost = (pullNumber: number): number => {
  return 0;
};

const getPacks = (type: string): any => {
  switch (type) {
    case 'double':
      return DOUBLE_TOP_UP_LUNITE_BUNDLES;
    case 'bundle':
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
