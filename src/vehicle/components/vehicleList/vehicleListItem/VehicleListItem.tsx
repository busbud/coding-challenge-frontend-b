import {Badge, List, Tag} from 'antd';
import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useVehicleSelectedSelector} from 'src/redux/selector';
import {State} from 'src/types/enums';
import {setVehicleSelected} from 'src/vehicle/redux/actions/vehicle';

import { TagWithIcon, getStateColor } from "./vehicleListItemTag/VehicleListItemTag";
import {VehicleProps} from './VehicleListItem.types';

export const Vehicle: React.FC<VehicleProps> = ({item}): React.ReactElement => {
    const dispatch = useDispatch();
    const {selectedVehicleId} = useVehicleSelectedSelector();

    const setSelected = (selected: boolean) => {
        dispatch(setVehicleSelected({id: item.id, selected}));
    };

    return useMemo(
        () => (
            <List.Item
                onMouseEnter={() => setSelected(true)}
                onMouseLeave={() => setSelected(false)}
                key={item.id}
                style={
                    item.id === selectedVehicleId
                        ? {backgroundColor: 'lightgray'}
                        : {}
                }
            >
                <List.Item.Meta
                    title={
                        <>
                            <Badge size="small" count={item.id}></Badge>
                            {item.name}
                        </>
                    }
                />
                <Tag color={getStateColor(item.type)}>{item.type}</Tag>
                {item.state !== State.UNKNOWN && (
                    <TagWithIcon state={item.state} title={item.state} />
                )}
                {item.rate !== undefined && (
                    <>
                        <TagWithIcon
                            state={item.rate.interior}
                            title="INTERIOR"
                        />
                        <TagWithIcon
                            state={item.rate.exterior}
                            title="EXTERIOR"
                        />
                    </>
                )}
            </List.Item>
        ),
        [selectedVehicleId, item.id],
    );
};
