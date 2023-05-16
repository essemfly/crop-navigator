import { List } from "antd";
import React from "react";
import { GradeA, GradeB, GradeC, GradeD } from "./grade";
import type { Score } from "~/models/score.server";

interface LocationScoreProps {
  score: Score;
  onClick: () => void;
}

const LocationScoreCard: React.FC<LocationScoreProps> = ({
  score,
  onClick,
}) => {
  let myGrade =
    score.totalScore.grade === "A" ? (
      <GradeA />
    ) : score.totalScore.grade === "B" ? (
      <GradeB />
    ) : score.totalScore.grade === "C" ? (
      <GradeC />
    ) : (
      <GradeD />
    );

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
        title={<h3>{score.location.name}</h3>}
        description={score.totalScore.description}
      />
    </List.Item>
  );
};

export default LocationScoreCard;
