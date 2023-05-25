document.addEventListener("DOMContentLoaded", () => {
    const app = new PIXI.Application({
      backgroundColor: 0xffc0cb,
    });
  
    const blokContainer = document.getElementById("canvas");
  
    // Create an array to store the selected list items
    const selectedItems = [];
  
    // Select list items
    const listItems = document.querySelectorAll("#podiumelementen li img");
  
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
        dragTarget.parent.toLocal(event.data.global, null, dragTarget.position);
      }
    }
  
    function onDragStart(event) {
      this.alpha = 0.5;
      dragTarget = this;
      app.stage.on("pointermove", onDragMove);
      event.stopPropagation();
    }
  
    function onDragEnd() {
      if (dragTarget) {
        app.stage.off("pointermove", onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
      }
    }
  });
  
  

// Select list items
// loop through all list items
// Add eventlistener to each list item
// When clicked, get unique info from the element.
// add element to pixi canvas (app.stage.addChild)
