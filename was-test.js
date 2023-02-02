reearth.ui.show(`
  <style>
    body {
      margin: 0;
    }
    #wrapper {
      background: #232226;
      height: 100%;
      color: white;
      border: 3px dotted red;
      border-radius: 5px;
      padding: 20px 0;
    }
  </style>
  <div id="wrapper">
    <h2 style="text-align: center; margin: 0;">Hello World</h2>
    <button id="close-btn">close</button>
    <br/>
    <input id="moveTo-input" value="outer|center|top">
    <button id="moveTo-btn">moveTo</button>
  </div>
  <script>
    const close = document.getElementById("close-btn");
    close.addEventListener("click", () => {
      parent.postMessage({ type: "close" }, "*");
    });

    const moveTo = document.getElementById("moveTo-btn");
    moveTo.addEventListener("click", () => {
      const input = document.getElementById("moveTo-input").value;
      const tmp = input.split("|");
      const position = { zone: tmp[0] ?? "outer", section: tmp[1] ?? "center", area: tmp[2] ?? "top" }
      parent.postMessage({ type: "moveTo", position }, "*");
    });
  </script>
`);

reearth.on("message", (msg) => {
  switch (msg.type) {
    case "close": {
      reearth.ui.close();
    }
    case "moveTo": {
      reearth.widget.moveTo(msg.position);
    }
  }
});
