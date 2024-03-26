import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCalendars } from "../../actions/fetchCalendar";
import { eventClearActive, eventStartAddNew, eventStartUpdate } from "../../actions/event";
import { uiCloseModal } from "../../actions/ui";
import Alert from "../ui/Alert";


Modal.setAppElement("#root");

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { ui, calendar, auth } = useSelector((state) => state);
  const { modalOpen, msgError } = ui;
  const { calendars, activeEvent } = calendar;
  const { id } = auth;

  const userId = id;

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: moment().minutes(0).seconds(0).add(1, "hour").toDate(),
    end: moment().minutes(0).seconds(0).add(2, "hours").toDate(),
    selectedCalendar: "",
    type: "",
    expectedResults: "", // Для типу "Meeting"
    interestArea: "",   // Для типу "Appointment"
    giftIdeas: "",      // Для типу "Birthday"
    traditions: ""      // Для типу "Holiday"
  });

  useEffect(() => {
    dispatch(fetchUserCalendars(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (activeEvent) {
      setFormValues({
        title: activeEvent.title,
        notes: activeEvent.notes,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
        selectedCalendar: activeEvent.id_calendar,
        type: activeEvent.type,
        expectedResults: activeEvent.expectedResults || "",
        interestArea: activeEvent.interestArea || "",
        giftIdeas: activeEvent.giftIdeas || "",
        traditions: activeEvent.traditions || ""
      });
    } else {
      setFormValues({
        title: "",
        notes: "",
        start: moment().minutes(0).seconds(0).add(1, "hour").toDate(),
        end: moment().minutes(0).seconds(0).add(2, "hours").toDate(),
        selectedCalendar: "",
        type: "",
        expectedResults: "",
        interestArea: "",
        giftIdeas: "",
        traditions: ""
      });
    }
  }, [activeEvent]);

  const { title, notes, start, end, selectedCalendar, type, expectedResults, interestArea, giftIdeas, traditions } = formValues;

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (e) => {
    setFormValues({ ...formValues, start: e });
  };

  const handleEndDateChange = (e) => {
    setFormValues({ ...formValues, end: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeEvent && activeEvent.id) {
      dispatch(eventStartUpdate({ ...formValues, id: activeEvent.id }));
    } else {
      dispatch(eventStartAddNew({ ...formValues, creator_user_id: userId }));
    }
    closeModal();
  };

  const closeModal = () => {
    if (modalOpen) {
      dispatch(eventClearActive());
      dispatch(uiCloseModal());
    }
  };

  return (
      <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          closeTimeoutMS={200}
          contentLabel="Event modal"
          className="modal"
          overlayClassName="modal__background"
      >
        <h1 className="modal__title">{activeEvent ? "Edit event" : "New event"}</h1>
        <hr />
        <form className="form" onSubmit={handleSubmit}>
          {msgError && <Alert type="error" description={msgError} />}
          <div className="form__field">
            <label className="form__label">Start date</label>
            <DateTimePicker
                onChange={handleStartDateChange}
                value={start}
                className="form__input"
            />
          </div>
          <div className="form__field">
            <label className="form__label">End date</label>
            <DateTimePicker
                onChange={handleEndDateChange}
                value={end}
                minDate={start}
                className="form__input"
            />
          </div>
          <div className="form__field">
            <label htmlFor="title" className="form__label">Event title</label>
            <input
                autoComplete="off"
                type="text"
                className="form__input"
                id="title"
                name="title"
                placeholder="New event"
                value={title}
                onChange={handleInputChange}
            />
          </div>
          <div className="form__field">
            <label htmlFor="notes" className="form__label">Notes</label>
            <textarea
                type="text"
                className="form__text-area"
                rows="5"
                id="notes"
                name="notes"
                value={notes}
                onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form__field">
            <label htmlFor="type" className="form__label">Event type</label>
            <select
                name="type"
                id="type"
                className="form__input"
                value={type}
                onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="meeting">Meeting</option>
              <option value="appointment">Appointment</option>
              <option value="birthday">Birthday</option>
              <option value="holiday">Holiday</option>
            </select>
          </div>

          {type === "meeting" && (
              <div className="form__field">
                <label htmlFor="expectedResults" className="form__label">Expected Results</label>
                <textarea
                    type="text"
                    className="form__text-area"
                    rows="3"
                    id="expectedResults"
                    name="expectedResults"
                    placeholder="Expected results"
                    value={expectedResults}
                    onChange={handleInputChange}
                ></textarea>
              </div>
          )}
          {type === "appointment" && (
              <div className="form__field">
                <label htmlFor="interestArea" className="form__label">Interest Area</label>
                <input
                    autoComplete="off"
                    type="text"
                    className="form__input"
                    id="interestArea"
                    name="interestArea"
                    placeholder="Interest area"
                    value={interestArea}
                    onChange={handleInputChange}
                />
              </div>
          )}
          {type === "birthday" && (
              <div className="form__field">
                <label htmlFor="giftIdeas" className="form__label">Gift Ideas</label>
                <textarea
                    type="text"
                    className="form__text-area"
                    rows="3"
                    id="giftIdeas"
                    name="giftIdeas"
                    placeholder="Gift ideas"
                    value={giftIdeas}
                    onChange={handleInputChange}
                ></textarea>
              </div>
          )}
          {type === "holiday" && (
              <div className="form__field">
                <label htmlFor="traditions" className="form__label">Traditions & Customs</label>
                <textarea
                    type="text"
                    className="form__text-area"
                    rows="3"
                    id="traditions"
                    name="traditions"
                    placeholder="Traditions & customs"
                    value={traditions}
                    onChange={handleInputChange}
                ></textarea>
              </div>
          )}

          <div className="form__field">
            <label htmlFor="selectedCalendar" className="form__label">Select Calendar</label>
            <select
                className="form__input"
                name="selectedCalendar"
                id="selectedCalendar"
                value={selectedCalendar}
                onChange={handleInputChange}
            >
              <option value="">Select a calendar</option>
              {calendars.map(calendar => (
                  <option key={calendar.id} value={calendar.id}>
                    {calendar.name}
                  </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary btn--block" type="submit">
            Save
          </button>
        </form>
      </Modal>
  );
};

export default CalendarModal;


