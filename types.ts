
export enum AppView {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  TITLE_GEN = 'title-gen',
  TAG_GEN = 'tag-gen',
  DESC_GEN = 'desc-gen',
  CONTENT_GEN = 'content-gen',
  KEYWORD_RESEARCH = 'keyword-research',
  TEXT_VIDEO = 'text-video',
  VOICEOVER = 'voiceover',
  PRICING = 'pricing',
  LOGIN = 'login',
  SIGNUP = 'signup'
}

export interface User {
  name: string;
  email: string;
  isPro: boolean;
}

export interface AdProps {
  type: 'banner' | 'sidebar' | 'inline';
  provider?: 'admob' | 'adsterra' | 'monetag';
}
