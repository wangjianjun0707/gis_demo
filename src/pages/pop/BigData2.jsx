import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Projection from "ol/proj/Projection";
import VectorSource from "ol/source/Vector";

import {tile as tileStrategy} from "ol/loadingstrategy";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import {Circle, Fill, Stroke} from "ol/style";
import {createXYZ} from 'ol/tilegrid'
import {WFS} from "ol/format";
import {bbox} from "ol/format/filter";
import GML3 from "ol/format/GML3";

export default class BigData extends React.Component {
  componentDidMount() {
    let vectorSource = new VectorSource({
        format: new WFS({
          featureNS: 'http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer',
          featureType: 'SDE.LEGAL_PERSON_COLLECTION_INFO',
          gmlFormat: new GML3({
            featureNS: 'http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer',
            featureType: 'SDE.LEGAL_PERSON_COLLECTION_INFO',
            srsName: 'EPSG:4326'
          })
        }),
        loader: function (extent, resolution, projection) {
          let featureRequest = new WFS().writeGetFeature({
            srsName: 'EPSG:4326',
            featureNS: 'http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer',
            featurePrefix: 'testwfs',
            featureTypes: ['SDE.LEGAL_PERSON_COLLECTION_INFO'],
            version: '1.0.0',
            outputFormat: 'gml3',
            filter: bbox('SHAPE',extent)
          });

          fetch('http://localhost:8000/arcgis/services/testwfs/MapServer/WFSServer', {
            method: 'POST',
            body: new XMLSerializer().serializeToString(featureRequest)
          }) .then(response => response.text())
            .then(function (data) {
              vectorSource.addFeatures(
                vectorSource.getFormat().readFeatures(data, {
                  dataProjection: projection,
                  extent: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
                })
              );
            });
        },
      strategy: tileStrategy(createXYZ({
        tileSize: 256
      }))
    });

    let vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({
            color: [0, 153, 255, 1]
          }),
          stroke: new Stroke({
            color: [255, 255, 255, 1],
            width: 2
          })
        }),
        zIndex: Infinity
      }),
      visible:true,
      zIndex: 99
    });

    const map = new Map({
      layers: [vectorLayer],
      target: 'map',
      view: new View({
        center: [120.60, 36.20],
        zoom: 25,
        minZoom:25,
        maxZoom:35,
        projection: new Projection({
          code: 'EPSG:4326',
          units: 'm'
        }),
        extent: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
      })
    });
  }

  render() {
    let style={
      width:'1024px',
      height:'600px'
    }
    return (
      <div>
        <div id="popup" className="ol-popup">
          <a href="#" id="popup-closer" className="ol-popup-closer"></a>
          <div id="popup-content"></div>
        </div>
        <div id="map" style={style}></div>
      </div>
    );
  }
}
