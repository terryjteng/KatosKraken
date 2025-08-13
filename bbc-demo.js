// bbc-demo.js — Simple playable prototype for Big Boss Cleanup (portfolio demo)
(() => {
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const canvas = document.getElementById("bbc-demo-canvas");
  if (!canvas) return;

  const g = canvas.getContext("2d");
  const hudScore = document.getElementById("demoScore");
  const hudTime  = document.getElementById("demoTime");
  const hudTool  = document.getElementById("demoTool");
  const btnStart = document.getElementById("demoStart");
  const btnNew   = document.getElementById("demoNew");
  const btnTool  = document.getElementById("demoToolBtn");

  let running = false, last = 0, time = 60, score = 0, tool = "Mop";
  let mess = [], particles = [];
  const player = { x: 400, y: 220, r: 12, speed: 300, vx: 0, vy: 0 };
  const input = { up:false, down:false, left:false, right:false, act:false };

  function resize() {
    const styleW = canvas.clientWidth || canvas.parentElement.clientWidth;
    const styleH = canvas.clientHeight || 420;
    canvas.width = Math.floor(styleW * DPR);
    canvas.height = Math.floor(styleH * DPR);
  }
  const onResize = () => { resize(); draw(); };
  window.addEventListener("resize", onResize);
  resize();

  // --- Input
  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (["arrowup","w"].includes(k)) input.up = true;
    if (["arrowdown","s"].includes(k)) input.down = true;
    if (["arrowleft","a"].includes(k)) input.left = true;
    if (["arrowright","d"].includes(k)) input.right = true;
    if (k === "e") input.act = true;
    if (k === "q") switchTool();
  });
  window.addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    if (["arrowup","w"].includes(k)) input.up = false;
    if (["arrowdown","s"].includes(k)) input.down = false;
    if (["arrowleft","a"].includes(k)) input.left = false;
    if (["arrowright","d"].includes(k)) input.right = false;
    if (k === "e") input.act = false;
  });

  btnTool?.addEventListener("click", switchTool);
  function switchTool(){ 
    tool = tool === "Mop" ? "Broom" : "Mop"; 
    hudTool.textContent = tool; 
  }

  btnStart?.addEventListener("click", () => start(false));
  btnNew?.addEventListener("click", () => start(true));

  function start(newSeed) {
    time = 60; score = 0; hudScore.textContent = "0"; hudTime.textContent = "60";
    tool = "Mop"; hudTool.textContent = tool;
    player.x = canvas.width/2; player.y = canvas.height/2;
    mess = []; particles = [];
    generateLevel(newSeed ? Math.floor(Math.random()*1e9) : 12345);
    if (!running){ running = true; last = performance.now(); requestAnimationFrame(loop); }
  }

  function rng(seed){ let s = seed>>>0; return () => (s = (s*1664525 + 1013904223)>>>0) / 0xffffffff; }

  function generateLevel(seed){
    const r = rng(seed);
    const nTrash = 10 + Math.floor(r()*6);
    const nPuds  = 7 + Math.floor(r()*5);
    const nShard = 6 + Math.floor(r()*5);

    const pad = 40;
    for (let i=0;i<nTrash;i++) mess.push({ type:"trash", x:pad+r()*(canvas.width-pad*2), y:pad+r()*(canvas.height-pad*2) });
    for (let i=0;i<nPuds;i++)  mess.push({ type:"puddle", x:pad+r()*(canvas.width-pad*2), y:pad+r()*(canvas.height-pad*2) });
    for (let i=0;i<nShard;i++) mess.push({ type:"glass", x:pad+r()*(canvas.width-pad*2), y:pad+r()*(canvas.height-pad*2) });
  }

  function loop(ts){
    const dt = Math.min(0.1,(ts-last)/1000); last = ts;
    update(dt);
    draw();
    if (running) requestAnimationFrame(loop);
  }

  function update(dt){
    player.vx = (input.right - input.left) * player.speed;
    player.vy = (input.down - input.up) * player.speed;
    player.x += player.vx * dt;
    player.y += player.vy * dt;

    if (input.act){
      for (let i=mess.length-1;i>=0;i--){
        if (dist(player.x, player.y, mess[i].x, mess[i].y) < player.r + 10){
          if ((tool==="Mop" && mess[i].type==="puddle") ||
              (tool==="Broom" && (mess[i].type==="trash" || mess[i].type==="glass"))){
            mess.splice(i,1);
            score += 10;
            hudScore.textContent = score;
          }
        }
      }
    }

    time -= dt;
    if (time <= 0){ time = 0; running = false; }
    hudTime.textContent = Math.ceil(time);
  }

  function draw(){
    g.clearRect(0,0,canvas.width,canvas.height);
    // Mess
    for (let m of mess){
      if (m.type==="trash"){ g.fillStyle="#8B4513"; g.fillRect(m.x-6, m.y-6, 12, 12); }
      if (m.type==="puddle"){ g.fillStyle="#1E90FF"; g.beginPath(); g.arc(m.x, m.y, 8, 0, Math.PI*2); g.fill(); }
      if (m.type==="glass"){ g.fillStyle="#ADD8E6"; g.beginPath(); g.moveTo(m.x, m.y-6); g.lineTo(m.x+6, m.y+6); g.lineTo(m.x-6, m.y+6); g.closePath(); g.fill(); }
    }
    // Player (janitor)
    drawJanitor(player.x, player.y);
    // Tool icon above head
    drawToolIcon(player.x, player.y - player.r - 20, tool);
  }

  function drawJanitor(x, y){
    g.save();
    g.translate(x, y);
    // Body
    g.fillStyle = "#2b5dad"; // blue overalls
    g.beginPath();
    g.arc(0, 0, player.r, 0, Math.PI*2);
    g.fill();
    // Head
    g.fillStyle = "#f1c27d"; // skin tone
    g.beginPath();
    g.arc(0, -player.r-6, player.r*0.8, 0, Math.PI*2);
    g.fill();
    // Cap
    g.fillStyle = "#333";
    g.beginPath();
    g.arc(0, -player.r-9, player.r*0.8, Math.PI, 0);
    g.fill();
    g.restore();
  }

  function drawToolIcon(x, y, toolType){
    g.save();
    g.translate(x, y);
    if (toolType==="Mop"){
      g.strokeStyle="#aaa"; g.lineWidth=3;
      g.beginPath(); g.moveTo(0, -5); g.lineTo(0, 10); g.stroke();
      g.fillStyle="#ddd";
      g.beginPath(); g.arc(0, 14, 6, 0, Math.PI*2); g.fill();
    } else {
      g.strokeStyle="#aaa"; g.lineWidth=3;
      g.beginPath(); g.moveTo(0, -5); g.lineTo(0, 10); g.stroke();
      g.fillStyle="#deb887";
      g.fillRect(-8, 12, 16, 4);
    }
    g.restore();
  }

  function dist(x1,y1,x2,y2){ 
    const dx=x2-x1, dy=y2-y1; 
    return Math.sqrt(dx*dx+dy*dy); 
  }

})();
