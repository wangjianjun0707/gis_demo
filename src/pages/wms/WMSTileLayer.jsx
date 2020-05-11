import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Projection from "ol/proj/Projection";
import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";

/**
 * 利用WMS加载瓦片
 * http://localhost:8000/arcgis/services/LSZT/MapServer/WMSServer?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=0%2C1%2C2%2C3%2C4&SRS=EPSG%3A4326&STYLES=&WIDTH=1537&HEIGHT=900&BBOX=120.37406087215106%2C36.03850501867233%2C120.80050816894862%2C36.28821391074637
 */
export default class WMSTileLayer extends React.Component {
  componentDidMount() {
    const wmsUrl = 'http://localhost:8000/arcgis/services/testwfs/MapServer/WMSServer';

    const layers = [
      new TileLayer({
        source: new TileWMS({
          url: wmsUrl,
          params: {'LAYERS': '0','VERSION':'1.1.1'},
          serverType: 'mapserver',
          crossOrigin: 'anonymous'
        })
      })
    ];
    const map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        center: [120.60, 36.20],
        zoom: 20,
        minZoom:20,
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
