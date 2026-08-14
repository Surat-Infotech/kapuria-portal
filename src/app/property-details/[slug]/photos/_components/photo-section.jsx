import { PhotoCard } from "./photo-card";

// A titled band of the gallery — heading, the hairline that runs out to the
// right of it, then the grid.
//
// `total` is the whole category's count and `photos` is what survived the room
// rail, so the heading keeps reading "26 photos" while a buyer looks at one
// room's six. The heading states what the property has; the grid states what is
// on screen.

const PhotoGrid = ({ photos, onOpen }) => (
  <div className="grid grid-cols-2 gap-12 sm:gap-16 md:grid-cols-3 md:gap-24 xl:grid-cols-4">
    {photos.map((photo) => (
      <PhotoCard key={photo.id} photo={photo} onOpen={onOpen} />
    ))}
  </div>
);

const PhotoSection = ({ label, total, photos, onOpen, children }) => (
  <section className="flex flex-col gap-16 md:gap-20">
    <div className="flex items-center gap-12">
      <h2 className="shrink-0 text-h4 font-semibold text-text-primary">
        {label}
      </h2>
      <p className="shrink-0 text-body-xs text-text-secondary">
        {total} photos
      </p>
      <div className="h-px flex-1 bg-border-subtle" />
    </div>

    {/* The Indoor band hangs its room rail here, between the heading and the
        grid; every other band passes nothing. */}
    {children}

    <PhotoGrid photos={photos} onOpen={onOpen} />
  </section>
);

export { PhotoSection };
