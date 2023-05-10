import { Card } from "antd";
import type { Crop } from "@prisma/client";

export interface SearchResult {
  id: number;
  crop: Crop;
  expectedProfit: number;
  fitness: number;
}

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
      className={`crop-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      style={{ marginBottom: 10 }}
    >
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
    </Card>
  );
};

export default SearchResultCard;
