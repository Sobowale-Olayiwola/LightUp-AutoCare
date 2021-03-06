/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 * */

const router = require('express').Router();
const { handle404, handleError, setupRequest, processResponse } = require('../middlewares/http');

/** Route Handlers */
const clientRouteHandler = require('./client');
const vehicleRouteHandler = require('./vehicle');
const quoteRouteHandler = require('./quote');
const sampleRouteHandler = require('./sample'),
    invoiceRouteHandler = require('./invoice'),
    staffRouteHandler = require('./staff'),
    personalisedServiceRouteHandler = require('./personalisedService');

/** Cross Origin Handling */
router.use(setupRequest);
router.use('/samples', sampleRouteHandler);
router.use('/clients', clientRouteHandler);
router.use('/vehicles', vehicleRouteHandler);
router.use('/quotes', quoteRouteHandler);
router.use('/invoices', invoiceRouteHandler);
router.use('/staffs', staffRouteHandler);
router.use('/personalisedServices', personalisedServiceRouteHandler);
router.use(processResponse);

/** Static Routes */
router.use('/image/:imageName', () => {});

router.use(handle404);
router.use(handleError);

module.exports = router;
