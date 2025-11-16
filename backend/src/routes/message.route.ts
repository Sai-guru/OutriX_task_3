import express from 'express';
import { Request, Response } from 'express';

 const router = express.Router();

router.get('/contents',getAllContacts);
// router.get('/chats',getChatPartners);
// router.get('/:id', getMessagesByUserId);
 

// router.post('/send', sendMessage);


 export default router;

