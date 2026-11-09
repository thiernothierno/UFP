import MonthlyPaymentTracking from "./MonthlyPaymentTracking";

const PaymentTrackingPage = ({
  monthlyValues,
  setMonthlyValues,
  readOnly,
  isLoading,
  savingCell,
  onSavePayment,
}) => {
  return (
    <MonthlyPaymentTracking
      monthlyValues={monthlyValues}
      setMonthlyValues={setMonthlyValues}
      readOnly={readOnly}
      isLoading={isLoading}
      savingCell={savingCell}
      onSavePayment={onSavePayment}
    />
  );
};

export default PaymentTrackingPage;
