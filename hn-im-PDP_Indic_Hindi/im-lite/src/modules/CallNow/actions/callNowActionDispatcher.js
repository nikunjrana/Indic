import { imStore } from "../../../store/imStore";

export const callNowActionDispatcher = (displayStatus, callProps) => {
  displayStatus
    ? imStore.dispatch({ type: "DISPLAY_CALLNOW", callProps })
    : imStore.dispatch({ type: "HIDE_CALLNOW" });
};
