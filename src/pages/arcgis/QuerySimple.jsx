import React from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Projection from "ol/proj/Projection";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import { Fill } from "ol/style";
import CircleStyle from "ol/style/Circle";
import EsriJSON from "ol/format/EsriJSON";

export default class QueryLayer extends React.Component {
  componentDidMount() {
    let vectorSource = new VectorSource({
      format: new EsriJSON({
        geometryName: "SHAPE"
      }),
      loader: function(extent, resolution, projection) {
        let url =
          "http://localhost:6080/arcgis/rest/services/testwfs/MapServer/0/query?where=X+IS+NOT+NULL+AND+Y+IS+NOT+NULL&text=&objectIds=&time=&geometry=%7B%22rings%22%3A%5B%5B%5B120.43487548828125%2C+36.242058024971151%5D%2C+%5B120.54199218749999%2C+36.242058024971151%5D%2C+%5B120.54199218749999%2C+36.177791083290742%5D%2C+%5B120.43487548828125%2C+36.177791083290742%5D%2C%0D%0A%5B120.43487548828125%2C+36.242058024971151%5D%5D%5D%7D%0D%0A%5B120.43487548828125%2C+36.242058024971151%5D%5D%5D%7D%5D%7D&geometryType=esriGeometryPolygon&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SHAPE&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        let onError = function() {
          vectorSource.removeLoadedExtent(extent);
        };
        xhr.onerror = onError;
        xhr.onload = function() {
          if (xhr.status == 200) {
            vectorSource.addFeatures(
              vectorSource.getFormat().readFeatures(xhr.responseText, {
                dataProjection: projection,
                extent: [
                  119.9440044999051,
                  35.784494675002925,
                  121.2790759907966,
                  36.56676312669716
                ]
              })
            );
            console.log(vectorSource.getAttributions());
          } else {
            onError();
          }
        };
        xhr.send();
      },
      strategy: bboxStrategy
    });

    let vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "rgba(0, 0, 255, 1)"
          })
        })
      }),
      visible: true,
      zIndex: 99
    });
    const map = new Map({
      layers: [vectorLayer],
      target: document.getElementById("map"),
      view: new View({
        center: [120.6, 36.2],
        zoom: 24,
        minZoom: 20,
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
  }

  render() {
    let style = {
      width: "1024px",
      height: "600px"
    };
    return <div id="map" style={style}></div>;
  }
}
