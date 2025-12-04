import { Tooltip } from "react-tooltip";
import { dockApps } from "@constants";
import { useDockAnimation } from "@hooks/useDockAnimation";
import useWindowStore from "@store/window";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useDockAnimation();

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const win = windows[app.id];

    if (win?.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log("Windows state:", windows);
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => (
          <div
            key={app.id}
            className="relative flex justify-center"
            title={app.name}
          >
            <button
              type="button"
              className="dock-icon"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp(app)}
            >
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
                loading="lazy"
                className={app.canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
