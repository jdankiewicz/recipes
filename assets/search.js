// Client-side search over search.json. No dependencies, so nothing to go out of date.
(function () {
  var q = document.getElementById("q");
  var tagsEl = document.getElementById("tags");
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

  function renderTags() {
    var all = {};
    recipes.forEach(function (r) { (r.tags || []).forEach(function (t) { all[t] = (all[t] || 0) + 1; }); });
    tagsEl.innerHTML = Object.keys(all).sort().map(function (t) {
      return '<button type="button" class="tag" data-tag="' + esc(t) + '" aria-pressed="' + active.has(t) + '">' +
        esc(t) + " · " + all[t] + "</button>";
    }).join("");
  }

  function render() {
    var words = norm(q.value).split(/\s+/).filter(Boolean);
    var hits = recipes.filter(function (r) {
      for (var t of active) if ((r.tags || []).indexOf(t) < 0) return false;
      return words.every(function (w) { return r._hay.indexOf(w) >= 0; });
    });
    count.textContent = hits.length + " of " + recipes.length + " recipes";
    results.innerHTML = hits.map(function (r) {
      var sub = (r.tags || []).join(" · ");
      if (r.cooked && r.cooked.length) sub += (sub ? " — " : "") + "cooked " + r.cooked.length + "×";
      return '<li><a class="card" href="' + esc(r.url) + '">' +
        (r.image ? '<img loading="lazy" src="' + esc(r.image) + '" alt="">' : "") +
        '<span><span class="t">' + esc(r.title) + '</span><br><span class="s">' + esc(sub) + "</span></span></a></li>";
    }).join("");
    var p = new URLSearchParams();
    if (q.value) p.set("q", q.value);
    active.forEach(function (t) { p.append("tag", t); });
    history.replaceState(null, "", p.toString() ? "?" + p : location.pathname);
  }

  tagsEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-tag]");
    if (!b) return;
    var t = b.getAttribute("data-tag");
    active.has(t) ? active.delete(t) : active.add(t);
    b.setAttribute("aria-pressed", active.has(t));
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
