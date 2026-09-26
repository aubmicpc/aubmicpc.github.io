(function(){
  function track(name){ if(window.gtag) gtag("event", name); }

  // e.g. "day2_c" for problem C on day2.html
  function where(el){
    var day = (location.pathname.match(/day\d+/) || ["page"])[0];
    var sec = el.closest("section.problem");
    return day + "_" + (sec ? sec.id.toLowerCase() : "page");
  }

  document.querySelectorAll("[data-track]").forEach(function(el){
    el.addEventListener("click", function(){ track(el.getAttribute("data-track")); });
  });

  // Solution reveal/hide
  document.querySelectorAll(".reveal-btn").forEach(function(btn){
    var body = document.getElementById(btn.getAttribute("data-target"));
    if(!body) return;
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function(){
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      body.hidden = open;
      btn.querySelector(".label").textContent = open ? "Show solution" : "Hide solution";
      if(!open) track("show_solution_" + where(btn));
    });
  });

  // Copy-to-clipboard on code blocks
  document.querySelectorAll(".copy-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      track("copy_code_" + where(btn));
      var pre = btn.closest(".code-wrap").querySelector("pre.code");
      var text = pre.textContent;
      var done = function(){
        var old = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(function(){ btn.textContent = old; btn.classList.remove("copied"); }, 1400);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done, function(){});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch(e){}
        document.body.removeChild(ta);
      }
    });
  });
})();
