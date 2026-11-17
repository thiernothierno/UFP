import React, { useRef, useState } from "react";
import Withdrawal from "./Withdrawal";
import WithdrawalForm from "./WithdrawalForm";

// Owns withdrawal records and connects the form actions to the displayed data.
const WithdrawalManager = () => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const nextRecordId = useRef(1);

  function addRecord(record) {
    setRecords((currentRecords) => [
      ...currentRecords,
      { ...record, id: nextRecordId.current++ },
    ]);
  }

  function updateRecord(id, updatedRecord) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id ? { ...updatedRecord, id } : record,
      ),
    );
    setEditingRecord(null);
  }

  function deleteRecord(id) {
    setRecords((currentRecords) =>
      currentRecords.filter((record) => record.id !== id),
    );
    setEditingRecord((currentRecord) =>
      currentRecord?.id === id ? null : currentRecord,
    );
  }

  return (
    <main className="app">
      <WithdrawalForm
        onSubmit={addRecord}
        onUpdate={updateRecord}
        editingRecord={editingRecord}
        onCancelEdit={() => setEditingRecord(null)}
      />
      <Withdrawal
        records={records}
        onEdit={setEditingRecord}
        onDelete={deleteRecord}
      />
    </main>
  );
};

export default WithdrawalManager;
