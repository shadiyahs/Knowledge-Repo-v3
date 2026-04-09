// ── FORTUDE REPOSITORY SEARCH ──

const SEARCH_INDEX = [
  // PRACTICES
  { title: 'Fortest — M3 Test Automation',              type: 'Battlecard',          practice: 'Infor M3 & CloudSuite',      href: '../practices/infor-m3-cloudsuite.html' },
  { title: 'Charlie M3 Agent — Product Overview',       type: 'Product Overview',    practice: 'Infor M3 & CloudSuite',      href: '../practices/infor-m3-cloudsuite.html' },
  { title: 'Industry Test Packs — Manufacturing',       type: 'Technical Guide',     practice: 'Infor M3 & CloudSuite',      href: '../practices/infor-m3-cloudsuite.html' },
  { title: 'UK Client Win — M3 Rollout',                type: 'Case Study',          practice: 'Infor M3 & CloudSuite',      href: '../practices/infor-m3-cloudsuite.html' },
  { title: 'Resource Augmentation — Proposal Template', type: 'Proposal',            practice: 'Infor M3 & CloudSuite',      href: '../practices/infor-m3-cloudsuite.html' },
  { title: 'Fortest — BC & D365 Battlecard',            type: 'Battlecard',          practice: 'Business Central & D365',    href: '../practices/business-central.html' },
  { title: 'ERP Migration — Proposal Template',         type: 'Proposal',            practice: 'Business Central & D365',    href: '../practices/business-central.html' },
  { title: 'Continuous Updates — Service Overview',     type: 'Engagement Overview', practice: 'Business Central & D365',    href: '../practices/business-central.html' },
  { title: 'Charlie — AI Assistant Platform Overview',  type: 'Product Overview',    practice: 'Data & AI',                  href: '../practices/data-ai.html' },
  { title: 'Analytics Accelerators Library',            type: 'Accelerator',         practice: 'Data & AI',                  href: '../practices/data-ai.html' },
  { title: 'AI Ready Data Platform — Proposal Template',type: 'Proposal',            practice: 'Data & AI',                  href: '../practices/data-ai.html' },
  { title: 'Data Governance Framework v1',              type: 'Framework',           practice: 'Data & AI',                  href: '../practices/data-ai.html' },
  { title: 'Analytics Adoption Support — Case Study',   type: 'Case Study',          practice: 'Data & AI',                  href: '../practices/data-ai.html' },
  { title: 'Agentic AI Frameworks — Overview Deck',     type: 'Product Overview',    practice: 'Automation',                 href: '../practices/automation.html' },
  { title: 'AP & CO RPA Playbook',                      type: 'Playbook',            practice: 'Automation',                 href: '../practices/automation.html' },
  { title: 'IDP — Competitive Battlecard',              type: 'Battlecard',          practice: 'Automation',                 href: '../practices/automation.html' },
  { title: 'Warehouse & Supply Chain — Proposal',       type: 'Proposal',            practice: 'Automation',                 href: '../practices/automation.html' },
  { title: 'Custom App Development — Engagement Overview', type: 'Engagement Overview', practice: 'Low Code App Dev',        href: '../practices/low-code.html' },
  { title: 'Integration Services — Proposal Template',  type: 'Proposal',            practice: 'Low Code App Dev',           href: '../practices/low-code.html' },
  { title: 'UI/UX Design — Portfolio & Approach',       type: 'Engagement Overview', practice: 'Low Code App Dev',           href: '../practices/low-code.html' },
  { title: 'Application Management — Service Overview', type: 'Engagement Overview', practice: 'Managed Services',           href: '../practices/managed-services.html' },
  { title: 'AMEA Managed Testing — Case Study',         type: 'Case Study',          practice: 'Managed Services',           href: '../practices/managed-services.html' },
  { title: 'Data & AI Managed Services — Proposal',     type: 'Proposal',            practice: 'Managed Services',           href: '../practices/managed-services.html' },
  { title: 'Digital Maturity Model v3',                 type: 'Framework',           practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'AI Realization Model',                      type: 'Framework',           practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'Industry Specific Accelerators — Retail',   type: 'Accelerator',         practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'Fractional CIO — Engagement Overview',      type: 'Engagement Overview', practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'OCM Playbook — Enterprise Transformation',  type: 'Playbook',            practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'Cybersecurity & Compliance — Service Overview', type: 'Engagement Overview', practice: 'Digital & AI Advisory',  href: '../practices/advisory.html' },
  { title: 'Enterprise Architecture — Proposal Template', type: 'Proposal',          practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'PPPM — Portfolio Management Framework',     type: 'Framework',           practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'ICT Infrastructure — Proposal Template',    type: 'Proposal',            practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  { title: 'Integrations & Extensions Strategy',        type: 'Engagement Overview', practice: 'Digital & AI Advisory',      href: '../practices/advisory.html' },
  // ENABLERS
  { title: 'I&I April 2026',                            type: 'Intelligence Report', practice: 'Insights & Intelligence',    href: '../enablers/insights-intelligence.html' },
  { title: 'I&I March 2026',                            type: 'Intelligence Report', practice: 'Insights & Intelligence',    href: '../enablers/insights-intelligence.html' },
  { title: 'ANZ IT Market Trends 2026',                 type: 'Market Research',     practice: 'Insights & Intelligence',    href: '../enablers/insights-intelligence.html' },
  { title: 'Fortude vs SAP — Data & AI Battlecard',     type: 'Battlecard',          practice: 'Sales',                      href: '../enablers/sales.html' },
  { title: 'M3 vs Oracle — Implementation Battlecard',  type: 'Battlecard',          practice: 'Sales',                      href: '../enablers/sales.html' },
  { title: 'ANZ Manufacturing Win — Infor M3',          type: 'Case Study',          practice: 'Sales',                      href: '../enablers/sales.html' },
  { title: 'Fortude Corporate Overview Deck',           type: 'Overview Deck',       practice: 'Sales',                      href: '../enablers/sales.html' },
  { title: 'Manufacturing Sector Playbook',             type: 'Playbook',            practice: 'Sales',                      href: '../enablers/sales.html' },
  { title: 'Data Platform Modernization — SoW Template', type: 'SoW Template',      practice: 'Presales',                   href: '../enablers/presales.html' },
  { title: 'Digital Maturity Assessment — Manufacturing', type: 'Assessment Kit',    practice: 'Presales',                   href: '../enablers/presales.html' },
  { title: 'Charlie — Product Demo Script',             type: 'Demo',                practice: 'Presales',                   href: '../enablers/presales.html' },
  { title: 'The State of AI in ERP — 2026',             type: 'White Paper',         practice: 'Marketing',                  href: '../enablers/marketing.html' },
  { title: 'Fortude Brand Style Guide 2026',            type: 'Brand Guide',         practice: 'Marketing',                  href: '../enablers/marketing.html' },
];

function runSearch(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.type.toLowerCase().includes(q) ||
    item.practice.toLowerCase().includes(q)
  ).slice(0, 8);
}

function renderSearchResults(results, query) {
  if (!results.length) {
    return `<div class="sri-empty">No results for "<strong>${query}</strong>"</div>`;
  }
  return results.map(r => `
    <a href="${r.href}" class="search-result-item">
      <div class="sri-title">${highlight(r.title, query)}</div>
      <div class="sri-meta">${r.type} · ${r.practice}</div>
    </a>`).join('');
}

function highlight(text, query) {
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:rgba(39,181,232,0.2);border-radius:2px;padding:0 1px">$1</mark>');
}

// Wire up search on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('globalSearch');
  const overlay = document.getElementById('searchOverlay');
  const results = document.getElementById('searchResults');
  if (!input || !overlay || !results) return;

  input.addEventListener('input', function() {
    const q = this.value.trim();
    if (q.length < 2) { overlay.style.display = 'none'; return; }
    const found = runSearch(q);
    results.innerHTML = renderSearchResults(found, q);
    overlay.style.display = 'block';
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { overlay.style.display = 'none'; this.value = ''; }
  });

  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !overlay.contains(e.target)) {
      overlay.style.display = 'none';
    }
  });
});
