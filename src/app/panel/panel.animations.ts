import { animate, style, transition, trigger } from "@angular/animations";

export const sildeAnimation = trigger("slideAnimation", [
  transition("rightIn => *", [
    style({
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 0.1,
        transform: "translate3d(100%, 0, 0)",
      })
    ),
  ]),
  transition("* => rightIn", [
    style({
      opacity: 0.1,
      transform: "translate3d(100%, 0, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      })
    ),
  ]),
  transition("leftIn => *", [
    style({
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 0.1,
        transform: "translate3d(-100%, 0, 0)",
      })
    ),
  ]),
  transition("* => leftIn", [
    style({
      opacity: 0.1,
      transform: "translate3d(-100%, 0, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      })
    ),
  ]),
  transition("bottomIn => *", [
    style({
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 0.1,
        transform: "translate3d(0, 100%, 0)",
      })
    ),
  ]),
  transition("* => bottomIn", [
    style({
      opacity: 0.1,
      transform: "translate3d(0, 100%, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      })
    ),
  ]),
  transition("topIn => *", [
    style({
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 0.1,
        transform: "translate3d(0, -100%, 0)",
      })
    ),
  ]),
  transition("* => topIn", [
    style({
      opacity: 0.1,
      transform: "translate3d(0, -100%, 0)",
    }),
    animate(
      "400ms ease-in-out",
      style({
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      })
    ),
  ]),
]);
