import type { SearchResult } from "~/models/score.server";

interface ScoreCardProps {
  result: SearchResult;
  onClick: () => void;
  isSelected: boolean;
}

const LocationScoreCard: React.FC<ScoreCardProps> = ({
  result,
  onClick,
  isSelected,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <img
        src={result.crop.imageUrl}
        alt={result.crop.name}
        style={{ width: 100, height: 100 }}
      />
      <div style={{ marginLeft: 16 }}>
        <h2 style={{ marginBottom: 5 }}>{result.crop.name}</h2>
        <p>품종: {result.crop.nameEng}</p>
        <p>지역 적합도: {result.fitness * 100}</p>
        <p>기대 수익: {result.expectedProfit}원/평</p>
      </div>
    </div>
  );
};

export default LocationScoreCard;
