import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

interface Grade {
  id: string;
  label: string;
}

interface GradeNavigationSliderProps {
  grades: Grade[];
  className?: string;
}

export const GradeNavigationSlider: React.FC<GradeNavigationSliderProps> = ({
  grades,
  className = "z-100",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Ignore Observer if the scrolling was triggered programmatically
      if (isProgrammaticScroll.current) return;

      // For each entry, update the active index when the entry intersect the viewport options
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = grades.findIndex((g) => g.id === entry.target.id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    // Observe all grade sections (setup the entries)
    grades.forEach((grade) => {
      const element = document.getElementById(grade.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [grades]);

  // Scroll to grade (Handle programmatic scrolling)
  const scrollToGrade = useCallback(
    (index: number) => {
      const element = document.getElementById(grades[index].id);
      if (element) {
        isProgrammaticScroll.current = true;
        element.scrollIntoView({ behavior: "instant", block: "start" });

        // Re-enable observer after scroll completes
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 1000);
      }
    },
    [grades]
  );

  // Handle slider click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    // Get click position relative to track
    const rect = trackRef.current.getBoundingClientRect(); // Track dimensions
    const y = e.clientY - rect.top; // Click Y position

    // Convert pixel position to percentage (0.0 to 1.0)
    const percentage = Math.max(0, Math.min(1, y / rect.height));

    // Convert percentage to grade index
    const newIndex = Math.round(percentage * (grades.length - 1));

    setActiveIndex(newIndex);
    scrollToGrade(newIndex);
  };

  // Handle drag
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Only active when dragging the thumb
  useEffect(() => {
    if (!isDragging) return;
    // Same as handling track click (Following mouse move to set index)
    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const percentage = Math.max(0, Math.min(1, y / rect.height));
      const newIndex = Math.round(percentage * (grades.length - 1));

      setActiveIndex(newIndex);
      scrollToGrade(newIndex);
    };

    // Reset isDragging when the mouse is released
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    // Add eventListener to the whole document to allow the mouse to leave the track once clicked
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrollToGrade, grades.length]);

  // Calculate thumb position
  const thumbPosition = grades.length > 1 ? (activeIndex / (grades.length - 1)) * 100 : 0;

  const getMajorGradeIndices = () => {
    // Show specific grade values (e.g., 4a, 5a, 6a, 7a, 8a)
    return grades
      .map((grade, index) => ({ grade, index }))
      .filter(
        ({ grade }) =>
          !grade.label.includes("+") && !grade.label.includes("-") && !grade.label.includes("P")
      )
      .map(({ index }) => index);
  };

  // Determine visible labels
  const getVisibleLabels = () => {
    // Show all lables
    // return grades.map((_, i) => i);
    // Only show the active index and +-1 otherwise
    const majorIndices = getMajorGradeIndices();

    const indicesToShow = [...majorIndices, activeIndex];
    if (hoveredIndex !== null) {
      indicesToShow.push(hoveredIndex);
    }
    return [...new Set(indicesToShow)];
  };

  const visibleLabels = getVisibleLabels();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Labels */}
      <div
        className="relative w-10 flex flex-col justify-between"
        style={{ height: "calc(100vh - 10rem)" }}>
        {grades.map((grade, index) => {
          const isVisible = visibleLabels.includes(index);
          const isActive = index === activeIndex;

          return (
            <div
              key={grade.id}
              className={`absolute right-0 transition-all duration-300 hover:z-30 ${isActive ? "z-20" : "z-10"}`}
              style={{
                top: `${(index / (grades.length - 1)) * 100}%`,
                opacity: isVisible ? 1 : 0,
                transform: "translateY(-50%)",
                pointerEvents: "auto",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <button
                onClick={() => {
                  setActiveIndex(index);
                  scrollToGrade(index);
                }}
                className={`px-2 py-0.5 rounded transition-all whitespace-nowrap text-sm ${
                  isActive
                    ? "bg-primary text-primary-foreground scale-110"
                    : "bg-secondary text-secondary-foreground/50 hover:bg-secondary hover:text-secondary-foreground hover:scale-130"
                }
                `}>
                {grade.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Slider Track */}
      <div className="relative flex flex-col items-center">
        {/* Track */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative w-1 bg-secondary rounded-full cursor-pointer"
          style={{ height: "calc(100vh - 10rem)" }}>
          {/* Active track portion */}
          <div
            className="absolute top-0 left-0 w-full bg-primary rounded-full transition-all duration-300"
            style={{ height: `${thumbPosition}%` }}
          />

          {/* Thumb */}
          <div
            className="absolute w-4 h-4 bg-primary rounded-full cursor-grab active:cursor-grabbing shadow-lg transition-all duration-300 z-100"
            style={{ left: "50%", top: `${thumbPosition}%`, transform: "translate(-50%, -50%)" }}
            onMouseDown={handleDragStart}
          />

          {/* Grade markers */}
          {grades.map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-secondary-foreground/20 rounded-full"
              style={{
                left: "50%",
                top: `${(index / (grades.length - 1)) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export function GradeNavigationWrapper({ grades }: { grades: Grade[] }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      {/* Desktop: always visible */}
      <aside className="hidden md:block">
        <div className="sticky top-26">
          <GradeNavigationSlider grades={grades} />
        </div>
      </aside>

      {/* Mobile: slide-out sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger
          asChild
          className={`md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-opacity ${isSheetOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <button className="bg-primary/80 text-primary-foreground p-2 rounded-l-md shadow-lg hover:bg-primary transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-auto bg-primary/10 border-none shadow-none p-0 flex items-end justify-end pointer-events-none"
          overlayClassName="bg-transparent">
          <div className="pointer-events-auto mb-8 mr-4 ml-4">
            <GradeNavigationSlider grades={grades} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
