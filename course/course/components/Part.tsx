import type { CoursePart } from "../src/types";

type PartProps = {
  part: CoursePart;
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>group project count {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <em>{part.description}</em>
            submit to {part.backgroundMaterial}
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <em>{part.description}</em>
            required skills: {part.requirements}
          </p>
        </div>
      );

    default:
      return null;
  }
};

export default Part;
