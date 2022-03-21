import {Router} from 'express'

import * as taskCtrl from '../controllers/task.controllers'

const router = Router();

//POST createTask
router.post('/', taskCtrl.createTask);

// GET findAllTask
router.get('/', taskCtrl.findAllTask);

// GET findAllDoneTask
router.get('/done', taskCtrl.findAllDoneTask);

// GET findOneTask
router.get('/:id', taskCtrl.findOneTask);

// DELETE deleteTask
router.delete('/:id', taskCtrl.deleteTask);

// PUT upDateTask
router.put('/:id', taskCtrl.upDateTask);


export default router;