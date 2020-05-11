import React from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Projection from "ol/proj/Projection";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import {Fill} from "ol/style";
import CircleStyle from "ol/style/Circle";
import EsriJSON from "ol/format/EsriJSON";
import Draw from "ol/interaction/Draw";

export default class QueryLayer extends React.Component {
  componentDidMount() {
    let projection =  new Projection({
      code: 'EPSG:4326',
      units: 'm'
    });

    let queryLayer = (polyGeometry) => {
      let url = 'http://10.6.8.104:6080/arcgis/rest/services/LSFRXX/MapServer/0/query?where=X+IS+NOT+NULL+AND+Y+IS+NOT+NULL&text=&objectIds=&time=&geometry=geometryParam&geometryType=esriGeometryPolygon&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=GEO_POINT&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson';
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
    }
    let vectorSource = new VectorSource({
      format: new EsriJSON({
        geometryName: 'GEO_POINT'
      })
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
    let drawSource = new VectorSource();
    let drawVector = new VectorLayer({
      source: drawSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });
    let draw = new Draw({
      source: drawSource,
      type: 'Polygon'
    });
    const map = new Map({
      layers: [drawVector,vectorLayer],
      target: document.getElementById('map'),
      view: new View({
        center: [120.60, 36.20],
        zoom: 24,
        minZoom:20,
        maxZoom:35,
        projection: projection,
        extent: [119.9440044999051, 35.784494675002925, 121.2790759907966, 36.56676312669716]
      })
    });
    map.addInteraction(draw);
    draw.on('drawstart', function(evt) {
      vectorSource.clear();
      drawSource.clear();
    });
    draw.on('drawend', function(evt) {
      let feature = evt.feature;
      let rings = '{"rings":[[['+feature.getGeometry().getCoordinates().flat().join('],[') + ']]]}]}';
      console.log(rings);
      queryLayer(rings);
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
