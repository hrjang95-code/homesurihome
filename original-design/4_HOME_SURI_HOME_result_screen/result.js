document.addEventListener('DOMContentLoaded', () => {
  const d = window.HOME_SURI_DATA.diagnosisResult;

  document.querySelector('#issueTitle').textContent = d.issueTitle;
  document.querySelector('#confidencePill').textContent = `AI 분석 신뢰도 ${d.confidence}%`;

  document.querySelector('#summaryGrid').innerHTML = d.summary.map(item => `
    <article class="summary-card">
      <span class="summary-icon"><i data-lucide="${item.icon}"></i></span>
      <small>${item.label}</small>
      <strong>${item.value}</strong>
    </article>
  `).join('');

  document.querySelector('#cautionList').innerHTML = d.cautions.map(text => `<li>${text}</li>`).join('');

  document.querySelector('#toolGrid').innerHTML = d.requiredTools.map(item => `
    <article class="tool-card"><i data-lucide="${item.icon}"></i><span>${item.label}</span></article>
  `).join('');

  document.querySelector('#partCard').innerHTML = `
    <img src="${d.part.image}" alt="${d.part.name}">
    <div class="part-info">
      <span class="part-badge">${d.part.badge}</span>
      <h3>${d.part.name}</h3>
      <p>${d.part.description}</p>
      <small>${d.part.note}</small>
    </div>
  `;

  document.querySelector('#stepCount').textContent = `${d.steps.length}단계 중 1단계`;
  document.querySelector('#stepList').innerHTML = d.steps.map((step, index) => `
    <article class="step-card">
      <div class="step-image-wrap">
        <img src="${step.image}" alt="${step.title}">
        <span class="step-badge">STEP 0${index + 1}</span>
      </div>
      <div class="step-body">
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      </div>
    </article>
  `).join('');

  document.querySelector('#checklist').innerHTML = d.checklist.map((label, index) => `
    <label class="check-item">
      <input type="checkbox" data-check="${index}">
      <span>${label}</span>
    </label>
  `).join('');

  document.querySelector('#completeBtn').addEventListener('click', () => {
    const all = [...document.querySelectorAll('[data-check]')];
    if (all.every(item => item.checked)) {
      window.HOME_SURI_COMMON.toast('수리 완료로 기록했어요!');
    } else {
      window.HOME_SURI_COMMON.toast('체크리스트를 모두 확인해주세요.');
    }
  });

  document.querySelector('#expertBtn').addEventListener('click', () => {
    window.HOME_SURI_COMMON.toast('전문가 연결 화면은 다음 단계에서 연결됩니다.');
  });

  window.HOME_SURI_COMMON.initIcons();
});
