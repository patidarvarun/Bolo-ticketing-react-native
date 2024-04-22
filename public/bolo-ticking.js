!(function () {
  let e = {
    firstName: 128,
    lastName: 128,
    email: 128,
    phone: 10,
    title: 128,
    description: 1024,
  };
  if (window.BoloTicking) {
    console.warn("Bolo Ticking plugin is already initialized.");
    return;
  }
  window.BoloTicking = {};
  var t = null;
  BoloTicking.initializeWidget = function () {
    function a() {
      var e = document.createElement("div");
      (e.id = "bt_widget"), e.classList.add("bt_widget-container");
      var t = document.createElement("div");
      t.classList.add("bt_widget-header");
      var a = document.createElement("img");
      (a.src = "logo_icon.png"),
        (a.alt = "Ticketing Logo"),
        a.classList.add("bt_widget-logo");
      var i = document.createElement("button");
      (i.textContent = "✖"),
        (i.onclick = function () {
          e.remove();
        }),
        i.classList.add("bt_widget-close-button"),
        t.appendChild(a),
        t.appendChild(i);
      var n = document.createElement("h2");
      (n.textContent = "Something went wrong."),
        n.classList.add("bt_widget_error"),
        e.appendChild(t),
        e.appendChild(n),
        document.body.appendChild(e);
    }
    function sanitizeInput(inputField, maxLength) {
      var value = inputField.value.substring(0, maxLength);

      // **Improved sanitization:** Clear field if script tag found
      if (value.includes("<script>")) {
        var errorMessage = document.createElement("div");
        errorMessage.textContent = "Error:Tags are not allowed";
        // errorMessage.classList.add("bt_widget_errore2525");
        errorMessage.style.fontSize = "12px !important"; // Set font size
        errorMessage.style.color = "red !important"; // Set color

        var errorContainer = document.getElementById(
          "bt_widget_error_container"
        );
        if (!errorContainer) {
          errorContainer = document.createElement("div");
          errorContainer.id = "bt_widget_error_container";
          document
            .getElementById("bt_widgetForm")
            .insertBefore(
              errorContainer,
              document.getElementById("bt_widgetForm").firstChild
            );
        }
        errorContainer.appendChild(errorMessage);

        // Clear the input field
        inputField.value = "";
        setTimeout(function () {
          errorContainer.removeChild(errorMessage);
        }, 2000);
        return ""; // Return empty string to indicate error

        // Automatically remove error message after 2 seconds
      } else {
        // No script tag detected, proceed with normal processing
        return value;
      }
    }

    if (
      !bolo_config.customer_api_url ||
      !bolo_config.ticket_api_url ||
      !bolo_config.api_key
    ) {
      a();
      return;
    }
    var i = `
    mutation loginApiKey($input: LoginApiKeyInput!) {
        loginApiKey(input: $input) {
            jwt
            serviceLocations {
                serviceType
            }
        }
    }`,
      n = {
        input: { apiKey: bolo_config.api_key, requestedServices: "TICKETING" },
      };
    if (
      (fetch(bolo_config.customer_api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: i, variables: n }),
      })
        .then((e) => {
          if (!e.ok) throw Error("API Error");
          return e.json();
        })
        .then((e) => {
          t = e.data.loginApiKey.jwt;
        })
        .catch((e) => {
          console.error("API Error:", e), a();
        }),
      !document.getElementById("bt_widget"))
    ) {
      var r = document.createElement("div");
      (r.id = "bt_widget"), r.classList.add("bt_widget-container");
      var l = document.createElement("div");
      l.classList.add("bt_widget-header");
      var d = document.createElement("img");
      (d.src = `${bolo_config.logo ? bolo_config.logo : "logo_icon.png"}`),
        (d.alt = "Ticketing Logo"),
        d.classList.add("bt_widget-logo");
      var o = document.createElement("button");
      (o.textContent = "✖"),
        (o.onclick = function () {
          r.remove(),
            (document.getElementById("openWidget").style.display = "block");
        }),
        o.classList.add("bt_widget-close-button"),
        l.appendChild(d),
        l.appendChild(o);

      var p = document.createElement("form");
      function s(e) {
        var t = document.createElement("label");
        if (((t.textContent = e), "Last Name" !== e)) {
          var a = document.createElement("span");
          (a.textContent = "*"), (a.style.color = "red"), t.appendChild(a);
        }
        return t;
      }
      p.id = "bt_widgetForm";
      var c = s("First Name"),
        m = document.createElement("input");
      (m.type = "text"),
        (m.id = "firstName"),
        (m.name = "firstName"),
        (m.placeholder = "Your First Name"),
        (m.maxLength = e.firstName),
        (m.required = !0);

      m.addEventListener("input", function () {
        m.value = sanitizeInput(m, e.firstName);
      });
      var u = s("Last Name"),
        h = document.createElement("input");
      (h.type = "text"),
        (h.id = "lastName"),
        (h.name = "lastName"),
        (h.placeholder = "Your Last Name"),
        (h.maxLength = e.lastName);
      h.addEventListener("input", function () {
        h.value = sanitizeInput(h, e.lastName);
      });
      var g = s("Email"),
        v = document.createElement("input");
      (v.type = "email"),
        (v.id = "email"),
        (v.name = "email"),
        (v.placeholder = "Your Email"),
        (v.maxLength = e.email),
        (v.required = !0);
      v.addEventListener("input", function () {
        v.value = sanitizeInput(v, e.email);
      });
      var b = s("Phone"),
        C = document.createElement("input");
      (C.type = "tel"),
        (C.id = "phone"),
        (C.name = "phone"),
        (C.placeholder = "Your Phone Number"),
        (C.required = !0),
        (C.maxLength = e.phone),
        C.addEventListener("input", function () {
          C.value = C.value.replace(/\D/g, "");
        });
      var y = s("Title"),
        E = document.createElement("input");
      (E.type = "text"),
        (E.id = "title"),
        (E.name = "title"),
        (E.placeholder = "Title"),
        (E.required = !0),
        E.addEventListener("keypress", function (event) {
          var char = String.fromCharCode(event.charCode);
          if (!char.match(/^[a-zA-Z0-9\s]+$/)) {
            event.preventDefault();
          }
        });
      E.addEventListener("input", function () {
        E.value = sanitizeInput(E, e.email);
      });
      E.maxLength = e.title;
      var L = s("Description"),
        f = document.createElement("textarea");
      (f.id = "description"),
        (f.name = "description"),
        (f.placeholder = "Description"),
        (f.maxLength = e.description),
        (f.required = !0);
      f.addEventListener("input", function () {
        f.value = sanitizeInput(f, e.email);
      });
      var T = document.createElement("div");
      T.classList.add("submit-button-wrapper");

      var w = document.createElement("button");
      (w.type = "submit"),
        (w.textContent = "Submit"),
        w.classList.add("submit-button"),
        p.addEventListener("submit", function (e) {
          e.preventDefault(),
            (w.disabled = !0),
            (w.innerHTML =
              '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
          var a = `
        mutation createCustomerTicket($input: CreateCustomerTicketInput!) {
            createCustomerTicket(input: $input) {
                ID {
                    ID
                }
            }
        }
    `,
            i = {
              input: {
                apiKey: { ApiKey: bolo_config.api_key },
                endUserData: {
                  firstName: m.value,
                  lastName: h.value,
                  contact: { email: v.value, phone: C.value },
                },
                ticketDetails: { title: E.value, description: f.value },
              },
            };
          fetch(bolo_config.ticket_api_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + t,
            },
            body: JSON.stringify({ query: a, variables: i }),
          })
            .then((e) => {
              if (!e.ok) throw Error("API Error");
              return e.json();
            })
            .then((e) => {
              (document.getElementById("openWidget").style.display = "block"),
                (m.value = ""),
                (h.value = ""),
                (v.value = ""),
                (C.value = ""),
                (E.value = ""),
                (f.value = ""),
                (function e(t) {
                  var a = document.getElementById("toastMessagePlaceholder");
                  if (!a) {
                    console.error("Toast message placeholder not found.");
                    return;
                  }
                  var i = document.createElement("div");
                  (i.textContent = t),
                    i.classList.add("toast-message"),
                    (i.style.paddingTop = "10px"),
                    (i.style.paddingBottom = "15px"),
                    (i.style.color = "#21b6a8"),
                    (i.style.display = "block"),
                    (i.style.margin = "0 auto"),
                    a.appendChild(i),
                    setTimeout(function () {
                      i.remove();
                    }, 2e3);
                })("Ticket created successfully!"),
                (w.innerHTML = "Submit"),
                (w.disabled = !1);
            })
            .catch((e) => {
              console.error("API Error:", e),
                (w.innerHTML = "Submit"),
                (w.disabled = !1);
            });
        }),
        T.appendChild(w),
        p.appendChild(c),
        p.appendChild(m),
        p.appendChild(document.createElement("br")),
        p.appendChild(u),
        p.appendChild(h),
        p.appendChild(document.createElement("br")),
        p.appendChild(g),
        p.appendChild(v),
        p.appendChild(document.createElement("br")),
        p.appendChild(b),
        p.appendChild(C),
        p.appendChild(document.createElement("br")),
        p.appendChild(y),
        p.appendChild(E),
        p.appendChild(document.createElement("br")),
        p.appendChild(L),
        p.appendChild(f),
        p.appendChild(document.createElement("br"));
      var k = document.createElement("div");
      (k.id = "toastMessagePlaceholder"),
        p.appendChild(k),
        p.appendChild(T),
        r.appendChild(l),
        r.appendChild(p);
      var x = document.getElementById("bt_mainDiv");
      (x.innerHTML = ""), x.appendChild(r);
    }
  };
  var a = document.createElement("button");
  (a.id = "openWidget"),
    (a.innerHTML = `<img src=${
      bolo_config.logo ? bolo_config.logo : "logo_icon.png"
    } alt="Bolo Logo" width="70px">`),
    (a.title = "Show Chat"),
    a.classList.add("bt_buttonshow"),
    a.addEventListener("click", function () {
      BoloTicking.initializeWidget();
    }),
    document.body.appendChild(a);
})();
