import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InfractionsPage from "../components/infractions/InfractionsPage";
import PaymentSummaryPage from "../components/summary/PaymentSummaryPage";
import PaymentTrackingPage from "../components/payments/PaymentTrackingPage";
import { can } from "../data/userPermission";
import { useMember } from "../components/member-home-page/MemberContext";
import supabase from "../lib/supabase";
import "./paymentStatus.css";

const paymentMonths = [
  "Jan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Y_fee",
];

const paymentColumns = {
  Jan: "jan",
  Fev: "feb",
  Mar: "mar",
  Apr: "apr",
  May: "may",
  Jun: "jun",
  Jul: "jul",
  Aug: "aug",
  Sep: "sep",
  Oct: "oct",
  Nov: "nov",
  Dec: "dec",
  Y_fee: "y_fee",
};

const infractionMonths = [
  "Jan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const categories = ["MSG", "Late", "Absence"];
const validPages = ["payments", "infractions", "summary"];
const infractionMonthColumns = {
  Jan: "jan",
  Fev: "feb",
  Mar: "mar",
  Apr: "apr",
  May: "may",
  Jun: "jun",
  Jul: "jul",
  Aug: "aug",
  Sep: "sep",
  Oct: "oct",
  Nov: "nov",
  Dec: "dec",
};

const getErrorMessage = (error, fallback) => {
  if (error instanceof Error) return error.message;

  if (error && typeof error === "object" && "message" in error) {
    const details =
      "details" in error && typeof error.details === "string"
        ? ` ${error.details}`
        : "";
    const hint =
      "hint" in error && typeof error.hint === "string"
        ? ` ${error.hint}`
        : "";
    return `${String(error.message)}${details}${hint}`;
  }

  return fallback;
};

const infractionColumns = Object.fromEntries(
  infractionMonths.flatMap((month) =>
    categories.map((category) => [
      `${month}_${category}`,
      `${infractionMonthColumns[month]}_${category.toLowerCase()}`,
    ]),
  ),
);

const createYearData = () => ({
  payments: [],
  infractions: [],
});

const mapPaymentRecord = (record) => ({
  id: record.member_id,
  member_id: record.member_id,
  member_number: record.member_number,
  First_Name: record.first_name ?? "",
  Last_Name: record.last_name ?? "",
  ...Object.fromEntries(
    paymentMonths.map((month) => [
      month,
      record[paymentColumns[month]] == null
        ? ""
        : String(record[paymentColumns[month]]),
    ]),
  ),
});

const mapInfractionRecord = (record) => ({
  id: record.member_id,
  member_id: record.member_id,
  member_number: record.member_number,
  First_Name: record.first_name ?? "",
  Last_Name: record.last_name ?? "",
  ...Object.fromEntries(
    Object.entries(infractionColumns).map(([field, column]) => [
      field,
      record[column] == null ? "" : String(record[column]),
    ]),
  ),
});

const PaymentStatus = () => {
  const member = useMember();
  const canEditPayments = can(member.role, "edit", "monthly-payments");
  const canEditInfractions = can(member.role, "edit", "infractions");
  const [currentYear] = useState(() => new Date().getFullYear());
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = searchParams.get("view");
  const activePage = validPages.includes(requestedPage)
    ? requestedPage
    : "payments";
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearlyData, setYearlyData] = useState(() => ({
    [currentYear]: createYearData(),
  }));
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [paymentLoadError, setPaymentLoadError] = useState("");
  const [paymentSaveError, setPaymentSaveError] = useState("");
  const [savingCell, setSavingCell] = useState(null);
  const [isLoadingInfractions, setIsLoadingInfractions] = useState(true);
  const [infractionLoadError, setInfractionLoadError] = useState("");
  const [infractionSaveError, setInfractionSaveError] = useState("");
  const [savingInfractionCell, setSavingInfractionCell] = useState(null);

  const setActivePage = (page) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("view", page);
    setSearchParams(nextParams);
  };

  const loadPaymentYear = async (year) => {
    const { data, error } = await supabase
      .from("member_payment_records_view")
      .select(
        "member_id, member_number, first_name, last_name, payment_year, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, y_fee",
      )
      .eq("payment_year", year)
      .order("member_number", { ascending: true });

    if (error) throw error;

    const payments = data.map(mapPaymentRecord);
    setYearlyData((previous) => ({
      ...previous,
      [year]: {
        ...(previous[year] ?? createYearData()),
        payments,
      },
    }));
  };

  const loadInfractionYear = async (year) => {
    const columns = Object.values(infractionColumns).join(", ");
    const { data, error } = await supabase
      .from("member_infraction_records_view")
      .select(
        `member_id, member_number, first_name, last_name, infraction_year, ${columns}`,
      )
      .eq("infraction_year", year)
      .order("member_number", { ascending: true });

    if (error) throw error;

    const infractions = data.map(mapInfractionRecord);
    setYearlyData((previous) => ({
      ...previous,
      [year]: {
        ...(previous[year] ?? createYearData()),
        infractions,
      },
    }));
  };

  useEffect(() => {
    let isCurrent = true;

    const fetchPayments = async () => {
      setIsLoadingPayments(true);
      setPaymentLoadError("");

      try {
        await loadPaymentYear(selectedYear);
      } catch (error) {
        if (isCurrent) {
          setPaymentLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading payment records.",
          );
        }
      } finally {
        if (isCurrent) setIsLoadingPayments(false);
      }
    };

    fetchPayments();

    return () => {
      isCurrent = false;
    };
  }, [selectedYear]);

  useEffect(() => {
    let isCurrent = true;

    const fetchInfractions = async () => {
      setIsLoadingInfractions(true);
      setInfractionLoadError("");

      try {
        await loadInfractionYear(selectedYear);
      } catch (error) {
        if (isCurrent) {
          setInfractionLoadError(
            getErrorMessage(
              error,
              "An unexpected error occurred while loading infraction records.",
            ),
          );
        }
      } finally {
        if (isCurrent) setIsLoadingInfractions(false);
      }
    };

    fetchInfractions();

    return () => {
      isCurrent = false;
    };
  }, [selectedYear]);

  const currentYearData = yearlyData[selectedYear] ?? createYearData();

  const updateInfractions = (updater) => {
    setYearlyData((previous) => ({
      ...previous,
      [selectedYear]: {
        ...(previous[selectedYear] ?? createYearData()),
        infractions:
          typeof updater === "function"
            ? updater(
                (previous[selectedYear] ?? createYearData()).infractions,
              )
            : updater,
      },
    }));
  };

  const updatePayments = (updater) => {
    setYearlyData((previous) => ({
      ...previous,
      [selectedYear]: {
        ...(previous[selectedYear] ?? createYearData()),
        payments:
          typeof updater === "function"
            ? updater(
                (previous[selectedYear] ?? createYearData()).payments,
              )
            : updater,
      },
    }));
  };

  const handleYearChange = (event) => {
    const year = Number(event.target.value);
    setYearlyData((previous) => ({
      ...previous,
      [year]: previous[year] ?? createYearData(),
    }));
    setSelectedYear(year);
  };

  const savePayment = async ({ memberId, year, month, value }) => {
    if (!canEditPayments) return false;

    const column = paymentColumns[month];
    if (!column) {
      setPaymentSaveError("That payment period is not recognized.");
      return false;
    }

    const trimmedValue = value.trim();
    const amount = trimmedValue === "" ? null : Number(trimmedValue);
    if (amount !== null && (!Number.isFinite(amount) || amount < 0)) {
      setPaymentSaveError("Enter a valid non-negative payment amount.");
      return false;
    }

    setPaymentSaveError("");
    setSavingCell(`${memberId}-${month}`);

    try {
      const { data: updatedRecord, error: updateError } = await supabase
        .from("member_payment_records")
        .update({ [column]: amount })
        .eq("member_id", memberId)
        .eq("payment_year", year)
        .select("id")
        .maybeSingle();

      if (updateError) throw updateError;

      if (!updatedRecord) {
        const { error: insertError } = await supabase
          .from("member_payment_records")
          .insert({
            member_id: memberId,
            payment_year: year,
            [column]: amount,
          });

        if (insertError?.code === "23505") {
          const { data: retriedRecord, error: retryError } = await supabase
            .from("member_payment_records")
            .update({ [column]: amount })
            .eq("member_id", memberId)
            .eq("payment_year", year)
            .select("id")
            .maybeSingle();

          if (retryError) throw retryError;
          if (!retriedRecord) {
            throw new Error("The payment record could not be updated.");
          }
        } else if (insertError) {
          throw insertError;
        }
      }

      setYearlyData((previous) => {
        const yearData = previous[year] ?? createYearData();
        return {
          ...previous,
          [year]: {
            ...yearData,
            payments: yearData.payments.map((row) =>
              row.member_id === memberId
                ? { ...row, [month]: amount === null ? "" : String(amount) }
                : row,
            ),
          },
        };
      });
      return true;
    } catch (error) {
      try {
        await loadPaymentYear(year);
      } catch (reloadError) {
        setPaymentLoadError(
          reloadError instanceof Error
            ? reloadError.message
            : "Could not reload payment records after the save failed.",
        );
      }

      setPaymentSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the payment.",
      );
      return false;
    } finally {
      setSavingCell(null);
    }
  };

  const saveInfraction = async ({ memberId, year, field, value }) => {
    if (!canEditInfractions) return false;

    const column = infractionColumns[field];
    if (!column) {
      setInfractionSaveError("That infraction category is not recognized.");
      return false;
    }

    const trimmedValue = value.trim();
    const amount = trimmedValue === "" ? null : Number(trimmedValue);
    if (amount !== null && (!Number.isFinite(amount) || amount < 0)) {
      try {
        await loadInfractionYear(year);
      } catch (reloadError) {
        setInfractionLoadError(
          reloadError instanceof Error
            ? reloadError.message
            : "Could not reload infraction records after invalid input.",
        );
      }
      setInfractionSaveError("Enter a valid non-negative dollar amount.");
      return false;
    }

    setInfractionSaveError("");
    setSavingInfractionCell(`${memberId}-${field}`);

    try {
      const { data: updatedRecord, error: updateError } = await supabase
        .from("member_infraction_records")
        .update({ [column]: amount })
        .eq("member_id", memberId)
        .eq("infraction_year", year)
        .select("id")
        .maybeSingle();

      if (updateError) throw updateError;

      if (!updatedRecord) {
        const { error: insertError } = await supabase
          .from("member_infraction_records")
          .insert({
            member_id: memberId,
            infraction_year: year,
            [column]: amount,
          });

        if (insertError?.code === "23505") {
          const { data: retriedRecord, error: retryError } = await supabase
            .from("member_infraction_records")
            .update({ [column]: amount })
            .eq("member_id", memberId)
            .eq("infraction_year", year)
            .select("id")
            .maybeSingle();

          if (retryError) throw retryError;
          if (!retriedRecord) {
            throw new Error("The infraction record could not be updated.");
          }
        } else if (insertError) {
          throw insertError;
        }
      }

      setYearlyData((previous) => {
        const yearData = previous[year] ?? createYearData();
        return {
          ...previous,
          [year]: {
            ...yearData,
            infractions: yearData.infractions.map((row) =>
              row.member_id === memberId
                ? { ...row, [field]: amount === null ? "" : String(amount) }
                : row,
            ),
          },
        };
      });
      return true;
    } catch (error) {
      try {
        await loadInfractionYear(year);
      } catch (reloadError) {
        setInfractionLoadError(
          reloadError instanceof Error
            ? reloadError.message
            : "Could not reload infraction records after the save failed.",
        );
      }

      setInfractionSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the infraction.",
      );
      return false;
    } finally {
      setSavingInfractionCell(null);
    }
  };

  return (
    <div className="payment-status-container">
      <h2 className="payment-title">Member Records</h2>

      <label htmlFor="payment-year">Select Year: </label>
      <select
        id="payment-year"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {[currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4].map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ),
        )}
      </select>

      <hr />
      <button onClick={() => setActivePage("payments")}>Payments</button>
      <button onClick={() => setActivePage("infractions")}>Infractions</button>
      <button onClick={() => setActivePage("summary")}>Summary</button>
      <hr />

      {activePage === "payments" && (
        <>
          {paymentLoadError && (
            <p role="alert">
              Could not load payment records: {paymentLoadError}
            </p>
          )}
          {paymentSaveError && (
            <p role="alert">Could not save payment: {paymentSaveError}</p>
          )}
          <PaymentTrackingPage
            monthlyValues={currentYearData.payments}
            setMonthlyValues={updatePayments}
            readOnly={!canEditPayments}
            isLoading={isLoadingPayments}
            savingCell={savingCell}
            onSavePayment={(payment) =>
              savePayment({ ...payment, year: selectedYear })
            }
          />
        </>
      )}

      {activePage === "infractions" && (
        <>
          {infractionLoadError && (
            <p role="alert">
              Could not load infraction records: {infractionLoadError}
            </p>
          )}
          {infractionSaveError && (
            <p role="alert">
              Could not save infraction: {infractionSaveError}
            </p>
          )}
          <InfractionsPage
            infractionRows={currentYearData.infractions}
            setInfractionRows={updateInfractions}
            readOnly={!canEditInfractions}
            isLoading={isLoadingInfractions}
            savingCell={savingInfractionCell}
            onSaveInfraction={(infraction) =>
              saveInfraction({ ...infraction, year: selectedYear })
            }
          />
        </>
      )}

      {activePage === "summary" && (
        <PaymentSummaryPage
          paymentRows={currentYearData.payments}
          infractionRows={currentYearData.infractions}
        />
      )}
    </div>
  );
};

export default PaymentStatus;
