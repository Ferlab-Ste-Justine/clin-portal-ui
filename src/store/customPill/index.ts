import { useSelector } from 'react-redux';

import { customPillSelector } from './selector';

export type { TCustomPillState } from './types';
export { default, CustomPillState } from './slice';
export const useCustomPill = () => useSelector(customPillSelector);
