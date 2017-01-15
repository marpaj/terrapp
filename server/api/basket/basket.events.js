/**
 * Basket model events
 */

'use strict';

import {EventEmitter} from 'events';
import Basket from './basket.model';
import Season from '../season/season.model';
import PickupEvent from '../pickupEvent/pickupEvent.model';
var BasketEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BasketEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Basket.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BasketEvents.emit(event + ':' + doc._id, doc);
    BasketEvents.emit(event, doc);
  };
}

function recreateAllPickupEvents(basket) {
  /*console.log(basket.execPopulate);
  basket.execPopulate('season')
    .then( populatedBasket => {
      console.log(populatedBasket);
    });*/
}

BasketEvents.on('save', basket => {
  recreateAllPickupEvents(basket);
});

export default BasketEvents;
