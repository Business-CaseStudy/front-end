import React, { useState, useEffect } from "react";
import { FaMailBulk, FaPrint } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getCapitalcallDetail } from "../../services/capitalcallApi";
import api from "../../api";
import { AiOutlineBackward } from "react-icons/ai";
function PreviewPDF() {
  const [sendEmailMessage , setSendEmailMessage] = useState("Send Email")
  const [disableSendEmailBut , setDisableSendEmailBut] =useState(false)
  const [hideButtons, setHideButtons] = useState(false);
  const [widthPage, setWidthPage] = useState("auto");
  const { id } = useParams();
  const [CapitalCall, setCapitalCall] = useState();
  function printBill() {
    setHideButtons(true);
    setWidthPage("100%");
    setTimeout(() => {
      window.print();
    }, 50);
  }
  function sendInvoice(){
    setDisableSendEmailBut(true)
    api.post(`/capitalcall/SendCapitalCallByMail/${id}`).then((response) => {
     
      setSendEmailMessage("Invoice Sended To Investor Via Mail")
        console.log("Invoice Sended Successfuly");
      })
      .catch((error) =>
        console.error("Error while sending email:", error)
      );
  }
  useEffect(() => {
    api
      .get(`/capitalcall/capital-call-detail/${id}/`)
      .then((response) => {
        setCapitalCall(response.data);
        console.log(response.data);
      })
      .catch((error) =>
        console.error("Error fetching investor details:", error)
      );
  }, []);

  useEffect(() => {
    const handleAfterPrint = () => {
      setHideButtons(false);
      setWidthPage("50%");
    };
    window.onafterprint = handleAfterPrint;

    return () => {
      window.onafterprint = null; 
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="container">
                <div style={{ width: widthPage }}>
                    <Card className="my-2">
                        <CardBody>
                            <div style={{ textAlign: 'center' }}>
                                <img
                                     src="/ARCHIMED_LOGO_BLACK_RGB-removebg-preview.png"
                                    alt="Logo"
                                    style={{ width: "500px", marginBottom: "20px" }}
                                />
                                <div style={{ textAlign: 'center' }}>
                                    <div>IBAN: {CapitalCall?.investor.iban}</div>
                                    <div style={{ marginTop: "20px" }}>
                                        Due Date:  {CapitalCall?.bills[0]?.due_date}
                                    </div>
                                    <div style={{ marginTop: "20px" }}>
                                        From: Archimed SAS
                                    </div>
                                    <div>To: {CapitalCall?.investor.name}</div>
                                    <div>Email: {CapitalCall?.investor.email}</div>
                                    <div style={{ marginTop: "40px", display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
                                        <div>Total Amount: EUR {CapitalCall?.total_amount}</div>
                                        <div>Date: {CapitalCall?.created_date?.split("T")[0]}</div>
                                    </div>
                                </div>
                                {!hideButtons && (
                                    <div style={{ marginTop: "20px" }}>
                                        <a href="#" className="btn btn-danger" onClick={printBill}>
                                            <FaPrint /> Print
                                        </a>
                                        <Link to={"/investordetail/"+CapitalCall?.investor.id} className="btn btn-danger" style={{ marginLeft: "10px" }} >
                                        <AiOutlineBackward /> Back To Investor Details
                                        </Link>
                                        <button disabled={disableSendEmailBut}  className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={sendInvoice}>
                                            <FaMailBulk /> {sendEmailMessage}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
  );
}

export default PreviewPDF;