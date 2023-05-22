import { useEffect } from "react";

const NotifierPage = ({ notifier, newNotifier }) => {
  useEffect(() => {
    document.title = "LawConverter - Notification";
  }, []);

  const month = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return (
    <div id="section" className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="notifier-box">
            <div className="notifier-content">
              <ul className="notifier">
                {[...newNotifier].reverse().map((notif, index) => (
                    <div
                        key={index}
                        className={`d-flex align-items-center 
                        ${notif.status === 'SUCCESS' 
                            ? 'bg-light-success' 
                            : notif.status === 'FAILED' 
                                ? 'bg-light-danger' 
                                : 'bg-light-warning'} rounded p-4`}
                    >
                      <div className='flex-grow-1 me-2'>
                        <span className='fw-bold fs-6'>{notif.message}</span>
                        {notif.status === 'SUCCESS' ? (
                            <span className="fw-bold text-success py-1 d-block">
                              Success
                            </span>
                        ) : notif.status === 'FAILED' ? (
                            <span className="fw-bold text-danger py-1 d-block">
                              Failed
                            </span>
                        ) : (
                            <span className="fw-bold text-warning py-1 d-block">
                              On-progress
                            </span>
                        )}
                      </div>
                    <span className="text-muted fw-semibold d-block">
                      {notif.date.substring(8, 10)}{" "}
                      {month.at(notif.date.substring(5, 7))}{" "}
                      {notif.date.substring(0, 4)},{" "}
                      {notif.date.substring(11, 16)}
                    </span>
                  </div>
                ))}

                {[...notifier].reverse().map((notif, index) => (
                    <div key={index} className={`d-flex align-items-center ${notif.status === 'SUCCESS'
                        ? 'bg-light-success'
                        : notif.status === 'FAILED'
                            ? 'bg-light-danger'
                            : 'bg-light-warning'
                    } rounded p-4`}
                    >
                      <div className='flex-grow-1 me-2'>
                        <span className='fw-bold fs-6'>{notif.message}</span>
                        {notif.status === 'SUCCESS' ? (
                            <span className="fw-bold text-success py-1 d-block">
                              Success
                            </span>
                        ) : notif.status === 'FAILED' ? (
                            <span className="fw-bold text-danger py-1 d-block">
                              Failed
                            </span>
                        ) : (
                            <span className="fw-bold text-warning py-1 d-block">
                              On-progress
                            </span>
                        )}
                      </div>
                    <span className="text-muted fw-semibold d-block">
                      {notif.date.substring(8, 10)}{" "}
                      {month.at(notif.date.substring(5, 7))}{" "}
                      {notif.date.substring(0, 4)},{" "}
                      {notif.date.substring(11, 16)}
                    </span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifierPage;
