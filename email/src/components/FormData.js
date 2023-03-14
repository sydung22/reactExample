import React, { useEffect, useState } from "react";
const INITIAL_STATE = {
  to: "",
  subject: "",
  content: "",
};
const formatDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
};
const DATA = [
  {
    id: 1,
    to: "dungns@fsoft.com.vn",
    subject: "Lich hop ngay 22/09/2022",
    content: "Xin moi ban den du cuoc hop luc 9:00 vao ngay 22/09/2022",
    day: formatDate(),
    pin: false,
    flag: false,
  },
  {
    id: 2,
    to: "hieutc2@fsoft.com.vn",
    subject: "Lich meeting ngay 21/04/2023",
    content: "Moi ban den du cuoc hop meeting vao luc 7:00 AM",
    day: formatDate(),
    pin: false,
    flag: false,
  },
];
const FormData = () => {
  const [detailData, setDetailData] = useState({});
  const [list, setList] = useState(DATA);
  const [form, setForm] = useState(INITIAL_STATE);
  const [invalidFeedbacks, setInvalidFeedbacks] = useState({});
  const changeColorFlag = (id) => {
    const itemFlag = list.filter((item) => {
      if (item.id === id) {
        item.flag = !item.flag;
      }
      return item;
    });
    setList(itemFlag);
  };
  const pinDetailData = (id, index) => {
    const item = list.find((item) => item.id === id);
    setDetailData(item);
    console.log(id);
  };

  const reorder = (id) => {
    // const myArr = [...list];
    const itemPin = list.filter((item) => item.id === id)[0];
    console.log(itemPin);
    const listNotPin = list.filter((item) => item.id !== id);
    itemPin.pin = !itemPin.pin;
    if (itemPin.pin) {
      setList([itemPin, ...listNotPin]);
    } else {
      setList([...listNotPin, itemPin]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { to, subject, content } = form;
    const feedback = {};
    let emailRex = /^\w+([\.-]?\w+)*@fsoft.com.vn/;
    let notNumberRex = /^[A-Za-z]+$/;
    let contentRex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    if (!to || !emailRex.test(to) || !notNumberRex.test(to[0])) {
      feedback.to = "Email is incorrect!!";
    }
    if (!subject) {
      feedback.subject = "Subject is required!";
    } else if (!contentRex.test(subject)) {
      feedback.subject = "Subject is invalid!";
    }
    if (!content) {
      feedback.content = "Content is required!";
    } else if (!contentRex.test(subject)) {
      feedback.content = "Content is invalid!";
    }

    setInvalidFeedbacks({ ...feedback });
    if (Object.keys(feedback).length) {
      return;
    }

    const nextList = [...list];
    if (form.id) {
      const index = nextList.findIndex((it) => it.id === form.id);
      nextList[index] = form;
    } else {
      nextList.push({
        id: nextList.length + 1,
        to,
        subject,
        content,
        day: formatDate(),
        pin: false,
        flag: false,
      });
    }
    setList(nextList);
    handleReset();
  };

  const handleDelete = (id) => {
    const item = list.find((item) => item.id === id);
    if (window.confirm(`Delete email: ${item.subject} ?`)) {
      const nextList = [...list].filter((item) => item.id !== id);
      setList(nextList);
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

  return (
    <div className="main">
      <div className="container py-4">
        <div className="border px-3 py-4">
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="exampleInputTo1" className="mb-2">
                  To
                </label>
                <input
                  type="title"
                  className={`form-control ${
                    invalidFeedbacks.to ? "is-invalid" : ""
                  }`}
                  name="to"
                  id="exampleInputTo1"
                  value={form.to}
                  onChange={handleValueChanged}
                />
                <div className="invalid-feedback">{invalidFeedbacks.to}</div>
              </div>
              <div className="form-group col-12">
                <label htmlFor="exampleInputSubject1" className="mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidFeedbacks.subject ? "is-invalid" : ""
                  }`}
                  name="subject"
                  id="exampleInputSubject1"
                  value={form.subject}
                  onChange={handleValueChanged}
                />
                <div className="invalid-feedback">{invalidFeedbacks.subject}</div>
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
            <div className="button-box d-flex justify-content-start py-3">
              <button type="submit" className="btn btn-primary px-3">
                Send
              </button>
              {/* <button type="submit" className="btn btn-primary px-3">
                {form.id ? "Update" : "Create"}
              </button> */}
            </div>
          </form>
        </div>
        <hr className="my-4"></hr>
        <h3>INBOX</h3>
        <div className="row mx-0 pb-5">
          <div className="col-4 ps-0">
            <h3 className="fs-4">MAIL</h3>
            <div
              className=" border px-1 pb-2 overflow-auto"
              style={{ height: "250px" }}
            >
              {list.map((item, index) => (
                <div
                  key={index}
                  className={`item-mail border px-2 py-1 mt-2 ${
                    item.flag ? "border-danger" : ""
                  }`}
                >
                  <div className="mail-header d-flex justify-content-between py-1 align-items-center">
                    <h5
                      className="fw-bold fs-6"
                      style={{ cursor: "pointer" }}
                      onClick={() => pinDetailData(item.id, index)}
                    >
                      {item.to}
                    </h5>
                    <div className="list-action d-flex">
                      <button
                        // className="text-white bg-secondary px-2 py-1 rounded border-0 fs-6"
                        className={`text-white px-2 py-1 rounded border-0 ${
                          item.flag ? "bg-success" : "bg-secondary"
                        }`}
                        style={{ fontSize: "12px" }}
                        onClick={() => changeColorFlag(item.id)}
                      >
                        <i className="fas fa-flag"></i>
                      </button>
                      <button
                        className={`text-white px-2 py-1 rounded mx-1 border-0 ${
                          item.pin ? "bg-success" : "bg-secondary"
                        }`}
                        style={{ fontSize: "12px" }}
                        onClick={() => reorder(item.id)}
                      >
                        <i className="fas fa-thumb-tack text-white"></i>
                      </button>
                      <button
                        className="text-white bg-secondary px-2 py-1 rounded border-0"
                        style={{ fontSize: "12px" }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fas fa-trash text-white"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mail-container pt-2">
                    <p className="fs-6">
                      [subject {item.id}] {item.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-8 pe-0">
            <h3 className="fs-4">MAIL DETAILS</h3>
            <div
              className="border px-1 py-2 overflow-auto"
              style={{ height: "250px" }}
            >
              <h3>
                [subject {detailData.id}] {detailData.subject}
              </h3>
              <p className="mb-1">{detailData.day}</p>
              <p className="mb-1">{detailData.to}</p>
              <p className="mb-1">{detailData.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormData;
// /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; regex email
