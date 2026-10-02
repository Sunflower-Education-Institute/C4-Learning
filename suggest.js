(function () {
  const config = window.SEE_SUGGESTION_CONFIG || {};
  const form = document.querySelector("#resource-suggestion-form");
  const submitButton = document.querySelector("#suggest-submit");
  const connectionNotice = document.querySelector("#connection-notice");
  const formStatus = document.querySelector("#form-status");
  const reason = document.querySelector("#recommendation");
  const reasonCount = document.querySelector("#reason-count");
  const languageButton = document.querySelector("[data-suggest-language]");
  const supportedLanguages = ["en", "zh", "es", "ar"];
  let language = supportedLanguages.includes(localStorage.getItem("seeLanguage")) ? localStorage.getItem("seeLanguage") : "en";

  const copy = {
    en: {
      navResources: "Explore resources", navAbout: "About SEE", eyebrow: "Community recommendations",
      title: "Suggest a learning resource", intro: "Know a high-quality resource that is missing from our library? Tell us why it may help families. Every suggestion is reviewed and researched before it can be included.",
      processEyebrow: "What happens next", stepOneTitle: "You recommend", stepOneBody: "Share the resource and what makes it useful.",
      stepTwoTitle: "SEE researches", stepTwoBody: "Our team checks the source, audience, pricing, and supporting information.",
      stepThreeTitle: "Editors decide", stepThreeBody: "Approved resources enter the same editorial review process as the rest of the library.",
      privacy: "Your name and email are optional and will never be displayed in the public resource library.",
      formEyebrow: "Resource suggestion", formTitle: "Tell us what we should review", requiredNote: "* Required",
      resourceName: "Resource name *", resourceNamePlaceholder: "e.g., Khan Academy", resourceUrl: "Resource website",
      resourceUrlPlaceholder: "https://example.com", resourceUrlHint: "Optional, but it helps us identify the correct resource.",
      reason: "Why do you recommend it? *", reasonPlaceholder: "What makes it valuable? Who would benefit? What subjects or skills does it cover?",
      ageGroup: "Best suited age group", subject: "Primary subject", selectOptional: "Select one (optional)", yourName: "Your name",
      agePreschool: "Preschool", agePreK: "Pre-K", ageKindergarten: "Kindergarten", ageEarlyElementary: "Early Elementary", ageUpperElementary: "Upper Elementary", ageMiddleSchool: "Middle School", ageHighSchool: "High School", ageAllAges: "All Ages",
      subjectArts: "Arts & Creativity", subjectEnglish: "English & Reading", subjectLanguages: "Languages", subjectMath: "Math", subjectMulti: "Multi-subject", subjectSocialStudies: "Social Studies & History", subjectStem: "STEM & Technology",
      yourNamePlaceholder: "Optional", contactEmail: "Contact email", contactEmailPlaceholder: "Optional — only if we may follow up",
      consent: "I understand that SEE will research this suggestion and that submission does not guarantee publication. *",
      submit: "Submit suggestion", cancel: "Cancel", openingSoon: "Online submissions are being connected. You can review the form now; the submit button will open when the private review sheet is ready.",
      required: "Please complete this required field.", invalidUrl: "Enter a complete website address beginning with http:// or https://.",
      invalidEmail: "Enter a valid email address.", sending: "Sending…", success: "Thank you. Your suggestion has been sent to the SEE editorial team.",
      failed: "We could not send your suggestion. Please try again later."
    },
    zh: {
      navResources: "浏览资源", navAbout: "关于 SEE", eyebrow: "社区推荐",
      title: "推荐新的学习资源", intro: "您是否知道尚未收录的优质学习资源？请告诉我们它为什么可能帮助家庭。每一项建议都需要经过调研和审核，才会考虑加入资源库。",
      processEyebrow: "接下来会怎样", stepOneTitle: "您提交推荐", stepOneBody: "介绍资源以及它值得关注的原因。",
      stepTwoTitle: "SEE 开展调研", stepTwoBody: "团队会核实来源、适用人群、价格和支持信息。",
      stepThreeTitle: "编辑作出决定", stepThreeBody: "符合要求的资源会进入与现有资源相同的编辑审核流程。",
      privacy: "姓名和邮箱均为选填，也不会显示在公开资源库中。",
      formEyebrow: "资源推荐", formTitle: "告诉我们值得调研的资源", requiredNote: "* 必填",
      resourceName: "资源名称 *", resourceNamePlaceholder: "例如：Khan Academy", resourceUrl: "资源网站",
      resourceUrlPlaceholder: "https://example.com", resourceUrlHint: "选填，但网站地址可以帮助我们确认正确的资源。",
      reason: "为什么推荐这个资源？*", reasonPlaceholder: "它有什么价值？适合哪些人？涵盖哪些学科或技能？",
      ageGroup: "最适合的年龄段", subject: "主要学科", selectOptional: "请选择（选填）", yourName: "您的姓名",
      agePreschool: "学前班", agePreK: "幼儿园预备班", ageKindergarten: "幼儿园", ageEarlyElementary: "小学低年级", ageUpperElementary: "小学高年级", ageMiddleSchool: "初中", ageHighSchool: "高中", ageAllAges: "所有年龄",
      subjectArts: "艺术与创意", subjectEnglish: "英语与阅读", subjectLanguages: "语言", subjectMath: "数学", subjectMulti: "多学科", subjectSocialStudies: "社会研究与历史", subjectStem: "科学、技术、工程与数学",
      yourNamePlaceholder: "选填", contactEmail: "联系邮箱", contactEmailPlaceholder: "选填——仅在需要跟进时联系您",
      consent: "我了解 SEE 将对推荐内容进行调研，提交推荐并不代表一定会公开收录。*",
      submit: "提交推荐", cancel: "取消", openingSoon: "在线提交接口正在连接中。您现在可以查看表单；私有审核表准备完成后，提交按钮将自动开放。",
      required: "请填写此必填项目。", invalidUrl: "请输入以 http:// 或 https:// 开头的完整网址。",
      invalidEmail: "请输入有效的邮箱地址。", sending: "正在提交……", success: "谢谢！您的推荐已发送给 SEE 编辑团队。",
      failed: "推荐暂时无法发送，请稍后再试。"
    },
    es: {
      navResources: "Explorar recursos", navAbout: "Acerca de SEE", eyebrow: "Recomendaciones de la comunidad", title: "Sugerir un recurso educativo", intro: "¿Conoces un recurso de calidad que falta en nuestra biblioteca? Cuéntanos por qué podría ayudar a las familias. Cada sugerencia se investiga y revisa antes de incluirse.",
      processEyebrow: "Qué sucede después", stepOneTitle: "Tú recomiendas", stepOneBody: "Comparte el recurso y explica por qué es útil.", stepTwoTitle: "SEE investiga", stepTwoBody: "Nuestro equipo revisa la fuente, el público, el precio y la información de apoyo.", stepThreeTitle: "Los editores deciden", stepThreeBody: "Los recursos aprobados pasan por el mismo proceso editorial que el resto de la biblioteca.", privacy: "Tu nombre y correo son opcionales y nunca aparecerán en la biblioteca pública.",
      formEyebrow: "Sugerencia de recurso", formTitle: "Dinos qué deberíamos revisar", requiredNote: "* Obligatorio", resourceName: "Nombre del recurso *", resourceNamePlaceholder: "p. ej., Khan Academy", resourceUrl: "Sitio web del recurso", resourceUrlPlaceholder: "https://example.com", resourceUrlHint: "Opcional, pero nos ayuda a identificar el recurso correcto.", reason: "¿Por qué lo recomiendas? *", reasonPlaceholder: "¿Qué lo hace valioso? ¿A quién ayuda? ¿Qué materias o habilidades cubre?", ageGroup: "Grupo de edad más adecuado", subject: "Materia principal", selectOptional: "Selecciona una opción (opcional)", yourName: "Tu nombre",
      agePreschool: "Preescolar", agePreK: "Pre-K", ageKindergarten: "Kindergarten", ageEarlyElementary: "Primaria inicial", ageUpperElementary: "Primaria superior", ageMiddleSchool: "Secundaria media", ageHighSchool: "Secundaria superior", ageAllAges: "Todas las edades", subjectArts: "Arte y creatividad", subjectEnglish: "Inglés y lectura", subjectLanguages: "Idiomas", subjectMath: "Matemáticas", subjectMulti: "Varias materias", subjectSocialStudies: "Estudios sociales e historia", subjectStem: "STEM y tecnología",
      yourNamePlaceholder: "Opcional", contactEmail: "Correo de contacto", contactEmailPlaceholder: "Opcional — solo si podemos contactarte", consent: "Entiendo que SEE investigará esta sugerencia y que enviarla no garantiza su publicación. *", submit: "Enviar sugerencia", cancel: "Cancelar", openingSoon: "Estamos conectando los envíos en línea. Puedes revisar el formulario ahora; el botón se habilitará cuando la hoja privada de revisión esté lista.", required: "Completa este campo obligatorio.", invalidUrl: "Escribe una dirección completa que empiece por http:// o https://.", invalidEmail: "Escribe un correo electrónico válido.", sending: "Enviando…", success: "Gracias. Tu sugerencia se envió al equipo editorial de SEE.", failed: "No pudimos enviar la sugerencia. Inténtalo más tarde."
    },
    ar: {
      navResources: "استكشاف الموارد", navAbout: "عن SEE", eyebrow: "توصيات المجتمع", title: "اقتراح مورد تعليمي", intro: "هل تعرف موردًا عالي الجودة غير موجود في مكتبتنا؟ أخبرنا كيف يمكن أن يساعد الأسر. تُبحث كل توصية وتُراجع قبل إدراجها.",
      processEyebrow: "ماذا يحدث بعد ذلك", stepOneTitle: "أنت تقترح", stepOneBody: "شارك المورد واشرح ما يجعله مفيدًا.", stepTwoTitle: "تبحث SEE", stepTwoBody: "يتحقق فريقنا من المصدر والجمهور والسعر والمعلومات الداعمة.", stepThreeTitle: "يقرر المحررون", stepThreeBody: "تدخل الموارد المعتمدة عملية المراجعة التحريرية نفسها المتبعة لبقية المكتبة.", privacy: "الاسم والبريد الإلكتروني اختياريان ولن يظهرا في المكتبة العامة.",
      formEyebrow: "اقتراح مورد", formTitle: "أخبرنا بما ينبغي مراجعته", requiredNote: "* مطلوب", resourceName: "اسم المورد *", resourceNamePlaceholder: "مثال: Khan Academy", resourceUrl: "موقع المورد", resourceUrlPlaceholder: "https://example.com", resourceUrlHint: "اختياري، لكنه يساعدنا على تحديد المورد الصحيح.", reason: "لماذا توصي به؟ *", reasonPlaceholder: "ما الذي يجعله مفيدًا؟ لمن يناسب؟ ما المواد أو المهارات التي يغطيها؟", ageGroup: "الفئة العمرية الأنسب", subject: "المادة الرئيسية", selectOptional: "اختر خيارًا (اختياري)", yourName: "اسمك",
      agePreschool: "ما قبل المدرسة", agePreK: "ما قبل الروضة", ageKindergarten: "الروضة", ageEarlyElementary: "الابتدائية المبكرة", ageUpperElementary: "الابتدائية العليا", ageMiddleSchool: "المتوسطة", ageHighSchool: "الثانوية", ageAllAges: "جميع الأعمار", subjectArts: "الفنون والإبداع", subjectEnglish: "الإنجليزية والقراءة", subjectLanguages: "اللغات", subjectMath: "الرياضيات", subjectMulti: "مواد متعددة", subjectSocialStudies: "الدراسات الاجتماعية والتاريخ", subjectStem: "العلوم والتقنية والهندسة والرياضيات",
      yourNamePlaceholder: "اختياري", contactEmail: "بريد التواصل", contactEmailPlaceholder: "اختياري — فقط إذا أمكننا المتابعة", consent: "أفهم أن SEE ستبحث هذا الاقتراح وأن إرساله لا يضمن نشره. *", submit: "إرسال الاقتراح", cancel: "إلغاء", openingSoon: "يجري ربط الإرسال عبر الإنترنت. يمكنك مراجعة النموذج الآن، وسيتاح زر الإرسال عندما تصبح ورقة المراجعة الخاصة جاهزة.", required: "يرجى إكمال هذا الحقل المطلوب.", invalidUrl: "أدخل عنوانًا كاملًا يبدأ بـ http:// أو https://.", invalidEmail: "أدخل بريدًا إلكترونيًا صالحًا.", sending: "جارٍ الإرسال…", success: "شكرًا لك. أُرسل اقتراحك إلى فريق تحرير SEE.", failed: "تعذر إرسال الاقتراح. حاول مرة أخرى لاحقًا."
    }
  };

  const t = key => copy[language][key] || copy.en[key] || key;
  const endpointReady = () => /^https:\/\//.test(String(config.endpoint || ""));

  function applyLanguage() {
    document.documentElement.lang = language === "zh" ? "zh-Hans" : language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = ({ zh: "推荐学习资源 · SEE", es: "Sugerir un recurso educativo · SEE", ar: "اقتراح مورد تعليمي · SEE" }[language] || "Suggest a learning resource · SEE");
    document.querySelectorAll("[data-copy]").forEach(element => { element.textContent = t(element.dataset.copy); });
    document.querySelectorAll("[data-placeholder]").forEach(element => { element.placeholder = t(element.dataset.placeholder); });
    languageButton.value = language;
    languageButton.setAttribute("aria-label", ({ zh: "选择语言", es: "Elegir idioma", ar: "اختيار اللغة" }[language] || "Choose language"));
    connectionNotice.textContent = endpointReady() ? "" : t("openingSoon");
    connectionNotice.hidden = endpointReady();
    submitButton.disabled = !endpointReady();
    updateCount();
  }

  function updateCount() {
    reasonCount.textContent = `${reason.value.length} / 1500`;
  }

  function errorFor(name, message = "") {
    const target = document.querySelector(`[data-error-for="${name}"]`);
    if (target) target.textContent = message;
  }

  function validate() {
    const data = new FormData(form);
    let valid = true;
    ["resourceName", "recommendation", "resourceUrl", "contactEmail", "editorialConsent"].forEach(name => errorFor(name));
    if (!String(data.get("resourceName") || "").trim()) { errorFor("resourceName", t("required")); valid = false; }
    if (!String(data.get("recommendation") || "").trim()) { errorFor("recommendation", t("required")); valid = false; }
    const url = String(data.get("resourceUrl") || "").trim();
    if (url && !/^https?:\/\/[^\s]+$/i.test(url)) { errorFor("resourceUrl", t("invalidUrl")); valid = false; }
    const email = String(data.get("contactEmail") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorFor("contactEmail", t("invalidEmail")); valid = false; }
    if (!data.get("editorialConsent")) { errorFor("editorialConsent", t("required")); valid = false; }
    return valid;
  }

  function payloadFromForm() {
    const data = new FormData(form);
    return {
      schemaVersion: 1,
      locale: language === "zh" ? "zh-Hans" : language,
      resourceName: String(data.get("resourceName") || "").trim(),
      resourceUrl: String(data.get("resourceUrl") || "").trim(),
      recommendation: String(data.get("recommendation") || "").trim(),
      ageGroup: String(data.get("ageGroup") || ""),
      subject: String(data.get("subject") || ""),
      recommenderName: String(data.get("recommenderName") || "").trim(),
      contactEmail: String(data.get("contactEmail") || "").trim(),
      editorialConsent: data.get("editorialConsent") === "on",
      organizationWebsite: String(data.get("organizationWebsite") || "")
    };
  }

  async function submitSuggestion(payload) {
    const body = new URLSearchParams({ payload: JSON.stringify(payload) });
    const response = await fetch(config.endpoint, { method: "POST", body });
    if (!response.ok) throw new Error(`Suggestion endpoint returned ${response.status}`);
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "Suggestion was rejected");
    return result;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!endpointReady() || !validate()) return;
    submitButton.disabled = true;
    formStatus.className = "form-status full-field pending";
    formStatus.textContent = t("sending");
    try {
      await submitSuggestion(payloadFromForm());
      form.reset();
      updateCount();
      formStatus.className = "form-status full-field success";
      formStatus.textContent = t("success");
    } catch (error) {
      console.error(error);
      formStatus.className = "form-status full-field error";
      formStatus.textContent = t("failed");
    } finally {
      submitButton.disabled = !endpointReady();
    }
  });

  reason.addEventListener("input", updateCount);
  languageButton.addEventListener("change", event => {
    language = supportedLanguages.includes(event.target.value) ? event.target.value : "en";
    localStorage.setItem("seeLanguage", language);
    applyLanguage();
  });
  applyLanguage();
})();
