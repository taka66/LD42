import GameObject from "./gameObject";
import * as PIXI from "pixi.js";
import Event from "./event";
import EVENTS from "./events";

const vector = (x, y) => new PIXI.Point(x, y);

export default class Projectile extends GameObject {
  constructor(animatedsprite, x = 0, y = 0, w = 32, h = 32) {
    super(x, y, w, h);
    this.sprite = animatedsprite;
    animatedsprite.loop = true;
    animatedsprite.animationSpeed = 1 / 5;

    animatedsprite.anchor.x = 0.5;
    animatedsprite.anchor.y = 0.5;
    animatedsprite.position = vector(x, y);
    animatedsprite.width = w;
    animatedsprite.height = h;
    animatedsprite.play();
  }

  destroy() {
    this.disabled = true;
    Event.fire(EVENTS.EXPLOSION, { x: this.sprite.x, y: this.sprite.y });
    this.sprite.destroy();
  }

  updatePosition() {
    if (this.disabled) return;
    this.sprite.y -= 20;
    this.y = this.sprite.y;
    if (this.sprite.y < 0 - 40) {
      this.disabled = true;
      this.sprite.destroy();
    }
  }
}
