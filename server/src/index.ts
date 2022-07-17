'use strict';

import * as Hapi from '@hapi/hapi';
import Joi = require('joi');
import {createTil, getAllTil} from './db/helpers';
import {TilCreateItem} from './types';

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Hello World!';
    },
  });

  server.route({
    method: 'GET',
    path: '/tils',
    options: {
      cors: true,
    },
    handler: async () => {
      return getAllTil();
    },
  });

  server.route({
    method: 'POST',
    path: '/til',
    options: {
      cors: true,
      auth: false,
      validate: {
        payload: Joi.object({
          url: Joi.string().required(),
          summary: Joi.string().required(),
        }),
      },
    },
    handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      const payload = request.payload as TilCreateItem;
      return createTil(payload);
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  // process.exit(1);
  throw err;
});

init();
