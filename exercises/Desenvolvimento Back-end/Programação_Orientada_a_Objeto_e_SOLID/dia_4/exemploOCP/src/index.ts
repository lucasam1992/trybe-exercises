type Discipline = {
    name: string,
    grade: number,
    letterGrade?: string,
}

type School = {
  name: string;
  approvalGrade: number;
};

type Student = {
  name: string;
  disciplines: Discipline[];
  school: School; // Agora não é mais uma string
};

const GRADE_DICT = {
  numbers: [0.9, 0.8, 0.7, 0.6, 0.1],
  letters: ['A', 'B', 'C', 'D', 'E'],
};

const getGradeLetter = (gradeNumber: number): string => {
  const gradeNumbers = GRADE_DICT.numbers;
  const gradeLetters = GRADE_DICT.letters;
  
  for (let i = 0; i < gradeNumbers.length; i += 1) {
      if (gradeNumber >= gradeNumbers[i]) return gradeLetters[i];
  }
  return 'F';
};

const getLetterGrades = (discipline: Discipline): Discipline => ({
  ...discipline,
  letterGrade: getGradeLetter(discipline.grade),
});

// converter
const percentageGradesIntoLetters = (student: Student): Student => ({
    ...student,
    disciplines: student.disciplines.map(getLetterGrades),
});

// ---------------------------------------------------------------------------------------------------------------------
// Determinar -- TRECHO QUE RESPEITA OCP - Principio das entidades abertas para extensões e fechadas para modificações
const approvedStudents = ({ disciplines, school }: Student): boolean =>
  disciplines.every(({ grade }) => grade >= school.approvalGrade);
//-----------------------------------------------------------------------------------------------------------------------

// Atualizar
const updateApprovalData = (student: Student): void => {
    console.log(`A pessoa com nome ${student.name} foi aprovada`);

    student.disciplines.forEach(({ name, letterGrade }) => console.log(`${name}: ${letterGrade}`));
};

  
function setApproved(students: Student[]): void {
  students.map(percentageGradesIntoLetters).filter(approvedStudents).map(updateApprovalData);
}

const studentsExample = [
  {
    name: 'Lee',
    school: { name: 'Standard', approvalGrade: 0.7 },
    disciplines: [
      { name: 'matemática', grade: 0.8 },
      { name: 'história', grade: 0.9 },
    ],
  },
  {
    name: 'Albus',
    school: { name: 'Hogwarts', approvalGrade: 0.8 },
    disciplines: [
      { name: 'divination', grade: 0.8 },
      { name: 'potions', grade: 0.9 },
    ],
  },
];

setApproved(studentsExample);

export {
  percentageGradesIntoLetters,
  approvedStudents,
}