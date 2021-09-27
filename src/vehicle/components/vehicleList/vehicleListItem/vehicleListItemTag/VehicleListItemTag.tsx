import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { RateType, State, VehicleType } from 'src/types/enums';
import { Tag } from 'antd';
import React from 'react';
import { FREENOW_COLOR, SHARENOW_COLOR } from '../../../vehicle.constants';


export const getStateColor = (state: string): string => {
    if (state === RateType.GOOD || state === State.ACTIVE)
        return 'success';
    if (state === RateType.UNACCEPTABLE || state === State.INACTIVE)
        return 'error';
    if (state === VehicleType.FREENOW)
        return FREENOW_COLOR;
    if (state === VehicleType.SHARENOW)
        return SHARENOW_COLOR;

    return '';
};
const getIcon = (state: string): JSX.Element | null => {
    if (state === RateType.GOOD || state === State.ACTIVE)
        return <CheckCircleOutlined />;
    if (state === RateType.UNACCEPTABLE || state === State.INACTIVE)
        return <CloseCircleOutlined />;

    return null;
};
type TagWithIconProps = {
    state: string;
    title: string;
};
export const TagWithIcon: React.FC<TagWithIconProps> = ({ state, title }) => {
    const Icon = getIcon(state);
    const color = getStateColor(state);

    return (
        <Tag icon={Icon} color={color}>
            {title}
        </Tag>
    );
};
