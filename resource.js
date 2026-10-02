(function () {
  const resources = window.SEE_RESOURCES || [];
  const reviews = window.SEE_REVIEWS || [];
  const contentTranslations = window.SEE_CONTENT_TRANSLATIONS || {};
  const reviewerProfiles = window.SEE_REVIEWERS || {};
  const sourceId = new URLSearchParams(window.location.search).get("id");
  const supportedLanguages = ["en", "zh", "es", "ar"];
  let language = supportedLanguages.includes(localStorage.getItem("seeLanguage")) ? localStorage.getItem("seeLanguage") : "en";

  const copy = {
    en: { back: "Back to all resources", age: "Age range", type: "Resource type", score: "SEE review score", cost: "Current pricing", overview: "Full resource overview", reviews: "Parent and educator reviews", reviewAverage: "Review average", noReviews: "No English-language reviews are available yet.", visit: "Visit official source", save: "Save resource", saved: "Saved", unavailable: "Resource not found", unavailableBody: "This resource may have moved or the link may be incomplete.", summaryEyebrow: "Editorial summary", aiTitle: "AI-assisted resource summary", aiSubtitle: "Prepared from published reviews", aiSubtitleData: "Prepared from available resource information", aiPending: "An English review summary is waiting for editorial preparation.", pros: "What reviewers valued", considerations: "What to consider", basedOn: "Based on", publishedReview: "published review", publishedReviews: "published reviews", summaryNote: "AI-assisted summary · Editorial review recommended", reviewDetails: "Review details", community: "Community", navResources: "Explore resources", navSuggest: "Suggest a resource", signIn: "Sign in", savedNav: "My saved", englishOverviewPending: "A detailed English overview is being prepared. The verified summary is shown above.", ratingLabel: "out of 5 stars", skip: "Skip to resource details", savedResources: "Saved resources", signinTitle: "Sign in to save and compare", signinBody: "Use the prefilled guest account. No personal information is collected.", email: "Email", password: "Password", login: "Log in", privacy: "Saved resources are stored on this device.", close: "Close", viewOriginal: "View original", backToTranslation: "Back to translation" },
    zh: { back: "返回全部资源", age: "适用年龄", type: "资源类型", score: "SEE 评审评分", cost: "当前价格信息", overview: "完整资源介绍", reviews: "家长与教育者评价", reviewAverage: "评论平均分", noReviews: "目前还没有评价。", visit: "访问官方网站", save: "收藏资源", saved: "已收藏", unavailable: "没有找到该资源", unavailableBody: "该资源可能已移动，或者链接不完整。", summaryEyebrow: "编辑汇总", aiTitle: "AI 辅助资源汇总", aiSubtitle: "根据已发布评论整理", aiSubtitleData: "根据现有资源信息整理", aiPending: "该资源的中文评论汇总仍在等待编辑整理。", pros: "评论者认可的方面", considerations: "需要考虑的方面", basedOn: "依据", publishedReviews: "条已发布评论", summaryNote: "AI 辅助汇总 · 建议人工复核", reviewDetails: "评论详情", community: "社区评价", navResources: "浏览资源", navSuggest: "推荐资源", signIn: "登录", savedNav: "我的收藏", englishOverviewPending: "英文详细介绍正在准备中。", ratingLabel: "分（满分 5 分）", skip: "跳到资源详情", savedResources: "已收藏资源", signinTitle: "登录后收藏和比较资源", signinBody: "请使用预填的访客账号。我们不会收集个人信息。", email: "邮箱", password: "密码", login: "登录", privacy: "收藏的资源保存在此设备上。", close: "关闭", viewOriginal: "查看原文", backToTranslation: "返回译文" },
    es: { back: "Volver a todos los recursos", age: "Rango de edad", type: "Tipo de recurso", score: "Puntuación de SEE", cost: "Precio actual", overview: "Descripción completa", reviews: "Reseñas de familias y educadores", reviewAverage: "Promedio de reseñas", noReviews: "Todavía no hay reseñas disponibles en español.", visit: "Visitar el sitio oficial", save: "Guardar recurso", saved: "Guardado", unavailable: "Recurso no encontrado", unavailableBody: "Es posible que este recurso se haya movido o que el enlace esté incompleto.", summaryEyebrow: "Resumen editorial", aiTitle: "Resumen de reseñas asistido por IA", aiSubtitle: "Preparado a partir de reseñas publicadas", aiPending: "La traducción al español de este resumen está pendiente de revisión editorial.", pros: "Lo que valoraron los usuarios", considerations: "Aspectos que considerar", basedOn: "Basado en", publishedReview: "reseña publicada", publishedReviews: "reseñas publicadas", summaryNote: "Resumen asistido por IA · Se recomienda revisión editorial", reviewDetails: "Detalles de la reseña", community: "Comunidad", navResources: "Explorar recursos", navSuggest: "Sugerir un recurso", signIn: "Iniciar sesión", savedNav: "Mis guardados", englishOverviewPending: "Se está preparando una descripción detallada en español. El resumen verificado aparece arriba.", ratingLabel: "de 5 estrellas", skip: "Ir a los detalles del recurso", savedResources: "Recursos guardados", signinTitle: "Inicia sesión para guardar y comparar", signinBody: "Usa la cuenta de invitado precargada. No recopilamos información personal.", email: "Correo electrónico", password: "Contraseña", login: "Entrar", privacy: "Los recursos guardados permanecen en este dispositivo.", close: "Cerrar", pricingOfficial: "Consulta el sitio oficial para conocer el precio actual", viewOriginal: "Ver original", backToTranslation: "Volver a la traducción" },
    ar: { back: "العودة إلى جميع الموارد", age: "الفئة العمرية", type: "نوع المورد", score: "تقييم SEE", cost: "السعر الحالي", overview: "الوصف الكامل للمورد", reviews: "مراجعات الأسر والمعلمين", reviewAverage: "متوسط المراجعات", noReviews: "لا توجد مراجعات متاحة بالعربية حتى الآن.", visit: "زيارة الموقع الرسمي", save: "حفظ المورد", saved: "تم الحفظ", unavailable: "لم يتم العثور على المورد", unavailableBody: "ربما نُقل هذا المورد أو أن الرابط غير مكتمل.", summaryEyebrow: "ملخص تحريري", aiTitle: "ملخص مراجعات بمساعدة الذكاء الاصطناعي", aiSubtitle: "أُعد من المراجعات المنشورة", aiPending: "ترجمة هذا الملخص إلى العربية بانتظار المراجعة التحريرية.", pros: "ما أعجب المراجعين", considerations: "نقاط ينبغي مراعاتها", basedOn: "استنادًا إلى", publishedReview: "مراجعة منشورة", publishedReviews: "مراجعات منشورة", summaryNote: "ملخص بمساعدة الذكاء الاصطناعي · يوصى بالمراجعة التحريرية", reviewDetails: "تفاصيل المراجعة", community: "المجتمع", navResources: "استكشاف الموارد", navSuggest: "اقتراح مورد", signIn: "تسجيل الدخول", savedNav: "محفوظاتي", englishOverviewPending: "يجري إعداد وصف تفصيلي بالعربية. يظهر الملخص المتحقق منه أعلاه.", ratingLabel: "من 5 نجوم", skip: "الانتقال إلى تفاصيل المورد", savedResources: "الموارد المحفوظة", signinTitle: "سجّل الدخول للحفظ والمقارنة", signinBody: "استخدم حساب الضيف المعبأ مسبقًا. لا نجمع معلومات شخصية.", email: "البريد الإلكتروني", password: "كلمة المرور", login: "دخول", privacy: "تُحفظ الموارد على هذا الجهاز.", close: "إغلاق", pricingOfficial: "راجع الموقع الرسمي لمعرفة السعر الحالي", viewOriginal: "عرض النص الأصلي", backToTranslation: "العودة إلى الترجمة" }
  };
  const t = key => copy[language][key] || copy.en[key] || key;
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const localizedSummary = resource => language === "zh" ? (resource.sourceSummary || resource.shortDescriptionZh || "") : language === "en" ? (resource.sourceSummaryEn || resource.shortDescriptionEn || "") : (window.SEE_LOCALIZED_CONTENT?.[language]?.summaries?.[resource.sourceId] || "");
  const allTags = resource => ["SUBJECT/DISCIPLINE TAGS", "AGE GROUP TAGS", "COST TYPE TAGS", "EDUCATION SYSTEM/REGIONS TAGS"].flatMap(field => resource[field] || []);
  const reviewCountLabel = count => language === "zh" ? `${count} ${t("publishedReviews")}` : `${count} ${count === 1 ? t("publishedReview") : t("publishedReviews")}`;
  const isTextReview = review => {
    const text = String(review.reviewSummary || "").trim();
    return text && !(text.startsWith("http") && !text.includes(" "));
  };
  const isChineseText = text => /[\u3400-\u9fff]/.test(String(text || ""));
  const reviewKey = review => `${review.sourceId}::${review.reviewerId}`;
  const chineseReviewTranslations = {
    SEE_4: "我的女儿从四年级开始使用 Beast Academy，现在仍在使用，而且非常喜欢。对她而言，我注意到几个优点：第一，她喜欢漫画和轻松有趣的内容。Beast Academy 正是这种形式，书中可爱又有趣的怪兽会犯数学错误，也会带出新的知识。第二，每个单元从基础逐步进阶到更有挑战性的内容，很适合她。这套课程有助于提升学生的数学能力，并为数学奥林匹克竞赛打下基础。",
    SEE_21: "推荐。Math Mammoth 是一套以掌握知识为主、同时包含螺旋式复习的数学课程。我很欣赏它提供完整教材、清晰说明，以及可选的教学视频。每天大约使用 30–60 分钟。",
    SEE_39: "非常推荐。它对我那位曾在阅读方面遇到困难的女儿尤其有帮助。课程采用扎实的自然拼读方法，图像设计有吸引力，并提供充分复习，帮助她建立了良好的自然拼读和阅读能力。每天大约使用 30 分钟。"
  };
  const localizedReviewText = review => {
    const key = reviewKey(review);
    if (language === "zh") return contentTranslations.reviews?.zh?.[key] || (isChineseText(review.reviewSummary) ? review.reviewSummary : chineseReviewTranslations[review.seeNumber] || "");
    if (language === "en") return contentTranslations.reviews?.en?.[key] || (!isChineseText(review.reviewSummary) ? review.reviewSummary : "");
    return !isChineseText(review.reviewSummary) ? (window.SEE_LOCALIZED_CONTENT?.[language]?.reviews?.[review.seeNumber] || "") : "";
  };
  const publishedReviewsFor = sourceId => reviews.filter(review => review.sourceId === sourceId && isTextReview(review) && localizedReviewText(review));
  const averageRating = items => {
    const ratings = items.map(item => Number(item.rating)).filter(Number.isFinite);
    return ratings.length ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : null;
  };
  const localizedResourceType = type => {
    const zh = { Curriculum: "课程体系", "Learning Platform": "学习平台", App: "应用", Worksheets: "练习单", Books: "书籍", Classes: "课程／辅导", Marketplace: "资源市场", Games: "学习游戏", "Book and Online Program": "书籍与在线课程", "Books, Printable Resources": "书籍与打印材料", "E-book Site": "电子书网站", "Mobile Application": "移动应用", "Online and Physical Classes": "线上与线下课程", "Online and Physical Learning": "线上与线下学习", "Online Classes": "在线课程", "Online English Game": "英语学习游戏", "Online Learning Program": "在线学习项目", "Online Learning Site": "在线学习网站", "Online Learning Site and Mobile App": "网站与移动应用", "Online Math Game": "数学学习游戏", "Online Math Tool and Exercise": "数学工具与练习", "Online Printable Resources": "在线打印材料", "Online Vedio Learning Site": "在线视频课程", "Online Videos and Resources": "视频与学习资源", "Worksheet Download Site": "练习单下载网站" };
    if (language === "zh") return zh[type] || type;
    const key = type.toLowerCase();
    if (language === "es") {
      if (key.includes("app")) return "Aplicación móvil";
      if (key.includes("book")) return "Libros y recursos";
      if (key.includes("printable") || key.includes("worksheet")) return "Recursos imprimibles";
      if (key.includes("class")) return "Clases";
      if (key.includes("game")) return "Juego educativo";
      if (key.includes("video")) return "Videos educativos";
      if (key.includes("curriculum")) return "Currículo";
      return "Plataforma de aprendizaje en línea";
    }
    if (language === "ar") {
      if (key.includes("app")) return "تطبيق جوّال";
      if (key.includes("book")) return "كتب وموارد";
      if (key.includes("printable") || key.includes("worksheet")) return "موارد قابلة للطباعة";
      if (key.includes("class")) return "دروس";
      if (key.includes("game")) return "لعبة تعليمية";
      if (key.includes("video")) return "مقاطع تعليمية";
      if (key.includes("curriculum")) return "منهج";
      return "منصة تعلم عبر الإنترنت";
    }
    return type;
  };
  const tagLabels = {
    zh: { "Arts & Creativity": "艺术与创意", "English & Reading": "英语与阅读", Languages: "语言", Math: "数学", "Multi-subject": "多学科", "STEM & Technology": "科学、技术、工程与数学", "Social Studies & History": "社会研究与历史", "All Ages": "所有年龄", "Early Elementary": "小学低年级", "High School": "高中", Kindergarten: "幼儿园", "Middle School": "初中", "Placement-Based": "按水平分级", "Pre-K": "幼儿园预备班", Preschool: "学前阶段", "Upper Elementary": "小学高年级" },
    es: { "Arts & Creativity": "Arte y creatividad", "English & Reading": "Inglés y lectura", Languages: "Idiomas", Math: "Matemáticas", "Multi-subject": "Varias materias", "STEM & Technology": "STEM y tecnología", "Social Studies & History": "Estudios sociales e historia", "All Ages": "Todas las edades", "Early Elementary": "Primaria inicial", "High School": "Secundaria superior", Kindergarten: "Kindergarten", "Middle School": "Secundaria media", "Placement-Based": "Según nivel", "Pre-K": "Pre-K", Preschool: "Preescolar", "Upper Elementary": "Primaria superior" },
    ar: { "Arts & Creativity": "الفنون والإبداع", "English & Reading": "الإنجليزية والقراءة", Languages: "اللغات", Math: "الرياضيات", "Multi-subject": "مواد متعددة", "STEM & Technology": "العلوم والتقنية والهندسة والرياضيات", "Social Studies & History": "الدراسات الاجتماعية والتاريخ", "All Ages": "جميع الأعمار", "Early Elementary": "الابتدائية المبكرة", "High School": "الثانوية", Kindergarten: "الروضة", "Middle School": "المتوسطة", "Placement-Based": "بحسب المستوى", "Pre-K": "ما قبل الروضة", Preschool: "ما قبل المدرسة", "Upper Elementary": "الابتدائية العليا" }
  };
  const localizedTag = tag => tagLabels[language]?.[tag] || tag;
  const localizedAge = resource => language === "en" ? (resource.ageGradeRange || "—") : (resource["AGE GROUP TAGS"] || []).map(localizedTag).join(language === "ar" ? "، " : "、") || "—";
  const costTranslationsZh = {
    "$14.99 monthly; $36.99 quarterly; $119.90 yearly; 7-day trial": "每月 $14.99；每季度 $36.99；每年 $119.90；提供 7 天试用",
    "$20/month or $197/year individual; $35/month or $347/year family": "个人方案每月 $20 或每年 $197；家庭方案每月 $35 或每年 $347",
    "$48/month; $480/year; lifetime options also offered": "每月 $48；每年 $480；另有终身方案",
    "$6.99/month or $49.99/year for Math plan; 30-day trial": "数学方案每月 $6.99 或每年 $49.99；提供 30 天试用",
    "$99/month; $79/month with Roger Billings scholarship": "每月 $99；获得 Roger Billings 奖学金后每月 $79",
    "1 student $39.90/month or $257/year; family $59.90/month or $397/year": "单个学生每月 $39.90 或每年 $257；家庭方案每月 $59.90 或每年 $397",
    "12-month enrollment varies by course level": "12 个月课程费用因课程级别而异",
    "Basic access free; Premium $14.99/month or $45/year": "基础访问免费；高级版每月 $14.99 或每年 $45",
    "Basic free with 3 downloads/month; Premium price requires live checkout": "基础版免费，每月可下载 3 次；高级版价格需在结账页面确认",
    "Core Math content free; paid Core $9.95/month or $58.95/year; higher tiers available": "核心数学内容免费；付费核心版每月 $9.95 或每年 $58.95；另有更高级方案",
    "Core schedules and printables free; some books/materials external": "核心计划和打印材料免费；部分书籍或材料需另行获取",
    "Curriculum and schedules free; families obtain books separately": "课程和学习计划免费；家庭需另行准备书籍",
    "Examples: digital subject from $49.50; print subject $129; bundles vary": "示例：数字版单科 $49.50 起；印刷版单科 $129；套装价格不一",
    "Free": "免费",
    "Free and paid resources; price varies by seller and resource": "同时提供免费和付费资源；价格因卖家和资源而异",
    "Free guidance and paid books/courses; prices vary by product": "提供免费指导及付费书籍／课程；价格因产品而异",
    "Free plan and paid subscriptions; price varies by user type and plan": "提供免费方案和付费订阅；价格因用户类型和方案而异",
    "Grade price varies; Grade 2 digital complete currently $42.50; bundles vary": "各年级价格不同；二年级完整数字版目前为 $42.50；套装价格不一",
    "Grades 4-6 or 7-8: $23/month for 12 months or $247; broader bundle/prices vary": "4–6 年级或 7–8 年级：连续 12 个月每月 $23，或一次支付 $247；其他套装价格不一",
    "Homeschool price not publicly listed; free sample puzzles available; school/district pricing by quote": "在家教育价格未公开；提供免费样题；学校或学区需询价",
    "Kindergarten free; other grades $28-$49/month per family": "幼儿园阶段免费；其他年级每个家庭每月 $28–$49",
    "Many worksheets free; membership $23.95/year individual or $99/year school": "许多练习单免费；个人会员每年 $23.95，学校会员每年 $99",
    "Math practice has a free tier; paid subjects generally $30-$40 per term": "数学练习提供免费层级；付费科目通常每学期 $30–$40",
    "Monthly tuition varies by local center and subject": "月学费因当地学习中心和科目而异",
    "OER free; Plus $129/course/year; school license $12-$21/student/year": "开放教育资源免费；Plus 每门课程每年 $129；学校授权每名学生每年 $12–$21",
    "Online annual $99; monthly option available; books/live classes separate": "在线版年费 $99；另有月付方案；书籍和直播课程另计",
    "Package/component based": "按套装或组件计价",
    "Paid; curriculum packages and school enrollment are priced separately": "付费；课程套装和学校注册分别计价",
    "Paid; price varies by grade, edition, and component": "付费；价格因年级、版本和组件而异",
    "Pre-Algebra $119.99 sale/$149.99 list; upper courses $154.99 sale/$199.99 list": "预备代数优惠价 $119.99／标价 $149.99；高阶课程优惠价 $154.99／标价 $199.99",
    "Pre-Reading $119.95; Levels 1-4 materials $159.95 each; components optional": "阅读预备级 $119.95；1–4 级材料每级 $159.95；可选购单独组件",
    "Subscription; price varies by subject package and account type": "订阅制；价格因科目套装和账号类型而异"
  };
  const localizedCost = resource => {
    const value = resource.costDisplay || resource.currentPrice || "—";
    if (language === "es" || language === "ar") {
      const costTags = (resource["COST TYPE TAGS"] || []).map(tag => ({ es: { Free: "Gratis", Freemium: "Gratis con opciones de pago", Subscription: "Suscripción", "One-time Purchase": "Compra única", "Local Tuition": "Matrícula local", "Variable Pricing": "Precio variable", "Pricing Unverified": "Precio sin verificar" }, ar: { Free: "مجاني", Freemium: "مجاني مع خيارات مدفوعة", Subscription: "اشتراك", "One-time Purchase": "شراء لمرة واحدة", "Local Tuition": "رسوم محلية", "Variable Pricing": "سعر متغير", "Pricing Unverified": "السعر غير متحقق منه" } }[language][tag] || tag));
      return `${costTags.join(language === "ar" ? "، " : ", ")} · ${t("pricingOfficial")}`;
    }
    if (language !== "zh") return value;
    if (costTranslationsZh[value]) return costTranslationsZh[value];
    return value
      .replace(/Free and paid resources/gi, "提供免费及付费资源").replace(/Free plan and paid subscriptions/gi, "提供免费方案及付费订阅")
      .replace(/Basic access free/gi, "基础访问免费").replace(/Basic free/gi, "基础版免费").replace(/Core Math content free/gi, "核心数学内容免费")
      .replace(/Curriculum and schedules free/gi, "课程与计划免费").replace(/Core schedules and printables free/gi, "核心计划与打印材料免费")
      .replace(/Many worksheets free/gi, "许多练习单免费").replace(/Kindergarten free/gi, "幼儿园阶段免费").replace(/Free guidance/gi, "免费指导")
      .replace(/Free/gi, "免费").replace(/Premium/gi, "高级版").replace(/monthly/gi, "每月").replace(/month/gi, "月").replace(/yearly/gi, "每年")
      .replace(/annual/gi, "年费").replace(/year/gi, "年").replace(/student/gi, "名学生").replace(/family/gi, "家庭").replace(/trial/gi, "试用");
  };

  function ratingStars(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return `<span class="rating-value">—</span>`;
    const score = Math.max(0, Math.min(5, numeric));
    const stars = Array.from({ length: 5 }, (_, index) => {
      const fill = Math.max(0, Math.min(100, (score - index) * 100));
      return `<span class="score-star" style="--star-fill:${fill}%" aria-hidden="true">☆</span>`;
    }).join("");
    return `<span class="star-meter" role="img" aria-label="${numeric.toFixed(1)} ${t("ratingLabel")}">${stars}</span><span class="rating-value">${escapeHtml(numeric.toFixed(1))}</span>`;
  }

  function renderReviews(resource) {
    const items = publishedReviewsFor(resource.sourceId);
    if (!items.length) return `<p>${t("noReviews")}</p>`;
    return items.map(item => {
      const profile = reviewerProfiles[item.reviewerId];
      const displayName = profile?.displayName || item.reviewerId;
      const badgeTranslations = { es: { verifiedEducator: "Educador verificado", reviewerOfMonth: "Reseñista del mes" }, ar: { verifiedEducator: "معلّم موثّق", reviewerOfMonth: "مراجع الشهر" } };
      const badges = (profile?.badges || []).map(badge => `<span class="reviewer-badge ${escapeHtml(badge.id)}">${escapeHtml(badgeTranslations[language]?.[badge.id] || badge.label[language === "zh" ? "zh-Hans" : "en"])}</span>`).join("");
      const key = reviewKey(item);
      const original = contentTranslations.reviewOriginals?.[key];
      const currentLocale = language === "zh" ? "zh" : language;
      const canToggleOriginal = original && original.language !== currentLocale;
      return `<details class="review" data-review-key="${escapeHtml(key)}" open><summary><span class="reviewer-line"><strong>${escapeHtml(displayName)}</strong>${item.rating ? `<span class="review-rating">${ratingStars(item.rating)}</span>` : ""}</span><span class="reviewer-badges">${badges}</span><small>${t("reviewDetails")}</small></summary><div class="review-copy"><p data-review-text>${escapeHtml(localizedReviewText(item))}</p>${canToggleOriginal ? `<button class="review-original-toggle" type="button" data-review-toggle aria-pressed="false">${t("viewOriginal")}</button>` : ""}</div></details>`;
    }).join("");
  }

  function renderAiSummary(resource) {
    const summary = contentTranslations.reviewSummaries?.[resource.sourceId];
    if (!summary || language === "es" || language === "ar") return `<section class="ai-summary-panel pending"><div class="panel-heading"><div><p class="eyebrow">${t("summaryEyebrow")}</p><h2>${t("aiTitle")}</h2><p>${t("aiSubtitle")}</p></div></div><p>${t("aiPending")}</p></section>`;
    const content = summary[language === "zh" ? "zh" : "en"];
    const basedOnCount = publishedReviewsFor(resource.sourceId).length;
    const summarySource = summary.source === "editorialDraft" ? `${t("aiSubtitle")} · ${t("basedOn")} ${reviewCountLabel(basedOnCount)}` : t("aiSubtitleData");
    return `<section class="ai-summary-panel"><div class="panel-heading"><div><p class="eyebrow">${t("summaryEyebrow")}</p><h2>${t("aiTitle")}</h2><p>${summarySource}</p></div><span class="ai-spark" aria-hidden="true">✦</span></div><p class="ai-overview">${escapeHtml(content.overview)}</p><div class="ai-points"><div><h3>✓ ${t("pros")}</h3><ul>${content.pros.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div><div><h3>△ ${t("considerations")}</h3><ul>${content.considerations.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div></div><small class="ai-note">${t("summaryNote")} · ${escapeHtml(contentTranslations.generatedAt || "")}</small></section>`;
  }

  function render() {
    document.documentElement.lang = language === "zh" ? "zh-Hans" : language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    const resource = resources.find(item => item.sourceId === sourceId);
    const main = document.querySelector("#resource-detail");
    const languageSelect = document.querySelector("[data-language-select]");
    languageSelect.value = language;
    languageSelect.setAttribute("aria-label", ({ zh: "选择语言", es: "Elegir idioma", ar: "اختيار اللغة" }[language] || "Choose language"));
    document.querySelector(".skip-link").textContent = t("skip");
    const navLinks = document.querySelectorAll(".page-nav a");
    if (navLinks[0]) navLinks[0].textContent = t("navResources");
    if (navLinks[1]) navLinks[1].textContent = t("navSuggest");
    const signinDialog = document.querySelector("#signin-dialog");
    signinDialog.querySelector(".dialog-close").setAttribute("aria-label", t("close"));
    signinDialog.querySelector(".eyebrow").textContent = t("savedResources");
    signinDialog.querySelector("h2").textContent = t("signinTitle");
    signinDialog.querySelector("h2 + p").textContent = t("signinBody");
    const signinLabels = signinDialog.querySelectorAll("label span");
    signinLabels[0].textContent = t("email");
    signinLabels[1].textContent = t("password");
    signinDialog.querySelector(".dialog-action").textContent = t("login");
    signinDialog.querySelector(".demo-privacy").textContent = t("privacy");
    window.SEE_ACCOUNT.updateAccountButton();
    if (!resource) {
      main.innerHTML = `<section class="not-found"><h1>${t("unavailable")}</h1><p>${t("unavailableBody")}</p><a class="primary-button" href="index.html#resources">${t("back")}</a></section>`;
      return;
    }
    document.title = `${resource.resourceName} · SEE`;
    const saved = window.SEE_ACCOUNT.isSaved(resource.sourceId);
    const officialUrl = resource.officialUrl || resource.accessUrlOriginal || "";
    const description = language === "zh"
      ? (contentTranslations.descriptions?.zh?.[resource.sourceId] || resource.sourceDescription || localizedSummary(resource))
      : language === "en"
        ? (contentTranslations.descriptions?.en?.[resource.sourceId] || resource.shortDescriptionEn || t("englishOverviewPending"))
        : t("englishOverviewPending");
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
              <div class="detail-item"><span>${t("age")}</span><strong>${escapeHtml(localizedAge(resource))}</strong></div>
              <div class="detail-item"><span>${t("type")}</span><strong>${escapeHtml(localizedResourceType(resource.sourceType || "—"))}</strong></div>
              <div class="detail-item"><span>${t("score")}</span><strong class="detail-rating">${ratingStars(resource.initialSeeScore)}</strong></div>
              <div class="detail-item pricing-detail"><span>${t("cost")}</span><strong>${escapeHtml(localizedCost(resource))}</strong></div>
            </div>
            <div class="compact-actions"><div class="tag-row">${visibleTags.map(tag => `<span class="tag">${escapeHtml(localizedTag(tag))}</span>`).join("")}</div>${officialUrl ? `<a class="primary-button compact-source-link" href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer">${t("visit")} ↗</a>` : ""}</div>
          </div>
        </section>
        <div class="detail-dashboard">
          <div>${renderAiSummary(resource)}<details class="description-disclosure" open><summary>${t("overview")}</summary><p>${escapeHtml(description)}</p></details></div>
          <section class="compact-review-panel"><div class="panel-heading"><div><p class="eyebrow">${t("community")}</p><h2>${t("reviews")}</h2><p>${reviewCountLabel(reviewCount)}</p></div>${reviewAverage !== null ? `<div class="review-average"><span>${t("reviewAverage")}</span>${ratingStars(reviewAverage)}</div>` : ""}</div>${renderReviews(resource)}</section>
        </div>
      </article>`;
    main.querySelector("[data-save-detail]").addEventListener("click", () => {
      window.SEE_ACCOUNT.toggleSaved(resource.sourceId);
      render();
    });
    main.querySelectorAll("[data-review-toggle]").forEach(button => {
      button.addEventListener("click", () => {
        const reviewElement = button.closest("[data-review-key]");
        const item = reviews.find(review => reviewKey(review) === reviewElement.dataset.reviewKey);
        const original = contentTranslations.reviewOriginals?.[reviewElement.dataset.reviewKey];
        const showingOriginal = button.getAttribute("aria-pressed") === "true";
        reviewElement.querySelector("[data-review-text]").textContent = showingOriginal ? localizedReviewText(item) : original.text;
        button.setAttribute("aria-pressed", String(!showingOriginal));
        button.textContent = showingOriginal ? t("viewOriginal") : t("backToTranslation");
      });
    });
  }

  document.querySelector("[data-language-select]").addEventListener("change", event => {
    language = supportedLanguages.includes(event.target.value) ? event.target.value : "en";
    localStorage.setItem("seeLanguage", language);
    render();
  });
  window.addEventListener("see:account-changed", render);
  window.addEventListener("see:saved-changed", render);
  render();
})();
