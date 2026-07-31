import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import BirthdayLanding from "../Screen/BirthdayLanding";
import SelectionPage from "../Screen/SelectionPage";
import PhotoGallery from "../Screen/PhotoGallery";
import Letter from "../Screen/Letter";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<BirthdayLanding />} />
      
      {/* New route for the Selection Page */}
      <Route path="selection" element={<SelectionPage />} />
      <Route path="gallery" element={<PhotoGallery />} />
      <Route path="latter" element={<Letter />} />
    </Route>
  )
);