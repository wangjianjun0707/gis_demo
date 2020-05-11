import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Projection from "ol/proj/Projection";
import VectorSource from "ol/source/Vector";

import {tile as tileStrategy} from "ol/loadingstrategy";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import {Fill} from "ol/style";
import EsriJSON from "ol/format/EsriJSON";
import {createXYZ} from 'ol/tilegrid'

export default class BigData extends React.Component {
  componentDidMount() {
    let vectorSource = new VectorSource({
        format: new EsriJSON({
          geometryName: 'SHAPE'
        }),
        loader: function (extent, resolution, projection) {
          let url = 'http://localhost:6080/arcgis/rest/services/testwfs/MapServer/0/query?where=X+IS+NOT+NULL+AND+Y+IS+NOT+NULL&text=&objectIds=&time=&geometry=geometryParam&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SHAPE&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson';
          let polyGeometry = encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
            extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3]+',"spatialReference":{"wkid":4326}}');
          let queryUrl = url.replace('geometryParam', polyGeometry);
          let xhr = new XMLHttpRequest();
          xhr.open('GET', queryUrl);
          let onError = function () {
            vectorSource.removeLoadedExtent(extent);
          }
          xhr.onerror = onError;
          xhr.onload = function () {
            if (xhr.status == 200) {
              vectorSource.addFeatures(
                vectorSource.getFormat().readFeatures(xhr.responseText, {
                  dataProjection: projection,
                  extent: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
                })
              );
              console.log(vectorSource.getAttributions())
            } else {
              onError();
            }
          }
          xhr.send();
        },
      strategy: tileStrategy(createXYZ({
        tileSize: 256
      }))
    });

    let vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: 'rgba(0, 0, 255, 1)'
          })
        })
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
