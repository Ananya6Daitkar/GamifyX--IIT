import express from 'express';
import { config } from 'dotenv';
config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Metrics endpoint
app.get('/metrics', (_req, res) => {
    res.json({ message: 'Metrics endpoint' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
export default app;
//# sourceMappingURL=index.js.map