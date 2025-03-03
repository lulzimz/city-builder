import { Flex } from "antd";
import "./House.css";
import { memo } from "react";

// to avoid rendering for other houses in this case we use react memo to being rendered only when its props changes.
/* 
  or we can pass only house id and get house data from zustand with useSelector, 
  in this case we need to change type for houses in object like this houses:{123: { title: "House 1", floors: 3, color: "orange" }}
  and when we get it like this useSelector(()=> houses[id]) it will not be renderd unnecessary
*/
const House = memo(({ floors, color }) => {
  console.log("wwwww");

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
});

export default House;
