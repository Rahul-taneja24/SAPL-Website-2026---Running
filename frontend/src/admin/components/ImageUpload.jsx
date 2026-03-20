import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ value, onChange, label = "Upload Image" }) => {
    const [preview, setPreview] = useState(value || null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:8001/api/admin/media/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            const imageUrl = `http://localhost:8001${data.url}`;

            setPreview(imageUrl);
            onChange(imageUrl);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) handleFileUpload(file);
    };

    const handleRemove = () => {
        setPreview(null);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            {preview ? (
                <div className="relative inline-block">
                    <img src={preview} alt="Preview" className="h-48 w-auto rounded-lg border border-gray-300" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-2"></div>
                            <p className="text-sm text-gray-600">Uploading...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <ImageIcon size={48} className="text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">
                                Drag and drop an image, or click to select
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
