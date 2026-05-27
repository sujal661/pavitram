'use client';

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createMenuItem, updateMenuItem, deleteMenuItem, createGalleryImage, updateGalleryImage, deleteGalleryImage, createWebsiteContent, updateWebsiteContent, deleteWebsiteContent } from "../actions";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";

export default function MediaDashboard({ contents, contentMap, menuItems, galleryImages }: any) {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <div className="space-y-8 bg-zinc-950/50 min-h-[70vh] rounded-[2rem] border border-zinc-800 p-6 md:p-10 shadow-2xl">
      <div className="flex gap-6 border-b border-zinc-800/50 pb-4">
        {[
          { id: 'global', label: 'Global Content' }
        ].map(tab => (
           <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`relative px-4 py-2 text-sm md:text-base font-semibold tracking-wide transition-all ${activeTab === tab.id ? 'text-amber-500' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
              {tab.label}
              {activeTab === tab.id && (
                 <motion.div layoutId="tab-indicator" className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              )}
           </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
         {activeTab === "global" && <GlobalContentTab key="global" contents={contents} menuItems={menuItems} galleryImages={galleryImages} />}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------------------------
// Image Picker / Cropper Component
// ----------------------------------------------------------------------
function ImagePicker({ file, imageUrl, setFile }: any) {
   const [isCropping, setIsCropping] = useState(false);
   const [tempUrl, setTempUrl] = useState<string | null>(null);
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

   const handleFileChange = (e: any) => {
      if (e.target.files && e.target.files.length > 0) {
         setTempUrl(URL.createObjectURL(e.target.files[0]));
         setIsCropping(true);
      }
      e.target.value = "";
   };

   const onCropComplete = useCallback((_: any, pixels: any) => {
      setCroppedAreaPixels(pixels);
   }, []);

   const saveCrop = async () => {
      try {
         if (!tempUrl || !croppedAreaPixels) return;
         const croppedFile = await getCroppedImg(tempUrl, croppedAreaPixels, "cropped.jpg");
         if (croppedFile) {
            setFile(croppedFile);
            setIsCropping(false);
         }
      } catch (e) {
         toast.error("Failed to crop");
      }
   };

   return (
      <div className="space-y-3">
         <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Image Assets</label>
         <div className="flex items-center gap-6 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            {(file || imageUrl) ? (
               <div className="w-24 h-24 rounded-lg bg-black overflow-hidden border border-zinc-700 relative group">
                  <img src={file ? URL.createObjectURL(file) : imageUrl} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-xs text-white">Preview</span>
                  </div>
               </div>
            ) : (
               <div className="w-24 h-24 rounded-lg bg-zinc-900 border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 gap-2">
                  <span className="text-xl">+</span>
                  <span className="text-[10px] uppercase">Upload</span>
               </div>
            )}
            <div className="flex-1">
               <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer w-full transition-colors" />
               <p className="text-[10px] text-zinc-600 mt-2">Max file size: 5MB. Formats: JPG, PNG, WEBP.</p>
            </div>
         </div>

         {/* Crop Modal */}
         <Dialog open={isCropping} onOpenChange={setIsCropping}>
            <DialogContent className="max-w-xl bg-zinc-950 border-zinc-800 p-0 text-white overflow-hidden">
               <DialogHeader className="p-6 border-b border-zinc-800 bg-zinc-900/50">
                  <DialogTitle>Adjust Image</DialogTitle>
               </DialogHeader>
               <div className="relative w-full h-[50vh] bg-black">
                  {tempUrl && (
                     <Cropper
                        image={tempUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={1} // or generic 4/3
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                     />
                  )}
               </div>
               <DialogFooter className="p-4 bg-zinc-900 flex justify-between items-center border-t border-zinc-800">
                  <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-32 accent-amber-500" />
                  <div className="flex gap-2">
                     <button onClick={() => setIsCropping(false)} className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold transition-colors">Cancel</button>
                     <button onClick={saveCrop} className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-sm font-semibold text-white shadow-lg shadow-amber-600/20 transition-all active:scale-95">Save Crop</button>
                  </div>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
}

// ----------------------------------------------------------------------
// Global Content Tab
// ----------------------------------------------------------------------
function GlobalContentTab({ contents, menuItems, galleryImages }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const sections = ["Home", "Menu", "Our Story", "Gallery", "Locations", "Footer", "Global"];
  const [activeSection, setActiveSection] = useState("Home");
  const [formData, setFormData] = useState({ key: "", type: "IMAGE", imageUrl: "", textContent: "", section: "Home", buttonLink: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ key: item.key, type: item.type, imageUrl: item.imageUrl || "", textContent: item.textContent || "", section: item.section || activeSection, buttonLink: item.buttonLink || "" });
    setFile(null);
    setIsOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ key: "", type: "TEXT", imageUrl: "", textContent: "", section: activeSection, buttonLink: "" });
    setFile(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this content block? This might break the site if the key is required.")) return;
    setLoading(true);
    await deleteWebsiteContent(id);
    toast.success("Deleted");
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let finalImageUrl = formData.imageUrl;

    if (formData.type === "IMAGE" && file) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("key", "NO_KEY");
      const res = await fetch("/api/upload-image", { method: "POST", body: uploadData });
      const data = await res.json();
      if (data.url) finalImageUrl = data.url;
    }

    const payload = { ...formData, imageUrl: finalImageUrl };

    if (editingId) {
      await updateWebsiteContent(editingId, payload);
      toast.success("Updated content");
    } else {
      await createWebsiteContent(payload);
      toast.success("Created content");
    }
    
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-zinc-400 text-sm">Manage dynamic text snippets and hero images across the site.</p>
          <button onClick={handleCreate} className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-amber-600/20 active:scale-95">Add Content Block</button>
        </div>
        
        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-800">
          {sections.map(sec => (
            <button 
              key={sec} 
              onClick={() => setActiveSection(sec)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${activeSection === sec ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50' : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'}`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.filter((c: any) => (c.section || "Home") === activeSection).map((item: any) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors rounded-2xl overflow-hidden flex flex-col group">
            <div className="p-5 flex-1 space-y-4">
               <div className="flex justify-between items-start">
                  <span className="text-amber-500 text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full">{item.key}</span>
                  <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">{item.type}</span>
               </div>
               
               {item.type === "IMAGE" && (
                  <div className="w-full h-32 rounded-lg bg-black overflow-hidden border border-zinc-800">
                     <img src={item.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
               )}
               {item.type === "TEXT" && (
                  <p className="text-zinc-300 text-sm font-serif line-clamp-4 leading-relaxed">{item.textContent}</p>
               )}
               {item.type === "BUTTON" && (
                  <div className="space-y-2">
                    <p className="text-zinc-300 text-sm font-semibold">Label: <span className="font-normal text-amber-500">{item.textContent}</span></p>
                    <p className="text-zinc-500 text-xs truncate">Link: {item.buttonLink}</p>
                  </div>
               )}
            </div>
            <div className="p-4 bg-zinc-950/80 border-t border-zinc-800/50 flex gap-3">
               <button onClick={() => handleEdit(item)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors tracking-wide">Edit</button>
               <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-950/20 hover:bg-red-900/40 text-red-400 py-2 rounded-lg text-xs font-semibold transition-colors tracking-wide">Delete</button>
            </div>
          </div>
        ))}
        {contents.filter((c: any) => (c.section || "Home") === activeSection).length === 0 && (
          <div className="col-span-full py-20 text-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl">
            No content blocks found for {activeSection}.
          </div>
        )}
      </div>

      {activeSection === "Menu" && (
         <div className="pt-12 mt-8 border-t border-zinc-800/50">
            <MenuMediaTab menuItems={menuItems} />
         </div>
      )}

      {activeSection === "Gallery" && (
         <div className="pt-12 mt-8 border-t border-zinc-800/50">
            <GalleryMediaTab galleryImages={galleryImages} />
         </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{editingId ? "Edit Content Block" : "New Content Block"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Content Key</label>
                  <input type="text" placeholder="e.g. hero_headline" value={formData.key} onChange={e => setFormData({...formData, key: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Page / Section</label>
                  <select value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors">
                     {sections.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
               </div>
            </div>
            <div className="space-y-2 mt-4">
               <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</label>
               <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors">
                  <option value="TEXT">Text</option>
                  <option value="IMAGE">Image</option>
                  <option value="BUTTON">Button / Link</option>
               </select>
            </div>
            
            {formData.type === "TEXT" && (
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Text Content</label>
                  <textarea value={formData.textContent} onChange={e => setFormData({...formData, textContent: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm focus:border-amber-500 outline-none h-40 resize-none transition-colors" />
               </div>
            )}
            {formData.type === "IMAGE" && (
               <ImagePicker file={file} setFile={setFile} imageUrl={formData.imageUrl} />
            )}
            {formData.type === "BUTTON" && (
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Button Label</label>
                     <input type="text" placeholder="e.g. Shop Now" value={formData.textContent} onChange={e => setFormData({...formData, textContent: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Button Link (URL)</label>
                     <input type="text" placeholder="e.g. /roasts" value={formData.buttonLink} onChange={e => setFormData({...formData, buttonLink: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
                  </div>
               </div>
            )}
          </div>
          <DialogFooter className="border-t border-zinc-800 pt-6">
            <button onClick={() => setIsOpen(false)} className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 text-sm font-bold tracking-wide rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 transition-all active:scale-95">{loading ? "Saving..." : "Save Content"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// Menu Media Tab
// ----------------------------------------------------------------------
function MenuMediaTab({ menuItems }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", tag: "", price: "", desc: "", origin: "", imageUrl: "", orderId: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ name: item.name, tag: item.tag, price: item.price, desc: item.desc, origin: item.origin, imageUrl: item.imageUrl, orderId: item.orderId });
    setFile(null);
    setIsOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ name: "", tag: "", price: "", desc: "", origin: "", imageUrl: "", orderId: 0 });
    setFile(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    setLoading(true);
    await deleteMenuItem(id);
    toast.success("Deleted");
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let finalImageUrl = formData.imageUrl;

    if (file) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("key", "NO_KEY");
      const res = await fetch("/api/upload-image", { method: "POST", body: uploadData });
      const data = await res.json();
      if (data.url) finalImageUrl = data.url;
    }

    if (!finalImageUrl) {
      toast.error("Image is required");
      setLoading(false);
      return;
    }

    const payload = { ...formData, imageUrl: finalImageUrl };

    if (editingId) {
      await updateMenuItem(editingId, payload);
      toast.success("Updated menu item");
    } else {
      await createMenuItem(payload);
      toast.success("Created menu item");
    }
    
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-zinc-400 text-sm">Design and curate your signature roasts collection.</p>
        <button onClick={handleCreate} className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-amber-600/20 active:scale-95">Add Roast</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item: any) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all rounded-[2rem] overflow-hidden flex flex-col group shadow-xl">
            <div className="aspect-[4/5] bg-black relative overflow-hidden">
               <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{item.tag}</span>
                  <h3 className="text-3xl font-serif text-white leading-tight mb-2">{item.name}</h3>
                  <div className="flex justify-between items-end">
                     <span className="text-white/80 font-mono text-sm">{item.origin}</span>
                     <span className="text-white font-serif text-xl">{item.price}</span>
                  </div>
               </div>
            </div>
            <div className="p-4 bg-zinc-950 flex gap-3 border-t border-zinc-800">
               <button onClick={() => handleEdit(item)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors">Edit</button>
               <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-950/20 hover:bg-red-900/40 text-red-400 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {menuItems.length === 0 && (
          <div className="col-span-full py-20 text-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-[2rem]">
            No menu items found. Add your first signature roast.
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-zinc-950 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{editingId ? "Edit Signature Roast" : "New Signature Roast"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tag (e.g. Light Roast)</label>
                  <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Price</label>
                  <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Origin</label>
                  <input type="text" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Sensory Description</label>
               <textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm focus:border-amber-500 outline-none h-32 resize-none transition-colors" />
            </div>
            
            <ImagePicker file={file} setFile={setFile} imageUrl={formData.imageUrl} />
            
            <div className="space-y-2 pt-4 border-t border-zinc-800">
               <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Sort Order (0 is first)</label>
               <input type="number" value={formData.orderId} onChange={e => setFormData({...formData, orderId: parseInt(e.target.value) || 0})} className="w-32 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setIsOpen(false)} className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 text-sm font-bold tracking-wide rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 transition-all active:scale-95">{loading ? "Saving..." : "Save Roast"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// Gallery Media Tab
// ----------------------------------------------------------------------
function GalleryMediaTab({ galleryImages }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", category: "Atmosphere", imageUrl: "", orderId: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ["Atmosphere", "The Craft", "Origins"];

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ title: item.title, category: item.category, imageUrl: item.imageUrl, orderId: item.orderId });
    setFile(null);
    setIsOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ title: "", category: "Atmosphere", imageUrl: "", orderId: 0 });
    setFile(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    setLoading(true);
    await deleteGalleryImage(id);
    toast.success("Deleted");
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let finalImageUrl = formData.imageUrl;

    if (file) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("key", "NO_KEY");
      const res = await fetch("/api/upload-image", { method: "POST", body: uploadData });
      const data = await res.json();
      if (data.url) finalImageUrl = data.url;
    }

    if (!finalImageUrl) {
      toast.error("Image is required");
      setLoading(false);
      return;
    }

    const payload = { ...formData, imageUrl: finalImageUrl };

    if (editingId) {
      await updateGalleryImage(editingId, payload);
      toast.success("Updated gallery image");
    } else {
      await createGalleryImage(payload);
      toast.success("Added gallery image");
    }
    
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-zinc-400 text-sm">Expand your visual narrative and cinematic atmosphere.</p>
        <button onClick={handleCreate} className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-amber-600/20 active:scale-95">Add Photo</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((item: any) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all rounded-3xl overflow-hidden flex flex-col group shadow-lg">
            <div className="aspect-[4/5] md:aspect-square bg-black relative overflow-hidden">
               <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-amber-500 text-[9px] uppercase font-bold tracking-[0.3em] mb-1">{item.category}</span>
                  <h3 className="text-lg font-serif text-white truncate drop-shadow-lg">{item.title}</h3>
               </div>
            </div>
            <div className="p-3 bg-zinc-950 flex gap-2 border-t border-zinc-800">
               <button onClick={() => handleEdit(item)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors">Edit</button>
               <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-950/20 hover:bg-red-900/40 text-red-400 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {galleryImages.length === 0 && (
          <div className="col-span-full py-20 text-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl">
            No gallery images found. Upload your first shot.
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{editingId ? "Edit Photo" : "New Photo"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Photo Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors">
                     {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>
            </div>

            <ImagePicker file={file} setFile={setFile} imageUrl={formData.imageUrl} />

            <div className="space-y-2 pt-4 border-t border-zinc-800">
               <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Sort Order</label>
               <input type="number" value={formData.orderId} onChange={e => setFormData({...formData, orderId: parseInt(e.target.value) || 0})} className="w-32 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:border-amber-500 outline-none transition-colors" />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setIsOpen(false)} className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 text-sm font-bold tracking-wide rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 transition-all active:scale-95">{loading ? "Uploading..." : "Save Photo"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
