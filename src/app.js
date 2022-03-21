import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import tasktroutes from './routes/TasktRoutes';

const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
const corsOptions = {};
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//routes
app.get('/', (req, res) => {
    res.json({ messge: 'welcome ta ay aplication' });
});

app.use('/api/tasks', tasktroutes);

export default app;