// Client-side search over search.json. No dependencies, so nothing to go out of date.
(function () {
  var q = document.getElementById("q");
  var pick = document.getElementById("tagpick");
  var activeEl = document.getElementById("active");
  var results = document.getElementById("results");
  var count = document.getElementById("count");
  var recipes = [];
  var active = new Set(new URLSearchParams(location.search).getAll("tag"));
  q.value = new URLSearchParams(location.search).get("q") || "";

  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Dropdown of all tags (most used first) plus removable chips for the chosen ones.
  function renderTags() {
    var all = {};
    recipes.forEach(function (r) { (r.tags || []).forEach(function (t) { all[t] = (all[t] || 0) + 1; }); });
    var tags = Object.keys(all).sort(function (a, b) { return all[b] - all[a] || a.localeCompare(b); });
    pick.innerHTML = '<option value="">' + (active.size ? "Add another tag" : "Filter by tag") + "</option>" +
      tags.filter(function (t) { return !active.has(t); }).map(function (t) {
        return '<option value="' + esc(t) + '">' + esc(t) + " (" + all[t] + ")</option>";
      }).join("");
    pick.value = "";
    activeEl.innerHTML = Array.from(active).map(function (t) {
      return '<button type="button" class="chip" data-tag="' + esc(t) + '" aria-label="Remove filter ' + esc(t) + '">' +
        esc(t) + ' <span aria-hidden="true">×</span></button>';
    }).join("") + (active.size > 1 ? '<button type="button" class="clear" data-clear>Clear all</button>' : "");
  }

  function render() {
    var words = norm(q.value).split(/\s+/).filter(Boolean);
    var hits = recipes.filter(function (r) {
      for (var t of active) if ((r.tags || []).indexOf(t) < 0) return false;
      return words.every(function (w) { return r._hay.indexOf(w) >= 0; });
    });
    count.textContent = hits.length + " of " + recipes.length + " recipes";
    results.innerHTML = hits.map(function (r) {
      var sub = (r.tags || []).slice(0, 3).join(" · ");
      if (r.cooked) sub += (sub ? " · " : "") + "cooked " + r.cooked + "×";
      return '<li><a class="card" href="' + esc(r.url) + '">' +
        (r.image ? '<img loading="lazy" src="' + esc(r.image) + '" alt="">' : '<span class="sun" aria-hidden="true"></span>') +
        '<span><span class="t">' + esc(r.title) + '</span><span class="s">' + esc(sub) + "</span></span></a></li>";
    }).join("");
    var p = new URLSearchParams();
    if (q.value) p.set("q", q.value);
    active.forEach(function (t) { p.append("tag", t); });
    history.replaceState(null, "", p.toString() ? "?" + p : location.pathname);
  }

  pick.addEventListener("change", function () {
    if (pick.value) active.add(pick.value);
    renderTags();
    render();
  });
  activeEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-tag], [data-clear]");
    if (!b) return;
    if (b.hasAttribute("data-clear")) active.clear(); else active.delete(b.getAttribute("data-tag"));
    renderTags();
    render();
  });
  q.addEventListener("input", render);

  fetch(window.SEARCH_INDEX_URL).then(function (r) { return r.json(); }).then(function (data) {
    recipes = data.map(function (r) {
      r._hay = norm([r.title, (r.tags || []).join(" "), r.text].join(" "));
      return r;
    });
    renderTags();
    render();
  });
})();
