/**
 * Sinkronisasi Progres & Evaluasi Siswa GrafikaKu ke Supabase
 * Tetap aman berjalan di mode offline/localStorage bila Supabase belum dikonfigurasi.
 */

let _gkSupabaseClient = null;
let _pendingAfterProfileCallback = null;

function getSupabaseClient() {
  if (_gkSupabaseClient) return _gkSupabaseClient;
  const cfg = window.GRAFIKAKU_SUPABASE_CONFIG;
  if (!cfg || !cfg.url || !cfg.anonKey) return null;
  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) return null;

  _gkSupabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
  return _gkSupabaseClient;
}

function getStudentProfile() {
  try {
    const raw = localStorage.getItem('grafikaku_student_profile');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.nama && parsed.kelas) return parsed;
  } catch (e) {}
  return null;
}

function buildStudentKey(profile) {
  const clean = (s) =>
    String(s || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  return `${clean(profile.kelas)}__${clean(profile.nama)}`;
}

function renderStudentIdentityBadge() {
  const badge = document.getElementById('studentIdentityBadge');
  if (!badge) return;
  const profile = getStudentProfile();
  if (profile) {
    const absenText = profile.absen ? ` • No. ${profile.absen}` : '';
    badge.innerHTML = `
      <span>👤 <strong>${profile.nama}</strong> (${profile.kelas}${absenText})</span>
      <button type="button" class="student-badge-edit" onclick="openStudentProfileModal()">Ubah</button>
    `;
    badge.style.display = 'inline-flex';
  } else {
    badge.innerHTML = `
      <span>👤 Identitas siswa belum diisi</span>
      <button type="button" class="student-badge-edit" onclick="openStudentProfileModal()">Isi Nama</button>
    `;
    badge.style.display = 'inline-flex';
  }
}

function openStudentProfileModal(afterSaveCallback) {
  _pendingAfterProfileCallback = typeof afterSaveCallback === 'function' ? afterSaveCallback : null;
  const modal = document.getElementById('studentProfileModal');
  if (!modal) {
    if (_pendingAfterProfileCallback) _pendingAfterProfileCallback();
    return;
  }

  const profile = getStudentProfile();
  const namaEl = document.getElementById('inputStudentNama');
  const kelasEl = document.getElementById('inputStudentKelas');
  const absenEl = document.getElementById('inputStudentAbsen');
  const errEl = document.getElementById('studentProfileError');

  if (namaEl) namaEl.value = profile ? profile.nama : '';
  if (kelasEl) kelasEl.value = profile ? profile.kelas : '';
  if (absenEl) absenEl.value = profile ? (profile.absen || '') : '';
  if (errEl) errEl.style.display = 'none';

  modal.classList.add('open');
}

function closeStudentProfileModal() {
  const modal = document.getElementById('studentProfileModal');
  if (modal) modal.classList.remove('open');
}

function saveStudentProfile(e) {
  if (e && e.preventDefault) e.preventDefault();
  const namaEl = document.getElementById('inputStudentNama');
  const kelasEl = document.getElementById('inputStudentKelas');
  const absenEl = document.getElementById('inputStudentAbsen');
  const errEl = document.getElementById('studentProfileError');

  const nama = namaEl ? namaEl.value.trim() : '';
  const kelas = kelasEl ? kelasEl.value.trim() : '';
  const absen = absenEl ? absenEl.value.trim() : '';

  if (!nama || !kelas) {
    if (errEl) {
      errEl.textContent = 'Nama lengkap dan Kelas wajib diisi sebelum memulai evaluasi.';
      errEl.style.display = 'block';
    }
    return;
  }

  const profile = { nama, kelas, absen };
  localStorage.setItem('grafikaku_student_profile', JSON.stringify(profile));
  renderStudentIdentityBadge();
  closeStudentProfileModal();

  loadProgressFromSupabase().then((found) => {
    if (!found) {
      syncProgressToSupabase('student_login', { nama, kelas, absen });
    }
  });

  if (_pendingAfterProfileCallback) {
    const cb = _pendingAfterProfileCallback;
    _pendingAfterProfileCallback = null;
    cb();
  }
}

function requireStudentProfile(callback) {
  const profile = getStudentProfile();
  if (profile) {
    callback();
  } else {
    openStudentProfileModal(callback);
  }
}

function collectCurrentProgressSnapshot(profile) {
  let passedM1 = [];
  try {
    passedM1 = JSON.parse(localStorage.getItem('grafikaku_passed_checkpoints') || '[]');
  } catch (e) {
    passedM1 = [];
  }

  const kuisScoreRaw = localStorage.getItem('grafikaku_kuis_last_score');
  const kuisCorrectRaw = localStorage.getItem('grafikaku_kuis_last_correct');
  const kuisTotalRaw = localStorage.getItem('grafikaku_kuis_last_total');

  return {
    student_key: buildStudentKey(profile),
    nama: profile.nama,
    kelas: profile.kelas,
    absen: profile.absen || '',
    m1_passed_count: Array.isArray(passedM1) ? passedM1.length : 0,
    m1_passed_list: Array.isArray(passedM1) ? passedM1 : [],
    latihan_emphasis_ok: localStorage.getItem('grafikaku_latihan_emphasis_ok') === 'true',
    latihan_sop_ok: localStorage.getItem('grafikaku_latihan_sop_ok') === 'true',
    kuis_score: kuisScoreRaw !== null ? Number(kuisScoreRaw) : null,
    kuis_correct: kuisCorrectRaw !== null ? Number(kuisCorrectRaw) : null,
    kuis_total: kuisTotalRaw !== null ? Number(kuisTotalRaw) : null,
    kuis_passed: localStorage.getItem('grafikaku_modul2_unlocked') === 'true',
    m2_submitted: localStorage.getItem('grafikaku_m2_submitted') === 'true',
    m2_filename: localStorage.getItem('grafikaku_m2_filename') || '',
    m2_file_url: localStorage.getItem('grafikaku_m2_file_url') || '',
    m3_flow_ok: localStorage.getItem('grafikaku_m3_flow_ok') === 'true',
    m3_checkpoint_passed: localStorage.getItem('grafikaku_m3_checkpoint_passed') === 'true',
    updated_at: new Date().toISOString()
  };
}

async function syncProgressToSupabase(eventType, detailObj = {}) {
  const client = getSupabaseClient();
  const profile = getStudentProfile();
  if (!client || !profile) return { skipped: true };

  const snapshot = collectCurrentProgressSnapshot(profile);

  try {
    const { error: upsertErr } = await client
      .from('student_progress')
      .upsert(snapshot, { onConflict: 'student_key' });

    if (upsertErr) {
      console.warn('[GrafikaKu Sync] Gagal upsert student_progress:', upsertErr.message);
    }

    const logPayload = {
      student_key: snapshot.student_key,
      nama: profile.nama,
      kelas: profile.kelas,
      event_type: eventType,
      score: typeof detailObj.score === 'number' ? detailObj.score : null,
      is_passed: typeof detailObj.is_passed === 'boolean' ? detailObj.is_passed : null,
      detail: detailObj
    };

    const { error: logErr } = await client.from('evaluation_logs').insert(logPayload);
    if (logErr) {
      console.warn('[GrafikaKu Sync] Gagal insert evaluation_logs:', logErr.message);
    }

    return { ok: !upsertErr && !logErr };
  } catch (err) {
    console.warn('[GrafikaKu Sync] Error koneksi:', err);
    return { ok: false, error: err };
  }
}

async function uploadModul2FileToSupabase(file) {
  const client = getSupabaseClient();
  const profile = getStudentProfile();
  const cfg = window.GRAFIKAKU_SUPABASE_CONFIG || {};
  const bucket = cfg.bucket || 'modul2-karya';

  if (!client || !file) {
    return { skipped: true, publicUrl: '' };
  }

  const studentKey = profile ? buildStudentKey(profile) : 'anonim';
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${studentKey}/${Date.now()}_${safeName}`;

  try {
    const { error: uploadErr } = await client.storage
      .from(bucket)
      .upload(storagePath, file, { upsert: true, contentType: file.type || 'image/png' });

    if (uploadErr) {
      console.warn('[GrafikaKu Upload] Gagal upload ke Storage:', uploadErr.message);
      return { ok: false, error: uploadErr.message };
    }

    const { data: urlData } = client.storage.from(bucket).getPublicUrl(storagePath);
    const publicUrl = urlData && urlData.publicUrl ? urlData.publicUrl : '';
    if (publicUrl) {
      localStorage.setItem('grafikaku_m2_file_url', publicUrl);
    }
    return { ok: true, publicUrl };
  } catch (err) {
    console.warn('[GrafikaKu Upload] Error:', err);
    return { ok: false, error: String(err) };
  }
}


async function loadProgressFromSupabase() {
  const client = getSupabaseClient();
  const profile = getStudentProfile();
  if (!client || !profile) return false;

  const studentKey = buildStudentKey(profile);
  try {
    const { data, error } = await client
      .from('student_progress')
      .select('*')
      .eq('student_key', studentKey)
      .maybeSingle();

    if (error || !data) return false;

    if (Array.isArray(data.m1_passed_list)) {
      localStorage.setItem('grafikaku_passed_checkpoints', JSON.stringify(data.m1_passed_list));
    }
    if (data.latihan_emphasis_ok) localStorage.setItem('grafikaku_latihan_emphasis_ok', 'true');
    if (data.latihan_sop_ok) localStorage.setItem('grafikaku_latihan_sop_ok', 'true');
    if (typeof data.kuis_score === 'number') {
      localStorage.setItem('grafikaku_kuis_last_score', String(data.kuis_score));
      if (typeof data.kuis_correct === 'number') localStorage.setItem('grafikaku_kuis_last_correct', String(data.kuis_correct));
      if (typeof data.kuis_total === 'number') localStorage.setItem('grafikaku_kuis_last_total', String(data.kuis_total));
    }
    if (data.kuis_passed) localStorage.setItem('grafikaku_modul2_unlocked', 'true');
    if (data.m2_submitted) {
      localStorage.setItem('grafikaku_m2_submitted', 'true');
      if (data.m2_filename) localStorage.setItem('grafikaku_m2_filename', data.m2_filename);
      if (data.m2_file_url) localStorage.setItem('grafikaku_m2_file_url', data.m2_file_url);
    }
    if (data.m3_flow_ok) localStorage.setItem('grafikaku_m3_flow_ok', 'true');
    if (data.m3_checkpoint_passed) localStorage.setItem('grafikaku_m3_checkpoint_passed', 'true');

    if (typeof updateProgressUI === 'function') updateProgressUI();
    if (typeof updateUnlockUI === 'function') updateUnlockUI();
    if (typeof renderSubmissionStatus === 'function') renderSubmissionStatus();
    if (typeof renderModul3Checkpoint === 'function') renderModul3Checkpoint();
    if (typeof renderPrincipleTabs === 'function') renderPrincipleTabs();
    if (typeof renderPrincipleCheckpoint === 'function') renderPrincipleCheckpoint();

    return true;
  } catch (err) {
    console.warn('[GrafikaKu Sync] Gagal memuat progres dari Supabase:', err);
    return false;
  }
}
