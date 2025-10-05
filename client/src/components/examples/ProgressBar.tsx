import ProgressBar from "../ProgressBar";

export default function ProgressBarExample() {
  return (
    <div className="max-w-md p-8 bg-background">
      <ProgressBar current={12} total={45} />
    </div>
  );
}
