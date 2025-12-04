import { Check, Flag } from "lucide-react";
import { techStack } from "@constants";
import WindowWrapper from "@hoc/WindowWraper";
import { WindowControlls } from "@components";
const Terminal = () => {
  return (
    <>
      <div id="window-header">
         <WindowControlls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="techstack">@gyanednra % show tech stack</span>
        </p>
        <div className="lable flex items-center ml-4 mt-5">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map((tech, index) => (
            <li key={index} className="flex items-center ">
              <Check className="check" size={20} />
              <h3>{tech.category}</h3>
              <ul>
                {tech.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully.(100%)
          </p>
          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time:6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
