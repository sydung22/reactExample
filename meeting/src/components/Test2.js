import { render } from "@testing-library/react";
import { useState } from "react";

const Test2 = () => {
  const [listDate, setListDate] = useState(() => {
    let arrDate = [];
    for (let i = 1; i <= 21; i++) {
      arrDate = [...arrDate, i];
    }
    return arrDate;
  });
  // const [jobs, setJobs] = useState([]);
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobUpdate, setJobUpdate] = useState({});
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");

  const handleOnClickCreate = () => {
    setJobs([
      ...jobs,
      {
        id: Math.floor(Math.random() * 100000),
        title: title,
        day: day,
        startTime: startTime,
        endTime: endTime,
        content: content,
      },
    ]);
    handleOnClickCancel();
  };

  const handleOnClickCancel = () => {
    setTitle("");
    setDay("");
    setStartTime("");
    setEndTime("");
    setContent("");
  };
  const handleOnClickEdit = (jobEdit) => {
    setTitle(jobEdit.title);
    setDay(jobEdit.day);
    setStartTime(jobEdit.startTime);
    setEndTime(jobEdit.endTime);
    setContent(jobEdit.content);
    setIsShowUpdate(true);
    setJobUpdate(jobEdit);
  };

  const handleOnClickDelete = (id) => {
    setJobs(jobs.filter((value) => value.id != id));
  };
  const handleOnClickUpdate = () => {
    setJobs([
      ...jobs.filter((value) => value.id != jobUpdate.id),
      {
        id: Math.floor(Math.random() * 100000),
        title: title,
        day: day,
        startTime: startTime,
        endTime: endTime,
        content: content,
      },
    ]);
    handleOnClickCancel();
    setIsShowUpdate(false);
  };
  return (
    <>
      <div className="form">
        <h2>METTING INFORMATION</h2>
        <div className="card">
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col-6">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
              </div>
              <div className="form-group col-6">
                <label>Day</label>
                <input
                  type="text"
                  className="form-control"
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label>Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                ></input>
              </div>
              <div className="form-group col-6">
                <label>End Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                className="form-control"
                placehoder=""
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-row float-right">
              {!isShowUpdate ? (
                <>
                  <button
                    className="btn btn-success"
                    onClick={() => handleOnClickCancel()}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn ml-2 btn-primary"
                    onClick={() => handleOnClickCreate()}
                  >
                    {" "}
                    Create
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setIsShowUpdate(!isShowUpdate);
                      handleOnClickCancel();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn ml-2 btn-primary"
                    onClick={() => handleOnClickUpdate()}
                  >
                    {" "}
                    Update
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="calendar_box">
        <span className="calendar_rank">MonDay</span>
        <span className="calendar_rank">Tuesday</span>
        <span className="calendar_rank">Wednesday</span>
        <span className="calendar_rank">Thursday</span>
        <span className="calendar_rank">Friday</span>
        <span className="calendar_rank">Saturday</span>
        <span className="calendar_rank">Sunday</span>
      </div>
      <div className="calendar_box">
        {listDate.map((valueDate, index) => (
          <div key={index} className="arr-child">
            <div>{valueDate}</div>
            {jobs.map((valueJobs, index2) =>
              valueJobs.day && valueDate == valueJobs.day ? (
                <div key={index2} className="child-day">
                  <div className="day">
                    <div className="content-job">
                      {valueJobs.startTime} | {valueJobs.title}
                    </div>
                    <i
                      className="fa fa-edit"
                      onClick={() => handleOnClickEdit(valueJobs)}
                    ></i>
                    <i
                      className="fa fa-trash"
                      onClick={() => handleOnClickDelete(valueJobs.id)}
                    ></i>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        ))}
        {/* {
                    listDate.map((t, index) => {
                        <div key={index} className='arr-child'>
                            {t}
                        </div>
                    })
                } */}
      </div>
    </>
  );
};
export default Test2;
