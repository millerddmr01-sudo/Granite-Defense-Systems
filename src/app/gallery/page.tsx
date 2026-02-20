export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Gallery</h1>
            <p className="text-secondary max-w-lg mb-8">
                Showcasing our precision builds and custom projects.
            </p>
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
                <span className="font-bold text-sm uppercase">Images Coming Soon</span>
            </div>
        </div>
    );
}
