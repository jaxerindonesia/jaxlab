import cors from 'cors';
import express from 'express';
import { router as adminRouter } from './routes/admin';
import { router as badgesRouter } from './routes/badges';
import { router as categoriesRouter } from './routes/categories';
import { router as contentRouter } from './routes/content';
import { router as healthRouter } from './routes/health';
import { router as membersRouter } from './routes/members';
import { router as ordersRouter } from './routes/orders';
import { router as productsRouter } from './routes/products';
import { router as shippingRouter } from './routes/shipping';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/health', healthRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/badges', badgesRouter);
app.use('/api/products', productsRouter);
app.use('/api/members', membersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/content', contentRouter);
app.use('/api/shipping', shippingRouter);

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`[jaxlab] api listening on http://localhost:${port}`);
});
