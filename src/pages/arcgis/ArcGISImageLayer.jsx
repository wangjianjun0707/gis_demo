import React from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Image as ImageLayer } from "ol/layer";
import { ImageArcGISRest } from "ol/source";
import Projection from "ol/proj/Projection";
/**
 * 利用arcgis的export生成图片图层
 * http://localhost:6080/arcgis/rest/services/LSZT/MapServer/export?F=image&FORMAT=PNG32&TRANSPARENT=true&SIZE=1024%2C600&BBOX=120.28363938601572%2C35.96702398039833%2C120.95117513146147%2C36.35815820624544&BBOXSR=4326&IMAGESR=4326&DPI=90
 */
export default class ArcGISImageLayer extends React.Component {
  componentDidMount() {
    const url = "http://10.6.8.104:6080/arcgis/rest/services/LSZT/MapServer";

    const layers = [
      new ImageLayer({
        source: new ImageArcGISRest({
          ratio: 1,
          params: {},
          project: "EPSG:4326",
          url: url
        })
      })
    ];
    const map = new Map({
      layers: layers,
      target: "map",
      view: new View({
        center: [120.6, 36.2],
        zoom: 26,
        minZoom: 24,
        maxZoom: 35,
        projection: new Projection({
          code: "EPSG:4326",
          units: "m"
        }),
        extent: [
          119.9440044999051,
          35.784494675002925,
          121.2790759907966,
          36.56676312669716
        ]
      })
    });
    myMap = map;
  }

  render() {
    let style = {
      width: "1024px",
      height: "600px"
    };
    return <div id="map" style={style}></div>;
  }
}
