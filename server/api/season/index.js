'use strict';

var express = require('express');
var controller = require('./season.controller');
import * as auth from '../../auth/auth.service';
/// Load the season events to register them properly
import './season.events';

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);
router.patch('/:id', auth.hasRole('admin'), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//router.delete('/:id/:extraId', auth.hasRole('admin'), controller.removeExtra);

module.exports = router;
