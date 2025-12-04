import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { locations } from "@constants";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "@store/window";
import useLocationStore from "@store/location";
const projects = locations.work?.children ?? [];

const Home = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocation } = useLocationStore();
  useGSAP(() => {
    Draggable.create(".folder");
  });
    const handleOpenProject = (project) => {
        setActiveLocation(project);
        openWindow("finder");
  };

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            onClick={() => handleOpenProject(project)}
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
