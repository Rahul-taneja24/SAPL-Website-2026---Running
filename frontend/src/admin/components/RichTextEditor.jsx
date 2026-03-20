'use client';
import React from 'react';

// Simple rich text area - you can add a proper editor library later
const RichTextEditor = ({ value, onChange, label = "Content" }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter HTML content or plain text..."
            />
            <p className="text-xs text-gray-500">
                Enter HTML or plain text content. For production, consider integrating a proper rich text editor.
            </p>
        </div>
    );
};

export default RichTextEditor;
