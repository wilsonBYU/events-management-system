const { ObjectId } = require("mongodb")
const DbClient = require("../models/database")
const db = new DbClient()

const eventController = {}

eventController.getAll = async (req, res) => {
  /*
    #swagger.description = 'Returns all the events available in the database'
    #swagger.responses[200] = { description: 'All the events retrieved successfully' }
    #swagger.responses[404] = { description: 'No events found in the database' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.get("events")
    if (result.length > 0) res.status(200).json(result)
    else res.status(404).json({error: "no data found"})
  } catch(e){
    throw({code: 500, message: e.message})
  }
}

eventController.get = async (req, res) => {
  /*
    #swagger.description = 'Returns an event with the given ID'
    #swagger.responses[200] = { description: 'Events with the given id retrieved successfully' }
    #swagger.responses[404] = { description: 'Events with the given id not found' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.get("events", {_id: new ObjectId(req.params.event_id)})
    if (result.length > 0 ) res.status(200).json(result)
    else res.status(404).json({error: "no event found with the given ID"})
  } catch(e) {
    throw({code: 500, message: e.message})
  }
}

eventController.create = async (req, res) => {
  /*
    #swagger.description = 'Insert a new event into the database' 
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Json containing event data',
      schema: {
        "eventId": "event127",
        "name": "Tech Conference 2024",
        "description": "A conference about the latest in tech.",
        "date": "2024-12-01T10:00:00Z",
        "location": "Convention Center",
        "organizerId": "organizer456",
        "capacity": 500,
        "attendees": [],
        "createdAt": "2024-11-01T12:00:00Z",
        "updatedAt": "2024-11-10T15:00:00Z"
      }
    } 
    #swagger.responses[200] = { description: 'Event created succesfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' } 
  */
  try {
    const result = await db.post("events", req.body)
    res.status(200).json(result)
  } catch(e){
    throw({code: 500, message: e.message})
  }
}

eventController.update = async (req, res) => {
    /*
      #swagger.description = 'Update the event with the given id'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Body with modified fields',
        schema: {
          "capacity": 151,
          "location": "Convention Center 3"
        }
      } 
      #swagger.responses[204] = { description: 'Events with the given id updated successfully' }
      #swagger.responses[500] = { description: 'Internal server error (databse or node)' }  
    */
  try {
    const result = await db.put("events", {_id: new ObjectId(req.params.event_id)}, {$set: req.body})
    res.status(204).json(result)
  } catch(e) {
    throw({code: 500, message: e.message})
  }
}

eventController.delete = async (req, res) => {
  /*
    #swagger.description = 'Delete the event with the given id'
    #swagger.responses[204] = { description: 'Event with the given id deleted successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.delete("events", {_id: new ObjectId(req.params.event_id)})
    res.status(204).json(result)
  } catch(e) {
    throw({code: 500, message: e.message})
  }
}

eventController.getAttendees = async (req, res) => {
  try {
    const event = await db.get("events", { _id: new ObjectId(req.params.event_id)})
    const result = await db.get("attendees", { eventId: event[0].eventId })
    res.status(200).json(result)
  } catch (e) {
    throw({code: 500, message: e.message});
  }
}

module.exports = eventController
