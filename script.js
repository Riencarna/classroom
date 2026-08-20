// =============================================
// CONSTANTS
// =============================================
const APP_VERSION = 'v1.18.3';
const FEEDBACK_URL = 'https://forms.gle/y48um84BTrBVn2Nt6';
const SCHOOLBELL_DEFAULT_URL = 'https://v4.schoolbell-e.com/ko/gate/login';
const UPDATE_HISTORY = [
  { version: 'v1.18.3', notes: [
    '아침 활동과 점심 활동 메모의 비우기 옆에 중요 메모 추가 버튼이 생겼어요',
    '중요 일정이나 꼭 확인할 내용을 기존 메모와 나누어 강조해서 적을 수 있어요'
  ]},
  { version: 'v1.18.2', notes: [
    '설정에서 사이트를 열 때 가장 먼저 표시할 탭을 고를 수 있어요',
    '마지막으로 본 탭을 이어서 보거나 학급 약속·알림장·공지사항·급식·디데이 중 하나를 시작 탭으로 고정할 수 있어요'
  ]},
  { version: 'v1.18.1', notes: [
    '과제 확인 화면을 과제 목록과 선택한 과제의 확인 현황이 함께 보이도록 새롭게 정리했어요',
    '창을 열면 진행 중인 과제의 확인 전 학생부터 바로 살펴볼 수 있어요',
    '확인 전 이름 복사, 모두 확인, 초기화와 과제 보관·복원을 지원해요',
    '과제 확인 중 상태 메시지가 흐릿하게 보이던 문제를 고쳤어요'
  ]},
  { version: 'v1.18.0', notes: [
    '상단 탭을 간결하게 정리하고 과제 확인·랜덤 뽑기·타이머를 학급 도구 메뉴로 모았어요',
    '학급 도구의 과제 확인에서 학생별 제출 여부를 체크하고 계속 저장할 수 있어요',
    '랜덤 뽑기 명단을 불러오고 과제별 체크를 초기화하거나 삭제할 수 있어요',
    '알림장의 학교종이 버튼이 서식을 유지해 내용을 복사하고 학교종이 작성 화면을 열어요',
    '학교종이 학급 URL은 안전한 학교종이 주소인지 확인한 뒤 이 브라우저에만 저장해요'
  ]},
  { version: 'v1.17.1', notes: [
    '공지사항 카드를 손잡이로 끌어서 순서를 바꿀 수 있어요',
    '요일별 교시 수를 6교시로 설정했는데도 5교시 뒤 수업 끝으로 표시되던 문제를 고쳤어요',
    '수업 시작/종료 알림과 쉬는 시간 음성 안내가 요일별 교시 수에 맞게 작동해요'
  ]},
  { version: 'v1.17.0', notes: [
    '우리 반 약속 제목 옆 버튼으로 약속, 아침 활동, 점심 활동을 바로 전환할 수 있어요',
    '아침 활동과 점심 활동에도 글자 크기, 색상, 볼드, 이탤릭, 밑줄 서식을 적용할 수 있어요',
    '과제 제출 기능은 아직 작업중이라 상단 탭 대신 오른쪽 패널 하단의 다음 업데이트 예고로 표시돼요',
    '학급 약속 글자 크기를 조절할 수 있어요'
  ]},
  { version: 'v1.16.0', notes: [
    '화면 하단에 타이머 버튼이 생겼어요',
    '분·초 직접 입력과 1분/3분/5분/10분/20분 빠른 설정을 지원해요',
    '왼쪽 시계의 초 표시가 시·분과 같은 줄에 표시되도록 정리했어요'
  ]},
  { version: 'v1.15.2', notes: [
    '디데이를 등교일 기준으로 계산할 수 있어요',
    '등교일 기준 디데이는 D-25처럼 짧게 보여요',
    '주말을 빼고, 학교가 선택되어 있으면 나이스 학사일정의 공휴일·휴업일·방학도 함께 제외해요'
  ]},
  { version: 'v1.15.1', notes: [
    '오늘 시간표에서 입력한 내용을 완료 버튼으로 확실히 저장하도록 고쳤어요',
    '마지막으로 수정한 교시명, 시간, 유형, 과목/내용이 누락되지 않고 오늘 시간표에 바로 반영돼요'
  ]},
  { version: 'v1.15.0', notes: [
    '시간표 화면에서 오늘 시간표를 바로 바꿀 수 있어요',
    '기본 시간표는 그대로 두고, 오늘만 바뀐 시간표를 날짜 전용 시간표로 저장해요',
    '오늘 변경을 삭제하면 다시 기본 시간표로 돌아가요',
    '시간표 모드에서 대표 디데이 유무에 따라 화면 배치가 흔들리지 않도록 다듬었어요'
  ]},
  { version: 'v1.14.4', notes: [
    '학사 일정의 디데이 버튼을 다시 누르면 디데이 해제가 되도록 바꿨어요',
    '설정의 "오늘 날짜" 버튼 이름을 "오늘로 설정"으로 더 직관적으로 바꿨어요',
    '쉬는시간 3분 전과 1분 전 음성 안내 문구를 더 부드럽게 다듬었어요'
  ]},
  { version: 'v1.14.3', notes: [
    '대표 디데이 표시 위치를 다듬고 일반 모드와 시간표 모드에서 같은 크기로 보이도록 정리했어요',
    '시간표 모드에서 시간표 영역에 불필요한 내부 스크롤이 생기던 문제를 줄였어요'
  ]},
  { version: 'v1.14.2', notes: [
    '날짜가 지난 디데이는 다음 날 자동으로 삭제돼요 — 더 이상 D+며칠로 남지 않아요'
  ]},
  { version: 'v1.14.1', notes: [
    '알림장 글자를 복사해서 학교종이 등에 붙여넣을 때 연한 배경색이 같이 따라오던 문제를 고쳤어요 — 이제 글자 꾸밈(굵게·기울임·밑줄·색깔)은 그대로 살고, 배경은 깔끔하게 빠져요',
    '전체화면 알림장에서 글자 크기 목록(10·20·30…)이 눌리지 않던 문제도 고쳤어요'
  ]},
  { version: 'v1.14.0', notes: [
    '알림장이 날짜별로 자동으로 차곡차곡 보관돼요 — 날짜가 바뀌면 전날 알림장이 저장돼요',
    '알림장 제목 옆 "📚 보관한 알림장" 버튼을 누르면 지난 알림장을 날짜별로 다시 볼 수 있어요',
    '보관된 알림장은 날짜 옆 HTML이나 TXT 버튼으로 파일로 내려받을 수 있어요',
    '지금 쓴 알림장을 바로 담고 싶을 땐 "💾 오늘 알림장 보관" 버튼을 눌러주세요'
  ]},
  { version: 'v1.13.3', notes: [
    '급식 메뉴 글자가 더 커졌어요 — 뒷자리에서도 메뉴가 잘 보여요'
  ]},
  { version: 'v1.13.2', notes: [
    '업데이트 소식 팝업의 내용이 길 때 확인 버튼이 잘리던 문제를 해결했어요 — 이제 본문만 스크롤되고 버튼은 항상 보여요'
  ]},
  { version: 'v1.13.1', notes: [
    '시간표 모드에서도 대표 디데이 칩이 보이도록 다듬었어요'
  ]},
  { version: 'v1.13.0', notes: [
    '디데이 탭이 새로 생겼어요 — 졸업식, 체험학습, 시험 같은 중요한 날까지 며칠 남았는지 한눈에 보여드려요',
    '카드의 별 버튼을 누르면 "대표 디데이"로 지정돼요 — 왼쪽 패널 위쪽에 항상 표시되어 매일 보여요',
    '설정 > 학사 일정에서 등록한 일정을 "+ 디데이" 버튼으로 한 번에 디데이로 가져올 수 있어요'
  ]},
  { version: 'v1.12.0', notes: [
    '수업 종료 알림음이 추가되었어요 — 수업이 끝나면 차임벨이 울려요',
    '시작 알림은 상승 멜로디(도-미-솔), 종료 알림은 하강 멜로디(솔-미-도)로 음이 달라요',
    '설정 > 표시 설정에서 시작/종료 알림을 각각 켜고 끌 수 있어요'
  ]},
  { version: 'v1.11.0', notes: [
    '학급 약속 글자 크기가 조금 커졌어요',
    '공지사항에서 글자 색깔을 바꿀 수 있어요 (빨강, 파랑, 초록, 노랑, 보라)',
    '쉬는시간 음성 알림을 개별적으로 켜고 끌 수 있어요',
    '화면 가운데 구분선을 드래그해서 좌우 패널 크기를 조절할 수 있어요',
    '알림장 페이지 탭을 길게 눌러 순서를 변경할 수 있어요'
  ]},
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
    id: '2026-07-23-01-break-activity',
    date: '2026-07-23',
    title: '우리 반 약속에 쉬는 시간 활동을 추가했어요',
    body: '우리 반 약속에서 아침 활동과 점심 활동뿐 아니라 쉬는 시간에 보여줄 내용도 따로 적어두고 싶다는 의견을 보내주셨습니다. 그래서 제목 옆 보기 버튼에 "쉬는 시간"을 추가했습니다.\n\n이제 약속, 아침 활동, 쉬는 시간, 점심 활동 순서로 바로 전환할 수 있습니다. 쉬는 시간에는 놀이 안내, 다음 수업 준비물, 교실에서 지킬 약속처럼 그때 필요한 내용을 적어두고 글자 크기, 색상, 볼드, 이탤릭, 밑줄 서식도 사용할 수 있어요.\n\n기존에 작성한 아침 활동과 점심 활동 내용은 그대로 유지되며, 쉬는 시간 내용은 별도로 저장됩니다. 실제 교실의 하루 흐름을 더 자연스럽게 이어갈 수 있는 좋은 의견을 보내주셔서 감사합니다!'
  },
  {
    id: '2026-07-15-01-assignment-check-redesign',
    date: '2026-07-15',
    title: '과제 확인을 더 빠르게 살펴볼 수 있게 다듬었어요',
    body: '학생별로 과제를 확인할 수 있는 기능이 필요하다는 의견을 반영해 과제 확인 화면을 만들었지만, 과제가 늘어나면 어떤 학생부터 살펴봐야 하는지 한눈에 들어오지 않을 수 있겠다는 고민이 있었습니다. 그래서 이번에는 실제 확인 흐름에 맞춰 화면을 다시 정리했습니다.\n\n왼쪽에서 오늘 확인할 과제를 고르면 오른쪽에 확인 전, 확인 완료, 전체 학생 수가 바로 보입니다. 과제 확인 창을 새로 열 때는 아직 확인하지 않은 학생부터 표시되며, 학생 이름을 누르면 확인 완료로 넘어갑니다. 확인 전 이름만 복사하거나 모두 확인할 수 있고, 끝난 과제는 보관함으로 옮겼다가 다시 진행 중으로 되돌릴 수도 있습니다. 학생 명단 관리는 필요할 때만 여는 별도 공간으로 분리해 평소 화면은 간결하게 유지했습니다.\n\n기존에 등록한 과제와 학생별 확인 상태는 그대로 이어집니다. 과제 확인 중 안내 메시지가 모달 뒤에 낀 것처럼 흐릿하게 보이던 문제도 함께 고쳤습니다. 실제 교실에서 사용해보시고 더 빠르게 확인할 수 있는 방법이 떠오르면 의견 보내기로 알려주세요!'
  },
  {
    id: '2026-07-08-01-notice-order-daily-periods',
    date: '2026-07-08',
    title: '공지 순서 변경과 6교시 표시 문제를 고쳤어요',
    body: '공지사항의 순서를 바꿀 수 있으면 좋겠다는 의견과, 월·화·목·금은 6교시 수업인데 5교시 뒤에 수업 끝으로 표시된다는 제보를 함께 반영했습니다.\n\n이제 공지사항 카드 왼쪽 손잡이를 끌어서 순서를 바꿀 수 있습니다. 또 요일별 교시 수를 6교시로 설정한 날에는 기본 시간표의 6교시 요일 체크가 예전 값으로 남아 있어도 6교시까지 현재 교시와 알림이 이어지도록 고쳤습니다.\n\n불편을 알려주셔서 감사합니다. 실제 교실에서 바로 티 나는 문제라 더 반갑게 고쳤습니다.'
  },
  {
    id: '2026-06-19-01-school-day-dday',
    date: '2026-06-19',
    title: '방학 디데이를 등교일 기준으로 볼 수 있어요',
    body: '방학까지 남은 날을 볼 때 주말이나 공휴일까지 함께 세면 실제 학교 나오는 날이 얼마나 남았는지 알기 어렵다는 의견을 보내주셨습니다. 그래서 디데이에 "등교일 기준" 옵션을 추가했습니다.\n\n디데이 추가할 때 "등교일 기준"을 켜면 주말은 자동으로 제외되고, D-25처럼 짧게 표시됩니다. 0일이 남았을 때는 기존처럼 D-DAY로 보여요. 설정에서 학교를 선택해둔 경우에는 나이스 학사일정을 함께 확인해서 공휴일, 휴업일, 방학처럼 학교에 나오지 않는 날도 계산에서 빼도록 했습니다.\n\n이미 만든 디데이도 카드 안의 "등교일 기준" 체크를 켜거나 끄면 바로 바뀝니다. 좋은 의견 감사합니다. 방학을 기다리는 마음은 달력보다 등교일로 세는 쪽이 훨씬 정직하죠.'
  },
  {
    id: '2026-06-16-02-quick-timetable',
    date: '2026-06-16',
    title: '오늘 시간표를 화면에서 바로 바꿀 수 있어요',
    body: '시간표가 그날그날 바뀔 때마다 설정에 들어가 수정해야 해서 번거롭다는 의견을 보내주셨습니다. 그래서 시간표 화면에 "오늘 시간표" 버튼을 추가했습니다.\n\n기본 시간표는 설정에 그대로 두고, 오늘만 바뀐 시간표를 화면에서 바로 수정할 수 있습니다. 수정 내용은 오늘 날짜 전용 시간표로 저장되며, "오늘 변경 삭제"를 누르면 다시 기본 시간표로 돌아갑니다.\n\n추가로 시간표 모드에서 대표 디데이가 있을 때와 없을 때 화면 배치가 달라 보이던 부분도 함께 정리했습니다. 대표 디데이 유무와 관계없이 시계와 시간표 위치가 덜 흔들리도록 맞췄습니다.\n\n좋은 의견 보내주셔서 감사합니다. 실제 교실에서 자주 일어나는 흐름이라 바로 반영할 만한 개선이었습니다.'
  },
  {
    id: '2026-06-16-01-notice-persistence',
    date: '2026-06-16',
    title: '공지사항은 매일 사라지지 않아요',
    body: '공지사항 탭에 적어둔 내용이 다음 날이 되면 사라지는지 문의를 주셨어요. 확인해보니 공지사항은 날짜가 바뀌어도 자동으로 초기화되지 않고, 직접 삭제하거나 브라우저 저장 데이터를 지우지 않는 한 계속 남아 있습니다.\n\n전날 다음 날 공지사항을 미리 적어두는 용도로 사용하셔도 괜찮습니다. 다만 저장은 사용 중인 기기와 브라우저 안에 따로 보관되는 방식이라, 다른 컴퓨터나 다른 브라우저에서는 같은 내용이 바로 보이지 않을 수 있어요. 시크릿 모드나 브라우저 데이터 삭제를 사용한 경우에도 저장 내용이 사라질 수 있습니다.\n\n알림장은 날짜가 바뀌면 보관함에 자동 저장되는 기능이 있지만, 공지사항 탭에는 그런 날짜별 초기화 기능이 적용되어 있지 않습니다. 헷갈릴 수 있는 부분이라 문의해주셔서 감사합니다.'
  },
  {
    id: '2026-06-09-02-voice-message-feedback',
    date: '2026-06-09',
    title: '쉬는시간 음성 안내 문구를 다듬었어요',
    body: '쉬는시간 3분 전과 1분 전 안내 음성을 조금 더 부드러운 문장으로 바꿨습니다.\n\n3분 전에는 "쉬는 시간이 곧 끝나요. 하던 일을 정리하고 수업 준비를 시작해 주세요.", 1분 전에는 "이제 자리로 돌아와 수업 준비를 마쳐 주세요."라고 안내됩니다. 3분 전에는 정리 시작, 1분 전에는 자리 복귀와 준비 마무리로 역할이 나뉘도록 했어요.\n\n혹시 실제 교실에서 듣기에 더 자연스럽거나 효과적인 문구가 있다면 "의견 보내기"로 알려주세요. 선생님들이 쓰시는 말투와 교실 분위기에 더 잘 맞게 계속 다듬어보겠습니다.'
  },
  {
    id: '2026-06-09-01-dday-auto-cleanup',
    date: '2026-06-09',
    title: '지난 디데이는 자동으로 정리돼요',
    body: '디데이를 지정하면 화면에 표시되는데, 날짜가 지난 뒤에도 D+며칠처럼 남아 있어 사라졌으면 좋겠다는 의견을 보내주셨습니다. 그래서 이제 디데이 날짜가 지나면 다음 날 자동으로 목록에서 삭제되도록 개선했습니다.\n\nD-day 당일에는 그대로 보이고, 그 다음 날부터는 목록과 대표 디데이 표시에서 자동으로 사라집니다. 대표 디데이로 지정한 항목이 삭제되면 대표 표시도 함께 정리됩니다.\n\n의견 보내주신 선생님께 감사드립니다. 실제 사용 중 불편했던 부분을 알려주셔서 더 자연스럽게 다듬을 수 있었습니다.'
  },
  {
    id: '2026-05-30-02-notebook-copy-clean',
    date: '2026-05-30',
    title: '알림장을 복사하면 배경색이 따라오던 문제를 고쳤어요',
    body: '전체화면으로 알림장을 쓴 뒤 복사해서 학교종이에 붙여넣으면 연한 베이지색 배경이 같이 따라온다고 알려주신 선생님, 감사합니다! 알림장이 종이 느낌의 배경 위에 놓여 있다 보니, 글자를 복사할 때 그 배경색까지 함께 복사되던 것이 원인이었어요.\n\n이제 알림장 안에서 글자를 복사(또는 잘라내기)하면 굵게·기울임·밑줄·글자색 같은 꾸밈은 그대로 유지하면서 배경색만 쏙 빠지도록 했어요. 학교종이에 붙여넣으면 깔끔하게 글자만 들어갑니다. 불편 드려 죄송했고, 앞으로도 이상한 점 있으면 언제든 의견 보내주세요!'
  },
  {
    id: '2026-05-30-01-notebook-archive',
    date: '2026-05-30',
    title: '알림장 보관함이 생겼어요 — 날짜별로 쌓이고 내려받을 수 있어요',
    body: '알림장을 저장하면 좋겠다고 의견 주신 선생님들, 그리고 "①·② 합쳐서 날짜별로 쫙 정리되고 클릭하면 내려받게 해달라"는 구체적인 그림을 보내주신 선생님께 감사드려요. 말씀해주신 모습 그대로 만들었습니다!\n\n이제 날짜가 바뀌면 전날 알림장이 자동으로 차곡차곡 보관돼요. 알림장 제목 옆의 📚 보관한 알림장 버튼을 누르면 지난 날짜들이 쭉 정리되어 있고, 각 날짜 옆의 HTML / TXT 버튼으로 그날 알림장을 파일로 내려받을 수 있어요. 지금 쓴 내용을 바로 담고 싶으면 💾 오늘 알림장 보관 버튼을 누르시면 됩니다.\n\n스프레드시트 연동은 말씀처럼 로그인 연동이 번거롭고 충돌 위험도 있어서, 우선 가볍고 안전한 파일 내려받기 방식으로 준비했어요. 써보시고 불편한 점이나 더 있으면 좋겠는 기능은 언제든 의견 보내주세요!'
  },
  {
    id: '2026-05-23-01-notebook-save',
    date: '2026-05-23',
    title: '알림장 저장 기능, 어떤 모습이 좋을까요?',
    body: '알림장 내용을 저장할 수 있게 해달라는 의견을 보내주셨어요. 구체적으로는 "저장하는 스프레드시트를 연결할 수는 없을까요?"라고 적어주셨고요. 좋은 아이디어라서 바로 만들어보고 싶은데, 선생님이 그리시는 모습을 좀 더 알고 싶어요.\n\n제가 떠올린 세 가지 방향이 있어요. 어느 쪽이 가장 마음에 드시는지(혹은 다른 그림이 있으시다면) 의견 보내기로 알려주세요!\n\n① 날짜별로 알림장이 차곡차곡 쌓이는 형태\n매일 적은 알림장이 "11월 22일 알림장", "11월 23일 알림장"처럼 날짜별로 보관돼서, 나중에 달력에서 클릭하면 그날 알림장이 다시 보이는 모습이에요.\n\n② 알림장을 파일로 내려받는 형태\n"내보내기" 버튼을 누르면 알림장 모음이 엑셀 파일로 컴퓨터에 저장돼요. 학기말에 한 번에 정리하거나 백업해두기 좋아요.\n\n③ 구글 스프레드시트와 실시간 연결\n알림장을 적는 즉시 선생님의 구글 시트에 자동으로 기록돼요. 학부모님이나 다른 선생님과 시트를 공유할 수도 있고요. 다만 구글 로그인 연동이 필요해서 준비 시간이 가장 오래 걸려요.\n\n혹시 "사실 이런 이유로 저장이 필요했어요" 같은 배경을 함께 알려주시면 더 좋은 모습으로 만들 수 있을 것 같아요. 의견 기다릴게요!'
  },
  {
    id: '2026-05-06-01-class-end-chime',
    date: '2026-05-06',
    title: '수업 종료 알림음이 추가되었어요',
    body: '수업 시작 알림음만 있으니까 수업이 끝날 때도 알림이 울리면 좋겠다는 선생님의 요청이 있었습니다. 이에 따라 수업 종료 알림음을 추가했습니다.\n\n수업이 끝나고 쉬는 시간이나 점심시간으로 바뀌는 순간 하강 멜로디(솔-미-도)가 울립니다. 시작 알림음(상승, 도-미-솔)과 음의 방향이 반대라 귀로도 쉽게 구분돼요.\n\n설정 > 표시 설정에서 "수업 시작 알림음"과 "수업 종료 알림음"을 각각 켜고 끌 수 있습니다. 처음에는 두 알림 모두 켜진 상태입니다.'
  },
  {
    id: '2026-04-16-05-page-reorder',
    date: '2026-04-16',
    title: '알림장 페이지 순서를 바꿀 수 있어요',
    body: '알림장 페이지 탭의 순서를 변경할 수 있으면 좋겠다는 선생님의 요청이 있었습니다. 이에 따라 알림장 페이지 탭을 길게 누르면 드래그로 순서를 변경할 수 있도록 했습니다.\n\n탭을 0.5초 정도 길게 누른 뒤, 누른 채로 좌우로 옮기면 됩니다. 설정 > "알림장 여러 페이지 사용"이 켜져 있어야 합니다.'
  },
  {
    id: '2026-04-16-04-panel-resize',
    date: '2026-04-16',
    title: '좌우 화면 크기를 조절할 수 있어요',
    body: '왼쪽 시간 부분과 오른쪽 화면의 크기를 조절할 수 있으면 좋겠다는 선생님의 요청이 있었습니다. 이에 따라 화면 가운데 구분선을 마우스로 드래그하면 좌우 비율을 자유롭게 조절할 수 있도록 했습니다.\n\n구분선을 더블클릭하면 원래 비율(50:50)로 돌아가며, 설정한 비율은 자동 저장됩니다.'
  },
  {
    id: '2026-04-16-03-voice-options',
    date: '2026-04-16',
    title: '쉬는시간 알림을 개별 설정할 수 있어요',
    body: '쉬는 시간 알림을 1분 전만 받고 싶다는 선생님의 요청이 있었습니다. 이에 따라 설정 > 쉬는 시간 음성 안내 아래에 개별 체크박스를 추가했습니다.\n\n쉬는시간 3분 전, 1분 전, 점심시간 5분 전, 1분 전 알림을 각각 켜거나 끌 수 있습니다.'
  },
  {
    id: '2026-04-16-02-notice-color',
    date: '2026-04-16',
    title: '공지사항 글자에 색깔을 넣을 수 있어요',
    body: '공지사항 글자 색깔을 변경할 수 있으면 좋겠다는 선생님의 요청이 있었습니다. 이에 따라 공지사항 탭에 6가지 색상 버튼(검정, 빨강, 파랑, 초록, 노랑, 보라)을 추가했습니다.\n\n강조하고 싶은 부분을 드래그로 선택한 뒤 색상 버튼을 누르면 해당 부분의 글자색이 바뀝니다.'
  },
  {
    id: '2026-04-16-01-rules-font',
    date: '2026-04-16',
    title: '학급 약속 글자가 조금 커졌어요',
    body: '학급 약속 글자를 조금 더 크게 만들어달라는 선생님의 요청이 있었습니다. 이에 따라 학급 약속의 제목과 설명 글자 크기를 한 단계씩 키웠습니다.'
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
const PERIOD_LABEL_RE = /^(\d+)교시$/;
const RULES_PANEL_VIEWS = ['rules', 'morning', 'break', 'lunch'];
const FIXED_ACTIVITY_DEFAULTS = [
  { id: 'morning', title: '아침 활동', hint: '등교 후 바로 할 활동을 적어두세요.', subtitle: 'MORNING ACTIVITY', badge: 'AM' },
  { id: 'break', title: '쉬는 시간 활동', hint: '쉬는 시간에 할 활동이나 안내를 적어두세요.', subtitle: 'BREAK TIME', badge: 'BRK' },
  { id: 'lunch', title: '점심 시간 활동', hint: '점심 시간에 할 활동이나 안내를 적어두세요.', subtitle: 'LUNCH ACTIVITY', badge: 'PM' },
];

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
let settings = { showRemaining: true, chimeEnabled: true, chimeEndEnabled: true, colonBlink: true, showSeconds: true, timetableMode: false, startTab: 'last', dailyPeriods: { 1:5, 2:6, 3:5, 4:5, 5:5 }, morningSlotMigrated: false, schoolbellUrl: '', school: null, notebookMultiPageEnabled: false };
let viewData = { activeTab: 'rules', notebook: '', notebookPages: [], activeNotebookPageId: '', notebookArchive: {}, notebookArchiveDate: '', notices: [], academicEvents: [], selectedAcademicEventDate: '', ddays: [], featuredDdayId: '', rulesFontScale: 1, rulesPanelView: 'rules', activities: [], activeActivityId: 'morning', activityFontSize: 24, activityColor: '#2d2a26', assignmentStudents: [], assignments: [], assignmentActiveId: '', assignmentStatusFilter: 'pending', assignmentListView: 'active' };
let lastFeaturedDdayKey = '';
let lastPeriodLabel = null;
let lastPeriodType = null;
let lastChimeTime = 0;
let lastEndChimeTime = 0;
let lastTimetableMin = -1;
let audioCtx = null;
let notebookTimer = null;
let activityTimer = null;
let activitySavedRange = null;
let activityActiveEditorId = 'activityEditor';
let lastAcademicEventToastKey = '';
let specialTimetableDirty = false;
let quickTimetableDirty = false;
let quickTimetableDraft = [];
let quickTimetableDateKey = '';
let lastDdayPruneDateKey = '';
let lastDdayScheduleRequestKey = '';
let timerState = {
  duration: 300,
  remaining: 300,
  running: false,
  endsAt: 0,
  notified: false,
};

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

let noticeDrag = {
  active: false, cardEl: null, noticeId: '', index: -1, currentIndex: -1,
  startY: 0, cardRects: [], cardH: 0, cards: [],
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

function parseDateKey(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr || '')) return null;
  const parts = dateStr.split('-').map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dateKeyToYmd(dateKey) {
  return (dateKey || '').replace(/-/g, '');
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  next.setHours(0, 0, 0, 0);
  return next;
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

function getPeriodNumber(label) {
  const match = String(label || '').trim().match(PERIOD_LABEL_RE);
  return match ? parseInt(match[1], 10) : null;
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
    quickOnly: !!event?.quickOnly,
    timetableOverride: !!event?.timetableOverride,
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

  const sortedEntries = timetable
    .slice()
    .sort((a, b) => timeToMins(a.start) - timeToMins(b.start));

  let todayEntries = sortedEntries
    .filter(e => e.days.includes(day))
    .map(cloneEntry);

  const maxPeriods = settings.dailyPeriods ? settings.dailyPeriods[day] : null;
  if (maxPeriods) {
    const periodEntriesForDay = [];

    for (let periodNo = 1; periodNo <= maxPeriods; periodNo++) {
      const exactEntry = sortedEntries.find(entry => {
        return getPeriodNumber(entry.label) === periodNo && entry.days.includes(day);
      });
      const fallbackEntry = sortedEntries.find(entry => getPeriodNumber(entry.label) === periodNo);
      const entry = exactEntry || fallbackEntry;
      if (entry) periodEntriesForDay.push(cloneEntry(entry));
    }

    if (periodEntriesForDay.length) {
      const nonPeriodEntries = sortedEntries
        .filter(entry => !getPeriodNumber(entry.label) && entry.days.includes(day))
        .map(cloneEntry);
      todayEntries = nonPeriodEntries.concat(periodEntriesForDay)
        .sort((a, b) => timeToMins(a.start) - timeToMins(b.start));

      const lastPeriodEndMins = periodEntriesForDay.reduce((last, entry) => {
        return Math.max(last, timeToMins(entry.end));
      }, 0);
      todayEntries = todayEntries.filter(entry => {
        if (getPeriodNumber(entry.label)) return true;
        const start = timeToMins(entry.start);
        return start < lastPeriodEndMins;
      });
    }
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
      if (settings.chimeEndEnabled === undefined) settings.chimeEndEnabled = true;
      if (settings.colonBlink === undefined) settings.colonBlink = true;
      if (settings.showSeconds === undefined) settings.showSeconds = true;
      if (settings.timetableMode === undefined) settings.timetableMode = false;
      if (!['last', 'rules', 'notebook', 'notice', 'meal', 'dday'].includes(settings.startTab)) settings.startTab = 'last';
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
  if (viewData.activeTab === 'activities' || viewData.activeTab === 'assignments') {
    viewData.activeTab = 'rules';
  }
  if (!['rules', 'notebook', 'notice', 'meal', 'dday'].includes(viewData.activeTab)) {
    viewData.activeTab = 'rules';
  }
  if (!RULES_PANEL_VIEWS.includes(viewData.rulesPanelView)) {
    viewData.rulesPanelView = 'rules';
  }
  if (typeof viewData.rulesFontScale !== 'number' || Number.isNaN(viewData.rulesFontScale)) {
    viewData.rulesFontScale = 1;
  }
  viewData.rulesFontScale = Math.min(1.4, Math.max(0.85, viewData.rulesFontScale));
  if (typeof viewData.activityFontSize !== 'number' || Number.isNaN(viewData.activityFontSize)) {
    viewData.activityFontSize = 24;
  }
  viewData.activityFontSize = Math.max(12, Math.min(120, viewData.activityFontSize));
  if (typeof viewData.activityColor !== 'string' || !viewData.activityColor.trim()) {
    viewData.activityColor = '#2d2a26';
  }
  const savedActivities = Array.isArray(viewData.activities) ? viewData.activities : [];
  viewData.activities = FIXED_ACTIVITY_DEFAULTS.map(def => {
    const saved = savedActivities.find(item => item && item.id === def.id) || {};
    return {
      id: def.id,
      title: typeof saved.title === 'string' && saved.title.trim() ? saved.title.trim() : def.title,
      body: typeof saved.body === 'string' ? saved.body : '',
      importantBody: typeof saved.importantBody === 'string' ? saved.importantBody : '',
      importantVisible: saved.importantVisible === true || (typeof saved.importantBody === 'string' && saved.importantBody.trim() !== ''),
      hint: def.hint,
    };
  });
  if (!viewData.activeActivityId || !viewData.activities.some(activity => activity.id === viewData.activeActivityId)) {
    viewData.activeActivityId = viewData.activities[0].id;
  }
  if (!Array.isArray(viewData.assignmentStudents)) viewData.assignmentStudents = [];
  viewData.assignmentStudents = viewData.assignmentStudents
    .map(name => String(name || '').trim())
    .filter(Boolean);
  if (!Array.isArray(viewData.assignments)) viewData.assignments = [];
  viewData.assignments = viewData.assignments
    .filter(item => item && typeof item === 'object')
    .map((item, index) => {
      const submitted = {};
      if (item.submitted && typeof item.submitted === 'object' && !Array.isArray(item.submitted)) {
        Object.keys(item.submitted).forEach(name => {
          const key = String(name || '').trim();
          if (key) submitted[key] = !!item.submitted[name];
        });
      }
      return {
        id: typeof item.id === 'string' && item.id ? item.id : 'assignment-' + Date.now() + '-' + index,
        title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : '새 과제',
        date: typeof item.date === 'string' ? item.date : formatDateKey(new Date()),
        submitted,
        archived: item.archived === true,
      };
    });
  if (!['pending', 'completed', 'all'].includes(viewData.assignmentStatusFilter)) {
    viewData.assignmentStatusFilter = 'pending';
  }
  if (!['active', 'archived'].includes(viewData.assignmentListView)) {
    viewData.assignmentListView = 'active';
  }
  if (!viewData.assignments.some(item => item.id === viewData.assignmentActiveId)) {
    const firstVisibleAssignment = viewData.assignments.find(item => item.archived === (viewData.assignmentListView === 'archived'));
    viewData.assignmentActiveId = firstVisibleAssignment ? firstVisibleAssignment.id : '';
  }
  if (!Array.isArray(viewData.notices)) viewData.notices = [];
  viewData.notices = viewData.notices
    .filter(notice => notice && (typeof notice === 'object' || typeof notice === 'string'))
    .map(notice => {
      if (typeof notice === 'string') {
        return { id: generateNoticeId(), html: notice || '새 공지' };
      }
      return {
        id: (typeof notice.id === 'string' && notice.id) ? notice.id : generateNoticeId(),
        html: typeof notice.html === 'string'
          ? notice.html
          : (typeof notice.text === 'string' ? notice.text : '새 공지'),
      };
    });
  if (!Array.isArray(viewData.ddays)) viewData.ddays = [];
  viewData.ddays = viewData.ddays
    .filter(d => d && typeof d === 'object')
    .map(d => ({
      id: (typeof d.id === 'string' && d.id) ? d.id : generateDdayId(),
      title: typeof d.title === 'string' ? d.title.slice(0, 40) : '',
      date: (typeof d.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.date)) ? d.date : '',
      schoolDaysOnly: !!d.schoolDaysOnly,
    }))
    .filter(d => d.title && d.date);
  prunePastDdays(new Date(), { render: false, force: true });
  if (typeof viewData.featuredDdayId !== 'string') viewData.featuredDdayId = '';
  if (viewData.featuredDdayId && !viewData.ddays.some(d => d.id === viewData.featuredDdayId)) {
    viewData.featuredDdayId = '';
  }
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

  // 알림장 보관함(날짜별 누적) 정규화 — 잘못된 키/구조는 버립니다.
  if (!viewData.notebookArchive || typeof viewData.notebookArchive !== 'object' || Array.isArray(viewData.notebookArchive)) {
    viewData.notebookArchive = {};
  }
  const cleanArchive = {};
  Object.keys(viewData.notebookArchive).forEach(function(key) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
    const e = viewData.notebookArchive[key];
    if (!e || typeof e !== 'object') return;
    let pages = Array.isArray(e.pages) ? e.pages : [];
    pages = pages
      .filter(p => p && typeof p === 'object')
      .map(p => ({
        title: (typeof p.title === 'string' && p.title.trim()) ? p.title : '알림장',
        content: typeof p.content === 'string' ? p.content : '',
      }));
    if (pages.length === 0) return;
    cleanArchive[key] = {
      date: key,
      savedAt: typeof e.savedAt === 'number' ? e.savedAt : Date.now(),
      pages: pages,
    };
  });
  viewData.notebookArchive = cleanArchive;
  if (typeof viewData.notebookArchiveDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(viewData.notebookArchiveDate)) {
    viewData.notebookArchiveDate = '';
  }
}

function generateNotebookPageId() {
  return 'np_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function generateDdayId() {
  return 'dd_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function generateNoticeId() {
  return 'nt_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function prunePastDdays(now, options) {
  if (!Array.isArray(viewData.ddays)) viewData.ddays = [];
  const todayKey = formatDateKey(now || new Date());
  const force = !!(options && options.force);
  if (!force && lastDdayPruneDateKey === todayKey) return false;
  lastDdayPruneDateKey = todayKey;

  const beforeCount = viewData.ddays.length;
  const featuredBefore = viewData.featuredDdayId || '';
  viewData.ddays = viewData.ddays.filter(d => d.date >= todayKey);
  if (featuredBefore && !viewData.ddays.some(d => d.id === featuredBefore)) {
    viewData.featuredDdayId = '';
    lastFeaturedDdayKey = '';
  }

  if (viewData.ddays.length === beforeCount) return false;
  saveViewData();
  if (!options || options.render !== false) {
    renderDdays();
    updateFeaturedDday();
  }
  return true;
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

function getRulesFontScale() {
  return Math.min(1.4, Math.max(0.85, Number(viewData.rulesFontScale) || 1));
}

function applyRulesFontScale() {
  const scale = getRulesFontScale();
  viewData.rulesFontScale = scale;
  const container = document.getElementById('rulesContainer');
  if (container) {
    container.style.setProperty('--rule-number-size', (2.6 * scale).toFixed(2) + 'rem');
    container.style.setProperty('--rule-title-size', (1.85 * scale).toFixed(2) + 'rem');
    container.style.setProperty('--rule-desc-size', (1.25 * scale).toFixed(2) + 'rem');
  }
  const label = document.getElementById('rulesFontSizeLabel');
  if (label) label.textContent = Math.round(scale * 100) + '%';
}

function setRulesFontScale(scale) {
  viewData.rulesFontScale = Math.min(1.4, Math.max(0.85, Number(scale) || 1));
  saveViewData();
  applyRulesFontScale();
}

function changeRulesFontScale(delta) {
  setRulesFontScale(getRulesFontScale() + delta);
}

// =============================================
// RENDER RULES
// =============================================
function renderRules() {
  const container = document.getElementById('rulesContainer');
  container.innerHTML = '';
  document.getElementById('rightPanel').classList.toggle('edit-mode', isEditing);
  applyRulesFontScale();

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
  applyRulesView();
}

// =============================================
// FIXED ACTIVITIES
// =============================================
function setRulesEditing(enabled) {
  isEditing = !!enabled;
  const btn = document.getElementById('editToggle');
  if (btn) {
    btn.textContent = isEditing ? '완료' : '편집';
    btn.classList.toggle('active', isEditing);
  }
  document.getElementById('rightPanel')?.classList.toggle('edit-mode', isEditing);
}

function getRulesPanelView() {
  return RULES_PANEL_VIEWS.includes(viewData.rulesPanelView) ? viewData.rulesPanelView : 'rules';
}

function getActivityById(id) {
  return (viewData.activities || []).find(activity => activity.id === id) || null;
}

function getActivityDefaults(id) {
  return FIXED_ACTIVITY_DEFAULTS.find(activity => activity.id === id) || FIXED_ACTIVITY_DEFAULTS[0];
}

function applyRulesView() {
  const view = getRulesPanelView();
  const isRulesView = view === 'rules';

  if (!isRulesView && isEditing) {
    setRulesEditing(false);
  }

  document.querySelectorAll('.rules-view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.rulesView === view);
  });

  const subtitle = document.getElementById('rulesSubtitle');
  if (subtitle) {
    subtitle.textContent = isRulesView ? 'CLASS RULES' : getActivityDefaults(view).subtitle;
  }

  const editBtn = document.getElementById('editToggle');
  if (editBtn) editBtn.style.display = isRulesView ? '' : 'none';
  const listView = document.getElementById('rulesListView');
  if (listView) listView.style.display = isRulesView ? '' : 'none';
  const activityView = document.getElementById('rulesActivityView');
  if (activityView) activityView.style.display = isRulesView ? 'none' : '';

  if (isRulesView) {
    applyRulesFontScale();
  } else {
    viewData.activeActivityId = view;
    renderActivities();
  }
}

function switchRulesView(view) {
  if (!RULES_PANEL_VIEWS.includes(view)) return;
  viewData.rulesPanelView = view;
  if (view !== 'rules') viewData.activeActivityId = view;
  saveViewData();
  applyRulesView();
}

function getActiveActivity() {
  const activities = viewData.activities || [];
  return activities.find(item => item.id === viewData.activeActivityId) || activities[0] || null;
}

function getActiveActivityEditor() {
  return document.getElementById(activityActiveEditorId) || document.getElementById('activityEditor');
}

function saveActivitySelection() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const node = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
  const editor = node?.closest?.('#activityEditor, #activityImportantEditor');
  if (editor) {
    activityActiveEditorId = editor.id;
    activitySavedRange = range.cloneRange();
  }
}

function restoreActivitySelection() {
  const editor = getActiveActivityEditor();
  if (!editor) return;
  editor.focus();
  if (!activitySavedRange) return;
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(activitySavedRange);
}

function bindActivityToolbarGuards() {
  document.querySelectorAll('.activity-toolbar button, #activityPalette .notebook-palette-color').forEach(function(el) {
    if (el.dataset.activityGuarded) return;
    el.dataset.activityGuarded = '1';
    el.addEventListener('mousedown', function(e) {
      e.preventDefault();
      saveActivitySelection();
    });
  });
}

function onActivityInput(event) {
  const activity = getActiveActivity();
  const editor = event?.currentTarget || getActiveActivityEditor();
  if (!activity || !editor) return;
  activityActiveEditorId = editor.id;
  if (editor.id === 'activityImportantEditor') {
    activity.importantBody = sanitizeNotebookHTML(editor.innerHTML);
  } else {
    activity.body = sanitizeNotebookHTML(editor.innerHTML);
  }
  saveActivitySelection();
  clearTimeout(activityTimer);
  activityTimer = setTimeout(function() {
    saveViewData();
  }, 350);
}

function applyActivityFontSize() {
  const size = Math.max(12, Math.min(120, Number(viewData.activityFontSize) || 24));
  viewData.activityFontSize = size;
  document.querySelectorAll('.activity-editor, .activity-important-editor').forEach(function(editor) {
    editor.style.fontSize = size + 'px';
  });
  const input = document.getElementById('activityFontSizeInput');
  if (input) input.value = size;
}

function changeActivityFontSize(delta) {
  setActivityFontSize((Number(viewData.activityFontSize) || 24) + delta);
}

function setActivityFontSize(val) {
  const size = Math.max(12, Math.min(120, parseInt(val, 10) || 24));
  viewData.activityFontSize = size;
  saveViewData();
  applyActivityFontSize();
  document.getElementById('activityFontSizeDropdown')?.classList.remove('open');
}

function buildActivitySizeDropdown() {
  const container = document.getElementById('activityFontSizeDropdown');
  if (!container || container.children.length > 0) return;
  NOTEBOOK_SIZE_PRESETS.forEach(function(size) {
    const btn = document.createElement('button');
    btn.className = 'notebook-fontsize-option';
    btn.textContent = size;
    btn.setAttribute('data-size', size);
    btn.onclick = function(e) {
      e.stopPropagation();
      setActivityFontSize(size);
    };
    container.appendChild(btn);
  });
}

function toggleActivitySizeDropdown() {
  const dropdown = document.getElementById('activityFontSizeDropdown');
  if (!dropdown) return;
  buildActivitySizeDropdown();
  const current = Number(viewData.activityFontSize) || 24;
  dropdown.querySelectorAll('.notebook-fontsize-option').forEach(function(btn) {
    btn.classList.toggle('active', parseInt(btn.getAttribute('data-size'), 10) === current);
  });
  dropdown.classList.toggle('open');
}

function buildActivityPalette() {
  const container = document.getElementById('activityPalette');
  if (!container || container.children.length > 0) return;
  NOTEBOOK_COLORS.forEach(function(color) {
    const dot = document.createElement('span');
    dot.className = 'notebook-palette-color';
    dot.style.background = color;
    if (color === '#ffffff') dot.style.border = '2px solid rgba(0,0,0,0.15)';
    dot.setAttribute('data-color', color);
    dot.onmousedown = function(e) {
      e.preventDefault();
      saveActivitySelection();
    };
    dot.onclick = function() { pickActivityColor(color); };
    container.appendChild(dot);
  });
}

function applyActivityColorSwatch() {
  const color = viewData.activityColor || '#2d2a26';
  const swatch = document.getElementById('activityColorSwatch');
  if (swatch) swatch.style.background = color;
  document.querySelectorAll('#activityPalette .notebook-palette-color').forEach(function(dot) {
    dot.classList.toggle('active', dot.getAttribute('data-color') === color);
  });
}

function toggleActivityPalette() {
  const palette = document.getElementById('activityPalette');
  if (!palette) return;
  buildActivityPalette();
  applyActivityColorSwatch();
  palette.classList.toggle('open');
}

function pickActivityColor(color) {
  viewData.activityColor = color;
  saveViewData();
  document.getElementById('activityPalette')?.classList.remove('open');
  restoreActivitySelection();
  document.execCommand('foreColor', false, color);
  applyActivityColorSwatch();
  saveActivitySelection();
  syncActivityFromActive();
}

function toggleActivityStyle(style) {
  restoreActivitySelection();
  if (style === 'bold') document.execCommand('bold');
  else if (style === 'italic') document.execCommand('italic');
  else if (style === 'underline') document.execCommand('underline');
  saveActivitySelection();
  syncActivityFromActive();
}

function syncActivityFromActive() {
  const editor = getActiveActivityEditor();
  if (!editor) return;
  onActivityInput({ currentTarget: editor });
}

function applyActivityToolbarState() {
  applyActivityFontSize();
  applyActivityColorSwatch();
  bindActivityToolbarGuards();
}

function renderActivities() {
  const container = document.getElementById('activityContainer');
  if (!container) return;
  container.innerHTML = '';

  const activities = viewData.activities || [];
  if (!activities.length) return;
  if (!activities.some(activity => activity.id === viewData.activeActivityId)) {
    viewData.activeActivityId = activities[0].id;
  }

  const activity = activities.find(item => item.id === viewData.activeActivityId) || activities[0];
  applyActivityToolbarState();

  const card = document.createElement('div');
  card.className = 'activity-card';

  const header = document.createElement('div');
  header.className = 'activity-card-header';

  const badge = document.createElement('div');
  badge.className = 'activity-badge';
  badge.textContent = getActivityDefaults(activity.id).badge;

  const title = document.createElement('input');
  title.type = 'text';
  title.className = 'activity-title-input';
  title.value = activity.title || '';
  title.addEventListener('input', () => {
    activity.title = title.value.trim() || getActivityDefaults(activity.id).title;
    saveViewData();
  });

  const clearBtn = document.createElement('button');
  clearBtn.className = 'activity-clear-btn';
  clearBtn.type = 'button';
  clearBtn.textContent = '비우기';
  clearBtn.setAttribute('aria-label', (activity.title || '활동') + ' 일반 메모 비우기');
  clearBtn.onclick = () => {
    activity.body = '';
    saveViewData();
    renderActivities();
  };

  const importantBtn = document.createElement('button');
  importantBtn.className = 'activity-important-add-btn' + (activity.importantVisible ? ' active' : '');
  importantBtn.type = 'button';
  importantBtn.textContent = '+ 중요 메모';
  importantBtn.title = activity.importantVisible ? '중요 메모로 이동' : '하단에 중요 일정·내용 메모 추가';
  importantBtn.setAttribute('aria-label', importantBtn.title);
  importantBtn.setAttribute('aria-pressed', activity.importantVisible ? 'true' : 'false');
  importantBtn.onclick = () => {
    if (!activity.importantVisible) {
      activity.importantVisible = true;
      saveViewData();
      renderActivities();
    }
    activityActiveEditorId = 'activityImportantEditor';
    requestAnimationFrame(() => document.getElementById('activityImportantEditor')?.focus());
  };

  const actions = document.createElement('div');
  actions.className = 'activity-card-actions';
  actions.appendChild(importantBtn);
  actions.appendChild(clearBtn);

  header.appendChild(badge);
  header.appendChild(title);
  header.appendChild(actions);

  const body = document.createElement('div');
  body.id = 'activityEditor';
  body.className = 'activity-editor';
  body.contentEditable = 'true';
  body.spellcheck = false;
  body.setAttribute('aria-label', (activity.title || '활동') + ' 일반 메모');
  body.dataset.placeholder = activity.hint || '활동 내용을 적어두세요.';
  body.innerHTML = sanitizeNotebookHTML(activity.body || '');
  body.addEventListener('input', onActivityInput);
  body.addEventListener('keyup', saveActivitySelection);
  body.addEventListener('mouseup', saveActivitySelection);
  body.addEventListener('focus', saveActivitySelection);

  card.appendChild(header);
  card.appendChild(body);

  if (activity.importantVisible) {
    const importantPanel = document.createElement('section');
    importantPanel.className = 'activity-important-panel';
    importantPanel.setAttribute('aria-label', '중요 일정과 내용');

    const importantHeader = document.createElement('div');
    importantHeader.className = 'activity-important-panel-header';

    const importantLabel = document.createElement('div');
    importantLabel.className = 'activity-important-label';
    importantLabel.textContent = '★ 중요 일정 · 내용';

    const removeImportantBtn = document.createElement('button');
    removeImportantBtn.className = 'activity-important-remove-btn';
    removeImportantBtn.type = 'button';
    removeImportantBtn.textContent = '영역 삭제';
    removeImportantBtn.setAttribute('aria-label', '중요 메모 영역 삭제');
    removeImportantBtn.onclick = () => {
      const hasContent = String(activity.importantBody || '').replace(/<[^>]*>/g, '').trim() !== '';
      if (hasContent && !confirm('중요 메모의 내용과 영역을 함께 삭제할까요?')) return;
      activity.importantBody = '';
      activity.importantVisible = false;
      activityActiveEditorId = 'activityEditor';
      saveViewData();
      renderActivities();
    };

    const importantEditor = document.createElement('div');
    importantEditor.id = 'activityImportantEditor';
    importantEditor.className = 'activity-important-editor';
    importantEditor.contentEditable = 'true';
    importantEditor.spellcheck = false;
    importantEditor.setAttribute('aria-label', (activity.title || '활동') + ' 중요 메모');
    importantEditor.dataset.placeholder = '예: 10시 소방훈련 · 수학 단원평가 · 고요한 책 읽기';
    importantEditor.innerHTML = sanitizeNotebookHTML(activity.importantBody || '');
    importantEditor.addEventListener('input', onActivityInput);
    importantEditor.addEventListener('keyup', saveActivitySelection);
    importantEditor.addEventListener('mouseup', saveActivitySelection);
    importantEditor.addEventListener('focus', saveActivitySelection);

    importantHeader.appendChild(importantLabel);
    importantHeader.appendChild(removeImportantBtn);
    importantPanel.appendChild(importantHeader);
    importantPanel.appendChild(importantEditor);
    card.appendChild(importantPanel);
  }

  container.appendChild(card);
  activitySavedRange = null;
  activityActiveEditorId = 'activityEditor';
  applyActivityFontSize();
  bindActivityToolbarGuards();
}

// =============================================
// ASSIGNMENTS
// =============================================
function uniqueNames(names) {
  const seen = new Set();
  return names
    .map(name => String(name || '').trim())
    .filter(name => {
      if (!name || seen.has(name)) return false;
      seen.add(name);
      return true;
    });
}

function renderAssignments() {
  const input = document.getElementById('assignmentStudentInput');
  if (input) input.value = (viewData.assignmentStudents || []).join('\n');
  renderAssignmentStudentCount();
  renderAssignmentWorkspace();
}

function renderAssignmentStudentCount() {
  const count = document.getElementById('assignmentStudentCount');
  if (count) count.textContent = (viewData.assignmentStudents || []).length + '명';
}

function onAssignmentStudentsInput() {
  const input = document.getElementById('assignmentStudentInput');
  viewData.assignmentStudents = uniqueNames((input ? input.value : '').split('\n'));
  saveViewData();
  renderAssignmentStudentCount();
  renderAssignmentWorkspace();
}

function importRandomStudentsToAssignments() {
  let names = [];
  try {
    names = JSON.parse(localStorage.getItem('classroomRandomStudents') || '[]');
  } catch { names = []; }
  names = uniqueNames(names);
  if (!names.length) {
    showToast('랜덤 뽑기 학생 명단이 비어 있어요');
    return;
  }
  viewData.assignmentStudents = names;
  saveViewData();
  renderAssignments();
  showToast('학생 명단을 불러왔어요');
}

function getAssignmentById(id) {
  return (viewData.assignments || []).find(assignment => assignment.id === id) || null;
}

function getVisibleAssignments() {
  const showArchived = viewData.assignmentListView === 'archived';
  return (viewData.assignments || []).filter(assignment => assignment.archived === showArchived);
}

function ensureAssignmentSelection() {
  const visibleAssignments = getVisibleAssignments();
  const selected = getAssignmentById(viewData.assignmentActiveId);
  if (!selected || selected.archived !== (viewData.assignmentListView === 'archived')) {
    viewData.assignmentActiveId = visibleAssignments.length ? visibleAssignments[0].id : '';
  }
  return getAssignmentById(viewData.assignmentActiveId);
}

function setAssignmentListView(view) {
  if (!['active', 'archived'].includes(view)) return;
  viewData.assignmentListView = view;
  viewData.assignmentActiveId = '';
  ensureAssignmentSelection();
  saveViewData();
  renderAssignmentWorkspace();
}

function selectAssignment(id) {
  const assignment = getAssignmentById(id);
  if (!assignment) return;
  viewData.assignmentActiveId = assignment.id;
  viewData.assignmentListView = assignment.archived ? 'archived' : 'active';
  saveViewData();
  renderAssignmentWorkspace();
}

function setAssignmentStatusFilter(filter) {
  if (!['pending', 'completed', 'all'].includes(filter)) return;
  viewData.assignmentStatusFilter = filter;
  saveViewData();
  renderAssignmentDetail();
}

function addAssignmentFromInput() {
  const input = document.getElementById('assignmentTitleInput');
  const title = (input ? input.value : '').trim();
  if (!title) {
    showToast('과제 이름을 입력해주세요');
    return;
  }
  const newAssignment = {
    id: 'assignment-' + Date.now(),
    title,
    date: formatDateKey(new Date()),
    submitted: {},
    archived: false,
  };
  viewData.assignments.unshift(newAssignment);
  viewData.assignmentActiveId = newAssignment.id;
  viewData.assignmentListView = 'active';
  viewData.assignmentStatusFilter = 'pending';
  if (input) input.value = '';
  saveViewData();
  renderAssignmentWorkspace();
  showToast('과제를 추가했어요');
}

function updateAssignmentTitle(id, value) {
  const item = (viewData.assignments || []).find(assignment => assignment.id === id);
  if (!item) return '';
  item.title = value.trim() || '새 과제';
  saveViewData();
  return item.title;
}

function toggleAssignmentSubmission(id, studentName, checked) {
  const item = (viewData.assignments || []).find(assignment => assignment.id === id);
  if (!item) return;
  if (!item.submitted || typeof item.submitted !== 'object') item.submitted = {};
  item.submitted[studentName] = !!checked;
  saveViewData();
  renderAssignmentWorkspace();
}

function clearAssignmentSubmission(id) {
  const item = (viewData.assignments || []).find(assignment => assignment.id === id);
  if (!item) return;
  const checkedCount = Object.values(item.submitted || {}).filter(Boolean).length;
  if (checkedCount && !confirm('“' + item.title + '” 과제의 확인 상태를 모두 초기화할까요?')) return;
  item.submitted = {};
  saveViewData();
  renderAssignmentWorkspace();
  showToast('확인 상태를 초기화했어요');
}

function completeAssignmentForAll(id) {
  const item = getAssignmentById(id);
  if (!item) return;
  if (!item.submitted || typeof item.submitted !== 'object') item.submitted = {};
  (viewData.assignmentStudents || []).forEach(name => {
    item.submitted[name] = true;
  });
  saveViewData();
  renderAssignmentWorkspace();
  showToast('모든 학생을 확인 완료로 표시했어요');
}

function toggleAssignmentArchive(id) {
  const item = getAssignmentById(id);
  if (!item) return;
  const students = viewData.assignmentStudents || [];
  const pendingCount = students.filter(name => !(item.submitted || {})[name]).length;
  if (!item.archived && pendingCount && !confirm('아직 확인 전인 학생이 ' + pendingCount + '명 있어요. 그래도 “' + item.title + '” 과제를 보관할까요?')) return;
  const willArchive = !item.archived;
  item.archived = willArchive;
  viewData.assignmentActiveId = '';
  ensureAssignmentSelection();
  saveViewData();
  renderAssignmentWorkspace();
  showToast(willArchive ? '과제를 보관함으로 옮겼어요' : '과제를 진행 중으로 되돌렸어요');
}

function deleteAssignment(id) {
  const item = (viewData.assignments || []).find(assignment => assignment.id === id);
  if (!item || !confirm('“' + item.title + '” 과제를 삭제할까요?')) return;
  viewData.assignments = (viewData.assignments || []).filter(assignment => assignment.id !== id);
  if (viewData.assignmentActiveId === id) viewData.assignmentActiveId = '';
  ensureAssignmentSelection();
  saveViewData();
  renderAssignmentWorkspace();
  showToast('과제가 삭제되었어요');
}

function copyPendingAssignmentStudents(id) {
  const item = getAssignmentById(id);
  if (!item) return;
  const pending = (viewData.assignmentStudents || []).filter(name => !(item.submitted || {})[name]);
  if (!pending.length) {
    showToast('확인 전인 학생이 없어요');
    return;
  }
  const text = pending.join(', ');
  const finish = copied => showToast(copied ? '확인 전 학생 이름을 복사했어요' : '이름 복사에 실패했어요');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => finish(true)).catch(() => finish(execCommandCopy(text)));
  } else {
    finish(execCommandCopy(text));
  }
}

function formatAssignmentDateLabel(date) {
  const parts = String(date || '').split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return '';
  return parts[1] + '월 ' + parts[2] + '일';
}

function appendAssignmentEmpty(container, title, description, actionLabel, action) {
  const empty = document.createElement('div');
  empty.className = 'assignment-empty';
  const icon = document.createElement('div');
  icon.className = 'assignment-empty-icon';
  icon.textContent = '✓';
  const heading = document.createElement('strong');
  heading.textContent = title;
  const copy = document.createElement('span');
  copy.textContent = description;
  empty.appendChild(icon);
  empty.appendChild(heading);
  empty.appendChild(copy);
  if (actionLabel && action) {
    const button = document.createElement('button');
    button.className = 'assignment-empty-action';
    button.textContent = actionLabel;
    button.onclick = action;
    empty.appendChild(button);
  }
  container.appendChild(empty);
}

function renderAssignmentWorkspace() {
  ensureAssignmentSelection();
  renderAssignmentList();
  renderAssignmentDetail();
}

function renderAssignmentList() {
  const container = document.getElementById('assignmentList');
  if (!container) return;
  container.innerHTML = '';

  const students = viewData.assignmentStudents || [];
  const assignments = getVisibleAssignments();
  const count = document.getElementById('assignmentListCount');
  if (count) count.textContent = assignments.length + '개';

  const activeTab = document.getElementById('assignmentActiveTab');
  const archivedTab = document.getElementById('assignmentArchivedTab');
  [activeTab, archivedTab].forEach((tab, index) => {
    if (!tab) return;
    const selected = (index === 0 && viewData.assignmentListView === 'active') || (index === 1 && viewData.assignmentListView === 'archived');
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    tab.tabIndex = selected ? 0 : -1;
  });

  if (!assignments.length) {
    appendAssignmentEmpty(
      container,
      viewData.assignmentListView === 'archived' ? '보관한 과제가 없어요' : '진행 중인 과제가 없어요',
      viewData.assignmentListView === 'archived' ? '완료한 과제를 보관하면 이곳에 모입니다.' : '위에서 오늘 확인할 과제를 추가해보세요.'
    );
    return;
  }

  assignments.forEach(assignment => {
    const submitted = assignment.submitted || {};
    const submittedCount = students.filter(name => submitted[name]).length;
    const pendingCount = Math.max(0, students.length - submittedCount);
    const button = document.createElement('button');
    const selected = assignment.id === viewData.assignmentActiveId;
    button.className = 'assignment-list-item' + (selected ? ' selected' : '');
    button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    button.onclick = () => selectAssignment(assignment.id);

    const top = document.createElement('span');
    top.className = 'assignment-list-item-top';
    const title = document.createElement('strong');
    title.textContent = assignment.title;
    const date = document.createElement('small');
    date.textContent = formatAssignmentDateLabel(assignment.date);
    top.appendChild(title);
    top.appendChild(date);

    const meta = document.createElement('span');
    meta.className = 'assignment-list-item-meta';
    meta.textContent = students.length && pendingCount === 0 ? '모두 확인 완료' : '확인 전 ' + pendingCount + '명';

    const progress = document.createElement('span');
    progress.className = 'assignment-list-progress';
    const progressBar = document.createElement('i');
    progressBar.style.width = (students.length ? Math.round((submittedCount / students.length) * 100) : 0) + '%';
    progress.appendChild(progressBar);

    button.appendChild(top);
    button.appendChild(meta);
    button.appendChild(progress);
    container.appendChild(button);
  });
}

function renderAssignmentDetail() {
  const container = document.getElementById('assignmentDetail');
  if (!container) return;
  container.innerHTML = '';

  const assignment = ensureAssignmentSelection();
  if (!assignment) {
    appendAssignmentEmpty(
      container,
      viewData.assignmentListView === 'archived' ? '보관된 과제를 선택하세요' : '오늘 확인할 과제를 만들어보세요',
      viewData.assignmentListView === 'archived' ? '보관함에 과제가 생기면 여기에서 다시 열어볼 수 있어요.' : '왼쪽 위에 과제 이름을 입력하면 바로 시작할 수 있어요.'
    );
    return;
  }

  const students = viewData.assignmentStudents || [];
  const submitted = assignment.submitted || {};
  const completedCount = students.filter(name => submitted[name]).length;
  const pendingCount = Math.max(0, students.length - completedCount);

  const header = document.createElement('div');
  header.className = 'assignment-detail-header';
  const heading = document.createElement('div');
  heading.className = 'assignment-detail-heading';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'assignment-title-edit';
  titleInput.value = assignment.title;
  titleInput.setAttribute('aria-label', '과제 이름');
  titleInput.addEventListener('change', () => {
    titleInput.value = updateAssignmentTitle(assignment.id, titleInput.value);
    renderAssignmentList();
  });
  const date = document.createElement('span');
  date.className = 'assignment-date';
  date.textContent = formatAssignmentDateLabel(assignment.date);
  heading.appendChild(titleInput);
  heading.appendChild(date);

  const actions = document.createElement('div');
  actions.className = 'assignment-detail-actions';
  const archiveBtn = document.createElement('button');
  archiveBtn.className = 'assignment-card-btn';
  archiveBtn.textContent = assignment.archived ? '진행 중으로 이동' : '보관';
  archiveBtn.onclick = () => toggleAssignmentArchive(assignment.id);
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'assignment-card-btn danger';
  deleteBtn.textContent = '삭제';
  deleteBtn.onclick = () => deleteAssignment(assignment.id);
  actions.appendChild(archiveBtn);
  actions.appendChild(deleteBtn);
  header.appendChild(heading);
  header.appendChild(actions);
  container.appendChild(header);

  if (!students.length) {
    appendAssignmentEmpty(container, '학생 명단이 비어 있어요', '명단을 한 번 등록하면 모든 과제에서 함께 사용할 수 있어요.', '명단 관리 열기', openAssignmentRoster);
    return;
  }

  const statusCards = document.createElement('div');
  statusCards.className = 'assignment-status-cards';
  [
    { filter: 'pending', label: '확인 전', count: pendingCount },
    { filter: 'completed', label: '확인 완료', count: completedCount },
    { filter: 'all', label: '전체 학생', count: students.length },
  ].forEach(info => {
    const button = document.createElement('button');
    button.className = 'assignment-status-card ' + info.filter + (viewData.assignmentStatusFilter === info.filter ? ' active' : '');
    button.setAttribute('aria-pressed', viewData.assignmentStatusFilter === info.filter ? 'true' : 'false');
    button.onclick = () => setAssignmentStatusFilter(info.filter);
    const label = document.createElement('span');
    label.textContent = info.label;
    const count = document.createElement('strong');
    count.textContent = info.count + '명';
    button.appendChild(label);
    button.appendChild(count);
    statusCards.appendChild(button);
  });
  container.appendChild(statusCards);

  const quickActions = document.createElement('div');
  quickActions.className = 'assignment-quick-actions';
  const hint = document.createElement('span');
  hint.textContent = '학생 이름을 누르면 상태가 바뀝니다.';
  const quickButtons = document.createElement('div');
  quickButtons.className = 'assignment-quick-buttons';
  const copyBtn = document.createElement('button');
  copyBtn.className = 'assignment-card-btn';
  copyBtn.textContent = '확인 전 이름 복사';
  copyBtn.disabled = pendingCount === 0;
  copyBtn.onclick = () => copyPendingAssignmentStudents(assignment.id);
  const allBtn = document.createElement('button');
  allBtn.className = 'assignment-card-btn primary';
  allBtn.textContent = '모두 확인';
  allBtn.disabled = pendingCount === 0;
  allBtn.onclick = () => completeAssignmentForAll(assignment.id);
  const resetBtn = document.createElement('button');
  resetBtn.className = 'assignment-card-btn';
  resetBtn.textContent = '초기화';
  resetBtn.disabled = completedCount === 0;
  resetBtn.onclick = () => clearAssignmentSubmission(assignment.id);
  quickButtons.appendChild(copyBtn);
  quickButtons.appendChild(allBtn);
  quickButtons.appendChild(resetBtn);
  quickActions.appendChild(hint);
  quickActions.appendChild(quickButtons);
  container.appendChild(quickActions);

  const filter = viewData.assignmentStatusFilter;
  const visibleStudents = students.filter(name => filter === 'all' || (filter === 'completed' ? !!submitted[name] : !submitted[name]));
  if (!visibleStudents.length) {
    appendAssignmentEmpty(
      container,
      filter === 'pending' ? '모두 확인했어요' : '표시할 학생이 없어요',
      filter === 'pending' ? '이 과제의 확인이 모두 끝났습니다. 완료된 과제는 보관해둘 수 있어요.' : '다른 상태 카드를 눌러 학생을 확인해보세요.'
    );
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'assignment-check-grid';
  grid.setAttribute('aria-label', filter === 'pending' ? '확인 전 학생' : (filter === 'completed' ? '확인 완료 학생' : '전체 학생'));
  visibleStudents.forEach(name => {
    const checked = !!submitted[name];
    const button = document.createElement('button');
    button.className = 'assignment-check-item' + (checked ? ' checked' : '');
    button.setAttribute('aria-pressed', checked ? 'true' : 'false');
    button.setAttribute('aria-label', name + ' - ' + (checked ? '확인 완료, 눌러 확인 전으로 변경' : '확인 전, 눌러 확인 완료로 변경'));
    button.onclick = () => toggleAssignmentSubmission(assignment.id, name, !checked);
    const nameText = document.createElement('span');
    nameText.className = 'assignment-student-name';
    nameText.textContent = name;
    const state = document.createElement('span');
    state.className = 'assignment-student-status';
    state.textContent = checked ? '완료' : '확인';
    button.appendChild(nameText);
    button.appendChild(state);
    grid.appendChild(button);
  });
  container.appendChild(grid);
}

function openAssignmentRoster() {
  const drawer = document.getElementById('assignmentRosterDrawer');
  const backdrop = document.getElementById('assignmentRosterBackdrop');
  const openButton = document.getElementById('assignmentRosterOpenBtn');
  if (!drawer || !backdrop) return;
  drawer.classList.add('open');
  backdrop.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  if (openButton) openButton.setAttribute('aria-expanded', 'true');
  const input = document.getElementById('assignmentStudentInput');
  if (input) setTimeout(() => input.focus(), 100);
}

function closeAssignmentRoster(returnFocus = true) {
  const drawer = document.getElementById('assignmentRosterDrawer');
  const backdrop = document.getElementById('assignmentRosterBackdrop');
  const openButton = document.getElementById('assignmentRosterOpenBtn');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (backdrop) backdrop.classList.remove('open');
  if (openButton) {
    openButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) openButton.focus();
  }
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
  if (getRulesPanelView() !== 'rules') return;
  setRulesEditing(!isEditing);
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

function setStartTab(tabName) {
  const validTabs = ['last', 'rules', 'notebook', 'notice', 'meal', 'dday'];
  settings.startTab = validTabs.includes(tabName) ? tabName : 'last';
  saveSettings();
  showToast(settings.startTab === 'last' ? '마지막으로 본 탭에서 시작해요' : '다음 로드부터 선택한 탭에서 시작해요');
}

function openSettings() {
  document.getElementById('settingsModal').classList.add('open');
  document.getElementById('showRemainingToggle').checked = settings.showRemaining;
  document.getElementById('chimeToggle').checked = settings.chimeEnabled;
  document.getElementById('chimeEndToggle').checked = settings.chimeEndEnabled;
  document.getElementById('colonBlinkToggle').checked = settings.colonBlink;
  document.getElementById('secondsToggle').checked = settings.showSeconds;
  document.getElementById('timetableModeToggle').checked = settings.timetableMode;
  const startTabSelect = document.getElementById('startTabSelect');
  if (startTabSelect) startTabSelect.value = settings.startTab || 'last';
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

    const ddayBtn = document.createElement('button');
    const alreadyDday = getDdays().some(d => d.date === event.date && d.title === event.title);
    ddayBtn.className = 'event-mini-btn' + (alreadyDday ? ' active' : '');
    ddayBtn.textContent = alreadyDday ? '디데이 해제' : '+ 디데이';
    ddayBtn.addEventListener('click', () => toggleDdayFromAcademicEvent(event.date));

    const delBtn = document.createElement('button');
    delBtn.className = 'event-mini-btn delete';
    delBtn.textContent = '삭제';
    delBtn.addEventListener('click', () => deleteAcademicEvent(event.date));

    actions.appendChild(editBtn);
    actions.appendChild(ddayBtn);
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
    selectedEvent.quickOnly = false;
    selectedEvent.timetable = (selectedEvent.timetable || []).map(cloneEntry).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  } else if (existingIndex >= 0) {
    events[existingIndex].title = title;
    events[existingIndex].notice = notice;
    events[existingIndex].quickOnly = false;
  } else {
    events.push(normalizeAcademicEvent({ date, title, notice, timetable: [], quickOnly: false }));
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
// QUICK TODAY TIMETABLE
// =============================================
function getTodayDateKey() {
  return formatDateKey(new Date());
}

function getTodayAcademicEvent() {
  return getAcademicEventByDate(getTodayDateKey());
}

function sortAcademicEvents() {
  viewData.academicEvents = getAcademicEvents()
    .map(normalizeAcademicEvent)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function syncAcademicEventEditors() {
  const settingsModal = document.getElementById('settingsModal');
  if (!settingsModal || !settingsModal.classList.contains('open')) return;
  renderAcademicEventList();
  updateAcademicEventSelectionBar();
  if (viewData.selectedAcademicEventDate === getTodayDateKey()) {
    fillAcademicEventForm();
    renderSpecialTimetableEditor();
  }
}

function ensureTodayTimetableEvent() {
  const dateKey = getTodayDateKey();
  const events = getAcademicEvents();
  let event = getAcademicEventByDate(dateKey);

  if (!event) {
    events.push(normalizeAcademicEvent({
      date: dateKey,
      title: '오늘 시간표 변경',
      notice: '',
      timetable: buildSpecialTimetableFromBase(dateKey),
      quickOnly: true,
      timetableOverride: true,
    }));
  } else {
    event.timetableOverride = true;
    if (!Array.isArray(event.timetable) || !event.timetable.length) {
      event.timetable = buildSpecialTimetableFromBase(dateKey);
    } else {
      event.timetable = event.timetable.map(cloneEntry).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
    }
    if (!event.title.trim()) event.title = '오늘 시간표 변경';
  }

  sortAcademicEvents();
  saveViewData();
  return getAcademicEventByDate(dateKey);
}

function getTodayTimetableSourceEntries(dateKey) {
  const event = getAcademicEventByDate(dateKey);
  if (event && (event.timetableOverride || (!event.quickOnly && event.timetable.length))) {
    return event.timetable.map(cloneEntry).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  }
  return buildSpecialTimetableFromBase(dateKey);
}

function prepareQuickTimetableDraft() {
  quickTimetableDateKey = getTodayDateKey();
  quickTimetableDraft = getTodayTimetableSourceEntries(quickTimetableDateKey);
}

function openQuickTimetableEditor() {
  prepareQuickTimetableDraft();
  quickTimetableDirty = false;
  const dateEl = document.getElementById('quickTimetableDate');
  if (dateEl) {
    const today = new Date();
    dateEl.textContent = quickTimetableDateKey + ' · ' + DAYS_KR[today.getDay()];
  }
  renderQuickTimetableEditor();
  renderQuickTimetableShortcutState();
  document.getElementById('quickTimetableModal').classList.add('open');
}

function closeQuickTimetableEditor() {
  const modal = document.getElementById('quickTimetableModal');
  if (modal) modal.classList.remove('open');
}

function collectQuickTimetableDraftFromEditor() {
  const container = document.getElementById('quickTtList');
  if (!container) return false;

  const rows = Array.from(container.querySelectorAll('.quick-tt-row'));
  const before = JSON.stringify((quickTimetableDraft || []).map(cloneEntry));
  const nextDraft = rows.map((row, index) => {
    const current = quickTimetableDraft[index] ? cloneEntry(quickTimetableDraft[index]) : cloneEntry({});
    const labelInput = row.querySelector('.tt-label-input');
    const timeInputs = row.querySelectorAll('.tt-time-input');
    const typeSelect = row.querySelector('.tt-type-select');
    const subjectInput = row.querySelector('.quick-tt-subject-input');

    current.label = (labelInput && labelInput.value.trim()) || '새 시간';
    current.start = (timeInputs[0] && timeInputs[0].value) || current.start || '09:00';
    current.end = (timeInputs[1] && timeInputs[1].value) || current.end || '09:40';
    current.type = (typeSelect && typeSelect.value) || current.type || 'in-class';
    current.subject = subjectInput ? subjectInput.value : (current.subject || '');
    return current;
  });
  const after = JSON.stringify(nextDraft.map(cloneEntry));

  if (after !== before) {
    quickTimetableDraft = nextDraft;
    markQuickTimetableDirty();
    return true;
  }
  return false;
}

function finishQuickTimetableEditor() {
  const changed = collectQuickTimetableDraftFromEditor();
  if (quickTimetableDirty || changed) {
    saveQuickTimetable(false, true);
  }
  closeQuickTimetableEditor();
}

function markQuickTimetableDirty() {
  quickTimetableDirty = true;
  const statusEl = document.getElementById('quickTtSaveStatus');
  if (statusEl) {
    statusEl.textContent = '저장 중';
    statusEl.className = 'event-save-status dirty';
  }
}

function saveQuickTimetable(shouldRerender, showSavedToast) {
  const dateKey = quickTimetableDateKey || getTodayDateKey();
  const events = getAcademicEvents();
  let event = getAcademicEventByDate(dateKey);
  quickTimetableDraft = (quickTimetableDraft || []).map(cloneEntry).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));
  if (!event) {
    events.push(normalizeAcademicEvent({
      date: dateKey,
      title: '오늘 시간표 변경',
      notice: '',
      timetable: quickTimetableDraft,
      quickOnly: true,
      timetableOverride: true,
    }));
    event = getAcademicEventByDate(dateKey);
  }
  if (!event) return;
  event.timetable = quickTimetableDraft.map(cloneEntry);
  event.timetableOverride = true;
  if (!event.title.trim()) event.title = '오늘 시간표 변경';
  sortAcademicEvents();
  quickTimetableDirty = false;
  saveViewData();
  if (shouldRerender) renderQuickTimetableEditor();
  const statusEl = document.getElementById('quickTtSaveStatus');
  if (statusEl) {
    statusEl.textContent = '저장됨';
    statusEl.className = 'event-save-status saved';
  }
  renderQuickTimetableShortcutState();
  syncAcademicEventEditors();
  updateAcademicEventBanner(new Date());
  updateClock();
  if (settings.timetableMode) {
    lastTimetableMin = -1;
    renderTimetableDisplay();
  }
  if (showSavedToast) showToast('오늘 시간표가 저장되었어요');
}

function renderQuickTimetableEditor() {
  const container = document.getElementById('quickTtList');
  if (!container) return;
  container.innerHTML = '';

  if (!quickTimetableDraft.length) {
    const empty = document.createElement('div');
    empty.className = 'event-empty';
    empty.textContent = '오늘 시간표가 비어 있습니다. 기본 시간표를 불러오거나 새 시간을 추가하세요.';
    container.appendChild(empty);
    return;
  }

  quickTimetableDraft.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'tt-row quick-tt-row';

    const labelInput = document.createElement('input');
    labelInput.className = 'tt-label-input';
    labelInput.type = 'text';
    labelInput.value = entry.label;
    labelInput.addEventListener('change', () => {
      entry.label = labelInput.value.trim() || '새 시간';
      markQuickTimetableDirty();
      saveQuickTimetable(false, false);
    });

    const startInput = document.createElement('input');
    startInput.className = 'tt-time-input';
    startInput.type = 'time';
    startInput.value = entry.start;
    startInput.addEventListener('change', () => {
      if (!startInput.value) {
        startInput.value = entry.start;
        return;
      }
      entry.start = startInput.value;
      markQuickTimetableDirty();
      saveQuickTimetable(true, false);
    });

    const sep = document.createElement('span');
    sep.className = 'tt-separator';
    sep.textContent = '~';

    const endInput = document.createElement('input');
    endInput.className = 'tt-time-input';
    endInput.type = 'time';
    endInput.value = entry.end;
    endInput.addEventListener('change', () => {
      if (!endInput.value) {
        endInput.value = entry.end;
        return;
      }
      entry.end = endInput.value;
      markQuickTimetableDirty();
      saveQuickTimetable(true, false);
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
      markQuickTimetableDirty();
      saveQuickTimetable(false, false);
    });

    const subjectInput = document.createElement('input');
    subjectInput.className = 'subject-grid-input quick-tt-subject-input';
    subjectInput.type = 'text';
    subjectInput.placeholder = '과목/내용';
    subjectInput.value = entry.subject || '';
    subjectInput.addEventListener('input', () => {
      entry.subject = subjectInput.value;
      markQuickTimetableDirty();
      saveQuickTimetable(false, false);
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'tt-delete-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.addEventListener('click', () => {
      quickTimetableDraft.splice(i, 1);
      markQuickTimetableDirty();
      saveQuickTimetable(true, false);
      showToast('오늘 시간이 삭제되었어요');
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

function addQuickTimetableEntry() {
  if (!quickTimetableDateKey) prepareQuickTimetableDraft();
  const lastEntry = quickTimetableDraft[quickTimetableDraft.length - 1];
  const startMins = lastEntry ? Math.min(timeToMins(lastEntry.end) + 10, 1439) : 540;
  const endMins = Math.min(startMins + 40, 1439);
  quickTimetableDraft.push({
    label: (quickTimetableDraft.length + 1) + '교시',
    start: minsToTime(startMins),
    end: minsToTime(endMins),
    type: 'in-class',
    subject: '',
    subjects: {},
    days: [],
  });
  markQuickTimetableDirty();
  saveQuickTimetable(true, true);
}

function copyDefaultTimetableToQuick() {
  if (!quickTimetableDateKey) quickTimetableDateKey = getTodayDateKey();
  quickTimetableDraft = buildSpecialTimetableFromBase(quickTimetableDateKey);
  markQuickTimetableDirty();
  saveQuickTimetable(true, true);
}

function clearTodayTimetableChange() {
  const event = getTodayAcademicEvent();
  if (!event || (!event.timetableOverride && !event.timetable.length)) {
    showToast('삭제할 오늘 시간표 변경이 없어요');
    return;
  }
  if (!confirm('오늘만 바꾼 시간표를 삭제하고 기본 시간표로 돌아갈까요?')) return;

  if (event.quickOnly) {
    viewData.academicEvents = getAcademicEvents().filter(item => item.date !== event.date);
    if (viewData.selectedAcademicEventDate === event.date) viewData.selectedAcademicEventDate = '';
  } else {
    event.timetable = [];
    event.timetableOverride = false;
  }
  sortAcademicEvents();
  saveViewData();
  renderQuickTimetableEditor();
  renderQuickTimetableShortcutState();
  syncAcademicEventEditors();
  updateAcademicEventBanner(new Date());
  updateClock();
  if (settings.timetableMode) {
    lastTimetableMin = -1;
    renderTimetableDisplay();
  }
  closeQuickTimetableEditor();
  showToast('오늘 시간표 변경을 삭제했어요');
}

function openTodayTimetableInSettings() {
  if (!getTodayAcademicEvent() || quickTimetableDirty) saveQuickTimetable(false, false);
  const event = getTodayAcademicEvent() || ensureTodayTimetableEvent();
  closeQuickTimetableEditor();
  openSettings();
  selectAcademicEvent(event.date, { source: 'quick' });
}

function renderQuickTimetableShortcutState() {
  const btn = document.getElementById('todayTimetableBtn');
  if (!btn) return;
  const event = getTodayAcademicEvent();
  const hasOverride = !!(event && (event.timetableOverride || (!event.quickOnly && Array.isArray(event.timetable) && event.timetable.length)));
  btn.classList.toggle('has-override', hasOverride);
  btn.textContent = hasOverride ? '오늘 변경됨' : '오늘 시간표';
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
  if (!['rules', 'notebook', 'notice', 'meal', 'dday'].includes(tabName)) {
    tabName = 'rules';
  }

  viewData.activeTab = tabName;
  saveViewData();

  if (isEditing) {
    setRulesEditing(false);
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.getElementById('tabRules').style.display = tabName === 'rules' ? '' : 'none';
  document.getElementById('tabNotebook').style.display = tabName === 'notebook' ? '' : 'none';
  document.getElementById('tabNotice').style.display = tabName === 'notice' ? '' : 'none';
  document.getElementById('tabMeal').style.display = tabName === 'meal' ? '' : 'none';
  document.getElementById('tabDday').style.display = tabName === 'dday' ? '' : 'none';

  if (tabName === 'rules') {
    applyRulesView();
  }
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
  if (tabName === 'dday') {
    renderDdays();
  }
  applyNotebookPanelFill();
}

function switchToDdayTab() {
  switchTab('dday');
}

function initTabs() {
  const fixedStartTab = ['rules', 'notebook', 'notice', 'meal', 'dday'].includes(settings.startTab) ? settings.startTab : '';
  const tab = fixedStartTab || viewData.activeTab || 'rules';
  switchTab(tab);
}

// =============================================
// CLASSROOM TOOLS
// =============================================
function toggleClassroomTools(event) {
  if (event) event.stopPropagation();
  const tools = document.getElementById('classroomTools');
  if (!tools) return;
  setClassroomToolsOpen(!tools.classList.contains('open'));
}

function setClassroomToolsOpen(isOpen) {
  const tools = document.getElementById('classroomTools');
  const button = document.getElementById('classroomToolsBtn');
  if (!tools || !button) return;
  tools.classList.toggle('open', !!isOpen);
  button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeClassroomTools() {
  setClassroomToolsOpen(false);
}

function openAssignmentModal() {
  closeClassroomTools();
  closeAssignmentRoster(false);
  viewData.assignmentListView = 'active';
  viewData.assignmentStatusFilter = 'pending';
  renderAssignments();
  const modal = document.getElementById('assignmentModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  const closeButton = modal.querySelector('.modal-close');
  if (closeButton) setTimeout(() => closeButton.focus(), 100);
}

function closeAssignmentModal() {
  closeAssignmentRoster(false);
  const modal = document.getElementById('assignmentModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
  const toolsButton = document.getElementById('classroomToolsBtn');
  if (toolsButton) toolsButton.focus();
}

// =============================================
// TIMER
// =============================================
function openTimer() {
  closeClassroomTools();
  const modal = document.getElementById('timerModal');
  if (modal) modal.classList.add('open');
  renderTimer();
}

function closeTimer() {
  const modal = document.getElementById('timerModal');
  if (modal) modal.classList.remove('open');
}

function clampTimerPart(value, min, max) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function getTimerInputSeconds() {
  const minInput = document.getElementById('timerMinutesInput');
  const secInput = document.getElementById('timerSecondsInput');
  const mins = clampTimerPart(minInput ? minInput.value : 0, 0, 999);
  const secs = clampTimerPart(secInput ? secInput.value : 0, 0, 59);
  return mins * 60 + secs;
}

function updateTimerInputsFromSeconds(totalSeconds) {
  const minInput = document.getElementById('timerMinutesInput');
  const secInput = document.getElementById('timerSecondsInput');
  const total = Math.max(0, Math.floor(totalSeconds || 0));
  if (minInput) minInput.value = Math.floor(total / 60);
  if (secInput) secInput.value = total % 60;
}

function formatTimerSeconds(totalSeconds) {
  const total = Math.max(0, Math.floor(totalSeconds || 0));
  const hours = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) {
    return hours + ':' + String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }
  return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

function renderTimer() {
  const panel = document.getElementById('timerPanel');
  const display = document.getElementById('timerDisplay');
  const status = document.getElementById('timerStatus');
  const progress = document.getElementById('timerProgressFill');
  const startBtn = document.getElementById('timerStartPauseBtn');
  const minInput = document.getElementById('timerMinutesInput');
  const secInput = document.getElementById('timerSecondsInput');
  if (!panel || !display || !status || !progress || !startBtn) return;

  const done = !timerState.running && timerState.duration > 0 && timerState.remaining === 0;
  const paused = !timerState.running && timerState.remaining > 0 && timerState.remaining < timerState.duration;
  const progressPct = timerState.duration > 0
    ? Math.min(100, Math.max(0, ((timerState.duration - timerState.remaining) / timerState.duration) * 100))
    : 0;

  display.textContent = formatTimerSeconds(timerState.remaining);
  progress.style.width = progressPct + '%';
  panel.classList.toggle('running', timerState.running);
  panel.classList.toggle('paused', paused);
  panel.classList.toggle('done', done);
  status.textContent = timerState.running ? '진행 중' : (done ? '완료' : (paused ? '일시정지' : '대기 중'));
  startBtn.textContent = timerState.running ? '일시정지' : (done ? '다시 시작' : (paused ? '계속' : '시작'));
  if (minInput) minInput.disabled = timerState.running;
  if (secInput) secInput.disabled = timerState.running;
}

function setTimerFromInputs() {
  if (timerState.running) return;
  const total = getTimerInputSeconds();
  timerState.duration = total;
  timerState.remaining = total;
  timerState.endsAt = 0;
  timerState.notified = false;
  renderTimer();
}

function setTimerPreset(seconds) {
  const total = Math.max(0, Math.floor(seconds || 0));
  timerState.duration = total;
  timerState.remaining = total;
  timerState.running = false;
  timerState.endsAt = 0;
  timerState.notified = false;
  updateTimerInputsFromSeconds(total);
  renderTimer();
}

function toggleTimer() {
  if (timerState.running) {
    updateTimer();
    timerState.running = false;
    timerState.endsAt = 0;
    renderTimer();
    return;
  }

  if (timerState.remaining <= 0) {
    timerState.duration = getTimerInputSeconds();
    timerState.remaining = timerState.duration;
  }

  if (timerState.remaining <= 0) {
    showToast('타이머 시간을 입력해주세요');
    renderTimer();
    return;
  }

  timerState.running = true;
  timerState.endsAt = Date.now() + timerState.remaining * 1000;
  timerState.notified = false;
  renderTimer();
}

function resetTimer() {
  timerState.running = false;
  timerState.remaining = timerState.duration;
  timerState.endsAt = 0;
  timerState.notified = false;
  updateTimerInputsFromSeconds(timerState.duration);
  renderTimer();
}

function updateTimer() {
  if (!timerState.running) return;
  timerState.remaining = Math.max(0, Math.ceil((timerState.endsAt - Date.now()) / 1000));

  if (timerState.remaining <= 0) {
    timerState.running = false;
    timerState.endsAt = 0;
    const shouldNotify = !timerState.notified;
    timerState.notified = true;
    renderTimer();
    if (shouldNotify) {
      showToast('타이머가 끝났어요');
      playTimerFinishedSound();
    }
    return;
  }

  renderTimer();
}

function playTimerFinishedSound() {
  const soundToggle = document.getElementById('timerSoundToggle');
  if (soundToggle && !soundToggle.checked) return;
  playChimeNotes([1046.5, 783.99, 1046.5]);
}

// =============================================
// NOTEBOOK (알림장)
// =============================================
function sendToSchoolbell() {
  var area = document.getElementById('notebookArea');
  var text = (area ? area.innerText : '').trim();
  if (!text) {
    showToast('알림장에 내용을 먼저 입력해주세요');
    return;
  }
  var html = buildSchoolbellClipboardHTML(area ? area.innerHTML : getActiveNotebookContent());
  var copied = execCommandCopyRich(html, text);
  var richCopyPromise = null;
  if (navigator.clipboard && window.ClipboardItem) {
    try {
      var htmlBlob = new Blob([html], { type: 'text/html' });
      var textBlob = new Blob([text], { type: 'text/plain' });
      richCopyPromise = navigator.clipboard.write([
        new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })
      ]);
    } catch {
      richCopyPromise = null;
    }
  }
  openSchoolbell();
  if (richCopyPromise) {
    richCopyPromise.then(function() {
      showToast('알림장을 복사했어요. 학교종이에서 Ctrl+V로 붙여넣어 주세요.');
    }).catch(function() {
      if (copied) {
        showToast('알림장을 복사했어요. 학교종이에서 Ctrl+V로 붙여넣어 주세요.');
      } else {
        fallbackCopyForSchoolbell(text);
      }
    });
    return;
  }
  if (copied) showToast('알림장을 복사했어요. 학교종이에서 Ctrl+V로 붙여넣어 주세요.');
  else fallbackCopyForSchoolbell(text);
}

function buildSchoolbellClipboardHTML(html) {
  var holder = document.createElement('div');
  holder.innerHTML = sanitizeNotebookHTML(html);
  holder.querySelectorAll('*').forEach(function(el) {
    if (el.style) {
      el.style.removeProperty('background');
      el.style.removeProperty('background-color');
      if (!el.getAttribute('style')) el.removeAttribute('style');
    }
    el.removeAttribute('bgcolor');
  });
  return sanitizeNotebookHTML(holder.innerHTML);
}

function execCommandCopyRich(html, text) {
  var handled = false;
  function handleCopy(event) {
    if (!event.clipboardData) return;
    event.clipboardData.setData('text/html', html);
    event.clipboardData.setData('text/plain', text);
    event.preventDefault();
    handled = true;
  }
  document.addEventListener('copy', handleCopy);
  try {
    return document.execCommand('copy') && handled;
  } catch {
    return false;
  } finally {
    document.removeEventListener('copy', handleCopy);
  }
}

function fallbackCopyForSchoolbell(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showToast('알림장을 복사했어요. 학교종이에서 Ctrl+V로 붙여넣어 주세요.');
    }).catch(function() {
      var copied = execCommandCopy(text);
      showToast(copied ? '알림장을 복사했어요. 학교종이에서 Ctrl+V로 붙여넣어 주세요.' : '학교종이는 열었지만 자동 복사에 실패했어요. 알림장을 직접 복사해 주세요.');
    });
  } else {
    var copied = execCommandCopy(text);
    showToast(copied ? '알림장을 복사했어요. 학교종이에서 Ctrl+V로 붙여넣어 주세요.' : '학교종이는 열었지만 자동 복사에 실패했어요. 알림장을 직접 복사해 주세요.');
  }
}

function execCommandCopy(text) {
  var tmp = document.createElement('textarea');
  tmp.value = text;
  tmp.style.position = 'fixed';
  tmp.style.opacity = '0';
  document.body.appendChild(tmp);
  tmp.select();
  var copied = document.execCommand('copy');
  document.body.removeChild(tmp);
  return copied;
}

function normalizeSchoolbellUrl(value, useWritePage) {
  var raw = String(value || '').trim();
  if (!raw) return '';
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  try {
    var parsed = new URL(raw);
    var host = parsed.hostname.toLowerCase();
    var allowedHosts = ['schoolbell-e.com', 'www.schoolbell-e.com', 'v4.schoolbell-e.com'];
    if (!allowedHosts.includes(host)) return '';
    parsed.protocol = 'https:';
    parsed.port = '';
    parsed.username = '';
    parsed.password = '';
    parsed.hash = '';
    if (useWritePage) {
      var match = parsed.pathname.match(/\/group\/(\d+)/);
      if (match) {
        return parsed.origin + '/ko/main/group/' + match[1] + '/boards/write/classnews';
      }
    }
    return parsed.href;
  } catch {
    return '';
  }
}

function getSchoolbellTargetUrl() {
  return normalizeSchoolbellUrl(settings.schoolbellUrl, true) || SCHOOLBELL_DEFAULT_URL;
}

function openSchoolbell() {
  window.open(getSchoolbellTargetUrl(), '_blank', 'noopener,noreferrer');
}

function saveSchoolbellUrl() {
  var input = document.getElementById('schoolbellUrlInput');
  var raw = input ? input.value.trim() : '';
  if (!raw) {
    settings.schoolbellUrl = '';
    saveSettings();
    showToast('저장한 학교종이 URL을 지웠어요');
    return;
  }
  var normalized = normalizeSchoolbellUrl(raw, false);
  if (!normalized) {
    showToast('schoolbell-e.com 학교종이 주소를 입력해주세요');
    if (input) input.focus();
    return;
  }
  settings.schoolbellUrl = normalized;
  if (input) input.value = normalized;
  saveSettings();
  showToast('학교종이 URL을 저장했어요');
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

// 알림장 글자를 복사/잘라낼 때 베이지색 종이 배경이 함께 따라오지 않도록 처리합니다.
// 편집 영역은 배경색(예: 전체화면의 #f5f0e8) 위에 놓여 있어서, 그냥 복사하면
// 브라우저가 그 배경색까지 클립보드에 담습니다. 그러면 학교종이처럼 서식을 유지하는
// 편집기에 붙여넣을 때 배경이 남습니다. 아래 핸들러는 선택한 글자의 서식(굵게·기울임·
// 밑줄·색)은 살리고 배경만 제거한 내용을 클립보드에 넣습니다.
var NOTEBOOK_EDITOR_SELECTOR = '#notebookArea, #notebookPanelTextarea, #notebookFullscreenBody, #activityEditor, #activityImportantEditor';

function getNotebookEditorFromSelection(sel) {
  if (!sel || sel.rangeCount === 0) return null;
  var node = sel.anchorNode;
  if (node && node.nodeType === 3) node = node.parentElement;
  return (node && node.closest) ? node.closest(NOTEBOOK_EDITOR_SELECTOR) : null;
}

function buildCleanNotebookClipboardHTML(range) {
  var holder = document.createElement('div');
  holder.appendChild(range.cloneContents());
  // 선택 영역 안에 혹시 남아있을 배경 관련 스타일/속성을 제거합니다.
  var els = holder.querySelectorAll('*');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (el.style) {
      el.style.removeProperty('background');
      el.style.removeProperty('background-color');
      if (!el.getAttribute('style')) el.removeAttribute('style');
    }
    el.removeAttribute('bgcolor');
  }
  // 허용된 서식 태그만 남기도록 한 번 더 정리합니다(배경색은 위에서 이미 제거됨).
  return sanitizeNotebookHTML(holder.innerHTML);
}

function handleNotebookClipboard(e) {
  if (!e.clipboardData) return;
  var sel = window.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
  var editor = getNotebookEditorFromSelection(sel);
  if (!editor) return;
  var range = sel.getRangeAt(0);
  e.clipboardData.setData('text/html', buildCleanNotebookClipboardHTML(range));
  e.clipboardData.setData('text/plain', sel.toString());
  e.preventDefault();
  if (e.type === 'cut') {
    range.deleteContents();
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

document.addEventListener('copy', handleNotebookClipboard);
document.addEventListener('cut', handleNotebookClipboard);

// =============================================
// NOTEBOOK ARCHIVE (알림장 보관함 — 날짜별 누적)
// =============================================
// 알림장 HTML을 줄바꿈을 살린 순수 텍스트로 변환합니다 (미리보기·TXT 내보내기용).
function notebookHtmlToText(html) {
  if (!html) return '';
  var safe = sanitizeNotebookHTML(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(div|p)>/gi, '\n');
  var div = document.createElement('div');
  div.innerHTML = safe;
  return (div.textContent || '').replace(/\n{3,}/g, '\n\n');
}

function escapeArchiveText(str) {
  var div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

// "2026-05-29" → "2026년 5월 29일 (목)"
function formatArchiveDateLabel(key) {
  var p = (key || '').split('-').map(Number);
  if (p.length !== 3 || p.some(isNaN)) return key || '';
  var d = new Date(p[0], p[1] - 1, p[2]);
  return p[0] + '년 ' + p[1] + '월 ' + p[2] + '일 (' + DAYS_KR[d.getDay()].charAt(0) + ')';
}

// 현재 알림장 페이지들을 보관용 스냅샷으로 복사합니다.
function snapshotNotebookPages() {
  return (viewData.notebookPages || []).map(function(p) {
    return {
      title: (typeof p.title === 'string' && p.title.trim()) ? p.title : '알림장',
      content: typeof p.content === 'string' ? p.content : '',
    };
  });
}

function notebookSnapshotHasContent(pages) {
  return (pages || []).some(function(p) {
    return notebookHtmlToText(p.content).trim().length > 0;
  });
}

// 지정한 날짜로 현재 알림장 내용을 보관함에 저장합니다.
function archiveNotebookForDate(dateKey, opts) {
  opts = opts || {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey || '')) return false;
  var pages = snapshotNotebookPages();
  if (!notebookSnapshotHasContent(pages)) return false;
  if (!viewData.notebookArchive || typeof viewData.notebookArchive !== 'object') {
    viewData.notebookArchive = {};
  }
  viewData.notebookArchive[dateKey] = { date: dateKey, savedAt: Date.now(), pages: pages };
  saveViewData();
  return true;
}

// 날짜가 바뀌면 전날 알림장을 자동으로 보관합니다. updateClock에서 매 틱 호출됩니다.
function checkNotebookDateRollover() {
  var todayKey = formatDateKey(new Date());
  if (!viewData.notebookArchiveDate) {
    viewData.notebookArchiveDate = todayKey;
    saveViewData();
    return;
  }
  if (viewData.notebookArchiveDate === todayKey) return;
  archiveNotebookForDate(viewData.notebookArchiveDate);
  viewData.notebookArchiveDate = todayKey;
  saveViewData();
}

// "오늘 저장" 버튼 — 지금 알림장을 오늘 날짜로 즉시 보관합니다.
function saveNotebookToday() {
  var todayKey = formatDateKey(new Date());
  viewData.notebookArchiveDate = todayKey;
  if (archiveNotebookForDate(todayKey)) {
    showToast('오늘 알림장을 보관했어요');
    var modal = document.getElementById('notebookArchiveModal');
    if (modal && modal.classList.contains('open')) renderNotebookArchive();
  } else {
    saveViewData();
    showToast('알림장에 저장할 내용이 없어요');
  }
}

function openNotebookArchive() {
  renderNotebookArchive();
  var modal = document.getElementById('notebookArchiveModal');
  if (modal) modal.classList.add('open');
}

function closeNotebookArchive() {
  var modal = document.getElementById('notebookArchiveModal');
  if (modal) modal.classList.remove('open');
}

function buildArchivePreview(entry) {
  var pages = (entry && entry.pages) || [];
  var text = pages
    .map(function(p) { return notebookHtmlToText(p.content); })
    .join(' / ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '(내용 없음)';
  return text.length > 60 ? text.slice(0, 60) + '…' : text;
}

function renderNotebookArchive() {
  var listEl = document.getElementById('notebookArchiveList');
  if (!listEl) return;
  listEl.innerHTML = '';
  var archive = viewData.notebookArchive || {};
  var keys = Object.keys(archive).sort().reverse();
  if (keys.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'archive-empty';
    empty.innerHTML = '아직 보관된 알림장이 없어요.<br>날짜가 바뀌면 전날 알림장이 자동으로 여기 쌓여요.';
    listEl.appendChild(empty);
    return;
  }
  keys.forEach(function(key) {
    var entry = archive[key];
    var row = document.createElement('div');
    row.className = 'archive-item';

    var info = document.createElement('div');
    info.className = 'archive-item-info';
    var dateEl = document.createElement('div');
    dateEl.className = 'archive-item-date';
    dateEl.textContent = formatArchiveDateLabel(key);
    var preview = document.createElement('div');
    preview.className = 'archive-item-preview';
    preview.textContent = buildArchivePreview(entry);
    info.appendChild(dateEl);
    info.appendChild(preview);

    var actions = document.createElement('div');
    actions.className = 'archive-item-actions';
    var htmlBtn = document.createElement('button');
    htmlBtn.className = 'archive-dl-btn';
    htmlBtn.textContent = 'HTML';
    htmlBtn.title = 'HTML 파일로 내려받기 (꾸밈 유지)';
    htmlBtn.onclick = function() { downloadArchiveEntry(key, 'html'); };
    var txtBtn = document.createElement('button');
    txtBtn.className = 'archive-dl-btn';
    txtBtn.textContent = 'TXT';
    txtBtn.title = '텍스트 파일로 내려받기';
    txtBtn.onclick = function() { downloadArchiveEntry(key, 'txt'); };
    var delBtn = document.createElement('button');
    delBtn.className = 'archive-del-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.title = '이 날짜 삭제';
    delBtn.onclick = function() { deleteArchiveEntry(key); };
    actions.appendChild(htmlBtn);
    actions.appendChild(txtBtn);
    actions.appendChild(delBtn);

    row.appendChild(info);
    row.appendChild(actions);
    listEl.appendChild(row);
  });
}

function deleteArchiveEntry(key) {
  if (!confirm(formatArchiveDateLabel(key) + ' 알림장을 보관함에서 삭제할까요?')) return;
  if (viewData.notebookArchive) delete viewData.notebookArchive[key];
  saveViewData();
  renderNotebookArchive();
}

function buildArchiveTxt(entry, multi) {
  var lines = [formatArchiveDateLabel(entry.date) + ' 알림장', ''];
  (entry.pages || []).forEach(function(p) {
    if (multi) lines.push('[' + p.title + ']');
    lines.push(notebookHtmlToText(p.content).trim());
    lines.push('');
  });
  return lines.join('\r\n');
}

function buildArchiveHtmlDoc(entry, multi) {
  var label = escapeArchiveText(formatArchiveDateLabel(entry.date) + ' 알림장');
  var body = '';
  (entry.pages || []).forEach(function(p) {
    if (multi) body += '<h2>' + escapeArchiveText(p.title) + '</h2>';
    body += '<div class="page">' + sanitizeNotebookHTML(p.content) + '</div>';
  });
  return '<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + label + '</title>' +
    '<style>body{font-family:\'Malgun Gothic\',\'Apple SD Gothic Neo\',sans-serif;max-width:720px;' +
    'margin:40px auto;padding:0 24px;line-height:1.7;color:#2d2a26}' +
    'h1{font-size:1.6rem;border-bottom:2px solid #eee;padding-bottom:0.4em}' +
    'h2{font-size:1.15rem;margin-top:1.6em;color:#3b82f6}' +
    '.page{font-size:1.05rem}</style></head><body><h1>' + label + '</h1>' + body + '</body></html>';
}

function downloadArchiveEntry(key, format) {
  var entry = (viewData.notebookArchive || {})[key];
  if (!entry) return;
  var multi = !!settings.notebookMultiPageEnabled && (entry.pages || []).length > 1;
  var content, mime;
  if (format === 'html') {
    content = buildArchiveHtmlDoc(entry, multi);
    mime = 'text/html;charset=utf-8';
  } else {
    content = buildArchiveTxt(entry, multi);
    mime = 'text/plain;charset=utf-8';
  }
  var blob = new Blob([content], { type: mime });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = '알림장_' + key + (format === 'html' ? '.html' : '.txt');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
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
    if (!notice.id) notice.id = generateNoticeId();

    const card = document.createElement('div');
    card.className = 'notice-card';
    card.dataset.index = i;
    card.dataset.noticeId = notice.id;

    const handle = document.createElement('span');
    handle.className = 'notice-drag-handle';
    handle.innerHTML = '&#10303;';
    handle.title = '공지 순서 변경';
    handle.addEventListener('pointerdown', e => startNoticeDrag(e, notice.id, card));

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
      saveNoticeContent(notice.id, content.innerHTML);
      saveViewData();
    });
    content.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); content.blur(); }
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'notice-delete-btn';
    delBtn.innerHTML = '&#10005;';
    delBtn.onclick = () => {
      const noticeId = notice.id;
      card.style.transition = 'transform 0.3s, opacity 0.3s';
      card.style.transform = 'scale(0.8)';
      card.style.opacity = '0';
      setTimeout(() => {
        const deleteIndex = viewData.notices.findIndex(item => item.id === noticeId);
        if (deleteIndex >= 0) viewData.notices.splice(deleteIndex, 1);
        saveViewData();
        renderNotices();
        showToast('공지가 삭제되었어요');
      }, 250);
    };

    card.appendChild(handle);
    card.appendChild(dot);
    card.appendChild(content);
    card.appendChild(delBtn);
    container.appendChild(card);
  });
}

function addNotice() {
  syncNoticeContentsFromDom();
  viewData.notices.push({ id: generateNoticeId(), html: '새 공지사항' });
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
  syncNoticeContentsFromDom();
  saveViewData();
}

function saveNoticeContent(noticeId, html) {
  const notice = viewData.notices.find(item => item.id === noticeId);
  if (!notice) return;
  notice.html = sanitizeNotebookHTML(String(html || '').trim()) || '새 공지';
  delete notice.text;
}

function syncNoticeContentsFromDom() {
  document.querySelectorAll('.notice-card').forEach(function(card) {
    const noticeId = card.dataset.noticeId;
    const content = card.querySelector('.notice-content');
    if (noticeId && content) {
      saveNoticeContent(noticeId, content.innerHTML);
    }
  });
}

function startNoticeDrag(e, noticeId, cardEl) {
  if (e.button !== undefined && e.button !== 0) return;
  e.preventDefault();
  syncNoticeContentsFromDom();
  saveViewData();

  const container = document.getElementById('noticeContainer');
  const index = viewData.notices.findIndex(item => item.id === noticeId);
  if (!container || index === -1) return;
  const cards = [...container.querySelectorAll('.notice-card')];
  const rects = cards.map(card => card.getBoundingClientRect());
  const cardH = cardEl.getBoundingClientRect().height;

  noticeDrag = {
    active: true,
    cardEl,
    noticeId,
    index,
    currentIndex: index,
    startY: e.clientY,
    cardRects: rects,
    cardH,
    cards,
  };

  cardEl.classList.add('notice-lifted');
  cards.forEach(card => card.style.setProperty('--notice-card-h', cardH + 'px'));
  document.body.classList.add('is-dragging');

  document.addEventListener('pointermove', onNoticeDragMove);
  document.addEventListener('pointerup', onNoticeDragEnd);
}

function onNoticeDragMove(e) {
  if (!noticeDrag.active) return;
  const { cardEl, startY, index, cards, cardRects, cardH } = noticeDrag;
  const dy = e.clientY - startY;
  cardEl.style.transform = 'translateY(' + dy + 'px) scale(1.02)';

  const origCenter = cardRects[index].top + cardH / 2;
  const centerY = origCenter + dy;
  let newIndex = index;

  for (let i = 0; i < cardRects.length; i++) {
    const midY = cardRects[i].top + cardRects[i].height / 2;
    if (i < index && centerY < midY) { newIndex = i; break; }
    if (i > index && centerY > midY) { newIndex = i; }
  }

  if (newIndex !== noticeDrag.currentIndex) {
    noticeDrag.currentIndex = newIndex;
    cards.forEach((card, i) => {
      if (i === index) return;
      card.classList.remove('notice-shift-down', 'notice-shift-up');
      if (index < newIndex) {
        if (i > index && i <= newIndex) card.classList.add('notice-shift-up');
      } else if (index > newIndex) {
        if (i >= newIndex && i < index) card.classList.add('notice-shift-down');
      }
    });
  }
}

function onNoticeDragEnd() {
  if (!noticeDrag.active) return;
  const { cardEl, noticeId, currentIndex, cards } = noticeDrag;

  cardEl.classList.remove('notice-lifted');
  cardEl.style.transform = '';
  cards.forEach(card => {
    card.classList.remove('notice-shift-down', 'notice-shift-up');
    card.style.removeProperty('--notice-card-h');
  });
  document.body.classList.remove('is-dragging');

  document.removeEventListener('pointermove', onNoticeDragMove);
  document.removeEventListener('pointerup', onNoticeDragEnd);

  const fromIndex = viewData.notices.findIndex(item => item.id === noticeId);
  if (fromIndex !== -1 && fromIndex !== currentIndex) {
    const moved = viewData.notices.splice(fromIndex, 1)[0];
    viewData.notices.splice(currentIndex, 0, moved);
    saveViewData();
    showToast('공지 순서가 변경되었어요');
  }

  noticeDrag.active = false;
  renderNotices();
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

// =============================================
// D-DAY (디데이)
// =============================================
const DDAY_NON_SCHOOL_KEYWORDS = /(공휴일|대체공휴일|휴업|휴교|휴일|방학|개교기념|재량|임시휴업|토요휴업)/;
const DDAY_SCHOOL_EVENT_EXCEPTIONS = /(방학식|개학식|졸업식|입학식)/;

function getDdays() {
  if (!Array.isArray(viewData.ddays)) viewData.ddays = [];
  return viewData.ddays;
}

function getDdayScheduleMonthKeys(dateStr) {
  const target = parseDateKey(dateStr);
  if (!target) return [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const from = today <= target ? today : target;
  const to = today <= target ? target : today;
  const cursor = new Date(from.getFullYear(), from.getMonth(), 1);
  const end = new Date(to.getFullYear(), to.getMonth(), 1);
  const keys = [];
  let guard = 0;
  while (cursor <= end && guard < 36) {
    keys.push(getMonthKey(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
    guard++;
  }
  return keys;
}

function hasPendingDdaySchedule(dateStr) {
  if (!settings.school) return false;
  return getDdayScheduleMonthKeys(dateStr).some((key) => !Array.isArray(neisScheduleCache.get(key)));
}

function requestDdayScheduleData(items) {
  if (!settings.school || !Array.isArray(items)) return;
  const requests = [];
  const seen = new Set();
  items.forEach((item) => {
    if (!item || !item.schoolDaysOnly || !item.date) return;
    getDdayScheduleMonthKeys(item.date).forEach((key) => {
      if (seen.has(key) || Array.isArray(neisScheduleCache.get(key))) return;
      seen.add(key);
      const parts = key.split('-').map(Number);
      requests.push({ key, date: new Date(parts[0], parts[1] - 1, 1) });
    });
  });
  if (!requests.length) return;
  const schoolKey = settings.school.schoolCode || settings.school.schoolName || '';
  const requestKey = schoolKey + '|' + requests.map((r) => r.key).sort().join('|');
  if (requestKey === lastDdayScheduleRequestKey) return;
  lastDdayScheduleRequestKey = requestKey;

  Promise.all(requests.map((r) => ensureNeisSchedule(r.key, r.date))).then(() => {
    if (lastDdayScheduleRequestKey === requestKey) lastDdayScheduleRequestKey = '';
    lastFeaturedDdayKey = '';
    if (viewData.activeTab === 'dday') renderDdays();
    updateFeaturedDday();
  }).catch(() => {
    if (lastDdayScheduleRequestKey === requestKey) lastDdayScheduleRequestKey = '';
  });
}

function getNeisEventsForDdayDate(dateKey) {
  if (!settings.school) return [];
  const date = parseDateKey(dateKey);
  if (!date) return [];
  const cached = neisScheduleCache.get(getMonthKey(date));
  if (!Array.isArray(cached)) return [];
  const ymd = dateKeyToYmd(dateKey);
  return cached.filter((event) => event.date === ymd);
}

function getDdayEventText(event) {
  if (!event) return '';
  return [
    event.title,
    event.notice,
    event.eventName,
    event.eventContent,
    event.dayType,
  ].filter(Boolean).join(' ');
}

function isNonSchoolDdayEvent(event) {
  const text = getDdayEventText(event);
  if (!text) return false;
  if (DDAY_SCHOOL_EVENT_EXCEPTIONS.test(text)) return false;
  const dayType = (event.dayType || '').trim();
  if (dayType && !/(해당없음|수업일|등교|정상)/.test(dayType)) return true;
  return DDAY_NON_SCHOOL_KEYWORDS.test(text);
}

function isSchoolDayForDday(date) {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  const dateKey = formatDateKey(date);
  if (getAcademicEvents().some((event) => event.date === dateKey && isNonSchoolDdayEvent(event))) {
    return false;
  }
  return !getNeisEventsForDdayDate(dateKey).some(isNonSchoolDdayEvent);
}

function formatDdayDiffLabel(diffDays) {
  if (diffDays === 0) return 'D-DAY';
  if (diffDays > 0) return 'D-' + diffDays;
  return 'D+' + Math.abs(diffDays);
}

function computeCalendarDdayDiff(dateStr) {
  const target = parseDateKey(dateStr);
  if (!target) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target - today) / 86400000);
  return {
    diff: diffDays,
    rawDiff: diffDays,
    label: formatDdayDiffLabel(diffDays),
    isToday: diffDays === 0,
    isPast: diffDays < 0,
    schoolDaysOnly: false,
    pending: false,
    basisLabel: '날짜 기준',
  };
}

function computeSchoolDayDdayDiff(dateStr) {
  const target = parseDateKey(dateStr);
  if (!target) return null;
  const targetKey = formatDateKey(target);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const rawDiff = Math.round((target - today) / 86400000);
  if (rawDiff === 0) {
    return {
      diff: 0,
      rawDiff,
      label: 'D-DAY',
      isToday: true,
      isPast: false,
      schoolDaysOnly: true,
      pending: hasPendingDdaySchedule(dateStr),
      basisLabel: settings.school ? '등교일 기준' : '평일 기준',
    };
  }

  const step = rawDiff > 0 ? 1 : -1;
  let cursor = new Date(today);
  let schoolDayCount = 0;
  let guard = 0;
  while (formatDateKey(cursor) !== targetKey && guard < 1500) {
    cursor = addDays(cursor, step);
    if (isSchoolDayForDday(cursor)) schoolDayCount += step;
    guard++;
  }

  return {
    diff: schoolDayCount,
    rawDiff,
    label: formatDdayDiffLabel(schoolDayCount),
    isToday: schoolDayCount === 0,
    isPast: rawDiff < 0,
    schoolDaysOnly: true,
    pending: hasPendingDdaySchedule(dateStr),
    basisLabel: settings.school ? '등교일 기준' : '평일 기준',
  };
}

function computeDdayDiff(dateStr, item) {
  if (item && item.schoolDaysOnly) return computeSchoolDayDdayDiff(dateStr);
  return computeCalendarDdayDiff(dateStr);
}

function sortedDdays() {
  return getDdays().slice().sort((a, b) => {
    const da = computeDdayDiff(a.date, a);
    const db = computeDdayDiff(b.date, b);
    const va = da ? da.diff : Number.MAX_SAFE_INTEGER;
    const vb = db ? db.diff : Number.MAX_SAFE_INTEGER;
    // upcoming first (smallest positive), then today, then past (largest negative shows last)
    const ka = va >= 0 ? va : 1e9 - va;
    const kb = vb >= 0 ? vb : 1e9 - vb;
    return ka - kb;
  });
}

function renderDdays() {
  const container = document.getElementById('ddayContainer');
  if (!container) return;
  container.innerHTML = '';
  requestDdayScheduleData(getDdays());
  const list = sortedDdays();
  if (!list.length) {
    const empty = document.createElement('div');
    empty.className = 'dday-empty';
    empty.textContent = '아직 등록된 디데이가 없어요. 위에서 추가해보세요!';
    container.appendChild(empty);
    return;
  }
  list.forEach(item => {
    const diff = computeDdayDiff(item.date, item);
    const card = document.createElement('div');
    card.className = 'dday-card';
    if (viewData.featuredDdayId === item.id) card.classList.add('featured');
    if (item.schoolDaysOnly) card.classList.add('school-days');
    if (diff && diff.isPast) card.classList.add('past');

    const starBtn = document.createElement('button');
    starBtn.className = 'dday-star-btn';
    starBtn.type = 'button';
    starBtn.innerHTML = viewData.featuredDdayId === item.id ? '&#9733;' : '&#9734;';
    starBtn.title = viewData.featuredDdayId === item.id ? '대표 해제' : '대표 디데이로 지정';
    if (viewData.featuredDdayId === item.id) starBtn.classList.add('active');
    starBtn.onclick = () => toggleFeaturedDday(item.id);

    const info = document.createElement('div');
    info.className = 'dday-info';

    const titleRow = document.createElement('div');
    titleRow.className = 'dday-title-row';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'dday-title-input';
    titleInput.value = item.title;
    titleInput.maxLength = 40;
    titleInput.addEventListener('blur', () => updateDdayTitle(item.id, titleInput.value));
    titleInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); titleInput.blur(); } });
    titleRow.appendChild(titleInput);

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.className = 'dday-date-input';
    dateInput.value = item.date;
    dateInput.addEventListener('change', () => updateDday(item.id, { date: dateInput.value }));

    const schoolDayToggle = document.createElement('label');
    schoolDayToggle.className = 'dday-schoolday-toggle';
    const schoolDayCheck = document.createElement('input');
    schoolDayCheck.type = 'checkbox';
    schoolDayCheck.checked = !!item.schoolDaysOnly;
    schoolDayCheck.addEventListener('change', () => updateDday(item.id, { schoolDaysOnly: schoolDayCheck.checked }));
    const schoolDayText = document.createElement('span');
    schoolDayText.textContent = '등교일 기준';
    schoolDayToggle.appendChild(schoolDayCheck);
    schoolDayToggle.appendChild(schoolDayText);

    const metaRow = document.createElement('div');
    metaRow.className = 'dday-meta-row';
    metaRow.appendChild(dateInput);
    metaRow.appendChild(schoolDayToggle);

    info.appendChild(titleRow);
    info.appendChild(metaRow);

    const countWrap = document.createElement('div');
    countWrap.className = 'dday-count-wrap';
    const count = document.createElement('div');
    count.className = 'dday-count';
    if (diff) {
      count.textContent = diff.label;
      if (diff.isToday) count.classList.add('today');
      else if (diff.isPast) count.classList.add('past');
    } else {
      count.textContent = '-';
    }
    countWrap.appendChild(count);
    if (diff && item.schoolDaysOnly) {
      const basis = document.createElement('div');
      basis.className = 'dday-count-basis' + (diff.pending ? ' pending' : '');
      basis.textContent = diff.pending ? '나이스 확인 중' : diff.basisLabel;
      countWrap.appendChild(basis);
    }

    const del = document.createElement('button');
    del.className = 'dday-delete-btn';
    del.type = 'button';
    del.innerHTML = '&#10005;';
    del.title = '삭제';
    del.onclick = () => removeDday(item.id);

    card.appendChild(starBtn);
    card.appendChild(info);
    card.appendChild(countWrap);
    card.appendChild(del);
    container.appendChild(card);
  });
}

function addDdayFromForm() {
  const titleEl = document.getElementById('ddayTitleInput');
  const dateEl = document.getElementById('ddayDateInput');
  const schoolDayEl = document.getElementById('ddaySchoolDaysOnlyInput');
  const title = (titleEl?.value || '').trim().slice(0, 40);
  const date = (dateEl?.value || '').trim();
  if (!title) { showToast('디데이 제목을 입력해주세요'); return; }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) { showToast('날짜를 선택해주세요'); return; }
  if (date < formatDateKey(new Date())) { showToast('지난 디데이는 자동 삭제돼요'); return; }
  addDday(title, date, { setFeaturedIfFirst: true, schoolDaysOnly: !!schoolDayEl?.checked });
  if (titleEl) titleEl.value = '';
  if (dateEl) dateEl.value = '';
  showToast('디데이가 추가되었어요');
}

function addDday(title, date, opts) {
  const ddays = getDdays();
  const item = { id: generateDdayId(), title: title.slice(0, 40), date, schoolDaysOnly: !!(opts && opts.schoolDaysOnly) };
  ddays.push(item);
  if (opts && opts.setFeaturedIfFirst && !viewData.featuredDdayId) {
    viewData.featuredDdayId = item.id;
  }
  saveViewData();
  renderDdays();
  updateFeaturedDday();
  return item;
}

function updateDdayTitle(id, rawTitle) {
  const item = getDdays().find(d => d.id === id);
  if (!item) return;
  const t = (rawTitle || '').trim().slice(0, 40);
  if (!t || t === item.title) return;
  item.title = t;
  saveViewData();
  lastFeaturedDdayKey = '';
  updateFeaturedDday();
}

function updateDday(id, patch) {
  const ddays = getDdays();
  const item = ddays.find(d => d.id === id);
  if (!item) return;
  if (typeof patch.title === 'string') {
    const t = patch.title.trim().slice(0, 40);
    if (t) item.title = t;
  }
  if (typeof patch.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(patch.date)) {
    item.date = patch.date;
  }
  if (typeof patch.schoolDaysOnly === 'boolean') {
    item.schoolDaysOnly = patch.schoolDaysOnly;
    lastFeaturedDdayKey = '';
  }
  saveViewData();
  const removed = prunePastDdays(new Date(), { force: true });
  if (removed && !getDdays().some(d => d.id === id)) {
    showToast('지난 디데이는 자동 삭제되었어요');
    return;
  }
  renderDdays();
  updateFeaturedDday();
}

function removeDday(id) {
  if (!confirm('이 디데이를 삭제할까요?')) return;
  viewData.ddays = getDdays().filter(d => d.id !== id);
  if (viewData.featuredDdayId === id) viewData.featuredDdayId = '';
  saveViewData();
  renderDdays();
  updateFeaturedDday();
  showToast('디데이가 삭제되었어요');
}

function toggleFeaturedDday(id) {
  if (viewData.featuredDdayId === id) {
    viewData.featuredDdayId = '';
    showToast('대표 디데이 표시를 해제했어요');
  } else {
    viewData.featuredDdayId = id;
    showToast('대표 디데이로 지정했어요');
  }
  saveViewData();
  renderDdays();
  updateFeaturedDday();
}

function addDdayFromAcademicEvent(eventDate) {
  const event = getAcademicEventByDate(eventDate);
  if (!event) return;
  if (event.date < formatDateKey(new Date())) {
    showToast('지난 일정은 디데이로 추가할 수 없어요');
    return;
  }
  const existing = getDdays().find(d => d.date === event.date && d.title === event.title);
  if (existing) {
    showToast('이미 등록된 디데이예요');
    return;
  }
  addDday(event.title, event.date, { setFeaturedIfFirst: true });
  showToast('학사일정을 디데이로 추가했어요');
  renderAcademicEventList();
}

function removeDdayFromAcademicEvent(eventDate) {
  const event = getAcademicEventByDate(eventDate);
  if (!event) return;
  const existing = getDdays().find(d => d.date === event.date && d.title === event.title);
  if (!existing) return;
  viewData.ddays = getDdays().filter(d => d.id !== existing.id);
  if (viewData.featuredDdayId === existing.id) viewData.featuredDdayId = '';
  saveViewData();
  renderDdays();
  updateFeaturedDday();
  renderAcademicEventList();
  showToast('학사일정 디데이를 해제했어요');
}

function toggleDdayFromAcademicEvent(eventDate) {
  const event = getAcademicEventByDate(eventDate);
  if (!event) return;
  const existing = getDdays().find(d => d.date === event.date && d.title === event.title);
  if (existing) {
    removeDdayFromAcademicEvent(eventDate);
  } else {
    addDdayFromAcademicEvent(eventDate);
  }
}

function updateFeaturedDday() {
  const el = document.getElementById('featuredDday');
  if (!el) return;
  const panel = document.getElementById('leftPanel');
  const id = viewData.featuredDdayId;
  const item = id ? getDdays().find(d => d.id === id) : null;
  if (!item) {
    if (panel) panel.classList.remove('has-featured-dday');
    el.classList.remove('school-days');
    el.style.display = 'none';
    el.textContent = '';
    lastFeaturedDdayKey = '';
    return;
  }
  requestDdayScheduleData([item]);
  const diff = computeDdayDiff(item.date, item);
  if (!diff) {
    if (panel) panel.classList.remove('has-featured-dday');
    el.classList.remove('school-days');
    el.style.display = 'none';
    el.textContent = '';
    lastFeaturedDdayKey = '';
    return;
  }
  if (panel) panel.classList.add('has-featured-dday');
  el.classList.toggle('school-days', !!item.schoolDaysOnly);
  const key = item.id + '|' + item.title + '|' + item.date + '|' + !!item.schoolDaysOnly + '|' + diff.label + '|' + diff.pending;
  if (key === lastFeaturedDdayKey) return;
  lastFeaturedDdayKey = key;
  el.textContent = '';
  const title = document.createElement('span');
  title.className = 'featured-dday-title';
  title.textContent = item.title;
  const count = document.createElement('span');
  count.className = 'featured-dday-count' + (diff.isToday ? ' today' : (diff.isPast ? ' past' : ''));
  count.textContent = diff.label;
  el.appendChild(title);
  if (item.schoolDaysOnly) {
    const mode = document.createElement('span');
    mode.className = 'featured-dday-mode' + (diff.pending ? ' pending' : '');
    mode.textContent = diff.pending ? '확인 중' : '등교일';
    el.appendChild(mode);
  }
  el.appendChild(count);
  el.style.display = '';
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
// CHIME (수업 시작/종료 알림음)
// =============================================
function initAudio() {
  const unlock = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    document.removeEventListener('click', unlock);
  };
  document.addEventListener('click', unlock);
}

function playChimeNotes(notes) {
  if (!audioCtx) return;
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

function playChime() {
  if (!audioCtx || !settings.chimeEnabled) return;
  const now = Date.now();
  if (now - lastChimeTime < 60000) return;
  lastChimeTime = now;
  playChimeNotes([523.25, 659.25, 783.99]); // C5, E5, G5 (상승)
}

function playEndChime() {
  if (!audioCtx || !settings.chimeEndEnabled) return;
  const now = Date.now();
  if (now - lastEndChimeTime < 60000) return;
  lastEndChimeTime = now;
  playChimeNotes([783.99, 659.25, 523.25]); // G5, E5, C5 (하강)
}

function toggleChime() {
  settings.chimeEnabled = document.getElementById('chimeToggle').checked;
  saveSettings();
}

function toggleChimeEnd() {
  settings.chimeEndEnabled = document.getElementById('chimeEndToggle').checked;
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
  renderQuickTimetableShortcutState();

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
      lastTimetableMin = -1;
      if (settings.timetableMode) renderTimetableDisplay();
      updateClock();
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
  if (event && (event.timetableOverride || (!event.quickOnly && event.timetable.length))) {
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
  prunePastDdays(n);
  renderQuickTimetableShortcutState();
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
  checkNotebookDateRollover();
  updateAcademicEventBanner(n);
  updateFeaturedDday();

  // Period alert with optional remaining time
  const period = getCurrentPeriod(n);
  const alertEl = document.getElementById('periodAlert');
  alertEl.className = 'period-alert ' + period.type;

  // Chime on period transition (수업 시작/종료 시)
  if (lastPeriodLabel !== null && lastPeriodLabel !== period.label) {
    if (period.type === 'in-class') {
      playChime();
    } else if (lastPeriodType === 'in-class') {
      playEndChime();
    }
  }
  lastPeriodLabel = period.label;
  lastPeriodType = period.type;

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
  const panel = document.getElementById('leftPanel');
  const manualEvent = getAcademicEventByDate(formatDateKey(now));

  let source = 'manual';
  let title = '';
  let body = '';
  if (manualEvent && !(manualEvent.quickOnly && !manualEvent.notice)) {
    title = manualEvent.title;
    body = manualEvent.notice || '';
  } else {
    const neisEvent = getNeisEventForToday(now);
    if (neisEvent) {
      source = 'neis';
      title = neisEvent.eventName;
      body = neisEvent.eventContent || '';
    }
  }

  if (!title) {
    if (panel) panel.classList.remove('has-academic-event');
    banner.classList.remove('show');
    banner.classList.remove('neis-source');
    banner.textContent = '';
    return;
  }

  if (panel) panel.classList.add('has-academic-event');
  banner.textContent = '';
  banner.classList.toggle('neis-source', source === 'neis');
  const titleEl = document.createElement('span');
  titleEl.className = 'academic-event-title';
  titleEl.textContent = title;
  banner.appendChild(titleEl);

  const bodyEl = document.createElement('span');
  bodyEl.className = 'academic-event-body';
  const lines = (body || '').split('\n');
  lines.forEach((line, index) => {
    if (!line && index === 0 && source === 'neis') return;
    if (index > 0) bodyEl.appendChild(document.createElement('br'));
    bodyEl.appendChild(document.createTextNode(line));
  });
  if (bodyEl.textContent.trim()) banner.appendChild(bodyEl);
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
  const assignmentRoster = document.getElementById('assignmentRosterDrawer');
  if (assignmentRoster && assignmentRoster.classList.contains('open')) {
    closeAssignmentRoster();
    return;
  }
  if (document.getElementById('notebookFullscreen').classList.contains('open')) {
    closeNotebookFullscreen();
    return;
  }
  const classroomTools = document.getElementById('classroomTools');
  if (classroomTools && classroomTools.classList.contains('open')) {
    closeClassroomTools();
    return;
  }
  if (viewData.activeTab === 'notebook' && viewData.notebookPanelFill) {
    toggleNotebookPanelFill();
    return;
  }
  const modalsByPriority = [
    { id: 'updateNotification', close: dismissUpdateNotification },
    { id: 'assignmentModal', close: closeAssignmentModal },
    { id: 'timerModal', close: closeTimer },
    { id: 'randomPickerModal', close: closeRandomPicker },
    { id: 'quickTimetableModal', close: closeQuickTimetableEditor },
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
  if (!e.target.closest('.classroom-tools')) {
    closeClassroomTools();
  }
  if (!e.target.closest('.notebook-color-btn') && !e.target.closest('.notebook-palette')) {
    document.querySelectorAll('.notebook-palette').forEach(function(p) { p.classList.remove('open'); });
  }
  if (!e.target.closest('.notebook-fontsize-wrap')) {
    document.querySelectorAll('.notebook-fontsize-dropdown').forEach(function(d) { d.classList.remove('open'); });
  }
});

// =============================================
// VISITOR COUNTER (Firebase Realtime Database)
// =============================================
var firebaseDB = (function() {
  firebase.initializeApp({
    databaseURL: 'https://classroom-counter-default-rtdb.asia-southeast1.firebasedatabase.app'
  });
  return firebase.database();
})();

function initVisitorCounter() {
  var today = new Date().toISOString().slice(0, 10);
  var totalRef = firebaseDB.ref('counter/total');
  var todayRef = firebaseDB.ref('counter/today/' + today);

  // One-time migration: move old localStorage total into Firebase
  var migrated = localStorage.getItem('classroomFirebaseMigrated');
  if (!migrated) {
    var oldTotal = 0;
    try {
      var old = JSON.parse(localStorage.getItem('classroomVisitorCounter') || '{}');
      oldTotal = old.totalCount || 0;
    } catch(e) {}
    if (oldTotal > 0) {
      firebaseDB.ref('counter/migrationBaseline').transaction(function(current) {
        // Only set baseline once (first browser to migrate wins)
        return current === null ? oldTotal : current;
      });
    }
    localStorage.setItem('classroomFirebaseMigrated', '1');
  }

  // Increment on new session (not refresh)
  var isNewSession = !sessionStorage.getItem('classroomSessionActive');
  if (isNewSession) {
    sessionStorage.setItem('classroomSessionActive', '1');
    Promise.all([
      totalRef.transaction(function(current) { return (current || 0) + 1; }),
      todayRef.transaction(function(current) { return (current || 0) + 1; })
    ]).then(function() {
      readAndDisconnect(today);
    });
  } else {
    readAndDisconnect(today);
  }
}

function readAndDisconnect(today) {
  firebaseDB.ref('counter').once('value', function(snapshot) {
    var data = snapshot.val() || {};
    var baseline = data.migrationBaseline || 0;
    var total = (data.total || 0) + baseline;
    var todayCount = (data.today && data.today[today]) || 0;
    document.getElementById('totalCount').textContent = total;
    document.getElementById('todayCount').textContent = todayCount;
    firebaseDB.goOffline();
  });
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
  closeClassroomTools();
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
  lastDdayScheduleRequestKey = '';
  renderSchoolCurrent();
  const results = document.getElementById('schoolResults');
  if (results) results.textContent = '';
  const input = document.getElementById('schoolSearchInput');
  if (input) input.value = '';
  showToast(settings.school.schoolName + ' 선택됨');
  updateAcademicEventBanner(new Date());
  lastFeaturedDdayKey = '';
  renderDdays();
  updateFeaturedDday();
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
  lastDdayScheduleRequestKey = '';
  renderSchoolCurrent();
  renderNeisSchedulePreview();
  updateAcademicEventBanner(new Date());
  lastFeaturedDdayKey = '';
  renderDdays();
  updateFeaturedDday();
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
  lastDdayScheduleRequestKey = '';
  lastFeaturedDdayKey = '';
  renderDdays();
  updateFeaturedDday();
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
renderTimer();
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
timerWorker.onmessage = () => {
  updateClock();
  updateTimer();
};

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
