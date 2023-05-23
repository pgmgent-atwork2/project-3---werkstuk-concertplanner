const app = new PIXI.Application({
    backgroundColor: 0xffc0cb,
  });
  const blokContainer = document.getElementById("canvas");
  blokContainer.appendChild(app.view);
  
  let texture; // Variabele voor de PIXI-textuur
  
  const clickHandler = (event) => {
    const itemImage = document.getElementById("stoel"); // Verander "item" naar de ID van je HTML-afbeelding
  
    texture = PIXI.Texture.from(itemImage);
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  
    const itemWidth = 150; // Breedte van het item in pixels
    const itemHeight = 160; // Hoogte van het item in pixels
  
    const canvasBounds = app.view.getBoundingClientRect();
    const canvasOffsetX = canvasBounds.left;
    const canvasOffsetY = canvasBounds.top;
  
    const clickX = event.clientX - canvasOffsetX;
    const clickY = event.clientY - canvasOffsetY;
  
    spawnItem(clickX, clickY, itemWidth, itemHeight);
  };
  
  function spawnItem(x, y, widthPixels, heightPixels) {
    const item = new PIXI.Sprite(texture);
    item.interactive = true;
    item.cursor = "pointer";
    item.anchor.set(0.5);
  
    item.width = widthPixels;
    item.height = heightPixels;
  
    item.on("pointerdown", onDragStart, item);
  
    item.x = x;
    item.y = y;
  
    app.stage.addChild(item);
  }
  
  blokContainer.addEventListener("mouseleave", () => {
    app.stage.off("pointermove", onDragMove);
    onDragEnd();
  });
  
  let dragTarget = null;
  let isDragging = false;
  
  app.stage.hitArea = app.screen;
  app.stage.on("pointerup", onDragEnd);
  app.stage.on("pointerupoutside", onDragEnd);
  
  blokContainer.addEventListener("mouseenter", () => {
    app.stage.on("pointermove", onDragMove);
  });
  
  blokContainer.addEventListener("mouseleave", () => {
    app.stage.off("pointermove", onDragMove);
    if (isDragging) {
      onDragEnd();
    }
  });
  
  function onDragMove(event) {
    if (dragTarget) {
      dragTarget.parent.toLocal(event.data.global, null, dragTarget.position);
  
      const newPositionX = dragTarget.x + event.data.originalEvent.movementX;
      const newPositionY = dragTarget.y + event.data.originalEvent.movementY;
  
      const minX = dragTarget.width / 2;
      const maxX = app.view.width - dragTarget.width / 2;
      const minY = dragTarget.height / 2;
      const maxY = app.view.height - dragTarget.height / 2;
  
      dragTarget.x = Math.max(minX, Math.min(maxX, newPositionX));
      dragTarget.y = Math.max(minY, Math.min(maxY, newPositionY));
    }
  }
  
  function onDragStart(event) {
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on("pointermove", onDragMove);
    isDragging = true; // Set isDragging to true when dragging starts
  }
  
  function onDragEnd() {
    if (dragTarget) {
      app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
      isDragging = false; // Set isDragging to false when dragging ends
    }
  }
  
  blokContainer.addEventListener("click", clickHandler);