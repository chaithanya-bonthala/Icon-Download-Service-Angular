export interface IPanelConfig {
  hasOverlay: boolean;
  dismissWithCloseIcon: boolean;
  headerContainerClass: string;
  bodyContainerClass: string;
}

export const DEFAULTCONFIG: IPanelConfig = {
  hasOverlay: true,
  dismissWithCloseIcon: true,
  headerContainerClass: '',
  bodyContainerClass:''
}
