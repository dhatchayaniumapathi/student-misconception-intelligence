/**
 * AI-Powered Student Misconception Intelligence System (School ERP Prototype)
 * Question Bank and Diagnostic Misconception Rules Engine
 */

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    topic: "Fractions Addition",
    subTopic: "Unlike Denominators",
    question: "Evaluate the following fraction addition:",
    expression: "\\frac{1}{2} + \\frac{1}{3} = \\;?",
    textExpression: "1/2 + 1/3 = ?",
    options: [
      { key: "A", text: "2/5", math: "2/5" },
      { key: "B", text: "5/6", math: "5/6" },
      { key: "C", text: "1/5", math: "1/5" },
      { key: "D", text: "2/6", math: "2/6" }
    ],
    correctAnswer: "B",
    correctExplanation: "To add fractions with unlike denominators, find the lowest common denominator (LCM of 2 and 3 is 6). Convert: 1/2 = 3/6 and 1/3 = 2/6. Then add the numerators: 3/6 + 2/6 = 5/6.",
    misconceptionMap: {
      "A": {
        category: "Conceptual gap",
        reason: "Added numerators together and denominators together directly (1+1 / 2+3 = 2/5).",
        explanation: "The student treats fractions like whole numbers separated by a slash rather than part-whole ratios. They failed to realize that fractions must represent equal-sized unit slices (common denominator) before being combined.",
        coachingAdvice: "Use visual fraction strips or circular pizza models to demonstrate why 1/2 plus 1/3 is clearly greater than 1/2, whereas 2/5 is less than 1/2. Re-anchor the definition of denominators as slice sizes."
      },
      "C": {
        category: "Formula confusion",
        reason: "Kept numerator as 1 and added denominators (1 / (2+3) = 1/5).",
        explanation: "The student confused the rule for multiplying unit fractions or incorrectly thought adding parts means increasing the denominator while leaving the numerator unchanged.",
        coachingAdvice: "Review how denominators partition the whole. Emphasize that adding more parts increases the quantity, whereas increasing the denominator shrinks each slice."
      },
      "D": {
        category: "Careless error",
        reason: "Found the common denominator (6) but simply added the original numerators (1+1=2) without converting them (2/6).",
        explanation: "The student understood the need for a common denominator (6) but forgot to scale the numerators proportionally by the multiplier (1/2 becomes 3/6, 1/3 becomes 2/6).",
        coachingAdvice: "Teach a standard two-step verification routine: 1. Convert each fraction to its equivalent form explicitly. 2. Only add numerators once equivalent fractions are written side by side."
      }
    }
  },
  {
    id: 2,
    topic: "Signed Integers",
    subTopic: "Negative Number Multiplication",
    question: "Calculate the product of two negative integers:",
    expression: "(-4) \\times (-5) = \\;?",
    textExpression: "(-4) × (-5) = ?",
    options: [
      { key: "A", text: "-20", math: "-20" },
      { key: "B", text: "+20", math: "+20" },
      { key: "C", text: "-9", math: "-9" },
      { key: "D", text: "+9", math: "+9" }
    ],
    correctAnswer: "B",
    correctExplanation: "The product of two negative numbers is always positive. Here, (-4) × (-5) = +20.",
    misconceptionMap: {
      "A": {
        category: "Formula confusion",
        reason: "Applied the addition sign rule to a multiplication problem (thinking two negatives make a negative).",
        explanation: "The student mixed up integer addition rules with integer multiplication rules. While (-4) + (-5) = -9 (remains negative), multiplying two negatives reverses direction on the number line to yield a positive (+20).",
        coachingAdvice: "Create an explicit sign-rules reference table distinguishing addition [(-a) + (-b) = -(a+b)] from multiplication [(-a) × (-b) = +(a×b)]. Have the student verbalize 'opposite of negative'."
      },
      "C": {
        category: "Application difficulty",
        reason: "Performed addition instead of multiplication and retained negative sign: (-4) + (-5) = -9.",
        explanation: "The student misread the multiplication operator '×' or instinctively fell back on integer addition because the parentheses triggered an associative memory of sum problems.",
        coachingAdvice: "Have the student circle the operator symbol before solving any expression involving signed integers to prevent operation-switching reflex."
      },
      "D": {
        category: "Careless error",
        reason: "Added the magnitudes (4 + 5 = 9) and recalled that 'two negatives make positive'.",
        explanation: "The student successfully remembered that two negatives produce a positive sign, but carelessly added the numbers (4 + 5 = 9) rather than multiplying them (4 × 5 = 20).",
        coachingAdvice: "Reinforce two-stage checking: Stage 1 is absolute magnitude operation (4 × 5 = 20); Stage 2 is sign assignment (negative × negative = positive)."
      }
    }
  },
  {
    id: 3,
    topic: "Order of Operations",
    subTopic: "BODMAS / PEMDAS Priority",
    question: "Evaluate the mathematical expression:",
    expression: "3 + 4 \\times 2 = \\;?",
    textExpression: "3 + 4 × 2 = ?",
    options: [
      { key: "A", text: "14", math: "14" },
      { key: "B", text: "11", math: "11" },
      { key: "C", text: "24", math: "24" },
      { key: "D", text: "10", math: "10" }
    ],
    correctAnswer: "B",
    correctExplanation: "According to BODMAS / PEMDAS, multiplication has higher precedence than addition. Compute the multiplication first: 4 × 2 = 8. Then add: 3 + 8 = 11.",
    misconceptionMap: {
      "A": {
        category: "Conceptual gap",
        reason: "Evaluated strictly left-to-right (3 + 4 = 7, then 7 × 2 = 14), ignoring operator precedence.",
        explanation: "The student treats mathematical expressions like written natural language (left-to-right processing), unaware that multiplication groups quantities prior to addition.",
        coachingAdvice: "Teach the student to physically box or bracket higher-precedence operations: 3 + [4 × 2] = 3 + 8 = 11. Practice 5 targeted BODMAS hierarchy problems."
      },
      "C": {
        category: "Formula confusion",
        reason: "Multiplied all numbers together: (3 × 4 × 2 = 24).",
        explanation: "The student confused the presence of multiplication with an entire multiplicative term, ignoring the plus sign entirely.",
        coachingAdvice: "Highlight operators in different colors (plus in blue, multiplication in red) to teach visual differentiation between terms."
      },
      "D": {
        category: "Careless error",
        reason: "Multiplied 4 × 2 = 8, but added incorrectly: 3 + 8 = 10.",
        explanation: "The student correctly identified the order of operations and multiplied first, but made a basic mental arithmetic error in the final addition step.",
        coachingAdvice: "Encourage writing intermediate scratch steps on paper rather than doing mental sums under timed conditions."
      }
    }
  },
  {
    id: 4,
    topic: "Linear Equations",
    subTopic: "Two-step Equation Solving",
    question: "Solve the linear equation for x:",
    expression: "2x + 5 = 15",
    textExpression: "2x + 5 = 15",
    options: [
      { key: "A", text: "x = 10", math: "x = 10" },
      { key: "B", text: "x = 5", math: "x = 5" },
      { key: "C", text: "x = 7.5", math: "x = 7.5" },
      { key: "D", text: "x = 4", math: "x = 4" }
    ],
    correctAnswer: "B",
    correctExplanation: "Step 1: Subtract 5 from both sides: 2x = 15 - 5 = 10. Step 2: Divide both sides by 2: x = 10 / 2 = 5.",
    misconceptionMap: {
      "A": {
        category: "Application difficulty",
        reason: "Isolated the term 2x = 10 by subtracting 5, but stopped without dividing by the coefficient 2.",
        explanation: "The student understood the inverse addition step (15 - 5 = 10) but failed to complete the second inverse operation required to isolate x.",
        coachingAdvice: "Use the 'balance scale' metaphor. Emphasize that the goal is 1x, not 2x. Always check if the final answer variable has an implicit coefficient of 1."
      },
      "C": {
        category: "Formula confusion",
        reason: "Divided 15 by 2 first without isolating the variable term: 15 / 2 = 7.5.",
        explanation: "The student inverted the standard order of inverse operations (undo addition/subtraction before multiplication/division) and applied division only to the right side.",
        coachingAdvice: "Teach inverse BODMAS for equation solving: Reverse the order (SADMEP) to undo addition/subtraction first before dividing coefficients."
      },
      "D": {
        category: "Careless error",
        reason: "Subtracted 5 to get 10, but made an arithmetic slip when computing 10 / 2 = 4.",
        explanation: "The student followed the correct multi-step algebra process but committed an arithmetic division error in the final step.",
        coachingAdvice: "Always train students to substitute their result back into the original equation: 2(4) + 5 = 13 ≠ 15 to catch verification errors."
      }
    }
  },
  {
    id: 5,
    topic: "Geometry & Mensuration",
    subTopic: "Perimeter vs Area",
    question: "A rectangle has a length of 8 cm and a width of 5 cm. What is its perimeter?",
    expression: "\\text{Length} = 8\\text{ cm}, \\quad \\text{Width} = 5\\text{ cm}",
    textExpression: "Length = 8 cm, Width = 5 cm. Find Perimeter.",
    options: [
      { key: "A", text: "40 cm", math: "40 cm" },
      { key: "B", text: "26 cm", math: "26 cm" },
      { key: "C", text: "13 cm", math: "13 cm" },
      { key: "D", text: "21 cm", math: "21 cm" }
    ],
    correctAnswer: "B",
    correctExplanation: "Perimeter is the total boundary distance around the rectangle: P = 2 × (Length + Width) = 2 × (8 + 5) = 2 × 13 = 26 cm.",
    misconceptionMap: {
      "A": {
        category: "Formula confusion",
        reason: "Calculated area instead of perimeter (8 × 5 = 40 cm²).",
        explanation: "The student confused the formula for 2D Area (Length × Width) with the formula for 1D Perimeter (2 × (Length + Width)).",
        coachingAdvice: "Use physical analogies: Perimeter is the 'fence' you walk along (cm), Area is the 'tiles' covering the floor (cm²). Require units verification in every answer."
      },
      "C": {
        category: "Conceptual gap",
        reason: "Added only one length and one width (8 + 5 = 13 cm), missing the other two sides.",
        explanation: "The student recognized that perimeter involves addition but forgot that a rectangle has four enclosing sides (two lengths and two widths).",
        coachingAdvice: "Instruct the student to always draw the rectangle and label all four sides (8, 5, 8, 5) before adding them."
      },
      "D": {
        category: "Careless error",
        reason: "Added three sides instead of four: 8 + 8 + 5 = 21 cm (missed the second width).",
        explanation: "The student knew all sides must be added, but omitted one side during the computation.",
        coachingAdvice: "Have the student tick off each side on their diagram as it is entered into the sum: 8 ✓ + 5 ✓ + 8 ✓ + 5 ✓."
      }
    }
  }
];

// Parallel Retest Question Bank (Section 4: Improvement Assessment)
const RETEST_QUESTIONS = [
  {
    id: 1,
    topic: "Fractions Addition",
    subTopic: "Unlike Denominators",
    question: "Evaluate the fraction addition:",
    expression: "\\frac{1}{4} + \\frac{2}{3} = \\;?",
    textExpression: "1/4 + 2/3 = ?",
    options: [
      { key: "A", text: "3/7", math: "3/7" },
      { key: "B", text: "11/12", math: "11/12" },
      { key: "C", text: "3/12", math: "3/12" },
      { key: "D", text: "2/12", math: "2/12" }
    ],
    correctAnswer: "B",
    correctExplanation: "Common denominator of 4 and 3 is 12. 1/4 = 3/12 and 2/3 = 8/12. Sum: 3/12 + 8/12 = 11/12.",
    misconceptionMap: {
      "A": { category: "Conceptual gap", reason: "Added numerators and denominators directly (1+2 / 4+3 = 3/7)." },
      "C": { category: "Careless error", reason: "Found denominator 12 but added numerators 1+2 = 3 without converting." },
      "D": { category: "Formula confusion", reason: "Multiplied numerators instead of scaling." }
    }
  },
  {
    id: 2,
    topic: "Signed Integers",
    subTopic: "Negative Number Multiplication",
    question: "Calculate the product of these negative integers:",
    expression: "(-3) \\times (-6) = \\;?",
    textExpression: "(-3) × (-6) = ?",
    options: [
      { key: "A", text: "-18", math: "-18" },
      { key: "B", text: "+18", math: "+18" },
      { key: "C", text: "-9", math: "-9" },
      { key: "D", text: "+9", math: "+9" }
    ],
    correctAnswer: "B",
    correctExplanation: "Negative multiplied by negative gives positive: (-3) × (-6) = +18.",
    misconceptionMap: {
      "A": { category: "Formula confusion", reason: "Confused multiplication sign rule with negative addition rule." },
      "C": { category: "Application difficulty", reason: "Added numbers instead of multiplying: (-3) + (-6) = -9." },
      "D": { category: "Careless error", reason: "Added magnitudes (3+6=9) with positive sign." }
    }
  },
  {
    id: 3,
    topic: "Order of Operations",
    subTopic: "BODMAS / PEMDAS Priority",
    question: "Evaluate the mathematical expression:",
    expression: "5 + 3 \\times 4 = \\;?",
    textExpression: "5 + 3 × 4 = ?",
    options: [
      { key: "A", text: "32", math: "32" },
      { key: "B", text: "17", math: "17" },
      { key: "C", text: "60", math: "60" },
      { key: "D", text: "19", math: "19" }
    ],
    correctAnswer: "B",
    correctExplanation: "Multiplication precedes addition: 3 × 4 = 12. Then 5 + 12 = 17.",
    misconceptionMap: {
      "A": { category: "Conceptual gap", reason: "Computed left-to-right: (5 + 3) = 8, then 8 × 4 = 32." },
      "C": { category: "Formula confusion", reason: "Multiplied all numbers: 5 × 3 × 4 = 60." },
      "D": { category: "Careless error", reason: "Multiplied 3 × 4 = 12, but slipped on 5 + 12 = 19." }
    }
  },
  {
    id: 4,
    topic: "Linear Equations",
    subTopic: "Two-step Equation Solving",
    question: "Solve the linear equation for y:",
    expression: "3y + 4 = 19",
    textExpression: "3y + 4 = 19",
    options: [
      { key: "A", text: "y = 15", math: "y = 15" },
      { key: "B", text: "y = 5", math: "y = 5" },
      { key: "C", text: "y = 6.33", math: "y = 6.33" },
      { key: "D", text: "y = 4", math: "y = 4" }
    ],
    correctAnswer: "B",
    correctExplanation: "Subtract 4: 3y = 19 - 4 = 15. Divide by 3: y = 15 / 3 = 5.",
    misconceptionMap: {
      "A": { category: "Application difficulty", reason: "Subtracted 4 to get 15 but forgot to divide by coefficient 3." },
      "C": { category: "Formula confusion", reason: "Divided 19 by 3 before subtracting constant term." },
      "D": { category: "Careless error", reason: "Arithmetic division slip: 15 / 3 = 4." }
    }
  },
  {
    id: 5,
    topic: "Geometry & Mensuration",
    subTopic: "Perimeter vs Area",
    question: "A rectangular garden has a length of 7 m and a width of 4 m. What is its perimeter?",
    expression: "\\text{Length} = 7\\text{ m}, \\quad \\text{Width} = 4\\text{ m}",
    textExpression: "Length = 7 m, Width = 4 m. Find Perimeter.",
    options: [
      { key: "A", text: "28 m", math: "28 m" },
      { key: "B", text: "22 m", math: "22 m" },
      { key: "C", text: "11 m", math: "11 m" },
      { key: "D", text: "18 m", math: "18 m" }
    ],
    correctAnswer: "B",
    correctExplanation: "Perimeter = 2 × (Length + Width) = 2 × (7 + 4) = 2 × 11 = 22 m.",
    misconceptionMap: {
      "A": { category: "Formula confusion", reason: "Calculated area (7 × 4 = 28 m²) instead of boundary perimeter." },
      "C": { category: "Conceptual gap", reason: "Added only length and width (7 + 4 = 11 m), omitting two sides." },
      "D": { category: "Careless error", reason: "Added three sides: 7 + 7 + 4 = 18 m." }
    }
  }
];

// Fictional Student Profile for School ERP Demo
const FICTIONAL_STUDENT = {
  name: "Aarav Sharma",
  studentId: "GVIS-2026-0842",
  grade: "Class 7",
  section: "B",
  rollNo: "24",
  subject: "Grade 7 Mathematics",
  teacher: "Ms. Sunita Rao",
  academicYear: "2026 - 2027",
  assessmentDate: "21 Nov 2026"
};

// Preset Demo Answer Sets for 1-Click Prototype Testing
const DEMO_PRESETS = {
  // Aarav's initial diagnostic showing 3 distinct misconceptions (Score: 2/5 = 40%)
  test1Demo: {
    1: "A", // Conceptual gap: 1/2 + 1/3 = 2/5
    2: "B", // Correct: (-4) × (-5) = +20
    3: "A", // Conceptual gap: 3 + 4 × 2 = 14 (left-to-right)
    4: "B", // Correct: 2x + 5 = 15 => x = 5
    5: "A"  // Formula confusion: 8 × 5 = 40 cm (Area instead of Perimeter)
  },
  // Aarav's post-coaching retest showing full concept mastery (Score: 5/5 = 100%)
  retestMastery: {
    1: "B", // Correct: 11/12
    2: "B", // Correct: +18
    3: "B", // Correct: 17
    4: "B", // Correct: y = 5
    5: "B"  // Correct: 22 m
  }
};
