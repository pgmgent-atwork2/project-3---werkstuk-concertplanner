const $app = new PIXI.Application({
    backgroundColor: 0xffc0cb,
  });

  if ($app.classList) {
    $app.classList.add('pixi-frame');
  } else {
    // Handle the case when $app.classList is not available
    console.error("$app.classList is undefined");
  }
  
  const blokContainer = document.getElementById("canvas");
 
  blokContainer.addEventListener("mouseleave", () => {
    $app.stage.off("pointermove", onDragMove);
    onDragEnd();
  });
  
  const dragTarget = null;
  const isDragging = false;
  
  $app.stage.hitArea = $app.screen;
  $app.stage.on("pointerup", onDragEnd);
  $app.stage.on("pointerUpOutside", onDragEnd);
  
  blokContainer.addEventListener("mouseenter", () => {
    $app.stage.on("pointermove", onDragMove);
  });
  
  blokContainer.addEventListener("mouseleave", () => {
    $app.stage.off("pointermove", onDragMove);
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
      const maxX = $app.view.width - dragTarget.width / 2;
      const minY = dragTarget.height / 2;
      const maxY = $app.view.height - dragTarget.height / 2;
  
      dragTarget.x = Math.max(minX, Math.min(maxX, newPositionX));
      dragTarget.y = Math.max(minY, Math.min(maxY, newPositionY));
    }
  }
  
  function onDragStart(event) {
    this.alpha = 0.5;
    dragTarget = this;
    $app.stage.on("pointermove", onDragMove);
    isDragging = true; // Set isDragging to true when dragging starts
  }
  
  function onDragEnd() {
    if (dragTarget) {
      $app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
      isDragging = false; // Set isDragging to false when dragging ends
    }
  }
  
  blokContainer.addEventListener("click", clickHandler);

  // Select list items
  // loop through all list items
  // Add eventlistener to each list item
  // When clicked, get unique info from the element. 
  // add element to pixi canvas (app.stage.addChild)

  