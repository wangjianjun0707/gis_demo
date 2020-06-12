import React from "react";
import { Input, Button } from "antd";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import Projection from "ol/proj/Projection";
import XYZ from "ol/source/XYZ";
import TileGrid from "ol/tilegrid/TileGrid";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import CircleStyle from "ol/style/Circle";

/**
 * 利用arcgis加载缓存
 * http://35.1.200.33:8080/QDKCY/arcgis/rest/services/LSSL_84/MapServer/tile/5/2448/13677
 */
export default class ArcGISXYZLayer2 extends React.Component {
  constructor() {
    super();
    this.vectorSource = new VectorSource();
    this.map = null;
  }
  state = {
    x: 0,
    y: 0
  };

  componentDidMount() {
    let projection = new Projection({
      code: "EPSG:4326"
    });
    const tileUrl =
      "http://10.6.8.104:6080/arcgis/rest/services/LSDOM/MapServer/tile/{z}/{y}/{x}";
    let resolutions = [
      0.00274658203125,
      0.001373291015625,
      6.866455078125e-4,
      3.4332275390625e-4,
      1.71661376953125e-4,
      8.58306884765625e-5,
      4.291534423828125e-5,
      2.1457672119140625e-5,
      1.0728836059570312e-5,
      5.364418029785156e-6,
      2.682209014892578e-6,
      1.341104507446289e-6
    ];

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({
            color: "rgba(255, 0, 0, 1)"
          })
        })
      }),
      visible: true,
      zIndex: 99
    });

    const layers = [
      new TileLayer({
        source: new XYZ({
          tileGrid: new TileGrid({
            tileSize: [256, 256],
            origin: [-400.0, 400.0],
            resolutions: resolutions
          }),
          projection: projection,
          url: tileUrl
        })
      }),
      vectorLayer
    ];

    this.map = new Map({
      layers: layers,
      target: "map",
      view: new View({
        center: [120.6, 36.2],
        zoom: 0,
        projection: projection,
        extent: [-180, -90, 180, 90],
        resolutions: resolutions
      })
    });
  }
  handleGetInputX = event => {
    this.setState({
      x: event.target.value
    });
  };
  handleGetInputY = event => {
    this.setState({
      y: event.target.value
    });
  };

  render() {
    let style = {
      width: "1024px",
      height: "600px"
    };
    const fit = () => {
      this.vectorSource.clear();
      this.vectorSource.addFeature(
        new Feature(new Point([this.state.x, this.state.y]))
      );
      this.map.getView().setCenter([this.state.x, this.state.y]);
    };
    return (
      <div>
        <div>
          <Input
            placeholder="x"
            value={this.state.x}
            onChange={this.handleGetInputX}
          />
          <Input
            placeholder="y"
            value={this.state.y}
            onChange={this.handleGetInputY}
          />
          <Button type="primary" htmlType="submit" onClick={fit}>
            定位
          </Button>
        </div>
        <div id="map" style={style} />
      </div>
    );
  }
}
