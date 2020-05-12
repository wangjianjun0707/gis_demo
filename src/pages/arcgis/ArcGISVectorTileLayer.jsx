import React from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Projection from "ol/proj/Projection";
import Style from "ol/style/Style";
import { Icon } from "ol/style";
import EsriJSON from "ol/format/EsriJSON";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import faren from "@/assets/WechatIMG16.png";

export default class ArcGISVectorTileLayer extends React.Component {
  componentDidMount() {
    let vectorSource = new VectorTileSource({
      format: new EsriJSON({
        geometryName: "GEO_POINT"
      }),
      url: "http://localhost/tiles/{z}/{x}/{y}",
      tileLoadFunction: function(title, url) {
        title.setLoader(function(extent, resolution, projection) {
          let queryUrl =
            "http://10.6.8.104:6080/arcgis/rest/services/LSQGSZT/MapServer/0/query?where=1=1&text=&objectIds=&time=&geometry=geometryParam&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=GEO_POINT&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson";
          queryUrl = queryUrl.replace("geometryParam", extent.flat().join(","));
          let xhr = new XMLHttpRequest();
          xhr.open("GET", queryUrl);
          let onError = function() {
            vectorSource.removeLoadedExtent(extent);
          };
          xhr.onerror = onError;
          xhr.onload = function() {
            if (xhr.status == 200) {
              title.setFeatures(
                title.getFormat().readFeatures(xhr.responseText, {
                  dataProjection: projection,
                  extent: [
                    119.9440044999051,
                    35.784494675002925,
                    121.2790759907966,
                    36.56676312669716
                  ]
                })
              );
            } else {
              onError();
            }
          };
          xhr.send();
        });
      }
    });

    const img = undefined;
    let vectorLayer = new VectorTileLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          crossOrigin: "anonymous",
          src: faren,
          img,
          imgSize: img ? [img.width, img.height] : undefined
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
        minZoom: 2,
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
