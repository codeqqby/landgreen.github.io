const setup0 = function() {
  var canvas = document.getElementById("charge0");
  var ctx = canvas.getContext("2d");
  ctx.font = "300 30px Roboto";

  ctx.fillStyle = "#aaa";
  ctx.textAlign = "center";
  ctx.fillText("click to start simulation", canvas.width / 2, canvas.height / 2);
};
setup0();

function charges0(el) {
  el.onclick = null; //stops the function from running on button click
  Charge.setCanvas(el);

  //___________________get mouse input___________________
  var mouse = {
    down: false,
    x: 0,
    y: 0
  };
  canvas.onmousemove = function(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  canvas.onmousedown = function() {
    mouse.down = true;
    Charge.repulse(q, mouse);
  };
  canvas.onmouseup = function() {
    mouse.down = false;
  };
  let pause = false;
  el.addEventListener("mouseleave", function() {
    pause = true;
  });
  el.addEventListener("mouseenter", function() {
    pause = false;
    Charge.setCanvas(el);
    if (!pause) requestAnimationFrame(cycle);
  });

  //switch between draw modes
  let drawMode = 1;
  document.addEventListener("keypress", event => {
    if (!pause) {
      if (event.charCode === 49) {
        drawMode = 1; //particle
        el.style.background = "#fff";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (event.charCode === 50) {
        drawMode = 2; //particles + electric vector field
        el.style.background = "#fff";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (event.charCode === 51) {
        drawMode = 3; //electric potential scalar field
        el.style.background = "#fff";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (event.charCode === 52) {
        drawMode = 4; //cloud chamber
        el.style.background = "#000";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  });

  // el.addEventListener("keypress", event => {
  //   if (!pause) {
  //     if (e.keyCode === 49) {
  //       drawMode = 1; //particle
  //       el.style.background = "#fff";
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     } else if (e.keyCode === 50) {
  //       drawMode = 2; //particles + electric vector field
  //       el.style.background = "#fff";
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     } else if (e.keyCode === 51) {
  //       drawMode = 3; //electric potential scalar field
  //       el.style.background = "#fff";
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     } else if (e.keyCode === 52) {
  //       drawMode = 4; //cloud chamber
  //       el.style.background = "#000";
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     }
  //   }
  // });

  const q = []; //holds the charges
  //spawn p before e to avoid a bug in the class method allPhysics
  Charge.spawnCharges(q, 25, "p");
  Charge.spawnCharges(q, 25, "e");

  function cycle() {
    Charge.physicsAll(q);

    //choose a draw mode
    if (drawMode === 1) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Charge.drawAll(q);
    } else if (drawMode === 2) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Charge.vectorField(q);
      ctx.globalAlpha = 0.5;
      Charge.drawAll(q);
      ctx.globalAlpha = 1;
    } else if (drawMode === 3) {
      Charge.scalarField(q);
    } else if (drawMode === 4) {
      Charge.drawCloudChamber(q);
    }

    Charge.bounds(q);
    if (!pause) requestAnimationFrame(cycle);
  }
  requestAnimationFrame(cycle);
}