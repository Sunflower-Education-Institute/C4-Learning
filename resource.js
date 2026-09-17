(function () {
  const resources = window.SEE_RESOURCES || [];
  const reviews = window.SEE_REVIEWS || [];
  const reviewSummaries = window.SEE_REVIEW_SUMMARIES || [];
  const reviewerProfiles = window.SEE_REVIEWERS || {};
  const sourceId = new URLSearchParams(window.location.search).get("id");
  let language = localStorage.getItem("seeLanguage") || "en";

  const copy = {
    en: { back: "Back to all resources", age: "Age range", type: "Resource type", score: "SEE review score", cost: "Current pricing", overview: "Full resource overview", reviews: "Parent and educator reviews", reviewAverage: "Review average", noReviews: "No reviews are available yet.", visit: "Visit official source", save: "Save resource", saved: "Saved", unavailable: "Resource not found", unavailableBody: "This resource may have moved or the link may be incomplete.", aiTitle: "AI-assisted review summary", aiSubtitle: "Pre-generated demo based on published reviews", aiPending: "A bilingual review summary is waiting for editorial preparation.", pros: "What reviewers valued", considerations: "What to consider", basedOn: "Based on", publishedReview: "published review", publishedReviews: "published reviews", demoNote: "Demo summary · Not generated live · Editorial review recommended", readReview: "Read full review" },
    zh: { back: "返回全部资源", age: "适用年龄", type: "资源类型", score: "SEE 评审评分", cost: "当前价格信息", overview: "完整资源介绍", reviews: "家长与教育者评价", reviewAverage: "评论平均分", noReviews: "目前还没有评价。", visit: "访问原始网站", save: "收藏资源", saved: "已收藏", unavailable: "没有找到该资源", unavailableBody: "该资源可能已移动，或者链接不完整。", aiTitle: "AI 辅助生成的评论汇总", aiSubtitle: "根据已发布评论预先生成的演示内容", aiPending: "该资源的双语评论汇总仍在等待编辑整理。", pros: "评论者认可的方面", considerations: "需要考虑的方面", basedOn: "依据", publishedReviews: "条已发布评论", demoNote: "演示汇总 · 并非实时生成 · 建议人工复核", reviewCount: "条已发布评论", readReview: "阅读完整评论" }
  };
  const t = key => copy[language][key] || copy.en[key] || key;
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const localizedSummary = resource => language === "zh" ? (resource.sourceSummary || resource.sourceSummaryEn || "") : (resource.sourceSummaryEn || resource.sourceSummary || "");
  const allTags = resource => ["SUBJECT/DISCIPLINE TAGS", "AGE GROUP TAGS", "COST TYPE TAGS", "EDUCATION SYSTEM/REGIONS TAGS"].flatMap(field => resource[field] || []);
  const reviewCountLabel = count => language === "zh" ? `${count} ${t("publishedReviews")}` : `${count} ${count === 1 ? t("publishedReview") : t("publishedReviews")}`;
  const isTextReview = review => {
    const text = String(review.reviewSummary || "").trim();
    return text && !(text.startsWith("http") && !text.includes(" "));
  };
  const publishedReviewsFor = sourceId => reviews.filter(review => review.sourceId === sourceId && isTextReview(review));
  const averageRating = items => {
    const ratings = items.map(item => Number(item.rating)).filter(Number.isFinite);
    return ratings.length ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : null;
  };
  const localizedResourceType = type => {
    const labels = { Curriculum: "课程体系", "Learning Platform": "学习平台", App: "应用", Worksheets: "练习单", Books: "书籍", Classes: "课程／辅导", Marketplace: "资源市场", Games: "学习游戏" };
    return language === "zh" ? (labels[type] || type) : type;
  };

  function ratingStars(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return `<span class="rating-value">—</span>`;
    const score = Math.max(0, Math.min(5, numeric));
    const stars = Array.from({ length: 5 }, (_, index) => {
      const fill = Math.max(0, Math.min(100, (score - index) * 100));
      return `<span class="score-star" style="--star-fill:${fill}%" aria-hidden="true">☆</span>`;
    }).join("");
    return `<span class="star-meter" role="img" aria-label="${numeric.toFixed(1)} out of 5 stars">${stars}</span><span class="rating-value">${escapeHtml(numeric.toFixed(1))}</span>`;
  }

  function renderReviews(resource) {
    const items = publishedReviewsFor(resource.sourceId).slice(0, 4);
    if (!items.length) return `<p>${t("noReviews")}</p>`;
    return items.map(item => {
      const profile = reviewerProfiles[item.reviewerId];
      const displayName = profile?.displayName || item.reviewerId;
      const badges = (profile?.badges || []).map(badge => `<span class="reviewer-badge ${escapeHtml(badge.id)}">${escapeHtml(badge.label[language === "zh" ? "zh-Hans" : "en"])}</span>`).join("");
      return `<details class="review"><summary><span class="reviewer-line"><strong>${escapeHtml(displayName)}</strong>${item.rating ? `<span class="review-rating">${ratingStars(item.rating)}</span>` : ""}</span><span class="reviewer-badges">${badges}</span><small>${t("readReview")}</small></summary><p>${escapeHtml(item.reviewSummary)}</p></details>`;
    }).join("");
  }

  function renderAiSummary(resource) {
    const summary = reviewSummaries.find(item => item.sourceId === resource.sourceId);
    if (!summary) return `<section class="ai-summary-panel pending"><div class="panel-heading"><div><p class="eyebrow">Demo</p><h2>${t("aiTitle")}</h2><p>${t("aiSubtitle")}</p></div></div><p>${t("aiPending")}</p></section>`;
    const content = summary.content[language === "zh" ? "zh-Hans" : "en"];
    return `<section class="ai-summary-panel"><div class="panel-heading"><div><p class="eyebrow">Demo</p><h2>${t("aiTitle")}</h2><p>${t("aiSubtitle")} · ${t("basedOn")} ${reviewCountLabel(summary.basedOnReviewCount)}</p></div><span class="ai-spark" aria-hidden="true">✦</span></div><p class="ai-overview">${escapeHtml(content.overview)}</p><div class="ai-points"><div><h3>✓ ${t("pros")}</h3><ul>${content.pros.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div><div><h3>△ ${t("considerations")}</h3><ul>${content.considerations.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div></div><small class="ai-note">${t("demoNote")} · ${escapeHtml(summary.generatedAt)}</small></section>`;
  }

  function render() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    const resource = resources.find(item => item.sourceId === sourceId);
    const main = document.querySelector("#resource-detail");
    const toggle = document.querySelector("[data-toggle-language]");
    toggle.textContent = language === "zh" ? "English" : "中文";
    window.SEE_ACCOUNT.updateAccountButton();
    if (!resource) {
      main.innerHTML = `<section class="not-found"><h1>${t("unavailable")}</h1><p>${t("unavailableBody")}</p><a class="primary-button" href="index.html#resources">${t("back")}</a></section>`;
      return;
    }
    document.title = `${resource.resourceName} · SEE`;
    const saved = window.SEE_ACCOUNT.isSaved(resource.sourceId);
    const officialUrl = resource.officialUrl || resource.accessUrlOriginal || "";
    const description = language === "zh" ? (resource.sourceDescription || localizedSummary(resource)) : (resource.sourceSummaryEn || resource.sourceDescription || "");
    const visibleTags = (resource["SUBJECT/DISCIPLINE TAGS"] || []).slice(0, 4);
    const resourceReviews = publishedReviewsFor(resource.sourceId);
    const reviewCount = resourceReviews.length;
    const reviewAverage = averageRating(resourceReviews);
    main.innerHTML = `<a class="back-link" href="index.html#resources">← ${t("back")}</a>
      <article class="compact-detail-shell">
        <section class="compact-detail-hero">
          <div class="compact-detail-cover"><img src="assets/resources/${escapeHtml(resource.imageFileName)}" alt="" onerror="this.remove()"></div>
          <div class="compact-detail-intro">
            <div class="compact-title-row"><div><p class="eyebrow">${escapeHtml(localizedResourceType(resource.sourceType || "Learning resource"))}</p><h1>${escapeHtml(resource.resourceName)}</h1></div><button class="save-detail-button ${saved ? "saved" : ""}" type="button" data-save-detail aria-pressed="${saved}">${saved ? "★" : "☆"} ${saved ? t("saved") : t("save")}</button></div>
            <p class="detail-lede">${escapeHtml(localizedSummary(resource))}</p>
            <div class="detail-grid compact-metadata">
              <div class="detail-item"><span>${t("age")}</span><strong>${escapeHtml(resource.ageGradeRange || "—")}</strong></div>
              <div class="detail-item"><span>${t("type")}</span><strong>${escapeHtml(localizedResourceType(resource.sourceType || "—"))}</strong></div>
              <div class="detail-item"><span>${t("score")}</span><strong class="detail-rating">${ratingStars(resource.initialSeeScore)}</strong></div>
              <div class="detail-item pricing-detail"><span>${t("cost")}</span><strong>${escapeHtml(resource.costDisplay || resource.currentPrice || "—")}</strong></div>
            </div>
            <div class="compact-actions"><div class="tag-row">${visibleTags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>${officialUrl ? `<a class="primary-button compact-source-link" href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer">${t("visit")} ↗</a>` : ""}</div>
          </div>
        </section>
        <div class="detail-dashboard">
          <div>${renderAiSummary(resource)}<details class="description-disclosure"><summary>${t("overview")}</summary><p>${escapeHtml(description)}</p></details></div>
          <section class="compact-review-panel"><div class="panel-heading"><div><p class="eyebrow">Community</p><h2>${t("reviews")}</h2><p>${reviewCountLabel(reviewCount)}</p></div>${reviewAverage !== null ? `<div class="review-average"><span>${t("reviewAverage")}</span>${ratingStars(reviewAverage)}</div>` : ""}</div>${renderReviews(resource)}</section>
        </div>
      </article>`;
    main.querySelector("[data-save-detail]").addEventListener("click", () => {
      window.SEE_ACCOUNT.toggleSaved(resource.sourceId);
      render();
    });
  }

  document.querySelector("[data-toggle-language]").addEventListener("click", () => {
    language = language === "zh" ? "en" : "zh";
    localStorage.setItem("seeLanguage", language);
    render();
  });
  window.addEventListener("see:account-changed", render);
  window.addEventListener("see:saved-changed", render);
  render();
})();
