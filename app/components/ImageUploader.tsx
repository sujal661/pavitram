"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface ImageUploaderProps {
  label: string;
  keyName: string;
  initialImage?: string;
}

export default function ImageUploader({ label, keyName, initialImage }: ImageUploaderProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialImage || "");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cropper State
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = (selected: File) => {
    if (!selected.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const url = URL.createObjectURL(selected);
    setTempImage(url);
    setIsCropping(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
    // Reset input so the same file can be selected again
    e.target.value = "";
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const saveCrop = async () => {
    try {
      if (!tempImage || !croppedAreaPixels) return;
      const croppedFile = await getCroppedImg(tempImage, croppedAreaPixels, "cropped-image.jpg");
      if (croppedFile) {
        setFile(croppedFile);
        setPreview(URL.createObjectURL(croppedFile));
        setIsCropping(false);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to crop image.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", keyName);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      toast.success("Image updated successfully!");
      setFile(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-xl font-semibold text-white mb-4">{label}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Image Display */}
          <div className="space-y-2">
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Current Image</p>
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden border border-zinc-800 bg-black/50">
              {initialImage ? (
                <img src={initialImage} alt="Current" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm italic">
                  No image set
                </div>
              )}
            </div>
          </div>

          {/* New Upload Display */}
          <div className="space-y-2">
            <p className="text-xs text-amber-500/80 font-mono uppercase tracking-wider">New Upload Preview</p>
            <div 
              className={`relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center ${
                dragActive ? "border-amber-500 bg-amber-500/10 cursor-copy" : "border-zinc-700 hover:border-zinc-500 bg-zinc-800/30 cursor-pointer"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <AnimatePresence mode="wait">
                {preview && preview !== initialImage ? (
                  <motion.img 
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={preview} 
                    alt="New Preview" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <motion.div 
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-500 text-center p-4"
                  >
                    <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs">Drag & drop or click</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {loading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-white text-xs font-medium">Uploading...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <input 
          type="file" 
          ref={inputRef}
          onChange={handleChange} 
          className="hidden" 
          accept="image/*"
        />

        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              !file || loading 
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                : "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 active:scale-95"
            }`}
          >
            {loading ? "Processing..." : "Upload & Save Image"}
          </button>
          {file && !loading && (
            <button 
              onClick={() => {
                setFile(null);
                setPreview(initialImage || "");
              }}
              className="py-3 px-6 rounded-xl font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.div>

      <Dialog open={isCropping} onOpenChange={setIsCropping}>
        <DialogContent className="max-w-xl bg-zinc-950 border-zinc-800 text-white p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl">Crop Image</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[60vh] bg-black">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <DialogFooter className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-xs text-zinc-400 whitespace-nowrap">Zoom</span>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full md:w-32 accent-amber-500"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto justify-end">
              <button 
                onClick={() => setIsCropping(false)}
                className="px-4 py-2 text-sm rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveCrop}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-600 hover:bg-amber-500 transition-colors"
              >
                Save Crop
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
