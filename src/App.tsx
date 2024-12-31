import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Login from "@/pages/admin/Login";
import Leads from "@/pages/admin/Leads";
import GalleryList from "@/pages/admin/GalleryList";
import EditGallery from "@/pages/admin/EditGallery";
import WebsiteGuide from "@/pages/admin/WebsiteGuide";
import RegisterAdmin from "@/pages/admin/RegisterAdmin";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import About from "@/pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        }>
          <Route path="leads" element={<Leads />} />
          <Route path="gallery" element={<GalleryList />} />
          <Route path="edit-gallery" element={<EditGallery />} />
          <Route path="website-guide" element={<WebsiteGuide />} />
          <Route path="register" element={<RegisterAdmin />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;