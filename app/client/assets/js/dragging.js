document.addEventListener("DOMContentLoaded", () => {
  const app = new PIXI.Application({
    transparent: true,
    width: 1000,
    height: 500,
  });

  const blokContainer = document.getElementById("canvas");

  // Load the background image
  const backgroundTexture = PIXI.Texture.from("assets/images/podium.jpeg");
  const backgroundSprite = new PIXI.Sprite(backgroundTexture);
  backgroundSprite.width = app.renderer.width;
  backgroundSprite.height = app.renderer.height;
  app.stage.addChild(backgroundSprite);

  // Define grid properties
const gridSize = 20; // Size of each grid cell
const gridColor = 0xCCCCCC; // Color of the grid lines

// Create a graphics object for drawing
const gridGraphics = new PIXI.Graphics();

// Draw vertical grid lines
for (let x = 0; x <= app.renderer.width; x += gridSize) {
  gridGraphics.lineStyle(1, gridColor);
  gridGraphics.moveTo(x, 0);
  gridGraphics.lineTo(x, app.renderer.height);
}

// Draw horizontal grid lines
for (let y = 0; y <= app.renderer.height; y += gridSize) {
  gridGraphics.lineStyle(1, gridColor);
  gridGraphics.moveTo(0, y);
  gridGraphics.lineTo(app.renderer.width, y);
}

// Add the grid to the stage
app.stage.addChild(gridGraphics);

  // Create an array to store the selected list items
  const selectedItems = [];

  // Select list items
  const listItems = document.querySelectorAll("#podiumelementen li img");

  // Function to check for collision between two items
  function makeBounds(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    if (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    ) {
      return true;
    }
    return false;
  }

  // Function to get the bounds of an item
  function getBounds(item) {
    const position = item.getGlobalPosition();
    const bounds = item.getBounds();

    return {
      x: position.x,
      y: position.y,
      width: bounds.width,
      height: bounds.height,
    };
  }

  // Loop through all list items
  listItems.forEach((item) => {
    // Add event listener to each list item
    item.addEventListener("click", () => {
      // Get unique info from the element (modify this part according to your needs)
      const uniqueInfo = item.alt;

      // Create a container for each draggable element
      const container = new PIXI.Container();
      container.position.set(100, 100); // Set the initial position according to your requirements
      container.interactive = true;
      container.buttonMode = true;
      container.cursor = "grab";

      // Create a sprite from the item image
      const sprite = PIXI.Sprite.from(item.src);
      sprite.anchor.set(0.5);
      sprite.width = 50; // Set the width to 100 pixels
      sprite.height = 50; // Set the height to 100 pixels
      container.addChild(sprite);

      // Event listeners for drag functionality
      container
        .on("pointerdown", onDragStart)
        .on("pointerup", onDragEnd)
        .on("pointerupoutside", onDragEnd)
        .on("pointermove", onDragMove);

      app.stage.addChild(container);

      // Add the container to the selectedItems array
      selectedItems.push(container);
    });
  });

  // Append the Pixi canvas to the blokContainer
  blokContainer.appendChild(app.view);

  // Add class to Pixi canvas container
  blokContainer.classList.add("pixi-frame");

  let dragTarget = null;

  app.stage.interactive = true;
  app.stage.hitArea = app.screen;
  app.stage.on("pointerup", onDragEnd);
  app.stage.on("pointerupoutside", onDragEnd);

  function onDragMove(event) {
    if (dragTarget) {
      const newPosition = dragTarget.parent.toLocal(
        event.data.global,
        null,
        dragTarget.position
      );
  
      let collisionDetected = false;
      selectedItems.forEach((item) => {
        if (item !== dragTarget && makeBounds(dragTarget, item)) {
          collisionDetected = true;
          return;
        }
      });
  
      if (!collisionDetected) {
        // Calculate the closest grid position
        const snapX = Math.round(newPosition.x / gridSize) * gridSize;
        const snapY = Math.round(newPosition.y / gridSize) * gridSize;
  
        // Update the position to the snapped position
        dragTarget.position.set(snapX, snapY);
      }
    }
  }
  
  
  function onDragStart(event) {
    this.alpha = 0.5;
    dragTarget = this;
    dragTarget.lastValidPosition = dragTarget.position.clone(); // Store the last valid position
    app.stage.on("pointermove", onDragMove);
    event.stopPropagation();
  
    const bounds = getBounds(this);
    console.log("Bounds:", bounds);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }
});
