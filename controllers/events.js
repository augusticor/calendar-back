const { request, response } = require('express');
const Event = require('../models/Event');

const createEvent = async (req = request, res = response) => {
  const event = new Event(req.body);

  try {
    // req.uid coming from jwtValidator middleware
    event.user = req.uid;

    const savedEvent = await event.save();

    return res.status(201).json({
      ok: true,
      event: savedEvent,
      msg: 'Event created',
    });
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal error event',
    });
  }
};

const getEvents = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'getEvents',
  });
};

const updateEvent = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'Event updated',
  });
};

const deleteEvent = (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'Event deleted',
  });
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
