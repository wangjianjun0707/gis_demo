import React from "react";
import mapBoxGL from "mapbox-gl";
import "mapbox-gl/src/css/mapbox-gl.css";
import commonCss from "../css/common.less";

export default class MapBox extends React.Component {
  componentDidMount() {
    mapBoxGL.accessToken =
      "pk.eyJ1Ijoid2FuZ2ppYW5qdW4iLCJhIjoiY2pqaTdhZDVuMDJzMzNvcGNmN3BlZWxoayJ9.028X0R3bCXBLmn69Vhjl-w";
    const map = new mapBoxGL.Map({
      container: "map",
      style: "mapbox://styles/wangjianjun/cka2az94k00mi1isv82agv1cy"
    });
  }

  render() {
    return <div id="map" className={commonCss.mapBox}></div>;
  }
}
