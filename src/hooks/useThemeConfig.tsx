import { useContext } from "react";
import { css } from "@emotion/css";
import { AuctionHouseHooksContext } from "../context/AuctionHouseHooksContext";
import { Theme, Strings } from "../constants";

type ThemeType = typeof Theme;

export function useThemeConfig() {
  const mediaContext = useContext(AuctionHouseHooksContext);

  const getStyles = (themeKey: keyof ThemeType): any => {
    if (!(themeKey in mediaContext.theme)) {
      throw new Error(
        `"${String(themeKey)}" not found in [${Object.keys(
          mediaContext.theme
        ).join(", ")}]`
      );
    }
    const styles = mediaContext.theme[themeKey];
    return {
      className: `zora--auction-house-${themeKey} ${css(styles)}`,
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    return mediaContext.strings[stringName];
  };

  return { getString, getStyles };
}
