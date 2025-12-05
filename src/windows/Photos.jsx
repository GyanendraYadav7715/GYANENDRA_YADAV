import { WindowControlls } from "@components";
import WindowWrapper from "@hoc/WindowWraper";
import { photosLinks, gallery } from "@constants";

const Photos = () => {
  const renderSidebarList = (items) =>
    items.map((item) => (
      <li key={item.id}>
        <img src={item.icon} alt={item.title} className="w-4" />
        <p>{item.title}</p>
      </li>
    ));

  const renderGallery = (items) =>
    items.map((item) => (
      <li key={item.id}>
        <img src={item.img} alt={`Gallery ${item.id}`} />
      </li>
    ));

  return (
    <>
      <div id="window-header">
        <WindowControlls target="photos" />
        <h2>Photos</h2>
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          <ul>{renderSidebarList(photosLinks)}</ul>
        </div>
        <div className="gallery">
          <ul>{renderGallery(gallery)}</ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
