
// --- Pengacakan Dinamis Opsi & Soal (Anti-Statis / Unik per Sesi & Siswa) ---
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Cache susunan opsi checkpoint per prinsip agar konsisten selama tampilan aktif
let principleCheckpointShuffledMap = {};

function getShuffledCheckpointForPrinciple(principleIdx) {
  if (typeof principlesData === 'undefined' || !principlesData[principleIdx]) return null;
  const p = principlesData[principleIdx];
  const q = p.quiz;
  if (!q) return null;

  if (principleCheckpointShuffledMap[principleIdx]) {
    return principleCheckpointShuffledMap[principleIdx];
  }

  // Acak opsi jawaban (teks asli), lalu tetapkan label key A, B, C, D baru
  const originalOptions = q.options.map(opt => ({
    text: opt.text,
    isCorrect: (opt.key === q.answer)
  }));

  const shuffledOptions = shuffleArray(originalOptions);
  const keys = ['A', 'B', 'C', 'D'];
  let newCorrectKey = 'A';

  const finalOptions = shuffledOptions.map((item, idx) => {
    const assignedKey = keys[idx] || String.fromCharCode(65 + idx);
    if (item.isCorrect) {
      newCorrectKey = assignedKey;
    }
    return {
      key: assignedKey,
      text: item.text,
      isCorrect: item.isCorrect
    };
  });

  const generated = {
    question: q.question,
    options: finalOptions,
    answer: newCorrectKey,
    explanation: q.explanation
  };

  principleCheckpointShuffledMap[principleIdx] = generated;
  return generated;
}

// --- Checkpoint Evaluasi Per Prinsip (Catatan Dosen) ---
let userCheckpointAnswers = {};

function getPassedCheckpoints() {
  try {
    const raw = localStorage.getItem('grafikaku_passed_checkpoints');
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}

function isPrincipleUnlocked(index) {
  if (index === 0) return true; // Prinsip 1 (Unity) selalu terbuka
  const passed = getPassedCheckpoints();
  // Prinsip ke-N terbuka jika prinsip N-1 sudah lulus evaluasi checkpoint
  return passed.includes(index - 1);
}

function renderPrincipleCheckpoint() {
  if (typeof principlesData === 'undefined') return;
  const p = principlesData[currentPrincipleIndex];
  const q = getShuffledCheckpointForPrinciple(currentPrincipleIndex);
  if (!q) return;

  const titleEl = document.getElementById('checkpointTitle');
  const badgeEl = document.getElementById('checkpointStatusBadge');
  const qText = document.getElementById('checkpointQuestionText');
  const optContainer = document.getElementById('checkpointOptionsContainer');
  const fb = document.getElementById('checkpointFeedback');
  const btnCheck = document.getElementById('btnCheckCheckpoint');
  const nextBtn = document.getElementById('btnNextPrinciple');

  if (titleEl) titleEl.textContent = `Evaluasi Pemahaman: ${p.name}`;
  if (qText) qText.textContent = q.question;
  if (fb) fb.innerHTML = '';

  const passed = getPassedCheckpoints();
  const alreadyPassed = passed.includes(currentPrincipleIndex);
  const selectedKey = userCheckpointAnswers[currentPrincipleIndex];

  if (alreadyPassed) {
    if (badgeEl) {
      badgeEl.className = 'status-pill open';
      badgeEl.innerHTML = '✓ Lulus &bull; Akses Prinsip Berikutnya Terbuka';
    }
    if (btnCheck) {
      btnCheck.disabled = true;
      btnCheck.innerHTML = '<span>✓ Evaluasi Selesai</span>';
    }
    if (nextBtn) nextBtn.disabled = (currentPrincipleIndex === principlesData.length - 1);
    const bannerEl = document.getElementById('modul1CompletionBanner');
    const isLastPrinciple = (typeof principlesData !== 'undefined') && (currentPrincipleIndex === principlesData.length - 1);

    if (bannerEl) {
      if (isLastPrinciple && alreadyPassed) {
        bannerEl.style.display = 'block';
      } else {
        bannerEl.style.display = 'none';
      }
    }
  } else {
    if (badgeEl) {
      badgeEl.className = 'status-pill locked';
      badgeEl.innerHTML = '🔒 Jawab Benar untuk Membuka Prinsip Berikutnya';
    }
    if (btnCheck) {
      btnCheck.disabled = false;
      btnCheck.innerHTML = '<span>Periksa Jawaban Evaluasi</span>';
    }
    if (nextBtn) nextBtn.disabled = true;
  }

  if (optContainer) {
    optContainer.innerHTML = '';
    q.options.forEach(opt => {
      const optEl = document.createElement('div');
      optEl.className = 'quiz-option' + (selectedKey === opt.key ? ' selected' : '');
      if (alreadyPassed && opt.key === q.answer) {
        optEl.style.background = 'var(--green-light)';
        optEl.style.borderColor = 'var(--black)';
      }
      optEl.innerHTML = `<strong>${opt.key}.</strong> ${opt.text}`;
      optEl.onclick = () => {
        if (alreadyPassed) return;
        userCheckpointAnswers[currentPrincipleIndex] = opt.key;
        renderPrincipleCheckpoint();
      };
      optContainer.appendChild(optEl);
    });
  }
}

function checkPrincipleCheckpoint() {
  if (typeof principlesData === 'undefined') return;
  const q = getShuffledCheckpointForPrinciple(currentPrincipleIndex);
  if (!q) return;
  const selectedKey = userCheckpointAnswers[currentPrincipleIndex];
  const fb = document.getElementById('checkpointFeedback');
  if (!fb) return;

  if (!selectedKey) {
    fb.innerHTML = `
      <div style="background: var(--red-light); border: 2px solid var(--black); border-radius: 10px; padding: 12px 16px; font-weight: 700; color: var(--black); box-shadow: var(--shadow-sm);">
        &times; Silakan pilih salah satu opsi jawaban sebelum memeriksa!
      </div>
    `;
    return;
  }

  if (selectedKey === q.answer) {
    // Correct!
    const passed = getPassedCheckpoints();
    if (!passed.includes(currentPrincipleIndex)) {
      passed.push(currentPrincipleIndex);
      localStorage.setItem('grafikaku_passed_checkpoints', JSON.stringify(passed));
    }

    if (typeof syncProgressToSupabase === 'function') {
      syncProgressToSupabase('m1_checkpoint_passed', {
        principle_index: currentPrincipleIndex,
        principle_title: principlesData[currentPrincipleIndex]?.title || '',
        is_passed: true
      });
    }

    fb.innerHTML = `
      <div style="background: var(--green-light); border: 2px solid var(--black); border-radius: 10px; padding: 14px 18px; font-weight: 700; color: var(--black); box-shadow: var(--shadow-sm);">
        ✓ ${q.explanation}
      </div>
    `;

    renderPrincipleCheckpoint();
    renderPrincipleTabs();
    updateProgressUI();

    if (currentPrincipleIndex === principlesData.length - 1) {
      const banner = document.getElementById('modul1CompletionBanner');
      if (banner) {
        banner.style.display = 'block';
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  } else {
    // Incorrect! Beri umpan balik dan reset opsi yang diacak ulang jika siswa mau mencoba lagi
    fb.innerHTML = `
      <div style="background: var(--red-light); border: 2px solid var(--black); border-radius: 10px; padding: 14px 18px; font-weight: 700; color: var(--black); box-shadow: var(--shadow-sm);">
        &times; Jawaban belum tepat. Cermati kembali materi dan amati karya beranotasi di atas, lalu coba lagi!
      </div>
    `;
    // Acak ulang opsi untuk percobaan berikutnya agar tidak statis!
    delete principleCheckpointShuffledMap[currentPrincipleIndex];
    delete userCheckpointAnswers[currentPrincipleIndex];
    setTimeout(() => {
      renderPrincipleCheckpoint();
    }, 1200);
  }
}


// --- Modul 1 Intro Modal (Catatan Dosen: Hari ini kita akan belajar...) ---
function startLearningModul1() {
  const openIntro = () => {
    const modal = document.getElementById('modul1IntroModal');
    if (modal) {
      modal.classList.add('open');
    } else {
      navigateTo('modul1');
    }
  };
  if (typeof requireStudentProfile === 'function') {
    requireStudentProfile(openIntro);
  } else {
    openIntro();
  }
}

function closeModul1IntroModal() {
  const modal = document.getElementById('modul1IntroModal');
  if (modal) modal.classList.remove('open');
}

function confirmModul1Start() {
  closeModul1IntroModal();
  navigateTo('modul1');
}

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
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
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
  const passed = getPassedCheckpoints();
  const total = (typeof principlesData !== 'undefined') ? principlesData.length : 9;
  const count = passed.length;
  const pct = Math.round((count / total) * 100);

  // Update Modul 1 card progress in Beranda
  const m1Text = document.getElementById('mod1ProgressText');
  const m1Bar = document.getElementById('mod1ProgressBar');
  if (m1Text) m1Text.textContent = `${pct}% (${count}/${total} Prinsip)`;
  if (m1Bar) m1Bar.style.width = pct + '%';

  // Progres Keseluruhan: Bobot seimbang per Modul (Masing-masing 33.33% / total 100%)
  // Modul 1 (0 - 33.3%): berdasarkan 9 prinsip (count / total * 33.33)
  // Modul 2 (0 - 33.3%): submit tugas karya (m2Done ? 33.33 : 0)
  // Modul 3 (0 - 33.3%): alur & checkpoint M3 (m3FlowDone: 16.67%, m3CpDone: 16.67%)
  const m1Share = (count / total) * (100 / 3);
  const m2Done = localStorage.getItem('grafikaku_m2_submitted') === 'true';
  const m2Share = m2Done ? (100 / 3) : 0;
  const m3FlowDone = localStorage.getItem('grafikaku_m3_flow_ok') === 'true';
  const m3CpDone = localStorage.getItem('grafikaku_m3_checkpoint_passed') === 'true';
  const m3Share = (m3FlowDone ? (50 / 3) : 0) + (m3CpDone ? (50 / 3) : 0);

  const kuisDone = isModul2Unlocked();
  const overallPct = Math.min(100, Math.round(m1Share + m2Share + m3Share));

  const overallBar = document.getElementById('overallProgressBarFill');
  const overallNum = document.getElementById('overallProgressNumber');
  const overallSub = document.getElementById('overallProgressSub');
  if (overallBar) overallBar.style.width = overallPct + '%';
  if (overallNum) overallNum.textContent = overallPct + '%';
  if (overallSub) {
    overallSub.textContent = overallPct === 0
      ? 'Belum ada progres. Mulai dari Modul 1 untuk membuka modul berikutnya.'
      : `Modul 1: ${pct}% • Kuis: ${kuisDone ? 'Tuntas' : 'Belum'} • Modul 2: ${m2Done ? '100%' : '0%'} • Modul 3: ${Math.round(m3Share * 3)}%`;
  }

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
    const m2Done = localStorage.getItem('grafikaku_m2_submitted') === 'true';
    const m3Done = localStorage.getItem('grafikaku_m3_checkpoint_passed') === 'true';

    if (m2Card) m2Card.classList.remove('locked');
    if (m2Badge) {
      m2Badge.className = 'status-pill open';
      m2Badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Terbuka';
    }
    if (m2Text) m2Text.textContent = m2Done ? '100% (Terkumpul)' : '0% (Siap Dipelajari)';
    if (m2Bar) m2Bar.style.width = m2Done ? '100%' : '0%';

    if (m3Card) m3Card.classList.remove('locked');
    if (m3Badge) {
      m3Badge.className = 'status-pill open';
      m3Badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Terbuka';
    }
    if (m3Text) m3Text.textContent = m3Done ? '100% (Selesai)' : '0% (Siap Dipelajari)';
    if (m3Bar) m3Bar.style.width = m3Done ? '100%' : '0%';
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
  } else if (viewName === 'modul3') {
    renderModul3Checkpoint();
    updateProgressUI();
    updateUnlockUI();
  } else if (viewName === 'modul2') {
    selectSoftwareView(currentSelectedSoftware || 'photoshop');
    renderSubmissionStatus();
    updateProgressUI();
    updateUnlockUI();
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

  const passed = getPassedCheckpoints();

  principlesData.forEach((p, idx) => {
    const isUnlocked = isPrincipleUnlocked(idx);
    const isDone = passed.includes(idx);
    const btn = document.createElement('button');
    btn.className = 'principle-tab' + (idx === currentPrincipleIndex ? ' active' : '');
    
    if (!isUnlocked) {
      btn.classList.add('locked');
      btn.style.opacity = '0.6';
      btn.style.cursor = 'not-allowed';
      btn.innerHTML = `<span>🔒 ${idx + 1}. ${p.name.split(' ')[0]}</span>`;
      btn.onclick = () => {
        openLockedModal(
          'Prinsip Belum Terbuka!',
          `Selesaikan evaluasi pemahaman pada Prinsip ${idx} (${principlesData[idx-1].name}) terlebih dahulu sebelum membuka materi ini.`
        );
      };
    } else {
      const mark = isDone ? '✓ ' : '';
      btn.innerHTML = `<span>${mark}${idx + 1}. ${p.name.split(' ')[0]}</span>`;
      btn.onclick = () => {
        currentPrincipleIndex = idx;
        markPrincipleVisited(idx);
        renderPrincipleTabs();
        renderPrincipleContent();
      };
    }
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
      const unlocked = isPrincipleUnlocked(idx);
      const dot = document.createElement('span');
      dot.className = 'dot-item' + (idx === currentPrincipleIndex ? ' active' : '') + (!unlocked ? ' locked' : '');
      dot.title = unlocked
        ? principlesData[idx].name
        : `${principlesData[idx].name} (Terkunci — selesaikan prinsip sebelumnya)`;
      if (!unlocked) {
        dot.style.opacity = '0.35';
        dot.style.cursor = 'not-allowed';
      }
      dot.onclick = () => {
        if (!isPrincipleUnlocked(idx)) {
          openLockedModal(
            'Prinsip Masih Terkunci!',
            `Selesaikan pertanyaan evaluasi pemahaman pada prinsip sebelumnya terlebih dahulu sebelum membuka ${principlesData[idx].name}.`
          );
          return;
        }
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
  renderPrincipleCheckpoint();
}

function changePrinciple(delta) {
  const newIndex = currentPrincipleIndex + delta;
  if (typeof principlesData === 'undefined' || newIndex < 0 || newIndex >= principlesData.length) return;

  if (delta > 0) {
    // Check if current checkpoint passed before allowing next
    const passed = getPassedCheckpoints();
    if (!passed.includes(currentPrincipleIndex)) {
      openLockedModal(
        'Selesaikan Evaluasi Dulu!',
        `Silakan jawab benar pertanyaan evaluasi pemahaman ${principlesData[currentPrincipleIndex].name} di bagian bawah sebelum lanjut ke prinsip berikutnya.`
      );
      const cpCard = document.getElementById('principleCheckpointCard');
      if (cpCard) cpCard.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }

  currentPrincipleIndex = newIndex;
  renderPrincipleTabs();
  renderPrincipleContent();
}

function setBalanceMode(mode) {
  currentBalanceMode = mode;
  const bSim = document.getElementById('btnSimetris');
  const bAsim = document.getElementById('btnAsimetris');
  if (bSim) bSim.classList.toggle('active', mode === 'simetris');
  if (bAsim) bAsim.classList.toggle('active', mode === 'asimetris');
  renderArtworkCanvas();
  renderPrincipleCheckpoint();
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
    <div style="background: var(--white); border: 2px solid var(--black); border-left: 6px solid var(--yellow); padding: 14px 18px; border-radius: 10px; box-shadow: var(--shadow-sm);">
      <h4 style="margin: 0 0 6px 0; color: var(--black); font-size: 16px;">${title}</h4>
      <p style="margin: 0; color: var(--black); font-size: 14px; line-height: 1.6;">${desc}</p>
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
    if (fb) fb.innerHTML = '<div style="background: rgba(245, 158, 11, 0.20); color: #FDE68A; padding:10px 14px; border-radius:6px; font-weight:600;">Semua kotak telah terisi. Tekan tombol "Reset Bagan" jika ingin mengulang.</div>';
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
    localStorage.setItem('grafikaku_m3_flow_ok', 'true');
    if (typeof syncProgressToSupabase === 'function') {
      syncProgressToSupabase('m3_flow_checked', { is_passed: true });
    }
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
      <div style="background: var(--red-light); border: 2px solid var(--black); color: var(--black); padding: 14px 18px; border-radius: 10px; font-weight: 700; box-shadow: var(--shadow-sm);">
        &times; Silakan klik langsung pada salah satu elemen karya di kanvas untuk menandai bagian penekanan (emphasis)!
      </div>
    `;
    return;
  }

  if (selectedTargetId === 'FOKUS_UTAMA') {
    localStorage.setItem('grafikaku_latihan_emphasis_ok', 'true');
    if (typeof syncProgressToSupabase === 'function') {
      syncProgressToSupabase('latihan_emphasis', { is_passed: true });
    }
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
    localStorage.setItem('grafikaku_latihan_sop_ok', 'true');
    if (typeof syncProgressToSupabase === 'function') {
      syncProgressToSupabase('latihan_sop', { is_passed: true });
    }
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

// --- Kuis Evaluasi Lengkap 10 Soal (F10 & F14) dengan Pengacakan Soal & Opsi ---
let currentQuizIdx = 0;
let userQuizAnswers = {};
let quizSubmitted = false;
let activeQuizQuestions = [];

function prepareShuffledQuiz() {
  if (typeof quizDataModul1 === 'undefined' || quizDataModul1.length === 0) return [];

  // Acak urutan soal
  const shuffledQuestions = shuffleArray(quizDataModul1);

  // Acak urutan opsi pada setiap soal
  const keys = ['A', 'B', 'C', 'D'];
  return shuffledQuestions.map((q, qIndex) => {
    const originalOptions = q.options.map(opt => ({
      text: opt.text,
      isCorrect: (opt.key === q.answer)
    }));

    const shuffledOpts = shuffleArray(originalOptions);
    let newAnswerKey = 'A';

    const finalOptions = shuffledOpts.map((optItem, optIdx) => {
      const key = keys[optIdx] || String.fromCharCode(65 + optIdx);
      if (optItem.isCorrect) {
        newAnswerKey = key;
      }
      return {
        key: key,
        text: optItem.text,
        isCorrect: optItem.isCorrect
      };
    });

    return {
      id: q.id,
      tp: q.tp,
      level: q.level,
      question: q.question,
      options: finalOptions,
      answer: newAnswerKey,
      explanation: q.explanation
    };
  });
}

function renderQuizContainer() {
  const container = document.getElementById('quizQuestionContainer');
  if (!container) return;

  if (activeQuizQuestions.length === 0) {
    activeQuizQuestions = prepareShuffledQuiz();
  }

  if (activeQuizQuestions.length === 0) return;

  if (quizSubmitted) {
    renderQuizResultScreen(container);
    return;
  }

  const q = activeQuizQuestions[currentQuizIdx];
  const total = activeQuizQuestions.length;
  const selectedAns = userQuizAnswers[currentQuizIdx];
  const pct = Math.round(((currentQuizIdx + 1) / total) * 100);

  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <span class="subtopic-badge">Soal ${currentQuizIdx + 1} dari ${total}</span>
      <span style="font-size: 13px; font-weight: 700; color: var(--black);">Progres Kuis: ${pct}%</span>
    </div>

    <div class="mod-bar" style="margin-bottom: 24px;">
      <div class="mod-bar-fill" style="width: ${pct}%;"></div>
    </div>

    <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
      <span class="status-pill open" style="background: var(--blue-light); color: var(--black); border: 2px solid var(--black); font-size: 11.5px;">
        🎯 ${q.tp || 'TP 1: Prinsip Dasar Desain'}
      </span>
      <span class="status-pill" style="background: var(--yellow-light); color: var(--black); border: 2px solid var(--black); font-size: 11.5px;">
        🧠 Level Kognitif: ${q.level || 'C2 (Pemahaman)'}
      </span>
    </div>

    <h2 style="color: var(--black); font-size: 20px; line-height: 1.45; margin-bottom: 20px;">
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
        <div style="background: var(--red-light); border: 2px solid var(--black); color: var(--black); padding: 12px 16px; border-radius: 10px; font-weight: 700; box-shadow: var(--shadow-sm);">
          &times; Silakan pilih salah satu opsi jawaban terlebih dahulu sebelum melanjutkan!
        </div>
      `;
    }
    return;
  }

  if (currentQuizIdx < activeQuizQuestions.length - 1) {
    currentQuizIdx++;
    renderQuizContainer();
  } else {
    quizSubmitted = true;
    renderQuizContainer();
  }
}

function renderQuizResultScreen(container) {
  let correctCount = 0;
  const total = activeQuizQuestions.length;

  activeQuizQuestions.forEach((q, idx) => {
    if (userQuizAnswers[idx] === q.answer) {
      correctCount++;
    }
  });

  const finalScore = Math.round((correctCount / total) * 100);
  const isPassed = finalScore >= 75;

  localStorage.setItem('grafikaku_kuis_last_score', String(finalScore));
  localStorage.setItem('grafikaku_kuis_last_correct', String(correctCount));
  localStorage.setItem('grafikaku_kuis_last_total', String(total));

  if (isPassed) {
    localStorage.setItem('grafikaku_modul2_unlocked', 'true');
    updateUnlockUI();
  }

  if (typeof syncProgressToSupabase === 'function') {
    syncProgressToSupabase('kuis_akhir_submitted', {
      score: finalScore,
      correct: correctCount,
      total: total,
      is_passed: isPassed
    });
  }

  container.innerHTML = `
    <div style="text-align: center; padding: 30px 16px;">
      <div style="width: 80px; height: 80px; margin: 0 auto 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 38px; background: ${isPassed ? '#DEF7EC' : '#FDE8E8'}; color: ${isPassed ? '#0E9F6E' : '#E02424'};">
        ${isPassed ? '&#10003;' : '&#9888;'}
      </div>

      <h2 style="font-size: 26px; color: var(--black); margin-bottom: 8px;">
        ${isPassed ? 'Selamat! Anda Memenuhi Ambang Tuntas' : 'Hasil Evaluasi: Perlu Peningkatan'}
      </h2>
      <p style="color: var(--black); font-size: 15px; margin-bottom: 24px; max-width: 600px; margin-left: auto; margin-right: auto;">
        ${isPassed 
          ? 'Anda berhasil memahami konsep 9 Prinsip Desain dan Alur Komunikasi Visual sesuai Capaian Pembelajaran SMK (Skor &ge; 75).' 
          : 'Nilai Anda belum mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) minimal 75. Silakan tinjau kembali materi Modul 1 dan ulangi kuis.'}
      </p>

      <div style="display: inline-block; background: var(--yellow); border: 2.5px solid var(--black); box-shadow: var(--shadow-sm); border-radius: 12px; padding: 20px 48px; margin-bottom: 24px;">
        <div style="font-size: 48px; font-weight: 800; color: ${isPassed ? 'var(--black)' : '#DC2626'};">
          ${finalScore} <span style="font-size: 22px; font-weight: 600; color: var(--black);">/ 100</span>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: var(--black); margin-top: 4px;">
          Jawaban Benar: ${correctCount} dari ${total} Soal
        </div>
      </div>

      <div>
        ${isPassed ? `
          <div style="margin-bottom: 20px; font-size: 15px; font-weight: 700; color: #065F46;">
            &#128275; Modul 2 (Tools & Piranti Lunak Grafis) Kini Telah Terbuka Permanen!
          </div>
          <button class="btn-primary" onclick="navigateTo('modul2')" style="padding: 14px 28px; font-size: 16px;">
            Mulai Belajar Modul 2 Sekarang &rarr;
          </button>
        ` : `
          <button class="btn-secondary" onclick="restartQuiz()" style="padding: 12px 24px; font-size: 15px; margin-right: 12px;">
            &#8634; Ulangi Kuis (Soal Diacak)
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
  activeQuizQuestions = prepareShuffledQuiz(); // Acak ulang setiap kali siswa mengulang kuis!
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
    card.dataset.scope = item.moduleScope || 'Modul 1: Prinsip Dasar Desain';

    // Color pill based on module
    let scopeBadgeColor = 'var(--blue-light)';
    if ((item.moduleScope || '').includes('Modul 2')) scopeBadgeColor = 'var(--green-light)';
    if ((item.moduleScope || '').includes('Modul 3')) scopeBadgeColor = 'var(--orange-light)';

    card.innerHTML = `
      <div class="gloss-accordion-header" onclick="toggleGlossaryAccordion(${idx})">
        <div>
          <strong style="color: var(--black); font-size: 15.5px;">${item.term}</strong>
          <span style="display: inline-block; margin-left: 8px; font-size: 11px; padding: 3px 10px; background: ${scopeBadgeColor}; color: var(--black); border: 1.5px solid var(--black); border-radius: 999px; font-weight: 800;">
            ${item.moduleScope || 'Modul 1'}
          </span>
          <span style="display: inline-block; margin-left: 4px; font-size: 11px; padding: 3px 8px; background: var(--bg-page); color: var(--text-muted); border-radius: 999px; font-weight: 600;">
            ${item.category}
          </span>
        </div>
        <span class="gloss-chevron" id="glossChevron_${idx}">&#9660;</span>
      </div>
      <div class="gloss-accordion-body" id="glossBody_${idx}">
        <div style="margin-bottom: 8px; font-size: 12.5px; font-weight: 700; color: var(--black);">
          📍 Lingkup Pembelajaran: <span style="background: ${scopeBadgeColor}; color: var(--black); padding: 2px 8px; border-radius: 6px; border: 1.5px solid var(--black); font-weight: 800;">${item.moduleScope || 'Modul 1: Prinsip Dasar Desain'}</span>
        </div>
        <p style="margin: 0 0 10px 0; color: var(--text-main); line-height: 1.6;">${item.desc}</p>
        <div style="background: var(--bg-page); border: 1.5px solid var(--black); border-radius: 8px; padding: 10px 14px; font-size: 13.5px; color: var(--black);">
          <strong>💡 Contoh Penerapan:</strong> ${item.example}
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

let currentGlossaryScope = 'ALL';

function setGlossaryScope(scope) {
  currentGlossaryScope = scope;
  const btnAll = document.getElementById('btnScopeAll');
  const btnM1 = document.getElementById('btnScopeM1');
  const btnM2 = document.getElementById('btnScopeM2');
  const btnM3 = document.getElementById('btnScopeM3');
  if (btnAll) btnAll.classList.toggle('active', scope === 'ALL');
  if (btnM1) btnM1.classList.toggle('active', scope === 'Modul 1');
  if (btnM2) btnM2.classList.toggle('active', scope === 'Modul 2');
  if (btnM3) btnM3.classList.toggle('active', scope === 'Modul 3');
  filterGlossary();
}

function filterGlossary() {
  const searchInput = document.getElementById('glossarySearch');
  const query = (searchInput ? searchInput.value : '').toLowerCase();
  if (typeof glossaryData === 'undefined') return;

  glossaryData.forEach((item, idx) => {
    const el = document.getElementById(`glossItem_${idx}`);
    if (!el) return;
    
    // Check scope match
    const scopeMatch = (currentGlossaryScope === 'ALL') || 
                       (item.moduleScope && item.moduleScope.includes(currentGlossaryScope));

    // Check search query match
    const textMatch = item.term.toLowerCase().includes(query) ||
                      item.desc.toLowerCase().includes(query) ||
                      (item.moduleScope && item.moduleScope.toLowerCase().includes(query)) ||
                      item.example.toLowerCase().includes(query);

    el.style.display = (scopeMatch && textMatch) ? 'block' : 'none';
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

// --- Modul 2 Multi-Software SOP & Submission System (TP 2) ---
let currentSelectedSoftware = 'photoshop';
let currentSubmissionFile = null;

const softwareStepsData = {
  photoshop: [
    { title: "Langkah 1: Buat Dokumen Baru", text: "Buka Photoshop, pilih <code>Create New</code>. Atur lebar 1080 px, tinggi 1350 px, orientasi Potret, Resolusi 72–150 PPI, Color Mode RGB 8-bit." },
    { title: "Langkah 2: Simpan Awal Berkas Master", text: "Tekan <code>Ctrl + S</code> atau pilih menu <em>File > Save As</em>. Simpan dengan format Photoshop (*.PSD) bernama <code>M2_Nama_Kelas.psd</code> agar seluruh layer tersimpan aman." },
    { title: "Langkah 3: Gambar Objek Tumbler", text: "Gunakan <code>Rectangle Tool (U)</code> untuk membuat shape badan, leher, dan tutup tumbler pada layer terpisah, atau impor aset dari <code>AS10</code>." },
    { title: "Langkah 4: Tata Tipografi & Kontras", text: "Pilih <code>Horizontal Type Tool (T)</code> untuk menulis judul dan ajakan aksi (CTA). Gunakan palet warna kontras agar teks mudah dibaca." },
    { title: "Langkah 5: Periksa Hierarki & Simpan Master", text: "Pastikan margin tepi aman dari potongan. Tekan <code>Ctrl + S</code> kembali untuk menyimpan perubahan pada berkas master PSD." },
    { title: "Langkah 6: Ekspor ke Format PNG", text: "Pilih menu <em>File > Export > Export As PNG</em>. Pastikan resolusi akhir tepat 1080 × 1350 piksel, lalu simpan dengan nama <code>M2_Nama_Kelas.png</code>." }
  ],
  coreldraw: [
    { title: "Langkah 1: Dokumen Baru CorelDRAW", text: "Buka CorelDRAW, klik <code>New Document</code>. Pilih satuan <em>Pixels</em>, ukuran 1080 × 1350 px, mode warna RGB, dan resolusi render 150 DPI." },
    { title: "Langkah 2: Simpan Master CDR", text: "Pilih menu <em>File > Save As</em>, simpan sebagai CorelDRAW (*.CDR) dengan nama <code>M2_Nama_Kelas.cdr</code>." },
    { title: "Langkah 3: Desain Bentuk Tumbler", text: "Gunakan <code>Rectangle Tool (F6)</code> dan <code>Shape Tool (F10)</code> untuk melengkungkan sudut botol tumbler, susun komponen badan dan tutup botol." },
    { title: "Langkah 4: Tambahkan Teks & Tata Letak", text: "Gunakan <code>Text Tool (F8)</code> untuk menyusun teks headline promosi. Atur perataan (alignment) terpusat atau rata kiri." },
    { title: "Langkah 5: Simpan Proyek Master", text: "Tekan <code>Ctrl + S</code> untuk memastikan seluruh kurva vektor tersimpan utuh di berkas CDR." },
    { title: "Langkah 6: Ekspor Berkas PNG", text: "Pilih menu <em>File > Export (Ctrl + E)</em>, pilih format <strong>PNG - Portable Network Graphics</strong>, centang <em>Export Selected Only</em> bila perlu." }
  ],
  canva: [
    { title: "Langkah 1: Buat Desain Ukuran Khusus", text: "Klik tombol <code>Buat Desain (Custom Size)</code>. Masukkan ukuran lebar 1080 px dan tinggi 1350 px (rasio 4:5 Instagram Portrait)." },
    { title: "Langkah 2: Beri Nama Proyek Desain", text: "Ubah nama dokumen di bilah atas Canva menjadi <code>M2_Nama_Kelas_Tumbler</code>." },
    { title: "Langkah 3: Rangkai Elemen Tumbler", text: "Buka menu <code>Elemen > Bentuk</code> untuk menyusun tumbler geometris, atau unggah file bahan <code>AS10</code> melalui tab Unggahan." },
    { title: "Langkah 4: Tambahkan Judul & Body Text", text: "Pilih menu <code>Teks</code>, gunakan gaya huruf sans-serif tebal untuk judul utama dan ukuran lebih kecil untuk keterangan." },
    { title: "Langkah 5: Periksa Posisi & Jeda Margin", text: "Pilih <em>File > Pengaturan Tampilan > Tampilkan Margin</em> untuk menjamin desain tidak terlalu mepet ke tepi." },
    { title: "Langkah 6: Unduh Hasil Format PNG", text: "Klik tombol <code>Bagikan > Unduh</code>, pilih Jenis File <strong>PNG</strong>, pastikan ukuran 1080 × 1350 px, lalu klik Unduh." }
  ]
};

const softwareVideoData = {
  photoshop: {
    name: "Adobe Photoshop",
    embedUrl: "https://www.youtube.com/embed/HnkK9XuimhA",
    caption: "Video tutorial SOP Adobe Photoshop: pembuatan dokumen 1080 × 1350 px, penataan layer/shape tumbler, dan ekspor PNG."
  },
  coreldraw: {
    name: "CorelDRAW",
    embedUrl: "https://www.youtube.com/embed/8GMCpXM_NFM",
    caption: "Video tutorial SOP CorelDRAW: setup page 1080 × 1350 px, pembuatan objek vektor tumbler, dan ekspor format PNG."
  },
  canva: {
    name: "Canva",
    embedUrl: "https://www.youtube.com/embed/yfKpkN01NNo",
    caption: "Video tutorial SOP Canva: custom size 1080 × 1350 px, penataan elemen grafis tumbler, dan unduh berkas PNG."
  }
};

function selectSoftwareView(software) {
  currentSelectedSoftware = software;
  const btnPs = document.getElementById('btnSoftwarePs');
  const btnCdr = document.getElementById('btnSoftwareCdr');
  const btnCanva = document.getElementById('btnSoftwareCanva');

  if (btnPs) btnPs.classList.toggle('active', software === 'photoshop');
  if (btnCdr) btnCdr.classList.toggle('active', software === 'coreldraw');
  if (btnCanva) btnCanva.classList.toggle('active', software === 'canva');

  updateTutorialVideo(software);
  renderSoftwareSteps();
}

function updateTutorialVideo(software) {
  const vData = softwareVideoData[software] || softwareVideoData.photoshop;
  const iframe = document.getElementById('tutorialVideoIframe');
  const caption = document.getElementById('tutorialVideoCaption');
  const badge = document.getElementById('activeVideoSoftwareBadge');

  if (iframe && vData.embedUrl) {
    iframe.src = vData.embedUrl;
  }
  if (caption && vData.caption) {
    caption.textContent = vData.caption;
  }
  if (badge && vData.name) {
    badge.textContent = vData.name;
  }
}

function renderSoftwareSteps() {
  const container = document.getElementById('softwareStepsContent');
  if (!container) return;

  const steps = softwareStepsData[currentSelectedSoftware] || softwareStepsData.photoshop;
  container.innerHTML = `
    <ol class="steps-list" style="margin-bottom:0;">
      ${steps.map(s => `
        <li style="margin-bottom: 12px;">
          <strong>${s.title}:</strong> ${s.text}
        </li>
      `).join('')}
    </ol>
  `;
}

function handleSubmissionFileSelect(e) {
  const file = e.target.files[0];
  const previewBox = document.getElementById('submissionPreviewBox');
  const noteBox = document.getElementById('submissionValidationNote');
  if (!file) return;

  currentSubmissionFile = file;

  // Render preview
  const reader = new FileReader();
  reader.onload = (event) => {
    if (previewBox) {
      previewBox.innerHTML = `
        <img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: contain; background: #fff;" alt="Preview Karya Siswa">
        <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.75); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 600;">
          ${file.name} (${Math.round(file.size / 1024)} KB)
        </div>
      `;
    }
  };
  reader.readAsDataURL(file);

  // Validate filename against SOP pattern
  const namePattern = /^M2_.*\.png$/i;
  const isNameOk = namePattern.test(file.name);
  const chkName = document.getElementById('chkName');
  if (chkName && isNameOk) {
    chkName.checked = true;
  }

  if (noteBox) {
    if (isNameOk) {
      noteBox.innerHTML = `
        <div style="background: var(--green-light); border: 2px solid var(--black); border-radius: 8px; padding: 10px 14px; font-size: 13px; font-weight: 700; color: var(--black);">
          ✓ Format berkas valid: ${file.name} (Sesuai panduan SOP M2_Nama_Kelas.png)
        </div>
      `;
    } else {
      noteBox.innerHTML = `
        <div style="background: var(--yellow-light); border: 2px solid var(--black); border-radius: 8px; padding: 10px 14px; font-size: 13px; font-weight: 700; color: var(--black);">
          ⚠️ Catatan: Nama berkas (${file.name}) sebaiknya diawali 'M2_' sesuai SOP (contoh: M2_Budi_XI-DKV.png).
        </div>
      `;
    }
  }

  updateSubmissionButtonState();
}

function updateSubmissionButtonState() {
  const btn = document.getElementById('btnSubmitWork');
  const chkSize = document.getElementById('chkSize');
  const chkMaster = document.getElementById('chkMaster');
  const chkTumbler = document.getElementById('chkTumbler');
  const chkName = document.getElementById('chkName');

  const allChecked = chkSize && chkSize.checked &&
                     chkMaster && chkMaster.checked &&
                     chkTumbler && chkTumbler.checked &&
                     chkName && chkName.checked;

  const hasFile = currentSubmissionFile !== null || localStorage.getItem('grafikaku_m2_submitted') === 'true';

  if (btn) {
    btn.disabled = !(allChecked && hasFile);
  }
}

async function submitModul2Work() {
  const btn = document.getElementById('btnSubmitWork');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Mengirim karya...';
  }

  localStorage.setItem('grafikaku_m2_submitted', 'true');
  if (currentSubmissionFile) {
    localStorage.setItem('grafikaku_m2_filename', currentSubmissionFile.name);
    if (typeof uploadModul2FileToSupabase === 'function') {
      await uploadModul2FileToSupabase(currentSubmissionFile);
    }
  }

  if (typeof syncProgressToSupabase === 'function') {
    await syncProgressToSupabase('modul2_submitted', {
      filename: localStorage.getItem('grafikaku_m2_filename') || '',
      file_url: localStorage.getItem('grafikaku_m2_file_url') || '',
      is_passed: true
    });
  }

  renderSubmissionStatus();
  updateProgressUI();
  updateUnlockUI();
  if (btn) {
    btn.disabled = false;
    btn.textContent = 'Kirim Tugas';
  }

  alert('🎉 Selamat! Karya tugas praktik Modul 2 berhasil diverifikasi dan tersimpan di sistem pembelajaran GrafikaKu.');
}

function renderSubmissionStatus() {
  const badge = document.getElementById('submissionStatusBadge');
  const isSubmitted = localStorage.getItem('grafikaku_m2_submitted') === 'true';
  const fileName = localStorage.getItem('grafikaku_m2_filename') || 'M2_Karya_Tumbler.png';

  if (badge) {
    if (isSubmitted) {
      badge.innerHTML = `
        <span class="status-pill open" style="background: var(--green-light); color: var(--black); font-size: 12.5px; border: 2px solid var(--black);">
          ✓ Tugas Praktik Terkumpul: ${fileName}
        </span>
      `;
    } else {
      badge.innerHTML = `
        <span class="status-pill locked" style="font-size: 12.5px;">
          ⏳ Menunggu Unggah & Checklist Mandiri
        </span>
      `;
    }
  }
}


// --- Modul 3 Checkpoint Evaluasi Studi Kasus (Anti-Statis Acak) ---
let userM3CheckpointAnswer = null;
let m3CheckpointShuffled = null;

const modul3CheckpointPool = [
  {
    question: "Dalam studi kasus perancangan Poster Adiwiyata 'Bawa Tumblermu Sendiri' untuk siswa SMK (audiens remaja), manakah strategi komunikasi grafis yang PALING efektif?",
    options: [
      { key: "A", text: "Menulis teks narasi 5 paragraf tanpa gambar dengan font serif kecil agar terkesan resmi" },
      { key: "B", text: "Memadukan ilustrasi tumbler modern yang mencolok, palet warna cerah, dan pesan judul singkat yang terbaca dalam 3 detik" },
      { key: "C", text: "Memakai mode warna CMYK resolusi 72 PPI khusus untuk spanduk jalan raya" },
      { key: "D", text: "Menghilangkan identitas komunikator (OSIS/Adiwiyata) agar pembaca menebak-nebak pengirimnya" }
    ],
    answer: "B",
    explanation: "Tepat Sekali! Komunikan remaja (usia 15–18 tahun) membutuhkan daya tarik visual instan (aturan 3 detik) melalui ilustrasi tumbler yang kuat, kontras tinggi, dan teks yang ringkas."
  },
  {
    question: "Jika sebuah poster kampanye sekolah dirancang untuk dipublikasikan pada media feed Instagram (media digital), parameter teknis manakah yang wajib dipenuhi oleh desainer?",
    options: [
      { key: "A", text: "Menggunakan mode warna RGB dengan rasio 4:5 (1080 x 1350 px) dan kontras tajam" },
      { key: "B", text: "Menggunakan mode warna CMYK resolusi 300 DPI dengan format file TIFF" },
      { key: "C", text: "Menghapus seluruh white space agar seluruh bidang feed tertutup foto" },
      { key: "D", text: "Membuat ukuran poster 10 x 15 cm satuan cetak" }
    ],
    answer: "A",
    explanation: "Benar! Media digital layar memerlukan profil warna emisi cahaya RGB, rasio potret 4:5 (1080 x 1350 px) agar memenuhi layar ponsel, serta kontras tinggi untuk pemindaian cepat."
  }
];

function prepareShuffledM3Checkpoint() {
  if (m3CheckpointShuffled) return m3CheckpointShuffled;

  // Pilih satu soal acak dari pool
  const base = modul3CheckpointPool[Math.floor(Math.random() * modul3CheckpointPool.length)];

  const originalOptions = base.options.map(opt => ({
    text: opt.text,
    isCorrect: (opt.key === base.answer)
  }));

  const shuffledOpts = shuffleArray(originalOptions);
  const keys = ['A', 'B', 'C', 'D'];
  let newCorrectKey = 'A';

  const finalOptions = shuffledOpts.map((optItem, optIdx) => {
    const key = keys[optIdx] || String.fromCharCode(65 + optIdx);
    if (optItem.isCorrect) {
      newCorrectKey = key;
    }
    return {
      key: key,
      text: optItem.text,
      isCorrect: optItem.isCorrect
    };
  });

  m3CheckpointShuffled = {
    question: base.question,
    options: finalOptions,
    answer: newCorrectKey,
    explanation: base.explanation
  };

  return m3CheckpointShuffled;
}

function renderModul3Checkpoint() {
  const qText = document.getElementById('m3CheckpointQuestionText');
  const optContainer = document.getElementById('m3CheckpointOptionsContainer');
  const fb = document.getElementById('m3CheckpointFeedback');
  const badge = document.getElementById('m3CheckpointStatusBadge');
  const btn = document.getElementById('btnCheckM3Checkpoint');
  const banner = document.getElementById('modul3CompletionBanner');

  if (!qText || !optContainer) return;

  const isPassed = localStorage.getItem('grafikaku_m3_checkpoint_passed') === 'true';
  const q = prepareShuffledM3Checkpoint();

  qText.textContent = q.question;
  if (fb && !isPassed) fb.innerHTML = '';

  if (isPassed) {
    if (badge) {
      badge.className = 'status-pill open';
      badge.innerHTML = '✓ Lulus • Seluruh Modul Tuntas';
    }
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>✓ Evaluasi TP 3 Selesai</span>';
    }
    if (banner) {
      banner.style.display = 'block';
    }
  } else {
    if (badge) {
      badge.className = 'status-pill locked';
      badge.innerHTML = '🔒 Jawab Benar untuk Menyelesaikan Modul 3';
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>Periksa Jawaban Evaluasi</span>';
    }
    if (banner) {
      banner.style.display = 'none';
    }
  }

  optContainer.innerHTML = '';
  q.options.forEach(opt => {
    const optEl = document.createElement('div');
    optEl.className = 'quiz-option' + (userM3CheckpointAnswer === opt.key ? ' selected' : '');
    if (isPassed && opt.key === q.answer) {
      optEl.style.background = 'var(--green-light)';
      optEl.style.borderColor = 'var(--black)';
    }
    optEl.innerHTML = `<strong>${opt.key}.</strong> ${opt.text}`;
    optEl.onclick = () => {
      if (isPassed) return;
      userM3CheckpointAnswer = opt.key;
      renderModul3Checkpoint();
    updateProgressUI();
    updateUnlockUI();
    };
    optContainer.appendChild(optEl);
  });
}

function checkModul3Checkpoint() {
  const fb = document.getElementById('m3CheckpointFeedback');
  if (!fb) return;
  const q = prepareShuffledM3Checkpoint();

  if (!userM3CheckpointAnswer) {
    fb.innerHTML = `
      <div style="background: var(--red-light); border: 2px solid var(--black); border-radius: 10px; padding: 12px 16px; font-weight: 700; color: var(--black); box-shadow: var(--shadow-sm);">
        &times; Silakan pilih salah satu opsi jawaban terlebih dahulu sebelum memeriksa!
      </div>
    `;
    return;
  }

  if (userM3CheckpointAnswer === q.answer) {
    localStorage.setItem('grafikaku_m3_checkpoint_passed', 'true');
    if (typeof syncProgressToSupabase === 'function') {
      syncProgressToSupabase('m3_checkpoint_passed', { is_passed: true });
    }
    fb.innerHTML = `
      <div style="background: var(--green-light); border: 2px solid var(--black); border-radius: 10px; padding: 14px 18px; font-weight: 700; color: var(--black); box-shadow: var(--shadow-sm);">
        ✓ ${q.explanation}
      </div>
    `;
    renderModul3Checkpoint();
    updateProgressUI();
    updateUnlockUI();

    const banner = document.getElementById('modul3CompletionBanner');
    if (banner) {
      banner.style.display = 'block';
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  } else {
    fb.innerHTML = `
      <div style="background: var(--red-light); border: 2px solid var(--black); border-radius: 10px; padding: 14px 18px; font-weight: 700; color: var(--black); box-shadow: var(--shadow-sm);">
        &times; Jawaban belum tepat. Cermati kembali studi kasus komunikasi visual dan perbandingan media cetak vs digital di atas!
      </div>
    `;
    // Acak ulang opsi untuk percobaan berikutnya
    m3CheckpointShuffled = null;
    userM3CheckpointAnswer = null;
    setTimeout(() => {
      renderModul3Checkpoint();
    updateProgressUI();
    updateUnlockUI();
    }, 1400);
  }
}


// Initial Bootstrap on Page Load
function initApp() {
  if (typeof renderStudentIdentityBadge === 'function') {
    renderStudentIdentityBadge();
  }
  if (typeof loadProgressFromSupabase === 'function') {
    loadProgressFromSupabase();
  }
  renderSoftwareSteps();
  renderModul3Checkpoint();
  renderSubmissionStatus();
  updateProgressUI();
  updateUnlockUI();
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


