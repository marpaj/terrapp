/**
 * Season model events
 */

'use strict';

import {EventEmitter} from 'events';
import Season from './season.model';
import PickupEvent from '../pickupEvent/pickupEvent.model';
import PickupOption from '../pickupOption/pickupOption.model';
import * as PickupEventHelper from '../pickupEvent/pickupEvent.helper';
import _ from 'lodash';

var SeasonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeasonEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Season.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SeasonEvents.emit(event + ':' + doc._id, doc);
    SeasonEvents.emit(event, doc);
  };
}

SeasonEvents.on('save', season => {
  PickupEventHelper.updateForSeason(season);
});


export default SeasonEvents;
