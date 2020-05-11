import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer} from 'ol/layer';
import Projection from "ol/proj/Projection";
import XYZ from "ol/source/XYZ";
import TileGrid from "ol/tilegrid/TileGrid";

/**
 * 利用arcgis加载缓存
 * http://35.1.200.33:8080/QDKCY/arcgis/rest/services/LSSL_84/MapServer/tile/5/2448/13677
 */
export default class ArcGISXYZLayer2 extends React.Component {
  componentDidMount() {
    let projection = new Projection({
      code: 'EPSG:4326'
    });
    const tileUrl = 'http://localhost:6080/arcgis/rest/services/SampleWorldCities/MapServer/tile/{z}/{y}/{x}';
    let resolutions =
      [
        0.00274658203125,
        0.001373291015625,
        6.866455078125E-4,
        3.4332275390625E-4,
        1.71661376953125E-4,
        8.58306884765625E-5,
        4.291534423828125E-5,
        2.1457672119140625E-5,
        1.0728836059570312E-5,
        5.364418029785156E-6,
        2.682209014892578E-6,
        1.341104507446289E-6
      ];
    const layers = [
      new TileLayer({
        source: new XYZ({
          tileGrid: new TileGrid({
            tileSize: [256, 256],
            origin: [-400.0, 400.0],
            resolutions: resolutions
          }),
          projection: projection,
          url: tileUrl
        })
      })
    ];
    const map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        center: [120.60, 36.20],
        zoom: 0,
        projection: projection,
        extent: [-180,-90,180,90],
        resolutions: resolutions
      })
    });
  }

  render() {
    let style={
      width:'1024px',
      height:'600px'
    }
    return (
      <div id="map" style={style}></div>
    );
  }
}
