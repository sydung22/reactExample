import React, { useEffect, useState } from "react";

const INITIAL_STATE = {
  title: "",
  day: "",
  startTime: "",
  endTime: "",
  content: "",
};
const Calendar = () => {
  const [listDate, setListDate] = useState(() => {
    let arrDate = [];
    for (let i = 1; i <= 21; i++) {
      arrDate = [...arrDate, i];
    }
    return arrDate;
  });
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(INITIAL_STATE);
  const [invalidFeedbacks, setInvalidFeedbacks] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, day, startTime, endTime, content } = form;
    const feedback = {};
    let myRe = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    if (!title || !myRe.test(title)) {
      feedback.title = "User name is incorrect.";
    }
    if (!day) {
      feedback.day = "Vui long khong bo trong";
    } else if (Number(day) > 21 || Number(day) < 1) {
      feedback.day = "Vui long nhap tu 1 den 21.";
    }
    const stm = startTime.split(":");
    const etm = endTime.split(":");
    if (!startTime || !endTime) {
      if (!startTime) {
        feedback.startTime = "startTime is required";
        feedback.endTime = "endTime is required";
      } else if (!startTime) {
        feedback.endTime = "startTime is required";
      } else {
        feedback.endTime = "endTime is required";
      }
    } else if (etm[0] < stm[0]) {
      feedback.endTime = "endTime must be greater startTime";
    } else if (etm[0] === stm[0]) {
      if (etm[1] <= stm[1]) {
        feedback.endTime = "endTime must be greater startTime";
      }
    }
    if (!content || !myRe.test(content)) {
      feedback.content = "Content is incorrect.";
    }
    if (jobs.findIndex((it) => it.id !== form.id && it.title === title) !== -1) {
      feedback.title = "Title is duplicated";
    }
    setInvalidFeedbacks({ ...feedback });
    if (Object.keys(feedback).length) {
      return;
    }
    const nextList = [...jobs];
    if (form.id) {
      const index = nextList.findIndex((it) => it.id === form.id);
      nextList[index] = form;
    } else {
      nextList.push({
        id: Math.random(),
        title,
        day,
        startTime,
        endTime,
        content,
      });
    }
    setJobs(nextList);
    handleReset();
  };
  const handleDelete = (id) => {
    const item = jobs.find((item) => item.id === id);
    if (window.confirm(`Delete task: ${item.title} ?`)) {
      const nextList = [...jobs].filter((item) => item.id !== id);
      setJobs(nextList);
    }
  };
  const handleValueChanged = (e) => {
    const {
      target: { value, name },
    } = e;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleReset = () => {
    setInvalidFeedbacks({});
    setForm(INITIAL_STATE);
  };
  useEffect(() => {
    handleReset();
  }, [jobs]);
  return (
    <div className="main">
      <div className="container p-4">
        <div className="border px-3 py-4">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="exampleInputTitle1" className="mb-2">
                  Title
                </label>
                <input
                  type="title"
                  className={`form-control ${
                    invalidFeedbacks.title ? "is-invalid" : ""
                  }`}
                  name="title"
                  id="exampleInputTitle1"
                  value={form.title}
                  onChange={handleValueChanged}
                />
                <div className="invalid-feedback">{invalidFeedbacks.title}</div>
              </div>
              <div className="form-group col-6">
                <label htmlFor="exampleInputDay1" className="mb-2">
                  Day
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    invalidFeedbacks.day ? "is-invalid" : ""
                  }`}
                  name="day"
                  id="exampleInputDay1"
                  value={form.day}
                  onChange={handleValueChanged}
                />
                <div className="invalid-feedback">{invalidFeedbacks.day}</div>
              </div>
              <div className="form-group col-6 mt-2">
                <label htmlFor="startTime" className="mb-2">
                  Start time
                </label>
                <input
                  type="time"
                  className={`form-control ${
                    invalidFeedbacks.startTime ? "is-invalid" : ""
                  }`}
                  name="startTime"
                  value={form.startTime}
                  id="startTime"
                  onChange={handleValueChanged}
                />
                <div className="invalid-feedback">{invalidFeedbacks.startTime}</div>
              </div>
              <div className="form-group col-6 mt-2">
                <label htmlFor="endTime" className="mb-2">
                  End time
                </label>
                <input
                  type="time"
                  className={`form-control ${
                    invalidFeedbacks.endTime ? "is-invalid" : ""
                  }`}
                  name="endTime"
                  value={form.endTime}
                  id="endTime"
                  onChange={handleValueChanged}
                />
                <div className="invalid-feedback">{invalidFeedbacks.endTime}</div>
              </div>
              <div className="form-group col-12 mt-2">
                <label htmlFor="content" className="mb-2">
                  Content
                </label>
                <textarea
                  type="text"
                  className={`form-control ${
                    invalidFeedbacks.content ? "is-invalid" : ""
                  }`}
                  name="content"
                  id="content"
                  rows="7"
                  value={form.content}
                  onChange={handleValueChanged}
                />
                <div className="invalid-feedback">{invalidFeedbacks.content}</div>
              </div>
            </div>
            <div className="button-box d-flex justify-content-end py-3">
              <button type="reset" className="btn btn-success me-3 px-3">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-3">
                {form.id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container p-4">
        <div className="header-calendar d-flex border border-primary border-3 justify-content-evenly">
          <div className="header-item border-end border-primary">Monday</div>
          <div className="header-item border-end border-primary">Tuesday</div>
          <div className="header-item border-end border-primary">Wednesday</div>
          <div className="header-item border-end border-primary">Thursday</div>
          <div className="header-item border-end border-primary">Friday</div>
          <div className="header-item border-end border-primary">Saturday</div>
          <div className="header-item">Sunday</div>
        </div>
        <div className="main-calendar d-flex flex-wrap mt-3 ">
          {listDate && listDate.length > 0
            ? listDate.map((item, index) => {
                return (
                  <div className="main-item" key={index}>
                    Day {item}
                    <div>
                      <div className="box-list-time">
                        {jobs.map(
                          (item2, index) =>
                            item2.day &&
                            item == item2.day && (
                              <div
                                key={index}
                                className="list-time-item d-flex mt-1 item-center"
                              >
                                <a href="/" style={{ width: "128px" }}>
                                  {item2.startTime} {item2.title}
                                </a>
                                <i
                                  className="fas fa-edit ms-1 text-success"
                                  onClick={() => setForm(item2)}
                                  style={{ fontSize: "13px" }}
                                ></i>
                                <i
                                  className="fas fa-trash ms-1 text-danger"
                                  onClick={() => handleDelete(item2.id)}
                                  style={{ fontSize: "13px" }}
                                ></i>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : "No data"}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
