// =============================================
// CONSTANTS
// =============================================
const APP_VERSION = 'v1.10.0';
const FEEDBACK_URL = 'https://forms.gle/y48um84BTrBVn2Nt6';
const UPDATE_HISTORY = [
  { version: 'v1.10.0', notes: [
    '알림장을 여러 페이지로 나눠서 쓸 수 있어요 — 예: "아침 활동", "수업 시간", "알림장"을 따로 미리 써두세요',
    '알림장 탭 위의 + 버튼으로 새 페이지를 추가하고, × 버튼으로 삭제할 수 있어요',
    '페이지 이름은 두 번 클릭해서 바꿀 수 있어요',
    '이 기능은 설정 > 표시 설정 > "알림장 여러 페이지 사용" 토글로 켜고 끌 수 있어요',
    '"개발자 소식" 버튼이 생겼어요 — 의견 보내기로 보내주신 피드백에 대한 답변과 새 소식을 여기에 올려드려요'
  ]},
  { version: 'v1.9.0', notes: [
    '나이스(NEIS) 학사일정을 자동으로 불러와서 왼쪽 배너에 알려드려요',
    '오른쪽 패널에 "급식" 탭이 생겼어요 — 오늘의 식단을 바로 확인할 수 있어요',
    '설정에서 학교를 검색·선택하면 위 기능이 자동으로 켜져요 (각자 브라우저에만 저장)'
  ]},
  { version: 'v1.8.1', notes: [
    '백업 파일 불러오기와 외부 링크 열기를 더 안전하게 다듬었어요'
  ]},
  { version: 'v1.8.0', notes: [
    '업데이트 소식을 알림 팝업으로 알려드려요',
    '의견 보내기 버튼이 추가되었어요 — 자유롭게 의견을 남겨주세요!',
    '학교종이 연동 기능을 준비하고 있어요 (테스트 중)'
  ]},
  { version: 'v1.7.0', notes: [
    '알림장에서 글자를 꾸밀 수 있어요 (굵게, 기울임, 밑줄, 글자색)',
    '다양한 색상을 골라서 글자 색을 바꿀 수 있어요',
    '글자 크기를 원하는 크기로 간편하게 바꿀 수 있어요',
    '공지사항의 글자 크기도 조절할 수 있어요'
  ]}
];

// 개발자 소식 게시판 — 의견 보내기로 받은 피드백에 답변하거나 소식을 전달할 때 사용합니다.
// 최상단이 최신 글. id는 겹치지 않게(예: 날짜 + 순번) 주세요.
const DEVELOPER_NOTES = [
  {
    id: '2026-04-16-05-page-reorder',
    date: '2026-04-16',
    title: '알림장 페이지 순서를 바꿀 수 있어요',
    body: '의견 보내기로 "알림장 탭을 길게 누르면 순서를 바꿀 수 있으면 좋겠다"는 의견을 주셨어요.\n\n이제 알림장 페이지 탭을 0.5초 정도 길게 누르면 드래그 모드로 전환되고, 누른 채로 좌우로 옮겨서 원하는 위치에 놓을 수 있어요. 탭이 따라오면서 다른 탭들이 자연스럽게 밀려나요.\n\n(설정 > "알림장 여러 페이지 사용"이 켜져 있어야 합니다)'
  },
  {
    id: '2026-04-16-04-panel-resize',
    date: '2026-04-16',
    title: '좌우 화면 크기를 조절할 수 있어요',
    body: '"왼쪽 시간 부분과 오른쪽 화면의 크기 조절이 가능하면 좋겠다"는 의견을 주셨어요.\n\n이제 화면 가운데 구분선을 마우스로 드래그하면 좌우 패널의 비율을 자유롭게 조절할 수 있어요. 공지사항을 크게 보고 싶을 때 오른쪽을 넓혀 보세요! 구분선을 더블클릭하면 원래 비율(50:50)로 돌아갑니다.\n\n설정한 비율은 자동 저장돼서 다음에 열어도 유지됩니다.'
  },
  {
    id: '2026-04-16-03-voice-options',
    date: '2026-04-16',
    title: '쉬는시간 알림을 개별 설정할 수 있어요',
    body: '"쉬는 시간 알림을 1분 전만으로 설정하고 싶다"는 의견을 주셨어요.\n\n이제 설정 > 쉬는 시간 음성 안내를 켜면, 그 아래에 4개의 체크박스가 나타나요:\n- 쉬는시간 3분 전 / 1분 전\n- 점심시간 5분 전 / 1분 전\n\n필요한 알림만 골라서 켤 수 있습니다!'
  },
  {
    id: '2026-04-16-02-notice-color',
    date: '2026-04-16',
    title: '공지사항 글자에 색깔을 넣을 수 있어요',
    body: '"공지사항 글자 색깔을 바꿀 수 있으면 좋겠다"는 의견을 주셨어요.\n\n이제 공지사항 탭의 글자 크기 옆에 6가지 색상 버튼(검정, 빨강, 파랑, 초록, 노랑, 보라)이 생겼어요. 강조하고 싶은 부분을 드래그로 선택한 뒤 색상 버튼을 누르면 해당 부분의 글자색이 바뀝니다.'
  },
  {
    id: '2026-04-16-01-rules-font',
    date: '2026-04-16',
    title: '학급 약속 글자가 조금 커졌어요',
    body: '"우리 반 약속 내용이 조금만 더 글자가 커지면 좋겠다"는 의견을 주셨어요.\n\n학급 약속의 제목과 설명 글자 크기를 한 단계씩 키웠습니다. 뒤에서도 잘 보이길 바랍니다!'
  },
  {
    id: '2026-04-14-welcome',
    date: '2026-04-14',
    title: '개발자 소식 게시판이 생겼어요!',
    body: '안녕하세요 선생님들 :) 의견 보내기로 보내주신 의견에 답변드릴 공간이 필요해서 이 게시판을 열었어요.\n\n앞으로 보내주신 의견에 대한 답변, 새 기능 준비 소식, 버그 안내 같은 걸 여기에 올릴 예정이에요. 새 글이 있으면 버튼에 빨간 점이 표시되고, 한 번 열어보시면 사라져요.\n\n계속 많은 의견 보내주세요!'
  }
];
const COLORS = ['#3b82f6','#8b5cf6','#f97316','#10b981','#ef4444','#ec4899','#14b8a6','#f59e0b'];
const DAYS_KR = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
const DAY_LABELS = ['월','화','수','목','금'];

const DEFAULT_RULES = [
  { title: '서로 존중하기', desc: '친구의 말에 귀 기울이고, 다름을 인정해요', color: '#3b82f6' },
  { title: '수업에 집중하기', desc: '선생님이 말씀하실 때 경청하고 적극적으로 참여해요', color: '#8b5cf6' },
  { title: '교실을 깨끗하게', desc: '내 자리는 내가 정리하고, 함께 쓰는 공간을 소중히 해요', color: '#f97316' },
  { title: '시간 약속 지키기', desc: '수업 시작 전 자리에 앉고, 정해진 시간을 잘 지켜요', color: '#10b981' },
];

const DEFAULT_TIMETABLE = [
  { label: '아침 시간', start: '08:40', end: '09:00', type: 'event-time', days: [1,2,3,4,5], subjects: {} },
  { label: '1교시', start: '09:00', end: '09:40', type: 'in-class', days: [1,2,3,4,5], subjects: {} },
  { label: '2교시', start: '09:50', end: '10:30', type: 'in-class', days: [1,2,3,4,5], subjects: {} },
  { label: '3교시', start: '10:40', end: '11:20', type: 'in-class', days: [1,2,3,4,5], subjects: {} },
  { label: '4교시', start: '11:30', end: '12:10', type: 'in-class', days: [1,2,3,4,5], subjects: {} },
  { label: '점심시간', start: '12:10', end: '13:00', type: 'lunch-time', days: [1,2,3,4,5], subjects: {} },
  { label: '5교시', start: '13:00', end: '13:40', type: 'in-class', days: [1,2,3,4,5], subjects: {} },
  { label: '6교시', start: '13:50', end: '14:30', type: 'in-class', days: [2], subjects: {} },
];

// =============================================
// STATE
// =============================================
let rules = [];
let isEditing = false;
let timetable = [];
let settings = { showRemaining: true, chimeEnabled: true, colonBlink: true, showSeconds: true, timetableMode: false, dailyPeriods: { 1:5, 2:6, 3:5, 4:5, 5:5 }, morningSlotMigrated: false, schoolbellUrl: '', school: null, notebookMultiPageEnabled: false };
let viewData = { activeTab: 'rules', notebook: '', notebookPages: [], activeNotebookPageId: '', notices: [], academicEvents: [], selectedAcademicEventDate: '' };
let lastPeriodLabel = null;
let lastChimeTime = 0;
let lastTimetableMin = -1;
let audioCtx = null;
let notebookTimer = null;
let lastAcademicEventToastKey = '';
let specialTimetableDirty = false;

const neisScheduleCache = new Map();
const mealCache = new Map();
let lastMealTabYmd = '';

let drag = {
  active: false, cardEl: null, index: -1, currentIndex: -1,
  startY: 0, offsetY: 0, cardRects: [], cardH: 0,
};

let ttDrag = {
  active: false, rowEl: null, index: -1, currentIndex: -1,
  startY: 0, offsetY: 0, cardRects: [], cardH: 0, rows: [],
};

// =============================================
// HELPERS
// =============================================
function timeToMins(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function minsToTime(mins) {
  return String(Math.floor(mins / 60)).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function cloneEntry(entry) {
  return {
    label: entry.label || '새 시간',
    start: entry.start || '09:00',
    end: entry.end || '09:40',
    type: entry.type || 'in-class',
    days: Array.isArray(entry.days) ? [...entry.days] : [1, 2, 3, 4, 5],
    subjects: entry.subjects ? { ...entry.subjects } : {},
    subject: entry.subject || '',
  };
}

function createMorningEntry(start, end) {
  return { label: '아침 시간', start, end, type: 'event-time', days: [1, 2, 3, 4, 5], subjects: {} };
}

function hasMorningEntry(entries) {
  return entries.some(entry => entry.label === '아침 시간');
}

function normalizeAcademicEvent(event) {
  const normalized = {
    date: typeof event?.date === 'string' ? event.date : '',
    title: typeof event?.title === 'string' ? event.title : '',
    notice: typeof event?.notice === 'string' ? event.notice : '',
    timetable: Array.isArray(event?.timetable) ? event.timetable.map(cloneEntry) : [],
  };
  normalized.timetable.sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  return normalized;
}

function getAcademicEvents() {
  if (!Array.isArray(viewData.academicEvents)) viewData.academicEvents = [];
  return viewData.academicEvents;
}

function getAcademicEventByDate(dateKey) {
  return getAcademicEvents().find(event => event.date === dateKey) || null;
}

function getSelectedAcademicEvent() {
  return getAcademicEventByDate(viewData.selectedAcademicEventDate || '');
}

function getBaseEntriesForDate(dateObj) {
  const day = dateObj.getDay();
  const isWeekend = (day === 0 || day === 6);
  if (isWeekend) return [];

  let todayEntries = timetable
    .filter(e => e.days.includes(day))
    .sort((a, b) => timeToMins(a.start) - timeToMins(b.start))
    .map(cloneEntry);

  const maxPeriods = settings.dailyPeriods ? settings.dailyPeriods[day] : null;
  if (maxPeriods) {
    let periodCount = 0;
    let lastPeriodEndMins = 0;
    const filtered = [];
    for (const e of todayEntries) {
      if (/^\d+교시$/.test(e.label)) {
        periodCount++;
        if (periodCount <= maxPeriods) {
          filtered.push(e);
          lastPeriodEndMins = timeToMins(e.end);
        }
      } else {
        filtered.push(e);
      }
    }
    todayEntries = filtered.filter(e => {
      if (/^\d+교시$/.test(e.label)) return true;
      return timeToMins(e.start) < lastPeriodEndMins;
    });
  }

  return todayEntries;
}

function buildSpecialTimetableFromBase(dateKey) {
  const sourceDate = new Date(dateKey + 'T09:00:00');
  return getBaseEntriesForDate(sourceDate).map(entry => {
    const subject = entry.subjects ? (entry.subjects[sourceDate.getDay()] || '') : '';
    return {
      label: entry.label,
      start: entry.start,
      end: entry.end,
      type: entry.type,
      subject,
      subjects: {},
      days: [],
    };
  });
}

// =============================================
// LOAD / SAVE
// =============================================
function loadRules() {
  try {
    const s = localStorage.getItem('classroomRules');
    rules = s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_RULES));
  } catch { rules = JSON.parse(JSON.stringify(DEFAULT_RULES)); }
}
function saveRules() { localStorage.setItem('classroomRules', JSON.stringify(rules)); }

function loadTimetable() {
  try {
    const s = localStorage.getItem('classroomTimetable');
    timetable = s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_TIMETABLE));
  } catch { timetable = JSON.parse(JSON.stringify(DEFAULT_TIMETABLE)); }
  timetable.forEach(entry => { if (!entry.subjects) entry.subjects = {}; });
  if (!settings.morningSlotMigrated && !hasMorningEntry(timetable)) {
    timetable.unshift(createMorningEntry('08:40', '09:00'));
    saveTimetable();
    settings.morningSlotMigrated = true;
    saveSettings();
  }
}
function saveTimetable() {
  timetable.sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  localStorage.setItem('classroomTimetable', JSON.stringify(timetable));
}

function loadSettings() {
  try {
    const s = localStorage.getItem('classroomSettings');
    if (s) {
      const saved = JSON.parse(s);
      settings = { ...settings, ...saved };
      if (!settings.dailyPeriods) settings.dailyPeriods = { 1:5, 2:6, 3:5, 4:5, 5:5 };
      if (settings.chimeEnabled === undefined) settings.chimeEnabled = true;
      if (settings.colonBlink === undefined) settings.colonBlink = true;
      if (settings.showSeconds === undefined) settings.showSeconds = true;
      if (settings.timetableMode === undefined) settings.timetableMode = false;
      if (settings.morningSlotMigrated === undefined) settings.morningSlotMigrated = false;
      if (settings.voiceAlertEnabled === undefined) settings.voiceAlertEnabled = false;
      if (settings.voiceAlertBreak3 === undefined) settings.voiceAlertBreak3 = true;
      if (settings.voiceAlertBreak1 === undefined) settings.voiceAlertBreak1 = true;
      if (settings.voiceAlertLunch5 === undefined) settings.voiceAlertLunch5 = true;
      if (settings.voiceAlertLunch1 === undefined) settings.voiceAlertLunch1 = true;
      if (settings.schoolbellUrl === undefined) settings.schoolbellUrl = '';
      if (settings.school === undefined) settings.school = null;
      if (settings.notebookMultiPageEnabled === undefined) settings.notebookMultiPageEnabled = false;

    }
  } catch { /* keep defaults */ }
}
function saveSettings() { localStorage.setItem('classroomSettings', JSON.stringify(settings)); }

function loadViewData() {
  try {
    const s = localStorage.getItem('classroomViewData');
    if (s) viewData = { ...viewData, ...JSON.parse(s) };
  } catch { /* keep defaults */ }
  if (!Array.isArray(viewData.notices)) viewData.notices = [];
  if (!Array.isArray(viewData.academicEvents)) viewData.academicEvents = [];
  viewData.academicEvents = viewData.academicEvents
    .map(normalizeAcademicEvent)
    .filter(event => event.date && event.title.trim());
  if (viewData.selectedAcademicEventDate && !getAcademicEventByDate(viewData.selectedAcademicEventDate)) {
    viewData.selectedAcademicEventDate = '';
  }
  if (!Array.isArray(viewData.notebookPages)) viewData.notebookPages = [];
  if (viewData.notebookPages.length === 0) {
    viewData.notebookPages = [{
      id: generateNotebookPageId(),
      title: '알림장',
      content: (typeof viewData.notebook === 'string' ? viewData.notebook : '') || '',
    }];
  }
  viewData.notebookPages = viewData.notebookPages
    .filter(p => p && typeof p === 'object')
    .map(p => ({
      id: (typeof p.id === 'string' && p.id) ? p.id : generateNotebookPageId(),
      title: (typeof p.title === 'string' && p.title.trim()) ? p.title : '알림장',
      content: typeof p.content === 'string' ? p.content : '',
    }));
  if (viewData.notebookPages.length === 0) {
    viewData.notebookPages.push({ id: generateNotebookPageId(), title: '알림장', content: '' });
  }
  if (!viewData.activeNotebookPageId || !viewData.notebookPages.some(p => p.id === viewData.activeNotebookPageId)) {
    viewData.activeNotebookPageId = viewData.notebookPages[0].id;
  }
  viewData.notebook = getActiveNotebookPage().content;
}

function generateNotebookPageId() {
  return 'np_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function getActiveNotebookPage() {
  if (!Array.isArray(viewData.notebookPages) || viewData.notebookPages.length === 0) {
    viewData.notebookPages = [{ id: generateNotebookPageId(), title: '알림장', content: '' }];
    viewData.activeNotebookPageId = viewData.notebookPages[0].id;
  }
  var page = viewData.notebookPages.find(p => p.id === viewData.activeNotebookPageId);
  if (!page) {
    page = viewData.notebookPages[0];
    viewData.activeNotebookPageId = page.id;
  }
  return page;
}

function getActiveNotebookContent() {
  return getActiveNotebookPage().content || '';
}

function setActiveNotebookContent(html) {
  var page = getActiveNotebookPage();
  page.content = html;
  viewData.notebook = html;
}
function saveViewData() { localStorage.setItem('classroomViewData', JSON.stringify(viewData)); }

// =============================================
// RENDER RULES
// =============================================
function renderRules() {
  const container = document.getElementById('rulesContainer');
  container.innerHTML = '';
  document.getElementById('rightPanel').classList.toggle('edit-mode', isEditing);

  rules.forEach((rule, i) => {
    const card = document.createElement('div');
    card.className = 'rule-card';
    card.dataset.index = i;

    const handle = document.createElement('span');
    handle.className = 'drag-handle';
    handle.innerHTML = '&#10303;';
    handle.addEventListener('pointerdown', e => startDrag(e, i, card));

    const numWrap = document.createElement('div');
    numWrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;';
    const num = document.createElement('div');
    num.className = 'rule-number';
    num.style.color = rule.color || COLORS[i % COLORS.length];
    num.textContent = String(i + 1).padStart(2, '0');
    numWrap.appendChild(num);

    const palette = document.createElement('div');
    palette.className = 'number-colors';
    COLORS.forEach(c => {
      const dot = document.createElement('div');
      dot.className = 'color-dot' + (c === rule.color ? ' active' : '');
      dot.style.background = c;
      dot.onclick = () => { rules[i].color = c; saveRules(); renderRules(); };
      palette.appendChild(dot);
    });
    numWrap.appendChild(palette);

    const content = document.createElement('div');
    content.className = 'rule-content';

    const title = document.createElement('div');
    title.className = 'rule-title';
    title.textContent = rule.title;
    title.contentEditable = isEditing;
    title.spellcheck = false;
    title.addEventListener('blur', () => { rules[i].title = title.textContent.trim() || '새 규칙'; saveRules(); });
    title.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); title.blur(); } });

    const desc = document.createElement('div');
    desc.className = 'rule-desc';
    desc.textContent = rule.desc;
    desc.contentEditable = isEditing;
    desc.spellcheck = false;
    desc.addEventListener('blur', () => { rules[i].desc = desc.textContent.trim(); saveRules(); });
    desc.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); desc.blur(); } });

    content.appendChild(title);
    content.appendChild(desc);

    const actions = document.createElement('div');
    actions.className = 'rule-actions';

    const delBtn = document.createElement('button');
    delBtn.className = 'action-btn delete-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.onclick = () => {
      card.style.transition = 'transform 0.3s, opacity 0.3s';
      card.style.transform = 'scale(0.8)';
      card.style.opacity = '0';
      setTimeout(() => { rules.splice(i, 1); saveRules(); renderRules(); showToast('규칙이 삭제되었어요'); }, 250);
    };
    actions.appendChild(delBtn);

    card.appendChild(handle);
    card.appendChild(numWrap);
    card.appendChild(content);
    card.appendChild(actions);
    container.appendChild(card);
  });
}

// =============================================
// DRAG & DROP
// =============================================
function startDrag(e, index, cardEl) {
  if (!isEditing) return;
  e.preventDefault();

  const container = document.getElementById('rulesContainer');
  const cards = [...container.querySelectorAll('.rule-card')];
  const rect = cardEl.getBoundingClientRect();

  const rects = cards.map(c => c.getBoundingClientRect());
  const cardH = rect.height;

  drag = {
    active: true, cardEl, index, currentIndex: index,
    startY: e.clientY, offsetY: e.clientY - rect.top,
    cardRects: rects, cardH, cards,
  };

  cardEl.classList.add('is-lifted');
  cardEl.style.setProperty('--card-width', rect.width + 'px');
  cardEl.style.left = rect.left + 'px';
  cardEl.style.top = (e.clientY - drag.offsetY) + 'px';

  cards.forEach(c => c.style.setProperty('--card-h', cardH + 'px'));
  document.body.classList.add('is-dragging');

  document.addEventListener('pointermove', onDragMove);
  document.addEventListener('pointerup', onDragEnd);
}

function onDragMove(e) {
  if (!drag.active) return;
  const { cardEl, offsetY, index, cards, cardRects, cardH } = drag;

  cardEl.style.top = (e.clientY - offsetY) + 'px';

  const centerY = e.clientY - offsetY + cardH / 2;
  let newIndex = index;

  for (let i = 0; i < cardRects.length; i++) {
    const r = cardRects[i];
    const midY = r.top + r.height / 2;
    if (i < index && centerY < midY) { newIndex = i; break; }
    if (i > index && centerY > midY) { newIndex = i; }
  }

  if (newIndex !== drag.currentIndex) {
    drag.currentIndex = newIndex;
    cards.forEach((c, i) => {
      if (i === index) return;
      c.classList.remove('shift-down', 'shift-up');
      if (index < newIndex) {
        if (i > index && i <= newIndex) c.classList.add('shift-up');
      } else if (index > newIndex) {
        if (i >= newIndex && i < index) c.classList.add('shift-down');
      }
    });
  }
}

function onDragEnd() {
  if (!drag.active) return;
  const { cardEl, index, currentIndex, cards } = drag;

  cardEl.classList.remove('is-lifted');
  cardEl.style.cssText = '';
  cards.forEach(c => { c.classList.remove('shift-down', 'shift-up'); c.style.removeProperty('--card-h'); });
  document.body.classList.remove('is-dragging');

  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup', onDragEnd);

  if (index !== currentIndex) {
    const moved = rules.splice(index, 1)[0];
    rules.splice(currentIndex, 0, moved);
    saveRules();
    showToast('순서가 변경되었어요');
  }

  drag.active = false;
  renderRules();
}

// =============================================
// ADD RULE / TOGGLE EDIT / TOAST
// =============================================
function addRule() {
  rules.push({ title: '새 규칙', desc: '설명을 입력하세요', color: COLORS[rules.length % COLORS.length] });
  saveRules(); renderRules();
  showToast('새 규칙이 추가되었어요');
  setTimeout(() => {
    const titles = document.querySelectorAll('.rule-title');
    const last = titles[titles.length - 1];
    if (last) { last.focus(); document.execCommand('selectAll', false, null); }
  }, 100);
}

function toggleEdit() {
  isEditing = !isEditing;
  const btn = document.getElementById('editToggle');
  btn.textContent = isEditing ? '완료' : '편집';
  btn.classList.toggle('active', isEditing);
  renderRules();
  if (!isEditing) showToast('저장되었어요');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2000);
}

// =============================================
// UPDATE NOTIFICATION
// =============================================
function compareVersions(a, b) {
  var pa = (a || '').replace('v','').split('.').map(Number);
  var pb = (b || '').replace('v','').split('.').map(Number);
  for (var i = 0; i < 3; i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
  }
  return 0;
}

function checkUpdateNotification() {
  var lastSeen = localStorage.getItem('classroom_lastSeenVersion') || '';
  if (lastSeen === APP_VERSION) return;
  var newUpdates = UPDATE_HISTORY.filter(function(entry) {
    return compareVersions(entry.version, lastSeen) > 0;
  });
  if (newUpdates.length === 0) return;
  var popup = document.getElementById('updateNotification');
  if (popup) {
    document.getElementById('updateVersion').textContent = APP_VERSION;
    var listEl = document.getElementById('updateNotesList');
    listEl.innerHTML = '';
    newUpdates.forEach(function(entry) {
      var header = document.createElement('li');
      header.className = 'update-notes-version-header';
      header.textContent = entry.version;
      listEl.appendChild(header);
      entry.notes.forEach(function(note) {
        var li = document.createElement('li');
        li.textContent = note;
        listEl.appendChild(li);
      });
    });
    popup.classList.add('open');
  }
}

function dismissUpdateNotification() {
  localStorage.setItem('classroom_lastSeenVersion', APP_VERSION);
  document.getElementById('updateNotification').classList.remove('open');
}

// =============================================
// SETTINGS
// =============================================
function toggleShowRemaining() {
  settings.showRemaining = document.getElementById('showRemainingToggle').checked;
  saveSettings();
}

function openSettings() {
  document.getElementById('settingsModal').classList.add('open');
  document.getElementById('showRemainingToggle').checked = settings.showRemaining;
  document.getElementById('chimeToggle').checked = settings.chimeEnabled;
  document.getElementById('colonBlinkToggle').checked = settings.colonBlink;
  document.getElementById('secondsToggle').checked = settings.showSeconds;
  document.getElementById('timetableModeToggle').checked = settings.timetableMode;
  document.getElementById('voiceAlertToggle').checked = settings.voiceAlertEnabled;
  document.getElementById('voiceBreak3Toggle').checked = settings.voiceAlertBreak3 !== false;
  document.getElementById('voiceBreak1Toggle').checked = settings.voiceAlertBreak1 !== false;
  document.getElementById('voiceLunch5Toggle').checked = settings.voiceAlertLunch5 !== false;
  document.getElementById('voiceLunch1Toggle').checked = settings.voiceAlertLunch1 !== false;
  updateVoiceAlertOptionsState();
  var multiPageToggle = document.getElementById('notebookMultiPageToggle');
  if (multiPageToggle) multiPageToggle.checked = !!settings.notebookMultiPageEnabled;
  document.getElementById('schoolbellUrlInput').value = settings.schoolbellUrl || '';
  renderSchoolCurrent();
  const searchInput = document.getElementById('schoolSearchInput');
  if (searchInput) searchInput.value = '';
  const resultsEl = document.getElementById('schoolResults');
  if (resultsEl) resultsEl.textContent = '';
  renderNeisSchedulePreview();
  renderDailyPeriods();
  renderTimetableEditor();
  renderSubjectGrid();
  renderAcademicEventList();
  fillAcademicEventForm();
  renderSpecialTimetableEditor();
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('open');
}

function fillAcademicEventForm() {
  const selected = getSelectedAcademicEvent();
  const dateInput = document.getElementById('eventDateInput');
  const titleInput = document.getElementById('eventTitleInput');
  const noticeInput = document.getElementById('eventNoticeInput');
  if (!dateInput || !titleInput || !noticeInput) return;

  dateInput.value = selected ? selected.date : '';
  titleInput.value = selected ? selected.title : '';
  noticeInput.value = selected ? selected.notice : '';
}

function clearAcademicEventForm() {
  viewData.selectedAcademicEventDate = '';
  specialTimetableDirty = false;
  saveViewData();
  fillAcademicEventForm();
  updateAcademicEventSelectionBar();
  renderAcademicEventList();
  renderSpecialTimetableEditor();
}

function startNewAcademicEvent() {
  clearAcademicEventForm();
  const dateInput = document.getElementById('eventDateInput');
  if (dateInput) dateInput.focus();
}

function setAcademicEventDateToday() {
  const dateInput = document.getElementById('eventDateInput');
  if (!dateInput) return;
  dateInput.value = formatDateKey(new Date());
}

function flashAcademicEventForm() {
  const fields = [
    document.getElementById('eventDateInput'),
    document.getElementById('eventTitleInput'),
    document.getElementById('eventNoticeInput')
  ].filter(Boolean);

  fields.forEach(field => {
    field.classList.remove('flash');
    void field.offsetWidth;
    field.classList.add('flash');
  });
}

function selectAcademicEvent(dateKey, options) {
  const source = options && options.source ? options.source : 'list';
  viewData.selectedAcademicEventDate = dateKey;
  specialTimetableDirty = false;
  saveViewData();
  fillAcademicEventForm();
  updateAcademicEventSelectionBar();
  renderAcademicEventList();
  renderSpecialTimetableEditor();
  flashAcademicEventForm();

  const titleInput = document.getElementById('eventTitleInput');
  if (titleInput) titleInput.focus();

  const scheduleCard = document.getElementById('eventScheduleCard');
  if (scheduleCard) scheduleCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (source === 'button') showToast('편집할 일정이 선택되었어요');
}

function updateAcademicEventSelectionBar() {
  const bar = document.getElementById('eventSelectedBar');
  if (!bar) return;
  const selected = getSelectedAcademicEvent();
  bar.textContent = selected
    ? '현재 선택: ' + selected.date + ' · ' + selected.title
    : '현재 선택: 새 일정 작성 중';
}

function renderAcademicEventList() {
  const container = document.getElementById('academicEventList');
  if (!container) return;
  container.innerHTML = '';

  const events = getAcademicEvents().slice().sort((a, b) => a.date.localeCompare(b.date));
  if (!events.length) {
    const empty = document.createElement('div');
    empty.className = 'event-empty';
    empty.textContent = '등록된 학사 일정이 없습니다.';
    container.appendChild(empty);
    return;
  }

  events.forEach(event => {
    const isActive = event.date === viewData.selectedAcademicEventDate;
    const item = document.createElement('div');
    item.className = 'event-item' + (isActive ? ' active' : '');

    const body = document.createElement('div');
    body.className = 'event-item-body';

    const date = document.createElement('div');
    date.className = 'event-item-date';
    date.textContent = event.date;

    const title = document.createElement('div');
    title.className = 'event-item-title';
    title.textContent = event.title;

    const note = document.createElement('div');
    note.className = 'event-item-note';
    note.textContent = event.notice || '안내 문구 없음';

    body.appendChild(date);
    body.appendChild(title);
    body.appendChild(note);

    const actions = document.createElement('div');
    actions.className = 'event-item-actions';

    if (isActive) {
      const badge = document.createElement('span');
      badge.className = 'event-item-badge';
      badge.textContent = '현재 선택';
      actions.appendChild(badge);
    }

    const editBtn = document.createElement('button');
    editBtn.className = 'event-mini-btn' + (isActive ? ' active' : '');
    editBtn.textContent = isActive ? '선택됨' : '편집';
    editBtn.addEventListener('click', () => {
      selectAcademicEvent(event.date, { source: 'button' });
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'event-mini-btn delete';
    delBtn.textContent = '삭제';
    delBtn.addEventListener('click', () => deleteAcademicEvent(event.date));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    item.appendChild(body);
    item.appendChild(actions);
    container.appendChild(item);
  });
}

function saveAcademicEvent() {
  const dateInput = document.getElementById('eventDateInput');
  const titleInput = document.getElementById('eventTitleInput');
  const noticeInput = document.getElementById('eventNoticeInput');
  const date = (dateInput?.value || '').trim();
  const title = (titleInput?.value || '').trim();
  const notice = (noticeInput?.value || '').trim();

  if (!date || !title) {
    alert('날짜와 일정 이름을 입력해주세요.');
    return;
  }

  const events = getAcademicEvents();
  const currentSelectedDate = viewData.selectedAcademicEventDate || '';
  const selectedEvent = getAcademicEventByDate(currentSelectedDate);
  const existingIndex = events.findIndex(event => event.date === date);

  if (currentSelectedDate && currentSelectedDate !== date && existingIndex >= 0) {
    alert('같은 날짜의 일정이 이미 있습니다. 기존 일정을 편집하거나 삭제해주세요.');
    return;
  }

  if (selectedEvent) {
    selectedEvent.date = date;
    selectedEvent.title = title;
    selectedEvent.notice = notice;
    selectedEvent.timetable = (selectedEvent.timetable || []).map(cloneEntry).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  } else if (existingIndex >= 0) {
    events[existingIndex].title = title;
    events[existingIndex].notice = notice;
  } else {
    events.push(normalizeAcademicEvent({ date, title, notice, timetable: [] }));
  }

  viewData.selectedAcademicEventDate = date;
  viewData.academicEvents = events
    .map(normalizeAcademicEvent)
    .sort((a, b) => a.date.localeCompare(b.date));
  const savedEvent = getAcademicEventByDate(date);
  if (savedEvent && !savedEvent.timetable.length) {
    savedEvent.timetable = buildSpecialTimetableFromBase(date);
  }
  saveViewData();
  selectAcademicEvent(date, { source: 'save' });
  updateAcademicEventBanner(new Date());
  if (settings.timetableMode) renderTimetableDisplay();
  showToast('학사 일정이 저장되었어요');
}

function deleteAcademicEvent(dateKey) {
  if (!confirm('이 학사 일정을 삭제할까요?')) return;
  viewData.academicEvents = getAcademicEvents().filter(event => event.date !== dateKey);
  if (viewData.selectedAcademicEventDate === dateKey) viewData.selectedAcademicEventDate = '';
  specialTimetableDirty = false;
  saveViewData();
  fillAcademicEventForm();
  updateAcademicEventSelectionBar();
  renderAcademicEventList();
  renderSpecialTimetableEditor();
  updateAcademicEventBanner(new Date());
  if (settings.timetableMode) renderTimetableDisplay();
  showToast('학사 일정이 삭제되었어요');
}

function renderSpecialTimetableEditor() {
  const card = document.getElementById('eventScheduleCard');
  const titleEl = document.getElementById('eventScheduleTitle');
  const container = document.getElementById('specialTtList');
  const statusEl = document.getElementById('specialTtSaveStatus');
  if (!card || !titleEl || !container) return;

  const selected = getSelectedAcademicEvent();
  if (!selected) {
    card.style.display = '';
    titleEl.textContent = '날짜별 시간표';
    if (statusEl) {
      statusEl.textContent = '일정을 먼저 선택하세요';
      statusEl.className = 'event-save-status';
    }
    container.innerHTML = '<div class="event-schedule-placeholder">일정을 저장하거나 목록에서 편집을 누르면<br>이 아래에서 해당 날짜 전용 시간표를 수정할 수 있습니다.</div>';
    return;
  }

  card.style.display = '';
  titleEl.textContent = selected.date + ' 날짜 전용 시간표';
  if (statusEl) {
    statusEl.textContent = specialTimetableDirty ? '변경됨' : '저장됨';
    statusEl.className = 'event-save-status ' + (specialTimetableDirty ? 'dirty' : 'saved');
  }
  container.innerHTML = '';

  if (!selected.timetable.length) {
    const empty = document.createElement('div');
    empty.className = 'event-empty';
    empty.textContent = '아직 날짜 전용 시간표가 없습니다. 기본 시간표를 불러오거나 새 시간을 추가하세요.';
    container.appendChild(empty);
    return;
  }

  selected.timetable.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'tt-row';

    const labelInput = document.createElement('input');
    labelInput.className = 'tt-label-input';
    labelInput.type = 'text';
    labelInput.value = entry.label;
    labelInput.addEventListener('change', () => {
      entry.label = labelInput.value.trim() || '새 시간';
      markSpecialTimetableDirty();
    });

    const startInput = document.createElement('input');
    startInput.className = 'tt-time-input';
    startInput.type = 'time';
    startInput.value = entry.start;
    startInput.addEventListener('change', () => {
      if (!startInput.value) return;
      entry.start = startInput.value;
      markSpecialTimetableDirty(true);
    });

    const sep = document.createElement('span');
    sep.className = 'tt-separator';
    sep.textContent = '~';

    const endInput = document.createElement('input');
    endInput.className = 'tt-time-input';
    endInput.type = 'time';
    endInput.value = entry.end;
    endInput.addEventListener('change', () => {
      if (!endInput.value) return;
      entry.end = endInput.value;
      markSpecialTimetableDirty(true);
    });

    const typeSelect = document.createElement('select');
    typeSelect.className = 'tt-type-select';
    [['in-class', '수업'], ['lunch-time', '점심'], ['break-time', '쉬는시간'], ['event-time', '행사']].forEach(([val, txt]) => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = txt;
      if (val === entry.type) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener('change', () => {
      entry.type = typeSelect.value;
      markSpecialTimetableDirty();
    });

    const subjectInput = document.createElement('input');
    subjectInput.className = 'subject-grid-input';
    subjectInput.type = 'text';
    subjectInput.placeholder = '세부 내용';
    subjectInput.value = entry.subject || '';
    subjectInput.addEventListener('input', () => {
      entry.subject = subjectInput.value;
      markSpecialTimetableDirty();
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'tt-delete-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.addEventListener('click', () => {
      selected.timetable.splice(i, 1);
      markSpecialTimetableDirty(true);
      showToast('날짜별 시간이 삭제되었어요');
    });

    row.appendChild(labelInput);
    row.appendChild(startInput);
    row.appendChild(sep);
    row.appendChild(endInput);
    row.appendChild(typeSelect);
    row.appendChild(subjectInput);
    row.appendChild(delBtn);
    container.appendChild(row);
  });
}

function markSpecialTimetableDirty(shouldRerender) {
  specialTimetableDirty = true;
  if (shouldRerender) renderSpecialTimetableEditor();
  else {
    const statusEl = document.getElementById('specialTtSaveStatus');
    if (statusEl) {
      statusEl.textContent = '변경됨';
      statusEl.className = 'event-save-status dirty';
    }
  }
}

function saveAcademicEventTimetable(shouldRerender, showSavedToast) {
  const selected = getSelectedAcademicEvent();
  if (!selected) return;
  selected.timetable = selected.timetable.map(cloneEntry).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  specialTimetableDirty = false;
  saveViewData();
  if (shouldRerender) renderSpecialTimetableEditor();
  else {
    const statusEl = document.getElementById('specialTtSaveStatus');
    if (statusEl) {
      statusEl.textContent = '저장됨';
      statusEl.className = 'event-save-status saved';
    }
  }
  updateAcademicEventBanner(new Date());
  if (settings.timetableMode) renderTimetableDisplay();
  if (showSavedToast) showToast('날짜별 시간표가 저장되었어요');
}

function addSpecialTimetableEntry() {
  const selected = getSelectedAcademicEvent();
  if (!selected) {
    alert('먼저 학사 일정을 저장해주세요.');
    return;
  }
  const lastEntry = selected.timetable[selected.timetable.length - 1];
  let startMins = lastEntry ? timeToMins(lastEntry.end) + 10 : 540;
  let endMins = Math.min(startMins + 40, 1439);
  selected.timetable.push({
    label: (selected.timetable.length + 1) + '교시',
    start: minsToTime(startMins),
    end: minsToTime(endMins),
    type: 'in-class',
    subject: '',
    subjects: {},
    days: [],
  });
  specialTimetableDirty = true;
  saveAcademicEventTimetable(true, false);
  showToast('날짜별 시간이 추가되었어요');
}

function copyDefaultTimetableToSelectedEvent() {
  const selected = getSelectedAcademicEvent();
  if (!selected) {
    alert('먼저 학사 일정을 저장해주세요.');
    return;
  }
  selected.timetable = buildSpecialTimetableFromBase(selected.date);
  specialTimetableDirty = true;
  saveAcademicEventTimetable(true, false);
  showToast('기본 시간표를 날짜별 시간표로 불러왔어요');
}

// =============================================
// CHANGELOG
// =============================================
function openChangelog() {
  document.getElementById('changelogModal').classList.add('open');
}

function closeChangelog() {
  document.getElementById('changelogModal').classList.remove('open');
}

// =============================================
// TIMETABLE EDITOR
// =============================================
function renderTimetableEditor() {
  const container = document.getElementById('ttList');
  container.innerHTML = '';

  timetable.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'tt-row';

    // Label
    const labelInput = document.createElement('input');
    labelInput.className = 'tt-label-input';
    labelInput.type = 'text';
    labelInput.value = entry.label;
    labelInput.addEventListener('change', () => {
      timetable[i].label = labelInput.value.trim() || '새 교시';
      saveTimetable();
    });

    // Start time
    const startInput = document.createElement('input');
    startInput.className = 'tt-time-input';
    startInput.type = 'time';
    startInput.value = entry.start;
    startInput.addEventListener('change', () => {
      if (startInput.value) {
        timetable[i].start = startInput.value;
        saveTimetable();
        renderTimetableEditor();
      } else {
        startInput.value = timetable[i].start;
      }
    });

    const sep = document.createElement('span');
    sep.className = 'tt-separator';
    sep.textContent = '~';

    // End time
    const endInput = document.createElement('input');
    endInput.className = 'tt-time-input';
    endInput.type = 'time';
    endInput.value = entry.end;
    endInput.addEventListener('change', () => {
      if (endInput.value) {
        timetable[i].end = endInput.value;
        saveTimetable();
        renderTimetableEditor();
      } else {
        endInput.value = timetable[i].end;
      }
    });

    // Type
    const typeSelect = document.createElement('select');
    typeSelect.className = 'tt-type-select';
    [['in-class', '수업'], ['lunch-time', '점심'], ['break-time', '쉬는시간']].forEach(([val, txt]) => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = txt;
      if (val === entry.type) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener('change', () => {
      timetable[i].type = typeSelect.value;
      saveTimetable();
    });

    // Day buttons
    const daysDiv = document.createElement('div');
    daysDiv.className = 'tt-days';
    DAY_LABELS.forEach((dayLabel, di) => {
      const dayNum = di + 1;
      const btn = document.createElement('button');
      btn.className = 'tt-day-btn' + (entry.days.includes(dayNum) ? ' active' : '');
      btn.textContent = dayLabel;
      btn.addEventListener('click', () => {
        const idx = entry.days.indexOf(dayNum);
        if (idx >= 0) entry.days.splice(idx, 1);
        else { entry.days.push(dayNum); entry.days.sort(); }
        saveTimetable();
        renderTimetableEditor();
      });
      daysDiv.appendChild(btn);
    });

    // Delete
    const delBtn = document.createElement('button');
    delBtn.className = 'tt-delete-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.addEventListener('click', () => {
      timetable.splice(i, 1);
      saveTimetable();
      renderTimetableEditor();
      showToast('시간이 삭제되었어요');
    });

    // Drag handle
    const handle = document.createElement('span');
    handle.className = 'tt-drag-handle';
    handle.innerHTML = '&#10303;';
    handle.addEventListener('pointerdown', e => startTtDrag(e, i, row));

    row.appendChild(handle);
    row.appendChild(labelInput);
    row.appendChild(startInput);
    row.appendChild(sep);
    row.appendChild(endInput);
    row.appendChild(typeSelect);
    row.appendChild(daysDiv);
    row.appendChild(delBtn);
    container.appendChild(row);
  });
}

function addTimetableEntry() {
  const lastEntry = timetable[timetable.length - 1];
  let startMins = lastEntry ? timeToMins(lastEntry.end) + 10 : 540;
  let endMins = startMins + 40;
  if (endMins > 1439) endMins = 1439;

  timetable.push({
    label: (timetable.length + 1) + '교시',
    start: minsToTime(startMins),
    end: minsToTime(endMins),
    type: 'in-class',
    days: [1, 2, 3, 4, 5],
    subjects: {},
  });
  saveTimetable();
  renderTimetableEditor();
  showToast('새 시간이 추가되었어요');
}

function resetTimetable() {
  if (!confirm('시간표를 기본값으로 초기화할까요?')) return;
  timetable = JSON.parse(JSON.stringify(DEFAULT_TIMETABLE));
  saveTimetable();
  renderTimetableEditor();
  renderSubjectGrid();
  showToast('시간표가 초기화되었어요');
}

function renderSubjectGrid() {
  const grid = document.getElementById('subjectGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const dayLabels = ['월', '화', '수', '목', '금'];
  const inClassEntries = timetable.filter(e => e.type === 'in-class');

  // Header row: empty corner + day headers
  const corner = document.createElement('div');
  grid.appendChild(corner);
  dayLabels.forEach(label => {
    const hdr = document.createElement('div');
    hdr.className = 'subject-grid-header';
    hdr.textContent = label;
    grid.appendChild(hdr);
  });

  // Each period row
  inClassEntries.forEach((entry, _) => {
    const idx = timetable.indexOf(entry);
    const lbl = document.createElement('div');
    lbl.className = 'subject-grid-label';
    lbl.textContent = entry.label;
    grid.appendChild(lbl);

    for (let d = 1; d <= 5; d++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'subject-grid-input';
      input.value = entry.subjects[d] || '';
      input.placeholder = '-';
      input.addEventListener('input', () => {
        timetable[idx].subjects[d] = input.value;
        saveTimetable();
        if (settings.timetableMode) renderTimetableDisplay();
      });
      grid.appendChild(input);
    }
  });
}

// =============================================
// TIMETABLE DRAG & DROP
// =============================================
function startTtDrag(e, index, rowEl) {
  e.preventDefault();

  const container = document.getElementById('ttList');
  const rows = [...container.querySelectorAll('.tt-row')];
  const rect = rowEl.getBoundingClientRect();
  const rects = rows.map(r => r.getBoundingClientRect());
  const cardH = rect.height;

  ttDrag = {
    active: true, rowEl, index, currentIndex: index,
    startY: e.clientY,
    cardRects: rects, cardH, rows,
  };

  rowEl.classList.add('tt-lifted');
  rows.forEach(r => r.style.setProperty('--tt-card-h', cardH + 'px'));
  document.body.classList.add('is-dragging');

  document.addEventListener('pointermove', onTtDragMove);
  document.addEventListener('pointerup', onTtDragEnd);
}

function onTtDragMove(e) {
  if (!ttDrag.active) return;
  const { rowEl, startY, index, rows, cardRects, cardH } = ttDrag;

  const dy = e.clientY - startY;
  rowEl.style.transform = 'translateY(' + dy + 'px) scale(1.02)';

  const origCenter = cardRects[index].top + cardH / 2;
  const centerY = origCenter + dy;
  let newIndex = index;

  for (let i = 0; i < cardRects.length; i++) {
    const r = cardRects[i];
    const midY = r.top + r.height / 2;
    if (i < index && centerY < midY) { newIndex = i; break; }
    if (i > index && centerY > midY) { newIndex = i; }
  }

  if (newIndex !== ttDrag.currentIndex) {
    ttDrag.currentIndex = newIndex;
    rows.forEach((r, i) => {
      if (i === index) return;
      r.classList.remove('tt-shift-down', 'tt-shift-up');
      if (index < newIndex) {
        if (i > index && i <= newIndex) r.classList.add('tt-shift-up');
      } else if (index > newIndex) {
        if (i >= newIndex && i < index) r.classList.add('tt-shift-down');
      }
    });
  }
}

function onTtDragEnd() {
  if (!ttDrag.active) return;
  const { rowEl, index, currentIndex, rows } = ttDrag;

  rowEl.classList.remove('tt-lifted');
  rowEl.style.transform = '';
  rows.forEach(r => { r.classList.remove('tt-shift-down', 'tt-shift-up'); r.style.removeProperty('--tt-card-h'); });
  document.body.classList.remove('is-dragging');

  document.removeEventListener('pointermove', onTtDragMove);
  document.removeEventListener('pointerup', onTtDragEnd);

  if (index !== currentIndex) {
    const moved = timetable.splice(index, 1)[0];
    timetable.splice(currentIndex, 0, moved);
    localStorage.setItem('classroomTimetable', JSON.stringify(timetable));
    showToast('시간표 순서가 변경되었어요');
  }

  ttDrag.active = false;
  renderTimetableEditor();
}

// =============================================
// TAB SWITCHING
// =============================================
function switchTab(tabName) {
  viewData.activeTab = tabName;
  saveViewData();

  if (isEditing) {
    isEditing = false;
    document.getElementById('editToggle').textContent = '편집';
    document.getElementById('editToggle').classList.remove('active');
    document.getElementById('rightPanel').classList.remove('edit-mode');
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.getElementById('tabRules').style.display = tabName === 'rules' ? '' : 'none';
  document.getElementById('tabNotebook').style.display = tabName === 'notebook' ? '' : 'none';
  document.getElementById('tabNotice').style.display = tabName === 'notice' ? '' : 'none';
  document.getElementById('tabMeal').style.display = tabName === 'meal' ? '' : 'none';

  if (tabName === 'notebook') {
    const notebookHTML = getActiveNotebookContent();
    setNotebookHTML('notebookArea', notebookHTML);
    setNotebookHTML('notebookPanelTextarea', notebookHTML);
    applyNotebookFontSize();
    renderNotebookPageBars();
  }
  if (tabName === 'notice') {
    renderNotices();
    applyNoticeFontSize();
  }
  if (tabName === 'meal') {
    renderMealTab();
  }
  applyNotebookPanelFill();
}

function initTabs() {
  const tab = viewData.activeTab || 'rules';
  switchTab(tab);
}

// =============================================
// NOTEBOOK (알림장)
// =============================================
function sendToSchoolbell() {
  showToast('테스트 중입니다. 추후 업데이트를 기다려주세요.');
  return;
  /* --- 아래 기능은 테스트 완료 후 활성화 예정 ---
  var area = document.getElementById('notebookArea');
  var text = (area ? area.innerText : '').trim();
  if (!text) {
    showToast('알림장에 내용을 먼저 입력해주세요');
    return;
  }
  var html = area ? area.innerHTML : '';
  if (navigator.clipboard && window.ClipboardItem) {
    var htmlBlob = new Blob([html], { type: 'text/html' });
    var textBlob = new Blob([text], { type: 'text/plain' });
    navigator.clipboard.write([
      new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })
    ]).then(function() {
      openSchoolbell();
    }).catch(function() {
      fallbackCopyAndOpen(text);
    });
  } else {
    fallbackCopyAndOpen(text);
  }
  */
}

function fallbackCopyAndOpen(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      openSchoolbell();
    }).catch(function() {
      execCommandCopy(text);
      openSchoolbell();
    });
  } else {
    execCommandCopy(text);
    openSchoolbell();
  }
}

function execCommandCopy(text) {
  var tmp = document.createElement('textarea');
  tmp.value = text;
  tmp.style.position = 'fixed';
  tmp.style.opacity = '0';
  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}

function openSchoolbell() {
  var baseUrl = (settings.schoolbellUrl || '').trim();
  var url;
  if (baseUrl) {
    // 설정된 URL에서 그룹 ID를 추출하여 알림장 작성 페이지로 이동
    var match = baseUrl.match(/group\/(\d+)/);
    if (match) {
      url = 'https://schoolbell-e.com/ko/main/group/' + match[1] + '/boards/write/classnews';
    } else {
      url = baseUrl;
    }
  } else {
    url = 'https://v4.schoolbell-e.com';
  }
  showToast('알림장 내용이 복사되었습니다. 학교종이에서 Ctrl+V로 붙여넣어 주세요.');
  setTimeout(function() {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, 800);
}

function saveSchoolbellUrl() {
  settings.schoolbellUrl = document.getElementById('schoolbellUrlInput').value.trim();
  saveSettings();
  showToast('학교종이 URL이 저장되었습니다.');
}

function openFeedback() {
  if (!FEEDBACK_URL) {
    showToast('피드백 기능을 준비 중입니다.');
    return;
  }
  window.open(FEEDBACK_URL, '_blank', 'noopener,noreferrer');
}

// =============================================
// DEVELOPER NOTES (개발자 소식)
// =============================================
function getLatestDevNoteId() {
  return DEVELOPER_NOTES.length > 0 ? DEVELOPER_NOTES[0].id : '';
}

function checkDeveloperNotesUnread() {
  var badge = document.getElementById('devNotesBadge');
  if (!badge) return;
  var latest = getLatestDevNoteId();
  if (!latest) { badge.style.display = 'none'; return; }
  var lastSeen = localStorage.getItem('classroom_lastSeenDevNoteId') || '';
  badge.style.display = lastSeen === latest ? 'none' : '';
}

function openDeveloperNotes() {
  renderDeveloperNotes();
  document.getElementById('developerNotesModal').classList.add('open');
  var latest = getLatestDevNoteId();
  if (latest) localStorage.setItem('classroom_lastSeenDevNoteId', latest);
  checkDeveloperNotesUnread();
}

function closeDeveloperNotes() {
  document.getElementById('developerNotesModal').classList.remove('open');
}

function renderDeveloperNotes() {
  var list = document.getElementById('devNotesList');
  if (!list) return;
  list.innerHTML = '';
  if (DEVELOPER_NOTES.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'dev-notes-empty';
    empty.textContent = '아직 등록된 소식이 없어요.';
    list.appendChild(empty);
    return;
  }
  DEVELOPER_NOTES.forEach(function(note) {
    var item = document.createElement('div');
    item.className = 'dev-notes-item';

    var header = document.createElement('div');
    header.className = 'dev-notes-item-header';
    var dateEl = document.createElement('span');
    dateEl.className = 'dev-notes-date';
    dateEl.textContent = note.date || '';
    var titleEl = document.createElement('span');
    titleEl.className = 'dev-notes-title';
    titleEl.textContent = note.title || '';
    header.appendChild(dateEl);
    header.appendChild(titleEl);

    var bodyEl = document.createElement('div');
    bodyEl.className = 'dev-notes-body';
    // 줄바꿈 유지를 위해 textContent + CSS white-space: pre-wrap 사용
    bodyEl.textContent = note.body || '';

    item.appendChild(header);
    item.appendChild(bodyEl);
    list.appendChild(item);
  });
}

function getNotebookHTML(id) {
  var el = document.getElementById(id);
  return el ? el.innerHTML : '';
}

// 알림장 HTML을 innerHTML에 넣기 전에 위험한 태그/속성을 걸러냅니다.
// DOMParser는 파싱 과정에서 스크립트나 이미지 리소스를 실행하지 않으므로
// 악성 백업 파일이 import 되어도 이 함수를 거친 뒤에는 안전한 서식 태그만 남습니다.
function sanitizeNotebookHTML(html) {
  if (!html) return '';
  var allowedTags = { B:1, STRONG:1, I:1, EM:1, U:1, SPAN:1, FONT:1, BR:1, DIV:1, P:1 };
  var allowedAttrs = { color:1, face:1, size:1 };
  var allowedStyleProps = {
    'color':1, 'background-color':1,
    'font-size':1, 'font-weight':1, 'font-style':1,
    'text-decoration':1, 'font-family':1
  };
  var unsafeValue = /url\(|javascript:|expression\(|@import/i;

  var doc = new DOMParser().parseFromString('<body>' + html + '</body>', 'text/html');
  var source = doc.body;
  var target = document.createElement('div');

  function copy(src, dest) {
    var nodes = src.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === 3) {
        dest.appendChild(document.createTextNode(node.nodeValue));
      } else if (node.nodeType === 1) {
        var tag = node.tagName;
        if (allowedTags[tag]) {
          var clone = document.createElement(tag);
          var attrs = node.attributes;
          for (var j = 0; j < attrs.length; j++) {
            var aname = attrs[j].name.toLowerCase();
            var aval = attrs[j].value;
            if (aname === 'style') {
              var safeStyle = [];
              var decls = aval.split(';');
              for (var k = 0; k < decls.length; k++) {
                var colon = decls[k].indexOf(':');
                if (colon < 0) continue;
                var prop = decls[k].slice(0, colon).trim().toLowerCase();
                var value = decls[k].slice(colon + 1).trim();
                if (unsafeValue.test(value)) continue;
                if (allowedStyleProps[prop]) {
                  safeStyle.push(prop + ': ' + value);
                }
              }
              if (safeStyle.length) clone.setAttribute('style', safeStyle.join('; '));
            } else if (allowedAttrs[aname] && !unsafeValue.test(aval)) {
              clone.setAttribute(aname, aval);
            }
          }
          copy(node, clone);
          dest.appendChild(clone);
        } else {
          copy(node, dest);
        }
      }
    }
  }

  copy(source, target);
  return target.innerHTML;
}

function setNotebookHTML(id, html) {
  var el = document.getElementById(id);
  if (!el) return;
  var safe = sanitizeNotebookHTML(html);
  if (el.innerHTML !== safe) el.innerHTML = safe;
}

function saveNotebookContent(html) {
  setActiveNotebookContent(html);
  clearTimeout(notebookTimer);
  notebookTimer = setTimeout(function() {
    saveViewData();
  }, 500);
}

function onNotebookInput() {
  var html = getNotebookHTML('notebookArea');
  setNotebookHTML('notebookPanelTextarea', html);
  saveNotebookContent(html);
}

function onNotebookPanelInput() {
  var html = getNotebookHTML('notebookPanelTextarea');
  setNotebookHTML('notebookArea', html);
  saveNotebookContent(html);
}

function onNotebookFullscreenInput() {
  var html = getNotebookHTML('notebookFullscreenBody');
  saveNotebookContent(html);
}

function changeNotebookFontSize(delta) {
  const fontSize = (viewData.notebookFontSize || 18) + delta;
  const clamped = Math.max(12, Math.min(120, fontSize));
  viewData.notebookFontSize = clamped;
  saveViewData();
  applyNotebookFontSize();
}

function setNotebookFontSize(val) {
  var size = parseInt(val) || 18;
  size = Math.max(12, Math.min(120, size));
  viewData.notebookFontSize = size;
  saveViewData();
  applyNotebookFontSize();
  // Close dropdowns
  document.querySelectorAll('.notebook-fontsize-dropdown').forEach(function(d) { d.classList.remove('open'); });
}

var NOTEBOOK_SIZE_PRESETS = [10,20,30,40,50,60,70,80,90,100,110,120];

function buildNotebookSizeDropdown(id) {
  var container = document.getElementById(id);
  if (!container || container.children.length > 0) return;
  var current = viewData.notebookFontSize || 18;
  NOTEBOOK_SIZE_PRESETS.forEach(function(s) {
    var btn = document.createElement('button');
    btn.className = 'notebook-fontsize-option' + (s === current ? ' active' : '');
    btn.textContent = s;
    btn.setAttribute('data-size', s);
    btn.onclick = function(e) { e.stopPropagation(); setNotebookFontSize(s); };
    container.appendChild(btn);
  });
}

function toggleNotebookSizeDropdown(id) {
  var dropdown = document.getElementById(id);
  var otherId = id === 'fontSizeDropdown' ? 'fontSizeDropdownFs' : 'fontSizeDropdown';
  var other = document.getElementById(otherId);
  if (other) other.classList.remove('open');
  buildNotebookSizeDropdown(id);
  // Update active state
  var current = viewData.notebookFontSize || 18;
  dropdown.querySelectorAll('.notebook-fontsize-option').forEach(function(btn) {
    btn.classList.toggle('active', parseInt(btn.getAttribute('data-size')) === current);
  });
  dropdown.classList.toggle('open');
  // Scroll active item into view
  if (dropdown.classList.contains('open')) {
    var activeBtn = dropdown.querySelector('.active');
    if (activeBtn) activeBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}

function applyNotebookFontSize() {
  const size = viewData.notebookFontSize || 18;
  const area = document.getElementById('notebookArea');
  if (area) area.style.fontSize = size + 'px';
  const panelArea = document.getElementById('notebookPanelTextarea');
  if (panelArea) panelArea.style.fontSize = size + 'px';
  const fullscreenBody = document.getElementById('notebookFullscreenBody');
  if (fullscreenBody) fullscreenBody.style.fontSize = size + 'px';
  const input = document.getElementById('fontSizeInput');
  if (input) input.value = size;
  const inputFs = document.getElementById('fontSizeInputFullscreen');
  if (inputFs) inputFs.value = size;
}

var NOTEBOOK_COLORS = [
  '#000000','#444444','#888888',
  '#d32f2f','#e64a19','#f9a825',
  '#388e3c','#1976d2','#7b1fa2',
  '#0097a7','#c2185b','#5d4037',
  '#1a237e','#004d40','#ff6f00',
  '#ad1457','#283593','#ffffff'
];

function buildNotebookPalette(id) {
  var container = document.getElementById(id);
  if (!container || container.children.length > 0) return;
  var current = viewData.notebookColor || '#000000';
  NOTEBOOK_COLORS.forEach(function(c) {
    var dot = document.createElement('span');
    dot.className = 'notebook-palette-color' + (c === current ? ' active' : '');
    dot.style.background = c;
    if (c === '#ffffff') dot.style.border = '2px solid rgba(0,0,0,0.15)';
    dot.setAttribute('data-color', c);
    dot.onclick = function() { pickNotebookColor(c); };
    container.appendChild(dot);
  });
}

function toggleNotebookPalette(variant) {
  var id = variant === 'fs' ? 'notebookPaletteFs' : 'notebookPalette';
  var otherId = variant === 'fs' ? 'notebookPalette' : 'notebookPaletteFs';
  var panel = document.getElementById(id);
  var otherPanel = document.getElementById(otherId);
  if (otherPanel) otherPanel.classList.remove('open');
  buildNotebookPalette(id);
  panel.classList.toggle('open');
}

function pickNotebookColor(color) {
  document.querySelectorAll('.notebook-palette').forEach(function(p) { p.classList.remove('open'); });
  document.execCommand('foreColor', false, color);
  // Update swatch to picked color
  ['notebookColorSwatch', 'notebookColorSwatchFs'].forEach(function(id) {
    var sw = document.getElementById(id);
    if (sw) sw.style.background = color;
  });
  document.querySelectorAll('.notebook-palette-color').forEach(function(dot) {
    dot.classList.toggle('active', dot.getAttribute('data-color') === color);
  });
  syncNotebookFromActive();
}

function toggleNotebookStyle(style) {
  if (style === 'bold') document.execCommand('bold');
  else if (style === 'italic') document.execCommand('italic');
  else if (style === 'underline') document.execCommand('underline');
  syncNotebookFromActive();
}

function syncNotebookFromActive() {
  // After applying formatting, save the active editor's content
  var areas = ['notebookArea', 'notebookPanelTextarea', 'notebookFullscreenBody'];
  for (var i = 0; i < areas.length; i++) {
    var el = document.getElementById(areas[i]);
    if (el && el.contains(document.activeElement) || el === document.activeElement) {
      var html = el.innerHTML;
      // Sync to other editors
      areas.forEach(function(otherId) {
        if (otherId !== areas[i]) setNotebookHTML(otherId, html);
      });
      setActiveNotebookContent(html);
      clearTimeout(notebookTimer);
      notebookTimer = setTimeout(function() {
        saveViewData();
      }, 300);
      break;
    }
  }
}

function initNotebookSwatches() {
  var color = '#000000';
  ['notebookColorSwatch', 'notebookColorSwatchFs'].forEach(function(id) {
    var sw = document.getElementById(id);
    if (sw) sw.style.background = color;
  });
}

function toggleNotebookPanelFill() {
  viewData.notebookPanelFill = !viewData.notebookPanelFill;
  saveViewData();
  applyNotebookPanelFill();
}

function applyNotebookPanelFill() {
  const enabled = !!viewData.notebookPanelFill && viewData.activeTab === 'notebook';
  const panel = document.getElementById('rightPanel');
  if (panel) panel.classList.toggle('notebook-focus-mode', enabled);
  const button = document.getElementById('notebookPanelFillBtn');
  if (button) button.classList.toggle('active', enabled);
  const overlay = document.getElementById('notebookPanelOverlay');
  const overlayArea = document.getElementById('notebookPanelTextarea');
  if (overlay) overlay.setAttribute('aria-hidden', enabled ? 'false' : 'true');
  if (enabled) {
    if (overlayArea) {
      setNotebookHTML('notebookPanelTextarea', getActiveNotebookContent());
      overlayArea.focus();
    }
  }
}

// =============================================
// NOTEBOOK PAGES (알림장 여러 페이지)
// =============================================
function renderNotebookPageBars() {
  ['notebookPageBar', 'notebookPageBarFs'].forEach(function(barId) {
    renderNotebookPageBar(barId);
  });
}

function renderNotebookPageBar(barId) {
  var bar = document.getElementById(barId);
  if (!bar) return;
  var enabled = !!settings.notebookMultiPageEnabled;
  bar.style.display = enabled ? '' : 'none';
  if (!enabled) { bar.innerHTML = ''; return; }

  var pages = viewData.notebookPages || [];
  var activeId = viewData.activeNotebookPageId;
  bar.innerHTML = '';

  pages.forEach(function(page) {
    var tab = document.createElement('div');
    tab.className = 'notebook-page-tab' + (page.id === activeId ? ' active' : '');
    tab.setAttribute('data-page-id', page.id);

    var title = document.createElement('span');
    title.className = 'notebook-page-tab-title';
    title.textContent = page.title;
    title.title = '클릭: 페이지 이동 / 더블클릭: 이름 변경';
    title.onclick = function(e) { e.stopPropagation(); switchNotebookPage(page.id); };
    title.ondblclick = function(e) { e.stopPropagation(); startRenameNotebookPage(page.id); };
    tab.appendChild(title);

    if (pages.length > 1) {
      var del = document.createElement('button');
      del.className = 'notebook-page-tab-del';
      del.innerHTML = '&#10005;';
      del.title = '이 페이지 삭제';
      del.onclick = function(e) { e.stopPropagation(); deleteNotebookPage(page.id); };
      tab.appendChild(del);
    }
    // Long-press drag reorder
    (function(thisTab, thisPage) {
      var pressTimer = null;
      thisTab.addEventListener('mousedown', function(e) {
        if (e.target.closest('.notebook-page-tab-del')) return;
        if (e.button !== 0) return;
        pressTimer = setTimeout(function() {
          pressTimer = null;
          startNotebookPageDrag(bar, thisTab, thisPage.id);
        }, 500);
      });
      thisTab.addEventListener('mouseup', function() {
        if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
      });
      thisTab.addEventListener('mouseleave', function() {
        if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
      });
    })(tab, page);
    bar.appendChild(tab);
  });

  var addBtn = document.createElement('button');
  addBtn.className = 'notebook-page-add';
  addBtn.innerHTML = '+';
  addBtn.title = '새 페이지 추가';
  addBtn.onclick = function(e) { e.stopPropagation(); addNotebookPage(); };
  bar.appendChild(addBtn);
}

function getVisibleNotebookEditorId() {
  var fsOverlay = document.getElementById('notebookFullscreen');
  if (fsOverlay && fsOverlay.classList.contains('open')) return 'notebookFullscreenBody';
  if (viewData.notebookPanelFill) return 'notebookPanelTextarea';
  return 'notebookArea';
}

function switchNotebookPage(pageId) {
  if (viewData.activeNotebookPageId === pageId) return;
  var visibleId = getVisibleNotebookEditorId();
  var visibleEl = document.getElementById(visibleId);
  if (visibleEl) setActiveNotebookContent(visibleEl.innerHTML);

  viewData.activeNotebookPageId = pageId;
  var html = getActiveNotebookContent();
  setNotebookHTML('notebookArea', html);
  setNotebookHTML('notebookPanelTextarea', html);
  setNotebookHTML('notebookFullscreenBody', html);
  viewData.notebook = html;
  saveViewData();
  renderNotebookPageBars();

  var targetEl = document.getElementById(visibleId);
  if (targetEl) targetEl.focus();
}

function addNotebookPage() {
  var newPage = {
    id: generateNotebookPageId(),
    title: '새 페이지 ' + (viewData.notebookPages.length + 1),
    content: '',
  };
  viewData.notebookPages.push(newPage);
  viewData.activeNotebookPageId = newPage.id;
  viewData.notebook = '';
  setNotebookHTML('notebookArea', '');
  setNotebookHTML('notebookPanelTextarea', '');
  setNotebookHTML('notebookFullscreenBody', '');
  saveViewData();
  renderNotebookPageBars();
  showToast('새 페이지가 추가되었어요');
}

function deleteNotebookPage(pageId) {
  if (viewData.notebookPages.length <= 1) {
    showToast('페이지는 최소 1개가 필요해요');
    return;
  }
  var page = viewData.notebookPages.find(function(p) { return p.id === pageId; });
  if (!page) return;
  var plainText = (page.content || '').replace(/<[^>]*>/g, '').trim();
  var msg = plainText
    ? '"' + page.title + '" 페이지를 삭제할까요?\n내용이 함께 사라집니다.'
    : '"' + page.title + '" 페이지를 삭제할까요?';
  if (!confirm(msg)) return;

  var idx = viewData.notebookPages.findIndex(function(p) { return p.id === pageId; });
  viewData.notebookPages.splice(idx, 1);
  if (viewData.activeNotebookPageId === pageId) {
    var nextIdx = Math.min(idx, viewData.notebookPages.length - 1);
    viewData.activeNotebookPageId = viewData.notebookPages[nextIdx].id;
    var html = getActiveNotebookContent();
    setNotebookHTML('notebookArea', html);
    setNotebookHTML('notebookPanelTextarea', html);
    setNotebookHTML('notebookFullscreenBody', html);
    viewData.notebook = html;
  }
  saveViewData();
  renderNotebookPageBars();
  showToast('페이지가 삭제되었어요');
}

function startRenameNotebookPage(pageId) {
  var page = viewData.notebookPages.find(function(p) { return p.id === pageId; });
  if (!page) return;
  var current = page.title;
  var next = prompt('페이지 이름을 입력하세요', current);
  if (next === null) return;
  next = next.trim();
  if (!next) { showToast('이름은 비워둘 수 없어요'); return; }
  page.title = next.slice(0, 20);
  saveViewData();
  renderNotebookPageBars();
}

function startNotebookPageDrag(bar, dragTab, dragPageId) {
  var pages = viewData.notebookPages;
  var dragIdx = pages.findIndex(function(p) { return p.id === dragPageId; });
  if (dragIdx === -1) return;

  // Snapshot original positions of all tabs
  var tabs = Array.from(bar.querySelectorAll('.notebook-page-tab'));
  var origRects = tabs.map(function(t) { return t.getBoundingClientRect(); });
  var dragRect = origRects[tabs.indexOf(dragTab)];
  var startX = dragRect.left + dragRect.width / 2;

  dragTab.classList.add('page-dragging');
  bar.classList.add('reordering');

  // Suppress clicks on this tab during & right after drag
  var suppressClick = function(e) { e.stopImmediatePropagation(); e.preventDefault(); };
  dragTab.addEventListener('click', suppressClick, true);

  // Current order tracking (index in pages array)
  var currentOrder = pages.map(function(p) { return p.id; });
  var currentDragIdx = dragIdx;

  function onMouseMove(e) {
    // Move the dragged tab with cursor
    var dx = e.clientX - startX;
    dragTab.style.transform = 'translateX(' + dx + 'px)';

    // Figure out which position the cursor is over
    var newIdx = currentDragIdx;
    for (var i = 0; i < origRects.length; i++) {
      var center = origRects[i].left + origRects[i].width / 2;
      if (i < currentDragIdx && e.clientX < center) { newIdx = i; break; }
      if (i > currentDragIdx && e.clientX > center) { newIdx = i; }
    }

    if (newIdx !== currentDragIdx) {
      // Reorder the data array
      var moved = currentOrder.splice(currentDragIdx, 1)[0];
      currentOrder.splice(newIdx, 0, moved);
      currentDragIdx = newIdx;

      // Shift other tabs to visually show the new order
      tabs.forEach(function(t, i) {
        if (t === dragTab) return;
        var pageId = t.getAttribute('data-page-id');
        var newPos = currentOrder.indexOf(pageId);
        var shift = origRects[newPos].left - origRects[i].left;
        t.style.transform = shift ? 'translateX(' + shift + 'px)' : '';
      });
    }
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Apply the final order to data
    var changed = false;
    for (var i = 0; i < currentOrder.length; i++) {
      if (currentOrder[i] !== pages[i].id) { changed = true; break; }
    }
    if (changed) {
      var map = {};
      pages.forEach(function(p) { map[p.id] = p; });
      viewData.notebookPages = currentOrder.map(function(id) { return map[id]; });
      saveViewData();
      showToast('페이지 순서가 변경되었어요');
    }

    // Clean up styles
    tabs.forEach(function(t) {
      t.style.transform = '';
      t.classList.remove('page-dragging');
    });
    bar.classList.remove('reordering');
    renderNotebookPageBars();

    setTimeout(function() {
      dragTab.removeEventListener('click', suppressClick, true);
    }, 0);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function toggleNotebookMultiPage() {
  settings.notebookMultiPageEnabled = document.getElementById('notebookMultiPageToggle').checked;
  saveSettings();
  // Flush current editor content to active page so we don't lose edits
  var visibleEl = document.getElementById(getVisibleNotebookEditorId());
  if (visibleEl) {
    setActiveNotebookContent(visibleEl.innerHTML);
    saveViewData();
  }
  renderNotebookPageBars();
}

// =============================================
// NOTICES (공지사항)
// =============================================
function renderNotices() {
  const container = document.getElementById('noticeContainer');
  if (!container) return;
  container.innerHTML = '';
  const notices = viewData.notices || [];

  notices.forEach((notice, i) => {
    const card = document.createElement('div');
    card.className = 'notice-card';

    const dot = document.createElement('div');
    dot.className = 'notice-dot';

    const content = document.createElement('div');
    content.className = 'notice-content';
    content.contentEditable = true;
    content.spellcheck = false;
    var html = notice.html || notice.text || '';
    content.innerHTML = sanitizeNotebookHTML(html);
    content.style.fontSize = (viewData.noticeFontSize || 24) + 'px';
    content.addEventListener('blur', () => {
      var h = content.innerHTML.trim();
      viewData.notices[i].html = sanitizeNotebookHTML(h) || '새 공지';
      delete viewData.notices[i].text;
      saveViewData();
    });
    content.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); content.blur(); }
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'notice-delete-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.onclick = () => {
      card.style.transition = 'transform 0.3s, opacity 0.3s';
      card.style.transform = 'scale(0.8)';
      card.style.opacity = '0';
      setTimeout(() => {
        viewData.notices.splice(i, 1);
        saveViewData();
        renderNotices();
        showToast('공지가 삭제되었어요');
      }, 250);
    };

    card.appendChild(dot);
    card.appendChild(content);
    card.appendChild(delBtn);
    container.appendChild(card);
  });
}

function addNotice() {
  viewData.notices.push({ html: '새 공지사항' });
  saveViewData();
  renderNotices();
  showToast('새 공지가 추가되었어요');
  setTimeout(() => {
    const items = document.querySelectorAll('.notice-content');
    const last = items[items.length - 1];
    if (last) { last.focus(); document.execCommand('selectAll', false, null); }
  }, 100);
}

function applyNoticeColor(color) {
  document.execCommand('foreColor', false, color);
  document.querySelectorAll('.notice-color-dot').forEach(function(dot) {
    dot.classList.toggle('active', dot.getAttribute('data-color') === color);
  });
  // save after color change
  document.querySelectorAll('.notice-content').forEach(function(el, i) {
    if (viewData.notices[i]) {
      viewData.notices[i].html = sanitizeNotebookHTML(el.innerHTML.trim()) || '새 공지';
      delete viewData.notices[i].text;
    }
  });
  saveViewData();
}

function changeNoticeFontSize(delta) {
  var size = (viewData.noticeFontSize || 24) + delta;
  size = Math.max(12, Math.min(120, size));
  viewData.noticeFontSize = size;
  saveViewData();
  applyNoticeFontSize();
}

function setNoticeFontSize(val) {
  var size = parseInt(val) || 24;
  size = Math.max(12, Math.min(120, size));
  viewData.noticeFontSize = size;
  saveViewData();
  applyNoticeFontSize();
}

function applyNoticeFontSize() {
  var size = viewData.noticeFontSize || 24;
  document.querySelectorAll('.notice-content').forEach(function(el) {
    el.style.fontSize = size + 'px';
  });
  var input = document.getElementById('noticeFontSizeInput');
  if (input) input.value = size;
  // Update preset button active states
  var presets = [16, 24, 36, 48];
  var btns = document.querySelectorAll('.notice-preset-btn');
  btns.forEach(function(btn, idx) {
    btn.classList.toggle('active', presets[idx] === size);
  });
}

// =============================================
// AUTO-GENERATE TIMETABLE
// =============================================
function generateTimetable() {
  if (!confirm('기존 시간표를 덮어쓰고 새로 생성할까요?')) return;

  const startTimeStr = document.getElementById('autoStartTime').value || '09:00';
  let startMins = timeToMins(startTimeStr);
  const newTimetable = [];
  newTimetable.push(createMorningEntry(minsToTime(Math.max(0, startMins - 20)), minsToTime(startMins)));

  for (let p = 1; p <= 7; p++) {
    const endMins = startMins + 40;
    newTimetable.push({
      label: p + '교시',
      start: minsToTime(startMins),
      end: minsToTime(endMins),
      type: 'in-class',
      days: [1, 2, 3, 4, 5],
      subjects: {},
    });

    if (p === 4) {
      // 점심시간 50분
      newTimetable.push({
        label: '점심시간',
        start: minsToTime(endMins),
        end: minsToTime(endMins + 50),
        type: 'lunch-time',
        days: [1, 2, 3, 4, 5],
        subjects: {},
      });
      startMins = endMins + 50;
    } else {
      startMins = endMins + 10; // 10분 쉬는시간 갭
    }
  }

  timetable = newTimetable;
  saveTimetable();
  renderTimetableEditor();
  showToast('시간표가 자동 생성되었어요');
}

// =============================================
// CHIME (수업 시작 알림음)
// =============================================
function initAudio() {
  const unlock = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    document.removeEventListener('click', unlock);
  };
  document.addEventListener('click', unlock);
}

function playChime() {
  if (!audioCtx || !settings.chimeEnabled) return;
  const now = Date.now();
  if (now - lastChimeTime < 60000) return;
  lastChimeTime = now;

  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime + i * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.3 + 0.5);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + i * 0.3);
    osc.stop(audioCtx.currentTime + i * 0.3 + 0.5);
  });
}

function toggleChime() {
  settings.chimeEnabled = document.getElementById('chimeToggle').checked;
  saveSettings();
}

function toggleColonBlink() {
  settings.colonBlink = document.getElementById('colonBlinkToggle').checked;
  applyColonBlink();
  saveSettings();
}

function applyColonBlink() {
  document.querySelectorAll('.colon').forEach(el => {
    el.style.animationName = settings.colonBlink ? 'colonBlink' : 'none';
  });
}

function toggleSecondsDisplay() {
  settings.showSeconds = document.getElementById('secondsToggle').checked;
  applySecondsVisibility();
  saveSettings();
}

function applySecondsVisibility() {
  const panel = document.getElementById('leftPanel');
  if (!panel) return;
  panel.classList.toggle('hide-seconds', !settings.showSeconds);
}

// =============================================
// TIMETABLE MODE (LEFT PANEL DISPLAY)
// =============================================
function toggleTimetableMode() {
  settings.timetableMode = !settings.timetableMode;
  saveSettings();
  applyTimetableMode();
}

function toggleTimetableModeSetting() {
  settings.timetableMode = document.getElementById('timetableModeToggle').checked;
  saveSettings();
  applyTimetableMode();
}

function applyTimetableMode() {
  const panel = document.getElementById('leftPanel');
  const btn = document.getElementById('timetableToggleBtn');
  const toggle = document.getElementById('timetableModeToggle');

  panel.classList.toggle('timetable-mode', settings.timetableMode);
  btn.classList.toggle('active', settings.timetableMode);
  if (toggle) toggle.checked = settings.timetableMode;

  if (settings.timetableMode) {
    lastTimetableMin = -1; // force re-render
    renderTimetableDisplay();
  }
}

function renderTimetableDisplay() {
  const container = document.getElementById('timetableDisplay');
  if (!container) return;
  container.innerHTML = '';

  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();
  const entries = getTodayEntries(now);
  if (entries.length === 0) {
    const event = typeof getAcademicEventByDate === 'function' ? getAcademicEventByDate(formatDateKey(now)) : null;
    container.innerHTML = '<div class="timetable-empty-msg">' + (event ? '등록된 일정은 있지만 시간표는 없어요' : '오늘은 수업이 없어요') + '</div>';
    return;
  }

  // Build timeline (classes only, no breaks/lunch)
  const timeline = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.type === 'lunch-time' || entry.type === 'break-time' || entry.type === 'event-time') continue;
    const subject = entry.subject || (entry.subjects ? entry.subjects[day] || '' : '');
    timeline.push({ label: entry.label, start: entry.start, end: entry.end, type: entry.type, subject: subject });
  }

  // Add terminal station for days with fewer than 6 periods
  const periodCount = timeline.length;
  if (periodCount > 0 && periodCount < 6) {
    const lastEntry = timeline[timeline.length - 1];
    timeline.push({ label: '수업 끝', start: lastEntry.end, end: lastEntry.end, type: 'terminal', subject: '' });
  }

  // Find current index (skip terminal)
  let currentIdx = -1;
  for (let i = 0; i < timeline.length; i++) {
    if (timeline[i].type === 'terminal') continue;
    const s = timeToMins(timeline[i].start);
    const e = timeToMins(timeline[i].end);
    if (mins >= s && mins < e) { currentIdx = i; break; }
  }

  // Split into rows of 3
  const rowSize = 3;
  const rows = [];
  for (let i = 0; i < timeline.length; i += rowSize) {
    rows.push(timeline.slice(i, i + rowSize));
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'subway-wrapper';

  rows.forEach((rowItems, rowIdx) => {
    const isReversed = rowIdx % 2 === 1; // ㄷ shape: odd rows reversed
    const line = document.createElement('div');
    line.className = 'subway-line' + (isReversed ? ' subway-line-reversed' : '');

    // Spacer between rows (arch will be drawn via SVG later)
    if (rowIdx > 0) {
      const spacer = document.createElement('div');
      spacer.className = 'subway-connector-spacer';
      wrapper.appendChild(spacer);
    }

    // Calculate rail gauge fill
    const rowStart = rowIdx * rowSize;
    const rowEnd = rowStart + rowItems.length - 1;
    const stationCount = rowItems.length;
    const railLeftPct = (0.5 / stationCount) * 100;
    const railWidthPct = stationCount > 1 ? ((stationCount - 1) / stationCount) * 100 : 0;
    let gaugeFraction = 0;

    if (currentIdx >= 0) {
      if (currentIdx > rowEnd) {
        gaugeFraction = 1;
      } else if (currentIdx >= rowStart && currentIdx <= rowEnd) {
        const localIdx = currentIdx - rowStart;
        const s = timeToMins(timeline[currentIdx].start);
        const e = timeToMins(timeline[currentIdx].end);
        const progress = Math.min(1, Math.max(0, (mins - s) / (e - s)));
        if (stationCount <= 1) {
          gaugeFraction = progress;
        } else {
          gaugeFraction = Math.min(1, (localIdx + progress) / (stationCount - 1));
        }
      }
    } else {
      // Break/lunch time — preserve gauge for completed periods in this row
      const lastInRow = timeline[rowEnd];
      if (lastInRow && mins >= timeToMins(lastInRow.end)) {
        gaugeFraction = 1;
      } else if (stationCount > 1) {
        for (let k = rowEnd; k >= rowStart; k--) {
          if (timeline[k].type === 'terminal') continue;
          if (mins >= timeToMins(timeline[k].end)) {
            var localK = k - rowStart;
            gaugeFraction = Math.min(1, (localK + 1) / (stationCount - 1));
            break;
          }
        }
      }
    }

    line.style.setProperty('--rail-left', railLeftPct + '%');
    line.style.setProperty('--rail-right', (100 - railLeftPct - railWidthPct) + '%');

    // Rail gauge bar
    const railGauge = document.createElement('div');
    railGauge.className = 'subway-rail-gauge';
    if (isReversed) {
      railGauge.style.right = railLeftPct + '%';
      railGauge.style.left = 'auto';
    } else {
      railGauge.style.left = railLeftPct + '%';
    }
    railGauge.style.width = (gaugeFraction * railWidthPct) + '%';

    // Train indicator
    if (gaugeFraction > 0 && gaugeFraction < 1) {
      const train = document.createElement('div');
      train.className = 'subway-train';
      railGauge.appendChild(train);
    }

    line.appendChild(railGauge);

    rowItems.forEach((item, i) => {
      const globalIdx = rowStart + i;
      const isTerminal = item.type === 'terminal';
      const s = timeToMins(item.start);
      const e = timeToMins(item.end);
      const isPast = !isTerminal && mins >= e;
      const isCurrent = (globalIdx === currentIdx);
      const isFuture = !isTerminal && !isPast && !isCurrent;
      const isTerminalReached = isTerminal && mins >= s;

      const station = document.createElement('div');
      station.className = 'subway-station';
      if (isPast) station.classList.add('subway-past');
      if (isCurrent) station.classList.add('subway-current');
      if (isFuture) station.classList.add('subway-future');
      if (isTerminal) station.classList.add('subway-terminal');
      if (isTerminalReached) station.classList.add('subway-terminal-reached');

      const node = document.createElement('div');
      node.className = 'subway-node';
      if (isCurrent) {
        const pulse = document.createElement('div');
        pulse.className = 'subway-node-pulse';
        node.appendChild(pulse);
      }

      const info = document.createElement('div');
      info.className = 'subway-info';
      const topRow = document.createElement('div');
      topRow.className = 'subway-top-row';
      const labelSpan = document.createElement('span');
      labelSpan.className = 'subway-label';
      labelSpan.textContent = item.label;
      topRow.appendChild(labelSpan);

      if (item.subject) {
        const subjectSpan = document.createElement('span');
        subjectSpan.className = 'subway-subject';
        subjectSpan.textContent = item.subject;
        topRow.appendChild(subjectSpan);
      }

      info.appendChild(topRow);
      station.appendChild(node);
      station.appendChild(info);
      line.appendChild(station);
    });

    wrapper.appendChild(line);
  });

  container.appendChild(wrapper);

  // Draw SVG arch curves between rows (replaces straight connectors)
  if (rows.length > 1) {
    wrapper.style.position = 'relative';
    requestAnimationFrame(() => {
      const lineEls = wrapper.querySelectorAll('.subway-line');
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;';
      svg.setAttribute('preserveAspectRatio', 'none');
      const wW = wrapper.offsetWidth;
      const wH = wrapper.offsetHeight;
      const archPartials = [];
      svg.setAttribute('viewBox', '0 0 ' + wW + ' ' + wH);

      for (let r = 0; r < rows.length - 1; r++) {
        const row1El = lineEls[r];
        const row2El = lineEls[r + 1];
        if (!row1El || !row2El) continue;

        const isRowReversed = r % 2 === 0; // even row exits RIGHT, odd exits LEFT
        const stCount = rows[r].length;
        const connXPct = isRowReversed
          ? ((stCount - 0.5) / stCount) * 100
          : (0.5 / stCount) * 100;
        const connX = wW * connXPct / 100;

        const y1 = row1El.offsetTop + 47; // rail center of row 1
        const y2 = row2El.offsetTop + 47; // rail center of row 2
        const archH = y2 - y1;
        const archR = Math.min(archH * 0.6, 60); // protrusion distance
        const curveDir = isRowReversed ? 1 : -1; // 1=right, -1=left

        const d = 'M ' + connX + ' ' + y1 +
          ' C ' + (connX + archR * curveDir) + ' ' + y1 +
          ', ' + (connX + archR * curveDir) + ' ' + y2 +
          ', ' + connX + ' ' + y2;

        // Track path (gray)
        const trackPath = document.createElementNS(svgNS, 'path');
        trackPath.setAttribute('d', d);
        trackPath.setAttribute('stroke', 'rgba(0,0,0,0.08)');
        trackPath.setAttribute('stroke-width', '6');
        trackPath.setAttribute('fill', 'none');
        trackPath.setAttribute('stroke-linecap', 'round');
        svg.appendChild(trackPath);

        // Gauge path (blue, with gradual fill for arch)
        const prevRowEnd = r * rowSize + rows[r].length - 1;
        const prevEndTime = timeToMins(timeline[prevRowEnd].end);
        let archFill = 0;
        if (currentIdx >= 0 && currentIdx > prevRowEnd) {
          archFill = 1;
        } else if (currentIdx >= 0 && currentIdx === prevRowEnd) {
          // Currently in the last period of this row — fill arch gradually
          const aS = timeToMins(timeline[currentIdx].start);
          const aE = timeToMins(timeline[currentIdx].end);
          archFill = (aE > aS) ? Math.min(1, Math.max(0, (mins - aS) / (aE - aS))) : 1;
        } else if (mins >= prevEndTime) {
          archFill = 1;
        }
        if (archFill > 0) {
          const gaugePath = document.createElementNS(svgNS, 'path');
          gaugePath.setAttribute('d', d);
          gaugePath.setAttribute('stroke', '#4a8af4');
          gaugePath.setAttribute('stroke-width', '6');
          gaugePath.setAttribute('fill', 'none');
          gaugePath.setAttribute('stroke-linecap', 'round');
          svg.appendChild(gaugePath);
          if (archFill < 1) {
            archPartials.push({ path: gaugePath, fill: archFill });
          }
        }
      }

      wrapper.appendChild(svg);

      // Apply partial arch fills (SVG now in DOM, getTotalLength available)
      archPartials.forEach(function(item) {
        var totalLen = item.path.getTotalLength();
        item.path.setAttribute('stroke-dasharray', totalLen);
        item.path.setAttribute('stroke-dashoffset', totalLen * (1 - item.fill));
      });
    });
  }
}

// =============================================
// DAILY PERIODS SETTINGS
// =============================================
function renderDailyPeriods() {
  const grid = document.getElementById('dailyPeriodsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const labels = ['월', '화', '수', '목', '금'];

  labels.forEach((label, di) => {
    const dayNum = di + 1;
    const item = document.createElement('div');
    item.className = 'daily-period-item';

    const lbl = document.createElement('div');
    lbl.className = 'daily-period-label';
    lbl.textContent = label;

    const sel = document.createElement('select');
    sel.className = 'daily-period-select';
    for (let n = 4; n <= 7; n++) {
      const opt = document.createElement('option');
      opt.value = n;
      opt.textContent = n + '교시';
      if (settings.dailyPeriods[dayNum] === n) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.addEventListener('change', () => {
      settings.dailyPeriods[dayNum] = parseInt(sel.value);
      saveSettings();
    });

    item.appendChild(lbl);
    item.appendChild(sel);
    grid.appendChild(item);
  });
}

// =============================================
// CLOCK & PERIOD DETECTION
// =============================================
function getTodayEntries(now) {
  const dateKey = formatDateKey(now);
  const event = getAcademicEventByDate(dateKey);
  if (event && event.timetable.length) {
    return event.timetable.map(cloneEntry).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  }
  return getBaseEntriesForDate(now);
}

function getCurrentPeriod(now) {
  const mins = now.getHours() * 60 + now.getMinutes();
  const todayEntries = getTodayEntries(now);
  const event = getAcademicEventByDate(formatDateKey(now));

  if (!todayEntries.length && event) {
    return { label: event.title, type: 'event-time', endMins: null, subject: event.notice };
  }

  const isWeekend = (now.getDay() === 0 || now.getDay() === 6);
  if (isWeekend && !todayEntries.length) return { label: '주말', type: 'off-time', endMins: null };

  if (todayEntries.length === 0) return { label: '수업 없음', type: 'off-time', endMins: null };

  for (let i = 0; i < todayEntries.length; i++) {
    const entry = todayEntries[i];
    const start = timeToMins(entry.start);
    const end = timeToMins(entry.end);

    // Currently in this period
    if (mins >= start && mins < end) {
      const subject = entry.subject || (entry.subjects ? (entry.subjects[now.getDay()] || '') : '');
      return { label: entry.label, type: entry.type, endMins: end, subject: subject };
    }

    // Check gap to next entry (break time)
    if (mins >= end && i + 1 < todayEntries.length) {
      const nextStart = timeToMins(todayEntries[i + 1].start);
      if (mins < nextStart) {
        return { label: '쉬는 시간', type: 'break-time', endMins: nextStart };
      }
    }
  }

  // Before or after school
  const firstStart = timeToMins(todayEntries[0].start);
  const lastEnd = timeToMins(todayEntries[todayEntries.length - 1].end);

  if (mins < firstStart) return { label: '수업 전', type: 'off-time', endMins: null };
  if (mins >= lastEnd) return { label: '수업 끝', type: 'off-time', endMins: null };

  return { label: '수업 전', type: 'off-time', endMins: null };
}

function updateClock() {
  const n = new Date();
  let h = n.getHours();
  const ampm = h < 12 ? '오전' : '오후';
  h = h % 12 || 12;
  document.getElementById('timeDisplay').innerHTML =
    h + '<span class="colon" style="animation-name:' + (settings.colonBlink ? 'colonBlink' : 'none') + '">:</span>' + String(n.getMinutes()).padStart(2, '0');
  document.getElementById('ampmDisplay').textContent = ampm;
  document.getElementById('secondsDisplay').textContent = ': ' + String(n.getSeconds()).padStart(2, '0');
  document.getElementById('dateDisplay').textContent =
    n.getFullYear() + '. ' + String(n.getMonth() + 1).padStart(2, '0') + '. ' + String(n.getDate()).padStart(2, '0');
  document.getElementById('dayName').textContent = DAYS_KR[n.getDay()];
  updateAcademicEventBanner(n);

  // Period alert with optional remaining time
  const period = getCurrentPeriod(n);
  const alertEl = document.getElementById('periodAlert');
  alertEl.className = 'period-alert ' + period.type;

  // Chime on period transition (수업 시작 시)
  if (lastPeriodLabel !== null && lastPeriodLabel !== period.label && period.type === 'in-class') {
    playChime();
  }
  lastPeriodLabel = period.label;

  // 과목명이 있으면 "3교시 · 수학" 형태로 표시
  const displayLabel = period.subject ? period.label + ' · ' + period.subject : period.label;

  if (settings.showRemaining && period.endMins !== null) {
    const currentTotalSecs = n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds();
    const endTotalSecs = period.endMins * 60;
    const remaining = endTotalSecs - currentTotalSecs;

    if (remaining > 0) {
      const remMin = Math.floor(remaining / 60);
      const remSec = remaining % 60;
      let remText;
      if (remMin > 0) {
        remText = remMin + '분 ' + String(remSec).padStart(2, '0') + '초';
      } else {
        remText = remSec + '초';
      }
      alertEl.textContent = '';
      alertEl.appendChild(document.createTextNode(displayLabel + ' '));
      const remSpan = document.createElement('span');
      remSpan.className = 'remaining-time';
      remSpan.textContent = '(' + remText + ' 남음)';
      alertEl.appendChild(remSpan);
    } else {
      alertEl.textContent = displayLabel;
    }
  } else {
    alertEl.textContent = displayLabel;
  }

  // Update timetable display if in timetable mode (only on minute change)
  if (settings.timetableMode) {
    const currentMin = n.getHours() * 60 + n.getMinutes();
    if (currentMin !== lastTimetableMin) {
      lastTimetableMin = currentMin;
      renderTimetableDisplay();
    }
  }

  // Voice alert check
  checkVoiceAlert(n);
}

function updateAcademicEventBanner(now) {
  const banner = document.getElementById('academicEventBanner');
  if (!banner) return;
  const manualEvent = getAcademicEventByDate(formatDateKey(now));

  let source = 'manual';
  let title = '';
  let body = '';
  if (manualEvent) {
    title = manualEvent.title;
    body = manualEvent.notice || '오늘 일정이 적용됩니다.';
  } else {
    const neisEvent = getNeisEventForToday(now);
    if (neisEvent) {
      source = 'neis';
      title = neisEvent.eventName;
      body = neisEvent.eventContent || '';
    }
  }

  if (!title) {
    banner.classList.remove('show');
    banner.classList.remove('neis-source');
    banner.textContent = '';
    return;
  }

  banner.textContent = '';
  banner.classList.toggle('neis-source', source === 'neis');
  const titleEl = document.createElement('span');
  titleEl.className = 'academic-event-title';
  titleEl.textContent = title;
  banner.appendChild(titleEl);

  const lines = (body || '').split('\n');
  lines.forEach((line, index) => {
    if (!line && index === 0 && source === 'neis') return;
    if (index > 0) banner.appendChild(document.createElement('br'));
    banner.appendChild(document.createTextNode(line));
  });
  banner.classList.add('show');

  const toastKey = source + '|' + formatDateKey(now) + '|' + title;
  if (lastAcademicEventToastKey !== toastKey && sessionStorage.getItem('academicEventToast:' + toastKey) !== '1') {
    sessionStorage.setItem('academicEventToast:' + toastKey, '1');
    lastAcademicEventToastKey = toastKey;
    showToast('오늘 일정: ' + title);
  }
}

// =============================================
// DATA EXPORT / IMPORT
// =============================================
function exportData() {
  const data = {
    classroomRules: localStorage.getItem('classroomRules'),
    classroomTimetable: localStorage.getItem('classroomTimetable'),
    classroomSettings: localStorage.getItem('classroomSettings'),
    classroomViewData: localStorage.getItem('classroomViewData'),
    classroomRandomStudents: localStorage.getItem('classroomRandomStudents'),
    classroomRandomPicked: localStorage.getItem('classroomRandomPicked')
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const now = new Date();
  const stamp = now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0');
  a.download = 'classroom-backup-' + stamp + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('백업 파일이 다운로드되었습니다');
}

function importData() {
  document.getElementById('importFileInput').click();
}

function handleImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (!confirm('현재 데이터를 덮어쓰게 됩니다. 계속할까요?')) {
    e.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const data = JSON.parse(ev.target.result);
      const keys = ['classroomRules', 'classroomTimetable', 'classroomSettings', 'classroomViewData', 'classroomRandomStudents', 'classroomRandomPicked'];
      keys.forEach(function(key) {
        if (data[key] !== undefined && data[key] !== null) {
          localStorage.setItem(key, data[key]);
        }
      });
      location.reload();
    } catch (err) {
      alert('파일을 읽는 중 오류가 발생했습니다. 올바른 백업 파일인지 확인해주세요.');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// =============================================
// FULLSCREEN
// =============================================
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(function() {});
  } else {
    document.exitFullscreen().catch(function() {});
  }
}

document.addEventListener('fullscreenchange', function() {
  var btn = document.getElementById('fullscreenBtn');
  btn.innerHTML = document.fullscreenElement ? '&#x2716;' : '&#x26F6;';
  btn.title = document.fullscreenElement ? '전체화면 해제' : '전체화면';
});

// =============================================
// NOTEBOOK FULLSCREEN
// =============================================
function openNotebookFullscreen() {
  var html = getActiveNotebookContent();
  var fullscreenBody = document.getElementById('notebookFullscreenBody');
  setNotebookHTML('notebookFullscreenBody', html);
  fullscreenBody.style.fontSize = (viewData.notebookFontSize || 18) + 'px';
  document.getElementById('notebookFullscreen').classList.add('open');
  renderNotebookPageBar('notebookPageBarFs');
  fullscreenBody.focus();
}

function closeNotebookFullscreen() {
  var fullscreenBody = document.getElementById('notebookFullscreenBody');
  var html = fullscreenBody.innerHTML;
  setNotebookHTML('notebookArea', html);
  setNotebookHTML('notebookPanelTextarea', html);
  setActiveNotebookContent(html);
  saveViewData();
  document.getElementById('notebookFullscreen').classList.remove('open');
}

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  if (document.getElementById('notebookFullscreen').classList.contains('open')) {
    closeNotebookFullscreen();
    return;
  }
  if (viewData.activeTab === 'notebook' && viewData.notebookPanelFill) {
    toggleNotebookPanelFill();
    return;
  }
  const modalsByPriority = [
    { id: 'updateNotification', close: dismissUpdateNotification },
    { id: 'randomPickerModal', close: closeRandomPicker },
    { id: 'developerNotesModal', close: closeDeveloperNotes },
    { id: 'changelogModal', close: closeChangelog },
    { id: 'settingsModal', close: closeSettings },
  ];
  for (var i = 0; i < modalsByPriority.length; i++) {
    var el = document.getElementById(modalsByPriority[i].id);
    if (el && el.classList.contains('open')) {
      modalsByPriority[i].close();
      return;
    }
  }
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.notebook-color-btn') && !e.target.closest('.notebook-palette')) {
    document.querySelectorAll('.notebook-palette').forEach(function(p) { p.classList.remove('open'); });
  }
  if (!e.target.closest('.notebook-fontsize-wrap')) {
    document.querySelectorAll('.notebook-fontsize-dropdown').forEach(function(d) { d.classList.remove('open'); });
  }
});

// =============================================
// VISITOR COUNTER
// =============================================
function getVisitorId() {
  var id = localStorage.getItem('classroomVisitorId');
  if (!id) {
    id = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('classroomVisitorId', id);
  }
  return id;
}

function initVisitorCounter() {
  var today = new Date().toISOString().slice(0, 10);
  var visitorId = getVisitorId();
  var counterData = {};
  try {
    counterData = JSON.parse(localStorage.getItem('classroomVisitorCounter') || '{}');
  } catch(e) { counterData = {}; }

  // Check if this is a new session (not just a refresh)
  var isNewSession = !sessionStorage.getItem('classroomSessionActive');
  if (isNewSession) {
    sessionStorage.setItem('classroomSessionActive', '1');

    // Track unique visitors per day
    if (!counterData.todayVisitors) counterData.todayVisitors = [];
    if (counterData.lastVisitDate !== today) {
      counterData.lastVisitDate = today;
      counterData.todayVisitors = [visitorId];
      counterData.todayCount = 1;
    } else if (!counterData.todayVisitors.includes(visitorId)) {
      counterData.todayVisitors.push(visitorId);
      counterData.todayCount = counterData.todayVisitors.length;
    }

    // Track unique total visitors (preserve old count during migration)
    var oldTotal = counterData.totalCount || 0;
    if (!counterData.allVisitors) counterData.allVisitors = [];
    if (!counterData.allVisitors.includes(visitorId)) {
      counterData.allVisitors.push(visitorId);
    }
    counterData.totalCount = Math.max(oldTotal, counterData.allVisitors.length);

    localStorage.setItem('classroomVisitorCounter', JSON.stringify(counterData));
  } else {
    // Same session, just show existing counts
    if (counterData.lastVisitDate !== today) {
      counterData.lastVisitDate = today;
      counterData.todayCount = 0;
    }
  }

  // Show local counts immediately
  updateCounterDisplay(counterData.todayCount || 0, counterData.totalCount || 0);

  // Try external API for cross-device total count
  if (isNewSession) {
    fetchExternalCounter(true);
  } else {
    fetchExternalCounter(false);
  }
}

function fetchExternalCounter(increment) {
  var namespace = 'classroom-riencarna';
  var key = 'total-visits';
  var todayKey = 'today-' + new Date().toISOString().slice(0, 10);

  var totalUrl = 'https://api.counterapi.dev/v1/' + namespace + '/' + key;
  var todayUrl = 'https://api.counterapi.dev/v1/' + namespace + '/' + todayKey;
  if (increment) { totalUrl += '/up'; todayUrl += '/up'; }

  Promise.all([
    fetch(totalUrl).then(function(r) { return r.json(); }).catch(function() { return null; }),
    fetch(todayUrl).then(function(r) { return r.json(); }).catch(function() { return null; })
  ]).then(function(results) {
    var total = results[0] && results[0].count !== undefined ? results[0].count : 0;
    var today = results[1] && results[1].count !== undefined ? results[1].count : 0;
    if (total < today) total = today;
    if (total) document.getElementById('totalCount').textContent = total;
    if (today) document.getElementById('todayCount').textContent = today;

    // Save API values back to localStorage so refresh shows correct counts
    if (total || today) {
      try {
        var counterData = JSON.parse(localStorage.getItem('classroomVisitorCounter') || '{}');
        if (total) counterData.totalCount = Math.max(counterData.totalCount || 0, total);
        if (today) counterData.todayCount = Math.max(counterData.todayCount || 0, today);
        localStorage.setItem('classroomVisitorCounter', JSON.stringify(counterData));
      } catch(e) {}
    }
  });
}

function updateCounterDisplay(today, total) {
  document.getElementById('todayCount').textContent = today;
  document.getElementById('totalCount').textContent = total;
}

// =============================================
// RANDOM PICKER
// =============================================
let randomStudents = [];
let randomPicked = [];
let randomSpinTimer = null;

function loadRandomStudents() {
  try {
    const s = localStorage.getItem('classroomRandomStudents');
    randomStudents = s ? JSON.parse(s) : [];
  } catch { randomStudents = []; }
  try {
    const p = localStorage.getItem('classroomRandomPicked');
    randomPicked = p ? JSON.parse(p) : [];
  } catch { randomPicked = []; }
}

function saveRandomStudents() {
  localStorage.setItem('classroomRandomStudents', JSON.stringify(randomStudents));
  localStorage.setItem('classroomRandomPicked', JSON.stringify(randomPicked));
}

function openRandomPicker() {
  loadRandomStudents();
  document.getElementById('randomPickerModal').classList.add('open');
  document.getElementById('randomStudentInput').value = randomStudents.join('\n');
  document.getElementById('randomStudentCount').textContent = randomStudents.length + '명';
  renderRandomPickedList();
  updateRandomDisplay();
}

function closeRandomPicker() {
  document.getElementById('randomPickerModal').classList.remove('open');
  if (randomSpinTimer) { clearInterval(randomSpinTimer); randomSpinTimer = null; }
}

function onRandomStudentInput() {
  const text = document.getElementById('randomStudentInput').value;
  randomStudents = text.split('\n').map(s => s.trim()).filter(s => s.length > 0);
  document.getElementById('randomStudentCount').textContent = randomStudents.length + '명';
  saveRandomStudents();
  updateRandomDisplay();
}

function getAvailableStudents() {
  return randomStudents.filter(s => !randomPicked.includes(s));
}

function updateRandomDisplay() {
  const available = getAvailableStudents();
  const btn = document.getElementById('randomGoBtn');
  const info = document.getElementById('randomPickedInfo');
  if (randomStudents.length === 0) {
    document.getElementById('randomDisplay').textContent = '?';
    info.textContent = '학생을 등록해주세요';
    btn.disabled = true;
  } else if (available.length === 0) {
    info.textContent = '모두 뽑았어요! (' + randomPicked.length + '/' + randomStudents.length + ')';
    btn.disabled = true;
  } else {
    info.textContent = randomPicked.length + ' / ' + randomStudents.length + '명 뽑음';
    btn.disabled = false;
  }
}

function doRandomPick() {
  const available = getAvailableStudents();
  if (available.length === 0) return;

  const display = document.getElementById('randomDisplay');
  const btn = document.getElementById('randomGoBtn');
  btn.disabled = true;
  display.classList.remove('picked');
  display.classList.add('spinning');

  let count = 0;
  const totalSpins = 15;
  randomSpinTimer = setInterval(() => {
    display.textContent = available[Math.floor(Math.random() * available.length)];
    count++;
    if (count >= totalSpins) {
      clearInterval(randomSpinTimer);
      randomSpinTimer = null;

      const picked = available[Math.floor(Math.random() * available.length)];
      display.textContent = picked;
      display.classList.remove('spinning');
      display.classList.add('picked');
      randomPicked.push(picked);
      saveRandomStudents();
      renderRandomPickedList();
      updateRandomDisplay();
    }
  }, 80);
}

function resetRandomPick() {
  randomPicked = [];
  saveRandomStudents();
  document.getElementById('randomDisplay').textContent = '?';
  document.getElementById('randomDisplay').classList.remove('picked', 'spinning');
  renderRandomPickedList();
  updateRandomDisplay();
  showToast('뽑기가 초기화되었어요');
}

function renderRandomPickedList() {
  const container = document.getElementById('randomPickedList');
  container.innerHTML = '';
  randomPicked.forEach(name => {
    const tag = document.createElement('span');
    tag.className = 'random-picked-tag';
    tag.textContent = name;
    container.appendChild(tag);
  });
}

// =============================================
// VOICE ALERT (쉬는 시간 음성 안내)
// =============================================
let lastVoiceAlertKey = '';
let playedVoiceAlerts = new Set();

const VOICE_FILES = {
  'break-3': 'audio/break_3min.mp3',
  'break-1': 'audio/break_1min.mp3',
  'lunch-5': 'audio/lunch_5min.mp3',
  'lunch-1': 'audio/lunch_1min.mp3',
};

let voiceAudio = null;

function playVoiceFile(key) {
  if (voiceAudio) { voiceAudio.pause(); voiceAudio.currentTime = 0; }
  voiceAudio = new Audio(VOICE_FILES[key]);
  voiceAudio.volume = 1.0;
  voiceAudio.play();
}

function toggleVoiceAlert() {
  settings.voiceAlertEnabled = document.getElementById('voiceAlertToggle').checked;
  saveSettings();
  updateVoiceAlertOptionsState();
}

function updateVoiceAlertOptionsState() {
  var el = document.getElementById('voiceAlertOptions');
  if (el) el.classList.toggle('disabled', !settings.voiceAlertEnabled);
}

function saveVoiceAlertOptions() {
  settings.voiceAlertBreak3 = document.getElementById('voiceBreak3Toggle').checked;
  settings.voiceAlertBreak1 = document.getElementById('voiceBreak1Toggle').checked;
  settings.voiceAlertLunch5 = document.getElementById('voiceLunch5Toggle').checked;
  settings.voiceAlertLunch1 = document.getElementById('voiceLunch1Toggle').checked;
  saveSettings();
}

function checkVoiceAlert(now) {
  if (!settings.voiceAlertEnabled) return;

  const period = getCurrentPeriod(now);
  if (period.type !== 'break-time' && period.type !== 'lunch-time') {
    // 쉬는시간/점심이 아니면 재생 기록 초기화
    playedVoiceAlerts.clear();
    return;
  }

  if (period.endMins === null) return;

  const currentSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const endSecs = period.endMins * 60;
  const remaining = endSecs - currentSecs;

  const isLunch = period.type === 'lunch-time';
  const allAlerts = isLunch
    ? [
        { secs: 300, fileKey: 'lunch-5', enabled: settings.voiceAlertLunch5 !== false },
        { secs: 60, fileKey: 'lunch-1', enabled: settings.voiceAlertLunch1 !== false },
      ]
    : [
        { secs: 180, fileKey: 'break-3', enabled: settings.voiceAlertBreak3 !== false },
        { secs: 60, fileKey: 'break-1', enabled: settings.voiceAlertBreak1 !== false },
      ];
  const alerts = allAlerts.filter(a => a.enabled);

  // 큰 시간부터 체크하여, 해당 시점을 지났으면 한 번만 재생
  for (const alert of alerts) {
    const key = period.label + '-' + period.endMins + '-' + alert.secs;
    if (remaining <= alert.secs && remaining > 0 && !playedVoiceAlerts.has(key)) {
      playedVoiceAlerts.add(key);
      playVoiceFile(alert.fileKey);
      return;
    }
  }
}

// =============================================
// NEIS INTEGRATION (학교 선택 · 학사일정 · 급식)
// =============================================
function renderSchoolCurrent() {
  const box = document.getElementById('schoolCurrent');
  if (!box) return;
  box.textContent = '';
  if (!settings.school) {
    box.classList.remove('show');
    return;
  }
  box.classList.add('show');

  const info = document.createElement('div');
  info.className = 'school-current-info';
  const label = document.createElement('div');
  label.className = 'school-current-label';
  label.textContent = '선택된 학교';
  const name = document.createElement('div');
  name.className = 'school-current-name';
  name.textContent = settings.school.schoolName || '';
  const meta = document.createElement('div');
  meta.className = 'school-current-meta';
  const metaBits = [settings.school.officeName, settings.school.schoolType, settings.school.location].filter(Boolean);
  meta.textContent = metaBits.join(' · ');
  info.appendChild(label);
  info.appendChild(name);
  if (metaBits.length) info.appendChild(meta);
  box.appendChild(info);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'school-remove-btn';
  removeBtn.textContent = '해제';
  removeBtn.onclick = removeSchool;
  box.appendChild(removeBtn);
}

async function runSchoolSearch() {
  const input = document.getElementById('schoolSearchInput');
  const results = document.getElementById('schoolResults');
  if (!input || !results) return;
  const q = (input.value || '').trim();
  if (!q) {
    results.textContent = '';
    const empty = document.createElement('div');
    empty.className = 'school-result-empty';
    empty.textContent = '학교명을 입력해주세요.';
    results.appendChild(empty);
    return;
  }

  results.textContent = '';
  const loading = document.createElement('div');
  loading.className = 'school-result-empty';
  loading.textContent = '검색 중...';
  results.appendChild(loading);

  try {
    const list = await NEIS.searchSchools(q);
    renderSchoolResults(list);
  } catch (err) {
    results.textContent = '';
    const errEl = document.createElement('div');
    errEl.className = 'school-result-empty';
    errEl.textContent = '검색 오류: ' + (err && err.message ? err.message : '알 수 없는 오류');
    results.appendChild(errEl);
  }
}

function renderSchoolResults(list) {
  const results = document.getElementById('schoolResults');
  if (!results) return;
  results.textContent = '';
  if (!list || !list.length) {
    const empty = document.createElement('div');
    empty.className = 'school-result-empty';
    empty.textContent = '일치하는 학교가 없습니다. 학교명을 더 구체적으로 입력해주세요.';
    results.appendChild(empty);
    return;
  }
  list.forEach((school) => {
    const item = document.createElement('div');
    item.className = 'school-result-item';
    const nameEl = document.createElement('div');
    nameEl.className = 'school-result-name';
    nameEl.textContent = school.schoolName;
    const metaEl = document.createElement('div');
    metaEl.className = 'school-result-meta';
    const metaBits = [school.officeName, school.schoolType, school.address || school.location].filter(Boolean);
    metaEl.textContent = metaBits.join(' · ');
    item.appendChild(nameEl);
    item.appendChild(metaEl);
    item.onclick = () => selectSchool(school);
    results.appendChild(item);
  });
}

function selectSchool(school) {
  settings.school = {
    officeCode: school.officeCode,
    officeName: school.officeName,
    schoolCode: school.schoolCode,
    schoolName: school.schoolName,
    schoolType: school.schoolType || '',
    location: school.location || '',
  };
  saveSettings();
  neisScheduleCache.clear();
  mealCache.clear();
  lastMealTabYmd = '';
  lastAcademicEventToastKey = '';
  renderSchoolCurrent();
  const results = document.getElementById('schoolResults');
  if (results) results.textContent = '';
  const input = document.getElementById('schoolSearchInput');
  if (input) input.value = '';
  showToast(settings.school.schoolName + ' 선택됨');
  updateAcademicEventBanner(new Date());
  renderNeisSchedulePreview();
  if (viewData.activeTab === 'meal') renderMealTab();
}

function removeSchool() {
  if (!settings.school) return;
  if (!confirm('선택된 학교를 해제하시겠어요? 학사일정과 급식 정보가 사라져요.')) return;
  settings.school = null;
  saveSettings();
  neisScheduleCache.clear();
  mealCache.clear();
  lastMealTabYmd = '';
  lastAcademicEventToastKey = '';
  renderSchoolCurrent();
  renderNeisSchedulePreview();
  updateAcademicEventBanner(new Date());
  if (viewData.activeTab === 'meal') renderMealTab();
  showToast('학교 선택이 해제되었어요');
}

function getMonthKey(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
}

function ensureNeisSchedule(ymKey, date) {
  if (!settings.school) return Promise.resolve([]);
  const cached = neisScheduleCache.get(ymKey);
  if (Array.isArray(cached)) return Promise.resolve(cached);
  if (cached && typeof cached.then === 'function') return cached;
  const range = NEIS.monthRange(date);
  const promise = NEIS.getSchoolSchedule(settings.school, range.from, range.to)
    .then((events) => { neisScheduleCache.set(ymKey, events); return events; })
    .catch(() => { neisScheduleCache.set(ymKey, []); return []; });
  neisScheduleCache.set(ymKey, promise);
  return promise;
}

function getNeisEventForToday(now) {
  if (!settings.school) return null;
  const ymKey = getMonthKey(now);
  const cached = neisScheduleCache.get(ymKey);
  if (!Array.isArray(cached)) {
    ensureNeisSchedule(ymKey, now);
    return null;
  }
  const ymd = NEIS.todayYmd(now);
  return cached.find((e) => e.date === ymd) || null;
}

async function renderNeisSchedulePreview() {
  const box = document.getElementById('neisSchedulePreview');
  if (!box) return;
  if (!settings.school) {
    box.classList.remove('show');
    box.textContent = '';
    return;
  }
  box.classList.add('show');
  box.textContent = '';

  const now = new Date();
  const header = document.createElement('div');
  header.className = 'neis-schedule-preview-title';
  const headerLabel = document.createElement('span');
  headerLabel.textContent = '이번 달 나이스 학사일정';
  const headerMonth = document.createElement('span');
  headerMonth.className = 'neis-schedule-preview-month';
  headerMonth.textContent = now.getFullYear() + '.' + String(now.getMonth() + 1).padStart(2, '0');
  header.appendChild(headerLabel);
  header.appendChild(headerMonth);
  box.appendChild(header);

  const body = document.createElement('div');
  body.className = 'neis-schedule-list';
  const loading = document.createElement('div');
  loading.className = 'neis-schedule-empty';
  loading.textContent = '불러오는 중...';
  body.appendChild(loading);
  box.appendChild(body);

  try {
    const ymKey = getMonthKey(now);
    const events = await ensureNeisSchedule(ymKey, now);
    body.textContent = '';
    if (!events || !events.length) {
      const empty = document.createElement('div');
      empty.className = 'neis-schedule-empty';
      empty.textContent = '이번 달에 등록된 학사일정이 없습니다.';
      body.appendChild(empty);
      return;
    }
    const todayYmd = NEIS.todayYmd(now);
    const sorted = events.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    sorted.forEach((ev) => {
      const row = document.createElement('div');
      row.className = 'neis-schedule-row';
      if (ev.date === todayYmd) row.classList.add('is-today');

      const dateEl = document.createElement('div');
      dateEl.className = 'neis-schedule-date';
      dateEl.textContent = formatNeisDateLabel(ev.date);

      const nameEl = document.createElement('div');
      nameEl.className = 'neis-schedule-name';
      nameEl.textContent = ev.eventName + (ev.date === todayYmd ? ' · 오늘' : '');
      nameEl.title = ev.eventName + (ev.eventContent ? '\n' + ev.eventContent : '');

      row.appendChild(dateEl);
      row.appendChild(nameEl);
      body.appendChild(row);
    });
  } catch (err) {
    body.textContent = '';
    const errEl = document.createElement('div');
    errEl.className = 'neis-schedule-error';
    errEl.textContent = '불러오기 실패: ' + ((err && err.message) || '네트워크 오류');
    body.appendChild(errEl);
  }
}

function formatNeisDateLabel(ymd) {
  if (!ymd || ymd.length !== 8) return ymd || '';
  const m = Number(ymd.slice(4, 6));
  const d = Number(ymd.slice(6, 8));
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(Number(ymd.slice(0, 4)), m - 1, d);
  return m + '/' + d + ' (' + dayNames[date.getDay()] + ')';
}

function refreshMealInfo() {
  if (!settings.school) {
    renderMealTab();
    return;
  }
  NEIS.clearCache();
  mealCache.clear();
  neisScheduleCache.clear();
  lastMealTabYmd = '';
  lastAcademicEventToastKey = '';
  renderMealTab();
  if (document.getElementById('settingsModal').classList.contains('open')) {
    renderNeisSchedulePreview();
  }
}

async function renderMealTab() {
  const container = document.getElementById('mealContainer');
  const dateRow = document.getElementById('mealDateRow');
  if (!container || !dateRow) return;

  if (!settings.school) {
    dateRow.textContent = '';
    container.textContent = '';
    const empty = document.createElement('div');
    empty.className = 'meal-empty';
    const strong = document.createElement('strong');
    strong.textContent = '학교를 먼저 선택해주세요';
    empty.appendChild(strong);
    empty.appendChild(document.createTextNode('설정 (⚙) → "학교 선택 (나이스 연동)"에서 자기 학교를 검색·선택하면 오늘의 급식이 자동으로 표시됩니다.'));
    container.appendChild(empty);
    return;
  }

  const now = new Date();
  const ymd = NEIS.todayYmd(now);
  dateRow.textContent = now.getFullYear() + '. ' + String(now.getMonth() + 1).padStart(2, '0') + '. ' + String(now.getDate()).padStart(2, '0') + ' · ' + settings.school.schoolName;

  if (lastMealTabYmd !== ymd || !mealCache.has(ymd)) {
    container.textContent = '';
    const loading = document.createElement('div');
    loading.className = 'meal-loading';
    loading.textContent = '급식 정보를 불러오는 중...';
    container.appendChild(loading);
  }

  try {
    const meals = await ensureMealData(ymd);
    if (viewData.activeTab !== 'meal') return;
    lastMealTabYmd = ymd;
    container.textContent = '';
    if (!meals || !meals.length) {
      const empty = document.createElement('div');
      empty.className = 'meal-empty';
      const strong = document.createElement('strong');
      strong.textContent = '오늘은 급식 정보가 없어요';
      empty.appendChild(strong);
      empty.appendChild(document.createTextNode('주말·공휴일·방학 등에는 급식이 없거나 아직 등록되지 않을 수 있습니다.'));
      container.appendChild(empty);
      return;
    }
    meals.forEach((meal) => {
      container.appendChild(buildMealCard(meal));
    });
  } catch (err) {
    container.textContent = '';
    const errEl = document.createElement('div');
    errEl.className = 'meal-empty';
    const strong = document.createElement('strong');
    strong.textContent = '급식 정보를 불러오지 못했어요';
    errEl.appendChild(strong);
    errEl.appendChild(document.createTextNode((err && err.message) ? err.message : '잠시 후 새로고침을 눌러보세요.'));
    container.appendChild(errEl);
  }
}

function buildMealCard(meal) {
  const card = document.createElement('div');
  card.className = 'meal-card';

  const titleRow = document.createElement('div');
  titleRow.className = 'meal-card-title';
  const titleText = document.createElement('span');
  titleText.textContent = meal.mealName || '급식';
  titleRow.appendChild(titleText);
  if (meal.calorie) {
    const cal = document.createElement('span');
    cal.className = 'meal-card-cal';
    cal.textContent = meal.calorie;
    titleRow.appendChild(cal);
  }
  card.appendChild(titleRow);

  const list = document.createElement('div');
  list.className = 'meal-dish-list';
  (meal.dishes || []).forEach((dish) => {
    const pill = document.createElement('span');
    pill.className = 'meal-dish-item';
    pill.textContent = dish;
    list.appendChild(pill);
  });
  card.appendChild(list);

  if (meal.origin) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'meal-origin-toggle';
    toggleBtn.textContent = '원산지 보기';
    const detail = document.createElement('div');
    detail.className = 'meal-origin-detail';
    detail.textContent = meal.origin.replace(/<br\s*\/?>/gi, '\n');
    toggleBtn.onclick = () => {
      const opened = detail.classList.toggle('show');
      toggleBtn.textContent = opened ? '원산지 숨기기' : '원산지 보기';
    };
    card.appendChild(toggleBtn);
    card.appendChild(detail);
  }

  return card;
}

function ensureMealData(ymd) {
  if (!settings.school) return Promise.resolve([]);
  const cached = mealCache.get(ymd);
  if (Array.isArray(cached)) return Promise.resolve(cached);
  if (cached && typeof cached.then === 'function') return cached;
  const promise = NEIS.getMealInfo(settings.school, ymd)
    .then((meals) => { mealCache.set(ymd, meals); return meals; })
    .catch((err) => { mealCache.delete(ymd); throw err; });
  mealCache.set(ymd, promise);
  return promise;
}

// =============================================
// =============================================
// PANEL RESIZE (좌우 패널 크기 조절)
// =============================================
(function() {
  var divider = document.querySelector('.divider');
  if (!divider) return;
  var saved = localStorage.getItem('classroomPanelRatio');
  if (saved) applyPanelRatio(parseFloat(saved));

  var dragging = false;

  divider.addEventListener('pointerdown', function(e) {
    e.preventDefault();
    dragging = true;
    divider.classList.add('dragging');
    divider.setPointerCapture(e.pointerId);
  });

  divider.addEventListener('pointermove', function(e) {
    if (!dragging) return;
    var ratio = (e.clientX / window.innerWidth) * 100;
    ratio = Math.max(25, Math.min(75, ratio));
    applyPanelRatio(ratio);
  });

  divider.addEventListener('pointerup', function(e) {
    if (!dragging) return;
    dragging = false;
    divider.classList.remove('dragging');
    var ratio = parseFloat(document.documentElement.style.getPropertyValue('--left-width')) || 50;
    localStorage.setItem('classroomPanelRatio', ratio);
  });

  divider.addEventListener('dblclick', function() {
    applyPanelRatio(50);
    localStorage.removeItem('classroomPanelRatio');
  });

  function applyPanelRatio(pct) {
    document.documentElement.style.setProperty('--left-width', pct + '%');
    document.documentElement.style.setProperty('--right-width', (100 - pct) + '%');
  }
})();

// INIT
// =============================================
loadSettings();
loadTimetable();
loadRules();
loadViewData();
loadRandomStudents();
renderRules();
initTabs();
initNotebookSwatches();
initAudio();
applySecondsVisibility();
updateAcademicEventSelectionBar();
applyTimetableMode();
updateClock();
checkUpdateNotification();
checkDeveloperNotesUnread();
if (settings.school) {
  ensureNeisSchedule(getMonthKey(new Date()), new Date());
}

// Web Worker로 1초 타이머 실행 (백그라운드 탭에서도 쓰로틀링 없음)
const timerWorkerUrl = URL.createObjectURL(new Blob([
  'setInterval(() => postMessage(1), 1000);'
], { type: 'application/javascript' }));
const timerWorker = new Worker(timerWorkerUrl);
URL.revokeObjectURL(timerWorkerUrl);
timerWorker.onmessage = () => updateClock();

initVisitorCounter();

// =============================================
// HELP TOOLTIP (FLOATING ON BODY)
// =============================================
(() => {
  let floatingTip = null;
  function removeFloatingTip() {
    if (floatingTip) { floatingTip.remove(); floatingTip = null; }
  }
  document.querySelectorAll('.help-icon').forEach(icon => {
    const text = icon.querySelector('.help-tooltip')?.textContent;
    if (!text) return;
    icon.addEventListener('mouseenter', () => {
      removeFloatingTip();
      floatingTip = document.createElement('div');
      floatingTip.className = 'floating-tooltip';
      floatingTip.textContent = text;
      document.body.appendChild(floatingTip);
      const r = icon.getBoundingClientRect();
      const tt = floatingTip.getBoundingClientRect();
      let left = r.left + r.width / 2 - tt.width / 2;
      if (left < 8) left = 8;
      if (left + tt.width > window.innerWidth - 8) left = window.innerWidth - 8 - tt.width;
      // 위쪽에 공간이 있으면 위에, 없으면 아래에 표시
      if (r.top - tt.height - 10 > 0) {
        floatingTip.style.top = (r.top - tt.height - 10) + 'px';
        floatingTip.classList.add('above');
      } else {
        floatingTip.style.top = (r.bottom + 10) + 'px';
        floatingTip.classList.add('below');
      }
      floatingTip.style.left = left + 'px';
    });
    icon.addEventListener('mouseleave', removeFloatingTip);
  });
})();
