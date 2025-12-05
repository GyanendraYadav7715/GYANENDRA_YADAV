import { useState, useRef, useEffect } from "react";
import { WindowControlls } from "@components";
import WindowWrapper from "@hoc/WindowWraper";
import { macOSApps } from "@constants";
import useWindowStore from "@store/window";

const App = () => {
  const { openWindow } = useWindowStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);

  const totalPages = macOSApps.length;
  const minSwipeDistance = 50;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (isRightSwipe && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Mouse wheel handler
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30 && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.deltaX < -30 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleAppClick = (app) => {
    if (!app.canOpen) return;
    openWindow(app.id);
  };

  return (
    <>
      <div id="window-header">
        <WindowControlls target="app_store" />
        <h2>All Apps</h2>
      </div>
      <div className="bg-gray-900 h-full flex flex-col">
        {/* Main app grid container */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={handleWheel}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {macOSApps.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="min-w-full h-full flex items-center justify-center p-16"
              >
                <div className="grid grid-cols-4 gap-x-16 gap-y-12 max-w-5xl">
                  {page.map((app) => (
                    <button
                      key={app.id}
                      className={`flex flex-col items-center gap-3 transition-all duration-200 hover:scale-110 ${
                        app.canOpen
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      }`}
                      onClick={() => handleAppClick(app)}
                      disabled={!app.canOpen}
                    >
                      <div className="w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center">
                        {app.icon ? (
                          <img
                            src={`/images/${app.icon}`}
                            alt={app.name}
                            loading="lazy"
                            className={app.canOpen ? "" : "opacity-100"}
                          />
                        ) : (
                          <span className="text-2xl text-white font-semibold">
                            {app.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white font-medium text-center max-w-[100px]">
                        {app.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page indicators */}
        <div className="flex justify-center gap-2 pb-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "bg-white w-6"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation hint */}
        <div className="text-center pb-4 text-gray-400 text-xs">
          Use arrow keys, swipe, or scroll horizontally to navigate
        </div>
      </div>
    </>
  );
};

const AppWindow = WindowWrapper(App, "app_store");

export default AppWindow;
