import MonthlyPaymentTracking from "./MonthlyPaymentTracking";

const PaymentTrackingPage = ({ monthlyValues, setMonthlyValues, readOnly }) => {
  return (
    <MonthlyPaymentTracking
      monthlyValues={monthlyValues}
      setMonthlyValues={setMonthlyValues}
      readOnly={readOnly}
    />
  );
};

export default PaymentTrackingPage;
