export interface CompanyInfoDto {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapsEmbed: string;
  socialMedia: { instagram: string; facebook: string; tiktok: string; youtube: string };
  workingHours: string;
}
