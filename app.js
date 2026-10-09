(function () {
  "use strict";

  const archives = window.PIONEER_ARCHIVES || [];
  const scientists = window.PIONEER_SCIENTISTS || [];
  const $ = (sel) => document.querySelector(sel);

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function initials(name) {
    return name.split(/\s+/).filter((p) => /^[A-Za-z]/.test(p)).slice(0, 2).map((p) => p[0]).join("");
  }

  /* ---------------- Tabs ---------------- */
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const fab = $("#fab-ask");

  function activateTab(name, focus) {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
      if (active && focus) tab.focus();
    });
    fab.hidden = name === "ask";
    if (name === "ask") setTimeout(() => $("#chat-input").focus(), 0);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      activateTab(next.dataset.tab, true);
    });
  });
  fab.addEventListener("click", () => {
    activateTab("ask");
    window.scrollTo({ top: $("#panel-ask").offsetTop - 90, behavior: "smooth" });
  });

  /* ---------------- Explore ---------------- */
  const fields = ["All", ...new Set(archives.map((a) => a.field))];
  let activeField = "All";
  const filterWrap = $("#archive-filters");
  const archiveGrid = $("#archive-grid");
  const archiveSearch = $("#archive-search");

  filterWrap.innerHTML = fields
    .map((f) => `<button type="button" class="chip" aria-pressed="${f === "All"}" data-field="${escapeHtml(f)}">${escapeHtml(f)}</button>`)
    .join("");
  filterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-field]");
    if (!btn) return;
    activeField = btn.dataset.field;
    filterWrap.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === btn)));
    renderArchives();
  });
  archiveSearch.addEventListener("input", renderArchives);

  function archiveCard(doc) {
    const cover = doc.cover
      ? `<img src="${escapeHtml(doc.cover)}" alt="First page of ${escapeHtml(doc.title)}" loading="lazy" />`
      : `<div class="skeleton" aria-hidden="true"><span></span><span></span><span></span><span class="short"></span></div>`;
    const action = doc.pdf
      ? `<a class="btn btn-primary btn-sm" href="${escapeHtml(doc.pdf)}" target="_blank" rel="noopener noreferrer">Open PDF<span class="sr-only"> of ${escapeHtml(doc.title)}</span></a>`
      : `<span class="btn btn-sm btn-disabled" aria-disabled="true">PDF coming soon</span>`;
    return `<li class="archive-card">
      <div class="archive-cover">${cover}<span class="badge">${escapeHtml(doc.field)}</span></div>
      <div class="archive-meta">
        <h3>${escapeHtml(doc.title)}</h3>
        <p>${escapeHtml(doc.author)} · ${escapeHtml(doc.year)}</p>
        ${action}
      </div>
    </li>`;
  }

  function renderArchives() {
    const q = archiveSearch.value.trim().toLowerCase();
    const list = archives.filter((a) => {
      const matchField = activeField === "All" || a.field === activeField;
      const matchQuery = !q || `${a.title} ${a.author} ${a.field}`.toLowerCase().includes(q);
      return matchField && matchQuery;
    });
    archiveGrid.innerHTML = list.map(archiveCard).join("");
    $("#archive-empty").hidden = list.length > 0;
  }
  renderArchives();

  /* ---------------- Discover ---------------- */
  const scientistGrid = $("#scientist-grid");
  const scientistSearch = $("#scientist-search");
  const wikiCache = new Map();

  function fetchWiki(title) {
    if (!wikiCache.has(title)) {
      const req = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);
      wikiCache.set(title, req);
    }
    return wikiCache.get(title);
  }

  function photoMarkup(person, src, cls) {
    return src
      ? `<img class="${cls}" src="${escapeHtml(src)}" alt="Portrait of ${escapeHtml(person.name)}" loading="lazy" />`
      : `<span class="${cls} photo-fallback" aria-hidden="true">${escapeHtml(initials(person.name))}</span>`;
  }

  scientistGrid.innerHTML = scientists
    .map((s, i) => `<li>
      <button type="button" class="scientist-card" data-index="${i}">
        <span class="scientist-photo" data-photo="${i}"><span class="photo-fallback" aria-hidden="true">${escapeHtml(initials(s.name))}</span></span>
        <span class="scientist-info">
          <span class="scientist-name">${escapeHtml(s.name)}</span>
          <span class="scientist-field">${escapeHtml(s.field)}</span>
          <span class="scientist-years">${escapeHtml(s.years)}</span>
        </span>
      </button>
    </li>`)
    .join("");

  scientists.forEach((s, i) => {
    fetchWiki(s.wiki).then((data) => {
      const src = data && data.thumbnail && data.thumbnail.source;
      if (src) scientistGrid.querySelector(`[data-photo="${i}"]`).innerHTML = photoMarkup(s, src, "");
    });
  });

  scientistSearch.addEventListener("input", () => {
    const q = scientistSearch.value.trim().toLowerCase();
    let shown = 0;
    scientistGrid.querySelectorAll("li").forEach((li, i) => {
      const s = scientists[i];
      const match = !q || `${s.name} ${s.field}`.toLowerCase().includes(q);
      li.hidden = !match;
      if (match) shown++;
    });
    $("#scientist-empty").hidden = shown > 0;
  });

  /* ---------------- Modal ---------------- */
  const modal = $("#scientist-modal");
  let modalPerson = null;

  scientistGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".scientist-card");
    if (card) openScientist(scientists[Number(card.dataset.index)]);
  });

  async function openScientist(person) {
    modalPerson = person;
    $("#modal-name").textContent = person.name;
    $("#modal-field").textContent = person.field;
    $("#modal-years").textContent = person.years;
    $("#modal-works").innerHTML = person.works.map((w) => `<li>${escapeHtml(w)}</li>`).join("");
    $("#modal-bio").textContent = "Loading biography…";
    $("#modal-photo").innerHTML = photoMarkup(person, "", "");
    $("#modal-wiki").href = `https://en.wikipedia.org/wiki/${encodeURIComponent(person.wiki)}`;
    modal.showModal();

    const data = await fetchWiki(person.wiki);
    if (modalPerson !== person) return;
    $("#modal-bio").textContent = (data && data.extract) || "Biography is unavailable offline. Ask Pioneer AI to learn more.";
    const src = data && data.thumbnail && data.thumbnail.source;
    if (src) $("#modal-photo").innerHTML = photoMarkup(person, src, "");
  }

  $("#modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
  $("#modal-ask").addEventListener("click", () => {
    modal.close();
    activateTab("ask");
    sendMessage(`Tell me about ${modalPerson.name} and their most important scientific contributions.`);
  });

  /* ---------------- Chat ---------------- */
  const chatLog = $("#chat-log");
  const chatForm = $("#chat-form");
  const chatInput = $("#chat-input");
  const chatSend = $("#chat-send");
  const suggestions = $("#chat-suggestions");
  let history = [];
  let busy = false;

  function renderMarkdown(text) {
    const lines = escapeHtml(text).split("\n");
    let html = "";
    let inList = null;
    const inline = (s) =>
      s
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    const closeList = () => {
      if (inList) html += `</${inList}>`;
      inList = null;
    };
    for (const raw of lines) {
      const line = raw.trimEnd();
      const ul = line.match(/^\s*[-*•]\s+(.*)/);
      const ol = line.match(/^\s*\d+[.)]\s+(.*)/);
      const h = line.match(/^#{1,4}\s+(.*)/);
      if (ul || ol) {
        const type = ul ? "ul" : "ol";
        if (inList !== type) {
          closeList();
          html += `<${type}>`;
          inList = type;
        }
        html += `<li>${inline((ul || ol)[1])}</li>`;
      } else {
        closeList();
        if (h) html += `<p class="md-h">${inline(h[1])}</p>`;
        else if (line.trim()) html += `<p>${inline(line)}</p>`;
      }
    }
    closeList();
    return html;
  }

  function addMessage(role, text) {
    const li = document.createElement("li");
    li.className = `msg ${role === "user" ? "msg-user" : "msg-ai"}`;
    const body = document.createElement("div");
    body.className = "msg-body";
    if (role === "user") body.textContent = text;
    else body.innerHTML = text ? renderMarkdown(text) : '<span class="typing" aria-label="Pioneer is thinking"><i></i><i></i><i></i></span>';
    li.appendChild(body);
    chatLog.appendChild(li);
    chatLog.scrollTop = chatLog.scrollHeight;
    return body;
  }

  async function sendMessage(text) {
    const content = text.trim();
    if (!content || busy) return;
    busy = true;
    chatSend.disabled = true;
    suggestions.hidden = true;
    addMessage("user", content);
    history.push({ role: "user", content });
    const body = addMessage("assistant", "");
    let reply = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-20) }),
      });
      if (!res.ok || !res.body) throw new Error(`Request failed (${res.status})`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        body.innerHTML = renderMarkdown(reply);
        chatLog.scrollTop = chatLog.scrollHeight;
      }
      if (!reply) throw new Error("Empty response");
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      body.innerHTML = "<p>Pioneer AI is unavailable right now. Please check your connection and try again in a moment.</p>";
      body.parentElement.classList.add("msg-error");
      history.pop();
    } finally {
      busy = false;
      chatSend.disabled = false;
    }
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value;
    chatInput.value = "";
    autoGrow();
    sendMessage(text);
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.isComposing || e.keyCode === 229) return;
      e.preventDefault();
      chatForm.requestSubmit();
    }
  });

  function autoGrow() {
    chatInput.style.height = "auto";
    chatInput.style.height = Math.min(chatInput.scrollHeight, 160) + "px";
  }
  chatInput.addEventListener("input", autoGrow);

  suggestions.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) sendMessage(chip.textContent);
  });

  $("#chat-clear").addEventListener("click", () => {
    if (busy) return;
    history = [];
    chatLog.innerHTML = "";
    addMessage("assistant", "New conversation started. What would you like to learn today?");
    suggestions.hidden = false;
    chatInput.focus();
  });
})();
