import { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { Alert } from "react-native";

type BikeStation = {
    properties: {
        ID: string;
        Nimi: string;
        Osoite: string;
        x: number;
        y: number;
    };
};

const HSL_URL = "https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.geojson"

async function getHslData(): Promise<BikeStation[]> {
    const response = await fetch(HSL_URL);
    if (!response.ok) {
        console.log(response)
        throw new Error(`Error code ${response.status}`)
    }
    const json = await response.json();
    return json.features;
}

export default function Kartta() {

    const [bikeStations, setBikeStations] = useState<BikeStation[]>([]);

    const [omaSijainti, setOmaSijainti] = useState<Location.LocationObject | null>(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("No permission to get location")
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setOmaSijainti(location);
        })();
    }, []);


    useEffect(() => {
        getHslData().then(stations => {
            setBikeStations(stations);
        });
    }, []);

    return (
        <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
                latitude: 60.200692,
                longitude: 24.934302,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            }}
        >

            {omaSijainti && (
                <Marker
                    coordinate={{
                        latitude: omaSijainti.coords.latitude,
                        longitude: omaSijainti.coords.longitude,
                    }}
                    title="Oma sijainti"
                    description="huutista"
                />
            )}

            {bikeStations.map(station => {
                return <Marker
                    key={station.properties.ID}
                    coordinate={{ latitude: station.properties.y, longitude: station.properties.x }}
                    title={station.properties.Nimi}
                    description={station.properties.Osoite}
                ></Marker>
            })}


        </MapView>
    )

}