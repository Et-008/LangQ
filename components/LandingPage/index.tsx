import section1 from "./section1";
import section2 from "./section2";
import section3 from "./section3";
import section4 from "./section4";
import "./sections.css";

const sections = [
  { name: "Why is Flutter localization so painful", content: section1 },
  { name: "Flutter Localization, Simplified", content: section4 },
  { name: "How it works", content: section2 },
  { name: "Ready to Ship", content: section3 },
];

export default function Sections() {
  return sections?.map(({ name, content: Page }) => {
    return <Page key={name} />;
  });
}
