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
import { WFS, GML3 } from "ol/format";
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";
import CircleStyle from "ol/style/Circle";

export default class WFSPoint2 extends React.Component {
  componentDidMount() {
    const wmsUrl =
      "http://localhost:8000/arcgis/services/LSZT/MapServer/WMSServer";
    let imagelayer = new ImageLayer({
      source: new ImageWMS({
        url: wmsUrl,
        params: { LAYERS: "0,1,2,3,4", VERSION: "1.1.1" },
        serverType: "mapserver",
        crossOrigin: "anonymous"
      }),
      zIndex: 0
    });
    let vectorSource = new VectorSource({
      format: new WFS({
        featureNS:
          "http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer",
        featureType: "SDE.LEGAL_PERSON_COLLECTION_INFO",
        // schemaLocation: 'http://www.opengis.net/gml http://schemas.opengis.net/gml/3.2.1/gml.xsd http://www.opengis.net/ogc http://schemas.opengis.net/filter/2.0/filter.xsd http://www.opengis.net/ows/1.1 http://schemas.opengis.net/ows/1.1.0/owsAll.xsd http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd http://www.opengis.net/fes/2.0 http://schemas.opengis.net/filter/2.0/filterAll.xsd',
        gmlFormat: new GML3({
          featureNS:
            "http://localhost:6080/arcgis/services/testwfs/MapServer/WFSServer",
          featureType: "SDE.LEGAL_PERSON_COLLECTION_INFO",
          srsName: "EPSG:4326"
        })
      }),
      loader: function(extent, resolution, projection) {
        let url =
          "http://localhost:8000/arcgis/services/testwfs/MapServer/WFSServer?service=WFS&" +
          "version=1.0.0&request=GetFeature&typename=testwfs:SDE.LEGAL_PERSON_COLLECTION_INFO&" +
          "srsname=EPSG:4326&outputformat=gml3&" +
          "bbox=" +
          extent.join(",");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        let onError = function() {
          vectorSource.removeLoadedExtent(extent);
        };
        xhr.onerror = onError;
        xhr.onload = function() {
          if (xhr.status == 200) {
            vectorSource.addFeatures(
              vectorSource.getFormat().readFeatures(xhr.responseXML, {
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
      layers: [imagelayer, vectorLayer],
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
