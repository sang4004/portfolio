import { projectDetails } from './projectDetails.js';
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

// Lightweight enhancements only — Apple's design ethos: chrome recedes.
// 1) Smooth-scroll for in-page anchors
// 2) Subtle "current section" pill in sub-nav based on viewport intersection

(function () {
  // Smooth scroll for hash links (offset for sticky nav stack: 44 + 52 = 96)
  const NAV_OFFSET = 96;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 1;
      window.scrollTo({ top, behavior: "smooth" });
      // Update hash without jumping
      history.replaceState(null, "", id);
    });
  });

  // Update sub-nav category label based on which section is in view
  const subCategory = document.querySelector(".sub-nav__category");
  if (!subCategory) return;

  const labels = {
    top: "Portfolio",
    about: "About",
    mind: "Developer Mind",
    career: "Career",
    stacks: "Stacks",
    projects: "Projects",
    approach: "일하는 방식",
    experiences: "Experiences",
    contact: "Contact",
  };

  const sections = Object.keys(labels)
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      // Pick the entry with the largest intersection ratio that's intersecting
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      const next = labels[id];
      if (next && subCategory.textContent !== next) {
        subCategory.textContent = next;
      }
    },
    {
      // Bias the trigger to roughly the center of the viewport, accounting for sticky nav
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((s) => io.observe(s));
})();

// ----- MODAL LOGIC -------------------------------------------------------- //
(function () {
  const overlay = document.getElementById('projectModal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');
  const titleEl = document.getElementById('modalTitle');
  const contentEl = document.getElementById('modalContent');
  const body = document.body;

  const projectTitles = {
    hsad: 'HSAD AI Agent 상세 회고록',
    lg: 'LG전자 리테일 관리 시스템 상세 회고록',
    hd: 'HD현대채용 상세 회고록',
    skt: 'SKT LLM RAG 평가툴 상세 회고록',
    cu: 'CU 가맹점주 사이트 상세 회고록',
    raonark: '라오나크 도소매점 상세 회고록',
    tongyeong: '통영에코파워 사내 시스템 상세 회고록'
  };

  function openModal(projectId) {
    if (!projectDetails[projectId]) return;
    
    titleEl.textContent = projectTitles[projectId];
    // Convert Markdown to HTML before injecting
    contentEl.innerHTML = marked.parse(projectDetails[projectId]);
    
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    
    // Slight delay to clear content after fade out animation
    setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        contentEl.innerHTML = '';
      }
    }, 300);
  }

  // Bind click events to detail buttons and utility cards
  document.querySelectorAll('[data-project]').forEach(el => {
    el.addEventListener('click', (e) => {
      // Prevent trigger if they are selecting text or something, but fine for now
      const projectId = el.getAttribute('data-project');
      openModal(projectId);
    });
    // Add keyboard support for elements with role="button"
    if (el.getAttribute('role') === 'button') {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const projectId = el.getAttribute('data-project');
          openModal(projectId);
        }
      });
    }
  });

  // Close on button click
  closeBtn.addEventListener('click', closeModal);

  // Close on background overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
})();
