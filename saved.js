(function () {
  const resources = window.SEE_RESOURCES || [];
  const selected = new Set();
  const main = document.querySelector("#saved-main");
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const subjectTags = resource => (resource["SUBJECT/DISCIPLINE TAGS"] || []).join(", ") || "—";

  function comparison(resourcesToCompare) {
    if (resourcesToCompare.length < 2) return "";
    const rows = [
      ["Age range", item => item.ageGradeRange || "—"],
      ["Resource type", item => item.sourceType || "—"],
      ["Cost", item => item.originalCostEstimateUsd || "—"],
      ["Initial SEE score", item => Number.isFinite(Number(item.initialSeeScore)) ? `${item.initialSeeScore} / 5` : "—"],
      ["Subjects", subjectTags]
    ];
    return `<section class="comparison-section" id="comparison"><div class="saved-heading"><div><p class="eyebrow">Side-by-side</p><h2>Compare selected resources</h2></div></div><div class="comparison-scroll"><table class="comparison-table"><thead><tr><th>Feature</th>${resourcesToCompare.map(item => `<th><a href="resource.html?id=${encodeURIComponent(item.sourceId)}" target="_blank">${escapeHtml(item.resourceName)} ↗</a></th>`).join("")}</tr></thead><tbody>${rows.map(([label, value]) => `<tr><th>${label}</th>${resourcesToCompare.map(item => `<td>${escapeHtml(value(item))}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
  }

  function render() {
    window.SEE_ACCOUNT.updateAccountButton();
    if (!window.SEE_ACCOUNT.isSignedIn()) {
      main.innerHTML = `<section class="saved-empty"><p class="eyebrow">Demo account</p><h1>Sign in to save and compare resources</h1><p>The prefilled demo account keeps your selections only in this browser.</p><button class="primary-button" type="button" data-open-signin>Sign in</button></section>`;
      main.querySelector("[data-open-signin]").addEventListener("click", () => window.SEE_ACCOUNT.openSignIn());
      return;
    }
    const savedIds = new Set(window.SEE_ACCOUNT.savedIds());
    const savedResources = resources.filter(item => savedIds.has(item.sourceId));
    [...selected].forEach(id => { if (!savedIds.has(id)) selected.delete(id); });
    const chosen = savedResources.filter(item => selected.has(item.sourceId));
    main.innerHTML = `<section class="profile-strip"><div class="demo-avatar">DP</div><div><p class="eyebrow">Demo account</p><h1>Demo Parent</h1><p>demo@sunflower.example · Saved only in this browser</p></div><button class="secondary-button" type="button" data-sign-out>Sign out</button></section>
      <section class="saved-library"><div class="saved-heading"><div><p class="eyebrow">Your collection</p><h2>Saved resources</h2><p>Select 2–4 resources to compare. Open any title in a new tab if you prefer to review several pages yourself.</p></div><button class="primary-button compare-button" type="button" data-compare ${chosen.length < 2 ? "disabled" : ""}>Compare ${chosen.length || ""}</button></div>
      ${savedResources.length ? `<div class="saved-grid">${savedResources.map(item => `<article class="saved-card"><img src="assets/resources/${escapeHtml(item.imageFileName)}" alt="" onerror="this.remove()"><div><label class="compare-check"><input type="checkbox" data-compare-id="${escapeHtml(item.sourceId)}" ${selected.has(item.sourceId) ? "checked" : ""}><span>Compare</span></label><h3><a href="resource.html?id=${encodeURIComponent(item.sourceId)}" target="_blank">${escapeHtml(item.resourceName)} ↗</a></h3><p>${escapeHtml(item.sourceSummaryEn || item.sourceSummary || "")}</p><button class="remove-saved" type="button" data-remove-id="${escapeHtml(item.sourceId)}">Remove from saved</button></div></article>`).join("")}</div>` : `<div class="collection-empty"><h3>Your collection is empty</h3><p>Use the star on any resource card to save it here.</p><a class="primary-button" href="index.html#resources">Explore resources</a></div>`}
      <p class="compare-message" aria-live="polite">${chosen.length === 1 ? "Select at least one more resource to compare." : chosen.length === 4 ? "You can compare up to four resources." : ""}</p></section>
      ${comparison(chosen)}`;

    main.querySelector("[data-sign-out]").addEventListener("click", () => { window.SEE_ACCOUNT.signOut(); render(); });
    main.querySelectorAll("[data-remove-id]").forEach(button => button.addEventListener("click", () => { window.SEE_ACCOUNT.toggleSaved(button.dataset.removeId); render(); }));
    main.querySelectorAll("[data-compare-id]").forEach(input => input.addEventListener("change", () => {
      if (input.checked && selected.size >= 4) { input.checked = false; return; }
      if (input.checked) selected.add(input.dataset.compareId); else selected.delete(input.dataset.compareId);
      render();
    }));
    const compareButton = main.querySelector("[data-compare]");
    if (compareButton) compareButton.addEventListener("click", () => document.querySelector("#comparison")?.scrollIntoView({ behavior: "smooth" }));
  }

  window.addEventListener("see:account-changed", render);
  window.addEventListener("see:saved-changed", render);
  render();
})();
