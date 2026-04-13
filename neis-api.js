// =============================================
// NEIS OPEN API 모듈
// =============================================
// 나이스 교육정보 개방 포털 (https://open.neis.go.kr) 연동 전용 모듈.
// 이 파일 하나만 교체하면 백엔드 프록시(B 방법)로 전환 가능하도록 분리.
//
// 주의: 현재 public 저장소 + 클라이언트 사이드 JS 구조이므로 API 키가
// 소스에 노출됩니다. NEIS Open API는 공개 공공데이터 읽기 전용이라 이 구조로
// 운영하는 사례가 일반적이며, 남용 시 키만 재발급하면 됩니다.
const NEIS = (function () {
  const BASE_URL = 'https://open.neis.go.kr/hub';
  const API_KEY = '78dcaba9309e4759b694cdaa5aeaf22f';

  const cache = {
    schools: new Map(),
    meals: new Map(),
    schedules: new Map(),
  };

  function buildUrl(endpoint, params) {
    const url = new URL(BASE_URL + '/' + endpoint);
    url.searchParams.set('KEY', API_KEY);
    url.searchParams.set('Type', 'json');
    url.searchParams.set('pIndex', '1');
    url.searchParams.set('pSize', String(params.pSize || 100));
    Object.keys(params).forEach((k) => {
      if (k === 'pSize') return;
      const v = params[k];
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    });
    return url.toString();
  }

  async function callApi(endpoint, params) {
    const res = await fetch(buildUrl(endpoint, params));
    if (!res.ok) throw new Error('NEIS 요청 실패: HTTP ' + res.status);
    const data = await res.json();

    if (data.RESULT) {
      const code = data.RESULT.CODE;
      if (code === 'INFO-200') return [];
      throw new Error('NEIS 오류: ' + (data.RESULT.MESSAGE || code));
    }

    const result = data[endpoint];
    if (!Array.isArray(result)) return [];
    for (const block of result) {
      if (block && Array.isArray(block.row)) return block.row;
    }
    return [];
  }

  async function searchSchools(schoolName) {
    const q = (schoolName || '').trim();
    if (!q) return [];
    if (cache.schools.has(q)) return cache.schools.get(q);
    const rows = await callApi('schoolInfo', { SCHUL_NM: q, pSize: 50 });
    const normalized = rows.map((r) => ({
      officeCode: r.ATPT_OFCDC_SC_CODE,
      officeName: r.ATPT_OFCDC_SC_NM,
      schoolCode: r.SD_SCHUL_CODE,
      schoolName: r.SCHUL_NM,
      schoolType: r.SCHUL_KND_SC_NM,
      location: r.LCTN_SC_NM,
      address: (r.ORG_RDNMA || '').trim(),
    }));
    cache.schools.set(q, normalized);
    return normalized;
  }

  async function getMealInfo(school, ymd) {
    if (!school || !school.officeCode || !school.schoolCode) {
      throw new Error('학교 정보가 없습니다.');
    }
    const key = school.officeCode + '|' + school.schoolCode + '|' + ymd;
    if (cache.meals.has(key)) return cache.meals.get(key);
    const rows = await callApi('mealServiceDietInfo', {
      ATPT_OFCDC_SC_CODE: school.officeCode,
      SD_SCHUL_CODE: school.schoolCode,
      MLSV_YMD: ymd,
      pSize: 10,
    });
    const normalized = rows.map((r) => ({
      date: r.MLSV_YMD,
      mealName: r.MMEAL_SC_NM,
      mealCode: r.MMEAL_SC_CODE,
      dishes: parseMenuItems(r.DDISH_NM, true),
      dishesRaw: parseMenuItems(r.DDISH_NM, false),
      calorie: r.CAL_INFO || '',
      origin: r.ORPLC_INFO || '',
    }));
    normalized.sort((a, b) => Number(a.mealCode || 0) - Number(b.mealCode || 0));
    cache.meals.set(key, normalized);
    return normalized;
  }

  async function getSchoolSchedule(school, fromYmd, toYmd) {
    if (!school || !school.officeCode || !school.schoolCode) {
      throw new Error('학교 정보가 없습니다.');
    }
    const key = school.officeCode + '|' + school.schoolCode + '|' + fromYmd + '|' + toYmd;
    if (cache.schedules.has(key)) return cache.schedules.get(key);
    const rows = await callApi('SchoolSchedule', {
      ATPT_OFCDC_SC_CODE: school.officeCode,
      SD_SCHUL_CODE: school.schoolCode,
      AA_FROM_YMD: fromYmd,
      AA_TO_YMD: toYmd,
      pSize: 200,
    });
    const normalized = rows
      .map((r) => ({
        date: r.AA_YMD,
        eventName: (r.EVENT_NM || '').trim(),
        eventContent: (r.EVENT_CNTNT || '').trim(),
        dayType: r.SBTR_DD_SC_NM || '',
      }))
      .filter((e) => e.date && e.eventName);
    cache.schedules.set(key, normalized);
    return normalized;
  }

  function parseMenuItems(ddishHtml, stripAllergens) {
    if (!ddishHtml) return [];
    return ddishHtml
      .split(/<br\s*\/?>/i)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((item) => (stripAllergens ? item.replace(/\s*\(\s*[\d.\s]+\s*\)\s*$/, '').trim() : item));
  }

  function todayYmd(date) {
    const d = date || new Date();
    return (
      d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0')
    );
  }

  function monthRange(date) {
    const d = date || new Date();
    const y = d.getFullYear();
    const m = d.getMonth();
    const from = new Date(y, m, 1);
    const to = new Date(y, m + 1, 0);
    return { from: todayYmd(from), to: todayYmd(to) };
  }

  function clearCache() {
    cache.schools.clear();
    cache.meals.clear();
    cache.schedules.clear();
  }

  return {
    searchSchools,
    getMealInfo,
    getSchoolSchedule,
    parseMenuItems,
    todayYmd,
    monthRange,
    clearCache,
  };
})();
