const resources = window.SEE_RESOURCES || [];
const reviews = window.SEE_REVIEWS || [];
const tagFieldByCategory = {
  subject: "SUBJECT/DISCIPLINE TAGS",
  ageGroup: "AGE GROUP TAGS",
  costType: "COST TYPE TAGS",
  region: "EDUCATION SYSTEM/REGIONS TAGS",
  other: "OTHER CONTENT TAGS"
};

const resourceTypeBySourceId = {
  see1_abcmouse: "Learning Platform", see2_allinone: "Curriculum", see3_ambleside: "Curriculum",
  see4_beastaca: "Curriculum", see5_beestar: "Learning Platform", see6_ck12: "Learning Platform",
  see7_ctcmath: "Curriculum", see8_education: "Worksheets", see9_fishtank: "Curriculum",
  see10_gomath: "Curriculum", see11_harbor: "Curriculum", see12_homeshare: "Worksheets",
  see13_ixl: "Learning Platform", see14_k5: "Worksheets", see15_kahoot: "Learning Platform",
  see16_khan: "Learning Platform", see17_kumon: "Classes", see18_logic: "Curriculum",
  see19_mathfocus: "Curriculum", see20_mathfun: "Learning Platform", see21_mammoth: "Curriculum",
  see22_mathseeds: "App", see23_miaca: "Curriculum", see24_nautilus: "Curriculum",
  see25_nightzoo: "Games", see26_oakmeadow: "Curriculum", see27_oaknational: "Curriculum",
  see28_pbs: "Learning Platform", see29_powerhs: "Curriculum", see30_prodigy: "Games",
  see31_shormann: "Classes", see32_simplyc: "Curriculum", see33_stmath: "Learning Platform",
  see34_supercharged: "Curriculum", see35_tpt: "Marketplace", see36_teachtext: "Curriculum",
  see37_underhome: "Curriculum", see38_weplaym: "Curriculum", see39_allreading: "Curriculum"
};

const resourceTypeOrder = ["Curriculum", "Learning Platform", "App", "Worksheets", "Books", "Classes", "Marketplace", "Games"];

const translations = {
  en: {
    navExplore: "Explore resources", navAbout: "About SEE", navEducators: "For educators", signIn: "Sign in",
    eyebrow: "Learning resources for every family", heroTitle: "Find learning resources that fit your child",
    heroDescription: "Trusted reviews from parents, educators, and researchers.", heroCta: "Explore resources",
    libraryEyebrow: "Learning resource library", libraryTitle: "Explore learning resources", resources: "resources",
    searchLabel: "Search learning resources", searchPlaceholder: "Search resources…", searchShort: "Search", subject: "Subject", age: "Age",
    filterByTags: "Filter by tags", subjectsGroup: "Subjects", ageGroupsGroup: "Age group", resourceTypesGroup: "Resource type", systemsGroup: "Education system / region", costTypesGroup: "Cost type",
    cost: "Cost type", sort: "Sort", clear: "Clear", allSubjects: "All subjects", allAges: "All ages", allCosts: "All cost types",
    sortName: "Name A–Z", sortRating: "Highest SEE score", sortNewest: "Newest", emptyTitle: "No matching resources",
    emptyBody: "Try removing a filter or using a different search term.", aboutEyebrow: "About SEE",
    aboutTitle: "Helping families make informed learning choices",
    aboutBody: "The Sunflower Education Institute brings together resource information and reviews from parents, educators, and researchers. This meeting demo uses a curated local dataset and a browser-only demo account; it has no backend database.",
    pointOneTitle: "Discover", pointOneBody: "Search by subject, age range, and cost type.", pointTwoTitle: "Review",
    pointTwoBody: "Read SEE and community perspectives in one place.", pointThreeTitle: "Choose",
    pointThreeBody: "Visit the source website and decide what fits your family.",
    footerText: "Meeting demo · Resource information reviewed on September 16, 2026; prices may change.",
    ageRange: "Age range", sourceType: "Resource type", seeScore: "SEE review score", originalCost: "Current pricing",
    costPending: "Verification pending", tags: "Tags", resourceOverview: "Resource overview", reviewsLabel: "Parent and educator reviews", noReviews: "No reviews are available yet.",
    visitWebsite: "Visit official website", readReviewSource: "Read third-party source", previous: "Previous", next: "Next", page: "Page", of: "of",
    signinTitle: "Sign in to your demo account", signinBody: "Use the prefilled demo account to try saving and comparing resources. No personal information is collected.",
    emailLabel: "Email", passwordLabel: "Password", loginButton: "Log in", demoPrivacy: "Demo only · Data is stored in this browser.", saveResource: "Save resource", removeSaved: "Remove from saved",
    filterStatus: "Showing results for", dataReview: "Information review pending", findResources: "Find resources", showFilters: "Show search and filters"
  },
  zh: {
    navExplore: "浏览资源", navAbout: "关于 SEE", navEducators: "教育者专区", signIn: "登录",
    eyebrow: "为每个家庭提供学习资源", heroTitle: "找到适合您孩子的学习资源",
    heroDescription: "汇集家长、教育者和研究人员的可信评价。", heroCta: "浏览资源",
    libraryEyebrow: "学习资源库", libraryTitle: "探索学习资源", resources: "个资源",
    searchLabel: "搜索学习资源", searchPlaceholder: "搜索资源…", searchShort: "搜索", subject: "学科", age: "年龄",
    filterByTags: "按标签筛选", subjectsGroup: "学科", ageGroupsGroup: "年龄段", resourceTypesGroup: "资源类型", systemsGroup: "教育体系／适用地区", costTypesGroup: "费用类型",
    cost: "费用类型", sort: "排序", clear: "清除", allSubjects: "所有学科", allAges: "所有年龄", allCosts: "所有费用类型",
    sortName: "名称 A–Z", sortRating: "SEE 评分最高", sortNewest: "最新添加", emptyTitle: "没有符合条件的资源",
    emptyBody: "请移除部分筛选条件或尝试其他关键词。", aboutEyebrow: "关于 SEE",
    aboutTitle: "帮助家庭做出更合适的学习选择",
    aboutBody: "看见向日葵教育研究所汇集学习资源信息，以及家长、教育者和研究人员的评价。本会议演示使用本地精选数据和仅保存在浏览器中的演示账号，不连接后台数据库。",
    pointOneTitle: "发现", pointOneBody: "按照学科、年龄和费用类型搜索。", pointTwoTitle: "了解",
    pointTwoBody: "在一个页面阅读 SEE 和社区的不同观点。", pointThreeTitle: "选择",
    pointThreeBody: "访问资源官方网站，判断它是否适合您的家庭。",
    footerText: "会议演示版 · 资源信息已于 2026 年 9 月 16 日核查；价格可能变化。",
    ageRange: "适用年龄", sourceType: "资源类型", seeScore: "SEE 评审评分", originalCost: "当前价格信息",
    costPending: "等待核实", tags: "标签", resourceOverview: "资源详细介绍", reviewsLabel: "家长与教育者评价", noReviews: "目前还没有评价。",
    visitWebsite: "访问官方网站", readReviewSource: "查看第三方资料来源", previous: "上一页", next: "下一页", page: "第", of: "页，共",
    signinTitle: "登录演示账号", signinBody: "使用预填的演示账号体验收藏与比较功能。我们不会收集个人信息。",
    emailLabel: "邮箱", passwordLabel: "密码", loginButton: "登录", demoPrivacy: "仅供演示 · 数据只保存在当前浏览器中。", saveResource: "收藏资源", removeSaved: "取消收藏",
    filterStatus: "当前筛选", dataReview: "信息等待核查", findResources: "查找资源", showFilters: "打开搜索和筛选"
  }
};

let language = localStorage.getItem("seeLanguage") || "en";
let currentPage = 1;
const pageSize = 9;

const elements = {
  grid: document.querySelector("#resource-grid"), count: document.querySelector("#result-count"), pagination: document.querySelector("#pagination"),
  search: document.querySelector("#search-input"), subject: document.querySelector("#subject-filter"), age: document.querySelector("#age-filter"),
  type: document.querySelector("#type-filter"), cost: document.querySelector("#cost-filter"), sort: document.querySelector("#sort-filter"), clear: document.querySelector("#clear-filters"),
  empty: document.querySelector("#empty-state"), filterNote: document.querySelector("#active-filter-note"),
  signinDialog: document.querySelector("#signin-dialog"), languageButton: document.querySelector(".language-button"), languageMenu: document.querySelector(".language-menu"),
  menuToggle: document.querySelector(".menu-toggle"), mainNav: document.querySelector(".main-nav"),
  filterToggle: document.querySelector("#filter-toggle"), filterClose: document.querySelector("#filter-close"), filterSidebar: document.querySelector(".filter-sidebar")
};

function resourceTags(resource) {
  return Object.entries(tagFieldByCategory).flatMap(([category, field]) => (resource[field] || []).map(tag => ({ category, tag })));
}
const tagsBySource = new Map(resources.map(resource => [resource.sourceId, resourceTags(resource)]));
const reviewsBySource = reviews.reduce((map, row) => {
  if (!map.has(row.sourceId)) map.set(row.sourceId, []);
  map.get(row.sourceId).push(row);
  return map;
}, new Map());

function t(key) { return translations[language][key] || translations.en[key] || key; }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
function normalizedResourceType(resource) { return resourceTypeBySourceId[resource.sourceId] || "Learning Platform"; }
function localizedResourceType(type) {
  const labels = {
    Curriculum: "课程体系", "Learning Platform": "学习平台", App: "应用", Worksheets: "练习单",
    Books: "书籍", Classes: "课程／辅导", Marketplace: "资源市场", Games: "学习游戏"
  };
  return language === "zh" ? (labels[type] || type) : type;
}
function ageTagOrder(tag) {
  const controlledOrder = ["Preschool", "Pre-K", "Kindergarten", "Early Elementary", "Upper Elementary", "Middle School", "High School", "All Ages", "Placement-Based"];
  const controlledIndex = controlledOrder.indexOf(tag);
  if (controlledIndex >= 0) return controlledIndex;
  const match = tag.match(/Ages?\s*(\d+)/i);
  if (match) return Number(match[1]);
  if (/infant|baby|toddler/i.test(tag)) return 0;
  if (/preschool/i.test(tag)) return 3;
  if (/pre-k/i.test(tag)) return 4;
  if (/kindergarten/i.test(tag)) return 5;
  if (/adult/i.test(tag)) return 100;
  if (/all ages/i.test(tag)) return 998;
  return 999;
}
function uniqueTags(category) {
  if (category === "resourceType") return [...new Set(resources.map(normalizedResourceType))].sort((a, b) => resourceTypeOrder.indexOf(a) - resourceTypeOrder.indexOf(b));
  const tags = [...new Set(resources.flatMap(resource => resource[tagFieldByCategory[category]] || []))];
  return tags.sort((a,b) => category === "ageGroup" ? ageTagOrder(a) - ageTagOrder(b) || a.localeCompare(b) : a.localeCompare(b));
}
function option(value, label) { return `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`; }
function checkedValues(container) { return [...container.querySelectorAll("input:checked")].map(input => input.value); }
function checkboxOptions(category, selected = []) {
  return uniqueTags(category).map(tag => `<label class="check-option"><input type="checkbox" value="${escapeHtml(tag)}" ${selected.includes(tag) ? "checked" : ""}><span>${escapeHtml(category === "resourceType" ? localizedResourceType(tag) : tag)}</span></label>`).join("");
}

function buildFilters() {
  const previous = { subject: checkedValues(elements.subject), age: checkedValues(elements.age), type: checkedValues(elements.type), cost: checkedValues(elements.cost), sort: elements.sort.value || "name" };
  elements.age.innerHTML = checkboxOptions("ageGroup", previous.age);
  elements.subject.innerHTML = checkboxOptions("subject", previous.subject);
  elements.type.innerHTML = checkboxOptions("resourceType", previous.type);
  elements.cost.innerHTML = checkboxOptions("costType", previous.cost);
  elements.sort.innerHTML = option("name", t("sortName")) + option("rating", t("sortRating")) + option("newest", t("sortNewest"));
  elements.sort.value = previous.sort;
}

function matchesTags(sourceId, category, selected) { return !selected.length || (tagsBySource.get(sourceId) || []).some(x => x.category === category && selected.includes(x.tag)); }
function filteredResources() {
  const query = elements.search.value.trim().toLowerCase();
  const selected = { subject: checkedValues(elements.subject), age: checkedValues(elements.age), type: checkedValues(elements.type), cost: checkedValues(elements.cost) };
  const result = resources.filter(resource => {
    const haystack = [resource.resourceName, resource.sourceType, resource.ageGradeRange, resource.sourceSummaryEn, resource.sourceSummary, resource.sourceDescription, ...(tagsBySource.get(resource.sourceId) || []).map(x => x.tag)].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) && matchesTags(resource.sourceId, "subject", selected.subject) && matchesTags(resource.sourceId, "ageGroup", selected.age) && (!selected.type.length || selected.type.includes(normalizedResourceType(resource))) && matchesTags(resource.sourceId, "costType", selected.cost);
  });
  if (elements.sort.value === "rating") result.sort((a,b) => (Number(b.initialSeeScore)||0) - (Number(a.initialSeeScore)||0) || a.resourceName.localeCompare(b.resourceName));
  else if (elements.sort.value === "newest") result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  else result.sort((a,b) => a.resourceName.localeCompare(b.resourceName));
  return result;
}

function cardTags(resource) {
  const tags = tagsBySource.get(resource.sourceId) || [];
  const subject = tags.find(x => x.category === "subject");
  const ageTag = tags.find(x => x.category === "ageGroup");
  const labels = [subject ? shortCardTag(subject) : "", shortAgeRange(resource.ageGradeRange) || (ageTag ? shortCardTag(ageTag) : "")].filter(Boolean);
  return labels.map(label => `<span class="tag">${escapeHtml(label)}</span>`).join("");
}

function shortAgeRange(value = "") {
  if (/placement-based/i.test(value)) return language === "zh" ? "按水平分级" : "Placement-based";
  const throughGrades = value.match(/(pre-?k|kindergarten|k|\d+)\s+through\s+(?:grade|year)\s+(\d+)/i);
  if (throughGrades) {
    const rawStart = throughGrades[1].toLowerCase().replace("-", "");
    const start = rawStart === "prek" ? "Pre-K" : rawStart === "kindergarten" ? "K" : throughGrades[1].toUpperCase();
    return language === "zh" ? `${start}–${throughGrades[2]} 年级` : `${start}–${throughGrades[2]}`;
  }
  const grades = value.match(/grades?\s+(pre-?k|k|\d+)\s*[-–~]\s*(\d+)/i);
  if (grades) {
    const start = grades[1].toLowerCase().replace("-", "") === "prek" ? "Pre-K" : grades[1].toUpperCase();
    return language === "zh" ? `${start}–${grades[2]} 年级` : `Grades ${start}–${grades[2]}`;
  }
  const ages = value.match(/(\d+)\s*[-–~]\s*(\d+)/);
  if (!ages) return value;
  return language === "zh" ? `${ages[1]}–${ages[2]} 岁` : `Ages ${ages[1]}–${ages[2]}`;
}

function shortCardTag(item) {
  if (item.category === "ageGroup") {
    const ages = item.tag.match(/Ages?\s*(\d+)\s*[-–~]\s*(\d+)/i);
    if (ages) return language === "zh" ? `${ages[1]}–${ages[2]} 岁` : `Ages ${ages[1]}–${ages[2]}`;
  }
  const subjectLabels = {
    "Arts/Creativity": { en: "Arts & Creativity", zh: "艺术与创意" },
    "English/Language Arts": { en: "English / Reading", zh: "英语／阅读" },
    "Language": { en: "Languages", zh: "语言" },
    "Multi-subject site": { en: "Multi-subject", zh: "多学科" },
    "Social Studies/History": { en: "History", zh: "历史／社会" },
    "STEM/Technology": { en: "STEM", zh: "STEM" }
  };
  return subjectLabels[item.tag]?.[language] || item.tag;
}

function shortSourceType(sourceType = "") {
  const key = sourceType.trim().toLowerCase();
  const labels = {
    "book and online program": { en: "Books & Online", zh: "书籍与在线课程" },
    "books, printable resources": { en: "Books & Printables", zh: "书籍与打印材料" },
    "e-book site": { en: "E-books", zh: "电子书" },
    "mobile application": { en: "App", zh: "应用" },
    "online and physical classes": { en: "Online & In-person", zh: "线上与线下课程" },
    "online and physical learning": { en: "Online & Offline", zh: "线上与线下学习" },
    "online classes": { en: "Online Classes", zh: "在线课程" },
    "online english game": { en: "English Game", zh: "英语游戏" },
    "online learning program": { en: "Learning Program", zh: "学习项目" },
    "online learning site": { en: "Website", zh: "网站" },
    "online learning site and mobile app": { en: "Website & App", zh: "网站与应用" },
    "online math game": { en: "Math Game", zh: "数学游戏" },
    "online math tool and exercise": { en: "Math Practice", zh: "数学练习" },
    "online printable resources": { en: "Printables", zh: "打印材料" },
    "online vedio learning site": { en: "Video Lessons", zh: "视频课程" },
    "online videos and resources": { en: "Videos & Resources", zh: "视频与资源" },
    "worksheet download site": { en: "Worksheets", zh: "练习单" }
  };
  return labels[key]?.[language] || sourceType;
}

function resourceImage(resource) {
  return `<div class="resource-image"><img src="assets/resources/${escapeHtml(resource.imageFileName)}" alt="" loading="lazy" onerror="this.remove()"></div>`;
}

function localizedSummary(resource) {
  return language === "zh" ? (resource.sourceSummary || resource.sourceSummaryEn || "") : (resource.sourceSummaryEn || resource.sourceSummary || "");
}

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

function iconSvg(name) {
  const paths = {
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path>',
    book: '<path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3Z"></path><path d="M21 18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3Z"></path>',
    file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path>',
    class: '<path d="m22 10-10-5L2 10l10 5 10-5Z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path><path d="M22 10v6"></path>',
    video: '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>',
    game: '<path d="M6 11h4"></path><path d="M8 9v4"></path><path d="M15 12h.01"></path><path d="M18 10h.01"></path><path d="M17.3 5H6.7A4.7 4.7 0 0 0 2 9.7v.6A8.7 8.7 0 0 0 10.7 19h2.6a8.7 8.7 0 0 0 8.7-8.7v-.6A4.7 4.7 0 0 0 17.3 5Z"></path>',
    globe: '<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 0 20"></path><path d="M12 2a15.3 15.3 0 0 0 0 20"></path>',
  };
  return `<svg class="resource-type-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.globe}</svg>`;
}

function resourceTypeIcon(sourceType = "") {
  const type = sourceType.toLowerCase();
  if (type.includes("app")) return iconSvg("smartphone");
  if (type.includes("book") || type.includes("e-book")) return iconSvg("book");
  if (type.includes("printable") || type.includes("worksheet")) return iconSvg("file");
  if (type.includes("class")) return iconSvg("class");
  if (type.includes("video") || type.includes("vedio")) return iconSvg("video");
  if (type.includes("game")) return iconSvg("game");
  return iconSvg("globe");
}

function renderCard(resource) {
  const saved = window.SEE_ACCOUNT?.isSaved(resource.sourceId);
  const resourceType = normalizedResourceType(resource);
  return `<article class="resource-card">
    <a class="card-click-target" href="resource.html?id=${encodeURIComponent(resource.sourceId)}" aria-label="${escapeHtml(resource.resourceName)}"></a>
    ${resourceImage(resource)}
    <div class="resource-body">
      <div class="resource-type-row"><div class="resource-type">${resourceTypeIcon(resourceType)}<span>${escapeHtml(localizedResourceType(resourceType) || t("dataReview"))}</span></div><button class="bookmark-button ${saved ? "saved" : ""}" type="button" data-bookmark-id="${escapeHtml(resource.sourceId)}" aria-pressed="${saved}" aria-label="${saved ? t("removeSaved") : t("saveResource")}" title="${saved ? t("removeSaved") : t("saveResource")}">${saved ? "★" : "☆"}</button></div>
      <h3>${escapeHtml(resource.resourceName)}</h3>
      <p class="resource-summary">${escapeHtml(localizedSummary(resource))}</p>
      <div class="tag-row">${cardTags(resource)}</div>
      <div class="card-footer"><span class="rating">${ratingStars(resource.initialSeeScore)}</span><span class="card-open-hint" aria-hidden="true">→</span></div>
    </div>
  </article>`;
}

function renderPagination(total) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (currentPage > pages) currentPage = pages;
  if (pages <= 1) { elements.pagination.innerHTML = ""; return; }
  const buttons = [];
  buttons.push(`<button class="page-button" data-page="${Math.max(1,currentPage-1)}" ${currentPage===1?"disabled":""} aria-label="${t("previous")}">‹</button>`);
  for (let page = 1; page <= pages; page++) buttons.push(`<button class="page-button ${page===currentPage?"active":""}" data-page="${page}" aria-label="${t("page")} ${page}">${page}</button>`);
  buttons.push(`<button class="page-button" data-page="${Math.min(pages,currentPage+1)}" ${currentPage===pages?"disabled":""} aria-label="${t("next")}">›</button>`);
  elements.pagination.innerHTML = buttons.join("");
}

function renderResources() {
  const result = filteredResources();
  elements.count.textContent = result.length;
  const start = (currentPage - 1) * pageSize;
  elements.grid.innerHTML = result.slice(start, start + pageSize).map(renderCard).join("");
  elements.grid.hidden = result.length === 0; elements.empty.hidden = result.length !== 0;
  const active = [elements.search.value.trim(), ...checkedValues(elements.age), ...checkedValues(elements.subject), ...checkedValues(elements.type).map(localizedResourceType), ...checkedValues(elements.cost)].filter(Boolean);
  elements.filterNote.hidden = active.length === 0;
  elements.filterNote.textContent = active.length ? `${t("filterStatus")}: ${active.join(" · ")}` : "";
  renderPagination(result.length);
}

function applyLanguage(nextLanguage) {
  language = nextLanguage; localStorage.setItem("seeLanguage", language); document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-language]").forEach(el => el.classList.toggle("active", el.dataset.language === language));
  buildFilters(); renderResources(); window.SEE_ACCOUNT?.updateAccountButton();
}

elements.search.addEventListener("input", () => { currentPage=1; renderResources(); });
[elements.age, elements.subject, elements.type, elements.cost].forEach(el => el.addEventListener("change", () => { currentPage=1; renderResources(); }));
elements.sort.addEventListener("change", () => { currentPage=1; renderResources(); });
elements.clear.addEventListener("click", () => { elements.search.value=""; document.querySelectorAll(".checkbox-list input").forEach(input => { input.checked=false; }); elements.sort.value="name"; currentPage=1; renderResources(); });
elements.grid.addEventListener("click", event => {
  const bookmark = event.target.closest("[data-bookmark-id]");
  if (bookmark) {
    event.stopPropagation();
    window.SEE_ACCOUNT.toggleSaved(bookmark.dataset.bookmarkId);
    renderResources();
    return;
  }
});
elements.pagination.addEventListener("click", event => { const button=event.target.closest("[data-page]"); if(!button||button.disabled)return; currentPage=Number(button.dataset.page); renderResources(); document.querySelector("#resources").scrollIntoView(); });
elements.languageButton.addEventListener("click", () => { const open=elements.languageMenu.classList.toggle("open"); elements.languageButton.setAttribute("aria-expanded", String(open)); });
elements.languageMenu.addEventListener("click", event => { const button=event.target.closest("[data-language]"); if(!button)return; applyLanguage(button.dataset.language); elements.languageMenu.classList.remove("open"); elements.languageButton.setAttribute("aria-expanded","false"); });
elements.menuToggle.addEventListener("click", () => { const open=elements.mainNav.classList.toggle("open"); elements.menuToggle.setAttribute("aria-expanded",String(open)); });
elements.filterToggle.addEventListener("click", () => { elements.filterSidebar.classList.add("open"); elements.filterToggle.setAttribute("aria-expanded","true"); document.body.style.overflow="hidden"; elements.search.focus(); });
elements.filterClose.addEventListener("click", () => { elements.filterSidebar.classList.remove("open"); elements.filterToggle.setAttribute("aria-expanded","false"); document.body.style.overflow=""; });
document.addEventListener("click", event => { if(!event.target.closest(".language-button")&&!event.target.closest(".language-menu")){elements.languageMenu.classList.remove("open");elements.languageButton.setAttribute("aria-expanded","false");} });
window.addEventListener("see:account-changed", renderResources);
window.addEventListener("see:saved-changed", renderResources);

applyLanguage(language);
