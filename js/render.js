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

    var canvas = el("div", { class: "fr-canvas-wrap" }, [
      p.image
        ? el("div", { class: "fr-canvas fr-canvas--flat" }, [
            el("img", { src: p.image, alt: p.name + " app screenshots", class: "fr-img-flat", loading: "lazy" })
          ])
        : el("div", {
            class: "fr-canvas",
            style: "background:linear-gradient(135deg," + hexToRgba(p.accent, 0.07) + "," + hexToRgba(p.accent, 0.15) + ");"
          }, [phoneMock(p)])
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
      var body = el("div", { class: "side-card__body" }, [
        el("div", { class: "side-meta" }, [dot(p.accent), el("span", null, [p.company + " · " + p.year])]),
        el("div", { class: "side-name" }, [p.name]),
        el("div", { class: "side-desc" }, [p.tagline || p.description]),
        el("div", { class: "side-stack" }, p.stack.map(function (s) {
          return el("span", { class: "chip-tag" }, [s]);
        })),
        el("a", { class: "side-link", href: p.link.url, target: "_blank", rel: "noopener", style: "color:" + p.accent + ";" }, [
          p.link.label + " ", el("span", null, ["→"])
        ])
      ]);
      var children = [];
      if (p.image) {
        children.push(el("div", { class: "side-card__media" }, [
          el("img", { src: p.image, alt: p.name + " preview", loading: "lazy" })
        ]));
      }
      children.push(body);
      var cls = "side-card" + (p.image ? " side-card--with-image" : "");
      root.appendChild(el("article", { class: cls, id: "project-" + p.id }, children));
    });
  }

  function renderWriting(root) {
    var D = window.HB;
    if (!D.blog || !D.blog.posts || !D.blog.posts.length) return;
    var post = D.blog.posts[0];

    root.appendChild(el("div", { class: "writing__header" }, [
      el("div", { class: "section-label", style: "margin-bottom:0;" }, ["Writing"]),
      el("a", {
        class: "writing__all",
        href: D.blog.url,
        target: "_blank",
        rel: "noopener"
      }, ["All posts on Hashnode ", el("span", null, ["↗"])])
    ]));

    root.appendChild(el("a", {
      class: "writing__featured",
      href: post.url,
      target: "_blank",
      rel: "noopener"
    }, [
      el("div", { class: "writing__bar" }),
      el("div", { class: "writing__top" }, [
        el("span", { class: "writing__pill" }, ["Latest"]),
        el("span", { class: "writing__tag" }, [post.tag])
      ]),
      el("h3", { class: "writing__title" }, [post.title]),
      el("p", { class: "writing__excerpt" }, [post.excerpt]),
      el("div", { class: "writing__foot" }, [
        el("span", null, [post.date]),
        el("span", { class: "writing__dot" }),
        el("span", null, [post.readTime]),
        el("span", { class: "writing__read" }, ["Read →"])
      ])
    ]));
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
    var writingRoot = document.querySelector("[data-render='writing']");
    if (writingRoot) renderWriting(writingRoot);
    renderExperience(document.querySelector("[data-render='experience']"));
    renderFooter(document.querySelector("[data-render='footer']"));
  });
})();
