import { Request, Response } from 'express';
import Url from '../models/urlModel';
import shortid from 'shortid';
import { z } from 'zod';

const shortenUrlSchema = z.object({
  longUrl: z.string().url(),
  customShortCode: z.string()
    .optional()
    .refine((code) => !code || code.trim().length > 0, {
      message: 'Custom short code cannot be empty or contain only spaces',
    }),
});

export const shortenUrl = async (req: Request, res: Response) => {
  const { longUrl, customShortCode } = req.body;

  // Validate input
  try {
    shortenUrlSchema.parse({ longUrl, customShortCode });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  try {
    // Check if custom url is already in use
    if (customShortCode) {
      const existingUrl = await Url.findOne({ shortCode: customShortCode });
      if (existingUrl) {
        return res.status(400).json({ message: 'Custom short code already in use' });
      }
    }

    // Generate short code
    const shortCode = customShortCode || shortid.generate();
    const shortUrl = `https://url-shortener-ds5q.onrender.com/${shortCode}`;

    // Save to database
    const url = new Url({
      longUrl,
      shortCode,
      customShortCode: customShortCode || undefined, 
    });
    await url.save();

    res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (url) {
      // Increment click count
      url.clicks += 1;
      await url.save();

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
export const checkCustomShortCode = async (req: Request, res: Response) => {
  const { customShortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode: customShortCode });
    if (url) {
      return res.json({ available: false });
    } else {
      return res.json({ available: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getRecentUrls = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const urls = await Url.find({ userId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(5); 

    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};