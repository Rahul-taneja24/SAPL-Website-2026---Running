import React from 'react';

export const BlogCardSkeleton = () => (
    <div className="glass-card rounded-xl overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex items-center gap-4">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
        </div>
    </div>
);

export const BlogListSkeleton = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
        ))}
    </div>
);

export default BlogCardSkeleton;
