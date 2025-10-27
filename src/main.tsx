import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1200,
  once: true,
  offset: 100,
  easing: "ease-in-out",
});

createRoot(document.getElementById("root")!).render(<App />);
