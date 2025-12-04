import { useLayoutEffect, useRef } from "react";
import useWindowStore from "@store/window";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";
const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey] || {};
    const ref = useRef(null);
 

  
   useGSAP(() => {
    const element = ref.current;
    if (!element) return;
     const [instance]=Draggable.create(element, {
      onPress:()=> focusWindow(windowKey)
     });
       return () => {
         instance.kill();
       };
   }, [isOpen, windowKey, focusWindow]);
     useGSAP(() => {
       const element = ref.current;
       if (!element) return;

       if (isOpen) {
         element.style.display = "block";
         gsap.fromTo(
           element,
           {
             opacity: 0,
             scale: 0.8,
             y: 20,
           },
           {
             opacity: 1,
             scale: 1,
             y: 0,
             duration: 0.3,
             ease: "power2.out",
           }
         );
       }
     }, [isOpen]);

     // Handle closing animation
     useLayoutEffect(() => {
       const element = ref.current;
       if (!element) return;

       if (!isOpen) {
         gsap.to(element, {
           opacity: 0,
           scale: 0.8,
           y: 20,
           duration: 0.75,
           ease: "power2.in",
           onComplete: () => {
             element.style.display = "none";
           },
         });
       }
     }, [isOpen]);

    if (!isOpen) return null;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onClick={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
