import './VehicleMapMarker.styles.scss';

import {Tooltip} from 'antd';
import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {
    useVehicleSelectedSelector,
    useVehicleSelector,
} from 'src/redux/selector';
import {PAGE_SIZE} from 'src/vehicle/components/vehicle.constants';
import {setVehicleSelected} from 'src/vehicle/redux/actions/vehicle';

type MarkerProps = {
    color: string;
    name: string;
    id: number;
    onClick?: any;
    lat: number;
    lng: number;
    tooltip?: string;
    index: number;
};
export const Marker: React.FC<MarkerProps> = ({
    color,
    name,
    id,
    onClick,
    tooltip,
    index,
}) => {
    const {selectedVehicleId} = useVehicleSelectedSelector();
    const {pageIndex} = useVehicleSelector();
    const visibleVehicleStartIndex = (pageIndex - 1) * PAGE_SIZE;
    const visible =
        index >= visibleVehicleStartIndex &&
        index < visibleVehicleStartIndex + PAGE_SIZE;

    const dispatch = useDispatch();

    const setSelected = (selected: boolean) => {
        dispatch(setVehicleSelected({id, selected}));
    };

    const getVisible = () => {
        if (visible && selectedVehicleId === id) {
            return 'scale(3.5)';
        }

        if (visible || selectedVehicleId === id) {
            return 'scale(2.0)';
        }

        return 'scale(1)';
    };

    return useMemo(
        () => (
            <Tooltip title={tooltip}>
                <div
                    onMouseEnter={() => setSelected(true)}
                    onMouseLeave={() => setSelected(false)}
                    onClick={onClick}
                    key={id}
                    className="marker"
                    style={{
                        background: color,
                        transform: getVisible(),
                        zIndex: visible || selectedVehicleId === id ? 1 : 0,
                    }}
                    title={name}
                >
                    1
                </div>
            </Tooltip>
        ),
        [selectedVehicleId, visible],
    );
};
