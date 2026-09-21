/**
 * 장시훈의 한 페이지 · 인터랙션 스크립트 (script.js)
 * - T01-C18: 브라우저 콘솔 오류 0건 보장 (견고한 예외 방어 로직)
 * - T01-C19 ~ T01-C21: 마우스 클릭 및 키보드(Tab + Enter/Space) 완벽 지원
 * - 다크 / 라이트 모드 테마 스위처 (로컬 스토리지 연동 및 ARIA 피드백)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. 근거 메모 아코디언 토글 (T01-C09, T01-C19 ~ T01-C21)
     ------------------------------------------------------------------------ */
  const evidenceButtons = document.querySelectorAll('.evidence-toggle');

  evidenceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const controlsId = button.getAttribute('aria-controls');
      if (!controlsId) return;

      const panel = document.getElementById(controlsId);
      if (!panel) return;

      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;

      // 상태 변경
      button.setAttribute('aria-expanded', String(nextExpanded));
      panel.hidden = !nextExpanded;

      // 텍스트 및 기호 업데이트
      const textSpan = button.querySelector('.toggle-text');
      const symbolSpan = button.querySelector('.toggle-symbol');

      if (textSpan) {
        textSpan.textContent = nextExpanded ? '근거 메모 닫기' : '근거 메모 보기';
      }
      if (symbolSpan) {
        symbolSpan.textContent = nextExpanded ? '−' : '+';
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. 다크 / 라이트 모드 전환 스위처 (접근성 및 키보드 지원)
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    // 저장된 테마 불러오기 또는 기본 다크 모드
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (!themeToggle) return;

    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', `테마 전환 (현재: ${isDark ? '다크 모드' : '라이트 모드'})`);

    const iconSpan = themeToggle.querySelector('.theme-icon');
    const textSpan = themeToggle.querySelector('.theme-text');

    if (iconSpan) {
      iconSpan.textContent = isDark ? '☀' : '🌙';
    }
    if (textSpan) {
      textSpan.textContent = isDark ? '라이트 모드' : '다크 모드';
    }
  }
});
