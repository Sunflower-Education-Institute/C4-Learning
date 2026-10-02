(function () {
  const resources = window.SEE_RESOURCES || [];
  const selected = new Set();
  const main = document.querySelector("#saved-main");
  const supportedLanguages = ["en", "zh", "es", "ar"];
  let language = supportedLanguages.includes(localStorage.getItem("seeLanguage")) ? localStorage.getItem("seeLanguage") : "en";
  const copy = {
    en: { navResources: "Explore resources", navSuggest: "Suggest a resource", age: "Age range", type: "Resource type", cost: "Cost", score: "Initial SEE score", subjects: "Subjects", sideBySide: "Side-by-side", compareSelected: "Compare selected resources", feature: "Feature", savedEyebrow: "Saved resources", signinTitle: "Sign in to save and compare resources", signinBody: "Use the prefilled guest account. Your selections remain on this device.", signIn: "Sign in", guest: "Guest account", guestName: "Guest Explorer", localOnly: "Saved on this device", signOut: "Sign out", collection: "Your collection", savedTitle: "Saved resources", instructions: "Select 2–4 resources to compare. Open any title in a new tab if you prefer to review several pages yourself.", compare: "Compare", remove: "Remove from saved", emptyTitle: "Your collection is empty", emptyBody: "Use the star on any resource card to save it here.", explore: "Explore resources", oneMore: "Select at least one more resource to compare.", maxFour: "You can compare up to four resources.", password: "Password", login: "Log in", privacy: "Saved resources are stored on this device.", close: "Close" },
    zh: { navResources: "浏览资源", navSuggest: "推荐资源", age: "适用年龄", type: "资源类型", cost: "费用", score: "SEE 初始评分", subjects: "学科", sideBySide: "并排查看", compareSelected: "比较所选资源", feature: "项目", savedEyebrow: "已收藏资源", signinTitle: "登录后收藏和比较资源", signinBody: "请使用预填的访客账号。您的选择只保存在此设备上。", signIn: "登录", guest: "访客账号", guestName: "访客用户", localOnly: "保存在此设备上", signOut: "退出登录", collection: "您的收藏", savedTitle: "已收藏资源", instructions: "请选择 2–4 个资源进行比较。也可以在新标签页打开资源名称，逐一查看详情。", compare: "比较", remove: "取消收藏", emptyTitle: "收藏夹还是空的", emptyBody: "点击资源卡片上的星标即可收藏到这里。", explore: "浏览资源", oneMore: "请至少再选择一个资源进行比较。", maxFour: "最多可以同时比较四个资源。", password: "密码", login: "登录", privacy: "收藏的资源保存在此设备上。", close: "关闭" },
    es: { navResources: "Explorar recursos", navSuggest: "Sugerir un recurso", age: "Rango de edad", type: "Tipo de recurso", cost: "Costo", score: "Puntuación inicial de SEE", subjects: "Materias", sideBySide: "Comparación", compareSelected: "Comparar recursos seleccionados", feature: "Característica", savedEyebrow: "Recursos guardados", signinTitle: "Inicia sesión para guardar y comparar", signinBody: "Usa la cuenta de invitado precargada. Tus selecciones permanecen en este dispositivo.", signIn: "Iniciar sesión", guest: "Cuenta de invitado", guestName: "Explorador invitado", localOnly: "Guardado en este dispositivo", signOut: "Cerrar sesión", collection: "Tu colección", savedTitle: "Recursos guardados", instructions: "Selecciona de 2 a 4 recursos para compararlos. También puedes abrir cada título en una pestaña nueva.", compare: "Comparar", remove: "Quitar de guardados", emptyTitle: "Tu colección está vacía", emptyBody: "Usa la estrella de una tarjeta para guardarla aquí.", explore: "Explorar recursos", oneMore: "Selecciona al menos un recurso más.", maxFour: "Puedes comparar hasta cuatro recursos.", password: "Contraseña", login: "Entrar", privacy: "Los recursos guardados permanecen en este dispositivo.", close: "Cerrar" },
    ar: { navResources: "استكشاف الموارد", navSuggest: "اقتراح مورد", age: "الفئة العمرية", type: "نوع المورد", cost: "التكلفة", score: "تقييم SEE الأولي", subjects: "المواد", sideBySide: "مقارنة مباشرة", compareSelected: "مقارنة الموارد المحددة", feature: "الخاصية", savedEyebrow: "الموارد المحفوظة", signinTitle: "سجّل الدخول للحفظ والمقارنة", signinBody: "استخدم حساب الضيف المعبأ مسبقًا. تبقى اختياراتك على هذا الجهاز.", signIn: "تسجيل الدخول", guest: "حساب ضيف", guestName: "مستكشف ضيف", localOnly: "محفوظ على هذا الجهاز", signOut: "تسجيل الخروج", collection: "مجموعتك", savedTitle: "الموارد المحفوظة", instructions: "حدد من موردين إلى أربعة للمقارنة. ويمكنك فتح كل عنوان في علامة تبويب جديدة.", compare: "مقارنة", remove: "إزالة من المحفوظات", emptyTitle: "مجموعتك فارغة", emptyBody: "استخدم النجمة على بطاقة أي مورد لحفظه هنا.", explore: "استكشاف الموارد", oneMore: "حدد موردًا إضافيًا واحدًا على الأقل.", maxFour: "يمكنك مقارنة أربعة موارد كحد أقصى.", password: "كلمة المرور", login: "دخول", privacy: "تُحفظ الموارد على هذا الجهاز.", close: "إغلاق" }
  };
  const t = key => copy[language][key] || copy.en[key] || key;
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const tagLabels = { zh: { "Arts & Creativity": "艺术与创意", "English & Reading": "英语与阅读", Languages: "语言", Math: "数学", "Multi-subject": "多学科", "STEM & Technology": "科学、技术、工程与数学", "Social Studies & History": "社会研究与历史" }, es: { "Arts & Creativity": "Arte y creatividad", "English & Reading": "Inglés y lectura", Languages: "Idiomas", Math: "Matemáticas", "Multi-subject": "Varias materias", "STEM & Technology": "STEM y tecnología", "Social Studies & History": "Estudios sociales e historia" }, ar: { "Arts & Creativity": "الفنون والإبداع", "English & Reading": "الإنجليزية والقراءة", Languages: "اللغات", Math: "الرياضيات", "Multi-subject": "مواد متعددة", "STEM & Technology": "العلوم والتقنية والهندسة والرياضيات", "Social Studies & History": "الدراسات الاجتماعية والتاريخ" } };
  const subjectTags = resource => (resource["SUBJECT/DISCIPLINE TAGS"] || []).map(tag => tagLabels[language]?.[tag] || tag).join(language === "ar" ? "، " : ", ") || "—";
  const summary = resource => language === "zh" ? (resource.sourceSummary || "") : language === "en" ? (resource.sourceSummaryEn || "") : (window.SEE_LOCALIZED_CONTENT?.[language]?.summaries?.[resource.sourceId] || "");

  function comparison(resourcesToCompare) {
    if (resourcesToCompare.length < 2) return "";
    const rows = [[t("age"), item => item.ageGradeRange || "—"], [t("type"), item => item.sourceType || "—"], [t("cost"), item => item.costDisplay || item.currentPrice || "—"], [t("score"), item => Number.isFinite(Number(item.initialSeeScore)) ? `${item.initialSeeScore} / 5` : "—"], [t("subjects"), subjectTags]];
    return `<section class="comparison-section" id="comparison"><div class="saved-heading"><div><p class="eyebrow">${t("sideBySide")}</p><h2>${t("compareSelected")}</h2></div></div><div class="comparison-scroll"><table class="comparison-table"><thead><tr><th>${t("feature")}</th>${resourcesToCompare.map(item => `<th><a href="resource.html?id=${encodeURIComponent(item.sourceId)}" target="_blank">${escapeHtml(item.resourceName)} ↗</a></th>`).join("")}</tr></thead><tbody>${rows.map(([label, value]) => `<tr><th>${label}</th>${resourcesToCompare.map(item => `<td>${escapeHtml(value(item))}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
  }

  function render() {
    document.documentElement.lang = language === "zh" ? "zh-Hans" : language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = ({ zh: "我的收藏 · SEE", es: "Mis recursos guardados · SEE", ar: "مواردي المحفوظة · SEE" }[language] || "My saved resources · SEE");
    document.querySelectorAll("[data-saved-copy]").forEach(element => { element.textContent = t(element.dataset.savedCopy); });
    document.querySelector("[data-saved-language]").value = language;
    const signinDialog = document.querySelector("#signin-dialog");
    signinDialog.querySelector(".dialog-close").setAttribute("aria-label", t("close"));
    signinDialog.querySelector(".eyebrow").textContent = t("savedEyebrow");
    signinDialog.querySelector("h2").textContent = t("signinTitle");
    signinDialog.querySelector("h2 + p").textContent = t("signinBody");
    const signinLabels = signinDialog.querySelectorAll("label span");
    signinLabels[0].textContent = ({ zh: "邮箱", es: "Correo electrónico", ar: "البريد الإلكتروني" }[language] || "Email");
    signinLabels[1].textContent = t("password");
    signinDialog.querySelector(".dialog-action").textContent = t("login");
    signinDialog.querySelector(".demo-privacy").textContent = t("privacy");
    window.SEE_ACCOUNT.updateAccountButton();
    if (!window.SEE_ACCOUNT.isSignedIn()) {
      main.innerHTML = `<section class="saved-empty"><p class="eyebrow">${t("savedEyebrow")}</p><h1>${t("signinTitle")}</h1><p>${t("signinBody")}</p><button class="primary-button" type="button" data-open-signin>${t("signIn")}</button></section>`;
      main.querySelector("[data-open-signin]").addEventListener("click", () => window.SEE_ACCOUNT.openSignIn());
      return;
    }
    const savedIds = new Set(window.SEE_ACCOUNT.savedIds());
    const savedResources = resources.filter(item => savedIds.has(item.sourceId));
    [...selected].forEach(id => { if (!savedIds.has(id)) selected.delete(id); });
    const chosen = savedResources.filter(item => selected.has(item.sourceId));
    main.innerHTML = `<section class="profile-strip"><div class="demo-avatar">GE</div><div><p class="eyebrow">${t("guest")}</p><h1>${t("guestName")}</h1><p>guest@mysunflower.org · ${t("localOnly")}</p></div><button class="secondary-button" type="button" data-sign-out>${t("signOut")}</button></section><section class="saved-library"><div class="saved-heading"><div><p class="eyebrow">${t("collection")}</p><h2>${t("savedTitle")}</h2><p>${t("instructions")}</p></div><button class="primary-button compare-button" type="button" data-compare ${chosen.length < 2 ? "disabled" : ""}>${t("compare")} ${chosen.length || ""}</button></div>${savedResources.length ? `<div class="saved-grid">${savedResources.map(item => `<article class="saved-card"><img src="assets/resources/${escapeHtml(item.imageFileName)}" alt="" onerror="this.remove()"><div><label class="compare-check"><input type="checkbox" data-compare-id="${escapeHtml(item.sourceId)}" ${selected.has(item.sourceId) ? "checked" : ""}><span>${t("compare")}</span></label><h3><a href="resource.html?id=${encodeURIComponent(item.sourceId)}" target="_blank">${escapeHtml(item.resourceName)} ↗</a></h3><p>${escapeHtml(summary(item))}</p><button class="remove-saved" type="button" data-remove-id="${escapeHtml(item.sourceId)}">${t("remove")}</button></div></article>`).join("")}</div>` : `<div class="collection-empty"><h3>${t("emptyTitle")}</h3><p>${t("emptyBody")}</p><a class="primary-button" href="index.html#resources">${t("explore")}</a></div>`}<p class="compare-message" aria-live="polite">${chosen.length === 1 ? t("oneMore") : chosen.length === 4 ? t("maxFour") : ""}</p></section>${comparison(chosen)}`;
    main.querySelector("[data-sign-out]").addEventListener("click", () => { window.SEE_ACCOUNT.signOut(); render(); });
    main.querySelectorAll("[data-remove-id]").forEach(button => button.addEventListener("click", () => { window.SEE_ACCOUNT.toggleSaved(button.dataset.removeId); render(); }));
    main.querySelectorAll("[data-compare-id]").forEach(input => input.addEventListener("change", () => { if (input.checked && selected.size >= 4) { input.checked = false; return; } if (input.checked) selected.add(input.dataset.compareId); else selected.delete(input.dataset.compareId); render(); }));
    const compareButton = main.querySelector("[data-compare]");
    if (compareButton) compareButton.addEventListener("click", () => document.querySelector("#comparison")?.scrollIntoView({ behavior: "smooth" }));
  }

  document.querySelector("[data-saved-language]").addEventListener("change", event => { language = supportedLanguages.includes(event.target.value) ? event.target.value : "en"; localStorage.setItem("seeLanguage", language); render(); });
  window.addEventListener("see:account-changed", render);
  window.addEventListener("see:saved-changed", render);
  render();
})();
