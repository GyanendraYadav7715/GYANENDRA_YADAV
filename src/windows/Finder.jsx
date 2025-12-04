import { WindowControlls } from "@components";
import { locations } from "@constants";
import WindowWrapper from "@hoc/WindowWraper";
import useLocationStore from "@store/location";
import useWindowStore from "@store/window";
import clsx from "clsx";
import { Search } from "lucide-react";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

 
const openItem = (item) => {
  // Handle PDF files
  if (item.fileType === "pdf") {
    return openWindow("resume");
  }

  // Handle folders
  if (item.kind === "folder") {
    return setActiveLocation(item);
  }

  // Handle external links (Figma, URLs, etc.)
  if (["fig", "url"].includes(item.fileType) && item.href) {
    return window.open(item.href, "_blank");
  }

  // Handle other file types with custom windows
  if (item.fileType && item.kind) {
    return openWindow(`${item.fileType}${item.kind}`, item);
  }
};

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
            key={item.id}
            onClick={() => setActiveLocation(item)}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControlls target="finder" />
        <Search className="icon" />
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("Work", locations.work.children)}
        </div>
        <ul className="content">
          {activeLocation.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
