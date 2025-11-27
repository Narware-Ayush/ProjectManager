import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowBigUp, ArrowBigDown, Loader } from "lucide-react";

const AnalyticsCard = (props: {
  title: string;
  value: number;
  isLoading: boolean;
}) => {
  const { title, value, isLoading } = props;

  const getArrowIcon = () => {
    if (title === "Overdue Task") {
      return value > 0 ? (
        <ArrowBigDown strokeWidth={2.5} className="h-4 w-4 text-red-500" />
      ) : (
        <ArrowBigUp strokeWidth={2.5} className="h-4 w-4 text-green-500" />
      );
    }
    if (title === "Completed Task" || title === "Total Task") {
      return value > 0 ? (
        <ArrowBigUp strokeWidth={2.5} className="h-4 w-4 text-green-500" />
      ) : (
        <ArrowBigDown strokeWidth={2.5} className="h-4 w-4 text-red-500" />
      );
    }
    return null;
  };

  return (
    <Card className="w-full rounded-2xl border bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-1">
          <CardTitle className="text-[15px] font-semibold tracking-wide text-gray-800">
            {title}
          </CardTitle>
          <span>{getArrowIcon()}</span>
        </div>
        <Activity
          strokeWidth={2.2}
          className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition"
        />
      </CardHeader>

      <CardContent>
        <div className="text-4xl font-bold tracking-tight text-gray-900">
          {isLoading ? (
            <Loader className="w-7 h-7 animate-spin text-gray-400" />
          ) : (
            value
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
