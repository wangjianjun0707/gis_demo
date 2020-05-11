import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Projection from "ol/proj/Projection";
import Style from "ol/style/Style";
import {Circle, Fill} from "ol/style";
import CircleStyle from "ol/style/Circle";
import EsriJSON from "ol/format/EsriJSON";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from 'ol/source/VectorTile';


export default class ArcGISVectorTileLayer2 extends React.Component {
  componentDidMount() {

    let vectorSource = new VectorTileSource({
      format: new EsriJSON({
        geometryName: '形状'
      }),
      url: 'http://localhost/tiles/{z}/{x}/{y}',
      tileLoadFunction: function (title, url) {
        title.setLoader(function(extent, resolution, projection) {
          let queryUrl = 'http://10.6.8.104:6080/arcgis/rest/services/LSQGSZT/MapServer/0/query?where=1=1&objectIds=&time=&geometry=geometryParam&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=形状&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson';
          //queryUrl = queryUrl.replace('geometryParam', extent.flat().join(','));
          let xhr = new XMLHttpRequest();
          xhr.open('GET', queryUrl);
          let onError = function () {
            vectorSource.removeLoadedExtent(extent);
          }
          xhr.onerror = onError;
          xhr.onload = function () {
            if (xhr.status == 200) {
              title.setFeatures(
                title.getFormat().readFeatures(xhr.responseText, {
                  dataProjection: projection,
                  extent: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
                })
              );
            } else {
              onError();
            }
          }
          xhr.send();
        });

      }
    });

    let vectorLayer = new VectorTileLayer({
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
      target: document.getElementById('map'),
      view: new View({
        center: [120.60, 36.20],
        zoom: 24,
        minZoom:2,
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
    let style = {
      width: '1024px',
      height: '600px'
    }
    return (
      <div id="map" style={style}></div>
    );
  }
}
