// ── FORTUDE KNOWLEDGE REPOSITORY ── Shared JS ──

// Knowledge owners per practice/enabler id
const OWNERS = {
  'infor-m3':       { name: 'Priya Nair',          email: 'p.nair@fortude.co' },
  'business-central':{ name: 'James Holden',        email: 'j.holden@fortude.co' },
  'data-ai':        { name: 'Rohan de Silva',       email: 'r.desilva@fortude.co' },
  'automation':     { name: 'Aisha Kapoor',         email: 'a.kapoor@fortude.co' },
  'low-code':       { name: 'Marcus Lee',           email: 'm.lee@fortude.co' },
  'managed-services':{ name: 'Sameera Alwis',       email: 's.alwis@fortude.co' },
  'advisory':       { name: 'Nadia Farook',         email: 'n.farook@fortude.co' },
  'insights-intelligence': { name: 'Chamari Perera', email: 'c.perera@fortude.co' },
  'sales':          { name: 'Rajan Jayawardena',    email: 'r.jayawardena@fortude.co' },
  'presales':       { name: 'Tara Singh',           email: 't.singh@fortude.co' },
  'marketing':      { name: 'Sofia Mendes',         email: 's.mendes@fortude.co' },
  'partners':       { name: 'Ben Walsh',            email: 'b.walsh@fortude.co' },
  'csp-infra':      { name: 'TBC',                    email: 'tbc@fortude.co' }
};

// Type → CSS class mapping
const TYPE_CLASS = {
  'Battlecard': 'type-battlecard',
  'Framework': 'type-framework',
  'Case Study': 'type-casestudy',
  'Proposal': 'type-proposal',
  'Playbook': 'type-playbook',
  'Product Overview': 'type-overview',
  'Engagement Overview': 'type-overview',
  'Overview Deck': 'type-overview',
  'Intelligence Report': 'type-report',
  'Market Research': 'type-report',
  'Accelerator': 'type-accelerator',
  'Demo': 'type-demo',
  'White Paper': 'type-whitepaper',
  'Brand Guide': 'type-brand',
  'Webinar Kit': 'type-kit',
  'Event Kit': 'type-kit',
  'Assessment Kit': 'type-assessment',
  'Technical Guide': 'type-report',
  'SoW Template': 'type-sow'
};

// Status → CSS class
const STATUS_CLASS = {
  'Current': 'current',
  'Under Review': 'review',
  'Archived': 'archived'
};

// Build a collateral card HTML string
function buildCard(card) {
  const statusClass = STATUS_CLASS[card.status] || 'current';
  const typeClass = TYPE_CLASS[card.type] || 'type-default';

  const regionPills = (card.regions || [])
    .map(r => `<span class="region-pill">${r}</span>`).join('');

  const audiencePills = (card.audiences || [])
    .map(a => `<span class="audience-pill">${a}</span>`).join('');

  const relatedLinks = (card.related || []).length
    ? `<div class="card-related">
        <span class="card-related-label">Related: </span>
        ${card.related.map(r => `<a href="#">${r}</a>`).join('')}
       </div>` : '';

  const reviewDue = card.reviewDue && card.reviewDue !== 'N/A'
    ? `<span class="card-review-due">Review due ${card.reviewDue}</span>` : '';

  return `
    <div class="collateral-card status-${statusClass}" id="card-${card.id}">
      <div class="card-top-row">
        <span class="status-badge ${statusClass}">${card.status}</span>
        <span class="type-badge ${typeClass}">${card.type}</span>
        ${regionPills}
      </div>
      <div class="card-audience-row">${audiencePills}</div>
      <div class="card-title">${card.title}</div>
      <div class="card-summary">${card.summary}</div>
      ${relatedLinks}
      <div class="card-footer">
        <div class="card-meta">
          <span class="card-date">${card.date}</span>
          ${reviewDue}
        </div>
        <div class="card-actions">
          <button class="btn-flag" onclick="openFlagModal('${card.id}', '${card.title.replace(/'/g,"\\'")}', '${card.date}', '${card.reviewDue || ''}')">Flag</button>
          <a href="${card.sharepoint || '#'}" target="_blank" class="btn-sharepoint">
            <span class="sp-icon"></span>SharePoint
          </a>
        </div>
      </div>
    </div>`;
}

// Build empty state HTML
function buildEmptyState(practiceName, subLabel, submitUrl) {
  const url = submitUrl || '../submit.html';
  return `
    <div class="empty-state">
      <div class="empty-icon">🗂️</div>
      <div class="empty-title">No collateral here yet</div>
      <div class="empty-desc">
        This subcategory is waiting for its first submission.<br>
        If you own collateral for <strong>${practiceName} — ${subLabel}</strong>,
        submit it and it will be live within 48 hours.
      </div>
      <a href="${url}" class="btn-empty">+ Submit the first item →</a>
    </div>`;
}

// Render subcategory tabs and panels
function renderSubcategories(subcategories, practiceName, submitUrl) {
  if (!subcategories || !subcategories.length) return '';

  const tabs = subcategories.map((sub, i) => `
    <div class="sub-tab${i === 0 ? ' active' : ''}"
         onclick="switchTab(this, '${sub.id}')">
      ${sub.label}
    </div>`).join('');

  const panels = subcategories.map((sub, i) => {
    const cards = (sub.cards || []).map(buildCard).join('');
    const content = cards
      ? `<div class="cards-grid">${cards}</div>`
      : buildEmptyState(practiceName, sub.label, submitUrl);
    return `
      <div class="sub-panel${i === 0 ? ' active' : ''}" id="panel-${sub.id}">
        <div class="cards-area">${content}</div>
      </div>`;
  }).join('');

  return `<div class="sub-tabs-bar">${tabs}</div>${panels}`;
}

// Tab switching
function switchTab(el, panelId) {
  const bar = el.closest('.sub-tabs-bar');
  const container = bar.parentElement;
  bar.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
  container.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const panel = container.querySelector(`#panel-${panelId}`);
  if (panel) panel.classList.add('active');
}

// Sidebar owner footer
function renderOwnerFooter(pageId) {
  const owner = OWNERS[pageId];
  if (!owner) return '';
  return `
    <div class="sidebar-owner">
      <div class="sidebar-owner-label">Section owner</div>
      <div class="sidebar-owner-name">${owner.name}</div>
      <a href="mailto:${owner.email}" class="sidebar-owner-email">${owner.email}</a>
    </div>`;
}

// ── FLAG MODAL ──
function openFlagModal(id, title, date, reviewDue) {
  document.getElementById('modal-card-title').textContent = title;
  document.getElementById('modal-card-date').textContent =
    `${date}${reviewDue && reviewDue !== 'N/A' ? ' · Review due ' + reviewDue : ''}`;
  document.getElementById('flag-modal').classList.add('open');
  document.getElementById('modal-form').style.display = 'block';
  document.getElementById('modal-success').style.display = 'none';
}

function closeFlagModal() {
  document.getElementById('flag-modal').classList.remove('open');
}

function submitFlag() {
  document.getElementById('modal-form').style.display = 'none';
  document.getElementById('modal-success').style.display = 'block';
  setTimeout(closeFlagModal, 2200);
}

// Close on overlay click
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('flag-modal');
  if (overlay && e.target === overlay) closeFlagModal();
});

// ── GUIDELINES TOGGLE ──
function toggleGuidelines() {
  const body = document.getElementById('guidelines-body');
  const chevron = document.getElementById('guidelines-chevron');
  if (!body) return;
  body.classList.toggle('open');
  chevron.classList.toggle('open');
}

// ── WHAT'S NEW STRIP ──
const WHATS_NEW = [
  { title: 'I&I April 2026',                tag: 'new',     type: 'Intelligence Report', practice: 'Insights & Intelligence', ago: '2 days ago',  href: '../enablers/insights-intelligence.html' },
  { title: 'OCM Playbook',                  tag: 'new',     type: 'Playbook',            practice: 'Digital & AI Advisory',  ago: '4 days ago',  href: '../practices/advisory.html' },
  { title: 'Manufacturing Sector Playbook', tag: 'updated', type: 'Playbook',            practice: 'Sales',                  ago: '1 week ago',  href: '../enablers/sales.html' },
  { title: 'Digital Maturity Model v3',     tag: 'updated', type: 'Framework',           practice: 'Digital & AI Advisory',  ago: '2 weeks ago', href: '../practices/advisory.html' },
];

function renderWhatsNew(items) {
  if (!items || !items.length) return '';
  const inner = items.map(n => `
    <a href="${n.href}" class="wn-item">
      <span class="wn-tag ${n.tag}">${n.tag === 'new' ? 'New' : 'Updated'}</span>
      <span class="wn-title">${n.title}</span>
      <span class="wn-sub">${n.practice} · ${n.ago}</span>
    </a>`).join('');
  return `
    <div class="whats-new-strip">
      <span class="wn-label">What's new</span>
      <div class="wn-items">${inner}</div>
    </div>`;
}

// Inject What's New strip after nav on page load
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.global-nav');
  if (nav && document.getElementById('whats-new-target')) {
    document.getElementById('whats-new-target').innerHTML = renderWhatsNew(WHATS_NEW);
  }
});

// ── SEARCH ──
// Populated by search.js — this is the hook
