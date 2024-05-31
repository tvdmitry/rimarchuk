import { WaterTrackerProps } from '@/pages/main/components/WaterTracker';
import { AuthUser } from '@/utils/types';

import css from './WaterTrackerHeader.module.scss';
import { WaterVolume } from './WaterVolume';

export type WaterTrackerHeaderProps = any;

export const WaterTrackerHeader = () => {
    return (
        <div className={css.waterTrackerHeader}>
            <div className={css.trackerTitle}>Трекер воды</div>
            <WaterVolume />
        </div>
    );
};
