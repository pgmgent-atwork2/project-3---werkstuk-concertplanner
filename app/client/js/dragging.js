export const dragging = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const app = new PIXI.Application({
      transparent: true,
      width: 814.7,
      height: 814.7,
    });

    const blokContainer = document.getElementById("canvas");

    // Load the background image
    const backgroundTexture = PIXI.Texture.from("assets/images/podium.jpeg");
    const backgroundSprite = new PIXI.Sprite(backgroundTexture);
    backgroundSprite.width = app.renderer.width;
    backgroundSprite.height = app.renderer.height;
    app.stage.addChild(backgroundSprite);

    // Define grid properties
    const gridSize = 10; // Size of each grid cell
    const gridColor = 0xcccccc; // Color of the grid lines

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
    const listItems = document.querySelectorAll(
      '[data-list-elements="elements"] li'
    );

    function makeBounds(object1, object2) {
      const bounds1 = object1.getChildAt(1).getBounds(); // Exclude the border from bounds
      const bounds2 = object2.getChildAt(1).getBounds(); // Exclude the border from bounds

      if (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y < bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y &&
        object1.data.stackable === object2.data.stackable
      ) {
        return true;
      }
      return false;
    }

    // Function to get the bounds of an item
    function getBounds(item) {
      const position = item.getGlobalPosition();
      const bounds = item.getBounds();

      // Calculate the rotated dimensions
      const width =
        bounds.width * Math.abs(Math.cos(item.rotation)) +
        bounds.height * Math.abs(Math.sin(item.rotation));
      const height =
        bounds.height * Math.abs(Math.cos(item.rotation)) +
        bounds.width * Math.abs(Math.sin(item.rotation));

      return {
        x: position.x - width / 2,
        y: position.y - height / 2,
        width: width,
        height: height,
      };
    }

    // Loop through all list items
    listItems.forEach((item) => {
      // Add event listener to each list item
      item.addEventListener("click", () => {
        const stackable = item.dataset.stackable === "true"; // Check if the item is stackable

        // Create a container for each draggable element
        const container = new PIXI.Container();
        container.position.set(500, 250); // Set the initial position according to your requirements
        container.interactive = true;
        container.buttonMode = true;
        container.cursor = "grab";

        const svg = item.querySelector("svg");

        const svgString = new XMLSerializer().serializeToString(svg);
        const svgDataUrl = `data:image/svg+xml;base64,${window.btoa(
          svgString
        )}`;

        const image = new Image();
        image.src = svgDataUrl;

        image.onload = () => {
          const texture = PIXI.Texture.from(image);

          // Set the sprite properties
          const width = parseFloat(item.dataset.width) || 40; // Use 40 as default if data-width is not set
          const height = parseFloat(item.dataset.height) || 40; // Use 40 as default if data-height is not set

          // Set the sprite properties
          const sprite = new PIXI.Sprite(texture);
          sprite.anchor.set(0.5);
          sprite.width = width * 20; // Multiply the width by 10
          sprite.height = height * 20; // Multiply the height by 10

          // Create a border graphics object
          const border = new PIXI.Graphics();
          border.lineStyle(2, 0xff0000); // Set the border color and thickness
          border.drawRect(
            -sprite.width / 2,
            -sprite.height / 2,
            sprite.width,
            sprite.height
          );

          container.addChild(border); // Add the border to the container
          container.addChild(sprite);
        };

        // Event listeners for drag functionality
        container
          .on("pointerdown", onDragStart)
          .on("pointermove", onDragMove)
          .on("pointerup", onDragEnd)
          .on("pointerupoutside", onDragEnd);

        //Store the stackable attribute in the container's data
        container.data = {
          stackable: stackable,
        };

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
        let neighborDetected = false;
        let overlapDetected = false; // New variable to check for overlap

        for (let i = 0; i < selectedItems.length; i++) {
          const item = selectedItems[i];
          if (item !== dragTarget && makeBounds(dragTarget, item)) {
            collisionDetected = true;
            break; // Exit the loop once a collision is detected
          }
          if (
            item !== dragTarget &&
            item.position.x !== newPosition.x &&
            item.position.y !== newPosition.y &&
            Math.abs(newPosition.x - item.position.x) < gridSize &&
            Math.abs(newPosition.y - item.position.y) < gridSize
          ) {
            neighborDetected = true;
            break; // Exit the loop once a neighboring item is detected
          }
          if (
            item !== dragTarget &&
            makeBounds(dragTarget, item) &&
            (Math.abs(newPosition.x - item.position.x) < gridSize ||
              Math.abs(newPosition.y - item.position.y) < gridSize)
          ) {
            overlapDetected = true;
            break; // Exit the loop once overlap is detected
          }
        }

        if (!collisionDetected && !neighborDetected && !overlapDetected) {
          const snapX = Math.round(newPosition.x / gridSize) * gridSize;
          const snapY = Math.round(newPosition.y / gridSize) * gridSize;

          dragTarget.position.set(snapX, snapY);
          dragTarget.lastValidPosition.copyFrom(dragTarget.position);
        } else {
          dragTarget.position.copyFrom(dragTarget.lastValidPosition);
        }
      }
    }

    function onDragStart(event) {
      this.alpha = 0.5;
      dragTarget = this;
      dragTarget.lastValidPosition = dragTarget.position.clone(); // Store the initial position
      app.stage.on("pointermove", onDragMove);
      event.stopPropagation();

      // Add event listeners for rotation using arrow keys
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
    }

    function onKeyDown(event) {
        if (event.key === "ArrowLeft") {
          // Rotate left
          dragTarget.rotation -= Math.PI / 4; // Rotate by 45 degrees counterclockwise
        } else if (event.key === "ArrowRight") {
          // Rotate right
          dragTarget.rotation += Math.PI / 4; // Rotate by 45 degrees clockwise
        } else if (event.key === "Delete" || event.key === "Backspace" || event.keyCode === 46) {
          // Delete the item
          if (dragTarget) {
            app.stage.removeChild(dragTarget);
            dragTarget = null;
          }
        }
      }
      
      

    function onKeyUp(event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        // Stop rotating
        dragTarget.rotation =
          Math.round(dragTarget.rotation / (Math.PI / 4)) * (Math.PI / 4);
      }
    }

    function onDragEnd() {
      if (dragTarget) {
        app.stage.off("pointermove", onDragMove);
        dragTarget.alpha = 1;

        let collisionDetected = false;
        let closestItem = null;
        let closestDistance = Number.MAX_VALUE;

        for (let i = 0; i < selectedItems.length; i++) {
          const item = selectedItems[i];
          // Check if the dragged item can stack on the current item
          if (
            item !== dragTarget &&
            makeBounds(dragTarget, item) &&
            item.data.stackable
          ) {
            collisionDetected = true;
            const distance = Math.sqrt(
              Math.pow(dragTarget.position.x - item.position.x, 2) +
                Math.pow(dragTarget.position.y - item.position.y, 2)
            );
            if (distance < closestDistance) {
              closestDistance = distance;
              closestItem = item;
            }
          }
        }

        if (collisionDetected) {
          // Calculate the separation vector between the dragged item and the closest item
          const separationVector = new PIXI.Point(
            dragTarget.position.x - closestItem.position.x,
            dragTarget.position.y - closestItem.position.y
          );

          // Normalize the separation vector
          const separationLength = Math.sqrt(
            separationVector.x * separationVector.x +
              separationVector.y * separationVector.y
          );
          separationVector.x /= separationLength;
          separationVector.y /= separationLength;

          // Calculate the offset to move the rotated item away from the collision
          const offset = gridSize * 2; // Adjust the offset as needed

          // Calculate the new position by applying the separation vector and offset
          const newPosition = new PIXI.Point(
            dragTarget.position.x + separationVector.x * offset,
            dragTarget.position.y + separationVector.y * offset
          );

          // Snap the new position to the closest grid position
          const snapX = Math.round(newPosition.x / gridSize) * gridSize;
          const snapY = Math.round(newPosition.y / gridSize) * gridSize;

          // Adjust the snap position based on the rotated dimensions of the items
          const dragBounds = getBounds(dragTarget);
          const closestBounds = getBounds(closestItem);
          const adjustedSnapX =
            snapX + (closestBounds.width - dragBounds.width) / 2;
          const adjustedSnapY =
            snapY + (closestBounds.height - dragBounds.height) / 2;

          // Set the new position for the rotated item
          dragTarget.position.set(adjustedSnapX, adjustedSnapY);

          // Update the last valid position
          dragTarget.lastValidPosition.copyFrom(dragTarget.position);
        } else {
          // Calculate the closest grid position
          const snapX = Math.round(dragTarget.position.x / gridSize) * gridSize;
          const snapY = Math.round(dragTarget.position.y / gridSize) * gridSize;

          // Snap to the closest grid position
          dragTarget.position.set(snapX, snapY);

          // Update the last valid position
          dragTarget.lastValidPosition.copyFrom(dragTarget.position);
          if (!dragTarget.data.stackable) {
            // Remove the dragged item from the stage
            app.stage.removeChild(dragTarget);

            // Add the dragged item back to the stage at the end
            app.stage.addChild(dragTarget);
          }
        }

        dragTarget = null;

        // Remove the rotation event listeners
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      }
    }
  });
};
