import React, { useEffect, useState } from "react";
import Withdrawal from "./Withdrawal";
import WithdrawalForm from "./WithdrawalForm";
import supabase from "../../lib/supabase";
import { useMember } from "../member-home-page/MemberContext";
import { can } from "../../data/userPermission";

// Owns withdrawal records and connects the form actions to the displayed data.
const WithdrawalManager = () => {
  const member = useMember();
  const canAdd = can(member.role, "add", "withdrawals");
  const canEdit = can(member.role, "edit", "withdrawals");
  const canDelete = can(member.role, "delete", "withdrawals");
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function loadRecords() {
      try {
        const { data, error } = await supabase
          .from("withdrawals")
          .select("id, withdrawal_date, receiver, reason, amount, created_at")
          .order("withdrawal_date", { ascending: false });

        if (error) {
          if (isCurrent) setLoadError(error.message);
          return;
        }

        if (isCurrent) {
          setRecords(
            data.map((record) => ({
              id: record.id,
              date: record.withdrawal_date,
              receiver: record.receiver,
              reason: record.reason,
              amount: Number(record.amount),
            })),
          );
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading withdrawals.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadRecords();

    return () => {
      isCurrent = false;
    };
  }, []);

  async function addRecord(record) {
    if (!canAdd) return;

    setSaveError("");
    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from("withdrawals")
        .insert({
          withdrawal_date: record.date,
          receiver: record.receiver,
          reason: record.reason,
          amount: record.amount,
          created_by: member.id,
        })
        .select("id, withdrawal_date, receiver, reason, amount, created_at")
        .single();

      if (error) {
        setSaveError(error.message);
        return;
      }

      setRecords((currentRecords) => [
        {
          id: data.id,
          date: data.withdrawal_date,
          receiver: data.receiver,
          reason: data.reason,
          amount: Number(data.amount),
        },
        ...currentRecords,
      ]);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the withdrawal.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function updateRecord(id, updatedRecord) {
    if (!canEdit) return;

    setSaveError("");
    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from("withdrawals")
        .update({
          withdrawal_date: updatedRecord.date,
          receiver: updatedRecord.receiver,
          reason: updatedRecord.reason,
          amount: updatedRecord.amount,
        })
        .eq("id", id)
        .select("id, withdrawal_date, receiver, reason, amount, created_at")
        .single();

      if (error) {
        setSaveError(error.message);
        return;
      }

      setRecords((currentRecords) =>
        currentRecords.map((record) =>
          record.id === id
            ? {
                id: data.id,
                date: data.withdrawal_date,
                receiver: data.receiver,
                reason: data.reason,
                amount: Number(data.amount),
              }
            : record,
        ),
      );
      setEditingRecord(null);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while updating the withdrawal.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteRecord(id) {
    if (!canDelete) return;

    setDeleteError("");
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("withdrawals")
        .delete()
        .eq("id", id);

      if (error) {
        setDeleteError(error.message);
        return;
      }

      setRecords((currentRecords) =>
        currentRecords.filter((record) => record.id !== id),
      );
      setEditingRecord((currentRecord) =>
        currentRecord?.id === id ? null : currentRecord,
      );
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the withdrawal.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="app">
      {(canAdd || editingRecord) && (
        <WithdrawalForm
          onSubmit={addRecord}
          onUpdate={updateRecord}
          editingRecord={editingRecord}
          onCancelEdit={() => setEditingRecord(null)}
          canManage={canAdd}
          isSaving={isSaving}
          saveError={saveError}
        />
      )}
      {isLoading && <p role="status">Loading withdrawals...</p>}
      {loadError && (
        <p role="alert">Could not load withdrawals: {loadError}</p>
      )}
      {deleteError && (
        <p role="alert">Could not delete withdrawal: {deleteError}</p>
      )}
      <Withdrawal
        records={records}
        onEdit={setEditingRecord}
        onDelete={deleteRecord}
        canEdit={canEdit}
        canDelete={canDelete}
        canAdd={canAdd}
        isDeleting={isDeleting}
        isLoading={isLoading}
        loadError={loadError}
      />
    </main>
  );
};

export default WithdrawalManager;
