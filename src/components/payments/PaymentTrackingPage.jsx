import MonthlyPaymentTracking from "./MonthlyPaymentTracking";

const PaymentTrackingPage = ({ monthlyValues, setMonthlyValues }) => {
  return (
    <MonthlyPaymentTracking
      monthlyValues={monthlyValues}
      setMonthlyValues={setMonthlyValues}
    />
  );
};

export default PaymentTrackingPage;
