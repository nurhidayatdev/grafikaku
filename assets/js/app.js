// GrafikaKu Main Application & Routing Logic
// --- Single-Page View Routing ---
    const validViews = ['beranda', 'cptp', 'modul1', 'latihan', 'kuis'];

    function navigateTo(viewName) {
      if (!validViews.includes(viewName)) viewName = 'beranda';
      location.hash = viewName;
    }

    function showView(viewName) {
      if (!validViews.includes(viewName)) viewName = 'beranda';
      
      // Toggle active class on sections
      document.querySelectorAll('section.view-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === viewName);
      });

      // Toggle active state in navigation
      document.querySelectorAll('#mainNav a').forEach(a => {
        a.classList.toggle('active', a.dataset.view === viewName);
      });

      // Close mobile menu if open
      document.getElementById('mainNav').classList.remove('open');
      window.scrollTo(0, 0);

      // Render view-specific content
      if (viewName === 'modul1') {
        renderPrincipleTabs();
        renderPrincipleContent();
      }
    }

    window.addEventListener('hashchange', () => {
      showView(location.hash.slice(1));
    });

    // Mobile Hamburger Toggle
    document.getElementById('hamburgerBtn').addEventListener('click', () => {
      document.getElementById('mainNav').classList.toggle('open');
    });

    document.querySelectorAll('#mainNav a').forEach(a => {
      a.addEventListener('click', () => {
        navigateTo(a.dataset.view);
      });
    });

    // --- Modul 1 Logic (F03 & F04) ---
    function renderPrincipleTabs() {
      const container = document.getElementById('principlesTabContainer');
      container.innerHTML = '';
      principlesData.forEach((p, idx) => {
        const btn = document.createElement('button');
        btn.className = 'principle-tab' + (idx === currentPrincipleIndex ? ' active' : '');
        btn.innerHTML = `<span>${idx + 1}. ${p.name.split(' ')[0]}</span>`;
        btn.onclick = () => {
          currentPrincipleIndex = idx;
          renderPrincipleTabs();
          renderPrincipleContent();
        };
        container.appendChild(btn);
      });
    }

    function renderPrincipleContent() {
      const p = principlesData[currentPrincipleIndex];
      
      // Update Texts
      document.getElementById('modBreadcrumbPrinciple').textContent = p.name.split(' ')[0];
      document.getElementById('subtopicIndicator').textContent = `Prinsip ${currentPrincipleIndex + 1} dari 9`;
      document.getElementById('principleHeading').textContent = p.name;
      document.getElementById('principleDescription').textContent = p.desc;
      document.getElementById('canvasCaption').innerHTML = p.caption;

      // Toggle group visibility
      const toggleGroup = document.getElementById('balanceToggleGroup');
      toggleGroup.style.display = p.hasToggle ? 'inline-flex' : 'none';

      // Keywords
      const tagList = document.getElementById('keywordTagsList');
      tagList.innerHTML = '';
      p.keywords.forEach(kw => {
        const tag = document.createElement('span');
        tag.className = 'keyword-tag';
        tag.textContent = kw;
        tag.style.marginRight = '6px';
        tagList.appendChild(tag);
      });
      document.getElementById('keywordExplanation').innerHTML = `<strong>${p.name}:</strong> ${p.explanation}`;

      // Analysis & Avoiding mistakes
      document.getElementById('readingExampleText').textContent = p.reading;
      document.getElementById('avoidMistakeText').textContent = p.avoid;

      // Render Pagination Dots
      const dotsCont = document.getElementById('paginationDots');
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

      // Update Navigation Buttons state
      document.getElementById('btnPrevPrinciple').disabled = (currentPrincipleIndex === 0);
      document.getElementById('btnNextPrinciple').disabled = (currentPrincipleIndex === principlesData.length - 1);

      // Render Artwork SVG & Hotspot Pins (F04)
      renderArtworkCanvas();
    }

    function changePrinciple(delta) {
      const newIndex = currentPrincipleIndex + delta;
      if (newIndex >= 0 && newIndex < principlesData.length) {
        currentPrincipleIndex = newIndex;
        renderPrincipleTabs();
        renderPrincipleContent();
      }
    }

    function setBalanceMode(mode) {
      currentBalanceMode = mode;
      document.getElementById('btnSimetris').classList.toggle('active', mode === 'simetris');
      document.getElementById('btnAsimetris').classList.toggle('active', mode === 'asimetris');
      renderArtworkCanvas();
    }

    function renderArtworkCanvas() {
      const p = principlesData[currentPrincipleIndex];
      const holder = document.getElementById('svgArtworkHolder');
      const pin1 = document.getElementById('pin1');
      const pin2 = document.getElementById('pin2');
      const pin3 = document.getElementById('pin3');
      const popover = document.getElementById('annotationBox');
      popover.style.display = 'none';

      // Setup pins position
      pin1.style.top = p.pins[0].top; pin1.style.left = p.pins[0].left;
      pin2.style.top = p.pins[1].top; pin2.style.left = p.pins[1].left;
      pin3.style.top = p.pins[2].top; pin3.style.left = p.pins[2].left;

      // Draw SVG based on current principle
      if (p.id === 'balance') {
        if (currentBalanceMode === 'simetris') {
          holder.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 600 240">
              <rect width="600" height="240" fill="#F8FAFC"/>
              <!-- Center axis line -->
              <line x1="300" y1="20" x2="300" y2="220" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 6"/>
              <text x="300" y="234" text-anchor="middle" font-size="12" fill="#64748B" font-family="sans-serif">Sumbu Keseimbangan Simetris</text>
              <!-- Left Symmetrical Elements -->
              <circle cx="160" cy="120" r="45" fill="#4338CA" opacity="0.9"/>
              <rect x="80" y="90" width="40" height="60" rx="6" fill="#F59E0B"/>
              <!-- Right Symmetrical Elements -->
              <circle cx="440" cy="120" r="45" fill="#4338CA" opacity="0.9"/>
              <rect x="480" y="90" width="40" height="60" rx="6" fill="#F59E0B"/>
            </svg>
          `;
        } else {
          // Asimetris
          holder.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 600 240">
              <rect width="600" height="240" fill="#F8FAFC"/>
              <line x1="300" y1="20" x2="300" y2="220" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 6"/>
              <text x="300" y="234" text-anchor="middle" font-size="12" fill="#64748B" font-family="sans-serif">Keseimbangan Asimetris (Bobot Setara)</text>
              <!-- Left: One large prominent element -->
              <circle cx="160" cy="120" r="65" fill="#4338CA"/>
              <!-- Right: Multiple smaller elements balancing it -->
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
            <!-- High emphasis item -->
            <circle cx="300" cy="120" r="58" fill="#4338CA" filter="drop-shadow(0 6px 12px rgba(67,56,202,0.3))"/>
            <text x="300" y="126" text-anchor="middle" fill="#FFFFFF" font-weight="bold" font-size="14">FOKUS</text>
            <circle cx="380" cy="120" r="26" fill="#CBD5E1"/>
            <circle cx="460" cy="120" r="26" fill="#CBD5E1"/>
          </svg>
        `;
      } else {
        // Generic clean artwork illustration
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
      const p = principlesData[currentPrincipleIndex];
      const popover = document.getElementById('annotationBox');
      const text = p.pins[pinNum - 1].text;
      
      document.getElementById('annotationText').textContent = text;
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
      fb.className = 'warmup-feedback';
      fb.style.display = 'none';

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

      // Check if both selected
      if (selectedWarmupTerm && selectedWarmupDef) {
        if (correctPairs[selectedWarmupTerm] === selectedWarmupDef) {
          // Correct match
          const termEl = document.querySelector(`.warmup-term-col [data-term="${selectedWarmupTerm}"]`);
          const defEl = document.querySelector(`.warmup-def-col [data-def="${selectedWarmupDef}"]`);
          
          termEl.classList.remove('selected');
          termEl.classList.add('matched');
          termEl.querySelector('.match-mark').textContent = '✓ Benar';

          defEl.classList.remove('selected');
          defEl.classList.add('matched');
          defEl.querySelector('.match-mark').textContent = '✓ Cocok';

          matchedWarmupCount++;
          document.getElementById('warmupScoreBadge').textContent = `Tercocokkan: ${matchedWarmupCount} / 4`;

          fb.textContent = `Tepat! Pasangan istilah ${selectedWarmupTerm.toUpperCase()} berhasil dicocokkan dengan benar.`;
          fb.classList.add('success');

          if (matchedWarmupCount === 4) {
            fb.innerHTML = `<strong>Luar biasa! Seluruh 4 istilah pemanasan telah cocok dengan tepat.</strong> Kamu siap memulai Modul 1.`;
            document.getElementById('btnStartModul1').style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.4)';
          }
        } else {
          // Wrong match
          fb.textContent = 'Belum tepat. Cermati kembali apakah istilah menekankan pembagian bobot, pusat perhatian, kesatuan, atau pola pengulangan.';
          fb.classList.add('error');

          const activeTerm = document.querySelector(`.warmup-term-col [data-term="${selectedWarmupTerm}"]`);
          const activeDef = document.querySelector(`.warmup-def-col [data-def="${selectedWarmupDef}"]`);
          if (activeTerm) activeTerm.classList.remove('selected');
          if (activeDef) activeDef.classList.remove('selected');
        }

        selectedWarmupTerm = null;
        selectedWarmupDef = null;
      }
    }

    // --- Latihan Interaktif Logic ---
    let selectedExercise = null;
    function selectExerciseOption(opt) {
      selectedExercise = opt;
      document.getElementById('optKaryaA').classList.toggle('selected', opt === 'A');
      document.getElementById('optKaryaB').classList.toggle('selected', opt === 'B');
      document.getElementById('btnCheckExercise').disabled = false;
    }

    function checkExerciseAnswer() {
      const fb = document.getElementById('exerciseFeedback');
      if (selectedExercise === 'B') {
        fb.innerHTML = `
          <div style="background: var(--green-light); border: 1px solid #A7F3D0; color: var(--green); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
            &check; Jawaban Benar! Pada Karya B, lingkaran tengah dibuat paling besar dengan warna paling pekat sehingga langsung menjadi pusat perhatian (emphasis) utama bagi mata pembaca.
          </div>
        `;
      } else {
        fb.innerHTML = `
          <div style="background: var(--red-light); border: 1px solid #FECACA; color: var(--red); padding: 14px 18px; border-radius: 8px; font-weight: 600;">
            &times; Belum Tepat. Pada Karya A, ketiga lingkaran memiliki ukuran dan kontras yang setara sehingga tidak ada titik fokus (emphasis) yang dominan. Coba pilih Karya B.
          </div>
        `;
      }
    }

    // --- Kuis Evaluasi Logic ---
    let selectedQuizOpt = null;
    function selectQuizOption(el, opt) {
      selectedQuizOpt = opt;
      document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      document.getElementById('btnCheckQuiz').disabled = false;
    }

    function checkQuizAnswer() {
      const fb = document.getElementById('quizFeedbackBox');
      const optEls = document.querySelectorAll('.quiz-option');

      optEls.forEach(el => {
        if (el.dataset.opt === 'balance') {
          el.classList.add('correct');
        } else if (el.dataset.opt === selectedQuizOpt && selectedQuizOpt !== 'balance') {
          el.classList.add('wrong');
        }
      });

      if (selectedQuizOpt === 'balance') {
        fb.innerHTML = `
          <div style="background: var(--green-light); border: 1px solid #A7F3D0; color: var(--green); padding: 16px 20px; border-radius: 8px;">
            <strong style="font-size: 16px;">&check; Jawaban Benar!</strong><br>
            Balance (Keseimbangan) adalah prinsip yang mengatur pembagian bobot visual setara pada kedua sisi bidang desain.<br>
            <span style="display: inline-block; margin-top: 8px; font-weight: 700; color: var(--navy);">Skor sementara: 80 / 100 (Status: Memenuhi Ambang Tuntas)</span>
          </div>
        `;
      } else {
        fb.innerHTML = `
          <div style="background: var(--red-light); border: 1px solid #FECACA; color: var(--red); padding: 16px 20px; border-radius: 8px;">
            <strong style="font-size: 16px;">&times; Belum Tepat</strong><br>
            Jawaban yang benar adalah <strong>B. Balance (Keseimbangan)</strong>. Prinsip ini berfokus pada pembagian bobot visual agar susunan tidak berat sebelah.<br>
            <span style="display: inline-block; margin-top: 8px; font-weight: 700; color: var(--navy);">Skor sementara: 70 / 100</span>
          </div>
        `;
      }
      document.getElementById('btnCheckQuiz').disabled = true;
    }

    function resetQuiz() {
      document.querySelectorAll('.quiz-option').forEach(el => {
        el.className = 'quiz-option';
      });
      document.getElementById('btnCheckQuiz').disabled = true;
      document.getElementById('quizFeedbackBox').innerHTML = '';
      selectedQuizOpt = null;
    }

    // --- Modal Management ---
    function openGlossaryModal() {
      document.getElementById('glossaryModal').classList.add('open');
    }
    function closeGlossaryModal() {
      document.getElementById('glossaryModal').classList.remove('open');
    }
    function filterGlossary() {
      const q = document.getElementById('glossarySearch').value.toLowerCase();
      document.querySelectorAll('#glossaryList .gloss-item').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(q) ? 'block' : 'none';
      });
    }

    function openLockedModal(title, desc) {
      document.getElementById('lockedModalTitle').textContent = title;
      document.getElementById('lockedModalDesc').textContent = desc;
      document.getElementById('lockedModal').classList.add('open');
    }
    function closeLockedModal() {
      document.getElementById('lockedModal').classList.remove('open');
    }
    function closeModalOnBackdrop(e, modalId) {
      if (e.target.id === modalId) {
        document.getElementById(modalId).classList.remove('open');
      }
    }

    // --- Initial View Load ---
    const initView = location.hash ? location.hash.slice(1) : 'beranda';
    showView(initView);
