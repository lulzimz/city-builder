import { Flex } from "antd";
import "./House.css";

const House = ({ floors, color }) => {
  return (
    <Flex className="houseContainer">
      {/* Roof */}
      <div className="roof" style={{ borderBottom: `40px solid ${color}` }} />

      {/* House Body */}
      <Flex className="houseBody" style={{ backgroundColor: color }}>
        {/* Windows */}
        <div className="windows">
          {Array(floors * 2)
            .fill()
            .map((_, index) => (
              <div key={index} className="window" />
            ))}
        </div>

        {/* Door */}
        <div className="door" />
      </Flex>
    </Flex>
  );
};

export default House;
