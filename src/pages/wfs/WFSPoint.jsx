import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Projection from "ol/proj/Projection";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {WFS} from 'ol/format';
import {
  and, bbox, equalTo,
  within
} from 'ol/format/filter';
import {Fill, Stroke, Circle, Style} from 'ol/style';
import Polygon from 'ol/geom/Polygon';
import GML2 from "ol/format/GML2";
import GML3 from "ol/format/GML3";

export default class WFSPoint extends React.Component {


  componentDidMount() {
    let vectorSource = new VectorSource();
    let vector = new VectorLayer({
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
      })
    });

    const map = new Map({
      layers: [vector],
      target: 'map',
      view: new View({
        center: [120.60, 36.20],
        zoom: 26,
        minZoom: 24,
        maxZoom: 35,
        projection: new Projection({
          code: 'EPSG:4326',
          units: 'm'
        }),
        extent: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
      })
    });

    let featureRequest = new WFS().writeGetFeature({
      srsName: 'EPSG:4326',
      featureNS: 'http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer',
      featurePrefix: 'testwfs',
      featureTypes: ['SDE.LEGAL_PERSON_COLLECTION_INFO'],
      version: '1.0.0',
      outputFormat: 'gml3',
      //bbox: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
      filter: bbox('SHAPE',[119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716])//equalTo('ID', '31072') //within('test', new Polygon([120.55959414, 36.25725340], [120.55944052, 36.25732277], [120.55917158, 36.25737814], [120.55896376, 36.25740723], [120.55881207, 36.25742846], [120.55873468, 36.25743808], [120.55866655, 36.25744655], [120.55859212, 36.25745581], [120.55848341, 36.25728700], [120.55834599, 36.25716093], [120.55959414, 36.25725340]), 'EPSG:4326')

    });

    fetch('http://localhost:8000/arcgis/services/testwfs/MapServer/WFSServer', {
      method: 'POST',
      body: new XMLSerializer().serializeToString(featureRequest)
    }) .then(response => response.text())
      .then(function (data) {
      let gml = new WFS({
        featureNS: 'http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer',
        featureType: 'SDE.LEGAL_PERSON_COLLECTION_INFO',
        schemaLocation: 'http://www.opengis.net/gml http://schemas.opengis.net/gml/3.2.1/gml.xsd http://www.opengis.net/ogc http://schemas.opengis.net/filter/2.0/filter.xsd http://www.opengis.net/ows/1.1 http://schemas.opengis.net/ows/1.1.0/owsAll.xsd http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd http://www.opengis.net/fes/2.0 http://schemas.opengis.net/filter/2.0/filterAll.xsd',
        gmlFormat: new GML3({
          featureNS: 'http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer',
          featureType: 'SDE.LEGAL_PERSON_COLLECTION_INFO',
          srsName: 'EPSG:4326'
        })
      });
      let features = gml.readFeatures(data);
      vectorSource.addFeatures(features);
      //map.getView().fit(vectorSource.getExtent());
    });
  }

  render() {
    let style = {
      width: '1024px',
      height: '600px'
    }
    return (
      <div id="map" style={style}></div>
    );
  }
}
