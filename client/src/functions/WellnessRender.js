export default function WellnessRender({arg}){
    switch (arg) {
      case 1:
        return (
          <div style={{ color: "#D04848", fontSize: "20px" }}>
            &#10074;
            <span style={{ color: "gray" }}>&#10074;&#10074;&#10151;</span>
          </div>
        );
      case 2:
        return (
          <div style={{ color: "#FFE35C", fontSize: "20px" }}>
            &#10074;&#10074;
            <span style={{ color: "gray" }}>&#10074;&#10151;</span>
          </div>
        );
      case 3:
        return (
          <div style={{ color: "#FFA34D", fontSize: "20px" }}>
            &#10074;&#10074;&#10074;
            <span style={{ color: "gray" }}>&#10151;</span>
          </div>
        );
      case 4:
        return (
          <div style={{ color: "#486799", fontSize: "20px" }}>
            &#10074;&#10074;&#10074;&#10151;
          </div>
        );
      default:
        return <div style={{fontSize: "30px"}}>&#9760;</div>;
    }
  };