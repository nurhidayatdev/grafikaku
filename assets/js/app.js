// GrafikaKu Main Application & Routing Logic
// Sesuai Standar Uji Kompetensi GrafikaKu (F01 - F14)

const validViews = ['beranda', 'cptp', 'modul1', 'modul2', 'modul3', 'latihan', 'kuis'];

// --- LocalStorage State Management ---
function isModul2Unlocked() {
  return localStorage.getItem('grafikaku_modul2_unlocked') === 'true';
}

function getVisitedPrinciples() {
  try {
    const raw = localStorage.getItem('grafikaku_visited_principles');
    return raw ? JSON.parse(raw) : [0]; // default index 0 (Unity) visited
  } catch(e) {
    return [0];
  }
}

function markPrincipleVisited(index) {
  const visited = getVisitedPrinciples();
  if (!visited.includes(index)) {
    visited.push(index);
    localStorage.setItem('grafikaku_visited_principles', JSON.stringify(visited));
    updateProgressUI();
  }
}

function updateProgressUI() {
  const visited = getVisitedPrinciples();
  const total = (typeof principlesData !== 'undefined') ? principlesData.length : 9;
  const count = visited.length;
  const pct = Math.round((count / total) * 100);

  // Update Modul 1 card progress in Beranda
  const m1Text = document.getElementById('mod1ProgressText');
  const m1Bar = document.getElementById('mod1ProgressBar');
  if (m1Text) m1Text.textContent = `${pct}% (${count}/${total} Prinsip)`;
  if (m1Bar) m1Bar.style.width = pct + '%';

  // Overall banner or badges if exist
  const homeVisitedCount = document.getElementById('homeVisitedCount');
  if (homeVisitedCount) homeVisitedCount.textContent = count;
}

function updateUnlockUI() {
  const unlocked = isModul2Unlocked();
  
  // Modul 2 Card & Badge in Beranda
  const m2Card = document.getElementById('modul2Card');
  const m2Badge = document.getElementById('modul2Badge');
  const m2Text = document.getElementById('modul2ProgressText');
  const m2Bar = document.getElementById('modul2ProgressBar');

  // Modul 3 Card & Badge in Beranda
  const m3Card = document.getElementById('modul3Card');
  const m3Badge = document.getElementById('modul3Badge');
  const m3Text = document.getElementById('modul3ProgressText');
  const m3Bar = document.getElementById('modul3ProgressBar');

  if (unlocked) {
    if (m2Card) m2Card.classList.remove('locked');
    if (m2Badge) {
      m2Badge.className = 'status-pill open';
      m2Badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Terbuka';
    }
    if (m2Text) m2Text.textContent = 'Siap Dipelajari';
    if (m2Bar) m2Bar.style.width = '10%';

    if (m3Card) m3Card.classList.remove('locked');
    if (m3Badge) {
      m3Badge.className = 'status-pill open';
      m3Badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Terbuka';
    }
    if (m3Text) m3Text.textContent = 'Siap Dipelajari';
    if (m3Bar) m3Bar.style.width = '10%';
  } else {
    if (m2Card) m2Card.classList.add('locked');
    if (m2Badge) {
      m2Badge.className = 'status-pill locked';
      m2Badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Terkunci';
    }
    if (m2Text) m2Text.textContent = '0% (Terkunci)';
    if (m2Bar) m2Bar.style.width = '0%';

    if (m3Card) m3Card.classList.add('locked');
    if (m3Badge) {
      m3Badge.className = 'status-pill locked';
      m3Badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Terkunci';
    }
    if (m3Text) m3Text.textContent = '0% (Terkunci)';
    if (m3Bar) m3Bar.style.width = '0%';
  }
}

function handleModul2Click() {
  if (isModul2Unlocked()) {
    navigateTo('modul2');
  } else {
    openLockedModal(
      'Modul 2 Terkunci!',
      'Modul 2 (Software Desain Grafis) baru dapat diakses setelah Anda menuntaskan Kuis Evaluasi Modul 1 dengan nilai minimal 75 / 100.'
    );
  }
}

function handleModul3Click() {
  if (isModul2Unlocked()) {
    navigateTo('modul3');
  } else {
    openLockedModal(
      'Modul 3 Terkunci!',
      'Modul 3 (Komunikasi Visual) baru dapat diakses setelah Anda menuntaskan Kuis Evaluasi Modul 1 dengan nilai minimal 75 / 100.'
    );
  }
}

// --- Navigation & View Routing ---
function navigateTo(viewName) {
  if (!validViews.includes(viewName)) viewName = 'beranda';

  // Guard check for Modul 2 & 3
  if ((viewName === 'modul2' || viewName === 'modul3') && !isModul2Unlocked()) {
    openLockedModal(
      'Akses Modul Terkunci!',
      'Selesaikan evaluasi Kuis Modul 1 dengan skor minimal 75 / 100 untuk membuka Modul 2 dan 3.'
    );
    return;
  }

  location.hash = viewName;
}

function showView(viewName) {
  if (!validViews.includes(viewName)) viewName = 'beranda';

  if ((viewName === 'modul2' || viewName === 'modul3') && !isModul2Unlocked()) {
    openLockedModal(
      'Akses Modul Terkunci!',
      'Selesaikan evaluasi Kuis Modul 1 dengan skor minimal 75 / 100 untuk membuka Modul 2 dan 3.'
    );
    location.hash = 'beranda';
    viewName = 'beranda';
  }

  // Toggle active class on section
  document.querySelectorAll('section.view-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === viewName);
  });

  // Toggle active class on nav
  document.querySelectorAll('#mainNav a[data-view]').forEach(a => {
    a.classList.toggle('active', a.dataset.view === viewName);
  });

  const mainNav = document.getElementById('mainNav');
  if (mainNav) mainNav.classList.remove('open');
  window.scrollTo(0, 0);

  // Initialize specific views
  if (viewName === 'beranda') {
    updateProgressUI();
    updateUnlockUI();
  } else if (viewName === 'modul1') {
    renderPrincipleTabs();
    renderPrincipleContent();
  } else if (viewName === 'kuis') {
    renderQuizContainer();
  }
}

window.addEventListener('hashchange', () => {
  showView(location.hash.slice(1));
});

// Mobile Hamburger Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('open');
  });
}

document.querySelectorAll('#mainNav a[data-view]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(a.dataset.view);
  });
});

// --- Modul 1: 9 Prinsip Desain Interaktif (F03 & F04) ---
let currentPrincipleIndex = 0;
let currentBalanceMode = 'simetris';

function renderPrincipleTabs() {
  const container = document.getElementById('principlesTabContainer');
  if (!container || typeof principlesData === 'undefined') return;
  container.innerHTML = '';

  principlesData.forEach((p, idx) => {
    const btn = document.createElement('button');
    btn.className = 'principle-tab' + (idx === currentPrincipleIndex ? ' active' : '');
    btn.innerHTML = `<span>${idx + 1}. ${p.name.split(' ')[0]}</span>`;
    btn.onclick = () => {
      currentPrincipleIndex = idx;
      markPrincipleVisited(idx);
      renderPrincipleTabs();
      renderPrincipleContent();
    };
    container.appendChild(btn);
  });
}

function renderPrincipleContent() {
  if (typeof principlesData === 'undefined') return;
  const p = principlesData[currentPrincipleIndex];
  markPrincipleVisited(currentPrincipleIndex);

  const bc = document.getElementById('modBreadcrumbPrinciple');
  if (bc) bc.textContent = p.name.split(' ')[0];
  const ind = document.getElementById('subtopicIndicator');
  if (ind) ind.textContent = `Prinsip ${currentPrincipleIndex + 1} dari 9`;
  const head = document.getElementById('principleHeading');
  if (head) head.textContent = p.name;
  const desc = document.getElementById('principleDescription');
  if (desc) desc.textContent = p.desc;
  const cap = document.getElementById('canvasCaption');
  if (cap) cap.innerHTML = p.caption;

  const toggleGroup = document.getElementById('balanceToggleGroup');
  if (toggleGroup) toggleGroup.style.display = p.hasToggle ? 'inline-flex' : 'none';

  const tagList = document.getElementById('keywordTagsList');
  if (tagList) {
    tagList.innerHTML = '';
    p.keywords.forEach(kw => {
      const tag = document.createElement('span');
      tag.className = 'keyword-tag';
      tag.textContent = kw;
      tag.style.marginRight = '6px';
      tagList.appendChild(tag);
    });
  }
  const exp = document.getElementById('keywordExplanation');
  if (exp) exp.innerHTML = `<strong>${p.name}:</strong> ${p.explanation}`;

  const rEl = document.getElementById('readingExampleText');
  if (rEl) rEl.textContent = p.reading;
  const aEl = document.getElementById('avoidMistakeText');
  if (aEl) aEl.textContent = p.avoid;

  const dotsCont = document.getElementById('paginationDots');
  if (dotsCont) {
    dotsCont.innerHTML = '';
    principlesData.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = 'dot-item' + (idx === currentPrincipleIndex ? ' active' : '');
      dot.title = principlesData[idx].name;
      dot.onclick = () => {
        currentPrincipleIndex = idx;
        renderPrincipleTabs();
        renderPrincipleContent();
      };
      dotsCont.appendChild(dot);
    });
  }

  const prevBtn = document.getElementById('btnPrevPrinciple');
  if (prevBtn) prevBtn.disabled = (currentPrincipleIndex === 0);
  const nextBtn = document.getElementById('btnNextPrinciple');
  if (nextBtn) nextBtn.disabled = (currentPrincipleIndex === principlesData.length - 1);

  renderArtworkCanvas();
}

function changePrinciple(delta) {
  const newIndex = currentPrincipleIndex + delta;
  if (typeof principlesData !== 'undefined' && newIndex >= 0 && newIndex < principlesData.length) {
    currentPrincipleIndex = newIndex;
    renderPrincipleTabs();
    renderPrincipleContent();
  }
}

function setBalanceMode(mode) {
  currentBalanceMode = mode;
  const bSim = document.getElementById('btnSimetris');
  const bAsim = document.getElementById('btnAsimetris');
  if (bSim) bSim.classList.toggle('active', mode === 'simetris');
  if (bAsim) bAsim.classList.toggle('active', mode === 'asimetris');
  renderArtworkCanvas();
}

function renderArtworkCanvas() {
  if (typeof principlesData === 'undefined') return;
  const p = principlesData[currentPrincipleIndex];
  const holder = document.getElementById('svgArtworkHolder');
  const pin1 = document.getElementById('pin1');
  const pin2 = document.getElementById('pin2');
  const pin3 = document.getElementById('pin3');
  const popover = document.getElementById('annotationBox');
  if (popover) popover.style.display = 'none';

  if (!holder || !pin1 || !pin2 || !pin3) return;

  pin1.style.top = p.pins[0].top; pin1.style.left = p.pins[0].left;
  pin2.style.top = p.pins[1].top; pin2.style.left = p.pins[1].left;
  pin3.style.top = p.pins[2].top; pin3.style.left = p.pins[2].left;

  if (p.id === 'balance') {
    if (currentBalanceMode === 'simetris') {
      holder.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 600 240">
          <rect width="600" height="240" fill="#F8FAFC"/>
          <line x1="300" y1="20" x2="300" y2="220" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 6"/>
          <text x="300" y="234" text-anchor="middle" font-size="12" fill="#64748B" font-family="sans-serif">Sumbu Keseimbangan Simetris</text>
          <circle cx="160" cy="120" r="45" fill="#4338CA" opacity="0.9"/>
          <rect x="80" y="90" width="40" height="60" rx="6" fill="#F59E0B"/>
          <circle cx="440" cy="120" r="45" fill="#4338CA" opacity="0.9"/>
          <rect x="480" y="90" width="40" height="60" rx="6" fill="#F59E0B"/>
        </svg>
      `;
    } else {
      holder.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 600 240">
          <rect width="600" height="240" fill="#F8FAFC"/>
          <line x1="300" y1="20" x2="300" y2="220" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 6"/>
          <text x="300" y="234" text-anchor="middle" font-size="12" fill="#64748B" font-family="sans-serif">Keseimbangan Asimetris (Bobot Setara)</text>
          <circle cx="160" cy="120" r="65" fill="#4338CA"/>
          <circle cx="400" cy="80" r="28" fill="#F59E0B"/>
          <rect x="440" y="110" width="55" height="55" rx="8" fill="#0F766E"/>
          <circle cx="380" cy="160" r="22" fill="#4338CA" opacity="0.75"/>
        </svg>
      `;
    }
  } else if (p.id === 'unity') {
    holder.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 600 240">
        <rect width="600" height="240" fill="#F8FAFC"/>
        <g transform="translate(80, 40)">
          <rect width="120" height="150" rx="8" fill="#EEF2FF" stroke="#4338CA" stroke-width="2"/>
          <circle cx="60" cy="55" r="26" fill="#4338CA"/>
          <line x1="25" y1="100" x2="95" y2="100" stroke="#4338CA" stroke-width="3" stroke-linecap="round"/>
          <line x1="25" y1="115" x2="75" y2="115" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
        </g>
        <g transform="translate(240, 40)">
          <rect width="120" height="150" rx="8" fill="#EEF2FF" stroke="#4338CA" stroke-width="2"/>
          <circle cx="60" cy="55" r="26" fill="#4338CA"/>
          <line x1="25" y1="100" x2="95" y2="100" stroke="#4338CA" stroke-width="3" stroke-linecap="round"/>
          <line x1="25" y1="115" x2="75" y2="115" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
        </g>
        <g transform="translate(400, 40)">
          <rect width="120" height="150" rx="8" fill="#EEF2FF" stroke="#4338CA" stroke-width="2"/>
          <circle cx="60" cy="55" r="26" fill="#4338CA"/>
          <line x1="25" y1="100" x2="95" y2="100" stroke="#4338CA" stroke-width="3" stroke-linecap="round"/>
          <line x1="25" y1="115" x2="75" y2="115" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
        </g>
      </svg>
    `;
  } else if (p.id === 'emphasis') {
    holder.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 600 240">
        <rect width="600" height="240" fill="#F8FAFC"/>
        <circle cx="140" cy="120" r="26" fill="#CBD5E1"/>
        <circle cx="220" cy="120" r="26" fill="#CBD5E1"/>
        <circle cx="300" cy="120" r="58" fill="#4338CA" filter="drop-shadow(0 6px 12px rgba(67,56,202,0.3))"/>
        <text x="300" y="126" text-anchor="middle" fill="#FFFFFF" font-weight="bold" font-size="14">FOKUS</text>
        <circle cx="380" cy="120" r="26" fill="#CBD5E1"/>
        <circle cx="460" cy="120" r="26" fill="#CBD5E1"/>
      </svg>
    `;
  } else {
    holder.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 600 240">
        <rect width="600" height="240" fill="#F8FAFC"/>
        <rect x="150" y="40" width="300" height="160" rx="10" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="2"/>
        <circle cx="220" cy="120" r="35" fill="#4338CA"/>
        <rect x="280" y="80" width="120" height="18" rx="4" fill="#F59E0B"/>
        <rect x="280" y="110" width="100" height="10" rx="3" fill="#94A3B8"/>
        <rect x="280" y="130" width="80" height="10" rx="3" fill="#94A3B8"/>
      </svg>
    `;
  }
}

function showAnnotation(pinNum) {
  if (typeof principlesData === 'undefined') return;
  const p = principlesData[currentPrincipleIndex];
  const popover = document.getElementById('annotationBox');
  const text = p.pins[pinNum - 1].text;
  if (!popover) return;
  
  const textEl = document.getElementById('annotationText');
  if (textEl) textEl.textContent = text;
  popover.style.display = 'block';

  if (pinNum === 1) {
    popover.style.top = '10%'; popover.style.left = '20%';
  } else if (pinNum === 2) {
    popover.style.top = '12%'; popover.style.left = '42%';
  } else {
    popover.style.top = '10%'; popover.style.left = '56%';
  }
}

// --- Pemanasan (Warmup) Activity Logic ---
let selectedWarmupTerm = null;
let selectedWarmupDef = null;
let matchedWarmupCount = 0;
const correctPairs = {
  unity: 'unity',
  balance: 'balance',
  rhythm: 'rhythm',
  emphasis: 'emphasis'
};

function handleWarmupClick(cardEl, type) {
  if (cardEl.classList.contains('matched')) return;

  const fb = document.getElementById('warmupFeedback');
  if (fb) {
    fb.className = 'warmup-feedback';
    fb.style.display = 'none';
  }

  if (type === 'term') {
    document.querySelectorAll('.warmup-term-col .warmup-card').forEach(c => {
      if (!c.classList.contains('matched')) c.classList.remove('selected');
    });
    cardEl.classList.add('selected');
    selectedWarmupTerm = cardEl.dataset.term;
  } else {
    document.querySelectorAll('.warmup-def-col .warmup-card').forEach(c => {
      if (!c.classList.contains('matched')) c.classList.remove('selected');
    });
    cardEl.classList.add('selected');
    selectedWarmupDef = cardEl.dataset.def;
  }

  if (selectedWarmupTerm && selectedWarmupDef) {
    if (correctPairs[selectedWarmupTerm] === selectedWarmupDef) {
      const termEl = document.querySelector(`.warmup-term-col [data-term="${selectedWarmupTerm}"]`);
      const defEl = document.querySelector(`.warmup-def-col [data-def="${selectedWarmupDef}"]`);
      
      if (termEl) {
        termEl.classList.remove('selected');
        termEl.classList.add('matched');
        const m = termEl.querySelector('.match-mark');
        if (m) m.textContent = '✓ Benar';
      }
      if (defEl) {
        defEl.classList.remove('selected');
        defEl.classList.add('matched');
        const m = defEl.querySelector('.match-mark');
        if (m) m.textContent = '✓ Cocok';
      }

      matchedWarmupCount++;
      const scoreBadge = document.getElementById('warmupScoreBadge');
      if (scoreBadge) scoreBadge.textContent = `Tercocokkan: ${matchedWarmupCount} / 4`;

      if (fb) {
        fb.textContent = `Tepat! Pasangan istilah ${selectedWarmupTerm.toUpperCase()} berhasil dicocokkan dengan benar.`;
        fb.className = 'warmup-feedback success';
        fb.style.display = 'block';

        if (matchedWarmupCount === 4) {
          fb.innerHTML = `<strong>Luar biasa! Seluruh 4 istilah pemanasan telah cocok dengan tepat.</strong> Kamu siap memulai Modul 1.`;
          const btn = document.getElementById('btnStartModul1');
          if (btn) btn.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.4)';
        }
      }
    } else {
      if (fb) {
        fb.textContent = 'Belum tepat. Cermati kembali apakah istilah menekankan pembagian bobot, pusat perhatian, kesatuan, atau pola pengulangan.';
        fb.className = 'warmup-feedback error';
        fb.style.display = 'block';
      }

      const activeTerm = document.querySelector(`.warmup-term-col [data-term="${selectedWarmupTerm}"]`);
      const activeDef = document.querySelector(`.warmup-def-col [data-def="${selectedWarmupDef}"]`);
      if (activeTerm) activeTerm.classList.remove('selected');
      if (activeDef) activeDef.classList.remove('selected');
    }

    selectedWarmupTerm = null;
    selectedWarmupDef = null;
  }
}

// --- Modul 2 Interactive Functions (F05, F06, F07, F11) ---
function showSoftwarePart(title, desc) {
  const detailBox = document.getElementById('softwarePartDetail');
  if (!detailBox) return;
  detailBox.innerHTML = `
    <div style="background: #F8FAFC; border-left: 4px solid var(--gold); padding: 14px 18px; border-radius: 6px;">
      <h4 style="margin: 0 0 6px 0; color: var(--navy); font-size: 16px;">${title}</h4>
      <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">${desc}</p>
    </div>
  `;
}

function downloadFileLatihan() {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#1E1B4B"/>
  <defs>
    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
  </defs>
  <rect x="320" y="100" width="160" height="40" rx="8" fill="#F59E0B"/>
  <rect x="340" y="80" width="120" height="25" rx="6" fill="#D97706"/>
  <path d="M 330,140 L 470,140 L 450,520 L 350,520 Z" fill="url(#metal)"/>
  <rect x="360" y="220" width="80" height="200" rx="4" fill="#FFFFFF" opacity="0.9"/>
  <text x="400" y="270" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#1E1B4B">GRAFIKAKU</text>
  <circle cx="400" cy="320" r="28" fill="#F59E0B"/>
  <text x="400" y="326" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">AS10</text>
  <text x="400" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#64748B">EDISI LATIHAN SMK</text>
</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'AS10_Tumbler_Latihan.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- Modul 3 Communication Flow Diagram (F08) ---
let flowSelected = {};
function assignFlowLabel(labelValue) {
  // Automatically fill next empty slot (slot1 -> slot2 -> slot3 -> slot4)
  const slots = ['slot1', 'slot2', 'slot3', 'slot4'];
  const emptySlot = slots.find(s => !flowSelected[s]);
  if (!emptySlot) {
    const fb = document.getElementById('flowFeedback');
    if (fb) fb.innerHTML = '<div style="background:#FFFBEB; color:#B45309; padding:10px 14px; border-radius:6px; font-weight:600;">Semua kotak telah terisi. Tekan tombol "Reset Bagan" jika ingin mengulang.</div>';
    return;
  }
  flowSelected[emptySlot] = labelValue;
  const slotEl = document.getElementById(emptySlot);
  if (slotEl) {
    slotEl.textContent = labelValue;
    slotEl.classList.add('filled');
  }
}

function checkFlowDiagram() {
  const fb = document.getElementById('flowFeedback');
  if (!fb) return;
  const correct = {
    slot1: 'Komunikator',
    slot2: 'Pesan',
    slot3: 'Media',
    slot4: 'Komunikan'
  };

  const isComplete = ['slot1', 'slot2', 'slot3', 'slot4'].every(k => flowSelected[k]);
  if (!isComplete) {
    fb.innerHTML = `<div style="background: var(--red-light); color: var(--red); padding: 12px 16px; border-radius: 6px; font-weight: 600;">Silakan lengkapi seluruh 4 tahapan alur komunikasi sebelum memeriksa!</div>`;
    return;
  }

  const allMatch = Object.keys(correct).every(k => flowSelected[k] === correct[k]);
  if (allMatch) {
    fb.innerHTML = `
      <div style="background: var(--green-light); color: var(--green); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
        &check; Sempurna! Alur komunikasi visual terangkai runtut: Komunikator (Desainer) &rarr; Pesan (Gagasan Visual) &rarr; Media (Karya Cetak/Digital) &rarr; Komunikan (Target Sasaran).
      </div>
    `;
  } else {
    fb.innerHTML = `
      <div style="background: var(--red-light); color: var(--red); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
        &times; Urutan alur belum tepat. Ingat kembali alur standar: Siapa perancangnya? Apa gagasan yang dibawa? Melalui media apa disajikan? Dan kepada siapa ditujukan?
      </div>
    `;
  }
}

function resetFlowDiagram() {
  flowSelected = {};
  ['slot1', 'slot2', 'slot3', 'slot4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = `[Pilih ${id.replace('slot', 'Tahap ')}]`;
      el.classList.remove('filled');
    }
  });
  const fb = document.getElementById('flowFeedback');
  if (fb) fb.innerHTML = '';
}

// --- Latihan Interaktif: Menandai Area Emphasis (F09) ---
let selectedTargetId = null;

function markArtworkTarget(event, targetId) {
  event.stopPropagation();
  selectedTargetId = targetId;

  // Position the marker ring around the clicked element
  const marker = document.getElementById('markerRing');
  const svg = document.getElementById('exerciseSvg');
  if (!marker || !svg) return;

  const rect = event.target.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();
  const cx = rect.left - svgRect.left + rect.width / 2;
  const cy = rect.top - svgRect.top + rect.height / 2;

  marker.style.left = `${cx}px`;
  marker.style.top = `${cy}px`;
  marker.style.width = `${Math.max(rect.width + 16, 56)}px`;
  marker.style.height = `${Math.max(rect.height + 16, 56)}px`;
  marker.style.display = 'block';

  // Clear previous feedback
  const fb = document.getElementById('exerciseFeedback');
  if (fb) fb.innerHTML = '';
}

function checkExerciseAnswer() {
  const fb = document.getElementById('exerciseFeedback');
  if (!fb) return;

  if (!selectedTargetId) {
    fb.innerHTML = `
      <div style="background: #FEE2E2; border: 1px solid #FECACA; color: #DC2626; padding: 14px 18px; border-radius: 8px; font-weight: 600;">
        &times; Silakan klik langsung pada salah satu elemen karya di kanvas untuk menandai bagian penekanan (emphasis)!
      </div>
    `;
    return;
  }

  if (selectedTargetId === 'FOKUS_UTAMA') {
    fb.innerHTML = `
      <div style="background: var(--green-light); border: 1px solid #A7F3D0; color: var(--green); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
        &check; Jawaban Benar! Elemen lingkaran tengah "FOKUS" dibuat berukuran paling besar dan memiliki saturasi warna paling dominan, menjadikannya titik pusat perhatian (emphasis) utama bagi mata pembaca.
      </div>
    `;
  } else {
    fb.innerHTML = `
      <div style="background: var(--red-light); border: 1px solid #FECACA; color: var(--red); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
        &times; Belum Tepat. Elemen yang Anda tandai adalah unsur pendukung yang berukuran kecil dan bernilai kontras rendah. Coba amati lingkaran terbesar di bagian tengah.
      </div>
    `;
  }
}

// --- Latihan 2: SOP Ordering (F09 Bagian 2) ---
let selectedSopSteps = [];
const correctSopOrder = [
  'Buat Dokumen Baru 1080x1350',
  'Susun Objek Tumbler dan Teks',
  'Simpan Master PSD',
  'Ekspor PNG 1080x1350'
];

function selectSopStep(el, stepName) {
  if (selectedSopSteps.includes(stepName)) return;
  selectedSopSteps.push(stepName);
  el.classList.add('selected');

  const container = document.getElementById('sopSelectedOrder');
  if (container) {
    container.innerHTML = selectedSopSteps.map((s, idx) => `<div><strong>${idx + 1}.</strong> ${s}</div>`).join('');
  }
}

function checkSopOrder() {
  const fb = document.getElementById('sopFeedback');
  if (!fb) return;

  if (selectedSopSteps.length < 4) {
    fb.innerHTML = `<div style="background: var(--red-light); color: var(--red); padding: 12px 16px; border-radius: 6px; font-weight: 600;">Silakan pilih seluruh 4 urutan langkah SOP terlebih dahulu!</div>`;
    return;
  }

  const isMatch = correctSopOrder.every((val, idx) => selectedSopSteps[idx] === val);
  if (isMatch) {
    fb.innerHTML = `
      <div style="background: var(--green-light); color: var(--green); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
        &check; Hebat! Urutan SOP telah tepat: Buat Dokumen &rarr; Susun Objek &rarr; Simpan Master .PSD &rarr; Ekspor .PNG.
      </div>
    `;
  } else {
    fb.innerHTML = `
      <div style="background: var(--red-light); color: var(--red); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
        &times; Urutan masih keliru. Ingat: Awali dengan membuat kanvas baru, susun desain, simpan file master proyek, baru terakhir diekspor.
      </div>
    `;
  }
}

function resetSopOrder() {
  selectedSopSteps = [];
  document.querySelectorAll('#sopOptionsList .warmup-card').forEach(c => c.classList.remove('selected'));
  const container = document.getElementById('sopSelectedOrder');
  if (container) container.textContent = '(Belum ada langkah dipilih)';
  const fb = document.getElementById('sopFeedback');
  if (fb) fb.innerHTML = '';
}

// --- Kuis Evaluasi Lengkap 10 Soal (F10 & F14) ---
let currentQuizIdx = 0;
let userQuizAnswers = {};
let quizSubmitted = false;

function renderQuizContainer() {
  const container = document.getElementById('quizQuestionContainer');
  if (!container || typeof quizDataModul1 === 'undefined' || quizDataModul1.length === 0) return;

  if (quizSubmitted) {
    renderQuizResultScreen(container);
    return;
  }

  const q = quizDataModul1[currentQuizIdx];
  const total = quizDataModul1.length;
  const selectedAns = userQuizAnswers[currentQuizIdx];
  const pct = Math.round(((currentQuizIdx + 1) / total) * 100);

  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <span class="subtopic-badge">Soal ${currentQuizIdx + 1} dari ${total}</span>
      <span style="font-size: 13px; font-weight: 600; color: #64748B;">Progres Kuis: ${pct}%</span>
    </div>

    <div class="mod-bar" style="margin-bottom: 24px;">
      <div class="mod-bar-fill" style="width: ${pct}%;"></div>
    </div>

    <h2 style="color: var(--navy); font-size: 19px; line-height: 1.5; margin-bottom: 20px;">
      ${q.question}
    </h2>

    <div class="quiz-options-group" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
      ${q.options.map(opt => `
        <div class="quiz-option ${selectedAns === opt.key ? 'selected' : ''}" onclick="selectQuizOpt('${opt.key}')">
          <strong>${opt.key}.</strong> ${opt.text}
        </div>
      `).join('')}
    </div>

    <div id="quizValidationFeedback" style="margin-bottom: 18px;"></div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 20px;">
      <button class="btn-secondary" onclick="prevQuizQuestion()" ${currentQuizIdx === 0 ? 'disabled' : ''}>
        &larr; Soal Sebelumnya
      </button>

      <button class="btn-primary" onclick="nextOrFinishQuiz()">
        ${currentQuizIdx === total - 1 ? 'Kumpulkan Jawaban & Selesai &rarr;' : 'Soal Berikutnya &rarr;'}
      </button>
    </div>
  `;
}

function selectQuizOpt(key) {
  userQuizAnswers[currentQuizIdx] = key;
  renderQuizContainer();
}

function prevQuizQuestion() {
  if (currentQuizIdx > 0) {
    currentQuizIdx--;
    renderQuizContainer();
  }
}

function nextOrFinishQuiz() {
  const selected = userQuizAnswers[currentQuizIdx];
  const fb = document.getElementById('quizValidationFeedback');

  if (!selected) {
    if (fb) {
      fb.innerHTML = `
        <div style="background: #FEE2E2; border: 1px solid #FECACA; color: #DC2626; padding: 12px 16px; border-radius: 8px; font-weight: 600;">
          &times; Silakan pilih salah satu opsi jawaban terlebih dahulu sebelum melanjutkan!
        </div>
      `;
    }
    return;
  }

  if (currentQuizIdx < quizDataModul1.length - 1) {
    currentQuizIdx++;
    renderQuizContainer();
  } else {
    quizSubmitted = true;
    renderQuizContainer();
  }
}

function renderQuizResultScreen(container) {
  let correctCount = 0;
  const total = quizDataModul1.length;

  quizDataModul1.forEach((q, idx) => {
    if (userQuizAnswers[idx] === q.answer) {
      correctCount++;
    }
  });

  const finalScore = Math.round((correctCount / total) * 100);
  const isPassed = finalScore >= 75;

  if (isPassed) {
    localStorage.setItem('grafikaku_modul2_unlocked', 'true');
    updateUnlockUI();
  }

  container.innerHTML = `
    <div style="text-align: center; padding: 30px 16px;">
      <div style="width: 80px; height: 80px; margin: 0 auto 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 38px; background: ${isPassed ? '#DEF7EC' : '#FDE8E8'}; color: ${isPassed ? '#0E9F6E' : '#E02424'};">
        ${isPassed ? '&#10003;' : '&#9888;'}
      </div>

      <h2 style="font-size: 26px; color: var(--navy); margin-bottom: 8px;">
        ${isPassed ? 'Selamat! Anda Memenuhi Ambang Tuntas' : 'Hasil Evaluasi: Perlu Peningkatan'}
      </h2>
      <p style="color: #64748B; font-size: 15px; margin-bottom: 24px; max-width: 600px; margin-left: auto; margin-right: auto;">
        ${isPassed 
          ? 'Anda berhasil memahami konsep 9 Prinsip Desain dan Alur Komunikasi Visual sesuai Capaian Pembelajaran SMK (Skor &ge; 75).' 
          : 'Nilai Anda belum mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) minimal 75. Silakan tinjau kembali materi Modul 1 dan ulangi kuis.'}
      </p>

      <div style="display: inline-block; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 12px; padding: 20px 48px; margin-bottom: 24px;">
        <div style="font-size: 48px; font-weight: 800; color: ${isPassed ? 'var(--navy)' : '#DC2626'};">
          ${finalScore} <span style="font-size: 22px; font-weight: 500; color: #64748B;">/ 100</span>
        </div>
        <div style="font-size: 14px; font-weight: 600; color: #475569; margin-top: 4px;">
          Jawaban Benar: ${correctCount} dari ${total} Soal
        </div>
      </div>

      <div>
        ${isPassed ? `
          <div style="margin-bottom: 20px; font-size: 15px; font-weight: 600; color: #0E9F6E;">
            &#128275; Modul 2 (Tools & Piranti Lunak Grafis) Kini Telah Terbuka Permanen!
          </div>
          <button class="btn-primary" onclick="navigateTo('modul2')" style="padding: 14px 28px; font-size: 16px;">
            Mulai Belajar Modul 2 Sekarang &rarr;
          </button>
        ` : `
          <button class="btn-secondary" onclick="restartQuiz()" style="padding: 12px 24px; font-size: 15px; margin-right: 12px;">
            &#8634; Ulangi Kuis
          </button>
          <button class="btn-primary" onclick="navigateTo('modul1')" style="padding: 12px 24px; font-size: 15px;">
            Tinjau Materi Modul 1
          </button>
        `}
      </div>
    </div>
  `;
}

function restartQuiz() {
  currentQuizIdx = 0;
  userQuizAnswers = {};
  quizSubmitted = false;
  renderQuizContainer();
}

// --- Glosarium & Modal Management (F01 & F12) ---
function openGlossaryModal() {
  const modal = document.getElementById('glossaryModal');
  if (!modal) return;
  modal.classList.add('open');
  renderGlossaryAccordion();
}

function closeGlossaryModal() {
  const modal = document.getElementById('glossaryModal');
  if (modal) modal.classList.remove('open');
}

function renderGlossaryAccordion() {
  const container = document.getElementById('glossaryList');
  if (!container || typeof glossaryData === 'undefined') return;

  container.innerHTML = '';
  glossaryData.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'gloss-accordion-item';
    card.id = `glossItem_${idx}`;
    card.innerHTML = `
      <div class="gloss-accordion-header" onclick="toggleGlossaryAccordion(${idx})">
        <div>
          <strong style="color: var(--navy); font-size: 15px;">${item.term}</strong>
          <span style="display: inline-block; margin-left: 8px; font-size: 11px; padding: 2px 8px; background: #EEF2FF; color: var(--navy); border-radius: 99px;">${item.category}</span>
        </div>
        <span class="gloss-chevron" id="glossChevron_${idx}">&#9660;</span>
      </div>
      <div class="gloss-accordion-body" id="glossBody_${idx}">
        <p style="margin: 0 0 8px 0; color: #334155; line-height: 1.5;">${item.desc}</p>
        <div style="background: #F8FAFC; border-left: 3px solid var(--gold); padding: 8px 12px; font-size: 13px; color: #475569;">
          <strong>Contoh Penerapan:</strong> ${item.example}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleGlossaryAccordion(idx) {
  const body = document.getElementById(`glossBody_${idx}`);
  const chevron = document.getElementById(`glossChevron_${idx}`);
  if (!body) return;

  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (chevron) {
    chevron.innerHTML = !isOpen ? '&#9650;' : '&#9660;';
  }
}

function filterGlossary() {
  const query = (document.getElementById('glossarySearch').value || '').toLowerCase();
  if (typeof glossaryData === 'undefined') return;

  glossaryData.forEach((item, idx) => {
    const el = document.getElementById(`glossItem_${idx}`);
    if (!el) return;
    const match = item.term.toLowerCase().includes(query) ||
                  item.desc.toLowerCase().includes(query) ||
                  item.example.toLowerCase().includes(query);
    el.style.display = match ? 'block' : 'none';
  });
}

// Locked Notification Modal
function openLockedModal(title, desc) {
  const titleEl = document.getElementById('lockedModalTitle');
  const descEl = document.getElementById('lockedModalDesc');
  const modal = document.getElementById('lockedModal');
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;
  if (modal) modal.classList.add('open');
}

function closeLockedModal() {
  const modal = document.getElementById('lockedModal');
  if (modal) modal.classList.remove('open');
}

function closeModalOnBackdrop(e, modalId) {
  if (e.target.id === modalId) {
    document.getElementById(modalId).classList.remove('open');
  }
}

// Initial Bootstrap on Page Load
function initApp() {
  updateProgressUI();
  updateUnlockUI();
  const initView = (location.hash && location.hash.length > 1) ? location.hash.slice(1) : 'beranda';
  showView(initView);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
