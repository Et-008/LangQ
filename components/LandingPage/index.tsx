import section1 from "./section1";
import section2 from "./section2";
import section3 from "./section3";
import "./sections.css";

const sections = [
  { name: "Everything you need", content: section1 },
  { name: "How it works", content: section2 },
  { name: "Ready to Ship", content: section3 },
];

export default function Sections() {
  return sections?.map(({ name, content: Page }) => {
    return <Page key={name} />;
  });
}
