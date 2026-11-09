import Infractions from "./Infractions";
const InfractionsPage = ({ infractionRows, setInfractionRows, readOnly }) => {
  return (
    <Infractions
      rows={infractionRows}
      setRows={setInfractionRows}
      readOnly={readOnly}
    />
  );
};

export default InfractionsPage; 
