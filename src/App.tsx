import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Login from "@/pages/admin/Login";
import ResetPassword from "@/pages/admin/ResetPassword";
import Leads from "@/pages/admin/Leads";
import GalleryList from "@/pages/admin/GalleryList";
import EditGallery from "@/pages/admin/EditGallery";
import WebsiteGuide from "@/pages/admin/WebsiteGuide";
import RegisterAdmin from "@/pages/admin/RegisterAdmin";
import UpdateCompanyProfile from "@/pages/admin/UpdateCompanyProfile";
import Index from "@/pages/Index";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Services from "@/pages/Services";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with PublicLayout */}
        <Route element={<PublicLayout><Outlet /></PublicLayout>}>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route>
        
        {/* Admin routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        }>
          <Route path="leads" element={<Leads />} />
          <Route path="gallery" element={<GalleryList />} />
          <Route path="edit-gallery" element={<EditGallery />} />
          <Route path="edit-gallery/:id" element={<EditGallery />} /> {/* Added this route */}
          <Route path="website-guide" element={<WebsiteGuide />} />
          <Route path="register" element={<RegisterAdmin />} />
          <Route path="company-profile" element={<UpdateCompanyProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;