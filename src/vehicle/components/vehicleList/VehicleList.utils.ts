import type { Dispatch } from 'redux';
import { SetVehiclePage } from 'src/vehicle/redux/actions/types';
import { setVehiclePage } from 'src/vehicle/redux/actions/vehicle';

export function onPaginate(
    dispatch: Dispatch<SetVehiclePage>,
): ((page: number) => void) | undefined {
    return (pageIndex) => {
        dispatch(setVehiclePage({ pageIndex }));
    };
}
