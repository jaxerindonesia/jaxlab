import type { CompanyInfoDto } from '../models/CompanyInfoDto';
import type { FeatureDto } from '../models/FeatureDto';
import type { StatDto } from '../models/StatDto';
import type { TestimonialDto } from '../models/TestimonialDto';
import { api } from './client';

export async function getCompanyInfo(): Promise<CompanyInfoDto> {
  return await api<CompanyInfoDto>('/api/content/company-info');
}

export async function getTestimonials(): Promise<TestimonialDto[]> {
  return await api<TestimonialDto[]>('/api/content/testimonials');
}

export async function getFeatures(): Promise<FeatureDto[]> {
  return await api<FeatureDto[]>('/api/content/features');
}

export async function getStats(): Promise<StatDto[]> {
  return await api<StatDto[]>('/api/content/stats');
}
