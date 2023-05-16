const app = new PIXI.Application({
    backgroundColor: 0xffc0cb
});
const blokContainer = document.getElementById('blok');
blokContainer.appendChild(app.view);

const pianoImage = document.getElementById('piano');

const texture = PIXI.Texture.from(pianoImage);

texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

createPiano(
    200, // x position in pixels
    500, // y position in pixels
    150, // width in pixels
    160 // height in pixels
);


function createPiano(x, y, widthPixels, heightPixels) {
    const piano = new PIXI.Sprite(texture);
    piano.interactive = true;
    piano.cursor = 'pointer';
    piano.anchor.set(0.5);

    piano.width = widthPixels;
    piano.height = heightPixels;

    piano.on('pointerdown', onDragStart);

    piano.x = x;
    piano.y = y;

    app.stage.addChild(piano);
}

let dragTarget = null;

app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

blokContainer.addEventListener('mouseenter', () => {
  app.stage.on('pointermove', onDragMove);
});

blokContainer.addEventListener('mouseleave', () => {
  app.stage.off('pointermove', onDragMove);
  if (isDragging) {
    onDragEnd();
  }
});

function onDragMove(event) {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    
    const newPositionX = dragTarget.x + event.data.originalEvent.movementX;
    const newPositionY = dragTarget.y + event.data.originalEvent.movementY;

    const minX = dragTarget.width / 2;
    const maxX = app.view.width - dragTarget.width / 2;
    const minY = dragTarget.height / 2;
    const maxY = app.view.height - dragTarget.height / 2;

    dragTarget.x = Math.max(minX, Math.min(maxX, newPositionX));
    dragTarget.y = Math.max(minY, Math.min(maxY, newPositionY));

}

function onDragStart(event) {
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}