import { useEffect, useRef } from "react";

import { initializeMap } from "./esri/map";

function App() {
  const mapRef = useRef();

  useEffect(() => {
    const [webmap, view] = initializeMap(mapRef.current);
    console.log(webmap);
    console.log(view);

    view.map.loadAll().then(() => {
      // add the select by rectangle button the view
    });
  }, []);
  return <div id="viewDiv" className="h-screen" ref={mapRef} />;
}

export default App;
