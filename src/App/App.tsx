import "./App.css";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import Map from "../components/Map/Map";
import { Toaster } from "../components/ui/toaster/toaster";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "../components/theme-provider";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Map />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
