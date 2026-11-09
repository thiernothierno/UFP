import Infractions from "./Infractions";
const InfractionsPage = ({
  infractionRows,
  setInfractionRows,
  readOnly,
  isLoading,
  savingCell,
  onSaveInfraction,
}) => {
  return (
    <Infractions
      rows={infractionRows}
      setRows={setInfractionRows}
      readOnly={readOnly}
      isLoading={isLoading}
      savingCell={savingCell}
      onSaveInfraction={onSaveInfraction}
    />
  );
};

export default InfractionsPage; 
