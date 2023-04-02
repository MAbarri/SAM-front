import { Injectable } from "@angular/core";
import {
    animate,
    style,
    transition,
    trigger,
    keyframes
} from "@angular/animations";

const shaker = (amount: number) => {
    const shake = (function* shaker() {
        while (true) {
            yield 0;
            yield -10;
            yield 0;
            yield 10;
        }
    })();
    return new Array(amount).fill(0).map(() =>
        style({
            transform: `translateX(${shake.next().value}px)`
        })
    );
};

export const shake = trigger("shake", [
    transition("false => true", [
        animate("{{shakeDuration}}s linear", keyframes(shaker(7)))
    ])
]);

@Injectable({
    providedIn: "root"
})
export class ShakeService {
    isShaking = false;
    shakeDuration = 0.3;

    toggle() {
        if (this.isShaking) return;
        this.isShaking = true;
        setTimeout(() => {
            this.isShaking = false;
        }, this.shakeDuration * 1000);
    }

    public get animation() {
        return {
            value: this.isShaking,
            params: { shakeDuration: this.shakeDuration }
        };
    }
}