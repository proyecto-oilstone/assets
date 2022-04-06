const { Event, Cars } = require("../../../../db/index");
const { eventTypes } = require("../../../../utils/constants");
const getFiles = require("../files_services/getFiles");

/**
 * Format the event with the type of the event.
 * @param {Event} event to format
 * @returns {Event} with the type
 * @returns {false} if the {event} has no type (invalid event)
 */
const formatEventWithTypeEvent = event => {
  let eventWithType = {};

  Event.childrenModels.forEach(model => {
    if (event[model.name] !== null && "dataValues" in event[model.name]) {
      eventWithType = { ...event[model.name].dataValues };
      eventWithType.type = model.type;
      eventWithType.carId = event.carId;
      eventWithType.createdAt = event.createdAt;
      eventWithType.updatedAt = event.updatedAt;
      eventWithType.kilometres = event.kilometres;
      eventWithType.car = event.Car;
    }
  });

  return Object.keys(eventWithType).length !== 0 ? eventWithType : false;
};

/**
 * Get all attributes of the model
 * @param {Model} modelEvent @Model of @Event
 * @returns {Array} with all attributes of the model
 */
const getAttributes = (modelEvent) => {
  return Object.keys(modelEvent.rawAttributes);
}

/**
 * Get all attributes of the model (same as getAttributes but without BLOB fields)
 * @param {Model} modelEvent @Model of @Event
 * @returns {Array} with all attributes of the model (without the fields of type BLOB)
 */
const getAttributesWithoutBlobFields = (modelEvent) => {
  const modelAttributes = Object.keys(modelEvent.rawAttributes);
  const withoutBlobField = (attribute) => modelEvent.rawAttributes[attribute].type.key !== "BLOB";
  return modelAttributes.filter(withoutBlobField);
}

/**
 * Get the model events without the field of type BLOB that has binary data of events with files
 * @param {EventModel} eventModel
 * @return {EventModel} 
 */
const getChildrenEventModelsWithoutBlobFields = (eventModel) => {
  return eventModel.childrenModels.map(
    model => {
      const childrenEvent = { model, attributes: getAttributesWithoutBlobFields(model), };
      if (model.include !== undefined) {
        childrenEvent.include = getRelationatedIncludes(model);
      }
      return childrenEvent;
    }
  );
}

const getRelationatedIncludes = (model, maxRelations = 5) => {
  if (maxRelations <= 0) return undefined;
  const toReturn = [];
  model.include.forEach(model => {
    const childrenEvent = { model };
    if (model.include) {
      childrenEvent.include = getRelationatedIncludes(model, maxRelations-1);
    }
    toReturn.push(childrenEvent);
  });
  return toReturn;
}

/**
 * Get the last kilometres uploaded to one car in one event, if no has any event then returns 0
 * @param {Number} carId 
 * @returns {Number}
 */
const getLastKilometresUploaded = async (carId) => {
  const lastKilometresUploaded = await Event.max('kilometres', { where: { carId } });
  return lastKilometresUploaded !== null ? lastKilometresUploaded : 0;
}

/**
 * Return true if the {kilometres} are valid. Kilometres are valid if are higher to the last kilometers uploaded
 * @param {Number} carId 
 * @param {Number} kilometres 
 * @returns {Boolean}
 */
const isValidKilometres = async (carId, kilometres) => {
  if (kilometres === null || kilometres === undefined || kilometres < 0) return false;
  const lastKilometres = await getLastKilometresUploaded(carId);
  return lastKilometres <= kilometres;
}

module.exports = {
  /**
   * Get any @Event by id
   * @param {Number} id 
   * @returns @Event
   */
  getEventDetail: async (id) => {
    let query = {
      where: {
        id,
      },
      attributes: ["id", "type", "kilometres", "createdAt", "updatedAt", "carId"],
      include: Event.childrenModels
    };
    
    const event = await Event.findOne(query);

    return event ? formatEventWithTypeEvent(event) : null;
  },

  /**
   * Get all @Event of one @Cars
   * @param {Number} carId 
   * @returns {Array} of @Event
   */
  getEventsByCarId: async (carId) => {
    let query = {
      where: {
        carId,
      },
      attributes: ["id", "type", "kilometres", "createdAt", "updatedAt", "carId"],
      include: [
        ...getChildrenEventModelsWithoutBlobFields(Event),
        Cars,
      ]
    };
    
    let events = await Event.findAll(query);
    const removeInvalidEvents = event => event;
    events = events.map(formatEventWithTypeEvent);
    events = events.filter(removeInvalidEvents);
    return events;
  },

  /**
   * 
   * @param {Event} event with all attributes of one @Event and the attributes of the type of the event
   * @param {Model} eventModel @Model of @Event
   * @returns {Event} created
   * @returns {String} message if an error occurs
   */
  postEvent: async (event, eventModel) => {
    const type = eventModel.type;
    const additionalAttributes = getAttributes(eventModel);
    event.kilometres = parseInt(event.kilometres);
    event.kilometres = await isValidKilometres(event.carId, event.kilometres) ? event.kilometres : await getLastKilometresUploaded(event.carId);

    const params = {
      Event: {
        type: eventTypes[type],
        kilometres: event.kilometres,
        carId: event.carId,
      }
    };

    additionalAttributes.forEach(field => {
      params[field] = event[field];
    });

    try {
      const eventCreated = await eventModel.create(params, { include: [Event] });

      const event = {
        id: eventCreated.id,
        type,
        kilometres: eventCreated.Event.kilometres,
        carId: eventCreated.Event.carId,
        createdAt: eventCreated.Event.createdAt,
        updatedAt: eventCreated.Event.updatedAt,
      };

      additionalAttributes.forEach(field => {
        event[field] = eventCreated[field];
      });

      return event;
    } catch (err) {
      return err.message;
    }
  },

  /**
   * Get all events of one type of one car
   * @param {Number} carId 
   * @param {Model} eventModel @Model of @Event
   * @returns {Array} of @Event
   */
  getEventsByCarIdAndEventType: async (carId, eventModel) => {
    const type = eventModel.type;
    const additionalAttributes = getAttributesWithoutBlobFields(eventModel);
  
    let query = {
      where: {
        carId,
        type: eventTypes[type],
      },
      attributes: ["id", "kilometres", "createdAt", "updatedAt", "carId"],
      include: [
        {
          model: eventModel,
          attributes: additionalAttributes,
          where: {},
          required: true,
        },
      ]
    };
  
    let events = await Event.findAll(query);
    events = events.map(e => {
      const event = {
        id: e.id,
        type,
        carId: e.carId,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      };
      additionalAttributes.forEach(field => {
        if (field !== 'data') {
          event[field] = e[eventModel.name][field];
        }
      });
      return event;
    })
    
    return events;
  },

  getAllEvents: async () => {
    let query = {
      attributes: ["id", "type", "kilometres", "createdAt", "updatedAt", "carId"],
      include: [
        ...getChildrenEventModelsWithoutBlobFields(Event),
        Cars,
      ]
    };

    let events = await Event.findAll(query);
    const removeInvalidEvents = event => event;
    events = events.map(formatEventWithTypeEvent);
    events = events.filter(removeInvalidEvents);
    let files = await getFiles();
    files = files.filter(file => file.expirationDate !== null);
    files = files.map(file => ({...file, type: "EXPIRATION_FILE"}));
    return [...events, ...files];
  },

  getLastKilometresUploaded,
  isValidKilometres,
};
