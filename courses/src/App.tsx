interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

const Header = ({ name }: { name: string }) => {
  return (<h1>{name}</h1>);
};

const Content = ({ parts }: { parts: Array<CoursePart> }) => {
  return (<>{parts.map(p => <Part key={p.name} part={p} />)}</>);
};

const Part = ({ part }: { part: CoursePart }) => {
  const getPartSpecifics = () => {
    switch (part.type) {
      case "normal":
        return <div><i>{part.description}</i></div>;
      case "groupProject":
        return <div> project exercises {part.groupProjectCount} </div>;
      case "submission":
        return (<>
          <div><i>{part.description}</i></div>
          <div>submit to {part.exerciseSubmissionLink}</div>
        </>);
      case "special":
        return (<>
          <div><i>{part.description}</i></div>
          <div> required skills: {part.requirements.join(", ")} </div>
        </>);
      default:
        assertNever(part);
    }
    return <></>;
  };

  return (<p>
    <b>{part.name} {part.exerciseCount}</b>
    {getPartSpecifics()}
  </p>);
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Total = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>);
};

export default App;