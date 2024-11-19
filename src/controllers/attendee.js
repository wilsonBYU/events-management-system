const { ObjectId } = require("mongodb")
const DbClient = require("../models/database")
const db = new DbClient()

const attendeeController = {}

attendeeController.getAll = async (req, res) => {
  /*
    #swagger.description = 'Returns all the attendees available in the database'
    #swagger.responses[200] = { description: 'All the attendees retrieved successfully' }
    #swagger.responses[404] = { description: 'No attendees found in the database' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.get("attendees")
    if (result.isEmpty()) res.status(200).json(result)
    else res.status(404).json({error: "no data found"})
  } catch (e) {
    throw({code: 500, message: e.message})
  }
}

attendeeController.get = async (req, res) => {
  /*
    #swagger.description = 'Returns a single attendee with the given ID'
    #swagger.responses[200] = { description: 'Attendee with the given id retrieval successfully' }
    #swagger.responses[404] = { description: 'Attendee with the given id not found' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.get("attendees", {_id: new ObjectId(req.params.attendee_id)})
    if (result.length > 0) {
      res.status(200).json(result)
    } else {
      res.status(404).json({error: "No attendee was found with the given id"})
    }
  } catch(e) {
    throw({code: 500, message: e.message})
  }
}

attendeeController.create = async (req, res) => {
  /*
    #swagger.description = 'Inserts a new attendee to the database'  
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Json containing attendee data',
      schema:   {
        "attendeeId": "attendee799",
        "name": "Jonathan Davis",
        "email": "john.doe@example.com",
        "phone": "325-456-7890",
        "eventId": "",
        "registrationDate": "2024-11-05T09:00:00Z",
        "checkedIn": false,
        "createdAt": "2024-11-05T09:00:00Z",
        "updatedAt": "2024-11-05T09:00:00Z"
      }
    } 
    #swagger.responses[200] = { description: 'New attendee created successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
   try {
    const result = await db.post("attendees", req.body)
    res.status(200).json(result)
  } catch (e){
    throw({code: 500, message: e.message})
  }
}

attendeeController.update = async (req, res) => {
  /*
    #swagger.description = 'Update a single attendee with the given ID'  
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Json containing fields to update',
      schema:   {
        "name": "Jonathan Browns",
        "checkedIn": false
      }
    } 
    #swagger.responses[204] = { description: 'Attendee updated successfuly' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }  
  */
  try {
    const result = await db.put("attendees", {_id: new ObjectId(req.params.attendee_id)}, req.body)
    res.status(204).send(result)
  } catch(e) {
    throw({code: 500, message: e.message})
  }
}

attendeeController.delete = async (req, res) => {
  /*
    #swagger.description = 'Delete a single attendee with the given ID'
    #swagger.responses[204] = { description: 'Attendee deleted successfully' }
    #swagger.responses[500] = { description: 'Internal server error (databse or node)' }
  */
  try {
    const result = await db.delete("attendees", {_id: new ObjectId(req.params.attendee_id)})
    res.status(204).json(result)
  } catch(e) {
    throw({code: 500, message: e.message})
  }
}

module.exports = attendeeController