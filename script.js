/*
  ========================================================================
  [관광 안내 웹사이트 메인 자바스크립트]
  - 상단 내비게이션 바 반응형 및 스크롤 이벤트
  - 하단 우측 고정 '홈으로' 버튼 스무스 스크롤 제어
  - 모바일 드로어 메뉴 토글 및 드롭다운 제어
  ========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const floatingHomeBtn = document.getElementById('floatingHomeBtn');
  const dropdownItems = document.querySelectorAll('.has-dropdown');

  /* ---------------------------------------------------------------------
   * 1. 상단 내비게이션 바 스크롤 효과 & 홈 버튼 표시 제어
   * --------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // 상단 50px 이상 스크롤 시 내비게이션 스타일 변경
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 상단 300px 이상 스크롤 시 우측 하단 홈 버튼 표시
    if (scrollY > 300) {
      floatingHomeBtn.classList.add('visible');
    } else {
      floatingHomeBtn.classList.remove('visible');
    }
  });

  /* ---------------------------------------------------------------------
   * 2. 우측 하단 홈 버튼 클릭 시 최상단 홈으로 이동
   * --------------------------------------------------------------------- */
  floatingHomeBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ---------------------------------------------------------------------
   * 3. 모바일 반응형 햄버거 토글 버튼
   * --------------------------------------------------------------------- */
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    mobileToggle.innerHTML = isExpanded 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  /* ---------------------------------------------------------------------
   * 4. 모바일 화면에서 드롭다운 메뉴 토글 동작
   * --------------------------------------------------------------------- */
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      // 모바일 너비(768px 이하)일 때 드롭다운 서브메뉴 토글
      if (window.innerWidth <= 768) {
        // 링크 기본 이동 동작 방지 후 서브메뉴 열기/닫기
        item.classList.toggle('open');
      }
    });
  });

  /* ---------------------------------------------------------------------
   * 5. 메뉴 링크 클릭 시 모바일 드로어 닫기 및 스무스 스크롤
   * --------------------------------------------------------------------- */
  const allNavLinks = document.querySelectorAll('.dropdown-menu a, .nav-logo, .hero-buttons a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // 모바일 메뉴가 열려 있다면 클릭 시 닫기
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }

      // 앵커 링크(#)가 포함되어 있을 경우 부드러운 스크롤 이동
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
