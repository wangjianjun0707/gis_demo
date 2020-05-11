import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer} from 'ol/layer';
import Projection from "ol/proj/Projection";
import TileArcGISRest from "ol/source/TileArcGISRest";

/**
 * 利用arcgis的export生成瓦片图层
 * http://localhost:6080/arcgis/rest/services/LSZT/MapServer/export?F=image&FORMAT=PNG32&TRANSPARENT=true&SIZE=256%2C256&BBOX=121.0886450521648%2C36.08799520134926%2C121.38689294638101%2C36.386243095565476&BBOXSR=4326&IMAGESR=4326&DPI=90
 */
export default class ArcGISTileLayer extends React.Component {


  componentDidMount() {
    const url = 'http://localhost:6080/arcgis/rest/services/LSZT/MapServer';

    const layers = [
      new TileLayer({
        source: new TileArcGISRest({
          params: {},
          project: 'EPSG:4326',
          url: url
        })
      })
    ];
    const map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        center: [120.60, 36.20],
        zoom: 26,
        minZoom:24,
        maxZoom:35,
        projection: new Projection({
          code: 'EPSG:4326',
          units: 'm'
        }),
        extent: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
      })
    });
    map.getView().on('change:resolution',()=>{
      console.log(map.getView().getZoom());
    })

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
