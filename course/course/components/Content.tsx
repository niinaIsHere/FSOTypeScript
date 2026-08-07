import type { contentProps } from "../src/types";
import Part from "./Part";

export const Content = ({ courseParts }: contentProps) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
