import { useThemeConfig } from "../hooks/useThemeConfig";

export const Button = ({ showPending, disabled, ...props }: any) => {
  const { getStyles } = useThemeConfig();

  return (
    <button {...props} disabled={disabled} {...getStyles("actionButton")}>
      props.children
    </button>
  );
};
