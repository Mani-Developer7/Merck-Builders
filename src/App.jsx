import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';

import PublicLayout from './components/PublicLayout';
import Home from './pages/public/Home';
import Projects from './pages/public/Projects';
import ProjectDetail from './pages/public/ProjectDetail';
import Compare from './pages/public/Compare';
import Gallery from './pages/public/Gallery';
import Blogs from './pages/public/Blogs';
import BlogDetail from './pages/public/BlogDetail';
import Careers from './pages/public/Careers';
import Contact from './pages/public/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProjectForm from './pages/admin/AdminProjectForm';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminBlogForm from './pages/admin/AdminBlogForm';
import AdminGallery from './pages/admin/AdminGallery';
import AdminCareers from './pages/admin/AdminCareers';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/:id/edit" element={<AdminProjectForm />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
          <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="careers" element={<AdminCareers />} />
        </Route>

        <Route path="*" element={<div className="p-24 text-center">Page not found</div>} />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
