import express from 'express';
import morgan from 'morgan';
import cookieParse from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import registroRuotes from './routes/RegistrosCultivos.routes.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://certi-campo.vercel.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: function(origin, callback) {
        // Permitir solicitudes sin origin (como las de Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política CORS para este sitio no permite el acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParse());

// Ruta de health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running' });
});

app.use("/api", authRoutes);
app.use("/api", registroRuotes);

export default app;