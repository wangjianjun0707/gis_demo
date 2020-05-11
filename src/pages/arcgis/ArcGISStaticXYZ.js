import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import * as Proj from 'ol/proj';
import XYZ from "ol/source/XYZ"
import Tile from "ol/layer/Tile";


export default class ArcGISStaticXYZ extends React.Component {
  componentDidMount() {
    const zeroPad = function (num, len, radix) {
      let str = num.toString(radix || 10);
      while (str.length < len) {
        str = "0" + str;
      }
      return str.toUpperCase();
    }
    const minZoom=0;
    const maxZoom=14;
    const centX=111.526056764348;
    const centY=27.3814471530971;
    const epsg = 'EPSG:3857';
    const projection = Proj.get(epsg);
    const tileUrl = 'http://192.168.1.107/map/layers/';
    const format='.png';


    const map = new Map({
      target: 'map',
      view: new View({
        center: [centX, centY],
        projection: Proj.get("EPSG:4326"),
        zoom: maxZoom,
        minZoom: minZoom
      })
    });

    let tileArcGISXYZ = new XYZ({
      tileUrlFunction: function (tileCoord) {
        //console.log(map.getLayers()[0].extend());
        let z = tileCoord[0];
        let x = tileCoord[1];
        let y = parseInt(tileCoord[2]);
        x = 'C' + zeroPad(x, 8, 16);
        y = 'R' + zeroPad(y, 8, 16);
        z = 'L' + zeroPad(z, 2, 10);
        const url = tileUrl + z + '/' + y + '/' + x + '.png';
        return url;
      }
    });
    map.addLayer(new Tile({
      source: tileArcGISXYZ,
    }),)
  }

  render() {
    let style={
      width:'1024px',
      height:'1080px'
    }
    return (
      <div id="map" style={style}></div>
    );
  }
}
