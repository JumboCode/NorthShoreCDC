import {
  Platform,
  Dimensions
} from "react-native";

function isIOS() {
  return Platform.OS === "ios";
}

function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export { isIOS, isIphoneX };
