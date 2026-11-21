/**
 * AI-Powered Student Misconception Intelligence System
 * School ERP Prototype Application Logic
 */

// Application State
const state = {
  activeTab: 'assessment',
  test1Submitted: false,
  test1Answers: {},
  test1Results: null,
  retestSubmitted: false,
  retestAnswers: {},
  retestResults: null,
  coachingNotes: "Student responded well to visual fraction models and perimeter vs area tactile drawing exercises. Ready for re-evaluation.",
  coachingTasks: {
    task1: true,
    task2: true,
    task3: false,
    task4: false
  }
};

// Initialize the Prototype when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initStudentInfo();
  renderAssessmentQuestions();
  renderRetestQuestions();
  setupEventListeners();
  updateNavigationState();
});

// Populate fictional student details in ERP header & card
function initStudentInfo() {
  document.getElementById('erp-student-name').textContent = FICTIONAL_STUDENT.name;
  document.getElementById('erp-student-meta').textContent = 
    `${FICTIONAL_STUDENT.grade} - Sec ${FICTIONAL_STUDENT.section} | Roll No: ${FICTIONAL_STUDENT.rollNo} | ID: ${FICTIONAL_STUDENT.studentId}`;
  document.getElementById('erp-student-teacher').textContent = FICTIONAL_STUDENT.teacher;
  document.getElementById('erp-student-subject').textContent = FICTIONAL_STUDENT.subject;
  document.getElementById('erp-assessment-date').textContent = FICTIONAL_STUDENT.assessmentDate;
}

// Setup Event Listeners for tabs, demo buttons, and submissions
function setupEventListeners() {
  // Navigation Tabs
  const tabButtons = document.querySelectorAll('.nav-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Section 1: Pre-fill demo answers with errors
  const btnPrefillDemo1 = document.getElementById('btn-prefill-test1');
  if (btnPrefillDemo1) {
    btnPrefillDemo1.addEventListener('click', () => {
      setAssessmentAnswers(DEMO_PRESETS.test1Demo);
      showToast("Sample answers loaded (demonstrates 3 distinct misconceptions).");
    });
  }

  // Section 1: Clear answers
  const btnClearTest1 = document.getElementById('btn-clear-test1');
  if (btnClearTest1) {
    btnClearTest1.addEventListener('click', () => {
      clearAssessmentAnswers();
      showToast("Assessment selections cleared.");
    });
  }

  // Section 1: Submit Assessment
  const formTest1 = document.getElementById('form-assessment-1');
  if (formTest1) {
    formTest1.addEventListener('submit', (e) => {
      e.preventDefault();
      handleTest1Submit();
    });
  }

  // Section 2: Proceed to Teacher Coaching
  const btnToCoaching = document.getElementById('btn-to-coaching');
  if (btnToCoaching) {
    btnToCoaching.addEventListener('click', () => {
      switchTab('coaching');
    });
  }

  // Section 3: Proceed to Retest
  const btnToRetest = document.getElementById('btn-to-retest');
  if (btnToRetest) {
    btnToRetest.addEventListener('click', () => {
      switchTab('improvement');
    });
  }

  // Section 3: Save Teacher Note
  const btnSaveNotes = document.getElementById('btn-save-notes');
  if (btnSaveNotes) {
    btnSaveNotes.addEventListener('click', () => {
      const notesField = document.getElementById('teacher-notes-field');
      if (notesField) {
        state.coachingNotes = notesField.value;
        showToast("Coaching notes saved to Student ERP profile.");
      }
    });
  }

  // Section 4: Pre-fill Retest Mastery
  const btnPrefillRetest = document.getElementById('btn-prefill-retest');
  if (btnPrefillRetest) {
    btnPrefillRetest.addEventListener('click', () => {
      setRetestAnswers(DEMO_PRESETS.retestMastery);
      showToast("Retest answers loaded with mastery performance.");
    });
  }

  // Section 4: Clear Retest
  const btnClearRetest = document.getElementById('btn-clear-retest');
  if (btnClearRetest) {
    btnClearRetest.addEventListener('click', () => {
      clearRetestAnswers();
      showToast("Retest selections cleared.");
    });
  }

  // Section 4: Submit Retest
  const formRetest = document.getElementById('form-retest');
  if (formRetest) {
    formRetest.addEventListener('submit', (e) => {
      e.preventDefault();
      handleRetestSubmit();
    });
  }

  // Global: Reset entire prototype
  const btnResetAll = document.getElementById('btn-reset-prototype');
  if (btnResetAll) {
    btnResetAll.addEventListener('click', () => {
      if (confirm("Reset prototype to initial state?")) {
        resetEntirePrototype();
      }
    });
  }

  // Global: Print Report
  const btnPrintReport = document.getElementById('btn-print-report');
  if (btnPrintReport) {
    btnPrintReport.addEventListener('click', () => {
      window.print();
    });
  }
}

// Switch between the 4 main ERP sections
function switchTab(tabName) {
  // Guard checks
  if ((tabName === 'analysis' || tabName === 'coaching') && !state.test1Submitted) {
    showToast("Please submit the initial Student Assessment first to generate analysis.", "warning");
    return;
  }
  if (tabName === 'improvement' && !state.test1Submitted) {
    showToast("Please complete Test 1 and review the coaching recommendations before taking the retest.", "warning");
    return;
  }

  state.activeTab = tabName;

  // Update nav tabs
  const tabButtons = document.querySelectorAll('.nav-tab');
  tabButtons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update section views
  const sections = document.querySelectorAll('.erp-section');
  sections.forEach(sec => {
    if (sec.id === `section-${tabName}`) {
      sec.classList.remove('hidden');
    } else {
      sec.classList.add('hidden');
    }
  });

  // Scroll to top of workspace
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update nav tab enablement states
function updateNavigationState() {
  const tabAnalysis = document.querySelector('.nav-tab[data-tab="analysis"]');
  const tabCoaching = document.querySelector('.nav-tab[data-tab="coaching"]');
  const tabImprovement = document.querySelector('.nav-tab[data-tab="improvement"]');

  if (tabAnalysis) tabAnalysis.classList.toggle('disabled', !state.test1Submitted);
  if (tabCoaching) tabCoaching.classList.toggle('disabled', !state.test1Submitted);
  if (tabImprovement) tabImprovement.classList.toggle('disabled', !state.test1Submitted);
}

// Render Section 1 Questions
function renderAssessmentQuestions() {
  const container = document.getElementById('assessment-questions-list');
  if (!container) return;

  container.innerHTML = '';

  ASSESSMENT_QUESTIONS.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `q-card-${q.id}`;

    const optionsHtml = q.options.map(opt => `
      <label class="option-label" for="q${q.id}_opt_${opt.key}">
        <input type="radio" name="question_${q.id}" id="q${q.id}_opt_${opt.key}" value="${opt.key}">
        <div class="option-indicator">${opt.key}</div>
        <div class="option-content">
          <span class="option-value">${escapeHtml(opt.text)}</span>
        </div>
      </label>
    `).join('');

    card.innerHTML = `
      <div class="question-header">
        <div class="question-meta">
          <span class="badge badge-topic">Q${q.id} &bull; ${escapeHtml(q.topic)}</span>
          <span class="subtopic-tag">${escapeHtml(q.subTopic)}</span>
        </div>
        <span class="status-indicator" id="status-q${q.id}">Not answered</span>
      </div>
      <div class="question-body">
        <p class="question-text">${escapeHtml(q.question)}</p>
        <div class="question-expression">${escapeHtml(q.textExpression)}</div>
      </div>
      <div class="options-grid">
        ${optionsHtml}
      </div>
    `;

    container.appendChild(card);
  });

  // Attach change listeners to update status & radio card highlight
  ASSESSMENT_QUESTIONS.forEach(q => {
    const radios = document.querySelectorAll(`input[name="question_${q.id}"]`);
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        const statusElem = document.getElementById(`status-q${q.id}`);
        if (statusElem) {
          statusElem.textContent = "Answered";
          statusElem.classList.add('answered');
        }
        updateCardSelectedHighlight(`question_${q.id}`);
      });
    });
  });
}

// Helper to highlight active option card
function updateCardSelectedHighlight(radioGroupName) {
  const radios = document.querySelectorAll(`input[name="${radioGroupName}"]`);
  radios.forEach(r => {
    const label = r.closest('.option-label');
    if (label) {
      if (r.checked) {
        label.classList.add('selected');
      } else {
        label.classList.remove('selected');
      }
    }
  });
}

// Pre-fill answers helper for Assessment 1
function setAssessmentAnswers(answerMap) {
  Object.keys(answerMap).forEach(qId => {
    const val = answerMap[qId];
    const radio = document.getElementById(`q${qId}_opt_${val}`);
    if (radio) {
      radio.checked = true;
      updateCardSelectedHighlight(`question_${qId}`);
      const statusElem = document.getElementById(`status-q${qId}`);
      if (statusElem) {
        statusElem.textContent = "Answered";
        statusElem.classList.add('answered');
      }
    }
  });
}

// Clear all Assessment 1 selections
function clearAssessmentAnswers() {
  ASSESSMENT_QUESTIONS.forEach(q => {
    const radios = document.querySelectorAll(`input[name="question_${q.id}"]`);
    radios.forEach(r => {
      r.checked = false;
      const label = r.closest('.option-label');
      if (label) label.classList.remove('selected');
    });
    const statusElem = document.getElementById(`status-q${q.id}`);
    if (statusElem) {
      statusElem.textContent = "Not answered";
      statusElem.classList.remove('answered');
    }
  });
}

// Handle Assessment 1 Submission & Diagnostic Evaluation
function handleTest1Submit() {
  const answers = {};
  let missingQuestions = [];

  ASSESSMENT_QUESTIONS.forEach(q => {
    const selected = document.querySelector(`input[name="question_${q.id}"]:checked`);
    if (selected) {
      answers[q.id] = selected.value;
    } else {
      missingQuestions.push(q.id);
    }
  });

  if (missingQuestions.length > 0) {
    showToast(`Please answer all questions before submitting. Unanswered: Question ${missingQuestions.join(', ')}`, "warning");
    return;
  }

  // Diagnostic analysis logic
  state.test1Answers = answers;
  state.test1Results = evaluateTest(ASSESSMENT_QUESTIONS, answers);
  state.test1Submitted = true;

  updateNavigationState();
  renderAnalysisReport();
  renderCoachingReport();

  showToast("Diagnostic analysis completed. Navigating to Misconception Analysis.");
  switchTab('analysis');
}

// Core Diagnostic Evaluation Logic
function evaluateTest(questionsBank, studentAnswers) {
  let score = 0;
  const items = [];
  const categoryCounts = {
    'Conceptual gap': 0,
    'Formula confusion': 0,
    'Application difficulty': 0,
    'Careless error': 0
  };

  questionsBank.forEach(q => {
    const studentChoiceKey = studentAnswers[q.id];
    const studentChoiceObj = q.options.find(o => o.key === studentChoiceKey);
    const correctChoiceObj = q.options.find(o => o.key === q.correctAnswer);
    const isCorrect = (studentChoiceKey === q.correctAnswer);

    let diagnosticData = null;

    if (isCorrect) {
      score++;
    } else {
      // Look up diagnosed misconception from mapping rules
      const misconceptionInfo = q.misconceptionMap[studentChoiceKey] || {
        category: 'Conceptual gap',
        reason: 'Unidentified cognitive error on this problem type.',
        explanation: 'The student gave an unexpected incorrect answer.',
        coachingAdvice: 'Review foundational principles for this topic.'
      };

      diagnosticData = {
        category: misconceptionInfo.category,
        reason: misconceptionInfo.reason,
        explanation: misconceptionInfo.explanation,
        coachingAdvice: misconceptionInfo.coachingAdvice || q.correctExplanation
      };

      if (categoryCounts[misconceptionInfo.category] !== undefined) {
        categoryCounts[misconceptionInfo.category]++;
      }
    }

    items.push({
      id: q.id,
      topic: q.topic,
      subTopic: q.subTopic,
      expression: q.textExpression,
      studentChoiceKey: studentChoiceKey,
      studentChoiceText: studentChoiceObj ? studentChoiceObj.text : 'None',
      correctChoiceKey: q.correctAnswer,
      correctChoiceText: correctChoiceObj ? correctChoiceObj.text : '',
      correctExplanation: q.correctExplanation,
      isCorrect: isCorrect,
      diagnostic: diagnosticData
    });
  });

  const totalQuestions = questionsBank.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const totalMisconceptions = totalQuestions - score;

  return {
    score,
    totalQuestions,
    percentage,
    totalMisconceptions,
    categoryCounts,
    items
  };
}

// Render Section 2: AI Misconception Analysis Report
function renderAnalysisReport() {
  const res = state.test1Results;
  if (!res) return;

  // Header Summary metrics
  document.getElementById('analysis-score-badge').textContent = `${res.score} / ${res.totalQuestions}`;
  document.getElementById('analysis-percentage').textContent = `${res.percentage}%`;
  document.getElementById('analysis-misconceptions-count').textContent = res.totalMisconceptions;

  // Summary categories counts
  const categoryPillsContainer = document.getElementById('category-counts-summary');
  if (categoryPillsContainer) {
    categoryPillsContainer.innerHTML = `
      <span class="cat-pill pill-concept">Conceptual Gap: <strong>${res.categoryCounts['Conceptual gap']}</strong></span>
      <span class="cat-pill pill-formula">Formula Confusion: <strong>${res.categoryCounts['Formula confusion']}</strong></span>
      <span class="cat-pill pill-app">Application Difficulty: <strong>${res.categoryCounts['Application difficulty']}</strong></span>
      <span class="cat-pill pill-careless">Careless Error: <strong>${res.categoryCounts['Careless error']}</strong></span>
    `;
  }

  // Detailed Analysis Cards
  const cardsContainer = document.getElementById('analysis-cards-container');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = '';

  res.items.forEach(item => {
    const card = document.createElement('div');
    card.className = `analysis-item-card ${item.isCorrect ? 'item-correct' : 'item-misconception'}`;

    if (item.isCorrect) {
      card.innerHTML = `
        <div class="analysis-item-header">
          <div class="analysis-item-title">
            <span class="badge badge-correct">Correct &bull; Q${item.id}</span>
            <span class="item-topic">${escapeHtml(item.topic)} (${escapeHtml(item.subTopic)})</span>
          </div>
          <span class="accuracy-tag accuracy-success">Demonstrated Concept Mastery</span>
        </div>
        <div class="analysis-item-body">
          <div class="expression-preview"><strong>Problem:</strong> ${escapeHtml(item.expression)}</div>
          <div class="answer-comparison">
            <div class="answer-box answer-box-green">
              <span class="answer-label">Student &amp; Correct Answer</span>
              <span class="answer-value">${escapeHtml(item.studentChoiceKey)}. ${escapeHtml(item.studentChoiceText)}</span>
            </div>
          </div>
          <p class="correct-note"><span class="icon-check">&#10003;</span> ${escapeHtml(item.correctExplanation)}</p>
        </div>
      `;
    } else {
      const diag = item.diagnostic;
      const categoryBadgeClass = getCategoryBadgeClass(diag.category);

      card.innerHTML = `
        <div class="analysis-item-header">
          <div class="analysis-item-title">
            <span class="badge badge-error">Needs Attention &bull; Q${item.id}</span>
            <span class="item-topic">${escapeHtml(item.topic)} (${escapeHtml(item.subTopic)})</span>
          </div>
          <span class="misconception-badge ${categoryBadgeClass}">${escapeHtml(diag.category)}</span>
        </div>
        <div class="analysis-item-body">
          <div class="expression-preview"><strong>Problem:</strong> ${escapeHtml(item.expression)}</div>
          
          <div class="answer-comparison-grid">
            <div class="answer-box answer-box-red">
              <span class="answer-label">Student Answer</span>
              <span class="answer-value">${escapeHtml(item.studentChoiceKey)}. ${escapeHtml(item.studentChoiceText)}</span>
            </div>
            <div class="answer-box answer-box-green">
              <span class="answer-label">Correct Answer</span>
              <span class="answer-value">${escapeHtml(item.correctChoiceKey)}. ${escapeHtml(item.correctChoiceText)}</span>
            </div>
          </div>

          <div class="diagnostic-details">
            <div class="detail-block">
              <span class="detail-label">Identified Reason for Mistake:</span>
              <p class="detail-text">${escapeHtml(diag.reason)}</p>
            </div>
            <div class="detail-block">
              <span class="detail-label">Supporting Pedagogical Explanation:</span>
              <p class="detail-text explanation-text">${escapeHtml(diag.explanation)}</p>
            </div>
          </div>
        </div>
      `;
    }

    cardsContainer.appendChild(card);
  });
}

// Return CSS class for misconception category badge
function getCategoryBadgeClass(category) {
  switch (category) {
    case 'Conceptual gap': return 'cat-conceptual';
    case 'Formula confusion': return 'cat-formula';
    case 'Application difficulty': return 'cat-application';
    case 'Careless error': return 'cat-careless';
    default: return 'cat-default';
  }
}

// Render Section 3: Teacher Coaching Report
function renderCoachingReport() {
  const res = state.test1Results;
  if (!res) return;

  const weakAreasContainer = document.getElementById('coaching-weak-areas');
  if (!weakAreasContainer) return;

  weakAreasContainer.innerHTML = '';

  const incorrectItems = res.items.filter(i => !i.isCorrect);

  if (incorrectItems.length === 0) {
    weakAreasContainer.innerHTML = `
      <div class="empty-state-card">
        <h3>Exceptional Performance!</h3>
        <p>No mathematical misconceptions were detected in this assessment. All 5 problems were solved accurately with full conceptual understanding.</p>
        <p><strong>Recommendation:</strong> Proceed with advanced enrichment topics or extension worksheets.</p>
      </div>
    `;
    return;
  }

  incorrectItems.forEach((item, index) => {
    const diag = item.diagnostic;
    const catClass = getCategoryBadgeClass(diag.category);

    const card = document.createElement('div');
    card.className = 'coaching-card';
    card.innerHTML = `
      <div class="coaching-card-header">
        <div class="coaching-title-group">
          <span class="coaching-num">Area ${index + 1}</span>
          <h4 class="coaching-topic">${escapeHtml(item.topic)}: ${escapeHtml(item.subTopic)}</h4>
        </div>
        <span class="misconception-badge ${catClass}">${escapeHtml(diag.category)}</span>
      </div>

      <div class="coaching-content-grid">
        <div class="coaching-col">
          <div class="coaching-box box-explain">
            <div class="box-header">
              <span class="box-icon">&#9658;</span>
              <strong>What the Teacher Should Explain:</strong>
            </div>
            <p class="box-text">${escapeHtml(diag.coachingAdvice)}</p>
            <div class="contrast-snippet">
              <span class="contrast-tag">Address Misconception:</span>
              <span class="contrast-desc">Clarify why &ldquo;${escapeHtml(item.studentChoiceText)}&rdquo; arises from ${escapeHtml(diag.reason)}</span>
            </div>
          </div>
        </div>

        <div class="coaching-col">
          <div class="coaching-box box-practice">
            <div class="box-header">
              <span class="box-icon">&#10000;</span>
              <strong>Practical Classroom Intervention:</strong>
            </div>
            <ul class="practice-steps">
              <li><strong>Visual Grounding:</strong> ${getInterventionTip(item.topic, 1)}</li>
              <li><strong>Guided Re-anchoring:</strong> ${getInterventionTip(item.topic, 2)}</li>
              <li><strong>Independent Drill:</strong> Assign 3 similar targeted problems with scratch-work verification.</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    weakAreasContainer.appendChild(card);
  });

  // Populate teacher notes textarea if present
  const notesField = document.getElementById('teacher-notes-field');
  if (notesField && state.coachingNotes) {
    notesField.value = state.coachingNotes;
  }
}

// Generate practical classroom intervention step tips
function getInterventionTip(topic, step) {
  if (topic.includes("Fraction")) {
    return step === 1 
      ? "Use a fraction strip or bar diagram showing 1/2 and 1/3 overlaid on a 6-part grid."
      : "Have the student verbally explain why denominators must match before adding.";
  } else if (topic.includes("Integer")) {
    return step === 1
      ? "Provide a two-column cheat sheet contrasting addition rules vs multiplication rules."
      : "Use a directional number line model: reversing twice returns to forward (positive).";
  } else if (topic.includes("Order of Operations")) {
    return step === 1
      ? "Instruct student to bracket multiplication terms with a colored highlighter before calculating."
      : "Work through BODMAS step-by-step: 3 + [4 × 2] -> 3 + 8 = 11.";
  } else if (topic.includes("Linear Equation")) {
    return step === 1
      ? "Use the two-pan balance scale diagram to show doing inverse operations symmetrically."
      : "Check answers by substituting back into original equation (verification drill).";
  } else if (topic.includes("Geometry")) {
    return step === 1
      ? "Have student physically trace the 4 outer sides of the rectangle with a finger."
      : "Label all 4 sides explicitly (8 + 5 + 8 + 5 = 26) to prevent perimeter/area confusion.";
  }
  return step === 1 ? "Provide tactile or diagrammatic representation." : "Practice guided self-talk.";
}

// Render Section 4 Retest Questions
function renderRetestQuestions() {
  const container = document.getElementById('retest-questions-list');
  if (!container) return;

  container.innerHTML = '';

  RETEST_QUESTIONS.forEach(q => {
    const card = document.createElement('div');
    card.className = 'question-card retest-q-card';
    card.id = `rq-card-${q.id}`;

    const optionsHtml = q.options.map(opt => `
      <label class="option-label" for="rq${q.id}_opt_${opt.key}">
        <input type="radio" name="retest_question_${q.id}" id="rq${q.id}_opt_${opt.key}" value="${opt.key}">
        <div class="option-indicator">${opt.key}</div>
        <div class="option-content">
          <span class="option-value">${escapeHtml(opt.text)}</span>
        </div>
      </label>
    `).join('');

    card.innerHTML = `
      <div class="question-header">
        <div class="question-meta">
          <span class="badge badge-teal">Retest Q${q.id} &bull; ${escapeHtml(q.topic)}</span>
          <span class="subtopic-tag">${escapeHtml(q.subTopic)}</span>
        </div>
        <span class="status-indicator" id="status-rq${q.id}">Not answered</span>
      </div>
      <div class="question-body">
        <p class="question-text">${escapeHtml(q.question)}</p>
        <div class="question-expression">${escapeHtml(q.textExpression)}</div>
      </div>
      <div class="options-grid">
        ${optionsHtml}
      </div>
    `;

    container.appendChild(card);
  });

  // Attach change listeners to update status & radio card highlight
  RETEST_QUESTIONS.forEach(q => {
    const radios = document.querySelectorAll(`input[name="retest_question_${q.id}"]`);
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        const statusElem = document.getElementById(`status-rq${q.id}`);
        if (statusElem) {
          statusElem.textContent = "Answered";
          statusElem.classList.add('answered');
        }
        updateCardSelectedHighlight(`retest_question_${q.id}`);
      });
    });
  });
}

// Pre-fill Retest with mastery answers
function setRetestAnswers(answerMap) {
  Object.keys(answerMap).forEach(qId => {
    const val = answerMap[qId];
    const radio = document.getElementById(`rq${qId}_opt_${val}`);
    if (radio) {
      radio.checked = true;
      updateCardSelectedHighlight(`retest_question_${qId}`);
      const statusElem = document.getElementById(`status-rq${qId}`);
      if (statusElem) {
        statusElem.textContent = "Answered";
        statusElem.classList.add('answered');
      }
    }
  });
}

// Clear Retest selections
function clearRetestAnswers() {
  RETEST_QUESTIONS.forEach(q => {
    const radios = document.querySelectorAll(`input[name="retest_question_${q.id}"]`);
    radios.forEach(r => {
      r.checked = false;
      const label = r.closest('.option-label');
      if (label) label.classList.remove('selected');
    });
    const statusElem = document.getElementById(`status-rq${q.id}`);
    if (statusElem) {
      statusElem.textContent = "Not answered";
      statusElem.classList.remove('answered');
    }
  });
}

// Handle Retest Submission & Comparative Analytics
function handleRetestSubmit() {
  const answers = {};
  let missingQuestions = [];

  RETEST_QUESTIONS.forEach(q => {
    const selected = document.querySelector(`input[name="retest_question_${q.id}"]:checked`);
    if (selected) {
      answers[q.id] = selected.value;
    } else {
      missingQuestions.push(q.id);
    }
  });

  if (missingQuestions.length > 0) {
    showToast(`Please answer all retest questions before submitting. Unanswered: Question ${missingQuestions.join(', ')}`, "warning");
    return;
  }

  state.retestAnswers = answers;
  state.retestResults = evaluateTest(RETEST_QUESTIONS, answers);
  state.retestSubmitted = true;

  renderImprovementComparison();
  showToast("Retest evaluated! Comparison and Improvement Report updated below.");

  // Scroll to comparison report
  const comparisonReportSection = document.getElementById('improvement-comparison-view');
  if (comparisonReportSection) {
    comparisonReportSection.classList.remove('hidden');
    comparisonReportSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Render Section 4: Improvement Report & Comparison View
function renderImprovementComparison() {
  const t1 = state.test1Results;
  const t2 = state.retestResults;
  if (!t1 || !t2) return;

  const scoreDiff = t2.score - t1.score;
  const pctDiff = t2.percentage - t1.percentage;

  // Update summary metrics
  document.getElementById('t1-summary-score').textContent = `${t1.score} / ${t1.totalQuestions} (${t1.percentage}%)`;
  document.getElementById('t2-summary-score').textContent = `${t2.score} / ${t2.totalQuestions} (${t2.percentage}%)`;

  const deltaElem = document.getElementById('improvement-delta-badge');
  if (deltaElem) {
    if (pctDiff > 0) {
      deltaElem.textContent = `+${pctDiff}% Improvement`;
      deltaElem.className = 'metric-delta delta-positive';
    } else if (pctDiff === 0) {
      deltaElem.textContent = `0% Score Change`;
      deltaElem.className = 'metric-delta delta-neutral';
    } else {
      deltaElem.textContent = `${pctDiff}% Score Drop`;
      deltaElem.className = 'metric-delta delta-negative';
    }
  }

  // Improvement status callout
  const calloutElem = document.getElementById('improvement-status-callout');
  if (calloutElem) {
    if (t2.score === 5 && t1.score < 5) {
      calloutElem.innerHTML = `
        <div class="callout-box callout-success">
          <strong>Full Mastery Achieved:</strong> Student resolved all previously identified misconceptions through teacher intervention. The student is ready to proceed to Grade 7 advanced mathematics units.
        </div>
      `;
    } else if (t2.score > t1.score) {
      calloutElem.innerHTML = `
        <div class="callout-box callout-progress">
          <strong>Measurable Growth Observed:</strong> Score increased from ${t1.percentage}% to ${t2.percentage}%. Several misconception areas showed clear resolution.
        </div>
      `;
    } else {
      calloutElem.innerHTML = `
        <div class="callout-box callout-warning">
          <strong>Further Remediation Required:</strong> Student requires additional 1-on-1 coaching sessions before re-assessing.
        </div>
      `;
    }
  }

  // Populate topic-by-topic comparison table
  const tableBody = document.getElementById('comparison-table-body');
  if (tableBody) {
    tableBody.innerHTML = '';

    t1.items.forEach((item1, idx) => {
      const item2 = t2.items[idx];
      const row = document.createElement('tr');

      let statusBadge = '';
      if (!item1.isCorrect && item2.isCorrect) {
        statusBadge = `<span class="badge badge-resolved">&#10003; Misconception Resolved (+1)</span>`;
      } else if (item1.isCorrect && item2.isCorrect) {
        statusBadge = `<span class="badge badge-maintained">Maintained Mastery</span>`;
      } else if (!item1.isCorrect && !item2.isCorrect) {
        statusBadge = `<span class="badge badge-persistent">Still Needs Practice</span>`;
      } else {
        statusBadge = `<span class="badge badge-regressed">Review Needed</span>`;
      }

      const t1StatusHtml = item1.isCorrect 
        ? `<span class="text-success font-medium">&#10003; Correct (1/1)</span>`
        : `<span class="text-error font-medium">&#10007; Mistake: ${escapeHtml(item1.diagnostic.category)}</span>`;

      const t2StatusHtml = item2.isCorrect
        ? `<span class="text-success font-medium">&#10003; Correct (1/1)</span>`
        : `<span class="text-error font-medium">&#10007; Incorrect</span>`;

      row.innerHTML = `
        <td><strong>${escapeHtml(item1.topic)}</strong><br><small class="text-muted">${escapeHtml(item1.subTopic)}</small></td>
        <td>${t1StatusHtml}</td>
        <td>${t2StatusHtml}</td>
        <td>${statusBadge}</td>
      `;

      tableBody.appendChild(row);
    });
  }
}

// Reset Entire Prototype
function resetEntirePrototype() {
  state.test1Submitted = false;
  state.test1Answers = {};
  state.test1Results = null;
  state.retestSubmitted = false;
  state.retestAnswers = {};
  state.retestResults = null;

  clearAssessmentAnswers();
  clearRetestAnswers();

  const comparisonReportSection = document.getElementById('improvement-comparison-view');
  if (comparisonReportSection) {
    comparisonReportSection.classList.add('hidden');
  }

  updateNavigationState();
  switchTab('assessment');
  showToast("Prototype reset to initial state.");
}

// Utility: Simple Toast Notification
function showToast(message, type = "info") {
  let toast = document.getElementById('erp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'erp-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `erp-toast show ${type}`;

  setTimeout(() => {
    toast.className = 'erp-toast';
  }, 3500);
}

// Utility: HTML escaping
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
