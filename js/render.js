(function () {
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "style") node.setAttribute("style", attrs[k]);
        else if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function hexToRgba(hex, alpha) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function dot(color, size) {
    size = size || 8;
    return el("span", {
      class: "dot",
      style: "width:" + size + "px;height:" + size + "px;background:" + color + ";"
    });
  }

  function renderHighlights(root) {
    var D = window.HB;
    var grid = el("div", { class: "hl-grid" });
    D.highlights.forEach(function (h) {
      grid.appendChild(el("div", { class: "hl-cell" }, [
        el("div", { class: "hl-value" }, [h.value]),
        el("div", { class: "hl-label" }, [h.label])
      ]));
    });
    root.appendChild(grid);
  }

  function renderIndex(chips) {
    var D = window.HB;
    var count = document.querySelector(".idx-count");
    if (count) count.textContent = D.projects.length;
    D.projects.forEach(function (p) {
      var a = el("a", { href: "#project-" + p.id, class: "chip" }, [
        dot(p.accent, 7),
        el("span", null, [p.name])
      ]);
      chips.appendChild(a);
    });
  }

  function phoneMock(p) {
    return el("div", {
      class: "phone-mock",
      style: "background:linear-gradient(165deg," + p.accent + "," + hexToRgba(p.accent, 0.4) + ");"
    }, [
      el("div", { class: "phone-mock__inner" }, [
        el("div", { class: "phone-mock__icon", style: "background:" + p.accent + ";" }, [p.name.charAt(0)]),
        el("div", { class: "phone-mock__name" }, [p.name]),
        el("div", { class: "phone-mock__chips" }, p.stack.slice(0, 3).map(function (s) {
          return el("span", { class: "phone-mock__chip" }, [s]);
        }))
      ])
    ]);
  }

  function featuredRow(p, reverse) {
    var info = el("div", { class: "fr-info" }, [
      el("div", { class: "fr-meta" }, [dot(p.accent), el("span", null, [p.company + " · " + p.year])]),
      el("h3", { class: "fr-name", id: "project-" + p.id }, [p.name]),
      el("p", { class: "fr-desc" }, [p.description]),
      p.kpis && p.kpis.length ? el("div", {
        class: "fr-kpis",
        style: "grid-template-columns:repeat(" + p.kpis.length + ",1fr);"
      }, p.kpis.map(function (k) {
        return el("div", null, [
          el("div", { class: "fr-kpi-v" }, [k.value]),
          el("div", { class: "fr-kpi-l" }, [k.label])
        ]);
      })) : null,
      el("div", { class: "fr-stack" }, p.stack.map(function (s) {
        return el("span", { class: "chip-tag" }, [s]);
      })),
      el("a", { class: "fr-link", href: p.link.url, target: "_blank", rel: "noopener", style: "color:" + p.accent + ";" }, [
        p.link.label + " ", el("span", null, ["→"])
      ])
    ]);

    var canvasInner = p.image
      ? el("img", { src: p.image, alt: p.name + " app screenshot", class: "fr-img", loading: "lazy" })
      : phoneMock(p);

    var canvas = el("div", { class: "fr-canvas-wrap" }, [
      el("div", {
        class: "fr-canvas",
        style: "background:linear-gradient(135deg," + hexToRgba(p.accent, 0.07) + "," + hexToRgba(p.accent, 0.15) + ");"
      }, [canvasInner])
    ]);

    var row = el("article", { class: "fr-row" + (reverse ? " fr-row--rev" : "") }, [info, canvas]);
    return row;
  }

  function renderFeatured(root) {
    var D = window.HB;
    var featured = D.projects.slice(0, 4);
    featured.forEach(function (p, i) { root.appendChild(featuredRow(p, i % 2 === 1)); });
  }

  function renderSide(root) {
    var D = window.HB;
    var secondary = D.projects.slice(4);
    secondary.forEach(function (p) {
      root.appendChild(el("article", { class: "side-card", id: "project-" + p.id }, [
        el("div", { class: "side-meta" }, [dot(p.accent), el("span", null, [p.company + " · " + p.year])]),
        el("div", { class: "side-name" }, [p.name]),
        el("div", { class: "side-desc" }, [p.description]),
        el("div", { class: "side-stack" }, p.stack.map(function (s) {
          return el("span", { class: "chip-tag" }, [s]);
        })),
        el("a", { class: "side-link", href: p.link.url, target: "_blank", rel: "noopener", style: "color:" + p.accent + ";" }, [
          p.link.label + " ", el("span", null, ["→"])
        ])
      ]));
    });
  }

  function renderExperience(root) {
    var D = window.HB;
    D.experience.forEach(function (e) {
      root.appendChild(el("div", { class: "exp-row" }, [
        el("div", { class: "exp-co" }, [e.co]),
        el("div", { class: "exp-role" }, [e.role]),
        el("div", { class: "exp-yr" }, [e.years])
      ]));
    });
  }

  function renderFooter(root) {
    var D = window.HB;
    var links = [
      { label: "Email", value: D.email, href: "mailto:" + D.email },
      { label: "GitHub", value: D.github, href: D.githubUrl },
      { label: "LinkedIn", value: D.linkedin, href: D.linkedinUrl },
      { label: "Location", value: D.location, href: null }
    ];
    var grid = root.querySelector(".footer-links");
    links.forEach(function (l) {
      var inner = l.href
        ? el("a", { href: l.href, target: "_blank", rel: "noopener", class: "footer-value" }, [l.value])
        : el("div", { class: "footer-value" }, [l.value]);
      grid.appendChild(el("div", { class: "footer-link" }, [
        el("div", { class: "footer-label" }, [l.label]),
        inner
      ]));
    });
    var year = new Date().getFullYear();
    root.querySelector(".footer-copy").textContent = "© " + D.name + ", " + year;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHighlights(document.querySelector("[data-render='highlights']"));
    renderIndex(document.querySelector("[data-render='index']"));
    renderFeatured(document.querySelector("[data-render='featured']"));
    renderSide(document.querySelector("[data-render='side']"));
    renderExperience(document.querySelector("[data-render='experience']"));
    renderFooter(document.querySelector("[data-render='footer']"));
  });
})();
