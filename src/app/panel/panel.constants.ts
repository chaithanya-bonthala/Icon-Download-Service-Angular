export interface IPanelConfig {
  hasOverlay: boolean;
  headerContainerClass: string;
  bodyContainerClass: string;
}

export const DEFAULTCONFIG: IPanelConfig = {
  hasOverlay: true,
  headerContainerClass: '',
  bodyContainerClass: ''
}
