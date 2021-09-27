import type { ReactNode } from 'react';
import type { IStop } from 'src/types';

export type DepartureStopProps = {
    item: IStop;
    actions: ReactNode[];
};
