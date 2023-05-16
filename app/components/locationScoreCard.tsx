import { List } from "antd";
import React from "react";
import { makeGradeIcon } from "./grade";
import type { Score } from "~/models/score.server";

interface LocationScoreProps {
  score: Score;
  onClick: () => void;
}

const LocationScoreCard: React.FC<LocationScoreProps> = ({
  score,
  onClick,
}) => {
  let myGrade = makeGradeIcon(score.totalScore.grade);

  return (
    <List.Item
      style={{
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f0f0f0"; // Change to desired hover color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = ""; // Revert back to default background color
      }}
      onClick={onClick}
    >
      <List.Item.Meta
        avatar={myGrade}
        title={score.location.name}
        description={score.totalScore.description}
      />
    </List.Item>
  );
};

export default LocationScoreCard;
