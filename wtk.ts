namespace SpriteKind {
    //% isKind
    export const Widget = SpriteKind.create();
}

namespace wtk {
    export class Widget extends Sprite {
        protected _parent: Widget | null;
        protected _children: Widget[];

        public constructor() {
            super(img`.`);
            this.setKind(SpriteKind.Widget);
            this._parent = null;
            this._children = [];
        }

        public addChild(w: Widget): boolean {
            if (this._children.indexOf(w) === -1) {
                if (w._parent != null && !w._parent.removeChild(w)) {
                    return false;
                }
                w._parent = this;
                this._children.push(w);
                return true;
            } else {
                return false;
            }
        }

        public addChildren(ws: Widget[]): boolean {
            let success = true;
            ws.forEach((w: Widget) => {
                if (!this.addChild(w)) {
                    success = false;
                }
            })
            return success;
        }

        public removeChild(w: Widget): boolean {
            w._parent = null;
            return this._children.removeElement(w);
        }

        public removeChildren(ws: Widget[]): boolean {
            let success = true;
            ws.forEach((w: Widget) => {
                if (!this.removeChild(w)) {
                    success = false;
                }
            })
            return success;
        }

        public getChildren(): Widget[] {
            return this._children;
        }

        public destroy(effect?: effects.ParticleEffect, duration?: number): void {
            super.destroy(effect, duration);
            this._children.forEach((w: Widget) => {
                w.destroy(effect, duration);
            })
        }
    }
}
