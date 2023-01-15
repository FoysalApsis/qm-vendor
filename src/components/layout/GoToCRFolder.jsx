const GoToCRFolder = ({ path }) => {
  return (
    <a
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      className="d-flex align-items-center"
      style={{ fontWeight: "300", textDecoration: "none", cursor: "pointer" }}
    >
      <i
        className="material-icons-outlined"
        style={{
          color: "#F9A350",
          marginRight: "10px",
        }}
      >
        folder
      </i>
      <span style={{ textDecoration: "underline" }}>Go to CR folder</span>
    </a>
  );
};

export default GoToCRFolder;
