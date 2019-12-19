import SceneView from 'esri/views/SceneView';
import Map from 'esri/Map';
import Basemap from 'esri/Basemap';
import TileLayer from 'esri/layers/TileLayer';

import { layerConfig } from '../config';

const baseLayers = layerConfig.basemaps.map(baseLayerConfig => {
    const { type } = baseLayerConfig;
    if (type === 'tiled') {
        delete baseLayerConfig.type;
        return new TileLayer(baseLayerConfig);
    }
});

const map = new Map({
    basemap: new Basemap({ baseLayers: baseLayers as any })
});

export const view = new SceneView({
    container: 'viewDiv',
    map
});

/**
 * Assigns the container element to the View
 * @param container
 */
export const initialize = (container: HTMLDivElement) => {
    view.container = container;
    view.when()
        .then(_ => {
            console.log('Map and View are ready');
        })
        .catch(error => {
            console.warn('An error in creating the map occurred:', error);
        });
};
