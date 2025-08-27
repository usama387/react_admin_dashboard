import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Rectangle,
} from "recharts";
import { TrendingUp } from "lucide-react";

const areaData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const pieData = [
  { name: "Desktop", value: 400, color: "#dc2626" },
  { name: "Mobile", value: 300, color: "#f87171" },
  { name: "Tablet", value: 200, color: "#fca5a5" },
  { name: "Other", value: 100, color: "#fecaca" },
];

const performanceData = [
  { browser: "chrome", visitors: 187, fill: "#dc2626" },
  { browser: "safari", visitors: 200, fill: "#f87171" },
  { browser: "firefox", visitors: 275, fill: "#fca5a5" },
  { browser: "edge", visitors: 173, fill: "#fecaca" },
  { browser: "other", visitors: 90, fill: "#ef4444" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "#dc2626" },
  safari: { label: "Safari", color: "#f87171" },
  firefox: { label: "Firefox", color: "#fca5a5" },
  edge: { label: "Edge", color: "#fecaca" },
  other: { label: "Other", color: "#ef4444" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 8px 20px rgba(220, 38, 38, 0.2)", transition: { duration: 0.3 } },
};

const Analytics = () => {
  return (
    <div className="space-y-8 p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100 min-h-screen">
      {/* Top charts grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Traffic Overview */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-red-600">Traffic Overview</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Desktop vs Mobile traffic over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  desktop: { label: "Desktop", color: "#dc2626" },
                  mobile: { label: "Mobile", color: "#f87171" },
                }}
                className="h-[250px] sm:h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12, sm: { fontSize: 14 } }} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12, sm: { fontSize: 14 } }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="desktop" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="mobile" stackId="1" stroke="#f87171" fill="#f87171" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Distribution */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-red-600">Device Distribution</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">User device preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  desktop: { label: "Desktop", color: "#dc2626" },
                  mobile: { label: "Mobile", color: "#f87171" },
                  tablet: { label: "Tablet", color: "#fca5a5" },
                  other: { label: "Other", color: "#fecaca" },
                }}
                className="h-[250px] sm:h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
        <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold text-red-600">Performance Metrics</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Users Browser usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="browser"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => chartConfig[value]?.label}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar
                    dataKey="visitors"
                    strokeWidth={2}
                    radius={8}
                    activeIndex={2}
                    activeBar={(props) => (
                      <Rectangle {...props} fillOpacity={0.8} stroke={props.payload.fill} strokeDasharray={4} strokeDashoffset={4} />
                    )}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium text-red-600">
              Trending up by 5.2% this month <TrendingUp className="h-5 w-5" />
            </div>
            <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;
