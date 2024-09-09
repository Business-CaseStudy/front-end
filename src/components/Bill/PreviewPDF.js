import React, { useState, useEffect } from "react";
import { FaMailBulk, FaPrint } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getCapitalcallDetail } from "../../services/capitalcallApi";
function PreviewPDF() {
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
  useEffect(() => {
      getCapitalcallDetail(id).then((response) => {
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
                                        Due Date: 2024-12-31 TODO
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
                                        <a href="#" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={printBill}>
                                            <FaMailBulk /> Send  Mail
                                        </a>
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