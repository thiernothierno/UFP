import PaymentSummary from "./PaymentSummary";

const PaymentSummaryPage = ({ paymentRows, infractionRows }) => {
  return (
    <PaymentSummary paymentRows={paymentRows} infractionRows={infractionRows} />
  );
};

export default PaymentSummaryPage;
