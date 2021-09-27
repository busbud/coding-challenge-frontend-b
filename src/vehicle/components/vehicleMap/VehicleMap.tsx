import GoogleMapReact from 'google-map-react';
import React, {useMemo, useState} from 'react';
import {useVehicleSelector} from 'src/redux/selector';

import {getVehicleColor} from '../vehicle.utils';
import { Marker } from './vehicleMapMarker/VehicleMapMarker';

const DEFAULT_ZOOM = 18;

const mapContainer = {
    width: 'calc(100% - 400px)',
    height: '100vh',
    position: 'absolute',
    top: 0,
    right: 0,
};

const CENTER = {
    lat: 53.5532316,
    lng: 10.0087783,
};

const VehicleMap = (): React.ReactElement => {
    const {vehicles} = useVehicleSelector();
    const [center, setCenter] = useState(vehicles?.length > 0 ? { lat: vehicles[0].coordinate.latitude,  lng: vehicles[0].coordinate.longitude }: CENTER);
    const [zoom, setZoom] = useState(11);

    return useMemo(
        () => (
            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.GOOGLE_MAP_API_KEY ?? '',
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    {vehicles.map((vehicle, index) => (
                        <Marker
                            id={vehicle.id}
                            name={vehicle.name}
                            index={index}
                            color={getVehicleColor(vehicle.type)}
                            key={vehicle.id}
                            lat={vehicle.coordinate.latitude}
                            lng={vehicle.coordinate.longitude}
                            tooltip={vehicle.address}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        ),
        [vehicles],
    );
};

export default VehicleMap;
