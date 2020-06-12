import React from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Draw from "ol/interaction/Draw";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { circular as circularPolygon } from "ol/geom/Polygon";

export default class extends React.Component {
  componentDidMount() {
    const raster = new TileLayer({
      source: new OSM()
    });

    const source = new VectorSource({
      wrapX: false
    });

    const vector = new VectorLayer({
      source: source
    });

    const map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        projection: "EPSG:4326",
        center: [120.6, 36.2],
        zoom: 4
      })
    });

    const draw = new Draw({
      source: source,
      type: "Circle",
      freehand: true
    });
    map.addInteraction(draw);
    draw.on("drawend", function(event) {
      const oldc = event.feature.getGeometry();
      console.log(oldc);
      const circle = circularPolygon(oldc.getCenter(), oldc.getRadius(), 64);
      console.log(circle.getCoordinates());
    });
  }

  render() {
    let style = {
      width: "1024px",
      height: "600px"
    };
    return <div id="map" style={style}></div>;
  }
}
