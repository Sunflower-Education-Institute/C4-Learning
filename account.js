(function () {
  const signedInKey = "seeDemoSignedIn";
  const savedKey = "seeDemoSavedResources";
  const pendingSaveKey = "seeDemoPendingSave";

  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(savedKey) || "[]");
      return Array.isArray(value) ? value.filter(item => typeof item === "string") : [];
    } catch {
      return [];
    }
  }

  function isSignedIn() {
    return localStorage.getItem(signedInKey) === "true";
  }

  function openSignIn(pendingSourceId = "") {
    if (pendingSourceId) sessionStorage.setItem(pendingSaveKey, pendingSourceId);
    const dialog = document.querySelector("#signin-dialog");
    if (dialog && !dialog.open) dialog.showModal();
  }

  function updateAccountButton() {
    const button = document.querySelector(".sign-in");
    if (!button) return;
    const chinese = document.documentElement.lang.startsWith("zh");
    button.textContent = isSignedIn() ? (chinese ? "我的收藏" : "My saved") : (chinese ? "登录" : "Sign in");
    button.classList.toggle("signed-in", isSignedIn());
  }

  function signIn() {
    localStorage.setItem(signedInKey, "true");
    const pendingSourceId = sessionStorage.getItem(pendingSaveKey);
    if (pendingSourceId) {
      const saved = new Set(readSaved());
      saved.add(pendingSourceId);
      localStorage.setItem(savedKey, JSON.stringify([...saved]));
      sessionStorage.removeItem(pendingSaveKey);
    }
    updateAccountButton();
    window.dispatchEvent(new CustomEvent("see:account-changed"));
  }

  function signOut() {
    localStorage.removeItem(signedInKey);
    updateAccountButton();
    window.dispatchEvent(new CustomEvent("see:account-changed"));
  }

  function isSaved(sourceId) {
    return readSaved().includes(sourceId);
  }

  function toggleSaved(sourceId) {
    if (!isSignedIn()) {
      openSignIn(sourceId);
      return null;
    }
    const saved = new Set(readSaved());
    if (saved.has(sourceId)) saved.delete(sourceId);
    else saved.add(sourceId);
    localStorage.setItem(savedKey, JSON.stringify([...saved]));
    window.dispatchEvent(new CustomEvent("see:saved-changed", { detail: { sourceId, saved: saved.has(sourceId) } }));
    return saved.has(sourceId);
  }

  function init() {
    const accountButton = document.querySelector(".sign-in");
    if (accountButton) {
      accountButton.addEventListener("click", () => {
        if (isSignedIn()) window.location.href = "saved.html";
        else openSignIn();
      });
    }
    const form = document.querySelector("#demo-signin-form");
    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
        signIn();
        form.closest("dialog").close();
      });
    }
    document.querySelectorAll(".dialog-close,[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
    updateAccountButton();
  }

  window.SEE_ACCOUNT = { isSignedIn, openSignIn, signIn, signOut, isSaved, toggleSaved, savedIds: readSaved, updateAccountButton };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
