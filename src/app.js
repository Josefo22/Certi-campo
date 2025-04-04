import express from 'express';
import morgan from 'morgan';
import cookieParse from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import registroRuotes from './routes/RegistrosCultivos.routes.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://certicampo.vercel.app'  // Reemplaza esto con tu dominio de Vercel
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParse());

app.use("/api", authRoutes);
app.use("/api", registroRuotes);


export default app;