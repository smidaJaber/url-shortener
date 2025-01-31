import express from 'express';
import { shortenUrl, redirectUrl, checkCustomShortCode, getRecentUrls } from '../controllers/urlController';
import rateLimiter from '../middlewares/rateLimiter'; 
const router = express.Router();

// POST /shorten
router.post('/shorten', rateLimiter, async (req, res)=> { await shortenUrl(req,res) });

// GET /:shortCode
router.get('/:shortCode', async(req,res)=>{ await redirectUrl(req,res) });

// GET /check/:customShortCode
router.get('/check/:customShortCode', async(req,res)=>{ await checkCustomShortCode(req,res) });

// GET /recent/:userId
router.get('/recent/:userID', async(req, res)=>{ await getRecentUrls(req,res)})

export default router;