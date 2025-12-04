import WindowWrapper from "@hoc/WindowWraper";
import { WindowControlls } from "@components";
import { Download } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControlls target="resume" />
        <h2>resume.pdf</h2>
        <a href="files/GYANENDRA_YADAV.pdf" download className="cursor-pointer">
          <Download className="icon" />
        </a>
      </div>
      <Document file="files/GYANENDRA_YADAV.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};
const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
