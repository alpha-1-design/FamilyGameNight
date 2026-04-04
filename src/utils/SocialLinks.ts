export interface SocialLinks {
  website?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

export class SOCIAL_LINKS {
  static links: SocialLinks = {
    website: 'https://alpha1studio.vercel.app/',
    twitter: '',
    instagram: '',
    tiktok: '',
    youtube: ''
  };

  static setLinks(links: SocialLinks) {
    this.links = { ...this.links, ...links };
    localStorage.setItem('fgn_social_links', JSON.stringify(this.links));
  }

  static loadLinks() {
    const stored = localStorage.getItem('fgn_social_links');
    if (stored) {
      this.links = JSON.parse(stored);
    }
    return this.links;
  }

  static hasWebsite(): boolean {
    return !!this.links.website;
  }
}
