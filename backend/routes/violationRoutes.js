const express = require('express');
const verifyToken = require('../middlewares/tokenVerification');
const { violationSend, getViolations, editViolations, deleteViolations, violationConfirm, violationDeny } = require('../controllers/violationController')

const router = express.Router();

router.get('/:phoneNumber', getViolations);
router.post('/send', violationSend);
router.patch('/:violationId', editViolations)
router.delete('/:violationId', deleteViolations)


module.exports = router;