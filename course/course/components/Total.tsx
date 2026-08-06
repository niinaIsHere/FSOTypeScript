type totalProps = {
  totalExercises: number;
};

const Total = ({ totalExercises }: totalProps) => {
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default Total;
