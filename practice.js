(function(){
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
    });
  });

  // Copy-to-clipboard on code blocks
  document.querySelectorAll(".copy-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
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
