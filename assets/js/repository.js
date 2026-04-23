// ── FORTUDE KNOWLEDGE REPOSITORY ── Shared JS v4 ──
// Implements: auth context, Plausible analytics, flag POST, submit POST

const CONFIG = {
  FLAG_ENDPOINT: 'REPLACE_WITH_POWER_AUTOMATE_FLAG_URL',
  SUBMIT_ENDPOINT: 'REPLACE_WITH_POWER_AUTOMATE_SUBMIT_URL',
  PLAUSIBLE_DOMAIN: 'knowledge.fortude.co',
  AUTH_ENABLED: false
};

const OWNERS = {
  'infor-m3':              { name: 'Priya Nair',        email: 'p.nair@fortude.co' },
  'business-central':      { name: 'James Holden',      email: 'j.holden@fortude.co' },
  'data-ai':               { name: 'Rohan de Silva',    email: 'r.desilva@fortude.co' },
  'automation':            { name: 'Aisha Kapoor',      email: 'a.kapoor@fortude.co' },
  'low-code':              { name: 'Marcus Lee',        email: 'm.lee@fortude.co' },
  'managed-services':      { name: 'Sameera Alwis',     email: 's.alwis@fortude.co' },
  'advisory':              { name: 'Nadia Farook',      email: 'n.farook@fortude.co' },
  'csp-infra':             { name: 'TBC',               email: 'tbc@fortude.co' },
  'insights-intelligence': { name: 'Chamari Perera',    email: 'c.perera@fortude.co' },
  'sales':                 { name: 'Rajan Jayawardena', email: 'r.jayawardena@fortude.co' },
  'presales':              { name: 'Tara Singh',        email: 't.singh@fortude.co' },
  'marketing':             { name: 'Sofia Mendes',      email: 's.mendes@fortude.co' },
  'partners':              { name: 'Ben Walsh',         email: 'b.walsh@fortude.co' }
};

const TYPE_CLASS = {
  'Battlecard': 'type-battlecard', 'Framework': 'type-framework',
  'Case Study': 'type-casestudy', 'Proposal': 'type-proposal',
  'Playbook': 'type-playbook', 'Product Overview': 'type-overview',
  'Engagement Overview': 'type-overview', 'Overview Deck': 'type-overview',
  'Intelligence Report': 'type-report', 'Market Research': 'type-report',
  'Accelerator': 'type-accelerator', 'Demo': 'type-demo',
  'White Paper': 'type-whitepaper', 'Brand Guide': 'type-brand',
  'Webinar Kit': 'type-kit', 'Event Kit': 'type-kit',
  'Assessment Kit': 'type-assessment', 'Technical Guide': 'type-report',
  'SoW Template': 'type-sow'
};
const STATUS_CLASS = { 'Current': 'current', 'Under Review': 'review', 'Archived': 'archived' };

// ── AUTH ──
async function initAuthUser() {
  if (!CONFIG.AUTH_ENABLED) return;
  try {
    const res = await fetch('/.auth/me');
    if (!res.ok) return;
    const data = await res.json();
    const user = data.clientPrincipal;
    if (!user) return;
    const nameClaim  = (user.claims || []).find(c => c.typ === 'name');
    const emailClaim = (user.claims || []).find(c => c.typ === 'preferred_username' || c.typ === 'email');
    const displayName = nameClaim ? nameClaim.val
      : emailClaim ? emailClaim.val.split('@')[0] : user.userDetails;
    if (!displayName) return;
    const navRight = document.querySelector('.nav-right, .nav-actions');
    if (navRight) {
      const pill = document.createElement('span');
      pill.style.cssText = 'font-size:12px;color:rgba(255,255,255,0.55);padding:4px 10px;background:rgba(255,255,255,0.08);border-radius:6px;white-space:nowrap;';
      pill.textContent = displayName;
      navRight.prepend(pill);
      window._krUser = displayName;
    }
  } catch (e) { console.debug('KR: auth context unavailable', e.message); }
}

// ── ANALYTICS ──
function trackSharePointClick(cardTitle, practice) {
  if (typeof window.plausible !== 'function') return;
  window.plausible('SharePoint Open', { props: { card: cardTitle, practice: practice } });
}

function initSharePointTracking() {
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-sharepoint');
    if (!btn) return;
    const card = btn.closest('.collateral-card');
    const cardTitle = card ? (card.querySelector('.card-title') || {}).textContent || 'Unknown' : 'Unknown';
    const practice  = document.title.replace(' \u2014 Fortude Repository', '').trim() || 'Unknown';
    trackSharePointClick(cardTitle.trim(), practice);
  });
}

// ── CARD BUILDER ──
function buildCard(card) {
  const statusClass   = STATUS_CLASS[card.status] || 'current';
  const typeClass     = TYPE_CLASS[card.type]     || 'type-default';
  const regionPills   = (card.regions   || []).map(r => '<span class="region-pill">'+r+'</span>').join('');
  const audiencePills = (card.audiences || []).map(a => '<span class="audience-pill">'+a+'</span>').join('');
  const relatedLinks  = (card.related   || []).length
    ? '<div class="card-related"><span class="card-related-label">Related: </span>'+card.related.map(r=>'<a href="#">'+r+'</a>').join('')+'</div>' : '';
  const reviewDue = card.reviewDue && card.reviewDue !== 'N/A'
    ? '<span class="card-review-due">Review due '+card.reviewDue+'</span>' : '';
  const safeTitle = card.title.replace(/'/g, "\\'");
  return '<div class="collateral-card status-'+statusClass+'" id="card-'+card.id+'">'
    +'<div class="card-top-row"><span class="status-badge '+statusClass+'">'+card.status+'</span>'
    +'<span class="type-badge '+typeClass+'">'+card.type+'</span>'+regionPills+'</div>'
    +'<div class="card-audience-row">'+audiencePills+'</div>'
    +'<div class="card-title">'+card.title+'</div>'
    +'<div class="card-summary">'+card.summary+'</div>'
    +relatedLinks
    +'<div class="card-footer"><div class="card-meta"><span class="card-date">'+card.date+'</span>'+reviewDue+'</div>'
    +'<div class="card-actions">'
    +'<button class="btn-flag" onclick="openFlagModal(\''+card.id+'\',\''+safeTitle+'\',\''+card.date+'\',\''+  (card.reviewDue||'')+'\',\''+(card.owner||'')+'\')">Flag</button>'
    +'<a href="'+(card.sharepoint||'#')+'" target="_blank" class="btn-sharepoint"><span class="sp-icon"></span>SharePoint</a>'
    +'</div></div></div>';
}

function buildEmptyState(practiceName, subLabel, submitUrl) {
  var url = submitUrl || '../submit.html';
  return '<div class="empty-state"><div class="empty-icon">\uD83D\uDDC2\uFE0F</div>'
    +'<div class="empty-title">No collateral here yet</div>'
    +'<div class="empty-desc">This subcategory is waiting for its first submission.<br>'
    +'If you own collateral for <strong>'+practiceName+' \u2014 '+subLabel+'</strong>, submit it and it will be live within 48 hours.</div>'
    +'<a href="'+url+'" class="btn-empty">+ Submit the first item \u2192</a></div>';
}

function renderSubcategories(subcategories, practiceName, submitUrl) {
  if (!subcategories || !subcategories.length) return '';
  var tabs   = subcategories.map(function(sub,i){ return '<div class="sub-tab'+(i===0?' active':'')+'" onclick="switchTab(this,\''+sub.id+'\')">'+sub.label+'</div>'; }).join('');
  var panels = subcategories.map(function(sub,i){
    var cards   = (sub.cards||[]).map(buildCard).join('');
    var content = cards ? '<div class="cards-grid">'+cards+'</div>' : buildEmptyState(practiceName, sub.label, submitUrl);
    return '<div class="sub-panel'+(i===0?' active':'')+'" id="panel-'+sub.id+'"><div class="cards-area">'+content+'</div></div>';
  }).join('');
  return '<div class="sub-tabs-bar">'+tabs+'</div>'+panels;
}

function switchTab(el, panelId) {
  var bar = el.closest('.sub-tabs-bar');
  var container = bar.parentElement;
  bar.querySelectorAll('.sub-tab').forEach(function(t){ t.classList.remove('active'); });
  container.querySelectorAll('.sub-panel').forEach(function(p){ p.classList.remove('active'); });
  el.classList.add('active');
  var panel = container.querySelector('#panel-'+panelId);
  if (panel) panel.classList.add('active');
}

function renderOwnerFooter(pageId) {
  var owner = OWNERS[pageId];
  if (!owner) return '';
  return '<div class="sidebar-owner"><div class="sidebar-owner-label">Section owner</div>'
    +'<div class="sidebar-owner-name">'+owner.name+'</div>'
    +'<a href="mailto:'+owner.email+'" class="sidebar-owner-email">'+owner.email+'</a></div>';
}

// ── FLAG MODAL ──
var _flagState = {};

function openFlagModal(id, title, date, reviewDue, ownerEmail) {
  _flagState = { id: id, title: title, date: date, reviewDue: reviewDue, ownerEmail: ownerEmail };
  document.getElementById('modal-card-title').textContent = title;
  document.getElementById('modal-card-date').textContent = date + (reviewDue && reviewDue !== 'N/A' ? ' \u00B7 Review due ' + reviewDue : '');
  var select   = document.querySelector('#modal-form .modal-select');
  var textarea = document.querySelector('#modal-form .modal-textarea');
  if (select)   select.value = '';
  if (textarea) textarea.value = '';
  document.getElementById('modal-form').style.display = 'block';
  document.getElementById('modal-success').style.display = 'none';
  var btn = document.querySelector('.btn-modal-submit');
  if (btn) { btn.disabled = false; btn.textContent = 'Submit flag'; }
  document.getElementById('flag-modal').classList.add('open');
}

function closeFlagModal() {
  document.getElementById('flag-modal').classList.remove('open');
}

async function submitFlag() {
  var reason  = (document.querySelector('#modal-form .modal-select')   || {}).value || '';
  var notes   = (document.querySelector('#modal-form .modal-textarea') || {}).value || '';
  var btn     = document.querySelector('.btn-modal-submit');
  if (!reason) { alert('Please select a reason before submitting.'); return; }
  var payload = {
    cardId: _flagState.id, cardTitle: _flagState.title, cardDate: _flagState.date,
    cardReviewDue: _flagState.reviewDue, ownerEmail: _flagState.ownerEmail,
    reason: reason, notes: notes, submittedAt: new Date().toISOString(), pageUrl: window.location.href
  };
  if (!CONFIG.FLAG_ENDPOINT || CONFIG.FLAG_ENDPOINT === 'REPLACE_WITH_POWER_AUTOMATE_FLAG_URL') {
    console.warn('KR: FLAG_ENDPOINT not configured. Payload:', payload);
    document.getElementById('modal-form').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
    setTimeout(closeFlagModal, 2200);
    return;
  }
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting\u2026'; }
  try {
    var res = await fetch(CONFIG.FLAG_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    document.getElementById('modal-form').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
    setTimeout(closeFlagModal, 2200);
  } catch(err) {
    console.error('KR: flag failed', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Submit flag'; }
    alert('Submission failed \u2014 please try again or contact the repository administrator.');
  }
}

document.addEventListener('click', function(e) {
  var overlay = document.getElementById('flag-modal');
  if (overlay && e.target === overlay) closeFlagModal();
});

// ── GUIDELINES TOGGLE ──
function toggleGuidelines() {
  var body    = document.getElementById('guidelines-body');
  var chevron = document.getElementById('guidelines-chevron');
  if (!body) return;
  body.classList.toggle('open');
  if (chevron) chevron.classList.toggle('open');
}

// ── WHAT'S NEW ──
var WHATS_NEW = [
  { title: 'I&amp;I April 2026',                tag: 'new',     practice: 'Insights &amp; Intelligence', ago: '2 days ago',  href: '../enablers/insights-intelligence.html' },
  { title: 'OCM Playbook',                  tag: 'new',     practice: 'Digital &amp; AI Advisory',   ago: '4 days ago',  href: '../practices/advisory.html' },
  { title: 'Manufacturing Sector Playbook', tag: 'updated', practice: 'Sales',                   ago: '1 week ago',  href: '../enablers/sales.html' },
  { title: 'Digital Maturity Model v3',     tag: 'updated', practice: 'Digital &amp; AI Advisory',   ago: '2 weeks ago', href: '../practices/advisory.html' },
];

function renderWhatsNew(items) {
  if (!items || !items.length) return '';
  var inner = items.map(function(n){
    return '<a href="'+n.href+'" class="wn-item"><span class="wn-tag '+n.tag+'">'+(n.tag==='new'?'New':'Updated')+'</span><span class="wn-title">'+n.title+'</span><span class="wn-sub">'+n.practice+' \u00B7 '+n.ago+'</span></a>';
  }).join('');
  return '<div class="whats-new-strip"><span class="wn-label">What\'s new</span><div class="wn-items">'+inner+'</div></div>';
}

// ── SUBMIT FORM ──
async function submitForm() {
  var fields  = ['field-title','field-practice','field-type','field-region','field-audience','field-summary'];
  var missing = fields.filter(function(id){ return !document.getElementById(id).value.trim(); });
  if (missing.length) { alert('Please complete all required fields before submitting.'); document.getElementById(missing[0]).focus(); return; }
  var fileInput = document.getElementById('file-input');
  var hasFile   = fileInput && fileInput.files.length > 0;
  var payload   = {
    title:       document.getElementById('field-title').value.trim(),
    practice:    document.getElementById('field-practice').value,
    type:        document.getElementById('field-type').value,
    region:      document.getElementById('field-region').value,
    audience:    document.getElementById('field-audience').value,
    status:      document.getElementById('field-status').value,
    summary:     document.getElementById('field-summary').value.trim(),
    fileName:    hasFile ? fileInput.files[0].name : 'No file attached',
    submittedAt: new Date().toISOString(),
    submittedBy: window._krUser || 'unknown'
  };
  var btn = document.querySelector('.btn-submit-form');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting\u2026'; }
  if (!CONFIG.SUBMIT_ENDPOINT || CONFIG.SUBMIT_ENDPOINT === 'REPLACE_WITH_POWER_AUTOMATE_SUBMIT_URL') {
    console.warn('KR: SUBMIT_ENDPOINT not configured. Payload:', payload);
    document.getElementById('submit-form-wrapper').style.display = 'none';
    document.getElementById('submit-success').style.display = 'block';
    window.scrollTo(0,0);
    return;
  }
  try {
    var res = await fetch(CONFIG.SUBMIT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    document.getElementById('submit-form-wrapper').style.display = 'none';
    document.getElementById('submit-success').style.display = 'block';
    window.scrollTo(0,0);
  } catch(err) {
    console.error('KR: submit failed', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Submit for review \u2192'; }
    alert('Submission failed \u2014 please try again or email the repository administrator.');
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', async function() {
  var wnTarget = document.getElementById('whats-new-target');
  if (wnTarget) wnTarget.innerHTML = renderWhatsNew(WHATS_NEW);
  await initAuthUser();
  initSharePointTracking();
});
