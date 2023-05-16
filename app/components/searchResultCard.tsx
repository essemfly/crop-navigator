import { Card } from "antd";
import type { SearchResult } from "~/models/score.server";

interface ResultProps {
  key: number;
  result: SearchResult;
  onClick: () => void;
  isSelected: boolean;
}

const SearchResultCard: React.FC<ResultProps> = ({
  result,
  onClick,
  isSelected,
}) => {
  return (
    <Card
      className={`crop-card search-result-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      style={{ marginBottom: 5, backgroundColor: "rgba(255, 255, 255, 0.75);" }}
    >
      <div style={{ display: "flex" }}>
        <img
          src={result.crop.imageUrl}
          alt={result.crop.name}
          style={{ width: 50, height: 50 }}
        />
        <div style={{ marginLeft: 8 }}>
          <h4 style={{ marginBottom: 2 }}>{result.crop.name}</h4>
          <p>품종: {result.crop.nameEng}</p>
          <p>지역 적합도: {result.fitness * 100}</p>
          <p>기대 수익: {result.expectedProfit}원/평</p>
        </div>
      </div>
    </Card>
  );
};

export default SearchResultCard;
