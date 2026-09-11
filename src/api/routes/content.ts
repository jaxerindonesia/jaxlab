import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const router = Router();

router.get('/company-info', async (_req, res) => {
  const row = await prisma.companyInfo.findFirst({ orderBy: { id: 'asc' } });
  if (!row) return res.status(404).json({ error: 'company info not found' });

  const socialMedia = (row.socialMedia ?? {}) as {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };

  res.json({
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp,
    address: row.address,
    mapsEmbed: row.mapsEmbed,
    socialMedia: {
      instagram: socialMedia.instagram ?? '',
      facebook: socialMedia.facebook ?? '',
      tiktok: socialMedia.tiktok ?? '',
      youtube: socialMedia.youtube ?? '',
    },
    workingHours: row.workingHours,
  });
});

router.get('/testimonials', async (_req, res) => {
  const rows = await prisma.testimonial.findMany({ orderBy: { id: 'asc' } });
  res.json(rows.map((r) => ({ id: r.id, name: r.name, role: r.role, quote: r.quote, image: r.image, rating: r.rating })));
});

router.get('/features', async (_req, res) => {
  const rows = await prisma.feature.findMany({ orderBy: { id: 'asc' } });
  res.json(rows.map((r) => ({ id: r.id, icon: r.icon, title: r.title, description: r.description })));
});

router.get('/stats', async (_req, res) => {
  const rows = await prisma.stat.findMany({ orderBy: { id: 'asc' } });
  res.json(rows.map((r) => ({ id: r.id, value: r.value, label: r.label })));
});
